import { useState, useEffect } from "react";
import {
  FiCalendar, FiClock, FiAward,
  FiChevronRight, FiArrowRight,
  FiZap, FiMapPin, FiTrendingUp,
} from "react-icons/fi";
import { FONT, STAGE_LABEL, getCode } from "./constants";
import { Flag, SectionHead, Spinner } from "./ui";
import { useTheme } from "../../context/ThemeContext";
import { useMatches, useFetch } from "../../hooks/useWorldCup";
import { getTopScorers, getImageUrl } from "../../services/api";

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── BIG FLAG ─────────────────────────────────────────────────
// Large, prominent flag with subtle shadow + rounded corners
function BigFlag({ code, alt = "", size = 56 }) {
  if (!code) return (
    <div style={{
      width: size * 1.45, height: size,
      background: "rgba(128,128,128,0.1)",
      borderRadius: 6, flexShrink: 0,
      border: "1px solid rgba(128,128,128,0.15)",
    }} />
  );

  const isUrl = typeof code === 'string' && (code.startsWith('http') || code.startsWith('/storage/'));
  const src = isUrl ? getImageUrl(code) : `https://flagcdn.com/w160/${code.toLowerCase()}.png`;

  return (
    <img
      src={src}
      srcSet={!isUrl ? `https://flagcdn.com/w80/${code.toLowerCase()}.png 80w, https://flagcdn.com/w160/${code.toLowerCase()}.png 160w` : undefined}
      sizes={!isUrl ? "160px" : undefined}
      alt={alt}
      loading="lazy"
      onError={(e) => { e.target.src = "https://flagcdn.com/w160/un.png"; }}
      style={{
        width: size * 1.45, height: size,
        objectFit: "cover",
        borderRadius: 6,
        flexShrink: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
        background: "#22c55e", animation: "lpulse 1.4s ease-in-out infinite",
      }} />
      <span style={{
        color: "#ffffff", fontSize: 10, fontWeight: 800,
        fontFamily: FONT.body, letterSpacing: "0.02em",
      }}>{minute}'</span>
      <style>{`@keyframes lpulse { 0% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.85); } 100% { opacity:1; transform:scale(1); } }`}</style>
    </div>
  );
}

// ─── FEATURED MATCH CARD ──────────────────────────────────────
function FeaturedMatch({ match }) {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c" : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const textPrimary   = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.85)" : "#666666";
  const textMuted     = darkMode ? "rgba(255,255,255,0.3)" : "#999999";
  const teamBg        = darkMode ? "#161616" : "#fcfcfc";
  const teamBgHov     = darkMode ? "#222222" : "#f5f5f5";
  const liveGreen     = "#22c55e";

  const isLive = match.status === 'live';
  const isDone = match.status === 'finished';

  const formatTime = (t) => t ? t.substring(0, 5) : "--:--";
  const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  return (
    <div style={{
      background: card, borderRadius: 12, padding: "clamp(20px,3.5vw,36px)",
      border: `1px solid ${border}`, position: "relative", overflow: "hidden",
      boxShadow: `0 20px 50px rgba(0,0,0,${darkMode ? 0.4 : 0.08})`,
      transition: "background 0.3s, border-color 0.3s",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", top: -50, right: -50, width: 200, height: 200,
        background: "radial-gradient(circle, rgba(200,16,46,0.05) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Header info */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "clamp(20px,3vw,32px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            padding: "5px 12px", background: darkMode ? "rgba(255,255,255,0.06)" : "#f0f0f0",
            borderRadius: 4, display: "flex", alignItems: "center", gap: 6,
          }}>
            <FiCalendar size={13} color={textSecondary} />
            <span style={{ fontSize: 10, fontWeight: 800, color: textPrimary, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT.body }}>
              {formatDate(match.match_date)}
            </span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: textMuted, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT.body }}>
            {match.venue}
          </span>
        </div>
        {isLive && <LiveBadge minute={Math.floor(Math.random() * 90)} />}
      </div>

      {/* Teams grid */}
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
          <BigFlag
            code={getCode(match.team1)}
            alt={match.team1?.name}
            size={56}
          />
          <span style={{
            fontFamily: FONT.display,
            fontSize: "clamp(0.85rem,3vw,1.15rem)",
            fontWeight: 900, letterSpacing: "0.06em",
            color: textPrimary, textAlign: "center", textTransform: "uppercase",
            lineHeight: 1.1,
          }}>{match.team1?.name || (typeof match.team1 === 'string' ? match.team1 : "TBD")}</span>
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
          <BigFlag
            code={getCode(match.team2)}
            alt={match.team2?.name}
            size={56}
          />
          <span style={{
            fontFamily: FONT.display,
            fontSize: "clamp(0.85rem,3vw,1.15rem)",
            fontWeight: 900, letterSpacing: "0.06em",
            color: textPrimary, textAlign: "center", textTransform: "uppercase",
            lineHeight: 1.1,
          }}>{match.team2?.name || (typeof match.team2 === 'string' ? match.team2 : "TBD")}</span>
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
        <span style={{ fontSize: 11, color: textSecondary, fontWeight: 600, fontFamily: FONT.body }}>
          {match.city} • {match.venue} {match.stadium?.capacity ? `(Capacité: ${match.stadium.capacity.toLocaleString()})` : ''}, {match.stage === 'group' ? match.group_name : STAGE_LABEL[match.stage]}
        </span>
      </div>
    </div>
  );
}

