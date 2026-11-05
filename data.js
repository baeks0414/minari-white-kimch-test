// 앱에서 쓰는 기준 데이터. 출처가 있는 값만 넣고, 시연용 가상 데이터는 "예시"로 표시한다.

export const FARM = {
  name: '청도 새내기 농부',
  region: '경북 청도군',
  lat: 35.6475, lon: 128.7339, // 청도군청 부근
};

export const WORK_TYPES = ['수확', '관수', '시비', '방제', '전정', '풀베기', '덮개·보온', '농기계 사용', '증상 관찰', '기타'];

// 증상 체크 항목 (사진에서 보이는 특징)
export const SYMPTOMS = {
  '토마토': [
    {
      "id": "t_concentric",
      "label": "잎에 동심원(과녁) 무늬 갈색 반점"
    },
    {
      "id": "t_yellow_halo",
      "label": "반점 둘레가 노랗게 변함"
    },
    {
      "id": "t_lower_first",
      "label": "아래쪽 오래된 잎부터 생김"
    },
    {
      "id": "t_water_soaked",
      "label": "물에 젖은 듯한 큰 회녹색·갈색 병반"
    },
    {
      "id": "t_white_mold_under",
      "label": "습할 때 병반 둘레·뒷면에 흰 곰팡이"
    },
    {
      "id": "t_upper_yellow",
      "label": "잎 윗면에 경계가 흐린 노란 무늬"
    },
    {
      "id": "t_olive_mold_under",
      "label": "잎 뒷면에 올리브·회갈색 벨벳 같은 곰팡이"
    },
    {
      "id": "t_curl_up_yellow",
      "label": "새 잎이 작아지고 노랗게 위로 말림"
    },
    {
      "id": "t_stunt",
      "label": "생육이 멈추고 키가 작아짐"
    },
    {
      "id": "t_whitefly",
      "label": "잎 뒷면에 작은 흰 날벌레(가루이)"
    },
    {
      "id": "t_small_dark_spots",
      "label": "작고 검은 물집 같은 반점(지름 수 mm)"
    },
    {
      "id": "t_fruit_scab",
      "label": "열매에 거칠고 볼록한 갈색 점"
    }
  ],
};

