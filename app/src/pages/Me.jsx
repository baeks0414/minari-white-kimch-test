import { Link } from 'react-router-dom';

// 가입 전이라 사용자 API(/api/me)는 부르지 않아요.
export default function Me() {
  return (
    <>
      <h1>내 정보</h1>
      <section className="card">
        <p className="points"><span className="muted">내 포인트</span><strong>0P</strong></p>
        <p>아직 가입 전이에요. 퀘스트를 깨면 스탬프와 포인트가 여기에 쌓여요.</p>
      </section>
      <Link to="/" className="btn btn-primary block">퀘스트 보러 가기</Link>
    </>
  );
}
