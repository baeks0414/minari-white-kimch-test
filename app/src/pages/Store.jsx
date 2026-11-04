import { Link } from 'react-router-dom';
import { useApi } from '../hooks.js';
import ApiState from '../components/ApiState.jsx';

export default function Store() {
  const products = useApi('/api/products');

  return (
    <>
      <h1>스토어</h1>
      <p className="muted">모은 포인트로 청도 특산품 교환권을 받아요.</p>
      <section className="card">
        <ApiState state={products}>
          {(list) => (
            <ul className="list">
              {list.map((p) => (
                <li key={p.id} className="row">
                  <span className="product">
                    <strong>{p.name}</strong>
                    <span className="muted">{p.unlock ?? p.pickup}{p.season ? ` · ${p.season}` : ''}</span>
                  </span>
                  <span className="chip">{p.pricePoint > 0 ? `${p.pricePoint.toLocaleString('ko-KR')}P` : '보상'}</span>
                </li>
              ))}
            </ul>
          )}
        </ApiState>
      </section>
      <Link to="/me" className="btn btn-secondary block">가입하고 교환하기</Link>
    </>
  );
}
