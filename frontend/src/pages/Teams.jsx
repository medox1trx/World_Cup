import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTeams, getImageUrl } from "../services/api";
import { FONT, C } from "./Home/constants";
import { Flag, SectionHead } from "./Home/ui";
import { FiSearch, FiStar, FiAlertCircle, FiArrowRight, FiFilter } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function Teams() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedConfed, setSelectedConfed] = useState("All");

  const confederations = ["All", "UEFA", "CAF", "CONMEBOL", "CONCACAF", "AFC", "OFC"];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await getTeams();
        setTeams(data || []);
      } catch (err) {
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

  // THEME TOKENS (Match Fans.jsx)
  const tBg     = darkMode ? "#0a0a0a" : "#fdfdfd";
  const tText   = darkMode ? "white"   : "#0a0a0a";
  const tCardBg = darkMode ? "#111111" : "#f5f5f5";
  const tBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tSub    = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: tBg,
      color: tText,
      minHeight: "100vh",
      opacity: mounted ? 1 : 0,
      transition: "background 0.4s, color 0.4s, opacity 0.5s",
      paddingBottom: 120,
    }}>
      <style>{`
        .hw { max-width: 1500px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 80px); }
        .fz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          padding: 40px 0 100px;
        }
        .fz-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .fz-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background: ${tCardBg};
          border: 1px solid ${tBorder};
          margin-bottom: 16px;
          transition: border-color 0.3s ease;
        }
        .fz-card:hover .fz-img-wrap { border-color: ${tText}; }
        .fz-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .fz-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1;
          color: ${tText};
        }
        
        .search-wrap {
          max-width: 320px; position: relative;
          flex-grow: 1;
        }
        .search-input {
          width: 100%; padding: 0 16px 0 44px; border-radius: 100px;
          background: ${tCardBg}; border: 1px solid ${tBorder};
          color: ${tText}; font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none;
          height: 36px;
          transition: border-color 0.2s ease;
        }
        .search-input:focus { border-color: ${tText}; }
        .search-input::placeholder { color: ${tSub}; opacity: 0.6; }

        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1200px) {
           .fz-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
        }
        @media (max-width: 768px) {
           .fz-grid { grid-template-columns: 1fr; gap: 24px; }
           .search-wrap { max-width: 100%; margin-bottom: 20px; }
        }
      `}</style>

      <main className="hw" style={{ position: "relative", paddingTop: 100 }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 60 }}>
          Les Nations
        </h1>
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div style={{ position: "relative", flex: 1, minWidth: 280 }}>
            <FiSearch style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: tSub }} size={18} />
            <input 
              type="text"
              placeholder="Rechercher une nation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: 36,
                background: tBg,
                border: `1px solid ${tBorder}`,
                borderRadius: 100,
                padding: "0 20px 0 48px",
                fontSize: 13,
                fontWeight: 700,
                color: tText,
                outline: "none",
                transition: "border-color 0.3s"
              }}
            />
          </div>

          {/* FILTERS */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", paddingBottom: 6, scrollbarWidth: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 12px", background: darkMode ? "#1a1a1a" : "#f8f8f8", borderRadius: 100, border: `1px solid ${tBorder}`, fontSize: 9, fontWeight: 800, color: tSub, textTransform: "uppercase", whiteSpace: "nowrap" }}>
              <FiFilter size={14} /> FILTRER
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {confederations.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedConfed(c)}
                  style={{
                    background: selectedConfed === c ? (darkMode ? "white" : "#0d0d0d") : "transparent",
                    color: selectedConfed === c ? (darkMode ? "black" : "white") : tSub,
                    border: `1px solid ${selectedConfed === c ? (darkMode ? "white" : "#0d0d0d") : tBorder}`,
                    padding: "6px 14px",
                    borderRadius: 100,
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    fontFamily: "'Bebas Neue', sans-serif"
                  }}
                >
                  {c === "All" ? "TOUS" : c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="fz-grid" style={{ opacity: 0.5 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: "16/9", borderRadius: 16, background: tBorder, animation: "pulse 1.5s infinite" }} />
            ))}
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <FiAlertCircle size={48} color={darkMode ? "#ff4d4d" : "#dc2626"} style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif" }}>{error}</h2>
            <button onClick={() => window.location.reload()} style={{ marginTop: 20, background: tText, color: tBg, padding: "12px 28px", borderRadius: 100, border: "none", fontWeight: 900, cursor: "pointer", textTransform: "uppercase", fontSize: 13, fontFamily: "'Bebas Neue', sans-serif" }}>Réessayer</button>
          </div>
        ) : (
          <div className="fz-grid">
            {filteredTeams.map((t, idx) => (
              <div 
                key={t.id} 
                className="fz-card" 
                onClick={() => navigate(`/teams/${t.id}`)}
                style={{ 
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${idx * 0.04}s`,
                  opacity: 0
                }}
              >
                <div className="fz-img-wrap">
                  <img 
                    className="fz-img"
                    src={t.image_url ? getImageUrl(t.image_url) : `https://flagcdn.com/w1280/${t.flag?.toLowerCase()}.png`} 
                    alt={t.name}
                    onError={(e) => {
                      e.target.src = `https://flagcdn.com/w1280/${t.flag?.toLowerCase()}.png`;
                    }}
                  />
                </div>
                <h3 className="fz-name">{t.name}</h3>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredTeams.length === 0 && (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <FiAlertCircle size={40} color={tSub} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ color: tSub, fontWeight: 700 }}>Aucune nation ne correspond à votre recherche.</p>
          </div>
        )}
      </main>
    </div>
  );
}