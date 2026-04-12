import { useState } from "react";
import {
  FiCalendar, FiClock, FiAward,
  FiChevronRight, FiArrowRight,
  FiZap, FiMapPin, FiTrendingUp,
} from "react-icons/fi";
import { FONT, STAGE_LABEL, TOP_SCORERS, getCode } from "./constants";
import { Flag, SectionHead, Spinner } from "./ui";
import { useTheme } from "../../context/ThemeContext";
import { useMatches } from "../../hooks/useWorldCup";

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── BIG FLAG ─────────────────────────────────────────────────
// Large, prominent flag with subtle shadow + rounded corners
function BigFlag({ code, alt = "", size = 72 }) {
  if (!code) return (
    <div style={{
      width: size * 1.45, height: size,
      background: "rgba(128,128,128,0.1)",
      borderRadius: 6, flexShrink: 0,
      border: "1px solid rgba(128,128,128,0.15)",
    }} />
  );
  return (
    <img
      src={`https://flagcdn.com/w160/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 80w, https://flagcdn.com/w160/${code.toLowerCase()}.png 160w`}
      sizes="160px"
      alt={alt}
      loading="lazy"
      style={{
        width: size * 1.45, height: size,
        objectFit: "cover",
        borderRadius: 6,
        flexShrink: 0,
        border: "1px solid rgba(128,128,128,0.18)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
        display: "block",
      }}
    />
  );
}

// ─── LIVE BADGE ───────────────────────────────────────────────
function LiveBadge({ minute }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", background: "#111111", borderRadius: 20,
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: "50%",
        background: "#22c55e", flexShrink: 0,
        animation: "mpulse 1.4s ease-in-out infinite",
      }} />
      <span style={{
        color: "#22c55e", fontSize: 10, fontWeight: 900,
        letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: FONT.body,
      }}>
        Live {minute ? `· ${minute}'` : ""}
      </span>
    </div>
  );
}

