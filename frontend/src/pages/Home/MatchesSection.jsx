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
  const { darkMode } = useTheme();
  const badgeBg = darkMode ? "#1c1c1c" : "#111111";
  const liveGreen = "#22c55e";

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", background: badgeBg, borderRadius: 2,
      transition: "background 0.3s",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: liveGreen, flexShrink: 0,
        animation: "mpulse 1.4s ease-in-out infinite",
      }} />
      <span style={{
        color: liveGreen, fontSize: 8, fontWeight: 900,
        letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: FONT.body,
      }}>
        Live {minute ? `· ${minute}'` : ""}
      </span>
    </div>
  );
}

function FeaturedMatch({ match }) {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const surface       = darkMode ? "#171717"                  : "#efefef";
  const bg            = darkMode ? "#0d0d0d"                  : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const borderHover   = darkMode ? "rgba(255,255,255,0.22)"   : "#999999";
  const borderSub     = darkMode ? "rgba(255,255,255,0.06)"   : "#dddddd";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "#444444";
  const textMuted     = darkMode ? "rgba(255,255,255,0.2)"    : "rgba(0,0,0,0.2)";
  const accent        = darkMode ? "#ffffff"                   : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                   : "#ffffff";
  const accentHover   = darkMode ? "#e8e8e8"                   : "#333333";
  const shadow        = darkMode ? "rgba(0,0,0,0.3)"          : "rgba(0,0,0,0.08)";
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
      transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
      boxShadow: hovered && !isLive ? `0 4px 20px ${shadow}` : "none",
    }} {...hoverProps}>

      {/* Header bar */}
      <div style={{
        padding: "10px 16px",
        background: isLive ? bg : surface,
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
                transition: "color 0.3s",
              }}>
                {STAGE_LABEL[match.stage] || "Groupe"}{match.group_name ? ` · ${match.group_name}` : ""}
              </span>
          }
        </div>
        {!isLive && (
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, color: textSecondary, fontFamily: FONT.body, fontWeight: 600,
            transition: "color 0.3s",
          }}>
            <FiCalendar size={9} /> {dateStr}
          </span>
        )}
      </div>

      {/* Teams */}
      <div style={{ padding: "24px 16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>

          {/* Home */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Flag code={getCode(match.home_team)} alt={match.home_team} size={44} />
            <span style={{
              fontFamily: FONT.display, fontSize: "clamp(0.75rem,3.5vw,1.05rem)",
              fontWeight: 900, letterSpacing: "0.06em",
              color: textPrimary, textAlign: "center", textTransform: "uppercase",
              transition: "color 0.3s",
            }}>{match.home_team}</span>
          </div>

          {/* Score / VS */}
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
                  transition: "color 0.3s",
                }}>{match.home_score ?? 0}</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.2rem,4vw,2rem)", lineHeight: 1,
                  color: textMuted,
                  transition: "color 0.3s",
                }}>–</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.8rem,7vw,3rem)", lineHeight: 1,
                  color: isLive ? liveGreen : textPrimary,
                  fontVariantNumeric: "tabular-nums",
                  transition: "color 0.3s",
                }}>{match.away_score ?? 0}</span>
              </div>
            ) : (
              <span style={{
                fontFamily: FONT.display, fontWeight: 900,
                color: textPrimary, fontSize: "clamp(1.4rem,6vw,2.4rem)", lineHeight: 1,
                transition: "color 0.3s",
              }}>{match.match_time?.slice(0, 5)}</span>
            )}
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: "0.14em",
              textTransform: "uppercase", fontFamily: FONT.body,
              color: isLive ? liveGreen : textSecondary, marginTop: 4,
              transition: "color 0.3s",
            }}>
              {isLive ? "En direct" : isDone ? "Terminé" : "Coup d'envoi"}
            </span>
          </div>

          {/* Away */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Flag code={getCode(match.away_team)} alt={match.away_team} size={44} />
            <span style={{
              fontFamily: FONT.display, fontSize: "clamp(0.75rem,3.5vw,1.05rem)",
              fontWeight: 900, letterSpacing: "0.06em",
              color: textPrimary, textAlign: "center", textTransform: "uppercase",
              transition: "color 0.3s",
            }}>{match.away_team}</span>
          </div>
        </div>

        {/* Footer */}
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
            transition: "color 0.3s",
          }}>
            <FiMapPin size={9} /> {match.venue}, {match.city}
          </span>
          <a href="/tickets" style={{
            display: "flex", alignItems: "center", gap: 6,
            background: accent, color: accentContrast,
            fontFamily: FONT.body, fontSize: 9, fontWeight: 900,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "7px 14px", borderRadius: 100, textDecoration: "none",
            transition: "background 0.3s, color 0.3s", whiteSpace: "nowrap",
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
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const cardHover     = darkMode ? "rgba(255,255,255,0.06)"   : "#f2f2f2";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "#ececec";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "#444444";
  const textMuted     = darkMode ? "rgba(255,255,255,0.32)"   : "#aaaaaa";
  const liveGreen     = "#22c55e";
  const liveGreenDark = "#16a34a";
  const liveRowHover  = darkMode ? "rgba(34,197,94,0.08)"     : "rgba(34,197,94,0.05)";
  const liveRowBg     = darkMode ? "rgba(34,197,94,0.04)"     : "rgba(34,197,94,0.025)";

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
        ? (isLive ? liveRowHover : cardHover)
        : (isLive ? liveRowBg : card),
      cursor: "pointer", transition: "background 0.3s, border-color 0.3s", gap: 6,
    }} {...hoverProps}>

      {/* Date */}
      <div style={{ width: 44, flexShrink: 0 }}>
        {isLive
          ? <span style={{
              display: "flex", alignItems: "center", gap: 3,
              fontSize: 8, fontWeight: 900, color: liveGreenDark,
              textTransform: "uppercase", fontFamily: FONT.body, letterSpacing: "0.1em",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: liveGreen, flexShrink: 0, animation: "mpulse 1.4s ease-in-out infinite" }} />
              Live
            </span>
          : <span style={{
              fontSize: 10, color: textSecondary, fontFamily: FONT.body, fontWeight: 700,
              transition: "color 0.3s",
            }}>{date}</span>
        }
      </div>

      {/* Home */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", minWidth: 0 }}>
        <span style={{
          fontSize: "clamp(10px,2.5vw,12px)", fontWeight: 700, color: textPrimary,
          fontFamily: FONT.body, overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap",
          transition: "color 0.3s",
        }}>{m.home_team}</span>
        <Flag code={getCode(m.home_team)} alt={m.home_team} size={16} />
      </div>

      {/* Score */}
      <div style={{ flexShrink: 0, width: 50, textAlign: "center" }}>
        {isDone || isLive
          ? <span style={{
              fontFamily: FONT.display, fontWeight: 900,
              fontSize: "clamp(0.9rem,3vw,1.05rem)", color: isLive ? liveGreenDark : textPrimary,
              fontVariantNumeric: "tabular-nums",
              transition: "color 0.3s",
            }}>{m.home_score ?? 0}–{m.away_score ?? 0}</span>
          : <span style={{
              fontFamily: FONT.body, fontWeight: 800,
              fontSize: "clamp(10px,2.5vw,12px)", color: textSecondary,
              transition: "color 0.3s",
            }}>{m.match_time?.slice(0, 5)}</span>
        }
      </div>

      {/* Away */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
        <Flag code={getCode(m.away_team)} alt={m.away_team} size={16} />
        <span style={{
          fontSize: "clamp(10px,2.5vw,12px)", fontWeight: 700, color: textPrimary,
          fontFamily: FONT.body, overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap",
          transition: "color 0.3s",
        }}>{m.away_team}</span>
      </div>

      <FiChevronRight size={11} color={hovered ? textPrimary : textMuted} style={{ flexShrink: 0, transition: "color 0.3s" }} />
    </div>
  );
}

