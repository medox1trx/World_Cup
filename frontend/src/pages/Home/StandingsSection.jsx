import { FiChevronRight, FiGrid, FiMapPin, FiGlobe, FiArrowRight } from "react-icons/fi";
import { FONT, GROUPS, HOST_CITIES, getCode } from "./constants";
import { Flag, SectionHead, Spinner } from "./ui";
import { useTheme } from "../../context/ThemeContext";
import { useGroups, usePays } from "../../hooks/useWorldCup";

function GroupTable({ group, hideDetails = false }) {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c" : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderSub     = darkMode ? "rgba(255,255,255,0.06)" : "#f0f0f0";
  const colHeaderBg   = darkMode ? "#171717" : "#f5f5f5";
  const colHeaderBd   = darkMode ? "rgba(255,255,255,0.06)" : "#e8e8e8";
  const textPrimary   = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.85)" : "#555555";
  const textMuted     = darkMode ? "rgba(255,255,255,0.6)" : "#aaaaaa";
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
        {!hideDetails && (
          <a href="/standings" style={{
            display: "flex", alignItems: "center", gap: 4,
            color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.12em",
            textDecoration: "none", fontFamily: FONT.body, transition: "color 0.25s",
          }}
            onMouseOver={e => e.currentTarget.style.color = "#ffffff"}
            onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
          >
            Détails <FiChevronRight size={13}/>
          </a>
        )}
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

export default function StandingsSection({ hideHeader = false, hideDetails = false }) {
  const { darkMode } = useTheme();
  const bg = darkMode ? "#0d0d0d" : "#ffffff";
  const accent = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover = darkMode ? "#e8e8e8" : "#333333";
  
  const { data: groupsData, loading } = useGroups();
  
  const groups = (groupsData && groupsData.length > 0) 
    ? groupsData.map(g => ({
        name: g.name,
        teams: (g.teams || []).map((t, idx) => ({
          pos: idx + 1,
          team: t.name,
          code: getCode(t),
          pld: "0", gd: "0", pts: "0"
        }))
      })).slice(0, 12)
    : GROUPS.slice(0, 12);

  return (
    <section style={{ 
      background: bg, padding: "clamp(48px,8vw,80px) 0",
      transition: "background 0.3s",
    }}>
      <div className="layout-container">
        {!hideHeader && <SectionHead title="Phase de Groupes" action="Tout voir" href="/standings"/>}
        
        {loading ? (
          <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
          </div>
        ) : (
          <>
            <div style={{
              display: "grid", gap: "clamp(16px,3vw,24px)",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              marginBottom: 32
            }}>
              {groups.map((g, i) => (
                <GroupTable key={i} group={g} hideDetails={hideDetails} />
              ))}
            </div>

          </>
        )}
      </div>
    </section>
  );
}

export function CitiesSection() {
  const { darkMode } = useTheme();
  const bg          = darkMode ? "#0d0d0d" : "#ffffff";
  const textPrimary = darkMode ? "#ffffff" : "#ffffff";
  const textSecondary = darkMode ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.6)";

  const { data: pays, loading: paysLoading } = usePays();
  // Filter for the 3 host countries, fallback to static if not found or still loading
  const displayHosts = pays?.length > 0 
    ? pays.filter(p => ['US', 'CA', 'MX', 'USA', 'CAN', 'MEX', 'États-Unis', 'Canada', 'Mexique'].includes(p.name) || ['US', 'CA', 'MX'].includes(p.code?.toUpperCase()))
    : [];

  // If the DB filter yields empty but we have data, just take the first 3 (in case names vary)
  const finalHosts = displayHosts.length >= 3 ? displayHosts.slice(0, 3) : (pays || []).slice(0, 3);

  return (
    <>
      <style>{`
        .hosts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .host-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 260px;
          border-radius: 4px;
          overflow: hidden;
          text-decoration: none;
        }
        .host-card img.host-bg { transition: transform 0.6s, opacity 0.4s; opacity: 0.6; }
        .host-card:hover img.host-bg { transform: scale(1.05); opacity: 0.8; }
        @media (max-width: 960px) {
          .hosts-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .hosts-grid { grid-template-columns: 1fr; }
          .host-card { min-height: 200px; }
        }
        /* ── RESET VISITED LINKS ── */
        a, a:visited {
          color: inherit;
          text-decoration: none !important;
        }
      `}</style>

      <section style={{
        background: bg, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div className="layout-container">
          <SectionHead title="Pays Organisateurs" action="Explorer" href="/cities"/>

          <div className="hosts-grid">
            {paysLoading ? (
               Array.from({ length: 3 }).map((_, i) => (
                 <div key={i} style={{ height: 260, borderRadius: 4, background: darkMode ? "#1c1c1c" : "#f5f5f5" }} />
               ))
            ) : (
              finalHosts.map((h, i) => (
                <a key={i} href="/cities" className="host-card" style={{ background: "#111" }}>
                  <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                     <img 
                       className="host-bg"
                       src={h.flag_url ? h.flag_url : `https://flagcdn.com/w1280/${(h.code || '').toLowerCase()}.png`} 
                       alt={h.name} 
                       style={{ width: "100%", height: "100%", objectFit: "cover" }}
                       onError={(e) => {
                         // Fallbacks if flagcdn fails for some reason
                         if (h.name.includes('Canada')) e.target.src = "https://flagcdn.com/w1280/ca.png";
                         else if (h.name.includes('Mex')) e.target.src = "https://flagcdn.com/w1280/mx.png";
                         else e.target.src = "https://flagcdn.com/w1280/us.png";
                       }}
                     />
                  </div>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  }}/>
                  <div style={{ position: "relative", zIndex: 1, padding: "clamp(16px,4vw,24px)", display: "flex", alignItems: "center", gap: 12 }}>
                    <div>
                        <p style={{
                        color: "#ffffff", fontFamily: FONT.display,
                        fontSize: "clamp(22px,5vw,32px)", fontWeight: 800,
                        letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1, margin: 0,
                        }}>{h.name}</p>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}