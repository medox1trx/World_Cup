import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FONT, C } from "./Home/constants";
import { Flag } from "./Home/ui";
import { useTheme } from "../context/ThemeContext";
import { Trophy, TrendingUp, Info, ChevronRight, LayoutGrid } from "lucide-react";

const API_BASE_URL = "http://localhost:8000/api/v1";

export default function Standings() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchStandings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/standings`);
        setGroups(res.data);
        if (res.data && res.data.length > 0) {
          setActiveGroup(res.data[0].name);
        }
      } catch (err) {
        console.error("Failed to fetch standings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
  }, []);

  if (loading) {
     return (
       <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--main-bg)" }}>
         <div style={{ animation: "spin 1s linear infinite", border: `3px solid var(--border-main)`, borderTop: `3px solid ${C.red}`, borderRadius: "50%", width: 40, height: 40 }} />
       </div>
     );
  }

  return (
    <div style={{ 
      fontFamily: "'Barlow', sans-serif", 
      background: "var(--main-bg)", 
      color: "var(--text-main)", 
      minHeight: "100vh", 
      opacity: mounted ? 1 : 0,
      transition: "background 0.3s, color 0.3s, opacity 0.4s",
      paddingBottom: 150
    }}>
      <style>{`
        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3vw,48px); }
        .pkg { 
          background: var(--card-bg); border-radius: 10px; overflow: hidden; border: 1px solid var(--border-main);
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .pkg-hover:hover { transform: translateY(-5px); border-color: var(--border-hover); box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
        
        .filter-tabs { 
          display: flex; gap: 8px; margin-bottom: 40px; overflow-x: auto; scrollbar-width: none;
        }
        .filter-btn {
          background: transparent; color: var(--text-muted); border: 1px solid var(--border-main);
          padding: 10px 22px; borderRadius: 100px; fontSize: 11px; fontWeight: 800; cursor: pointer;
          whiteSpace: nowrap; transition: all 0.2s;
          text-transform: uppercase; letter-spacing: 0.08em;
          font-family: 'Barlow', sans-serif;
        }
        .filter-btn.active { background: var(--btn-bg); color: var(--btn-text); border-color: var(--btn-bg); }
        .filter-btn:hover:not(.active) { border-color: var(--text-muted); color: var(--text-main); }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* HERO SECTION - MATCHING NEWS STYLE */}
      <section style={{ position: "relative", minHeight: "45vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(var(--text-muted) 0.5px,transparent 0.5px)`, opacity: 0.1, backgroundSize: "32px 32px", zIndex: 1 }} />
        <div style={{ 
          position: "absolute", inset: 0, 
          background: darkMode ? "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0) 100%)" : "linear-gradient(to top, #fdfdfd 0%, rgba(253,253,253,0) 100%)", 
          zIndex: 1 
        }} />
        
        <div className="hw" style={{ position: "relative", zIndex: 2, width: "100%", padding: "clamp(100px,12vh,150px) clamp(16px,3vw,48px) 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 36, background: "var(--border-hover)", flexShrink: 0 }} />
            <span style={{ color: "var(--text-muted)", fontSize: 10, fontWeight: 800, letterSpacing: "0.42em", textTransform: "uppercase" }}>Tableau Officiel</span>
          </div>
          
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(42px,8vw,90px)", fontWeight: 900, lineHeight: 0.85, textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
            CLASSEMENT <span style={{ color: "transparent", WebkitTextStroke: darkMode ? "1.5px rgba(255,255,255,0.6)" : "1.5px rgba(0,0,0,0.2)" }}>GROUPES</span>
          </h1>
        </div>
      </section>

      <main className="hw" style={{ position: "relative", marginTop: 40 }}>
        
        {/* TABS */}
        <div className="filter-tabs">
          {groups.map(g => (
            <button 
              key={g.name}
              onClick={() => setActiveGroup(g.name)}
              className={`filter-btn ${activeGroup === g.name ? 'active' : ''}`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* ACTIVE GROUP VIEW */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 60 }}>
          {groups.filter(g => g.name === activeGroup).map((g) => (
            <div key={g.name} style={{ animation: "fadeIn 0.5s ease" }}>
              
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, padding: "0 4px" }}>
                <div>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 48, fontWeight: 900, margin: 0, lineHeight: 1, textTransform: "uppercase" }}>{g.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, color: "var(--text-muted)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                     <Info size={14} color={C.red} /> Matches: 0/6
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <TrendingUp color={C.red} size={24} />
                </div>
              </div>

              <div className="pkg" style={{ overflowX: "auto" }}>
                <table style={{ minWidth: 600, width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "rgba(var(--text-main-rgb), 0.02)", borderBottom: `1px solid var(--border-main)` }}>
                      <th style={{ padding: "16px 20px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>Pos</th>
                      <th style={{ padding: "16px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: "var(--text-muted)" }}>J</th>
                      <th style={{ padding: "16px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: "var(--text-muted)" }}>G</th>
                      <th style={{ padding: "16px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: "var(--text-muted)" }}>N</th>
                      <th style={{ padding: "16px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: "var(--text-muted)" }}>P</th>
                      <th style={{ padding: "16px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: "var(--text-muted)" }}>BP</th>
                      <th style={{ padding: "16px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: "var(--text-muted)" }}>BC</th>
                      <th style={{ padding: "16px 8px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", textAlign: "center", color: "var(--accent-color)" }}>DIFF</th>
                      <th style={{ padding: "16px 20px", fontSize: 11, fontWeight: 900, textAlign: "center", color: "var(--text-main)", letterSpacing: "0.2em" }}>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.teams.map((t, j) => (
                      <tr key={j} style={{ 
                        borderBottom: j < g.teams.length - 1 ? `1px solid var(--border-main)` : "none", 
                        transition: "background 0.3s",
                        background: j < 2 ? "rgba(22, 163, 74, 0.04)" : "transparent",
                        cursor: "pointer"
                      }}
                      onClick={() => navigate(`/teams/${t.id}`)}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(var(--text-main-rgb), 0.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = j < 2 ? "rgba(22, 163, 74, 0.04)" : "transparent"}
                      >
                        <td style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                          <span style={{ fontSize: 18, fontWeight: 900, color: j < 2 ? "#16a34a" : "var(--text-muted)", fontFamily: "'Barlow Condensed', sans-serif" }}>{j + 1}</span>
                          <Flag code={t.code} size={28} style={{ width: 32, height: 20, borderRadius: 2, objectFit: "cover" }} />
                          <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text-main)", textTransform: "uppercase", letterSpacing: "0.02em" }}>{t.team}</span>
                        </td>
                        <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--text-muted)", fontWeight: 700 }}>{t.pld}</td>
                        <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--text-muted)" }}>{t.w}</td>
                        <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--text-muted)" }}>{t.d}</td>
                        <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--text-muted)" }}>{t.l}</td>
                        <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--text-muted)" }}>{t.gf}</td>
                        <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--text-muted)" }}>{t.ga}</td>
                        <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--text-main)", fontWeight: 800 }}>{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
                        <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--text-main)", fontWeight: 900, fontSize: 20 }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", gap: 24, marginTop: 24, padding: "0 4px", flexWrap: "wrap" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", color: "#16a34a" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: "#16a34a" }} /> QUALIFICATION
                 </div>
                 <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: "var(--border-main)" }} /> ÉLIMINÉ
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* GROUPS PREVIEW GRID */}
        <section style={{ marginTop: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
             <LayoutGrid size={20} color="var(--accent-color)" />
             <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, textTransform: "uppercase", margin: 0 }}>Groupes</h3>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {groups.map(g => (
              <div 
                key={g.name} 
                onClick={() => { setActiveGroup(g.name); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                className="pkg pkg-hover"
                style={{ 
                  padding: 24, 
                  cursor: "pointer",
                  opacity: activeGroup === g.name ? 1 : 0.6
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 900, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>{g.name}</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {g.teams.slice(0, 4).map((t, idx) => (
                    <div key={idx} style={{ flex: 1, height: 4, background: idx < 2 ? "#16a34a" : "var(--border-main)", borderRadius: 4 }} title={t.team} />
                  ))}
                </div>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 9, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>
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