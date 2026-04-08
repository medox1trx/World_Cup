import { useState } from "react";
import {
  FiCalendar, FiClock, FiAward,
  FiChevronRight, FiArrowRight, FiAlertCircle,
  FiRefreshCw, FiShoppingCart, FiMapPin, FiZap,
} from "react-icons/fi";
import { FONT, STAGE_LABEL, TOP_SCORERS, getCode, MATCHES } from "./constants";
import { Flag, SectionHead, Spinner } from "./ui";
import { useTheme } from "../../context/ThemeContext";

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

function LiveBadge({ minute }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", background: "#111111", borderRadius: 2,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "#22c55e", flexShrink: 0,
        animation: "mpulse 1.4s ease-in-out infinite",
      }} />
      <span style={{
        color: "#22c55e", fontSize: 8, fontWeight: 900,
        letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: FONT.body,
      }}>
        Live {minute ? `· ${minute}'` : ""}
      </span>
    </div>
  );
}

function FeaturedMatch({ match }) {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c" : "#ffffff";
  const surface       = darkMode ? "#171717" : "#f5f5f5";
  const border        = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderHover   = darkMode ? "rgba(255,255,255,0.22)" : "#999999";
  const borderSub     = darkMode ? "rgba(255,255,255,0.06)" : "#e8e8e8";
  const textPrimary   = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "#555555";
  const textMuted     = darkMode ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.2)";
  const accent        = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover   = darkMode ? "#e8e8e8" : "#333333";
  const liveGreen     = "#22c55e";
  const liveBorder    = "rgba(34,197,94,0.4)";

  const [hovered, hoverProps] = useHover();
  if (!match) return null;

  const isLive = match.status === "live";
  const isDone = match.status === "finished";
  const dateStr = new Date(match.match_date + "T00:00:00")
    .toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div style={{
      background: card,
      border: `1px solid ${isLive ? liveBorder : hovered ? borderHover : border}`,
      borderRadius: 4, overflow: "hidden",
      transition: "border-color 0.25s, background 0.3s",
    }} {...hoverProps}>

      <div style={{
        padding: "10px 16px",
        background: isLive ? card : surface,
        borderBottom: `1px solid ${isLive ? border : borderSub}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8, flexWrap: "wrap",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isLive
            ? <LiveBadge minute={match.minute} />
            : <span style={{
                fontSize: 9, fontWeight: 900, letterSpacing: "0.18em",
                textTransform: "uppercase", color: textSecondary, fontFamily: FONT.body,
              }}>
                {STAGE_LABEL[match.stage] || "Groupe"}{match.group_name ? ` · ${match.group_name}` : ""}
              </span>
          }
        </div>
        {!isLive && (
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, color: textSecondary, fontFamily: FONT.body, fontWeight: 600,
          }}>
            <FiCalendar size={9} /> {dateStr}
          </span>
        )}
      </div>

      <div style={{ padding: "24px 16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Flag code={getCode(match.home_team)} alt={match.home_team} size={44} />
            <span style={{
              fontFamily: FONT.display, fontSize: "clamp(0.75rem,3.5vw,1.05rem)",
              fontWeight: 900, letterSpacing: "0.06em",
              color: textPrimary, textAlign: "center", textTransform: "uppercase",
            }}>{match.home_team}</span>
          </div>

          <div style={{
            flexShrink: 0, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, padding: "0 6px", minWidth: 70,
          }}>
            {isDone || isLive ? (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.8rem,7vw,3rem)", lineHeight: 1,
                  color: isLive ? liveGreen : textPrimary,
                  fontVariantNumeric: "tabular-nums",
                }}>{match.home_score ?? 0}</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.2rem,4vw,2rem)", lineHeight: 1, color: textMuted,
                }}>–</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.8rem,7vw,3rem)", lineHeight: 1,
                  color: isLive ? liveGreen : textPrimary,
                  fontVariantNumeric: "tabular-nums",
                }}>{match.away_score ?? 0}</span>
              </div>
            ) : (
              <span style={{
                fontFamily: FONT.display, fontWeight: 900,
                color: textPrimary, fontSize: "clamp(1.4rem,6vw,2.4rem)", lineHeight: 1,
              }}>{match.match_time?.slice(0, 5)}</span>
            )}
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: "0.14em",
              textTransform: "uppercase", fontFamily: FONT.body,
              color: isLive ? liveGreen : textSecondary, marginTop: 4,
            }}>
              {isLive ? "En direct" : isDone ? "Terminé" : "Coup d'envoi"}
            </span>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Flag code={getCode(match.away_team)} alt={match.away_team} size={44} />
            <span style={{
              fontFamily: FONT.display, fontSize: "clamp(0.75rem,3.5vw,1.05rem)",
              fontWeight: 900, letterSpacing: "0.06em",
              color: textPrimary, textAlign: "center", textTransform: "uppercase",
            }}>{match.away_team}</span>
          </div>
        </div>

        <div style={{
          marginTop: 18, paddingTop: 14,
          borderTop: `1px solid ${border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 8, flexWrap: "wrap",
          transition: "border-color 0.3s",
        }}>
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, color: textSecondary, fontFamily: FONT.body, fontWeight: 600,
          }}>
            <FiMapPin size={9} /> {match.venue}, {match.city}
          </span>
          {/* Tickets button — always filled */}
          <a href="/tickets" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: accent, color: accentContrast,
            fontFamily: FONT.body, fontSize: 9, fontWeight: 900,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "7px 14px", borderRadius: 100, textDecoration: "none",
            transition: "background 0.25s",
          }}
            onMouseOver={e => e.currentTarget.style.background = accentHover}
            onMouseOut={e => e.currentTarget.style.background = accent}
          >
            <FiShoppingCart size={9} /> Billets
          </a>
        </div>
      </div>
    </div>
  );
}

