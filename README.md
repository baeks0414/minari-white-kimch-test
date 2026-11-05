# 소작농

**사진 한 장으로, 오늘 밭에서 할 일까지.** 경북 청도군의 새내기 토마토 농부를 위한 AI 농가 코파일럿이다. 팀 미나리 백김치 · 청도 바이브코딩 해커톤 2026.

| | |
|---|---|
| 앱 | https://wonderful-dune-03fda6b10.4.azurestaticapps.net (로그인 없음, 시연 농가로 바로 사용) |
| 상태 확인 | https://wonderful-dune-03fda6b10.4.azurestaticapps.net/api/health (`"agent": true`는 `COPILOT_GITHUB_TOKEN` 문자열 존재 신호이며 plan/community 성공 보증은 아님) |
| 대상 | 경북 청도군 청년·귀농 1~3년 차 농부, 토마토 시설 재배 |
| 필수 기술 | GitHub Copilot SDK + Microsoft Agent Framework — `api/agents.py`, `api/planner.py` |
| 배포 | Azure Static Web Apps (웹앱 + Python Functions API) |

## 3분 체험

1. **오늘** → "이번 주 할 일 계획 세우기": 날씨·밭 에이전트가 동시에 분석하고 계획 에이전트가 7일 할 일을 근거와 함께 제안한다. 실행 기록에서 도구 호출을 볼 수 있다. 고른 것만 일정에 들어간다.
2. **진단** → 검증된 샘플 사진 하나 선택 → 확인: 사진 분류 모델(도구) + 진단 에이전트 → 다른 모델의 검증 에이전트 → 후보·근거·관리법, 샘플 정답과 비교.
3. 결과를 **확인**하면 영농 기록에 남고 다시 확인할 일정이 제안된다.
4. **농기계** → 작업(예: 방제) 선택: 알맞은 기종과 그 기종이 있는 가장 가까운 청도 임대사업소(대수·전화·길찾기).
5. **커뮤니티** → 질문: 관련 선배 노하우를 원문 문장 그대로 모아 보여 준다.

## 기능

| 화면 | 기능 | AI |
|---|---|---|
| 오늘 | 청도 7일 실시간 예보, AI 작업 계획, 보온·관수·곰팡이병·강풍 안내, 지원사업 | 날씨 ∥ 밭 에이전트(`ConcurrentBuilder`) → 계획 에이전트, 서버 근거 검증 |
| 진단 | 토마토 잎 사진(또는 샘플 6장) → 병해 5종·건강한 잎 중 후보 최대 3개, 확신, 근거, 관리법·출처 | 분류 모델(ONNX) 도구 + 진단 에이전트(사진 첨부) → 검증 에이전트(다른 모델) |
| 기록 | 영농 기록, 다음 할 일 제안, 승인 후 일정 | 규칙 |
| 농기계 | 작업·면적별 기종, 청도 임대사업소 3곳(47종 812대, 청도군청 자료), 대여·반납 일정 | 규칙 |
| 커뮤니티 | 노하우·질문, 댓글, 신고, 관련 노하우 찾기, 전화번호 가림 | 커뮤니티 정리 에이전트 |

에이전트가 응답하지 않으면 사진 분류 모델이나 앱 규칙으로 대신하고 출처를 표시한다: 진단 결과에는 "AI 에이전트" / "사진 분류 모델" / "앱 규칙 기반", 작업 계획에는 "AI 에이전트" / "에이전트 연결 전"(규칙 계획). 약제명·희석 배수는 만들지 않는다.

## Azure 배포

현재 저장소에서 **확인된 배포 실행 경로**는 GitHub Actions 기반 자동 배포다.

| 항목 | 확인된 내용 |
|---|---|
| 워크플로 파일 | [`.github/workflows/azure-static-web-apps-jolly-grass-0eecb7a10.yml`](.github/workflows/azure-static-web-apps-jolly-grass-0eecb7a10.yml) |
| 트리거 | `main` 브랜치 `push`, `main` 대상 `pull_request` |
| 배포 액션 | `Azure/static-web-apps-deploy@v1` |
| 확인된 실행 명령 | `git --no-pager push origin main` (푸시 시 워크플로 자동 실행) |
| 앱 URL | https://wonderful-dune-03fda6b10.4.azurestaticapps.net/ |
| health URL | https://wonderful-dune-03fda6b10.4.azurestaticapps.net/api/health |

