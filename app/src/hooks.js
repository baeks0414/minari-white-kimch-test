import { useCallback, useEffect, useState } from 'react';
import { getJson } from './api.js';

// path가 null이면 요청을 생략해요.
export function useApi(path) {
  const [state, setState] = useState({ loading: Boolean(path) });

  const load = useCallback(async () => {
    if (!path) return;
    setState({ loading: true });
    const result = await getJson(path);
    setState({ loading: false, ...result });
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
