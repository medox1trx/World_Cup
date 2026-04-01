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
        padding: "100px 32px 140px", 
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
            fontSize: 12, 
            display: "block", 
            marginBottom: 24 
          }}>
            FIFA World Cup 2030 Official
          </span>
          <h1 style={{ 
            fontFamily: FONT.display, 
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)", 
            fontWeight: 900, 
            textTransform: "uppercase", 
            lineHeight: 0.85, 
            margin: "0 0 32px" 
          }}>
            Classements <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}>Live</span>
          </h1>
          <p style={{ 
            maxWidth: 700, 
            margin: "0 auto", 
            fontSize: 20, 
            lineHeight: 1.6, 
            opacity: 0.8,
            fontWeight: 400
          }}>
            Suivez la bataille pour la gloire éternelle au Maroc, en Espagne et au Portugal. Les deux premiers de chaque groupe accèdent à l'histoire.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 1440, margin: "-80px auto 0", padding: "0 32px", position: "relative", zIndex: 10 }}>
        
        {/* TAB NAVIGATION FOR GROUPS */}
        <div style={{ 
          display: "flex", 
          gap: 12, 
          padding: 12, 
          background: theme.card, 
          borderRadius: 24, 
          boxShadow: darkMode ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.08)",
          marginBottom: 60,
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
                padding: "14px 28px",
                borderRadius: 16,
                fontSize: 13,
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
              
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, padding: "0 10px" }}>
                <div>
                  <h2 style={{ fontFamily: FONT.display, fontSize: 64, fontWeight: 900, margin: 0, lineHeight: 1, textTransform: "uppercase" }}>{g.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, color: theme.subText, fontWeight: 600, fontSize: 13 }}>
                     <Info size={16} color={C.red} /> Matches terminés: 0/6
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <TrendingUp color={theme.accent} size={32} />
                </div>
              </div>

              <div style={{ 
                background: theme.card, 
                borderRadius: 40, 
                overflow: "hidden", 
                border: `1px solid ${theme.border}`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: darkMode ? "rgba(255,255,255,0.02)" : "#fafafa" }}>
                      <th style={{ padding: "24px 40px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: theme.subText }}>Positions</th>
                      <th style={{ padding: "24px 10px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>J</th>
                      <th style={{ padding: "24px 10px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>G</th>
                      <th style={{ padding: "24px 10px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>N</th>
                      <th style={{ padding: "24px 10px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>P</th>
                      <th style={{ padding: "24px 10px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>BP</th>
                      <th style={{ padding: "24px 10px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.subText }}>BC</th>
                      <th style={{ padding: "24px 10px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: theme.accent }}>DIFF</th>
                      <th style={{ padding: "24px 40px", fontSize: 12, fontWeight: 900, textAlign: "center", color: theme.text, letterSpacing: "0.2em" }}>PTS</th>
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
                        <td style={{ padding: "28px 40px", display: "flex", alignItems: "center", gap: 24 }}>
                          <div style={{ position: "relative" }}>
                            <span style={{ 
                              fontSize: 28, 
                              fontWeight: 900, 
                              color: j < 2 ? "#16a34a" : (darkMode ? "#333" : "#eee"),
                              fontFamily: FONT.display,
                              fontStyle: "italic"
                            }}>
                              {j + 1}
                            </span>
                            {j < 2 && (
                              <div style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", width: 4, height: 30, background: "#16a34a", borderRadius: 4 }} />
                            )}
                          </div>
                          <Flag code={t.code} size={50} style={{ width: 50, height: 32, borderRadius: 6, objectFit: "cover", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} />
                          <span style={{ fontSize: 20, fontWeight: 900, color: theme.text, textTransform: "uppercase", letterSpacing: "0.02em" }}>{t.team}</span>
                        </td>
                        <td style={{ padding: "28px 10px", textAlign: "center", color: theme.subText, fontWeight: 700 }}>{t.pld}</td>
                        <td style={{ padding: "28px 10px", textAlign: "center", color: theme.subText }}>{t.w}</td>
                        <td style={{ padding: "28px 10px", textAlign: "center", color: theme.subText }}>{t.d}</td>
                        <td style={{ padding: "28px 10px", textAlign: "center", color: theme.subText }}>{t.l}</td>
                        <td style={{ padding: "28px 10px", textAlign: "center", color: theme.subText }}>{t.gf}</td>
                        <td style={{ padding: "28px 10px", textAlign: "center", color: theme.subText }}>{t.ga}</td>
                        <td style={{ padding: "28px 10px", textAlign: "center", color: theme.text, fontWeight: 800 }}>{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
                        <td style={{ padding: "28px 40px", textAlign: "center", color: theme.text, fontWeight: 999, fontSize: 32, fontFamily: FONT.display }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* GROUP LEGEND */}
              <div style={{ display: "flex", gap: 32, marginTop: 32, padding: "0 40px" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: "#16a34a" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 4, background: "#16a34a" }} /> QUALIFICATION 16ÈMES
                 </div>
                 <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", color: theme.subText }}>
                    <div style={{ width: 12, height: 12, borderRadius: 4, background: theme.border }} /> PHASE DE GROUPES
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* ALL GROUPS MINI GRID SECTION */}
        <section style={{ marginTop: 120 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
             <LayoutGrid size={32} color={theme.accent} />
             <h3 style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 900, textTransform: "uppercase", margin: 0 }}>Aperçu Global</h3>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {groups.map(g => (
              <div 
                key={g.name} 
                onClick={() => { setActiveGroup(g.name); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                style={{ 
                  background: theme.card, 
                  padding: 24, 
                  borderRadius: 24, 
                  border: `1px solid ${theme.border}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: activeGroup === g.name ? 1 : 0.6
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.opacity = 1; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.opacity = activeGroup === g.name ? 1 : 0.6; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 900, textTransform: "uppercase" }}>{g.name}</span>
                  <ChevronRight size={18} color={theme.subText} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {g.teams.slice(0, 4).map((t, idx) => (
                    <div key={idx} style={{ flex: 1, height: 6, background: idx < 2 ? "#16a34a" : theme.border, borderRadius: 4 }} title={t.team} />
                  ))}
                </div>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 800, color: theme.subText }}>
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
      `}</style>
    </div>
  );
}