// ─── FEATURED MATCH ───────────────────────────────────────────
function FeaturedMatch({ match }) {
  const { darkMode } = useTheme();
  const card = darkMode ? "#141414" : "#ffffff";
  const surface = darkMode ? "#0f0f0f" : "#f6f6f6";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderHover = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)";
  const borderSub = darkMode ? "rgba(255,255,255,0.06)" : "#e8e8e8";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.5)" : "#666666";
  const textMuted = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const liveGreen = "#22c55e";
  const liveBorder = "rgba(34,197,94,0.35)";
  const teamBg = darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const teamBgHov = darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";

  const [hovered, hoverProps] = useHover();
  if (!match) return null;

  const isLive = match.status === "live";
  const isDone = match.status === "finished";

  const formatMatchDate = (dateStr) => {
    if (!dateStr) return "Date à venir";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Date à venir";
      return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    } catch { return "Date à venir"; }
  };

  const formatTime = (t) => t ? t.slice(0, 5) : "";

  return (
    <div
      style={{
        background: card,
        border: `1px solid ${isLive ? liveBorder : hovered ? borderHover : border}`,
        borderRadius: 8, overflow: "hidden",
        transition: "border-color 0.25s, background 0.3s, box-shadow 0.25s",
        boxShadow: hovered ? `0 8px 28px rgba(0,0,0,${darkMode ? 0.35 : 0.1})` : "none",
      }}
      {...hoverProps}
    >
      {/* Header */}
      <div style={{
        padding: "10px 18px",
        background: isLive ? card : surface,
        borderBottom: `1px solid ${borderSub}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8, flexWrap: "wrap",
        transition: "background 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isLive
            ? <LiveBadge minute={match.minute} />
            : <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: "0.16em",
              textTransform: "uppercase", color: textSecondary, fontFamily: FONT.body,
            }}>
              {STAGE_LABEL[match.stage] || "Groupe"}{match.group_name ? ` · ${match.group_name}` : ""}
            </span>
          }
        </div>
        {!isLive && (
          <span style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, color: textSecondary, fontFamily: FONT.body, fontWeight: 600,
          }}>
            <FiCalendar size={13} /> {formatMatchDate(match.match_date)}
          </span>
        )}
      </div>

      {/* Main match display — 3-column: home | score | away */}
      <div style={{ padding: "clamp(20px,3vw,36px) clamp(12px,2.5vw,28px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,2vw,20px)" }}>

          {/* Home team */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            background: teamBg, borderRadius: 8, padding: "clamp(14px,2.5vw,22px) clamp(8px,1.5vw,14px)",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = teamBgHov}
            onMouseLeave={e => e.currentTarget.style.background = teamBg}
          >
            <BigFlag code={getCode(match.home_team)} alt={match.home_team} size={clamp(52, 72)} />
            <span style={{
              fontFamily: FONT.display,
              fontSize: "clamp(0.85rem,3vw,1.15rem)",
              fontWeight: 900, letterSpacing: "0.06em",
              color: textPrimary, textAlign: "center", textTransform: "uppercase",
              lineHeight: 1.1,
            }}>{match.home_team}</span>
          </div>

          {/* Score / Time */}
          <div style={{
            flexShrink: 0, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 6,
            minWidth: "clamp(56px,12vw,96px)",
          }}>
            {isDone || isLive ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.6rem,6vw,2.8rem)", lineHeight: 1,
                  color: isLive ? liveGreen : textPrimary,
                  fontVariantNumeric: "tabular-nums",
                }}>{match.home_score ?? 0}</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 400,
                  fontSize: "clamp(1rem,3vw,1.6rem)", color: textMuted,
                }}>–</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.6rem,6vw,2.8rem)", lineHeight: 1,
                  color: isLive ? liveGreen : textPrimary,
                  fontVariantNumeric: "tabular-nums",
                }}>{match.away_score ?? 0}</span>
              </div>
            ) : (
              <span style={{
                fontFamily: FONT.display, fontWeight: 900,
                color: textPrimary, fontSize: "clamp(1.2rem,5vw,2rem)", lineHeight: 1,
              }}>{formatTime(match.match_time)}</span>
            )}
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: "0.14em",
              textTransform: "uppercase", fontFamily: FONT.body,
              color: isLive ? liveGreen : textSecondary,
              padding: "3px 10px",
              background: isLive ? "rgba(34,197,94,0.1)" : (darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
              borderRadius: 20,
            }}>
              {isLive ? "En direct" : isDone ? "Terminé" : "Coup d'envoi"}
            </span>
          </div>

          {/* Away team */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            background: teamBg, borderRadius: 8, padding: "clamp(14px,2.5vw,22px) clamp(8px,1.5vw,14px)",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = teamBgHov}
            onMouseLeave={e => e.currentTarget.style.background = teamBg}
          >
            <BigFlag code={getCode(match.away_team)} alt={match.away_team} size={clamp(52, 72)} />
            <span style={{
              fontFamily: FONT.display,
              fontSize: "clamp(0.85rem,3vw,1.15rem)",
              fontWeight: 900, letterSpacing: "0.06em",
              color: textPrimary, textAlign: "center", textTransform: "uppercase",
              lineHeight: 1.1,
            }}>{match.away_team}</span>
          </div>
        </div>

        {/* Venue */}
        <div style={{
          marginTop: "clamp(14px,2.5vw,22px)",
          paddingTop: "clamp(12px,2vw,18px)",
          borderTop: `1px solid ${border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 5, transition: "border-color 0.3s",
        }}>
          <FiMapPin size={13} color={textSecondary} />
          <span style={{
            fontSize: 12, color: textSecondary, fontFamily: FONT.body, fontWeight: 600,
          }}>{match.venue}, {match.city}</span>
        </div>
      </div>
    </div>
  );
}

// Tiny helper — clamp without CSS (returns the mid value for JS)
function clamp(min, max) { return Math.round((min + max) / 2); }

