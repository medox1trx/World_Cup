import { useState, useEffect } from "react";
import { getStadiums, getImageUrl } from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { FiSearch } from "react-icons/fi";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Stadiums() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getStadiums()
      .then(data => {
        const results = Array.isArray(data) ? data : (data.data || []);
        setStadiums(results);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredStadiums = stadiums.filter(s => {
    const query = searchQuery.toLowerCase();
    const nameMatch = s.name?.toLowerCase().includes(query);
    const cityMatch = s.city?.name?.toLowerCase().includes(query);
    return nameMatch || cityMatch;
  });

  const tBg     = darkMode ? "#0a0a0a" : "#fdfdfd";
  const tText   = darkMode ? "white"   : "#0a0a0a";
  const tCardBg = darkMode ? "#111111" : "#f5f5f5";
  const tBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tSub    = darkMode ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.45)";

  return (
    <div style={{
      fontFamily: B,
      background: tBg,
      color: tText,
      opacity: mounted ? 1 : 0,
      transition: "background-color 0.4s, color 0.4s, opacity 0.45s",
      minHeight: "100vh",
      paddingTop: 60,
    }}>
      <style>{`
        .hw { max-width: 1500px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 80px); }
        .fz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 40px;
          padding: 60px 0 120px;
        }
        .fz-card {
          display: flex;
          flex-direction: column;
        }
        .fz-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .fz-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .fz-name {
          font-family: ${D};
          font-size: 24px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1;
          color: ${tText};
        }
        
        .fz-desc {
          font-family: ${B};
          font-size: 14px;
          color: ${tSub};
          margin: 12px 0 24px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .fz-btn {
          background: ${tText};
          color: ${tBg};
          padding: 12px 24px;
          border-radius: 12px;
          font-family: ${D};
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          text-decoration: none;
          width: fit-content;
        }
        .fz-btn:hover, .fz-btn:visited, .fz-btn:active, .fz-btn:focus {
          opacity: 0.8;
          color: ${tBg};
          background: ${tText};
          text-decoration: none;
        }
        
        .cal-filter-bar::-webkit-scrollbar { display: none; }
        .cal-filter-bar { scrollbar-width: none; }

        @media (max-width: 768px) {
          .fz-grid { grid-template-columns: 1fr; gap: 30px; }
          .fz-name { font-size: 20px; }
          .fz-btn { width: 100%; text-align: center; }
        }
      `}</style>

      <section style={{ paddingTop: 40 }}>
        <div className="hw">
          <h1 style={{ fontFamily: D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>
            Les Stades
          </h1>

          {/* Search Input */}
          <div style={{ marginBottom: 40, position: "relative", maxWidth: 600 }}>
            <FiSearch style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: tSub, fontSize: 20 }} />
            <input 
              type="text" 
              placeholder="Rechercher un stade ou une ville..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px 16px 50px",
                borderRadius: 100,
                border: `1px solid ${tBorder}`,
                background: "transparent",
                color: tText,
                fontFamily: B,
                fontSize: 16,
                outline: "none"
              }}
            />
          </div>

          {loading ? (
            <div style={{ padding: 100, textAlign: "center", color: tSub }}>
              Chargement des stades...
            </div>
          ) : (
            <div className="fz-grid">
              {filteredStadiums.map((s) => (
                <div key={s.id} className="fz-card">
                  <div className="fz-img-wrap">
                    <img
                      src={getImageUrl(s.image_url)}
                      alt={s.name}
                      className="fz-img"
                      onError={e => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800`;
                      }}
                    />
                  </div>
                  <h3 className="fz-name">{s.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                    <span style={{ fontFamily: D, fontSize: "14px", color: tSub, textTransform: "uppercase" }}>Ville: {s.city?.name || "N/A"}</span>
                    <span style={{ fontFamily: D, fontSize: "14px", color: tSub, textTransform: "uppercase" }}>•</span>
                    <span style={{ fontFamily: D, fontSize: "14px", color: tSub, textTransform: "uppercase" }}>Capacité: {s.capacity?.toLocaleString() || "N/A"}</span>
                  </div>
                  <p className="fz-desc">{s.description || "Découvrez l'un des sites officiels de la Coupe du Monde de la FIFA 2026."}</p>
                  
                  <a 
                    href={s.location_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ' ' + (s.city?.name || ''))}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="fz-btn"
                  >
                    Localiser
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