// ─── LIST ROW COMPONENT ───────────────────────────────────────
function MatchRow({ m }) {
  const { darkMode } = useTheme();
  const textPrimary   = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.85)" : "#666666";
  const border        = darkMode ? "rgba(255,255,255,0.06)" : "#f0f0f0";
  const rowHov       = darkMode ? "rgba(255,255,255,0.02)" : "#fcfcfc";

  const isLive = m.status === 'live';
  const liveGreen = "#22c55e";

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 80px 1fr", alignItems: "center",
      padding: "14px 16px", borderBottom: `1px solid ${border}`,
      transition: "background 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = rowHov}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Team 1 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Flag code={getCode(m.team1)} alt={m.team1?.name} size={14} />
        <span style={{
          fontSize: 12, fontWeight: 700, color: textPrimary,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          fontFamily: FONT.body,
        }}>{m.team1?.name || (typeof m.team1 === 'string' ? m.team1 : "TBD")}</span>
      </div>

      {/* Score / Time */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {m.status === 'upcoming' ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
             <span style={{ fontSize: 10, fontWeight: 600, color: textSecondary, fontFamily: FONT.body, textTransform: "uppercase" }}>
               {new Date(m.match_date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
             </span>
             <span style={{ fontSize: 12, fontWeight: 800, color: textPrimary, fontFamily: FONT.body, letterSpacing: "0.04em" }}>
               {m.match_time?.substring(0, 5)}
             </span>
          </div>
        ) : (
          <span style={{
            fontSize: 13, fontWeight: 900, color: isLive ? liveGreen : textPrimary,
            fontFamily: FONT.display, letterSpacing: "0.04em",
          }}>{m.home_score} – {m.away_score}</span>
        )}
      </div>

      {/* Team 2 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
        <span style={{
          fontSize: 12, fontWeight: 700, color: textPrimary,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          fontFamily: FONT.body, textAlign: "right",
        }}>{m.team2?.name || (typeof m.team2 === 'string' ? m.team2 : "TBD")}</span>
        <Flag code={getCode(m.team2)} alt={m.team2?.name} size={14} />
      </div>
    </div>
  );
}

// ─── TOP SCORERS ──────────────────────────────────────────────
function TopScorers() {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c" : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderSub     = darkMode ? "rgba(255,255,255,0.06)" : "#f0f0f0";
  const textPrimary   = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.85)" : "#666666";
  const textMuted     = darkMode ? "rgba(255,255,255,0.3)" : "#999999";
  const rowHov       = darkMode ? "rgba(255,255,255,0.03)" : "#fafafa";

  const { data: scorersData } = useFetch(getTopScorers, {}, []);
  const scorers = scorersData || [];

  return (
    <div style={{
      border: `1px solid ${border}`, borderRadius: 8, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
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
        <a href="/joueurs" style={{
          display: "flex", alignItems: "center", gap: 3,
          color: "rgba(255,255,255,0.4)", fontSize: 8, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em",
          textDecoration: "none", fontFamily: FONT.body, transition: "color 0.2s",
        }}
          onMouseOver={e => e.currentTarget.style.color = "#ffffff"}
          onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
        >
          Tout voir <FiChevronRight size={10} />
        </a>
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
        {scorers.length === 0 ? (
           <div style={{ padding: 24, textAlign: "center", background: card }}>
             <span style={{ fontSize: 11, color: textMuted, fontFamily: FONT.body }}>Aucune donnée</span>
           </div>
        ) : scorers.map((p, i) => (
          <div key={p.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "11px 14px",
            borderBottom: i < scorers.length - 1 ? `1px solid ${borderSub}` : "none",
            background: card, cursor: "pointer",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = rowHov}
            onMouseLeave={e => e.currentTarget.style.background = card}
          >
            <span style={{
              fontSize: 10, fontWeight: 900, color: textMuted,
              width: 16, textAlign: "center", fontFamily: FONT.body, flexShrink: 0,
            }}>{i + 1}</span>

            <img 
              src={p.photo ? getImageUrl(p.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name || p.player)}&background=1a1a1a&color=ffffff&rounded=true`} 
              alt={p.name || p.player} 
              style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `1px solid ${border}` }} 
            />
            
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
              <span style={{
                fontSize: 11, fontWeight: 700, color: textPrimary,
                fontFamily: FONT.body, display: "block",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{p.name || p.player}</span>
              <span style={{ fontSize: 9, color: textSecondary, fontFamily: FONT.body, fontWeight: 500 }}>
                {p.team?.name || 'TBD'}
              </span>
            </div>

            <span style={{
              fontSize: 12, fontWeight: 900, color: textPrimary,
              fontFamily: FONT.display, minWidth: 20, textAlign: "right",
            }}>{p.goals || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────

export default function MatchesSection({ matches, loading, error, matchFilter, setMatchFilter, refetch }) {
  const { darkMode } = useTheme();
  const surface = darkMode ? "#0d0d0d" : "#f5f5f5";
  const card = darkMode ? "#141414" : "#ffffff";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderSub = darkMode ? "rgba(255,255,255,0.06)" : "#e8e8e8";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.85)" : "#666666";
  const accent = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover = darkMode ? "#e8e8e8" : "#333333";
  const headerBg = darkMode ? "#111111" : "#f0f0f0";

  const displayMatches = matches || [];
  const featuredMatch = displayMatches[0] || null;
  const restMatches = displayMatches.slice(1);

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
          grid-template-columns: 1fr 280px;
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
        <div style={{
          width: "100%", maxWidth: "1600px", margin: "0 auto", padding: "0 24px",
          boxSizing: "border-box",
        }}>

          <SectionHead title="Matchs" action="Tout voir" href="/matches" />

          {/* Content */}
          {loading ? (
            <div style={{
              background: card, border: `1px solid ${border}`, borderRadius: 8,
              padding: "48px 24px", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.3s, border-color 0.3s",
            }}>
              <Spinner />
            </div>
          ) : error || !displayMatches.length ? (
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
              <div className="ms-left">
                {featuredMatch && <FeaturedMatch match={featuredMatch} />}

                {restMatches.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ 
                      display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
                      padding: "0 4px"
                    }}>
                      <FiCalendar size={14} color={textSecondary} />
                      <span style={{ 
                        fontSize: 10, fontWeight: 900, color: textPrimary,
                        letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: FONT.body
                      }}>Prochains Matchs</span>
                    </div>
                    <div style={{
                      background: card, border: `1px solid ${border}`, borderRadius: 8,
                      overflow: "hidden", transition: "background 0.3s, border-color 0.3s",
                    }}>
                      {restMatches.map(m => (
                        <MatchRow key={m.id} m={m} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="ms-right">
                <TopScorers />
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

function FilterTab({ label, active, dot, icon: Icon, onClick }) {
  const { darkMode } = useTheme();
  const accent = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const inactiveBg = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "#555555";
  const liveGreen = "#22c55e";

  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
        padding: "8px 16px", borderRadius: 100, border: "none",
        background: active ? accent : inactiveBg,
        color: active ? accentContrast : textSecondary,
        cursor: "pointer", transition: "all 0.2s",
        fontFamily: FONT.body, outline: "none",
      }}
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