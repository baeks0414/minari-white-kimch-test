import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <h1>페이지를 찾을 수 없어요</h1>
      <section className="card">
        <p>주소가 바뀌었거나 없는 화면이에요.</p>
        <Link to="/" className="btn btn-primary">처음으로 가기</Link>
      </section>
    </>
  );
}
