import { FiChevronRight, FiGrid, FiMapPin, FiGlobe, FiTrendingUp } from "react-icons/fi";
import { FONT, GROUPS, HOST_CITIES } from "./constants";
import { Flag, SectionHead } from "./ui";
import { useTheme } from "../../context/ThemeContext";

// ─── GROUP TABLE ──────────────────────────────────────────────
function GroupTable({ group }) {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const surface       = darkMode ? "#171717"                  : "#f0f0f0";
  const bg            = darkMode ? "#0d0d0d"                  : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const borderSub     = darkMode ? "rgba(255,255,255,0.06)"   : "#f0f0f0";
  const colHeaderBg   = darkMode ? "#171717"                  : "#f0f0f0";
  const colHeaderBd   = darkMode ? "rgba(255,255,255,0.06)"   : "#dddddd";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "#555555";
  const textMuted     = darkMode ? "rgba(255,255,255,0.32)"   : "#bbbbbb";
  const hover         = darkMode ? "rgba(255,255,255,0.04)"   : "#f5f5f5";
  const headerBg      = darkMode ? "#1c1c1c"                  : "#0d0d0d";
  const headerText    = darkMode ? "#ffffff"                   : "#ffffff";
  const headerLink    = darkMode ? "rgba(255,255,255,0.3)"    : "rgba(255,255,255,0.3)";

  return (
    <div style={{
      border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>

      {/* Header */}
      <div style={{
        background: headerBg, padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s",
      }}>
        <span style={{
          color: headerText, fontSize: 10, fontWeight: 900, letterSpacing: "0.2em",
          textTransform: "uppercase", fontFamily: FONT.body, transition: "color 0.3s",
        }}>
          {group.name}
        </span>
        <a href="/standings" style={{
          display: "flex", alignItems: "center", gap: 4,
          color: headerLink, fontSize: 9, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em",
          textDecoration: "none", fontFamily: FONT.body, transition: "color 0.3s",
        }}
          onMouseOver={e => e.currentTarget.style.color = headerText}
          onMouseOut={e => e.currentTarget.style.color = headerLink}
        >
          Détails <FiChevronRight size={10}/>
        </a>
      </div>

      {/* Column headers */}
      <div style={{
        background: colHeaderBg, padding: "6px 12px",
        display: "grid", gap: 4, borderBottom: `1px solid ${colHeaderBd}`,
        gridTemplateColumns: "18px 1fr 24px 24px 28px",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        {["","Équipe","J","DG","Pts"].map((h, i) => (
          <span key={i} style={{
            fontSize: 9, fontWeight: 900, letterSpacing: "0.12em",
            textTransform: "uppercase", color: textSecondary, fontFamily: FONT.body,
            textAlign: i >= 2 ? "center" : "left",
            transition: "color 0.3s",
          }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {group.teams.map((r, i) => (
        <div key={i} style={{
          padding: "10px 12px",
          display: "grid", gap: 4, alignItems: "center",
          borderBottom: i < group.teams.length - 1 ? `1px solid ${borderSub}` : "none",
          background: card,
          gridTemplateColumns: "18px 1fr 24px 24px 28px",
          cursor: "pointer", transition: "background 0.3s, border-color 0.3s",
        }}
          onMouseOver={e => e.currentTarget.style.background = hover}
          onMouseOut={e => e.currentTarget.style.background = card}
        >
          <span style={{
            fontSize: 10, fontWeight: 900, fontFamily: FONT.body,
            color: textMuted, fontVariantNumeric: "tabular-nums",
            transition: "color 0.3s",
          }}>{r.pos}</span>

          <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
            <Flag code={r.code} alt={r.team} size={14}/>
            <span style={{
              fontSize: 11, fontWeight: 700, color: textPrimary, fontFamily: FONT.body,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              transition: "color 0.3s",
            }}>
              {r.team}
            </span>
          </div>

          {[r.pld, r.gd].map((val, j) => (
            <span key={j} style={{
              fontSize: 11, color: textSecondary, textAlign: "center",
              fontFamily: FONT.body, fontVariantNumeric: "tabular-nums",
              transition: "color 0.3s",
            }}>
              {val}
            </span>
          ))}
          <span style={{
            fontSize: 12, fontWeight: 900, color: textPrimary, textAlign: "center",
            fontFamily: FONT.body, transition: "color 0.3s",
          }}>
            {r.pts}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── STANDINGS SECTION ────────────────────────────────────────
export function StandingsSection() {
  const { darkMode } = useTheme();
  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const textPrimary  = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "#444444";
  const accent       = darkMode ? "#ffffff"                   : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.12)"   : "#cccccc";

  return (
    <>
      <style>{`
        .standings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        @media (max-width: 860px) {
          .standings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 540px) {
          .standings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section style={{
        background: bg, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(12px,4vw,24px)" }}>
          <SectionHead eyebrow="Classements" title="Groupes" action="Tous les groupes" href="/standings"/>

          <div className="standings-grid">
            {GROUPS.map((g, i) => <GroupTable key={i} group={g}/>)}
          </div>

          <a href="/standings" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "12px 0", borderRadius: 100,
            fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
            color: textSecondary, border: `1px solid ${border}`,
            textDecoration: "none", fontFamily: FONT.body,
            transition: "all 0.3s", background: "transparent",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = textPrimary; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = textSecondary; }}
          >
            <FiGrid size={12}/> Voir tous les groupes
          </a>
        </div>
      </section>
    </>
  );
}

// ─── CITIES SECTION ───────────────────────────────────────────
export function CitiesSection() {
  const { darkMode } = useTheme();
  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const textPrimary  = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";

  return (
    <>
      <style>{`
        .cities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .city-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 220px;
          border-radius: 4px;
          overflow: hidden;
          text-decoration: none;
        }
        .city-card img {
          opacity: 0.78;
          transition: opacity 0.4s;
          filter: ${darkMode ? "none" : "brightness(0.97)"};
        }
        .city-card:hover img { opacity: 0.92; }
        @media (max-width: 720px) {
          .cities-grid {
            grid-template-columns: 1fr;
          }
          .city-card {
            min-height: 160px;
          }
        }
      `}</style>

      <section style={{
        background: bg, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(12px,4vw,24px)" }}>
          <SectionHead eyebrow="Pays Hôtes" title="Pays Organisateurs" action="Explorer" href="/cities"/>

          <div className="cities-grid">
            {HOST_CITIES.map((c, i) => (
              <a key={i} href="/cities" className="city-card" style={{ background: c.bg }}>
                <img
                  src={`https://flagcdn.com/${c.code}.svg`} alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.78), transparent)",
                }}/>
                <div style={{ position: "relative", zIndex: 1, padding: "clamp(12px,3vw,20px)" }}>
                  <p style={{
                    color: textPrimary, fontFamily: FONT.display,
                    fontSize: "clamp(18px,4vw,26px)", fontWeight: 800,
                    letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1, margin: 0,
                    transition: "color 0.3s",
                  }}>{c.city}</p>
                  <p style={{
                    display: "flex", alignItems: "center", gap: 4,
                    color: textSecondary, fontSize: "clamp(9px,2vw,11px)",
                    fontWeight: 600, marginTop: 5, marginBottom: 0, fontFamily: FONT.body,
                    transition: "color 0.3s",
                  }}>
                    <FiGlobe size={9}/> {c.country}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