// 병해충 참고 정보: 일반적인 증상과 재배적 관리만 적는다. 약제명·희석 배수는 넣지 않는다.
export const PESTS = [
  // 토마토: 사진 분류 모델(api/classifier.py) 라벨과 연결된다. api/reference.json과 같은 내용.
  {"id": "tomato_early_blight", "crop": "토마토", "name": "겹둥근무늬병", "kind": "병 (곰팡이)", "label": "Tomato with Early Blight", "keys": ["t_concentric", "t_yellow_halo", "t_lower_first"], "wetBoost": true, "feature": "아래쪽 오래된 잎부터 갈색~검은 반점이 생기고, 커지면서 동심원(과녁) 무늬가 나타납니다. 반점 둘레가 노랗게 변하는 경우가 많습니다.", "care": ["병든 아래 잎을 따서 밭 밖에서 처리하세요.", "잎이 오래 젖어 있지 않게 포기 밑동에 물을 주세요(점적관수 권장).", "비료가 부족하면 세력이 약해져 잘 걸려요. 시비 기록을 확인하세요.", "가지과(토마토·고추·감자·가지)가 아닌 작물로 돌려짓기하면 줄일 수 있어요."], "sources": [{"title": "Univ. of Florida IPM — Early Blight", "url": "https://ipm.ifas.ufl.edu/pdfs/Early_Blight.pdf"}, {"title": "Oklahoma State Univ. Extension — Early Blight of Tomato", "url": "https://extension.okstate.edu/programs/digital-diagnostics/plant-diseases/early-blight-of-tomato.html"}, {"title": "국가농작물병해충관리시스템 도감 (등록 약제·최신 정보 확인)", "url": "https://ncpms.rda.go.kr"}]},
  {"id": "tomato_late_blight", "crop": "토마토", "name": "역병", "kind": "병 (난균)", "label": "Tomato with Late Blight", "keys": ["t_water_soaked", "t_white_mold_under"], "wetBoost": true, "feature": "잎에 경계가 불분명한 물에 젖은 듯한 병반이 생겨 빠르게 넓어지고, 서늘하고 습하면 흰 곰팡이(균사·포자)가 보입니다.", "care": ["병든 잎·줄기는 바로 제거해 밭 밖에서 처리하세요(태우거나 깊이 묻기).", "시설은 환기를 충분히 해 과습을 막고, 물 빠짐을 좋게 하세요.", "서늘하고 비가 이어지면 2~3일 간격으로 번지는지 확인하세요."], "sources": [{"title": "농촌진흥청 웹진 (병해 관리)", "url": "https://www.rda.go.kr/webzine/2020/10/sub2-4.html"}, {"title": "국가농작물병해충관리시스템 도감 (등록 약제·최신 정보 확인)", "url": "https://ncpms.rda.go.kr"}]},
  {"id": "tomato_leaf_mold", "crop": "토마토", "name": "잎곰팡이병", "kind": "병 (곰팡이)", "label": "Tomato with Leaf Mold", "keys": ["t_upper_yellow", "t_olive_mold_under"], "wetBoost": true, "feature": "잎 윗면에 경계가 흐린 노란 무늬가 생기고, 뒷면에 회백색~올리브색 벨벳 같은 곰팡이가 빽빽하게 핍니다. 시설 재배에서 흔합니다.", "care": ["환기·제습으로 잎이 젖어 있는 시간을 줄이세요(잎 결로 9시간 이상에서 발생이 늘었다는 연구가 있어요).", "아래쪽 빽빽한 잎을 정리해 통풍을 좋게 하세요.", "흑색 비닐이나 짚으로 멀칭하면 발생을 줄일 수 있어요.", "병든 잎은 따서 밭 밖에서 처리하세요."], "sources": [{"title": "토마토 재배에서 점무늬병 및 잎곰팡이병 발생 예측 및 방제력 연구 (KoreaScience)", "url": "https://koreascience.kr/article/JAKO202232055720394.page"}, {"title": "유기농 토마토 잎곰팡이병 등 방제 연구 (KoreaScience)", "url": "https://koreascience.kr/article/JAKO201209857779038.page"}, {"title": "국가농작물병해충관리시스템 도감 (등록 약제·최신 정보 확인)", "url": "https://ncpms.rda.go.kr"}]},
  {"id": "tomato_tylcv", "crop": "토마토", "name": "황화잎말림바이러스병 (TYLCV)", "kind": "바이러스 (담배가루이가 옮김)", "label": "Tomato Yellow Leaf Curl Virus", "keys": ["t_curl_up_yellow", "t_stunt", "t_whitefly"], "feature": "새 잎이 작아지고 잎 끝이 노랗게 변하면서 위로 말립니다. 심하면 생육이 멈추고 열매가 잘 달리지 않습니다. 담배가루이가 옮깁니다.", "care": ["바이러스는 치료 약이 없어요. 의심 포기는 뿌리째 뽑아 비닐봉지에 밀폐해 버리세요.", "끈끈이트랩으로 담배가루이를 살피고, 밀도가 낮을 때 등록 약제로 방제하세요(작용 기작이 다른 약제를 번갈아).", "주변 잡초와 방치된 토마토·고추 같은 기주 식물을 정리하세요.", "확진은 농업기술센터에 진단을 맡기세요."], "sources": [{"title": "농촌진흥청 — 토마토황화잎말림바이러스 방제 자료 (농사로)", "url": "https://www.nongsaro.go.kr/cms_contents/136/88822_MF_ATTACH_01.pdf"}, {"title": "국가농작물병해충관리시스템 도감 (등록 약제·최신 정보 확인)", "url": "https://ncpms.rda.go.kr"}]},
  {"id": "tomato_bacterial_spot", "crop": "토마토", "name": "세균점무늬병", "kind": "병 (세균)", "label": "Tomato with Bacterial Spot", "keys": ["t_small_dark_spots", "t_yellow_halo", "t_fruit_scab"], "wetBoost": true, "feature": "잎에 지름 수 mm의 작고 검은 물집 같은 반점이 많이 생기고, 열매에는 거칠고 볼록한 갈색 점이 생깁니다. 비·물 튀김으로 퍼집니다.", "care": ["잎이 젖어 있을 때는 작업하지 마세요(세균이 손·도구로 옮겨요).", "위에서 뿌리는 물주기를 피하고, 쓴 도구는 소독하세요.", "병든 잎은 따서 밭 밖에서 처리하세요.", "건전한 종자·모종을 쓰는 것이 가장 중요해요. 세균병은 발병 후보다 예방이 효과적이에요."], "sources": [{"title": "Ball Seed — Identify and treat bacterial leaf spot (Xanthomonas)", "url": "https://www.ballseed.com/Literature/TechDocs/Document/1469/identify-and-treat-bacterial-leaf-spot-xanthomonas"}, {"title": "국가농작물병해충관리시스템 도감 (등록 약제·최신 정보 확인)", "url": "https://ncpms.rda.go.kr"}]},
  {"id": "tomato_healthy", "crop": "토마토", "name": "건강한 잎 (뚜렷한 증상 없음)", "kind": "정상", "label": "Healthy Tomato Plant", "keys": [], "feature": "병반, 변색, 곰팡이, 벌레 흔적이 뚜렷하게 보이지 않습니다.", "care": ["지금처럼 관리하면서 일주일 뒤 같은 잎을 다시 찍어 비교해 보세요.", "아래쪽 오래된 잎과 잎 뒷면도 함께 살펴보세요."], "sources": [{"title": "국가농작물병해충관리시스템 도감 (등록 약제·최신 정보 확인)", "url": "https://ncpms.rda.go.kr"}]},
];

