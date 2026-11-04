// 가상 유저 자동 점검 — 위치·카메라 권한 없이 배포 주소를 돌아다니며 404·500·콘솔 오류를 찾는다.
// 실행: BASE_URL=https://배포주소 ROUTES="/,/maps,/store,/me" npx playwright test tests/smoke.spec.js
const { test, expect } = require('@playwright/test');

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const ROUTES = (process.env.ROUTES || '/').split(',');

test.use({ permissions: [], viewport: { width: 390, height: 844 } }); // 권한 없음, 휴대폰 화면

for (const route of ROUTES) {
  test(`라우트 ${route}: 열리고 새로고침해도 정상`, async ({ page }) => {
    const errors = [];
    // 같은 주소(우리 앱)에서 난 오류만 센다. 외부 글꼴·CDN이 막힌 경우는 앱 오류가 아니므로 뺀다.
    page.on('console', (m) => {
      const src = m.location().url || '';
      if (m.type() === 'error' && (!src || src.startsWith(BASE))) errors.push(m.text());
    });
    page.on('response', (r) => r.status() >= 500 && errors.push(`${r.status()} ${r.url()}`));

    const res = await page.goto(BASE + route);
    expect(res.status(), '첫 응답').toBeLessThan(400);
    await page.reload();
    await expect(page.locator('h1'), '화면 제목 h1 하나').toHaveCount(1);
    await expect(page.locator('body')).not.toContainText('404');
    expect(errors, '콘솔 오류·500 응답').toEqual([]);
  });
}

test('없는 주소는 앱 안의 안내 화면', async ({ page }) => {
  await page.goto(BASE + '/no-such-page-xyz');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link').first()).toBeVisible(); // 처음으로 가는 링크
});

test('메뉴의 모든 링크가 깨지지 않음', async ({ page }) => {
  await page.goto(BASE + ROUTES[0]);
  const hrefs = await page.locator('nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  for (const href of hrefs) {
    const res = await page.goto(new URL(href, BASE).toString());
    expect(res.status(), href).toBeLessThan(400);
    await expect(page.locator('h1'), href).toHaveCount(1);
  }
});

test('API 상태', async ({ request }) => {
  const res = await request.get(BASE + '/api/health');
  expect(res.ok()).toBeTruthy();
});
