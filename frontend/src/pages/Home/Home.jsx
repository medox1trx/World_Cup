import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { GlobalFonts, Reveal } from "./ui";
import { NewsTicker, HeroSection } from "./HeroSection";
import NewsSection, { StatsBar } from "./NewsSection";
import MatchesSection from "./MatchesSection";
import StandingsSection, { CitiesSection } from "./StandingsSection";
import PromoSection, { TournamentSection, FanZoneSection } from "./PromoSection";
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
      <Reveal delay={0}><NewsTicker /></Reveal>

      {/* ② Hero — fills remaining viewport (100svh - 146px) */}
      <Reveal delay={100}><HeroSection /></Reveal>

      {/* ③ Stats bar */}
      <Reveal delay={200}><StatsBar stats={stats} loading={statsLoading} /></Reveal>

      {/* ④ Featured news */}
      <Reveal delay={300}><NewsSection /></Reveal>

      {/* ⑤ Matches + top scorers */}
      <Reveal delay={400}>
        <MatchesSection
          matches={matches}
          loading={matchesLoading}
          error={matchesError}
          matchFilter={matchFilter}
          setMatchFilter={setMatchFilter}
          refetch={refetch}
        />
      </Reveal>

      {/* ⑥ Group standings */}
      <Reveal delay={500}><StandingsSection /></Reveal>

      {/* ⑦ Host cities */}
      <Reveal delay={600}><CitiesSection /></Reveal>

      {/* ⑧ Tournament structure */}
      <Reveal delay={700}><TournamentSection /></Reveal>

      {/* ⑨ Tickets + hospitality */}
      <Reveal delay={800}><PromoSection /></Reveal>

      {/* ⑩ Fan zone + newsletter */}
      <Reveal delay={900}><FanZoneSection /></Reveal>
    </div>
  );
}