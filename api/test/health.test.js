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
