// 모든 fetch는 여기 한 곳에서. 실패하면 { error }를 돌려줘요.
export async function getJson(path) {
  try {
    const res = await fetch(path, { headers: { Accept: 'application/json' } });
    const body = await res.json().catch(() => null);
    if (!res.ok || !body || body.error) {
      return { error: body?.error ?? { code: `HTTP_${res.status}`, message: '요청에 실패했어요.' } };
    }
    return { data: body.data };
  } catch {
    return { error: { code: 'NETWORK', message: '서버에 연결하지 못했어요.' } };
  }
}