// ─── MATCH ROW (list) ─────────────────────────────────────────
function MatchRow({ m }) {
  const { darkMode } = useTheme();
  const card = darkMode ? "#141414" : "#ffffff";
  const cardHover = darkMode ? "rgba(255,255,255,0.05)" : "#f5f5f5";
  const border = darkMode ? "rgba(255,255,255,0.07)" : "#ececec";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.5)" : "#666666";
  const textMuted = darkMode ? "rgba(255,255,255,0.28)" : "#aaaaaa";
  const liveGreen = "#22c55e";

  const [hovered, hoverProps] = useHover();
  const isLive = m.status === "live";
  const isDone = m.status === "finished";

  const formatShort = (s) => {
    if (!s) return "";
    try {
      const d = new Date(s);
      if (isNaN(d.getTime())) return "";
      return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
    } catch { return ""; }
  };

  const formatTime = (t) => t ? t.slice(0, 5) : "";

  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "11px 14px",
      borderBottom: `1px solid ${border}`,
      background: hovered ? (isLive ? "rgba(34,197,94,0.07)" : cardHover) : (isLive ? "rgba(34,197,94,0.03)" : card),
      cursor: "pointer",
      transition: "background 0.2s",
      gap: 8,
    }} {...hoverProps}>

      {/* Date / Live pill */}
      <div style={{ width: 50, flexShrink: 0 }}>
        {isLive
          ? <span style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: 10, fontWeight: 900, color: "#16a34a",
            textTransform: "uppercase", fontFamily: FONT.body, letterSpacing: "0.1em",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: liveGreen, flexShrink: 0, animation: "mpulse 1.4s ease-in-out infinite" }} />
            Live
          </span>
          : <span style={{ fontSize: 11, color: textMuted, fontFamily: FONT.body, fontWeight: 600, lineHeight: 1.2 }}>
            {formatShort(m.match_date)}
          </span>
        }
      </div>

      {/* Home team — flag + name */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <img
          src={`https://flagcdn.com/w40/${getCode(m.home_team) || "un"}.png`}
          alt={m.home_team}
          loading="lazy"
          style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 3, flexShrink: 0, border: "0.5px solid rgba(128,128,128,0.2)", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
        />
        <span style={{
          fontSize: 12, fontWeight: 700, color: textPrimary,
          fontFamily: FONT.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          transition: "color 0.3s",
        }}>{m.home_team}</span>
      </div>

      {/* Score / Time */}
      <div style={{ flexShrink: 0, minWidth: 52, textAlign: "center" }}>
        {isDone || isLive
          ? <span style={{
            fontFamily: FONT.display, fontWeight: 900,
            fontSize: "clamp(0.95rem,3vw,1.1rem)",
            color: isLive ? "#16a34a" : textPrimary,
            fontVariantNumeric: "tabular-nums",
            transition: "color 0.3s",
          }}>{m.home_score ?? 0}–{m.away_score ?? 0}</span>
          : <span style={{
            display: "inline-block",
            fontFamily: FONT.body, fontWeight: 800,
            fontSize: 11, color: textSecondary,
            background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
            padding: "3px 7px", borderRadius: 6,
          }}>{formatTime(m.match_time)}</span>
        }
      </div>

      {/* Away team — name + flag */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, minWidth: 0, justifyContent: "flex-end" }}>
        <span style={{
          fontSize: 12, fontWeight: 700, color: textPrimary,
          fontFamily: FONT.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          textAlign: "right", transition: "color 0.3s",
        }}>{m.away_team}</span>
        <img
          src={`https://flagcdn.com/w40/${getCode(m.away_team) || "un"}.png`}
          alt={m.away_team}
          loading="lazy"
          style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 3, flexShrink: 0, border: "0.5px solid rgba(128,128,128,0.2)", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
        />
      </div>

      <FiChevronRight
        size={11}
        color={hovered ? textPrimary : textMuted}
        style={{ flexShrink: 0, transition: "color 0.2s, transform 0.2s", transform: hovered ? "translateX(2px)" : "translateX(0)" }}
      />
    </div>
  );
}

