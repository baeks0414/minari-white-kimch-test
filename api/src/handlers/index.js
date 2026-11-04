// 모든 API 핸들러: (req) => { status, body }
// req = { method, path, query, headers, body }
const store = require('../lib/store');

const ok = (data) => ({ status: 200, body: { data } });

const routes = {
  'GET health': () => ok({ ok: true }),
  'GET regions': () => ok(store.listRegions()),
  'GET places': (req) => ok(store.listPlaces(req.query?.regionId)),
  'GET products': () => ok(store.listProducts()),
};

async function handle(req) {
  const key = `${req.method} ${req.path.replace(/^\/+|\/+$/g, '')}`;
  const fn = routes[key];
  if (!fn) {
    return { status: 404, body: { error: { code: 'NOT_FOUND', message: '없는 API예요.' } } };
  }
  try {
    return await fn(req);
  } catch {
    return { status: 500, body: { error: { code: 'SERVER_ERROR', message: '잠시 후 다시 시도해 주세요.' } } };
  }
}

module.exports = { handle };
