"""토마토 잎 사진 분류 모델 (ONNX, CPU).

PlantVillage 38종으로 학습한 MobileNetV2를 ONNX로 돌린다. 토마토 클래스 10개만
다시 정규화해 상위 3개를 돌려준다. 실제 환경 사진에서는 정확도가 크게 낮으므로
(labels.json의 fieldAccuracy) 결과는 진단 에이전트가 참고하는 근거 하나로만 쓴다.
"""
from __future__ import annotations

import io
import json
import pathlib
from functools import lru_cache

import numpy as np
from PIL import Image, UnidentifiedImageError

HERE = pathlib.Path(__file__).parent / "models"
META = json.loads((HERE / "labels.json").read_text(encoding="utf-8"))
ID2LABEL = {int(k): v for k, v in META["id2label"].items()}
TOMATO_IDS = [i for i, v in ID2LABEL.items() if "Tomato" in v]
MAX_PIXELS = 4096 * 4096


class ImageError(ValueError):
    """사진을 읽을 수 없거나 형식이 맞지 않을 때."""


@lru_cache(maxsize=1)
def _session():
    import onnxruntime as ort  # 첫 요청 때만 불러 콜드스타트를 줄인다

    opts = ort.SessionOptions()
    opts.intra_op_num_threads = 1
    return ort.InferenceSession(str(HERE / "plant-disease-mobilenetv2.onnx"), opts, providers=["CPUExecutionProvider"])


def load_image(data: bytes) -> Image.Image:
    try:
        im = Image.open(io.BytesIO(data))
        if im.format not in ("JPEG", "PNG", "WEBP"):
            raise ImageError("JPG, PNG, WEBP 사진만 분석할 수 있어요")
        if im.width * im.height > MAX_PIXELS:
            raise ImageError("사진이 너무 커요")
        return im.convert("RGB")
    except (UnidentifiedImageError, OSError) as ex:
        raise ImageError("사진을 읽을 수 없어요") from ex


def _preprocess(im: Image.Image) -> np.ndarray:
    cfg = META["input"]
    w, h = im.size
    k = cfg["shortest_edge"] / min(w, h)
    im = im.resize((max(1, round(w * k)), max(1, round(h * k))), Image.BILINEAR)
    w, h = im.size
    c = cfg["crop"]
    left, top = (w - c) // 2, (h - c) // 2
    im = im.crop((left, top, left + c, top + c))
    x = np.asarray(im, dtype=np.float32) / 255.0
    x = (x - np.array(cfg["mean"], np.float32)) / np.array(cfg["std"], np.float32)
    return x.transpose(2, 0, 1)[None]


def classify(data: bytes) -> dict:
    """사진 바이트 → 토마토 클래스 상위 3개와 확률."""
    im = load_image(data)
    sess = _session()
    logits = sess.run(None, {sess.get_inputs()[0].name: _preprocess(im)})[0][0].astype(np.float64)
    p_all = np.exp(logits - logits.max())
    p_all /= p_all.sum()
    tomato_share = float(p_all[TOMATO_IDS].sum())
    best_all = int(np.argmax(p_all))
    t = p_all[TOMATO_IDS] / max(tomato_share, 1e-9)
    order = np.argsort(-t)[:3]
    top = [{"label": ID2LABEL[TOMATO_IDS[i]], "prob": round(float(t[i]), 3)} for i in order]
    return {
        "top": top,
        "tomatoShare": round(tomato_share, 3),
        "bestOverall": ID2LABEL[best_all],
        "model": META["model"],
        "fieldAccuracy": META["fieldAccuracy"],
        "note": "PlantVillage(실험실 사진) 학습 모델이에요. 실제 밭 사진에서는 1순위 정답률이 약 30%라 참고 근거로만 써요.",
    }