### 최근 배포 실패 기록 (근거)

- Actions run [41982387841](https://github.com/Team-minari-white-kimch/minari-white-kimch-private/actions/runs/41982387841)
- Actions run [41982601238](https://github.com/Team-minari-white-kimch/minari-white-kimch-private/actions/runs/41982601238)
- Actions run [41982756777](https://github.com/Team-minari-white-kimch/minari-white-kimch-private/actions/runs/41982756777)
- 공통 실패 로그: `deployment_token was not provided` / `ApiToken is invalid`

### 비밀값/Azure 설정 메모

- `AZURE_STATIC_WEB_APPS_API_TOKEN_JOLLY_GRASS_0EECB7A10`: Static Web Apps 배포 토큰(워크플로에서 사용)
- `COPILOT_GITHUB_TOKEN`: 에이전트 API 런타임 토큰(`api/agents.py`, `api/planner.py`에서 사용)
- 두 토큰은 역할이 다르며 서로 대체되지 않는다.
- 이 문서에는 비밀값 원문을 포함하지 않는다.

### 수동 배포 명령 범위

- 이 저장소에서 실제 실행 근거가 확인된 것은 `git --no-pager push origin main` 기반 Actions 배포뿐이다.
- `azd up`, `swa deploy` 등 수동 Azure 배포 명령은 본 저장소 실행 근거를 확인하지 못했으므로 여기서 성공 절차로 단정하지 않는다.

## 문서

| 파일 | 내용 |
|---|---|
| [`PRD.md`](PRD.md) | 무엇을 만들지 — 문제 근거 데이터, 기능, 수용 기준, 평가 기준 대응 |
| [`TRD.md`](TRD.md) | 어떻게 만들지 — 구조, 에이전트·도구, API, 분류 모델 실측, 배포, 테스트 |
| [`TDD.md`](TDD.md) | 왜 그렇게 만들었는지 — 설계 결정 D1~D16 |
| [`AGENTS.md`](AGENTS.md) | 에이전트 작업 규칙, 실행·테스트 방법 |
| [`FEATURES.txt`](FEATURES.txt) | 기능별 브랜치·테스트 정리 |
| [`docs/WEBAPP.md`](docs/WEBAPP.md) | 화면별 설명, 한계, 테스트 시나리오 |
| [`samples/README.md`](samples/README.md) | 샘플 사진 출처·라이선스 |

## 실행

```bash
python3 -m http.server 8765                    # 웹앱 http://localhost:8765
cd api && pip install -r requirements.txt && func start   # API (환경 변수 COPILOT_GITHUB_TOKEN)
python3 tests/e2e_qa.py                        # 화면 E2E 13개 시나리오
python3 tests/test_planner_offline.py          # 계획 에이전트 오프라인 테스트
```

## API 테스트

확인된 API 단위 테스트 파일은 `tests/test_api.py`다.

```bash
uv run --python 3.11 --with-requirements api/requirements.txt python -m unittest tests/test_api.py
```

CI는 의존성 설치 후 기존 unittest 실행 형태를 유지한다.

```bash
python -m unittest tests/test_api.py
```

- 핵심 검증: `/api/health`, 정상 `/api/diagnose`, 잘못된 이미지 처리(`subTest`), 10MB 경계 조건
- 테스트는 외부 경계(Open-Meteo, Azure 토큰, ONNX 다운로드)를 mock으로 대체해 네트워크 없이 실행한다.
- `/api/diagnose`는 본문 상한을 `MAX_DIAGNOSE_BODY`로 별도 적용해(10MiB base64 + JSON 여유) decoded 이미지 10MiB 경계 검증이 실제로 동작한다.
- 다른 엔드포인트(`/api/plan`, `/api/community/ask`)는 기본 본문 제한 3,000,000 bytes(`MAX_BODY`)를 유지한다.
