import { useCallback, useEffect, useState } from 'react';
import { getJson } from '../api.js';
import ErrorBox from '../components/ErrorBox.jsx';

// 배포 확인: /api/health 호출 결과를 보여 줘요.
export default function Home() {
  const [state, setState] = useState({ loading: true });

  const load = useCallback(async () => {
    setState({ loading: true });
    const result = await getJson('/api/health');
    setState({ loading: false, ...result });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <h1>배포 연습 홈</h1>
      <p>서버 상태를 확인하고 있어요.</p>
      <section className="card" aria-live="polite">
        <h2>/api/health</h2>
        {state.loading && <p>불러오는 중이에요…</p>}
        {!state.loading && state.error && <ErrorBox onRetry={load} />}
        {!state.loading && state.data && (
          <>
            <p>{state.data.ok ? '서버가 정상이에요.' : '서버 응답이 이상해요.'}</p>
            <pre className="code">{JSON.stringify({ data: state.data })}</pre>
          </>
        )}
      </section>
    </>
  );
}