export const PEST_LINKS = {
  ncpms: 'https://ncpms.rda.go.kr',
  bulletin: 'https://weather.rda.go.kr/news/dbyhsCccrrncInfo.do',
  pesticide: 'https://psis.rda.go.kr',
};

// 농기계 추천 기준. 기종 이름은 청도군 임대사업소 보유 현황(seed/machinery-cheongdo.json)과 같게 쓴다.
// 면적 구간(max, ha)은 앱이 정한 예시 기준이다. 실제 기종 선택은 사업소 상담으로 확인한다.
export const MACHINE_GUIDE = [
  { work: '방제', crops: ['토마토'],
    tiers: [
      { max: 0.3, use: ['동력분무기', '동력호스권취기'], why: '작은 밭은 동력분무기에 호스를 길게 빼서 뿌리는 편이 다루기 쉬워요.' },
      { max: 99, use: ['동력살분무기', '동력분무기', '동력호스권취기'], why: '넓은 밭은 멀리 뿜어 주는 살분무기로 시간을 줄여요. 호스 권취기가 있으면 정리가 빨라요.' },
    ],
    note: '약제는 작물에 등록된 것인지 농약안전정보시스템에서 확인하고 라벨대로만 쓰세요. 마스크·장갑·보안경을 갖추세요.' },
  { work: '풀베기', crops: ['토마토'],
    tiers: [
      { max: 0.3, use: ['동력예취기'], why: '나무 사이나 둑처럼 좁은 곳은 어깨에 메는 예취기가 편해요.' },
      { max: 99, use: ['승용예취기', '동력예취기'], why: '과수원 줄 사이가 넓으면 타고 다니는 승용예취기, 나무 밑동은 예취기로 마무리해요.' },
    ],
    note: '돌이 튀므로 보안경·정강이 보호대를 쓰고, 주변 사람과 15m 이상 떨어져 작업하세요.' },
  { work: '밭갈이·로터리', crops: ['토마토'],
    tiers: [
      { max: 0.1, use: ['관리기(작업기 포함)'], why: '하우스 한 동이나 텃밭 규모는 관리기로 충분해요.' },
      { max: 0.5, use: ['경운기(작업기 포함)', '관리기(작업기 포함)'], why: '중간 규모는 경운기 로터리가 알맞아요.' },
      { max: 99, use: ['트랙터(작업기 포함)', '심토쟁기'], why: '넓은 밭은 트랙터 로터리, 땅이 굳었으면 심토쟁기로 깊이 갈아요.' },
    ],
    note: '트랙터는 운전 경험이 필요해요. 처음이면 사업소 사용 교육을 먼저 받으세요.' },
  { work: '운반·상하차', crops: ['토마토'],
    tiers: [
      { max: 0.3, use: ['보행형운반리프트', '상하차용사다리'], why: '작은 밭은 걸으면서 미는 운반리프트로 상자를 옮겨요.' },
      { max: 99, use: ['다목적운반차', '상하차용사다리'], why: '넓은 밭은 다목적운반차, 트럭에 실을 때는 상하차용 사다리를 써요.' },
    ],
    note: '' },
  { work: '퇴비·비료 뿌리기', crops: ['토마토'],
    tiers: [
      { max: 0.3, use: ['동력비료살포기'], why: '작은 밭은 메고 다니는 동력비료살포기로 고르게 뿌려요.' },
      { max: 99, use: ['퇴비살포기', '동력비료살포기'], why: '넓은 밭에 퇴비를 넣을 때는 퇴비살포기가 빨라요.' },
    ],
    note: '밑거름 양은 토양검정 결과를 보고 정하세요.' },
  { work: '하우스 짓기·보수', crops: ['토마토'],
    tiers: [{ max: 99, use: ['파이프벤딩성형기', '동력항타기'], why: '하우스 파이프를 구부리고(벤딩) 땅에 박을(항타) 때 써요.' }],
    note: '' },
  { work: '파종·모종 심기', crops: [],
    tiers: [{ max: 99, use: ['파종기', '동력이식기'], why: '씨앗은 파종기, 모종은 이식기로 줄 간격을 맞춰요.' }],
    note: '' },
  { work: '대추 수확·선별', crops: ['대추'],
    tiers: [{ max: 99, use: ['대추수확기', '대추선별기'], why: '청도 대추 수확철에 털고, 크기별로 골라요.' }],
    note: '대추선별기는 산동분소에만 있어요.' },
  { work: '마늘 파종·선별', crops: ['마늘'],
    tiers: [{ max: 99, use: ['마늘쪽분리기', '마늘쪽선별기', '통마늘선별기', '파종기'], why: '씨마늘 쪽을 나누고 골라서 파종해요.' }],
    note: '' },
  { work: '감자·고구마·땅콩 캐기', crops: [],
    tiers: [{ max: 99, use: ['땅속작물수확기', '땅콩탈피기'], why: '땅속 작물을 캐고, 땅콩은 껍질까지 기계로 까요.' }],
    note: '땅속작물수확기는 트랙터·관리기에 달아 쓰는 경우가 많아요. 함께 빌려야 하는지 물어보세요.' },
  { work: '콩·잡곡 수확', crops: [],
    tiers: [{ max: 99, use: ['콩예취기', '잡곡수확기', '탈곡기·정선기', '풍구'], why: '베고, 털고, 바람으로 쭉정이를 골라내요.' }],
    note: '' },
  { work: '포도 당도 재기', crops: ['포도'],
    tiers: [{ max: 99, use: ['포도비파괴당도측정기'], why: '송이를 따지 않고 당도를 재서 수확 시기를 정해요.' }],
    note: '' },
];