// ─── TOP SCORERS ──────────────────────────────────────────────
function TopScorers() {
  const { darkMode } = useTheme();
  const card = darkMode ? "#141414" : "#ffffff";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderSub = darkMode ? "rgba(255,255,255,0.06)" : "#ececec";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.5)" : "#666666";
  const textMuted = darkMode ? "rgba(255,255,255,0.28)" : "#aaaaaa";
  const rowHov = darkMode ? "rgba(255,255,255,0.05)" : "#f6f6f6";

  return (
    <div style={{
      border: `1px solid ${border}`, borderRadius: 8, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      {/* Header */}
      <div style={{
        background: "#0d0d0d", padding: "11px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <FiTrendingUp size={11} color="rgba(255,255,255,0.5)" />
          <span style={{
            color: "#ffffff", fontSize: 9, fontWeight: 900,
            letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: FONT.body,
          }}>Meilleurs Buteurs</span>
        </div>
        <a href="/standings" style={{
          display: "flex", alignItems: "center", gap: 3,
          color: "rgba(255,255,255,0.4)", fontSize: 8, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em",
          textDecoration: "none", fontFamily: FONT.body, transition: "color 0.2s",
        }}
          onMouseOver={e => e.currentTarget.style.color = "#ffffff"}
          onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
        >
          Voir tout <FiChevronRight size={9} />
        </a>
      </div>

      {TOP_SCORERS.map((p, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "11px 14px",
          borderBottom: i < TOP_SCORERS.length - 1 ? `1px solid ${borderSub}` : "none",
          background: card, cursor: "pointer",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = rowHov}
          onMouseLeave={e => e.currentTarget.style.background = card}
        >
          {/* Rank */}
          <span style={{
            fontSize: 10, fontWeight: 900, color: textMuted,
            width: 16, textAlign: "center", fontFamily: FONT.body, flexShrink: 0,
          }}>{i + 1}</span>

          {/* Flag — larger now */}
          <img
            src={`https://flagcdn.com/w40/${p.code || "un"}.png`}
            alt={p.team}
            loading="lazy"
            style={{
              width: 32, height: 22,
              objectFit: "cover", borderRadius: 3, flexShrink: 0,
              border: "0.5px solid rgba(128,128,128,0.2)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            }}
          />

          {/* Name + team */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 12, fontWeight: 700, color: textPrimary,
              fontFamily: FONT.body, overflow: "hidden",
              textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0,
              transition: "color 0.3s",
            }}>{p.player}</p>
            <p style={{
              fontSize: 9, color: textSecondary, fontFamily: FONT.body,
              fontWeight: 600, margin: "2px 0 0", transition: "color 0.3s",
            }}>{p.team}</p>
          </div>

          {/* Goals */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 3, flexShrink: 0 }}>
            <span style={{
              fontFamily: FONT.display, fontWeight: 900,
              fontSize: "1.4rem", color: textPrimary, lineHeight: 1,
              transition: "color 0.3s",
            }}>{p.goals}</span>
            <span style={{
              fontSize: 8, color: textSecondary, textTransform: "uppercase",
              letterSpacing: "0.1em", fontWeight: 700, fontFamily: FONT.body,
            }}>buts</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── FILTER TAB ───────────────────────────────────────────────
function FilterTab({ label, active, dot, icon: Icon, onClick }) {
  const { darkMode } = useTheme();
  const accent = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover = darkMode ? "#e8e8e8" : "#333333";
  const inactiveBg = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const inactiveHover = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "#555555";
  const liveGreen = "#22c55e";

  const [hovered, hoverProps] = useHover();
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
        padding: "8px 16px", borderRadius: 100, border: "none",
        background: active ? accent : (hovered ? inactiveHover : inactiveBg),
        color: active ? accentContrast : (hovered ? textPrimary : textSecondary),
        cursor: "pointer", transition: "all 0.2s",
        fontFamily: FONT.body, outline: "none",
        boxShadow: active ? `0 2px 8px rgba(0,0,0,${darkMode ? 0.4 : 0.15})` : "none",
      }}
      {...hoverProps}
    >
      {dot
        ? <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: active ? "#4ade80" : liveGreen,
          animation: "mpulse 1.4s ease-in-out infinite",
        }} />
        : Icon && <Icon size={10} />
      }
      {label}
    </button>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────
export function MatchesSection({ matchFilter, setMatchFilter }) {
  const { darkMode } = useTheme();
  const { data: matches, loading, error } = useMatches({ status: matchFilter, limit: 8 });

  const surface = darkMode ? "#0d0d0d" : "#f5f5f5";
  const card = darkMode ? "#141414" : "#ffffff";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderSub = darkMode ? "rgba(255,255,255,0.06)" : "#e8e8e8";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.5)" : "#666666";
  const accent = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover = darkMode ? "#e8e8e8" : "#333333";
  const headerBg = darkMode ? "#111111" : "#f0f0f0";

  const allMatches = matches || [];
  const featuredMatch = allMatches[0] || null;
  const restMatches = allMatches.slice(1);

  const FILTERS = [
    { k: "upcoming", l: "À venir", icon: FiClock },
    { k: "live", l: "En direct", dot: true },
    { k: "finished", l: "Résultats", icon: FiAward },
  ];

  return (
    <>
      <style>{`
        @keyframes mpulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.3; transform:scale(.65); }
        }

        .ms-grid {
          display: grid;
          grid-template-columns: 1fr 252px;
          gap: 16px;
          align-items: start;
        }
        .ms-left  { display: flex; flex-direction: column; gap: 12px; }
        .ms-right { position: sticky; top: 16px; }

        .ms-filters {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 18px; overflow-x: auto;
          padding-bottom: 2px; scrollbar-width: none;
        }
        .ms-filters::-webkit-scrollbar { display: none; }

        .ms-list-card {
          border-radius: 8px; overflow: hidden;
          transition: border-color 0.3s, background 0.3s;
        }
        .ms-list-row:last-child > div { border-bottom: none !important; }

        /* Hover on featured team box */
        .feat-team-box { transition: background 0.2s; }

        @media (max-width: 760px) {
          .ms-grid { grid-template-columns: 1fr; }
          .ms-right { position: static; margin-top: 4px; }
        }
        @media (max-width: 480px) {
          .ms-filters { gap: 4px; margin-bottom: 12px; }
          .ms-filters button { padding: 7px 12px; font-size: 8px; }
        }
      `}</style>

      <section style={{
        background: surface, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div className="layout-container">

          <SectionHead eyebrow="Calendrier" title="Matchs" action="Tous les matchs" href="/matches" />

          {/* Filter tabs */}
          <div className="ms-filters">
            {FILTERS.map(f => (
              <FilterTab
                key={f.k} label={f.l}
                active={matchFilter === f.k}
                dot={f.dot} icon={f.icon}
                onClick={() => setMatchFilter(f.k)}
              />
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div style={{
              background: card, border: `1px solid ${border}`, borderRadius: 8,
              padding: "48px 24px", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.3s, border-color 0.3s",
            }}>
              <Spinner />
            </div>
          ) : error || !allMatches.length ? (
            <div style={{
              background: card, border: `1px solid ${border}`, borderRadius: 8,
              padding: "48px 24px", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 10,
              transition: "background 0.3s, border-color 0.3s",
            }}>
              <FiZap size={20} color={textSecondary} />
              <span style={{ fontSize: 13, color: textSecondary, fontFamily: FONT.body, fontWeight: 600 }}>
                {error ? "Erreur de chargement" : "Aucun match disponible."}
              </span>
            </div>
          ) : (
            <div className="ms-grid">

              {/* Left column */}
              <div className="ms-left">
                {featuredMatch && <FeaturedMatch match={featuredMatch} />}

                {restMatches.length > 0 && (
                  <div className="ms-list-card" style={{
                    background: card, border: `1px solid ${border}`,
                  }}>
                    {/* List header */}
                    <div style={{
                      padding: "9px 14px", background: headerBg,
                      borderBottom: `1px solid ${borderSub}`,
                      transition: "background 0.3s, border-color 0.3s",
                    }}>
                      <span style={{
                        fontSize: 9, fontWeight: 900, letterSpacing: "0.2em",
                        textTransform: "uppercase", color: textSecondary, fontFamily: FONT.body,
                      }}>Autres matchs</span>
                    </div>
                    <div>
                      {restMatches.map(m => (
                        <div key={m.id} className="ms-list-row">
                          <MatchRow m={m} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="ms-right">
                <TopScorers />
              </div>
            </div>
          )}

          {/* CTA */}
          <a href="/matches" style={{
            marginTop: 18,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
            color: accentContrast, background: accent,
            padding: "13px 0", borderRadius: 100,
            textDecoration: "none", width: "100%",
            transition: "background 0.25s, transform 0.2s",
            fontFamily: FONT.body,
            boxShadow: `0 2px 10px rgba(0,0,0,${darkMode ? 0.4 : 0.14})`,
          }}
            onMouseOver={e => { e.currentTarget.style.background = accentHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={e => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Voir tous les matchs <FiArrowRight size={12} />
          </a>

        </div>
      </section>
    </>
  );
}