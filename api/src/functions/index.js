const { app } = require('@azure/functions');
const { handle } = require('../handlers');

// /api/* 요청을 전부 하나의 핸들러로 넘겨요.
app.http('api', {
  route: '{*path}',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  authLevel: 'anonymous',
  handler: async (request) => {
    const text = await request.text();
    let body = null;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        return { status: 400, jsonBody: { error: { code: 'BAD_JSON', message: '요청 형식이 올바르지 않아요.' } } };
      }
    }
    const res = await handle({
      method: request.method,
      path: request.params.path || '',
      query: Object.fromEntries(request.query.entries()),
      headers: Object.fromEntries(request.headers.entries()),
      body,
    });
    return { status: res.status, jsonBody: res.body };
  },
});