// 처음 빌릴 때 사업소에 물어볼 것 (값을 지어내지 않고 질문으로만 안내)
export const RENTAL_ASK = [
  '원하는 날짜에 예약할 수 있는지, 며칠 전부터 예약 받는지',
  '하루 임대료와 보증금, 필요한 서류(농업경영체 등록 등)',
  '기계를 실어 갈 트럭이 필요한지, 배송해 주는지',
  '처음 쓰는 기계라면 사용 교육을 받을 수 있는지',
  '반납 시간과 고장·파손 시 처리 방법',
];

// 커뮤니티 예시 글 (가상의 선배 농부, 시연용)
export const SEED_POSTS = [
  { id: 's1', type: 'tip', author: '하우스 토마토 15년', senior: true, crop: '토마토', topic: '서리·보온', createdAt: '2026-11-03T19:10:00+09:00', likes: 12, example: true,
    title: '밤 기온이 10도 아래로 내려가기 전에 할 일',
    body: '밤 최저기온이 10도 아래로 내려간다는 예보가 나오면 해 지기 전에 보온 커튼을 닫고 측창을 일찍 닫습니다. 다음 날 아침에는 결로가 생기니 해 뜬 뒤 짧게 환기합니다.' },
  { id: 's2', type: 'tip', author: '이서 귀농 7년차', senior: true, crop: '토마토', topic: '병해충', createdAt: '2026-11-01T08:20:00+09:00', likes: 9, example: true,
    title: '비 온 뒤에는 아래 잎부터 살핍니다',
    body: '비가 이어지면 아래쪽 오래된 잎에 동심원 무늬 반점이 늘어납니다. 보이는 대로 따서 하우스 밖으로 내가고, 약은 꼭 토마토에 등록된 약제인지 농약안전정보시스템에서 확인한 뒤 라벨대로만 씁니다.' },
  { id: 's3', type: 'tip', author: '시설토마토 20년', senior: true, crop: '토마토', topic: '물 관리', createdAt: '2026-10-29T07:00:00+09:00', likes: 15, example: true,
    title: '물은 포기 밑동에, 잎은 젖지 않게',
    body: '잎이 오래 젖어 있으면 곰팡이병이 잘 생깁니다. 점적관수로 포기 밑동에만 물을 주고, 흐린 날에는 양을 줄입니다.' },
  { id: 's4', type: 'tip', author: '각남 시설채소 12년', senior: true, crop: '공통', topic: '농기계', createdAt: '2026-10-27T12:00:00+09:00', likes: 7, example: true,
    title: '수확철 임대 농기계는 일찍 예약하세요',
    body: '수확철에는 운반차와 고소작업차 예약이 몰립니다. 작업 날짜가 정해지면 바로 임대사업소에 전화해 두고, 반납일을 달력에 적어 둡니다.' },
  { id: 's5', type: 'tip', author: '풍각 시설채소 10년', senior: true, crop: '공통', topic: '일손', createdAt: '2026-10-25T18:30:00+09:00', likes: 6, example: true,
    title: '계절근로자 작업 지시는 사진과 짧은 문장으로',
    body: '오늘 할 일을 짧은 문장으로 적고 사진을 같이 보여 주면 실수가 줄어듭니다. 휴게 시간과 끝나는 시간을 처음에 꼭 알려 줍니다.' },
  { id: 'q1', type: 'question', author: '새내기 2년차', senior: false, crop: '토마토', topic: '시비', createdAt: '2026-11-04T21:00:00+09:00', likes: 2, example: true,
    title: '수확 끝난 하우스, 밑거름은 언제 주나요?',
    body: '올해 처음 토마토 수확을 끝냈는데, 다음 작기 전에 밑거름을 언제 얼마나 줘야 할지 헷갈립니다.' },
];

