import { useState, useEffect, useCallback } from "react";
import { getStats, getMatches } from "../services/api";

// ── Generic fetch hook ───────────────────────────────────────
export function useFetch(fetchFn, params = {}, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn(params);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, refetch: load };
}

// ── Stats hook ───────────────────────────────────────────────
export function useStats() {
  return useFetch(getStats, {}, []);
}

// ── Matches hook ─────────────────────────────────────────────
export function useMatches(params = {}) {
  return useFetch(getMatches, params, [JSON.stringify(params)]);
}