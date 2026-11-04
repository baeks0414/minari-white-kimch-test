import ErrorBox from './ErrorBox.jsx';

// 불러오는 중 / 오류 / 결과를 한곳에서 처리해요.
export default function ApiState({ state, children }) {
  if (state.loading) return <p className="muted">불러오는 중이에요…</p>;
  if (state.error) return <ErrorBox onRetry={state.reload} />;
  return children(state.data);
}
