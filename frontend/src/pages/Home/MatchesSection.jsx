import { useState } from "react";
import {
  FiCalendar, FiClock, FiAward,
  FiChevronRight, FiArrowRight, FiAlertCircle,
  FiRefreshCw, FiShoppingCart, FiMapPin, FiZap,
} from "react-icons/fi";
import { C, FONT, STAGE_LABEL, TOP_SCORERS, getCode, MATCHES } from "./constants";
import { Flag, SectionHead, Spinner } from "./ui";

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

function LiveBadge({ minute }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", background: "#f0fff4", borderRadius: 2,
      border: "1px solid rgba(34,197,94,0.3)"
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "#22c55e", flexShrink: 0,
        animation: "mpulse 1.4s ease-in-out infinite",
      }} />
      <span style={{
        color: "#16a34a", fontSize: 8, fontWeight: 900,
        letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: FONT.body,
      }}>
        Live {minute ? `· ${minute}'` : ""}
      </span>
    </div>
  );
}

function FeaturedMatch({ match }) {
  const [hovered, hoverProps] = useHover();
  if (!match) return null;

  const isLive = match.status === "live";
  const isDone = match.status === "finished";
  const dateStr = new Date(match.match_date + "T00:00:00")
    .toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div style={{
      background: "white",
      border: `1px solid ${isLive ? "#22c55e" : hovered ? "#0d0d0d" : "#eee"}`,
      borderRadius: 8, overflow: "hidden",
      transition: "border-color 0.2s, box-shadow 0.25s",
      boxShadow: hovered ? "0 10px 30px rgba(0,0,0,0.05)" : "none",
    }} {...hoverProps}>

      {/* Header bar */}
      <div style={{
        padding: "12px 20px",
        background: isLive ? "#f0fff4" : "#f8f8f8",
        borderBottom: `1px solid ${isLive ? "rgba(34,197,94,0.1)" : "#eee"}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isLive
            ? <LiveBadge minute={match.minute} />
            : <span style={{
                fontSize: 9, fontWeight: 900, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#666", fontFamily: FONT.body,
              }}>
                {STAGE_LABEL[match.stage] || "Groupe"}{match.group_name ? ` · ${match.group_name}` : ""}
              </span>
          }
        </div>
        {!isLive && (
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, color: "#888", fontFamily: FONT.body, fontWeight: 600,
          }}>
            <FiCalendar size={10} /> {dateStr}
          </span>
        )}
      </div>

      {/* Teams */}
      <div style={{ padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>

          {/* Home */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <Flag code={getCode(match.home_team)} alt={match.home_team} size={56} />
            <span style={{
              fontFamily: FONT.display, fontSize: 20,
              fontWeight: 900, letterSpacing: "0.04em",
              color: "#0d0d0d", textAlign: "center", textTransform: "uppercase",
            }}>{match.home_team}</span>
          </div>

          {/* Score / VS */}
          <div style={{
            flexShrink: 0, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4, minWidth: 100,
          }}>
            {isDone || isLive ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: 52, lineHeight: 1,
                  color: isLive ? "#16a34a" : "#0d0d0d",
                }}>{match.home_score ?? 0}</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: 32, lineHeight: 1, color: "#ccc",
                }}>–</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: 52, lineHeight: 1,
                  color: isLive ? "#16a34a" : "#0d0d0d",
                }}>{match.away_score ?? 0}</span>
              </div>
            ) : (
              <span style={{
                fontFamily: FONT.display, fontWeight: 900,
                color: "#0d0d0d", fontSize: 42, lineHeight: 1,
              }}>{match.match_time?.slice(0, 5)}</span>
            )}
            <span style={{
              fontSize: 10, fontWeight: 900, letterSpacing: "0.14em",
              textTransform: "uppercase", fontFamily: FONT.body,
              color: isLive ? "#16a34a" : "#888",
            }}>
              {isLive ? "EN DIRECT" : isDone ? "TERMINÉ" : "COUP D'ENVOI"}
            </span>
          </div>

          {/* Away */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <Flag code={getCode(match.away_team)} alt={match.away_team} size={56} />
            <span style={{
              fontFamily: FONT.display, fontSize: 20,
              fontWeight: 900, letterSpacing: "0.04em",
              color: "#0d0d0d", textAlign: "center", textTransform: "uppercase",
            }}>{match.away_team}</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 32, paddingTop: 20,
          borderTop: `1px solid #eee`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, color: "#666", fontFamily: FONT.body, fontWeight: 500,
          }}>
            <FiMapPin size={12} /> {match.venue}, {match.city}
          </span>
          <a href="/tickets" style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#0d0d0d", color: "white",
            fontFamily: FONT.body, fontSize: 11, fontWeight: 800,
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "10px 20px", borderRadius: 100, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <FiShoppingCart size={13} /> Billets
          </a>
        </div>
      </div>
    </div>
  );
}

