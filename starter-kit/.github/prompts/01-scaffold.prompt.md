---
mode: agent
description: 뼈대 + 빈 화면 배포
---
docs/PLAN.md와 docs/DESIGN.md를 읽고 뼈대를 만들어 줘.
1. app/: Vite React(JavaScript) + react-router. PLAN의 화면 목록대로 빈 페이지와 라우트, 하단 nav, NotFound.
2. app/src/styles/tokens.css를 main.jsx에서 import하고 body에 data-app="PLAN의 테마값" 설정. index.html에 DESIGN의 글꼴 link.
3. api/: Azure Functions v4 Node 20, GET /api/health → { data: { ok: true } }.
4. app/public/staticwebapp.config.json은 키트 파일 그대로 사용 (app 폴더 밖으로 옮기지 않기). 배포 방법은 docs/AZURE-DEPLOY.md.
5. 로컬 실행 방법을 README 맨 위에 3줄로.
완료 조건: 배포 주소에서 빈 화면과 메뉴가 열리고 /api/health가 ok.
