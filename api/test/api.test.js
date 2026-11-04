const test = require('node:test');
const assert = require('node:assert');
const { handle } = require('../src/handlers');

test('GET /api/health → { data: { ok: true } }', async () => {
  const res = await handle({ method: 'GET', path: 'health' });
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, { data: { ok: true } });
});

test('없는 API → 404 NOT_FOUND', async () => {
  const res = await handle({ method: 'GET', path: 'nope' });
  assert.strictEqual(res.status, 404);
  assert.strictEqual(res.body.error.code, 'NOT_FOUND');
});

test('GET /api/regions → 시드 지역 목록', async () => {
  const res = await handle({ method: 'GET', path: 'regions' });
  assert.strictEqual(res.status, 200);
  assert.ok(res.body.data.some((r) => r.id === 'cheongdo-hwayang' && r.placeCount > 0));
});

test('GET /api/places?regionId= → 해당 지역 장소만, 코드는 안 내려감', async () => {
  const res = await handle({ method: 'GET', path: 'places', query: { regionId: 'cheongdo-hwayang' } });
  assert.ok(res.body.data.length > 0);
  assert.ok(res.body.data.every((p) => p.regionId === 'cheongdo-hwayang' && !('code' in p)));
});

test('GET /api/products → 상품 목록', async () => {
  const res = await handle({ method: 'GET', path: 'products' });
  assert.ok(res.body.data.some((p) => p.id === 'pr-gammal' && p.pricePoint === 400));
});
