import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMatches } from "../hooks/useWorldCup";
import { MATCHES as MOCK_MATCHES, FONT, getCode } from "./Home/constants";
import { Flag } from "./Home/ui";
import { useTheme } from "../context/ThemeContext";

const D = FONT.display;
const B = FONT.body;

// ─── Group matches by day ─────────────────────────────────────
function groupByDay(matches) {
  const map = {};
  matches.forEach((m) => {
    const raw = m.match_date || m.date || "";
    const key = raw.split("T")[0]; // "2026-06-11"
    if (!map[key]) map[key] = [];
    map[key].push(m);
  });
  // Sort keys chronologically
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
}

function formatDayHeader(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatTime(m) {
  const t = m.match_time || m.time || "";
  if (t) return t.substring(0, 5);
  const raw = m.match_date || m.date || "";
  if (raw.includes("T")) {
    const d = new Date(raw);
    return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  return "--:--";
}

function teamName(t) {
  if (!t) return "TBD";
  if (typeof t === "string") return t;
  return t.name || "TBD";
}

// ─── Single Match Row ────────────────────────────────────────
function MatchRow({ m, darkMode }) {
  const border  = darkMode ? "rgba(255,255,255,0.07)" : "#e8e8e8";
  const tPrimary  = darkMode ? "#ffffff" : "#000000";
  const tMuted    = darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)";
  const hoverBg   = darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const [hovered, setHovered] = useState(false);

  const home = m.team1 || m.home_team;
  const away = m.team2 || m.away_team;
  const phase = m.group_name || m.stage || m.phase || "Phase de groupes";
  const venue = m.venue || m.stadium || "";
  const city  = m.city || "";
  const time  = formatTime(m);
  const isFinished = m.status === "finished";
  const score = isFinished ? `${m.home_score ?? 0} - ${m.away_score ?? 0}` : null;

  // Build meta line: Phase label · Groupe X · Stade (Ville)
  const stageLabel = (() => {
    const s = (m.stage || "").toLowerCase();
    if (s.includes("group") || s === "phase de groupes") return "Phase de groupes";
    if (s.includes("round of 32") || s.includes("seizième")) return "Seizièmes de finale";
    if (s.includes("round of 16") || s.includes("huitième")) return "Huitièmes de finale";
    if (s.includes("quarter") || s.includes("quart")) return "Quarts de finale";
    if (s.includes("semi") || s.includes("demi")) return "Demi-finales";
    if (s.includes("third") || s.includes("troisième")) return "Match pour la 3e place";
    if (s.includes("final") || s.includes("finale")) return "Finale";
    return m.stage || "Phase de groupes";
  })();

  const metaParts = [stageLabel];
  if (m.group_name && m.group_name !== m.stage) metaParts.push(m.group_name);
  if (venue) metaParts.push(venue + (city ? ` (${city})` : ""));
  else if (city) metaParts.push(city);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: `1px solid ${border}`,
        background: hovered ? hoverBg : "transparent",
        transition: "background 0.15s",
        padding: "14px clamp(16px,3vw,48px)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {/* Teams row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(8px,2vw,24px)",
      }}>
        {/* Home team */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          justifyContent: "flex-end", gap: 10, minWidth: 0,
        }}>
          <span style={{
            fontFamily: B, fontSize: "clamp(13px,1.4vw,16px)", fontWeight: 700,
            color: tPrimary, textAlign: "right",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{teamName(home)}</span>
          <Flag code={home?.code || home?.flag || getCode(home)} size={22} alt={teamName(home)} />
        </div>

        {/* Score / Time */}
        <div style={{
          minWidth: "clamp(64px,8vw,90px)",
          textAlign: "center",
          flexShrink: 0,
        }}>
          {score ? (
            <span style={{
              fontFamily: D, fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 900,
              color: tPrimary, letterSpacing: "0.06em",
            }}>{score}</span>
          ) : (
            <span style={{
              fontFamily: D, fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 900,
              color: tPrimary, letterSpacing: "0.06em",
            }}>{time}</span>
          )}
        </div>

        {/* Away team */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          justifyContent: "flex-start", gap: 10, minWidth: 0,
        }}>
          <Flag code={away?.code || away?.flag || getCode(away)} size={22} alt={teamName(away)} />
          <span style={{
            fontFamily: B, fontSize: "clamp(13px,1.4vw,16px)", fontWeight: 700,
            color: tPrimary, textAlign: "left",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{teamName(away)}</span>
        </div>
      </div>

      {/* Meta line */}
      <div style={{
        textAlign: "center",
        fontSize: "clamp(10px,1vw,12px)",
        color: tMuted,
        fontFamily: B,
        fontWeight: 500,
      }}>
        {metaParts.map((p, i) => (
          <span key={i}>
            {i > 0 && <span style={{ margin: "0 5px", opacity: 0.4 }}>·</span>}
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Day Section ──────────────────────────────────────────────
function DaySection({ dateKey, matches, darkMode }) {
  const border    = darkMode ? "rgba(255,255,255,0.07)" : "#e8e8e8";
  const tPrimary  = darkMode ? "#ffffff" : "#000000";
  const tMuted    = darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)";
  const headerBg  = darkMode ? "#0d0d0d" : "#ffffff";

  return (
    <div>
      {/* Date Header */}
      <div style={{
        position: "sticky", top: 62, zIndex: 10,
        background: headerBg,
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        padding: "10px clamp(16px,3vw,48px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s",
      }}>
        <span style={{
          fontFamily: B, fontSize: "clamp(11px,1.1vw,13px)", fontWeight: 700,
          color: tPrimary, textTransform: "capitalize",
        }}>
          {formatDayHeader(dateKey)}
        </span>
        <Link to="/standings" style={{
          fontFamily: B, fontSize: "clamp(10px,1vw,12px)", fontWeight: 700,
          color: tMuted, textDecoration: "none", letterSpacing: "0.05em",
          transition: "color 0.15s",
          display: "flex", alignItems: "center", gap: 4,
          whiteSpace: "nowrap",
        }}
          onMouseOver={e => e.currentTarget.style.color = tPrimary}
          onMouseOut={e => e.currentTarget.style.color = tMuted}
        >
          Afficher groupes →
        </Link>
      </div>

      {/* Matches */}
      {matches.map((m, i) => (
        <MatchRow key={m.id || i} m={m} darkMode={darkMode} />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function Matches() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");

  const { data: apiMatches, loading } = useMatches();
  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); return () => clearTimeout(t); }, []);

  const displayMatches = (apiMatches && apiMatches.length > 0) ? apiMatches : MOCK_MATCHES;

  const stages = ["all", ...new Set(displayMatches.map(m => m.group_name || m.stage).filter(Boolean))];

  const filtered = filter === "all"
    ? displayMatches
    : displayMatches.filter(m => (m.group_name || m.stage) === filter);

  const grouped = groupByDay(filtered);

  const bg       = darkMode ? "#0d0d0d" : "#ffffff";
  const tPrimary = darkMode ? "#ffffff" : "#000000";
  const tMuted   = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const filterActiveBg   = darkMode ? "#ffffff" : "#000000";
  const filterActiveText = darkMode ? "#000000" : "#ffffff";
  const filterIdleBg     = darkMode ? "transparent" : "transparent";
  const filterIdleBorder = darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";
  const filterIdleText   = tMuted;

  return (
    <div style={{
      fontFamily: B, background: bg, color: tPrimary,
      minHeight: "100vh", opacity: mounted ? 1 : 0,
      transition: "background 0.4s, color 0.4s, opacity 0.45s",
      paddingBottom: 80,
    }}>
      <style>{`
        .cal-filter-bar::-webkit-scrollbar { display: none; }
        .cal-filter-bar { scrollbar-width: none; }
        @media (max-width: 600px) {
          .cal-match-team span { font-size: 12px !important; }
        }
      `}</style>

      {/* Page Header */}
      <div style={{
        maxWidth: 1380, margin: "0 auto",
        padding: "80px clamp(16px,3vw,48px) 32px",
      }}>
        <h1 style={{
          fontFamily: D,
          fontSize: "clamp(48px,6vw,80px)",
          fontWeight: 900, textTransform: "uppercase",
          margin: "0 0 32px",
          color: tPrimary,
        }}>
          Le Calendrier
        </h1>

        {/* Filter chips */}
        <div className="cal-filter-bar" style={{
          display: "flex", alignItems: "center", gap: 6,
          overflowX: "auto", paddingBottom: 4,
        }}>
          {stages.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              background: filter === s ? filterActiveBg : filterIdleBg,
              color: filter === s ? filterActiveText : filterIdleText,
              border: `1px solid ${filter === s ? filterActiveBg : filterIdleBorder}`,
              padding: "5px 14px", borderRadius: 100,
              fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: "pointer",
              whiteSpace: "nowrap", transition: "all 0.18s", fontFamily: B,
            }}>
              {s === "all" ? "Tous" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: 64, color: tMuted, fontFamily: B, fontSize: 13 }}>
          Chargement des matchs…
        </div>
      )}

      {/* Calendar */}
      {!loading && grouped.length === 0 && (
        <div style={{ textAlign: "center", padding: 64, color: tMuted, fontFamily: B, fontSize: 13 }}>
          Aucun match ne correspond à ce filtre.
        </div>
      )}

      {!loading && grouped.map(([dateKey, matches]) => (
        <DaySection key={dateKey} dateKey={dateKey} matches={matches} darkMode={darkMode} />
      ))}
    </div>
  );
}