function MatchRow({ m }) {
  const [hovered, hoverProps] = useHover();
  const isLive = m.status === "live";
  const date = new Date(m.match_date + "T00:00:00")
    .toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "16px 20px",
      borderBottom: `1px solid #f0f0f0`,
      background: hovered ? "#f8f8f8" : "white",
      cursor: "pointer", transition: "0.2s", gap: 12,
    }} {...hoverProps}>
      <div style={{ width: 45, fontSize: 11, fontWeight: 700, color: isLive ? "#16a34a" : "#999" }}>
        {isLive ? "LIVE" : date}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{m.home_team}</span>
        <Flag code={getCode(m.home_team)} size={18} />
      </div>
      <div style={{ width: 60, textAlign: "center", fontFamily: FONT.display, fontWeight: 900, fontSize: 18 }}>
        {m.status !== "upcoming" ? `${m.home_score}–${m.away_score}` : m.match_time?.slice(0, 5)}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
        <Flag code={getCode(m.away_team)} size={18} />
        <span style={{ fontSize: 14, fontWeight: 700 }}>{m.away_team}</span>
      </div>
      <FiChevronRight size={14} color="#ccc" />
    </div>
  );
}

function TopScorers() {
  return (
    <div style={{ border: `1px solid #eee`, borderRadius: 8, overflow: "hidden", background: "white" }}>
      <div style={{ background: "#f8f8f8", padding: "16px 20px", borderBottom: "1px solid #eee" }}>
        <span style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>Meilleurs Buteurs</span>
      </div>
      {TOP_SCORERS.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < TOP_SCORERS.length - 1 ? "1px solid #f5f5f5" : "none" }}>
          <span style={{ fontSize: 12, color: "#ccc", fontWeight: 900, width: 16 }}>{i + 1}</span>
          <Flag code={p.code} size={20} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{p.player}</p>
            <p style={{ fontSize: 11, color: "#888", margin: 0 }}>{p.team}</p>
          </div>
          <span style={{ fontFamily: FONT.display, fontWeight: 900, fontSize: 20 }}>{p.goals}</span>
        </div>
      ))}
    </div>
  );
}

export function MatchesSection({ matchFilter, setMatchFilter }) {
  const allMatches = MATCHES.filter(m => m.status === matchFilter);
  const featuredMatch = allMatches[0];

  const FILTERS = [
    { k: "upcoming", l: "À venir" },
    { k: "live",     l: "En direct" },
    { k: "finished", l: "Résultats" },
  ];

  return (
    <section style={{ background: "#fcfcfc", padding: "80px 0", borderTop: "1px solid #eee" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 32px" }}>
        <SectionHead eyebrow="Calendrier" title="Matchs" action="Tout le programme" href="/matches" />
        
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {FILTERS.map(f => (
            <button key={f.k} onClick={() => setMatchFilter(f.k)} style={{
              padding: "10px 24px", borderRadius: 100, border: `1px solid ${matchFilter === f.k ? "#0d0d0d" : "#eee"}`,
              background: matchFilter === f.k ? "#0d0d0d" : "white",
              color: matchFilter === f.k ? "white" : "#666",
              fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "0.2s"
            }}>{f.l}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {featuredMatch && <FeaturedMatch match={featuredMatch} />}
            <div style={{ background: "white", border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
              {allMatches.slice(1).map(m => <MatchRow key={m.id} m={m} />)}
            </div>
          </div>
          <TopScorers />
        </div>
      </div>
    </section>
  );
}