import { FiChevronRight, FiGrid, FiMapPin, FiGlobe, FiArrowRight } from "react-icons/fi";
import { FONT, GROUPS, HOST_CITIES } from "./constants";
import { Flag, SectionHead } from "./ui";
import { useTheme } from "../../context/ThemeContext";

function GroupTable({ group }) {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c" : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderSub     = darkMode ? "rgba(255,255,255,0.06)" : "#f0f0f0";
  const colHeaderBg   = darkMode ? "#171717" : "#f5f5f5";
  const colHeaderBd   = darkMode ? "rgba(255,255,255,0.06)" : "#e8e8e8";
  const textPrimary   = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "#555555";
  const textMuted     = darkMode ? "rgba(255,255,255,0.32)" : "#aaaaaa";
  const hover         = darkMode ? "rgba(255,255,255,0.04)" : "#f8f8f8";
  const headerBg      = darkMode ? "#1c1c1c" : "#0d0d0d";

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
          color: "#ffffff", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em",
          textTransform: "uppercase", fontFamily: FONT.body,
        }}>
          {group.name}
        </span>
        <a href="/standings" style={{
          display: "flex", alignItems: "center", gap: 4,
          color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.12em",
          textDecoration: "none", fontFamily: FONT.body, transition: "color 0.25s",
        }}
          onMouseOver={e => e.currentTarget.style.color = "#ffffff"}
          onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
        >
          Détails <FiChevronRight size={10}/>
        </a>
      </div>

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

      {group.teams.map((r, i) => (
        <div key={i} style={{
          padding: "10px 12px",
          display: "grid", gap: 4, alignItems: "center",
          borderBottom: i < group.teams.length - 1 ? `1px solid ${borderSub}` : "none",
          background: card,
          gridTemplateColumns: "18px 1fr 24px 24px 28px",
          cursor: "pointer", transition: "background 0.25s, border-color 0.3s",
        }}
          onMouseOver={e => e.currentTarget.style.background = hover}
          onMouseOut={e => e.currentTarget.style.background = card}
        >
          <span style={{
            fontSize: 10, fontWeight: 900, fontFamily: FONT.body,
            color: textMuted, fontVariantNumeric: "tabular-nums",
          }}>{r.pos}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
            <Flag code={r.code} alt={r.team} size={14}/>
            <span style={{
              fontSize: 11, fontWeight: 700, color: textPrimary, fontFamily: FONT.body,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{r.team}</span>
          </div>
          {[r.pld, r.gd].map((val, j) => (
            <span key={j} style={{
              fontSize: 11, color: textSecondary, textAlign: "center",
              fontFamily: FONT.body, fontVariantNumeric: "tabular-nums",
            }}>{val}</span>
          ))}
          <span style={{
            fontSize: 12, fontWeight: 900, color: textPrimary, textAlign: "center",
            fontFamily: FONT.body,
          }}>{r.pts}</span>
        </div>
      ))}
    </div>
  );
}

export function StandingsSection() {
  const { darkMode } = useTheme();
  const bg          = darkMode ? "#0d0d0d" : "#ffffff";
  const accent      = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover = darkMode ? "#e8e8e8" : "#333333";

  return (
    <>
      <style>{`
        .standings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        @media (max-width: 860px) { .standings-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .standings-grid { grid-template-columns: 1fr; } }
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

          {/* CTA — always filled */}
          <a href="/standings" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "12px 0", borderRadius: 100,
            fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
            color: accentContrast, background: accent,
            textDecoration: "none", fontFamily: FONT.body,
            transition: "background 0.25s, transform 0.2s",
          }}
            onMouseOver={e => { e.currentTarget.style.background = accentHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={e => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <FiGrid size={12}/> Voir tous les groupes
          </a>
        </div>
      </section>
    </>
  );
}

export function CitiesSection() {
  const { darkMode } = useTheme();
  const bg          = darkMode ? "#0d0d0d" : "#ffffff";
  const textPrimary = darkMode ? "#ffffff" : "#ffffff";
  const textSecondary = darkMode ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.6)";

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
        .city-card img.city-flag { opacity: 0.75; transition: opacity 0.4s; }
        .city-card:hover img.city-flag { opacity: 0.9; }
        @media (max-width: 720px) {
          .cities-grid { grid-template-columns: 1fr; }
          .city-card { min-height: 160px; }
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
                  className="city-flag"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}/>
                <div style={{ position: "relative", zIndex: 1, padding: "clamp(12px,3vw,20px)" }}>
                  <p style={{
                    color: "#ffffff", fontFamily: FONT.display,
                    fontSize: "clamp(18px,4vw,26px)", fontWeight: 800,
                    letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1, margin: 0,
                  }}>{c.city}</p>
                  <p style={{
                    display: "flex", alignItems: "center", gap: 4,
                    color: "rgba(255,255,255,0.55)", fontSize: "clamp(9px,2vw,11px)",
                    fontWeight: 600, marginTop: 5, marginBottom: 0, fontFamily: FONT.body,
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