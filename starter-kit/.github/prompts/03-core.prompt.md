---
mode: agent
description: 핵심 로직(서버 계산)
---
PLAN의 '핵심 로직' 항목을 api/src/lib/에 순수 함수로 만들고 테스트(node --test)를 붙여 줘.
그다음 그 함수를 쓰는 API를 만들어 줘. 잘못된 입력은 400, 중복·잔액 부족·날짜 겹침은 409.
함수 위 주석에 기능 ID를 적어 줘.
완료 조건: npm test(node --test test/*.test.js) 통과, API를 curl로 호출해 정상·거절 둘 다 확인.
