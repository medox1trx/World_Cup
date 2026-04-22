import { useState, useEffect } from "react";
import axios from "axios";
import { FONT, C, CODES } from "./Home/constants";
import { Flag } from "./Home/ui";
import { useTheme } from "../context/ThemeContext";
import { Trophy, TrendingUp, Info, ChevronRight, LayoutGrid } from "lucide-react";

const API_BASE_URL = "http://localhost:8000/api/v1";

export default function Standings() {
  const { darkMode } = useTheme();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);

  const clampValue = (min, max) => `clamp(${min}px, ${(max/12.8).toFixed(2)}vw, ${max}px)`;

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        console.log("Fetching from:", `${API_BASE_URL}/standings`);
        const res = await axios.get(`${API_BASE_URL}/standings`);
        console.log("Standings Data Received:", res.data);
        setGroups(res.data);
        if (res.data && res.data.length > 0) {
          setActiveGroup(res.data[0].name);
        } else {
          console.warn("Standings array is empty.");
        }
      } catch (err) {
        console.error("Failed to fetch standings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
  }, []);

  const theme = {
    bg: darkMode ? "#080808" : "#f8f9fa",
    card: darkMode ? "#111111" : "#ffffff",
    text: darkMode ? "#ffffff" : "#0d0d0d",
    subText: darkMode ? "#888" : "#666",
    border: darkMode ? "rgba(255,255,255,0.08)" : "#eeeeee",
    accent: C.red,
    gradient: darkMode 
      ? "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)" 
      : "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)"
  };

  if (loading) {
     return (
       <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: theme.bg, color: theme.text }}>
         <div style={{ animation: "spin 1s linear infinite", border: `3px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: "50%", width: 40, height: 40 }} />
       </div>
     );
  }

  if (!groups || groups.length === 0) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: theme.bg, color: theme.text, padding: 40, textAlign: "center" }}>
        <h2 style={{ fontFamily: FONT.display, fontSize: 32, marginBottom: 16 }}>Aucune donnée disponible</h2>
        <p style={{ color: theme.subText, maxWidth: 400 }}>Les classements ne sont pas encore disponibles. Veuillez vérifier la connexion au serveur API.</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: 24, padding: "12px 24px", background: theme.accent, color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>Réessayer</button>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: FONT.body, 
      background: theme.bg, 
      color: theme.text, 
      minHeight: "100vh", 
      transition: "background 0.3s, color 0.3s",
      paddingBottom: 150
    }}>
      {/* HEADER SECTION */}
      <section style={{ 
        padding: "clamp(48px, 10vh, 100px) var(--section-pad-x) clamp(60px, 12vh, 140px)", 
        background: darkMode ? "#000" : `linear-gradient(135deg, ${C.black} 0%, #1a1a1a 100%)`,
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative elements */}
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 600, height: 600, background: `radial-gradient(circle, ${C.red}22 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 500, height: 500, background: `radial-gradient(circle, ${C.red}11 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(40px)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ 
            color: C.red, 
            fontWeight: 800, 
            letterSpacing: "0.4em", 
            textTransform: "uppercase", 
            fontSize: 10, 
            display: "block", 
            marginBottom: 16 
          }}>
            FIFA World Cup 2026 Official
          </span>
          <h1 style={{ 
            fontFamily: FONT.display, 
            fontSize: "clamp(2rem, 8vw, 6rem)", 
            fontWeight: 900, 
            textTransform: "uppercase", 
            lineHeight: 0.9, 
            margin: "0 0 20px" 
          }}>
            Classements <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>Live</span>
          </h1>
          <p style={{ 
            maxWidth: 600, 
            margin: "0 auto", 
            fontSize: "clamp(14px, 1.5vw, 18px)", 
            lineHeight: 1.5, 
            opacity: 0.8,
            fontWeight: 400
          }}>
            Suivez la bataille pour la gloire éternelle aux USA, au Mexique et au Canada. Les deux premiers de chaque groupe accèdent à l'histoire.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 1440, margin: "-80px auto 0", padding: "0 clamp(12px, 3vw, 32px)", position: "relative", zIndex: 10 }}>
        
        {/* TAB NAVIGATION FOR GROUPS */}
        <div style={{ 
          display: "flex", 
          gap: 6, 
          padding: 8, 
          background: theme.card, 
          borderRadius: 16, 
          boxShadow: darkMode ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.08)",
          marginBottom: clampValue(32, 48),
          overflowX: "auto",
          scrollbarWidth: "none",
          border: `1px solid ${theme.border}`
        }}>
          {groups.map(g => (
            <button 
              key={g.name}
              onClick={() => setActiveGroup(g.name)}
              style={{
                background: activeGroup === g.name ? theme.accent : "transparent",
                color: activeGroup === g.name ? "white" : theme.subText,
                border: "none",
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* ACTIVE GROUP VIEW */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 60 }}>
          {groups.filter(g => g.name === activeGroup).map((g) => (
            <div key={g.name} style={{ animation: "fadeIn 0.5s ease" }}>
              
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, padding: "0 8px" }}>
                <div>
                  <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(36px, 8vw, 64px)", fontWeight: 900, margin: 0, lineHeight: 1, textTransform: "uppercase" }}>{g.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, color: theme.subText, fontWeight: 600, fontSize: 11 }}>
                     <Info size={14} color={C.red} /> Matches: 0/6
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <TrendingUp color={theme.accent} size={24} />
                </div>
              </div>

              <div style={{ 
                background: theme.card, 
                borderRadius: 16, 
                overflowX: "auto", 
                border: `1px solid ${theme.border}`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                scrollbarWidth: "thin"
              }}>
                <table style={{ minWidth: 600, width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: darkMode ? "rgba(255,255,255,0.02)" : "#fafafa" }}>
                      <th style={{ padding: "14px 20px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: theme.subText }}>Pos</th>
                      <th style={{ padding: "14px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>J</th>
                      <th style={{ padding: "14px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>G</th>
                      <th style={{ padding: "14px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>N</th>
                      <th style={{ padding: "14px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>P</th>
                      <th style={{ padding: "14px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>BP</th>
                      <th style={{ padding: "14px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>BC</th>
                      <th style={{ padding: "14px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.accent }}>DIFF</th>
                      <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 900, textAlign: "center", color: theme.text, letterSpacing: "0.2em" }}>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.teams.map((t, j) => (
                      <tr key={j} style={{ 
                        borderTop: `1px solid ${theme.border}`, 
                        transition: "background 0.3s",
                        background: j < 2 ? (darkMode ? "rgba(22, 163, 74, 0.03)" : "rgba(22, 163, 74, 0.01)") : "transparent"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.03)" : "#f9f9f9"}
                      onMouseLeave={(e) => e.currentTarget.style.background = j < 2 ? (darkMode ? "rgba(22, 163, 74, 0.03)" : "rgba(22, 163, 74, 0.01)") : "transparent"}
                      >
                        <td style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                          <div style={{ position: "relative", width: 24 }}>
                            <span style={{ 
                              fontSize: 20, 
                              fontWeight: 900, 
                              color: j < 2 ? "#16a34a" : (darkMode ? "#333" : "#ccc"),
                              fontFamily: FONT.display,
                              fontStyle: "italic"
                            }}>
                              {j + 1}
                            </span>
                          </div>
                          <Flag code={t.code} size={32} style={{ width: 36, height: 24, borderRadius: 4, objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} />
                          <span style={{ fontSize: 14, fontWeight: 900, color: theme.text, textTransform: "uppercase", letterSpacing: "0.02em" }}>{t.team}</span>
                        </td>
                        <td style={{ padding: "18px 8px", textAlign: "center", color: theme.subText, fontWeight: 700 }}>{t.pld}</td>
                        <td style={{ padding: "18px 8px", textAlign: "center", color: theme.subText }}>{t.w}</td>
                        <td style={{ padding: "18px 8px", textAlign: "center", color: theme.subText }}>{t.d}</td>
                        <td style={{ padding: "18px 8px", textAlign: "center", color: theme.subText }}>{t.l}</td>
                        <td style={{ padding: "18px 8px", textAlign: "center", color: theme.subText }}>{t.gf}</td>
                        <td style={{ padding: "18px 8px", textAlign: "center", color: theme.subText }}>{t.ga}</td>
                        <td style={{ padding: "18px 8px", textAlign: "center", color: theme.text, fontWeight: 800 }}>{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
                        <td style={{ padding: "18px 20px", textAlign: "center", color: theme.text, fontWeight: 999, fontSize: 22, fontFamily: FONT.display }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* GROUP LEGEND */}
              <div className="standings-legend" style={{ display: "flex", gap: 24, marginTop: 24, padding: "0 32px", flexWrap: "wrap" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#16a34a" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 4, background: "#16a34a" }} /> QUALIFICATION 16ÈMES
                 </div>
                 <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: theme.subText }}>
                    <div style={{ width: 12, height: 12, borderRadius: 4, background: theme.border }} /> PHASE DE GROUPES
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* ALL GROUPS MINI GRID SECTION */}
        <section style={{ marginTop: clampValue(48, 100) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
             <LayoutGrid size={20} color={theme.accent} />
             <h3 style={{ fontFamily: FONT.display, fontSize: "clamp(18px, 4vw, 28px)", fontWeight: 900, textTransform: "uppercase", margin: 0 }}>Aperçu Global</h3>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: 16 }}>
            {groups.map(g => (
              <div 
                key={g.name} 
                onClick={() => { setActiveGroup(g.name); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                style={{ 
                  background: theme.card, 
                  padding: 20, 
                  borderRadius: 20, 
                  border: `1px solid ${theme.border}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: activeGroup === g.name ? 1 : 0.6
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.opacity = 1; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.opacity = activeGroup === g.name ? 1 : 0.6; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase" }}>{g.name}</span>
                  <ChevronRight size={16} color={theme.subText} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {g.teams.slice(0, 4).map((t, idx) => (
                    <div key={idx} style={{ flex: 1, height: 4, background: idx < 2 ? "#16a34a" : theme.border, borderRadius: 4 }} title={t.team} />
                  ))}
                </div>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", fontSize: 9, fontWeight: 800, color: theme.subText }}>
                  <span>{g.teams[0].team}</span>
                  <span>{g.teams[3].team}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        ::-webkit-scrollbar { width: 0px; height: 0px; }
        @media (max-width: 600px) {
          .standings-header h1 { font-size: clamp(2rem, 8vw, 4rem) !important; }
          .standings-header p { font-size: clamp(12px, 1.5vw, 16px) !important; padding: 0 16px; }
          .standings-legend { flex-direction: column; gap: 12px !important; align-items: flex-start; padding-left: 16px !important; }
          .standings-group-card { padding: 14px !important; }
        }
      `}</style>
    </div>
  );
}