function MatchRow({ m }) {
  const { darkMode } = useTheme();
  const card        = darkMode ? "#1c1c1c" : "#ffffff";
  const cardHover   = darkMode ? "rgba(255,255,255,0.06)" : "#f5f5f5";
  const border      = darkMode ? "rgba(255,255,255,0.08)" : "#ececec";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "#555555";
  const textMuted   = darkMode ? "rgba(255,255,255,0.32)" : "#aaaaaa";
  const liveGreen   = "#22c55e";

  const [hovered, hoverProps] = useHover();
  const isLive = m.status === "live";
  const isDone = m.status === "finished";
  const date = new Date(m.match_date + "T00:00:00")
    .toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "10px 12px",
      borderBottom: `1px solid ${border}`,
      background: hovered
        ? (isLive ? "rgba(34,197,94,0.08)" : cardHover)
        : (isLive ? "rgba(34,197,94,0.04)" : card),
      cursor: "pointer", transition: "background 0.25s, border-color 0.3s", gap: 6,
    }} {...hoverProps}>
      <div style={{ width: 44, flexShrink: 0 }}>
        {isLive
          ? <span style={{
              display: "flex", alignItems: "center", gap: 3,
              fontSize: 8, fontWeight: 900, color: "#16a34a",
              textTransform: "uppercase", fontFamily: FONT.body, letterSpacing: "0.1em",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: liveGreen, flexShrink: 0, animation: "mpulse 1.4s ease-in-out infinite" }} />
              Live
            </span>
          : <span style={{ fontSize: 10, color: textSecondary, fontFamily: FONT.body, fontWeight: 700 }}>{date}</span>
        }
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", minWidth: 0 }}>
        <span style={{
          fontSize: "clamp(10px,2.5vw,12px)", fontWeight: 700, color: textPrimary,
          fontFamily: FONT.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{m.home_team}</span>
        <Flag code={getCode(m.home_team)} alt={m.home_team} size={16} />
      </div>

      <div style={{ flexShrink: 0, width: 50, textAlign: "center" }}>
        {isDone || isLive
          ? <span style={{
              fontFamily: FONT.display, fontWeight: 900,
              fontSize: "clamp(0.9rem,3vw,1.05rem)", color: isLive ? "#16a34a" : textPrimary,
              fontVariantNumeric: "tabular-nums",
            }}>{m.home_score ?? 0}–{m.away_score ?? 0}</span>
          : <span style={{
              fontFamily: FONT.body, fontWeight: 800,
              fontSize: "clamp(10px,2.5vw,12px)", color: textSecondary,
            }}>{m.match_time?.slice(0, 5)}</span>
        }
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
        <Flag code={getCode(m.away_team)} alt={m.away_team} size={16} />
        <span style={{
          fontSize: "clamp(10px,2.5vw,12px)", fontWeight: 700, color: textPrimary,
          fontFamily: FONT.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{m.away_team}</span>
      </div>

      <FiChevronRight size={11} color={hovered ? textPrimary : textMuted} style={{ flexShrink: 0, transition: "color 0.25s" }} />
    </div>
  );
}

function TopScorers() {
  const { darkMode } = useTheme();
  const card        = darkMode ? "#1c1c1c" : "#ffffff";
  const border      = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderSub   = darkMode ? "rgba(255,255,255,0.06)" : "#ececec";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "#555555";
  const textMuted   = darkMode ? "rgba(255,255,255,0.32)" : "#aaaaaa";
  const hover       = darkMode ? "rgba(255,255,255,0.06)" : "#f5f5f5";
  const headerBg    = darkMode ? "#1c1c1c" : "#0d0d0d";

  return (
    <div style={{
      border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <div style={{
        background: headerBg, padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s",
      }}>
        <span style={{
          color: "#ffffff", fontSize: 9, fontWeight: 900,
          letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: FONT.body,
        }}>Meilleurs Buteurs</span>
        <a href="/standings" style={{
          display: "flex", alignItems: "center", gap: 3,
          color: "rgba(255,255,255,0.45)", fontSize: 8, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em",
          textDecoration: "none", fontFamily: FONT.body, transition: "color 0.25s",
        }}
          onMouseOver={e => e.currentTarget.style.color = "#ffffff"}
          onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
        >
          Voir tout <FiChevronRight size={9} />
        </a>
      </div>

      {TOP_SCORERS.map((p, i) => {
        const [hovered, hoverProps] = useHover(); // eslint-disable-line
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px",
            borderBottom: i < TOP_SCORERS.length - 1 ? `1px solid ${borderSub}` : "none",
            background: hovered ? hover : card,
            transition: "background 0.25s, border-color 0.3s", cursor: "pointer",
          }} {...hoverProps}>
            <span style={{
              fontSize: 10, fontWeight: 900, color: textMuted,
              width: 14, textAlign: "center", fontFamily: FONT.body, flexShrink: 0,
            }}>{i + 1}</span>
            <Flag code={p.code} alt={p.team} size={16} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 12, fontWeight: 700, color: textPrimary,
                fontFamily: FONT.body, overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0,
              }}>{p.player}</p>
              <p style={{
                fontSize: 10, color: textSecondary, fontFamily: FONT.body,
                fontWeight: 600, margin: "2px 0 0",
              }}>{p.team}</p>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, flexShrink: 0 }}>
              <span style={{
                fontFamily: FONT.display, fontWeight: 900,
                fontSize: "1.3rem", color: textPrimary, lineHeight: 1,
              }}>{p.goals}</span>
              <span style={{
                fontSize: 8, color: textSecondary, textTransform: "uppercase",
                letterSpacing: "0.1em", fontWeight: 700, fontFamily: FONT.body,
              }}>buts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Filter tab — ALWAYS has background ──
function FilterTab({ label, active, dot, icon: Icon, onClick }) {
  const { darkMode } = useTheme();
  const accent         = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover    = darkMode ? "#e8e8e8" : "#333333";
  const inactiveBg     = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const inactiveHover  = darkMode ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.1)";
  const textPrimary    = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary  = darkMode ? "rgba(255,255,255,0.6)" : "#444444";
  const liveGreen      = "#22c55e";

  const [hovered, hoverProps] = useHover();
  return (
    <button onClick={onClick} style={{
      flexShrink: 0,
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
      padding: "8px 16px", borderRadius: 100, border: "none",
      background: active ? accent : (hovered ? inactiveHover : inactiveBg),
      color: active ? accentContrast : (hovered ? textPrimary : textSecondary),
      cursor: "pointer", transition: "all 0.25s",
      fontFamily: FONT.body, outline: "none",
    }} {...hoverProps}>
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

export function MatchesSection({ matchFilter, setMatchFilter }) {
  const { darkMode } = useTheme();
  const surface     = darkMode ? "#171717" : "#f5f5f5";
  const card        = darkMode ? "#1c1c1c" : "#ffffff";
  const border      = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderSub   = darkMode ? "rgba(255,255,255,0.06)" : "#e8e8e8";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "#555555";
  const accent      = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover = darkMode ? "#e8e8e8" : "#333333";
  const headerBg    = darkMode ? "#171717" : "#f0f0f0";

  const allMatches    = MATCHES.filter(m => m.status === matchFilter);
  const featuredMatch = allMatches[0] || null;
  const restMatches   = allMatches.slice(1);

  const FILTERS = [
    { k: "upcoming", l: "À venir",   icon: FiClock },
    { k: "live",     l: "En direct", dot: true      },
    { k: "finished", l: "Résultats", icon: FiAward  },
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
          grid-template-columns: 1fr 260px;
          gap: 16px;
          align-items: start;
        }
        .ms-left  { display: flex; flex-direction: column; gap: 12px; }
        .ms-right { position: sticky; top: 20px; }
        .ms-filters { display: flex; align-items: center; gap: 6px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; }
        .ms-filters::-webkit-scrollbar { display: none; }
        @media (max-width: 720px) {
          .ms-grid { grid-template-columns: 1fr; }
          .ms-right { position: static; }
        }
      `}</style>

      <section style={{
        background: surface, padding: "clamp(24px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(12px,4vw,24px)" }}>

          <SectionHead eyebrow="Calendrier" title="Matchs" action="Tous les matchs" href="/matches" />

          <div className="ms-filters">
            {FILTERS.map(f => (
              <FilterTab
                key={f.k} label={f.l} active={matchFilter === f.k}
                dot={f.dot} icon={f.icon}
                onClick={() => setMatchFilter(f.k)}
              />
            ))}
          </div>

          {!allMatches.length ? (
            <div style={{
              background: card, border: `1px solid ${border}`,
              borderRadius: 4, padding: "48px 24px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              transition: "background 0.3s, border-color 0.3s",
            }}>
              <FiZap size={18} color={textSecondary} />
              <span style={{ fontSize: 13, color: textSecondary, fontFamily: FONT.body, fontWeight: 600 }}>
                Aucun match disponible.
              </span>
            </div>
          ) : (
            <div className="ms-grid">
              <div className="ms-left">
                {featuredMatch && <FeaturedMatch match={featuredMatch} />}
                {restMatches.length > 0 && (
                  <div style={{
                    background: card, border: `1px solid ${border}`,
                    borderRadius: 4, overflow: "hidden",
                    transition: "background 0.3s, border-color 0.3s",
                  }}>
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
                    {restMatches.map(m => <MatchRow key={m.id} m={m} />)}
                  </div>
                )}
              </div>
              <div className="ms-right">
                <TopScorers />
              </div>
            </div>
          )}

          {/* CTA — always filled, never just border */}
          <a href="/matches" style={{
            marginTop: 16,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
            color: accentContrast, background: accent,
            padding: "13px 0", borderRadius: 100,
            textDecoration: "none", width: "100%",
            transition: "background 0.25s, transform 0.2s",
            fontFamily: FONT.body,
          }}
            onMouseOver={e => { e.currentTarget.style.background = accentHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={e  => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Voir tous les matchs <FiArrowRight size={12} />
          </a>
        </div>
      </section>
    </>
  );
}