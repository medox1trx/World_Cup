import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { GlobalFonts } from "./ui";
import { NewsTicker, HeroSection } from "./HeroSection";
import { StatsBar, NewsSection, MoreNewsSection } from "./NewsSection";
import { MatchesSection } from "./MatchesSection";
import { StandingsSection, CitiesSection } from "./StandingsSection";
import { PromoSection, TournamentSection, FanZoneSection } from "./PromoSection";
import { useStats, useMatches } from "../../hooks/useWorldCup";



export default function Home() {
  const { darkMode } = useTheme();
  const bg = darkMode ? "#0d0d0d" : "#ffffff";

  const [matchFilter, setMatchFilter] = useState("upcoming");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const { data: stats, loading: statsLoading } = useStats();
  const { data: matches, loading: matchesLoading,
    error: matchesError, refetch } = useMatches({ status: matchFilter, limit: 8 });

  return (
    <div style={{
      fontFamily: "'Barlow', sans-serif",
      background: bg,
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.4s, background 0.3s",
    }}>
      <GlobalFonts />

      {/* ① News ticker — 44px */}
      <NewsTicker />

      {/* ② Hero — fills remaining viewport (100svh - 146px) */}
      <HeroSection />

      {/* ③ Stats bar */}
      <StatsBar stats={stats} loading={statsLoading} />

      {/* ④ Featured news */}
      <NewsSection />

      {/* ⑤ Matches + top scorers */}
      <MatchesSection
        matches={matches}
        loading={matchesLoading}
        error={matchesError}
        matchFilter={matchFilter}
        setMatchFilter={setMatchFilter}
        refetch={refetch}
      />

      {/* ⑥ Group standings */}
      <StandingsSection />

      {/* ⑦ Tickets + hospitality */}
      <PromoSection />

      {/* ⑧ Host cities */}
      <CitiesSection />

      {/* ⑨ More news */}
      <MoreNewsSection />

      {/* ⑩ Tournament structure */}
      <TournamentSection />

      {/* ⑪ Fan zone + newsletter */}
      <FanZoneSection />
    </div>
  );
}