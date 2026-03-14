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
      padding: "4px 10px", background: "#111", borderRadius: 2,
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
  const [hovered, hoverProps] = useHover();
  if (!match) return null;

  const isLive = match.status === "live";
  const isDone = match.status === "finished";
  const dateStr = new Date(match.match_date + "T00:00:00")
    .toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div style={{
      background: "white",
      border: `1px solid ${isLive ? "rgba(34,197,94,0.4)" : hovered ? "#999" : C.border}`,
      borderRadius: 4, overflow: "hidden",
      transition: "border-color 0.2s, box-shadow 0.25s",
      boxShadow: hovered && !isLive ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
    }} {...hoverProps}>

      {/* Header bar */}
      <div style={{
        padding: "10px 16px",
        background: isLive ? "#0a0a0a" : "#efefef",
        borderBottom: `1px solid ${isLive ? "rgba(255,255,255,0.08)" : "#ddd"}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isLive
            ? <LiveBadge minute={match.minute} />
            : <span style={{
                fontSize: 9, fontWeight: 900, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#444", fontFamily: FONT.body,
              }}>
                {STAGE_LABEL[match.stage] || "Groupe"}{match.group_name ? ` · ${match.group_name}` : ""}
              </span>
          }
        </div>
        {!isLive && (
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, color: "#444", fontFamily: FONT.body, fontWeight: 600,
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
              color: C.black, textAlign: "center", textTransform: "uppercase",
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
                  color: isLive ? "#22c55e" : C.black,
                  fontVariantNumeric: "tabular-nums",
                }}>{match.home_score ?? 0}</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.2rem,4vw,2rem)", lineHeight: 1,
                  color: "rgba(0,0,0,0.2)",
                }}>–</span>
                <span style={{
                  fontFamily: FONT.display, fontWeight: 900,
                  fontSize: "clamp(1.8rem,7vw,3rem)", lineHeight: 1,
                  color: isLive ? "#22c55e" : C.black,
                  fontVariantNumeric: "tabular-nums",
                }}>{match.away_score ?? 0}</span>
              </div>
            ) : (
              <span style={{
                fontFamily: FONT.display, fontWeight: 900,
                color: C.black, fontSize: "clamp(1.4rem,6vw,2.4rem)", lineHeight: 1,
              }}>{match.match_time?.slice(0, 5)}</span>
            )}
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: "0.14em",
              textTransform: "uppercase", fontFamily: FONT.body,
              color: isLive ? "#22c55e" : "#555", marginTop: 4,
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
              color: C.black, textAlign: "center", textTransform: "uppercase",
            }}>{match.away_team}</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 18, paddingTop: 14,
          borderTop: `1px solid #e8e8e8`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 8, flexWrap: "wrap",
        }}>
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, color: "#555", fontFamily: FONT.body, fontWeight: 600,
          }}>
            <FiMapPin size={9} /> {match.venue}, {match.city}
          </span>
          <a href="/tickets" style={{
            display: "flex", alignItems: "center", gap: 6,
            background: C.black, color: "white",
            fontFamily: FONT.body, fontSize: 9, fontWeight: 900,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "7px 14px", borderRadius: 100, textDecoration: "none",
            transition: "background 0.15s", whiteSpace: "nowrap",
          }}
            onMouseOver={e => e.currentTarget.style.background = "#333"}
            onMouseOut={e => e.currentTarget.style.background = C.black}
          >
            <FiShoppingCart size={9} /> Billets
          </a>
        </div>
      </div>
    </div>
  );
}

