# Azure 배포 연습 — 사람이 할 일만 (목표 20~30분, 시작 시각: ____ )

코드·빌드·로컬 확인은 끝나 있어요. 아래만 하면 돼요.

## 1. Portal에서 만들기 (약 5분)
Azure Portal → **Static Web Apps** → 만들기

| 항목 | 값 |
|---|---|
| 리소스 그룹 | 새로 만들기 `rg-swa-practice` (정리할 때 통째로 삭제) |
| 이름 | `minari-practice` (아무거나) |
| 요금제 | **Free** |
| 지역 | **East Asia** |
| 배포 원본 | **GitHub** → 조직 `0dimen` → 저장소 `minari-white-kimch` → 브랜치 **`practice/azure-deploy`** |
| 빌드 사전 설정 | React (또는 Custom) |
| App location | **`/app`** (기본값 `/`에서 바꾸기) |
| Api location | **`/api`** |
| Output location | **`dist`** (기본값 `build`에서 바꾸기) |
| 배포 권한 정책 | 기본값(배포 토큰) |

→ 검토 + 만들기. 조직 `0dimen`이 안 보이면 GitHub 권한 화면에서 조직 접근 허용(Grant).

## 2. 기다리기 (3~5분)
- Azure가 이 브랜치에 `.github/workflows/azure-static-web-apps-*.yml`을 커밋하고, 저장소 시크릿 `AZURE_STATIC_WEB_APPS_API_TOKEN_*`을 만들어요.
- GitHub → Actions 탭에서 초록 체크가 뜨면 끝. 로컬에서 이어서 작업하면 먼저 `git pull`.

## 3. 확인 (1분)
Portal 개요의 URL로 아래를 실행하거나 브라우저로 직접 확인해요.
```
node scripts/check-deploy.mjs https://<배포주소>
```
- [ ] `/api/health` → `{"data":{"ok":true}}`
- [ ] 홈에 "서버가 정상이에요", 장소·맵 목록이 보임
- [ ] `/store`에서 새로고침 → 404 없음
- [ ] `/no-such-page-xyz` → "페이지를 찾을 수 없어요"
- [ ] 끝난 시각: ____ (걸린 시간: ____)

## 막히면
`starter-kit/docs/AZURE-DEPLOY.md`의 "자주 막히는 곳" 표를 먼저 보고, Actions 로그나 오류 화면을 그대로 전달해요.

## 4. 정리 (연습 끝나면)
1. Portal → 리소스 그룹 `rg-swa-practice` 삭제
2. GitHub → Settings → Secrets and variables → Actions → `AZURE_STATIC_WEB_APPS_API_TOKEN_*` 삭제
3. `git push origin --delete practice/azure-deploy` (워크플로 파일도 이 브랜치에만 있어서 같이 사라짐)

## 로컬 실행
```
cd api && npm install && npm start      # http://localhost:7071/api/health
cd app && npm install && npm run dev    # http://localhost:5173 (/api는 7071로 프록시)
```
