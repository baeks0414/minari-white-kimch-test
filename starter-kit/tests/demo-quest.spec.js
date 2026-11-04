// 예시: 퀘스트안 데모 시나리오 자동 클릭. 다른 안을 고르면 이 파일을 참고해 demo-<안>.spec.js를 만든다.
const { test, expect } = require('@playwright/test');
const BASE = process.env.BASE_URL || 'http://localhost:4173';
test.use({ permissions: [], viewport: { width: 390, height: 844 } });

test('가입 → 퀘스트 → 제안 → 교환 → 마이페이지', async ({ page }) => {
  const errors = [];
  // 같은 주소(우리 앱)에서 난 오류만 센다. 외부 글꼴·CDN이 막힌 경우는 앱 오류가 아니므로 뺀다.
    page.on('console', (m) => {
      const src = m.location().url || '';
      if (m.type() === 'error' && (!src || src.startsWith(BASE))) errors.push(m.text());
    });
  page.on('response', (r) => r.status() >= 500 && errors.push(`${r.status()} ${r.url()}`));

  await page.goto(BASE + '/');
  await expect(page.getByRole('button', { name: '가입하고 시작하기' })).toBeDisabled();
  await page.getByLabel('닉네임').fill('가상유저');
  await page.getByRole('button', { name: '가입하고 시작하기' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('맵 고르기');

  await page.getByRole('link', { name: /청도읍·화양/ }).click();
  await page.getByRole('link', { name: /와인터널 '내 칸' 찾기/ }).click();
  await page.getByLabel('장소 코드로 인증 (QR 대신)').fill('CD-WINE-01');
  await page.getByRole('button', { name: '코드 확인하기' }).click();
  await expect(page.getByRole('status').filter({ hasText: '+50P' })).toBeVisible();
  await page.getByRole('button', { name: '건너뛰고 다음으로' }).click();
  await page.getByRole('button', { name: '1904' }).click();
  await expect(page.getByText('퀘스트를 모두 끝냈어요!')).toBeVisible();

  await page.goBack();
  await page.getByRole('link', { name: /평일에 비는 소싸움장/ }).click();
  await page.getByRole('button', { name: '관광객' }).click();
  await page.getByLabel('이 공간을 뭐로 쓰면 좋을까요?').fill('평일 저녁에 모래판 위에서 야외 영화관을 열면 좋겠어요');
  await page.getByRole('button', { name: /제안 제출하기/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('제안을 접수했어요');

  await page.getByRole('navigation').getByRole('link', { name: '스토어' }).click();
  await page.locator('.card', { hasText: '감말랭이 한 봉' }).getByRole('button', { name: '교환하기' }).click();
  await expect(page.getByText(/교환했어요!/)).toBeVisible();

  await page.getByRole('navigation').getByRole('link', { name: '마이페이지' }).click();
  await expect(page.getByText('감말랭이 한 봉 교환권')).toBeVisible();
  await expect(page.getByText('0P').first()).toBeVisible(); // 400 적립 - 400 사용
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/가상유저 님/);
  expect(errors).toEqual([]);
});
