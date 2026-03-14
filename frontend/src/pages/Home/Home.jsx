import { useState, useEffect } from "react";
import { GlobalFonts }                           from "./ui";
import { NewsTicker, HeroSection }               from "./HeroSection";
import { StatsBar, NewsSection, MoreNewsSection } from "./NewsSection";
import { MatchesSection }                         from "./MatchesSection";
import { StandingsSection, CitiesSection }        from "./StandingsSection";
import { PromoSection, TournamentSection, FanZoneSection } from "./PromoSection";
import { useStats, useMatches }                   from "../../hooks/useWorldCup";

/*
  VERTICAL STACK inside <Home>:
  ┌──────────────────────────────────────────────────────┐
  │  NewsTicker          44px  (dark bar, news feed)     │
  │  HeroSection         calc(100svh - 146px)            │
  │    └─ 146px = 40 CountdownBanner                     │
  │              + 62 Header                             │
  │              + 44 NewsTicker                         │
  │  StatsBar            ~80px                           │
  │  NewsSection         ...                             │
  │  MatchesSection      ...                             │
  │  StandingsSection    ...                             │
  │  PromoSection        ...                             │
  │  CitiesSection       ...                             │
  │  MoreNewsSection     ...                             │
  │  TournamentSection   ...                             │
  │  FanZoneSection      ...                             │
  └──────────────────────────────────────────────────────┘
*/
export default function Home() {
  const [matchFilter, setMatchFilter] = useState("upcoming");
  const [mounted,     setMounted]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const { data: stats,   loading: statsLoading  } = useStats();
  const { data: matches, loading: matchesLoading,
          error: matchesError, refetch }           = useMatches({ status: matchFilter, limit: 8 });

  return (
    <div style={{
      fontFamily: "'Barlow', sans-serif",
      background: "white",
      opacity:    mounted ? 1 : 0,
      transition: "opacity 0.4s",
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