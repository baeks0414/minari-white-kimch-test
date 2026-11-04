// 로컬 개발용 서버 (Azure Functions Core Tools 없이). 같은 핸들러를 써요.
const http = require('node:http');
const { handle } = require('./src/handlers');

const PORT = 7071;

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const send = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(body));
    };
    if (!url.pathname.startsWith('/api/')) {
      return send(404, { error: { code: 'NOT_FOUND', message: '없는 API예요.' } });
    }
    let raw = '';
    for await (const chunk of req) raw += chunk;
    let body = null;
    if (raw) {
      try {
        body = JSON.parse(raw);
      } catch {
        return send(400, { error: { code: 'BAD_JSON', message: '요청 형식이 올바르지 않아요.' } });
      }
    }
    const result = await handle({
      method: req.method,
      path: url.pathname.slice('/api/'.length),
      query: Object.fromEntries(url.searchParams),
      headers: req.headers,
      body,
    });
    send(result.status, result.body);
  })
  .listen(PORT, () => process.stdout.write(`API 개발 서버: http://localhost:${PORT}/api/health\n`));
