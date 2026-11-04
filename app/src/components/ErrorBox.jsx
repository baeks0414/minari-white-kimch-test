// API 오류 시 흰 화면 대신 보여 주는 안내 상자
export default function ErrorBox({ onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p>잠시 후 다시 시도해 주세요.</p>
      <button type="button" className="btn-primary" onClick={onRetry}>다시 시도하기</button>
    </div>
  );
}
