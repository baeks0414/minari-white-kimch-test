// 배포 확인: node scripts/check-deploy.mjs https://<배포주소>
// 패키지 설치 없이 Node 20+ 내장 fetch만 써요.
const base = (process.argv[2] || '').replace(/\/+$/, '');
if (!base) {
  console.error('사용법: node scripts/check-deploy.mjs https://<배포주소>');
  process.exit(1);
}

const checks = [
  ['/api/health → {"data":{"ok":true}}', '/api/health', async (r) => r.status === 200 && JSON.stringify(await r.json()) === '{"data":{"ok":true}}'],
  ['/api/products → 상품 목록', '/api/products', async (r) => r.status === 200 && Array.isArray((await r.json()).data)],
  ['/ → 화면(index.html)', '/', async (r) => r.status === 200 && (await r.text()).includes('id="root"')],
  ['/store 새로고침 → 404 아님', '/store', async (r) => r.status === 200 && (await r.text()).includes('id="root"')],
  ['/me 새로고침 → 404 아님', '/me', async (r) => r.status === 200 && (await r.text()).includes('id="root"')],
  ['없는 주소 → 앱 NotFound 화면', '/no-such-page-xyz', async (r) => r.status < 500 && (await r.text()).includes('id="root"')],
];

let failed = 0;
for (const [name, path, ok] of checks) {
  let pass = false;
  let detail = '';
  try {
    const res = await fetch(base + path, { redirect: 'follow' });
    detail = `HTTP ${res.status}`;
    pass = await ok(res);
  } catch (e) {
    detail = e.message;
  }
  if (!pass) failed += 1;
  console.log(`${pass ? '✅' : '❌'} ${name}  (${detail})`);
}
console.log(failed ? `\n${failed}개 실패 — docs/AZURE-DEPLOY-PRACTICE.md의 "막히면" 표를 보세요.` : '\n모두 통과했어요.');
process.exit(failed ? 1 : 0);