export const SEED_COMMENTS = [
  { id: 'c1', postId: 'q1', author: '하우스 토마토 15년', senior: true, createdAt: '2026-11-05T06:40:00+09:00', example: true,
    body: '저는 작기 끝나고 다음 정식 2~3주 전에 줍니다. 양은 토양검정 받아서 흙토람 처방서대로 하세요. 농업기술센터에서 검정해 줍니다.' },
];

export const TOPICS = ['전체', '병해충', '서리·보온', '물 관리', '시비', '농기계', '일손', '기타'];

// 검증된 공개 데이터셋 샘플 사진 (정답 라벨이 있는 사진). 출처·라이선스를 화면에 함께 보여 준다.
export const SAMPLES = [
  {
    "id": "early_blight",
    "file": "samples/early_blight.jpg",
    "answer": "Tomato with Early Blight",
    "set": "PlantVillage (실험실 촬영)",
    "license": "CC0 1.0",
    "url": "https://data.mendeley.com/datasets/tywbtsjrjv/1"
  },
  {
    "id": "late_blight",
    "file": "samples/late_blight.jpg",
    "answer": "Tomato with Late Blight",
    "set": "PlantDoc test (실제 환경)",
    "license": "CC BY 4.0",
    "url": "https://github.com/pratikkayal/PlantDoc-Dataset"
  },
  {
    "id": "leaf_mold",
    "file": "samples/leaf_mold.jpg",
    "answer": "Tomato with Leaf Mold",
    "set": "PlantDoc test (실제 환경)",
    "license": "CC BY 4.0",
    "url": "https://github.com/pratikkayal/PlantDoc-Dataset"
  },
  {
    "id": "yellow_leaf_curl",
    "file": "samples/yellow_leaf_curl.jpg",
    "answer": "Tomato Yellow Leaf Curl Virus",
    "set": "PlantVillage (실험실 촬영)",
    "license": "CC0 1.0",
    "url": "https://data.mendeley.com/datasets/tywbtsjrjv/1"
  },
  {
    "id": "bacterial_spot",
    "file": "samples/bacterial_spot.jpg",
    "answer": "Tomato with Bacterial Spot",
    "set": "PlantVillage (실험실 촬영)",
    "license": "CC0 1.0",
    "url": "https://data.mendeley.com/datasets/tywbtsjrjv/1"
  },
  {
    "id": "healthy",
    "file": "samples/healthy.jpg",
    "answer": "Healthy Tomato Plant",
    "set": "PlantVillage (실험실 촬영)",
    "license": "CC0 1.0",
    "url": "https://data.mendeley.com/datasets/tywbtsjrjv/1"
  }
];
