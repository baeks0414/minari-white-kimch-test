---
mode: agent
description: 데이터 연결 + 시드
---
PLAN의 '데이터' 표대로 api/src/lib/store.js를 만들어 줘.
- COSMOS_CONNECTION이 있으면 Cosmos, 없으면 seed/ 폴더 JSON을 읽는 메모리 저장소. 함수 이름은 같게(list, get, create, update).
- PLAN의 목록·상세 API 2개를 먼저 만들고, 화면에서 목록을 불러와 카드로 보여 줘.
완료 조건: 목록 API가 시드 개수만큼 돌려주고 첫 화면에 카드가 보임.
