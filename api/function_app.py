"""Azure Static Web Apps 관리형 Functions (Python v2 모델).

- GET  /api/health           상태 확인 (에이전트 연결 여부)
- POST /api/diagnose         사진 → 분류 모델 → 진단 에이전트(사진·도구) → 검증 에이전트
- POST /api/community/ask    질문 → 관련 노하우(원문 문장만)
- POST /api/plan             실시간 날씨 + 밭 기록 → 날씨·밭 분석(동시) → 작업 계획 → 근거 검증

사진이 있으면 분류 모델(api/classifier.py)은 항상 서버에서 실행한다.
COPILOT_GITHUB_TOKEN이 없거나 에이전트가 실패하면, 사진이 있을 때는 분류 모델 결과만
(source: "model"), 사진이 없을 때는 503을 돌려준다. 웹앱은 503을 받으면 앱 안 규칙으로 대신한다.
"""
import asyncio
import base64
import binascii
import json
import logging
import time

import azure.functions as func

import agents
import classifier
import planner

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)
log = logging.getLogger("farm-api")
MAX_BODY = 3_000_000
MIME = {"jpeg": "image/jpeg", "jpg": "image/jpeg", "png": "image/png", "webp": "image/webp"}


def _resp(obj, status=200):
    return func.HttpResponse(json.dumps(obj, ensure_ascii=False), status_code=status, mimetype="application/json")


def _body(req: func.HttpRequest):
    raw = req.get_body() or b""
    if len(raw) > MAX_BODY:
        raise ValueError("too large")
    return json.loads(raw or b"{}")


def _image(value) -> tuple[bytes | None, str]:
    """data:image/...;base64,... 문자열 → (바이트, MIME). 없으면 (None, '')."""
    if not value:
        return None, ""
    head, _, data = str(value).partition(",")
    kind = head.split("/")[-1].split(";")[0].lower() if head.startswith("data:image/") else "jpeg"
    if kind not in MIME or not data:
        raise ValueError("unsupported image")
    try:
        return base64.b64decode(data, validate=True), MIME[kind]
    except (binascii.Error, ValueError) as ex:
        raise ValueError("bad image") from ex


@app.route(route="health", methods=["GET"])
def health(req: func.HttpRequest) -> func.HttpResponse:
    return _resp({"ok": True, "agent": agents.enabled(), "models": [agents.DIAG_MODEL, agents.JUDGE_MODEL],
                  "classifier": classifier.META["model"],
                  "plan_models": [planner.FAST_MODEL, planner.PLAN_MODEL], "region": planner.REGION["name"]})


@app.route(route="diagnose", methods=["POST"])
async def diagnose(req: func.HttpRequest) -> func.HttpResponse:
    try:
        b = _body(req)
        image, mime = _image(b.get("image"))
    except ValueError:
        return _resp({"error": "사진은 3MB 이하 JPG·PNG·WEBP만 보낼 수 있어요"}, 400)
    crop = str(b.get("crop", ""))[:20]
    symptoms = [str(s)[:40] for s in (b.get("symptoms") or [])][:20]
    stats = b.get("stats") if isinstance(b.get("stats"), dict) else None

    classified = None
    if image and crop == "토마토":
        try:
            t0 = time.time()
            classified = classifier.classify(image)
            classified["ms"] = round((time.time() - t0) * 1000)
            log.info("classify ok top=%s %.0fms", classified["top"][0]["label"], classified["ms"])
        except classifier.ImageError as ex:
            return _resp({"error": str(ex)}, 400)

    if agents.enabled():
        try:
            t0 = time.time()
            out = await asyncio.wait_for(agents.diagnose(crop, symptoms, stats, image, mime, classified),
                                         timeout=agents.TIMEOUT + 30)
            out["classifier"] = classified
            out["ms"] = round((time.time() - t0) * 1000)
            log.info("diagnose ok crop=%s n=%d top=%d %.1fs", crop, len(symptoms), len(out["top"]), time.time() - t0)
            return _resp(out)
        except Exception as ex:  # 실패는 기록하고 분류 모델 결과나 웹앱 규칙으로 대신한다
            log.exception("diagnose agent failed: %s", ex)
    if classified:
        out = agents.model_only(crop, classified)
        out["classifier"] = classified
        out["agentError"] = "agent not configured" if not agents.enabled() else "agent failed"
        return _resp(out)
    return _resp({"error": "agent not configured" if not agents.enabled() else "agent failed"}, 503)


@app.route(route="community/ask", methods=["POST"])
async def community_ask(req: func.HttpRequest) -> func.HttpResponse:
    if not agents.enabled():
        return _resp({"error": "agent not configured"}, 503)
    try:
        b = _body(req)
        out = await asyncio.wait_for(agents.ask(str(b.get("question", "")), b.get("posts") or []), timeout=agents.TIMEOUT + 30)
        log.info("ask ok items=%d", len(out["items"]))
        return _resp(out)
    except Exception as ex:
        log.exception("ask failed: %s", ex)
        return _resp({"error": "agent failed"}, 503)


@app.route(route="plan", methods=["POST"])
async def plan(req: func.HttpRequest) -> func.HttpResponse:
    if not planner.enabled():
        return _resp({"error": "agent not configured"}, 503)
    try:
        b = _body(req)
        out = await asyncio.wait_for(planner.plan(b), timeout=planner.TOTAL_TIMEOUT)
        log.info("plan ok tasks=%d dropped=%d tools=%d %dms", len(out["tasks"]), len(out["dropped"]),
                 sum(1 for t in out["trace"] if t["type"] == "tool"), out["ms"])
        return _resp(out)
    except asyncio.TimeoutError:
        log.warning("plan timeout after %.0fs", planner.TOTAL_TIMEOUT)
        return _resp({"error": "agent timeout"}, 503)
    except Exception as ex:
        log.exception("plan failed: %s", ex)
        return _resp({"error": "agent failed"}, 503)
