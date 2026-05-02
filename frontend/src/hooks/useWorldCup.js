import { useState, useEffect, useCallback } from "react";
import { getStats, getMatches, getNews, getTeams, getPays, getGroups, getVilles, getFanZones } from "../services/api";

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
  const fetchResult = useFetch(getMatches, params, [JSON.stringify(params)]);
  
  // Handle pagination: extract 'data' array if the result is a paginated object
  const data = fetchResult.data?.data || (Array.isArray(fetchResult.data) ? fetchResult.data : []);
  
  return { ...fetchResult, data };
}

// ── News hook ────────────────────────────────────────────────
export function useNews(params = {}) {
  return useFetch(getNews, params, [JSON.stringify(params)]);
}

// ── Teams hook ───────────────────────────────────────────────
export function useTeams(params = {}) {
  return useFetch(getTeams, params, [JSON.stringify(params)]);
}

// ── Groups hook ──────────────────────────────────────────────
export function useGroups() {
  return useFetch(getGroups, {}, []);
}

// ── Pays hook ────────────────────────────────────────────────
export function usePays() {
  return useFetch(getPays, {}, []);
}

// ── Villes hook ──────────────────────────────────────────────
export function useVilles(params = {}) {
  return useFetch(getVilles, params, [JSON.stringify(params)]);
}

// ── Fan Zones hook ───────────────────────────────────────────
export function useFanZones(params = {}) {
  return useFetch(getFanZones, params, [JSON.stringify(params)]);
}