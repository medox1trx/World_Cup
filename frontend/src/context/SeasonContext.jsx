import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SeasonContext = createContext(null);
const STORAGE_KEY = "fifa2030_season";
const ONE_HOUR_MS = 60 * 60 * 1000;

export const SEASONS = [
  { id: "2030", label: "Coupe du Monde 2030", host: "Maroc · Espagne · Portugal" },
  { id: "2026", label: "Coupe du Monde 2026", host: "USA · Mexique · Canada" },
  { id: "2022", label: "Coupe du Monde 2022", host: "Qatar" },
  { id: "2018", label: "Coupe du Monde 2018", host: "Russie" },
  { id: "2014", label: "Coupe du Monde 2014", host: "Brésil" },
];

function loadSeason() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.id || !parsed.timestamp) return null;
    if (Date.now() - parsed.timestamp >= ONE_HOUR_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function saveSeason(id) {
  const data = { id, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function SeasonProvider({ children }) {
  const [season, setSeason] = useState(() => loadSeason());

  const selectSeason = useCallback((id) => {
    if (!id) {
      localStorage.removeItem(STORAGE_KEY);
      setSeason(null);
      return;
    }
    const data = saveSeason(id);
    setSeason(data);
  }, []);

  const clearSeason = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSeason(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = loadSeason();
      if (!stored && season) {
        setSeason(null);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [season]);

  const remainingMs = season
    ? Math.max(0, ONE_HOUR_MS - (Date.now() - season.timestamp))
    : 0;

  const seasonObj = season
    ? SEASONS.find(s => s.id === season.id) || null
    : null;

  const value = {
    season: seasonObj,
    seasonId: season?.id || null,
    selectSeason,
    clearSeason,
    remainingMs,
    isActive: !!season,
    seasons: SEASONS,
  };

  return (
    <SeasonContext.Provider value={value}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error("useSeason must be used within <SeasonProvider>");
  return ctx;
}

export default SeasonContext;