function MatchRow({ m }) {
  const [hovered, hoverProps] = useHover();
  const isLive = m.status === "live";
  const isDone = m.status === "finished";
  const date = new Date(m.match_date + "T00:00:00")
    .toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "10px 12px",
      borderBottom: `1px solid #ececec`,
      background: hovered
        ? (isLive ? "rgba(34,197,94,0.05)" : "#f2f2f2")
        : (isLive ? "rgba(34,197,94,0.025)" : "white"),
      cursor: "pointer", transition: "background 0.15s", gap: 6,
    }} {...hoverProps}>

      {/* Date */}
      <div style={{ width: 44, flexShrink: 0 }}>
        {isLive
          ? <span style={{
              display: "flex", alignItems: "center", gap: 3,
              fontSize: 8, fontWeight: 900, color: "#16a34a",
              textTransform: "uppercase", fontFamily: FONT.body, letterSpacing: "0.1em",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", flexShrink: 0, animation: "mpulse 1.4s ease-in-out infinite" }} />
              Live
            </span>
          : <span style={{ fontSize: 10, color: "#444", fontFamily: FONT.body, fontWeight: 700 }}>{date}</span>
        }
      </div>

      {/* Home */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", minWidth: 0 }}>
        <span style={{
          fontSize: "clamp(10px,2.5vw,12px)", fontWeight: 700, color: C.black,
          fontFamily: FONT.body, overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{m.home_team}</span>
        <Flag code={getCode(m.home_team)} alt={m.home_team} size={16} />
      </div>

      {/* Score */}
      <div style={{ flexShrink: 0, width: 50, textAlign: "center" }}>
        {isDone || isLive
          ? <span style={{
              fontFamily: FONT.display, fontWeight: 900,
              fontSize: "clamp(0.9rem,3vw,1.05rem)", color: isLive ? "#16a34a" : C.black,
              fontVariantNumeric: "tabular-nums",
            }}>{m.home_score ?? 0}–{m.away_score ?? 0}</span>
          : <span style={{
              fontFamily: FONT.body, fontWeight: 800,
              fontSize: "clamp(10px,2.5vw,12px)", color: "#333",
            }}>{m.match_time?.slice(0, 5)}</span>
        }
      </div>

      {/* Away */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
        <Flag code={getCode(m.away_team)} alt={m.away_team} size={16} />
        <span style={{
          fontSize: "clamp(10px,2.5vw,12px)", fontWeight: 700, color: C.black,
          fontFamily: FONT.body, overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{m.away_team}</span>
      </div>

      <FiChevronRight size={11} color={hovered ? C.black : "#aaa"} style={{ flexShrink: 0 }} />
    </div>
  );
}

function TopScorers() {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden" }}>
      <div style={{
        background: C.black, padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          color: "white", fontSize: 9, fontWeight: 900,
          letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: FONT.body,
        }}>Meilleurs Buteurs</span>
        <a href="/standings" style={{
          display: "flex", alignItems: "center", gap: 3,
          color: "rgba(255,255,255,0.5)", fontSize: 8, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em",
          textDecoration: "none", fontFamily: FONT.body, transition: "color 0.15s",
        }}
          onMouseOver={e => e.currentTarget.style.color = "white"}
          onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
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
            borderBottom: i < TOP_SCORERS.length - 1 ? `1px solid #ececec` : "none",
            background: hovered ? "#f2f2f2" : "white",
            transition: "background 0.15s", cursor: "pointer",
          }} {...hoverProps}>
            <span style={{
              fontSize: 10, fontWeight: 900, color: "#aaa",
              width: 14, textAlign: "center", fontFamily: FONT.body, flexShrink: 0,
            }}>{i + 1}</span>
            <Flag code={p.code} alt={p.team} size={16} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 12, fontWeight: 700, color: C.black,
                fontFamily: FONT.body, overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0,
              }}>{p.player}</p>
              <p style={{ fontSize: 10, color: "#555", fontFamily: FONT.body, fontWeight: 600, margin: "2px 0 0" }}>{p.team}</p>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, flexShrink: 0 }}>
              <span style={{
                fontFamily: FONT.display, fontWeight: 900,
                fontSize: "1.3rem", color: C.black, lineHeight: 1,
              }}>{p.goals}</span>
              <span style={{
                fontSize: 8, color: "#555", textTransform: "uppercase",
                letterSpacing: "0.1em", fontWeight: 700, fontFamily: FONT.body,
              }}>buts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FilterTab({ label, active, dot, icon: Icon, onClick }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button onClick={onClick} style={{
      flexShrink: 0,
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
      padding: "8px 16px", borderRadius: 100,
      border: `1px solid ${active ? C.black : hovered ? "#666" : "#ccc"}`,
      background: active ? C.black : "white",
      color: active ? "white" : hovered ? C.black : "#444",
      cursor: "pointer", transition: "all 0.15s",
      fontFamily: FONT.body, outline: "none",
    }} {...hoverProps}>
      {dot
        ? <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: active ? "#4ade80" : "#22c55e",
            animation: "mpulse 1.4s ease-in-out infinite",
          }} />
        : Icon && <Icon size={10} />
      }
      {label}
    </button>
  );
}

export function MatchesSection({ matchFilter, setMatchFilter }) {
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

      <section style={{ background: C.gray, padding: "clamp(24px,5vw,48px) 0" }}>
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
              background: "white", border: `1px solid ${C.border}`,
              borderRadius: 4, padding: "48px 24px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            }}>
              <FiZap size={18} color="#555" />
              <span style={{ fontSize: 13, color: "#444", fontFamily: FONT.body, fontWeight: 600 }}>
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
                    background: "white", border: `1px solid ${C.border}`,
                    borderRadius: 4, overflow: "hidden",
                  }}>
                    <div style={{
                      padding: "9px 14px", background: "#efefef",
                      borderBottom: "1px solid #ddd",
                    }}>
                      <span style={{
                        fontSize: 9, fontWeight: 900, letterSpacing: "0.2em",
                        textTransform: "uppercase", color: "#444", fontFamily: FONT.body,
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
            color: C.black, border: `1px solid ${C.black}`,
            padding: "13px 0", borderRadius: 100,
            textDecoration: "none", width: "100%",
            transition: "all 0.15s", fontFamily: FONT.body,
            background: "transparent",
          }}
            onMouseOver={e => { e.currentTarget.style.background = C.black; e.currentTarget.style.color = "white"; }}
            onMouseOut={e  => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.black; }}
          >
            Voir tous les matchs <FiArrowRight size={12} />
          </a>
        </div>
      </section>
    </>
  );
}