# 디자인 규칙 (수희 님 브랜드 보드 기준, tokens.css v2)
- 색은 tokens.css 변수만. 오렌지(#F28A32) 버튼 글씨는 먹빛(#3C332D) — 흰 글씨 금지(대비 2.5:1).
- 자연초록 #78966A는 장식·일러스트만. 초록 버튼·글씨는 --leaf-strong(#4E6B42) + 흰 글씨.
- 미래 제안·정보는 하늘(#2F5DA8), 시네마 밤 화면은 밤마실(#2B2A4A).
- 글꼴: 제목·버튼 Gmarket Sans / 본문 Pretendard 16px / 하숙 편지 Gowun Batang.
  index.html <head>: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"> (Gmarket Sans는 tokens.css의 @font-face)
- 아이콘: 조작은 lucide-react 24px, 장소·상품은 보드 일러스트 아이콘(없으면 이모지 대체).
- 캐릭터(소): 시작·미션 완료·빈 화면·오류 화면.
- 레이아웃: 최대 폭 480px 가운데, 좌우 16px, 카드 둥글기 16, 버튼 알약 48px.
- body data-app: quest / cinema / hasuk, data-region: cheongdo.
