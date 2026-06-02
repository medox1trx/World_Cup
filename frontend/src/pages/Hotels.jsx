import { useState, useEffect } from "react";
import { getHotels, getImageUrl } from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Hotels() {
  const { darkMode } = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCity = queryParams.get("city") || "";

  const [mounted, setMounted] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialCity);

  useEffect(() => {
    const currentCity = queryParams.get("city") || "";
    setSearchQuery(currentCity);
  }, [location.search]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getHotels()
      .then(data => {
        const results = Array.isArray(data) ? data : (data.data || []);
        setHotels(results);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredHotels = hotels.filter(h => {
    const query = searchQuery.toLowerCase();
    const nameMatch = h.name?.toLowerCase().includes(query);
    const cityMatch = h.city?.toLowerCase().includes(query);
    return nameMatch || cityMatch;
  });

  const tBg     = darkMode ? "#0a0a0a" : "#fdfdfd";
  const tText   = darkMode ? "white"   : "#0a0a0a";
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
        .h-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 40px;
          padding: 60px 0 120px;
        }
        .h-card {
          display: flex;
          flex-direction: column;
        }
        .h-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .h-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .h-name {
          font-family: ${D};
          font-size: 28px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1;
          color: ${tText};
        }
        
        .h-desc {
          font-family: ${B};
          font-size: 15px;
          color: ${tSub};
          margin: 12px 0 24px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .h-btn {
          background: ${tText};
          color: ${tBg} !important;
          padding: 12px 32px;
          border-radius: 12px;
          font-family: ${D};
          font-size: 15px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          text-decoration: none !important;
          width: fit-content;
          display: inline-block;
        }
        .h-btn:hover, .h-btn:active, .h-btn:visited {
          color: ${tBg} !important;
          opacity: 0.9;
          transform: translateY(-2px);
          text-decoration: none !important;
        }
        .h-btn:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .cal-filter-bar::-webkit-scrollbar { display: none; }
        .cal-filter-bar { scrollbar-width: none; }

        @media (max-width: 768px) {
          .h-grid { grid-template-columns: 1fr; gap: 30px; }
          .h-name { font-size: 24px; }
          .h-btn { width: 100%; text-align: center; }
        }
      `}</style>

      <section style={{ paddingTop: 40 }}>
        <div className="hw">
          <h1 style={{ fontFamily: D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>
            Hébergement & Hôtels
          </h1>

          {/* Search Input */}
          <div style={{ marginBottom: 40, position: "relative", maxWidth: 600 }}>
            <FiSearch style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: tSub, fontSize: 20 }} />
            <input 
              type="text" 
              placeholder="Rechercher un hôtel ou une ville..." 
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
              Chargement des hôtels...
            </div>
          ) : (
            <div className="h-grid">
              {filteredHotels.map((h) => (
                <div key={h.id} className="h-card">
                  <div className="h-img-wrap">
                    <img
                      src={getImageUrl(h.image)}
                      alt={h.name}
                      className="h-img"
                      onError={e => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800`;
                      }}
                    />
                  </div>
                  <h3 className="h-name">{h.name}</h3>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: tSub, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {h.city} • {h.country}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>|</span>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: tSub }}>
                      {h.address}
                    </span>
                  </div>

                  <p className="h-desc">{h.description || "Un établissement d'exception pour votre séjour durant la Coupe du Monde de la FIFA 2026."}</p>
                  
                  <a 
                    href={h.website_url || "#"}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-btn"
                  >
                    Voir l'hôtel
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
