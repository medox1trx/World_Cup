import { useState, useEffect } from "react";
import axios from "axios";
import { FONT, C, CODES, getCode } from "./Home/constants";
import { Flag } from "./Home/ui";
import { FiSearch, FiStar, FiAward, FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const API_BASE_URL = "http://localhost:8000/api/v1";

export default function Teams() {
  const { darkMode } = useTheme();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  
  const clampValue = (min, max) => `clamp(${min}px, ${(max/12.8).toFixed(2)}vw, ${max}px)`;
  
  const theme = {
    bg: darkMode ? "#080808" : "#f8f9fa",
    card: darkMode ? "#111111" : "#ffffff",
    text: darkMode ? "#ffffff" : "#0d0d0d",
    subText: darkMode ? "#888" : "#666",
    border: darkMode ? "rgba(255,255,255,0.08)" : "#eeeeee",
    accent: C.red,
    inputBg: darkMode ? "#1a1a1a" : "#f8f8f8",
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/teams`);
        setTeams(res.data);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
        setError("Impossible de charger les équipes.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.group_name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: theme.bg, color: theme.text }}>
        <div style={{ animation: "spin 1s linear infinite", border: `3px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: "50%", width: 40, height: 40 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: theme.bg, color: theme.text, padding: 40, textAlign: "center" }}>
        <FiAlertCircle size={48} color={theme.accent} style={{ marginBottom: 20 }} />
        <h2 style={{ fontFamily: FONT.display, fontSize: 32, marginBottom: 16 }}>Oups !</h2>
        <p style={{ color: theme.subText, maxWidth: 400 }}>{error}</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: 24, padding: "12px 24px", background: theme.accent, color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <FiRefreshCw /> Réessayer
        </button>
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
      paddingBottom: 100
    }}>
      <style>{`
        .teams-hero { padding: clamp(32px, 6vh, 100px) var(--section-pad-x); max-width: 1380px; margin: 0 auto; }
        .search-container { position: relative; max-width: 600px; margin: 0 auto; }
        .teams-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: clamp(12px, 2vw, 20px); }
        .team-card {
          background: ${theme.card}; borderRadius: 16px; overflow: hidden; border: 1px solid ${theme.border};
          box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: 0.3s;
        }
        .team-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
        .team-card-img {
          width: 100%;
          height: clamp(120px, 18vh, 180px);
          object-fit: cover;
          object-position: center top;
          display: block;
          background: ${darkMode ? "#1a1a1a" : "#f5f5f5"};
        }
        .team-card-badge { position: absolute; top: 10px; right: 10px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .team-card-body { padding: 14px !important; }
          .team-card-title { font-size: 18px !important; }
          .teams-hero { padding: 80px 10px 16px !important; }
          .teams-hero h1 { font-size: clamp(2rem, 8vw, 4rem) !important; }
          .search-container input { padding: 10px 14px 10px 36px !important; font-size: 13px !important; }
          .team-card-img { height: 140px !important; }
          .team-card-badge { top: 8px; right: 8px; }
        }
      `}</style>

      {/* HEADER SECTION - Matching Standings style but simplified */}
      <section style={{ 
        padding: "clamp(48px, 10vh, 100px) var(--section-pad-x) clamp(60px, 12vh, 80px)", 
        background: darkMode ? "#000" : `linear-gradient(135deg, ${C.black} 0%, #1a1a1a 100%)`,
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        marginBottom: 40
      }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 600, height: 600, background: `radial-gradient(circle, ${C.red}22 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ color: C.red, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 10, display: "block", marginBottom: 10 }}>FIFA World Cup 2030</span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2.2rem, 8vw, 5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 20 }}>Nations</h1>
          <p style={{ maxWidth: 600, margin: "0 auto 32px", fontSize: "clamp(14px, 1.5vw, 18px)", opacity: 0.8 }}>Découvrez les équipes qui s'affronteront pour le titre mondial.</p>
          
          <div className="search-container">
            <FiSearch style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} size={14} />
            <input 
              type="text" 
              placeholder="Rechercher une nation, un groupe..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 100,
                padding: "14px 18px 14px 42px",
                color: "#ffffff",
                fontSize: 14,
                width: "100%",
                outline: "none",
                fontFamily: FONT.body,
                transition: "0.2s",
                backdropFilter: "blur(10px)"
              }}
            />
          </div>
        </div>
      </section>
      
      <section className="teams-hero" style={{ paddingTop: 0 }}>
        <div className="teams-grid">
          {filteredTeams.map((t, i) => (
            <div key={t.id || i} className="team-card">
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img 
                  src={t.image_url || t.img} 
                  alt={t.name} 
                  className="team-card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ display: 'none', position: 'absolute', inset: 0, background: darkMode ? '#1a1a1a' : '#f0f0f0', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: darkMode ? '#333' : '#ddd', textTransform: 'uppercase' }}>{t.name.charAt(0)}</span>
                </div>
                <div className="team-card-badge">
                   <Flag code={t.code} size={20} />
                </div>
              </div>
              
              <div className="team-card-body" style={{ padding: "clamp(14px, 2.5vw, 24px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 className="team-card-title" style={{ fontFamily: FONT.display, fontSize: "clamp(18px, 3.5vw, 28px)", fontWeight: 900, textTransform: "uppercase", margin: 0, lineHeight: 1, color: theme.text }}>{t.name}</h3>
                    <span style={{ color: C.red, fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.group_name || t.group}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: theme.text }}>#{t.rank}</span>
                    <span style={{ display: "block", fontSize: 7, fontWeight: 800, color: theme.subText, textTransform: "uppercase" }}>FIFA Rank</span>
                  </div>
                </div>
                
                <div style={{ background: darkMode ? "rgba(255,255,255,0.02)" : "#fcfcfc", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                   <div style={{ width: 32, height: 32, borderRadius: "50%", background: theme.border, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <FiStar color={C.red} size={12} />
                   </div>
                   <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: theme.text, display: "block" }}>{t.key_player || t.player}</span>
                      <span style={{ fontSize: 8, color: theme.subText, fontWeight: 600 }}>Joueur clé</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTeams.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: theme.subText }}>Aucune équipe ne correspond à votre recherche.</p>
          </div>
        )}
      </section>
    </div>
  );
}