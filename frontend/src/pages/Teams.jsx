import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTeams, getImageUrl } from "../services/api";
import { FONT, C } from "./Home/constants";
import { Flag, SectionHead } from "./Home/ui";
import { FiSearch, FiStar, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function Teams() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedConfed, setSelectedConfed] = useState("All");
  const [mounted, setMounted] = useState(false);
  const confederations = ["All", "UEFA", "CAF", "CONMEBOL", "CONCACAF", "AFC", "OFC"];

  useEffect(() => {
    setMounted(true);
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await getTeams();
        setTeams(data || []);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
        setError("Impossible de charger les équipes.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          (t.group?.name || "").toLowerCase().includes(search.toLowerCase());
    const matchesConfed = selectedConfed === "All" || t.confederation === selectedConfed;
    return matchesSearch && matchesConfed;
  });

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
        .teams-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
          gap: 24px;
        }
        .pkg { 
          background: var(--card-bg); border-radius: 10px; overflow: hidden; border: 1px solid var(--border-main);
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .pkg:hover { transform: translateY(-5px); border-color: var(--border-hover); box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
        .team-card-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .pkg:hover .team-card-img { transform: scale(1.05); }
        
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

        .search-wrap {
          max-width: 400px; position: relative; margin-bottom: 40px;
        }
        .search-input {
          width: 100%; padding: 12px 20px 12px 52px; border-radius: 100px;
          background: rgba(var(--text-main-rgb), 0.03); border: 1px solid var(--border-main);
          color: var(--text-main); font-family: 'Barlow', sans-serif; font-size: 14px; outline: none;
          transition: 0.3s;
        }
        .search-input:focus { border-color: var(--border-hover); }

        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
           .teams-grid { grid-template-columns: 1fr; }
        }
      `}</style>

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
            <span style={{ color: "var(--text-muted)", fontSize: 10, fontWeight: 800, letterSpacing: "0.42em", textTransform: "uppercase" }}>Hub Nations Officielles</span>
          </div>
          
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(42px,8vw,90px)", fontWeight: 900, lineHeight: 0.85, textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
            LES ÉQUIPES <span style={{ color: "transparent", WebkitTextStroke: darkMode ? "1.5px rgba(255,255,255,0.6)" : "1.5px rgba(0,0,0,0.2)" }}>MONDIALES</span>
          </h1>
        </div>
      </section>

      <main className="hw" style={{ position: "relative", marginTop: 40 }}>
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
          <div className="search-wrap">
            <FiSearch style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", zIndex: 1 }} size={16} />
            <input 
              className="search-input"
              type="text"
              placeholder="Rechercher une nation..."
              style={{ background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            {confederations.map(confed => (
              <button
                key={confed}
                className={`filter-btn ${selectedConfed === confed ? 'active' : ''}`}
                onClick={() => setSelectedConfed(confed)}
              >
                {confed === "All" ? "Toutes" : confed}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="teams-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: 380, borderRadius: 10, background: "var(--border-main)", animation: "pulse 1.5s infinite" }} />
            ))}
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <FiAlertCircle size={48} color={C.red} style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 24, fontWeight: 900 }}>{error}</h2>
            <button onClick={() => window.location.reload()} style={{ marginTop: 20, background: "var(--btn-bg)", color: "var(--btn-text)", padding: "12px 24px", borderRadius: 8, border: "none", fontWeight: 800, cursor: "pointer", textTransform: "uppercase", fontSize: 12 }}>Réessayer</button>
          </div>
        ) : (
          <>
            <div className="teams-grid">
              {filteredTeams.map((t) => (
                <div 
                  key={t.id} 
                  className="pkg" 
                  onClick={() => navigate(`/teams/${t.id}`)}
                  style={{ cursor: "pointer", position: "relative", textDecoration: "none", color: "var(--text-main)" }}
                >
                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <img
                      src={getImageUrl(t.hero_image || t.flag)}
                      alt={t.name}
                      className="team-card-img"
                      loading="lazy"
                      onError={(e) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23ccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23777'%3EFIFA World Cup 2026%3C/text%3E%3C/svg%3E"; }}
                    />
                    
                    <div style={{ 
                      position: "absolute", inset: 0,
                      background: darkMode ? "linear-gradient(to top, rgba(17,17,17,0.95) 0%, transparent 60%)" : "linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 60%)",
                      pointerEvents: "none"
                    }} />

                    <div style={{ 
                      position: "absolute", bottom: -15, right: 20, 
                      width: 44, height: 44, borderRadius: "50%", 
                      background: "var(--card-bg)", padding: 3, 
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 10, border: `1px solid var(--border-main)`
                    }}>
                      <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                         <Flag code={t.flag} size={44} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </div>
                  </div>

                  <div className="team-card-body" style={{ padding: "28px 24px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, textTransform: "uppercase", margin: 0, color: "var(--text-main)", letterSpacing: "0.01em", lineHeight: 1 }}>{t.name}</h3>
                        <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
                          <span style={{ color: "var(--accent-color)", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.group?.name || "TBD"}</span>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-muted)" }}></span>
                          <span style={{ color: "var(--text-muted)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.confederation}</span>
                        </div>
                      </div>
                      <div style={{ background: "rgba(var(--text-main-rgb), 0.05)", padding: "4px 10px", borderRadius: 4, border: `1px solid var(--border-main)` }}>
                        <span style={{ fontSize: 13, fontWeight: 900, color: "var(--text-main)" }}>#{t.world_ranking || 0}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
                        <FiStar color="var(--accent-color)" size={14} />
                        <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Vedette: <span style={{ color: "var(--text-main)" }}>{t.key_player || "Non défini"}</span></span>
                    </div>

                    <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6, color: "var(--text-main)", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Voir le profil <FiArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTeams.length === 0 && (
              <div style={{ textAlign: "center", padding: "100px 0" }}>
                <FiAlertCircle size={40} color="var(--text-muted)" style={{ marginBottom: 16, opacity: 0.3 }} />
                <p style={{ color: "var(--text-muted)", fontWeight: 700 }}>Aucune nation ne correspond à votre recherche.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}