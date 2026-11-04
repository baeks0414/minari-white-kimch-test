import { useApi } from '../hooks.js';
import ApiState from '../components/ApiState.jsx';

export default function Home() {
  const health = useApi('/api/health');
  const regions = useApi('/api/regions');
  const places = useApi('/api/places?regionId=cheongdo-hwayang');

  return (
    <>
      <p className="eyebrow">청도 퀘스트 · 배포 연습</p>
      <h1>청도를 퀘스트로 돌아봐요</h1>

      <section className="card" aria-live="polite">
        <h2>서버 상태</h2>
        <ApiState state={health}>
          {(data) => (
            <p className="status">
              <span className={data.ok ? 'dot dot-ok' : 'dot'} aria-hidden="true" />
              {data.ok ? '서버가 정상이에요. (/api/health)' : '서버 응답이 이상해요.'}
            </p>
          )}
        </ApiState>
      </section>

      <section className="card">
        <h2>퀘스트 맵</h2>
        <ApiState state={regions}>
          {(list) => (
            <ul className="list">
              {list.map((r) => (
                <li key={r.id} className="row">
                  <span>{r.name}</span>
                  <span className={r.status === 'open' ? 'chip' : 'chip chip-off'}>
                    {r.status === 'open' ? `장소 ${r.placeCount}곳` : '준비 중'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </ApiState>
      </section>

      <section className="card">
        <h2>청도읍·화양 장소</h2>
        <ApiState state={places}>
          {(list) => (
            <ul className="list">
              {list.map((p) => (
                <li key={p.id} className="place">
                  <strong>{p.name}</strong>
                  <span className="muted">{p.description}</span>
                </li>
              ))}
            </ul>
          )}
        </ApiState>
      </section>
    </>
  );
}
