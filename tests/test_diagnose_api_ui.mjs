import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const appJs = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const match = appJs.match(/async function tryDiagnoseApi\([\s\S]*?\n}\n/);

if (!match) {
  throw new Error('tryDiagnoseApi function not found in app.js');
}

function loadTryDiagnoseApi(fetchImpl) {
  const context = vm.createContext({
    fetch: fetchImpl,
    setTimeout,
    clearTimeout,
    AbortController,
  });
  const script = new vm.Script(`${match[0]}\nthis.fn = tryDiagnoseApi;`);
  script.runInContext(context);
  return context.fn;
}

function jsonResponse(status, payload) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get(name) {
        return name.toLowerCase() === 'content-type' ? 'application/json' : '';
      },
    },
    async json() {
      return payload;
    },
  };
}

test('diagnose 400 returns korean error payload (no fallback)', async () => {
  const msg = '사진은 3MB 이하 JPG·PNG·WEBP만 보낼 수 있어요';
  const fn = loadTryDiagnoseApi(async () => jsonResponse(400, { error: msg }));
  const out = await fn({ crop: '토마토' }, 1000);
  assert.equal(out.error, msg);
  assert.equal(out.status, 400);
});

test('diagnose 503 keeps existing fallback path', async () => {
  const fn = loadTryDiagnoseApi(async () => jsonResponse(503, { error: 'agent failed' }));
  const out = await fn({ crop: '토마토' }, 1000);
  assert.equal(out, null);
});

test('diagnose 200 keeps normal diagnosis path', async () => {
  const payload = { top: [{ p: { name: '겹둥근무늬병' }, conf: '중간', ev: ['근거'] }], source: 'agent' };
  const fn = loadTryDiagnoseApi(async () => jsonResponse(200, payload));
  const out = await fn({ crop: '토마토' }, 1000);
  assert.equal(JSON.stringify(out), JSON.stringify(payload));
});
