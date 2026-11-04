# Azure 배포 연습 가이드 (Static Web Apps + 관리형 Functions)
연습용 앱: `청도퀘스트_리허설결과물_참고용.zip` (11/4 리허설 앱, 제출 금지) → 개인 연습 저장소에 올려서 연습

## 폴더 구조 (이대로면 그대로 배포됨)
```
app/                      ← 화면 (Vite React)
  public/staticwebapp.config.json   ← 꼭 여기 (빌드하면 dist/에 같이 복사됨)
  package.json            ← "build": "vite build" → dist/
api/                      ← Azure Functions v4 (Node 20)
  host.json
  package.json            ← "main": "src/functions/index.js"
  src/functions/index.js  ← app.http('api', { route: '{*path}' })
```

## 순서 (20~30분)
1. 연습 저장소를 GitHub에 push (main)
2. Azure Portal → Static Web Apps → 만들기
   - 요금제: Free / 지역: East Asia(가까운 곳)
   - 배포 원본: GitHub → 저장소·main 브랜치 선택
   - 빌드 사전 설정: React(또는 Custom)
   - **App location: `/app` · Api location: `/api` · Output location: `dist`**
3. 만들면 저장소에 `.github/workflows/azure-static-web-apps-*.yml`이 자동으로 커밋됨 → GitHub Actions 탭에서 빌드 확인 (3~5분)
4. 배포 주소에서 확인
   - `/api/health` → `{"data":{"ok":true}}`
   - `/store` 같은 주소에서 새로고침 → 404 없이 열리면 config 정상
5. (AI 쓸 때) Portal → 해당 Static Web App → 설정 → 환경 변수: `AOAI_ENDPOINT`, `AOAI_KEY`, `AOAI_DEPLOYMENT` (코드·커밋에는 절대 넣지 않기)

## 자주 막히는 곳
| 증상 | 원인 | 해결 |
|---|---|---|
| 새로고침하면 404 | config가 app 폴더 밖에 있음 | `app/public/staticwebapp.config.json` |
| /api/... 가 404 | Api location 비었거나 api/package.json의 main 경로 틀림 | 워크플로 yml의 `api_location: "api"`, main 확인 |
| /api 500 | Functions 패키지 미설치·Node 버전 | api/package.json에 `@azure/functions`, config의 `"apiRuntime": "node:20"` |
| 빌드 실패 | output 위치 틀림 | yml의 `output_location: "dist"` (app 기준 경로) |
| 화면은 뜨는데 데이터 없음 | 메모리 저장소라 재시작 때 초기화 | 정상 (당일엔 Cosmos 연결 또는 그대로 시연) |

## 당일 원칙
- 대회 시작하면 **빈 화면부터 배포**해서 파이프라인 먼저 확인 (14:30 중간 배포 전에 최소 3번 배포)
- main에 push = 자동 배포. 깨지면 직전 커밋으로 되돌리기