function TopScorers() {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const surface       = darkMode ? "#171717"                  : "#eeeeee";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const borderSub     = darkMode ? "rgba(255,255,255,0.06)"   : "#ececec";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "#555555";
  const textMuted     = darkMode ? "rgba(255,255,255,0.32)"   : "#aaaaaa";
  const hover         = darkMode ? "rgba(255,255,255,0.06)"   : "#f2f2f2";
  const headerBg      = darkMode ? "#1c1c1c"                  : "#0d0d0d";
  const headerText    = darkMode ? "#ffffff"                   : "#ffffff";
  const headerLink    = darkMode ? "rgba(255,255,255,0.5)"    : "rgba(255,255,255,0.5)";

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
          color: headerText, fontSize: 9, fontWeight: 900,
          letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: FONT.body,
          transition: "color 0.3s",
        }}>Meilleurs Buteurs</span>
        <a href="/standings" style={{
          display: "flex", alignItems: "center", gap: 3,
          color: headerLink, fontSize: 8, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em",
          textDecoration: "none", fontFamily: FONT.body, transition: "color 0.3s",
        }}
          onMouseOver={e => e.currentTarget.style.color = headerText}
          onMouseOut={e => e.currentTarget.style.color = headerLink}
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
            transition: "background 0.3s, border-color 0.3s", cursor: "pointer",
          }} {...hoverProps}>
            <span style={{
              fontSize: 10, fontWeight: 900, color: textMuted,
              width: 14, textAlign: "center", fontFamily: FONT.body, flexShrink: 0,
              transition: "color 0.3s",
            }}>{i + 1}</span>
            <Flag code={p.code} alt={p.team} size={16} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 12, fontWeight: 700, color: textPrimary,
                fontFamily: FONT.body, overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0,
                transition: "color 0.3s",
              }}>{p.player}</p>
              <p style={{
                fontSize: 10, color: textSecondary, fontFamily: FONT.body, fontWeight: 600,
                margin: "2px 0 0", transition: "color 0.3s",
              }}>{p.team}</p>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, flexShrink: 0 }}>
              <span style={{
                fontFamily: FONT.display, fontWeight: 900,
                fontSize: "1.3rem", color: textPrimary, lineHeight: 1,
                transition: "color 0.3s",
              }}>{p.goals}</span>
              <span style={{
                fontSize: 8, color: textSecondary, textTransform: "uppercase",
                letterSpacing: "0.1em", fontWeight: 700, fontFamily: FONT.body,
                transition: "color 0.3s",
              }}>buts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FilterTab({ label, active, dot, icon: Icon, onClick }) {
  const { darkMode } = useTheme();
  const accent          = darkMode ? "#ffffff"                   : "#0d0d0d";
  const accentContrast  = darkMode ? "#0d0d0d"                   : "#ffffff";
  const card            = darkMode ? "#1c1c1c"                  : "#ffffff";
  const textPrimary     = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary   = darkMode ? "rgba(255,255,255,0.55)"   : "#444444";
  const border          = darkMode ? "rgba(255,255,255,0.12)"   : "#cccccc";
  const borderHover     = darkMode ? "rgba(255,255,255,0.32)"   : "#666666";
  const liveGreenBright = "#4ade80";
  const liveGreen       = "#22c55e";

  const [hovered, hoverProps] = useHover();
  return (
    <button onClick={onClick} style={{
      flexShrink: 0,
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
      padding: "8px 16px", borderRadius: 100,
      border: `1px solid ${active ? accent : hovered ? borderHover : border}`,
      background: active ? accent : card,
      color: active ? accentContrast : hovered ? textPrimary : textSecondary,
      cursor: "pointer", transition: "all 0.3s",
      fontFamily: FONT.body, outline: "none",
    }} {...hoverProps}>
      {dot
        ? <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: active ? liveGreenBright : liveGreen,
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
  const surface       = darkMode ? "#171717"                  : "#f5f5f5";
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const bg            = darkMode ? "#0d0d0d"                  : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const borderSub     = darkMode ? "rgba(255,255,255,0.06)"   : "#dddddd";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "#444444";
  const accent        = darkMode ? "#ffffff"                   : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                   : "#ffffff";
  const headerBg      = darkMode ? "#171717"                  : "#efefef";

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
          .ms-grid {
            grid-template-columns: 1fr;
          }
          .ms-right {
            position: static;
          }
        }
      `}</style>

      <section style={{
        background: surface, padding: "clamp(24px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(12px,4vw,24px)" }}>

          <SectionHead eyebrow="Calendrier" title="Matchs" action="Tous les matchs" href="/matches" />

          {/* Filters */}
          <div className="ms-filters">
            {FILTERS.map(f => (
              <FilterTab
                key={f.k} label={f.l} active={matchFilter === f.k}
                dot={f.dot} icon={f.icon}
                onClick={() => setMatchFilter(f.k)}
              />
            ))}
          </div>

          {/* Empty state */}
          {!allMatches.length ? (
            <div style={{
              background: card, border: `1px solid ${border}`,
              borderRadius: 4, padding: "48px 24px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              transition: "background 0.3s, border-color 0.3s",
            }}>
              <FiZap size={18} color={textSecondary} />
              <span style={{
                fontSize: 13, color: textSecondary, fontFamily: FONT.body, fontWeight: 600,
                transition: "color 0.3s",
              }}>
                Aucun match disponible.
              </span>
            </div>
          ) : (
            <div className="ms-grid">
              {/* Left col */}
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
                        transition: "color 0.3s",
                      }}>Autres matchs</span>
                    </div>
                    {restMatches.map(m => <MatchRow key={m.id} m={m} />)}
                  </div>
                )}
              </div>

              {/* Right col — scorers */}
              <div className="ms-right">
                <TopScorers />
              </div>
            </div>
          )}

          {/* CTA */}
          <a href="/matches" style={{
            marginTop: 16,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontSize: 9, fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase",
            color: textPrimary, border: `1px solid ${accent}`,
            padding: "13px 0", borderRadius: 100,
            textDecoration: "none", width: "100%",
            transition: "all 0.3s", fontFamily: FONT.body,
            background: "transparent",
          }}
            onMouseOver={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = accentContrast; }}
            onMouseOut={e  => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textPrimary; }}
          >
            Voir tous les matchs <FiArrowRight size={12} />
          </a>
        </div>
      </section>
    </>
  );
}
