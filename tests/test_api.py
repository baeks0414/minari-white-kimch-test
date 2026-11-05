import base64
import json
import pathlib
import sys
import unittest
from unittest.mock import AsyncMock, patch

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "api"))

import function_app  # noqa: E402


class DummyRequest:
    def __init__(self, body: bytes):
        self._body = body

    def get_body(self):
        return self._body


def _json_response(resp):
    return json.loads(resp.get_body().decode("utf-8"))


def _data_url(kind: str, raw: bytes, header_suffix: str = ";base64") -> str:
    return f"data:image/{kind}{header_suffix},{base64.b64encode(raw).decode('ascii')}"


PNG_1X1 = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO7ZxWQAAAAASUVORK5CYII=")
GIF_1X1 = base64.b64decode("R0lGODdhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=")


class ApiTest(unittest.IsolatedAsyncioTestCase):
    def test_health(self):
        resp = function_app.health(DummyRequest(b""))
        body = _json_response(resp)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(body["ok"])
        self.assertIn("agent", body)
        self.assertIn("classifier", body)

    async def test_diagnose_success(self):
        req = DummyRequest(json.dumps({
            "crop": "토마토",
            "symptoms": ["t_spot"],
            "image": _data_url("png", PNG_1X1),
        }, ensure_ascii=False).encode("utf-8"))
        expected = {"top": [{"name": "겹둥근무늬병", "conf": "중간", "evidence": ["도감"]}], "dropped": [], "hard": False}
        with patch.object(function_app.agents, "enabled", return_value=True), \
             patch.object(function_app.agents, "diagnose", AsyncMock(return_value=expected)) as diagnose_mock, \
             patch.object(function_app.classifier, "classify", return_value={"top": [{"label": "healthy", "prob": 0.9}]}):
            resp = await function_app.diagnose(req)
        body = _json_response(resp)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(body["top"][0]["name"], "겹둥근무늬병")
        self.assertIn("ms", body)
        self.assertEqual(body["classifier"]["top"][0]["label"], "healthy")
        called_image = diagnose_mock.await_args.args[3]
        called_mime = diagnose_mock.await_args.args[4]
        self.assertIsInstance(called_image, bytes)
        self.assertEqual(called_mime, "image/png")

    async def test_diagnose_invalid_image(self):
        cases = [
            ("형식 아님", "data:text/plain;base64,SGVsbG8=", "이미지는 JPG·PNG·WEBP 형식"),
            ("base64 헤더 누락", f"data:image/png,{base64.b64encode(PNG_1X1).decode('ascii')}", "이미지는 JPG·PNG·WEBP 형식"),
            ("헤더 속성 추가", f"data:image/png;anything;base64,{base64.b64encode(PNG_1X1).decode('ascii')}", "이미지는 JPG·PNG·WEBP 형식"),
            ("잘못된 base64", "data:image/png;base64,%%%BAD%%%", "이미지는 JPG·PNG·WEBP 형식"),
            ("빈 이미지 데이터", "data:image/png;base64,", "이미지는 JPG·PNG·WEBP 형식"),
            ("유효 base64 비이미지", _data_url("png", b"this-is-not-image-data"), "이미지는 JPG·PNG·WEBP 형식"),
            ("미지원 실제 포맷", _data_url("png", GIF_1X1), "이미지는 JPG·PNG·WEBP 형식"),
            ("손상된 이미지", _data_url("png", PNG_1X1[:12]), "이미지는 JPG·PNG·WEBP 형식"),
        ]
        for name, image, expected_error in cases:
            with self.subTest(name=name):
                req = DummyRequest(json.dumps({"crop": "토마토", "image": image}, ensure_ascii=False).encode("utf-8"))
                resp = await function_app.diagnose(req)
                body = _json_response(resp)
                self.assertEqual(resp.status_code, 400)
                self.assertIn(expected_error, body["error"])

        exact_limit_image = PNG_1X1 + (b"\0" * (function_app.MAX_IMAGE_BYTES - len(PNG_1X1)))
        exact_limit_payload = json.dumps({
            "crop": "고추",
            "image": _data_url("png", exact_limit_image),
        }, ensure_ascii=False).encode("utf-8")
        with patch.object(function_app.agents, "enabled", return_value=False):
            resp = await function_app.diagnose(DummyRequest(exact_limit_payload))
        self.assertEqual(resp.status_code, 503)

        over_limit_image = exact_limit_image + b"\0"
        over_limit_payload = json.dumps({
            "crop": "고추",
            "image": _data_url("png", over_limit_image),
        }, ensure_ascii=False).encode("utf-8")
        resp = await function_app.diagnose(DummyRequest(over_limit_payload))
        body = _json_response(resp)
        self.assertEqual(resp.status_code, 400)
        self.assertIn("10MB", body["error"])

        oversized_payload = over_limit_payload + (b" " * 300_000)
        self.assertGreater(len(oversized_payload), function_app.MAX_DIAGNOSE_BODY)
        resp = await function_app.diagnose(DummyRequest(oversized_payload))
        body = _json_response(resp)
        self.assertEqual(resp.status_code, 400)
        self.assertIn("10MB", body["error"])


if __name__ == "__main__":
    raise SystemExit(unittest.main())
