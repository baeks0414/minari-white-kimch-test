# 미나리 백김치 당일 시작 키트 (11/4 준비)
주제는 11/5 당일 공개 → 3안 중 하나를 골라 각색해서 쓴다.

## 당일 순서
1. 주제 확인 → 맞는 안 고르기: docs/PLAN-quest.md / PLAN-cinema.md / PLAN-hasuk.md
2. 고른 파일을 docs/PLAN.md로 복사하고 맨 위 '주제 문장'과 [주제어] 자리만 고치기
3. 새 저장소에 이 키트의 .github/ docs/ app/src/styles/ seed/ tests/ staticwebapp.config.json 복사 (운영진이 사전 준비물 사용을 허용한 경우만)
4. Copilot Chat에서 /01-scaffold → /02-data → /03-core → /04-flow → /05-ai → /06-readme 순서로 실행, 단계마다 커밋·push(자동 배포)
5. 15:00 전 docs/QA.md 확인 → `npm i -D @playwright/test` 후 `BASE_URL=배포주소 ROUTES="/,/maps,/store,/me" npx playwright test tests/smoke.spec.js` (라우트는 고른 PLAN에 맞게)

## 파일
| 파일 | 내용 |
|---|---|
| .github/copilot-instructions.md | 항상 지키는 규칙 (평가 대응 포함) |
| .github/instructions/*.md | 화면(app/)·API(api/) 규칙 |
| .github/prompts/01~06 | 단계별 Copilot 프롬프트 |
| docs/PLAN-*.md | 3안 기획 요약 (화면·데이터·핵심 로직·AI·데모 시나리오) |
| docs/DESIGN.md | 수희 님 보드 기준 디자인 규칙 |
| docs/QA.md | 자동 채점 대응 점검표 |
| app/src/styles/tokens.css | 색·글꼴·테마 변수 (v2) |
| seed/*.json | 3안 시드 데이터 (하숙집·호스트는 가상) |
| tests/smoke.spec.js | 권한 없는 가상 유저 자동 점검 |
| staticwebapp.config.json | 새로고침 404 방지 |

## 11/4 리허설 결과 (Claude가 퀘스트안으로 01~06 끝까지 실행)
- 결과: 서버 단위 테스트 7개 통과, 화면 자동 점검 11개 통과(가입→퀘스트→제안→교환→마이페이지, 권한 없음), 코드 검사 경고 0
- 실제 배포는 안 함(Azure 계정 없음) → 당일 01단계에서 빈 화면 배포부터 꼭 확인
- 찾아서 키트에 반영한 문제
  1. Node 22에서 `node --test test/`가 실패 → `node --test test/*.test.js`
  2. 데모 포인트(400P)로 데모 상품(800P)을 못 바꿈 → 감말랭이 한 봉 교환권 400P로 조정
  3. 가입 전 스토어·마이페이지를 바로 열면 /me 404가 콘솔에 찍힘 → 가입 전엔 호출 안 함 (가상 유저 채점 위험)
  4. 외부 글꼴 CDN이 막히면 점검 스크립트가 실패로 셈 → 우리 주소 오류만 세도록 수정 (현장 와이파이에서 글꼴이 안 뜰 수 있으니 기본 글꼴로도 보기 괜찮은지 확인)
  5. 화면: 코드 입력 버튼이 카드 밖으로, 미션 목록 들여쓰기, 지도 핀 겹침 → 화면 규칙 추가
- 참고: Claude 작업 시간은 사람+Copilot 시간과 달라서 당일 시간표 기준으로 쓰지 않음
