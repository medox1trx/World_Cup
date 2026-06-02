import { useState, useEffect } from "react";
import { getSelectionneurs, getImageUrl } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Selectionneurs() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getSelectionneurs().then(data => {
      setCoaches(data);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const teams = ["all", ...new Set(coaches.map(c => c.team?.name).filter(Boolean))];
  const filteredCoaches = filter === "all" 
    ? coaches 
    : coaches.filter(c => c.team?.name === filter);

  const tBg      = darkMode ? "#0d0d0d" : "#fdfdfd";
  const tText    = darkMode ? "white"   : "#0d0d0d";
  const tCardBg  = darkMode ? "#1a1a1a" : "#f0f0f0";
  const tBorder  = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const tSubText = darkMode ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.45)";

  return (
    <div style={{
      fontFamily: B,
      background: tBg,
      color: tText,
      opacity: mounted ? 1 : 0,
      transition: "background-color 0.4s, color 0.4s, opacity 0.45s",
      minHeight: "100vh",
    }}>
      <style>{`
        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3.5vw,52px); }
        .j-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 40px 24px;
        }
        .j-card {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          cursor: pointer;
        }
        .m-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center; z-index: 9999;
          padding: 20px; animation: fadeIn 0.3s ease;
        }
        .m-content {
          background: ${darkMode ? "#141414" : "white"};
          width: 100%; max-width: 800px; border-radius: 24px; overflow: hidden;
          display: flex; border: 1px solid ${tBorder};
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .m-left { width: 40%; background: ${tCardBg}; position: relative; }
        .m-right { width: 60%; padding: 40px; position: relative; }
        .close-btn {
          position: absolute; top: 20px; right: 20px; background: none; border: none;
          color: ${tText}; font-size: 24px; cursor: pointer; z-index: 10; opacity: 0.6;
        }
        .close-btn:hover { opacity: 1; }
        .m-label { font-family: ${D}; color: ${tSubText}; font-size: 14px; text-transform: uppercase; margin-bottom: 4px; }
        .m-value { font-family: ${B}; color: ${tText}; font-size: 18px; font-weight: 700; margin-bottom: 24px; }
        
        .cal-filter-bar::-webkit-scrollbar { display: none; }
        .cal-filter-bar { scrollbar-width: none; }

        @media (max-width: 768px) {
          .m-content { flex-direction: column; max-height: 90vh; overflow-y: auto; }
          .m-left { width: 100%; height: 300px; }
          .m-right { width: 100%; padding: 24px; }
        }
      `}</style>

      <section id="selectionneurs-list" style={{ padding: "clamp(56px,8vh,100px) 0" }}>
        <div className="hw">
          <h1 style={{ fontFamily: D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>
            Les Sélectionneurs
          </h1>

          {/* Filter chips */}
          <div className="cal-filter-bar" style={{
            display: "flex", alignItems: "center", gap: 6,
            overflowX: "auto", paddingBottom: 4, marginBottom: 40
          }}>
            {teams.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                background: filter === t ? tText : "transparent",
                color: filter === t ? tBg : tSubText,
                border: `1px solid ${filter === t ? tText : tBorder}`,
                padding: "5px 14px", borderRadius: 100,
                fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer",
                whiteSpace: "nowrap", transition: "all 0.18s", fontFamily: B,
              }}>
                {t === "all" ? "Toutes les Équipes" : t}
              </button>
            ))}
          </div>
          
          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: tSubText, fontFamily: B }}>
              Chargement des sélectionneurs...
            </div>
          ) : (
            <div className="j-grid">
              {filteredCoaches.map((c) => (
                <div key={c.id} className="j-card" onClick={() => setSelectedCoach(c)}>
                  <div style={{
                    width: 200, height: 200,
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto 24px",
                    border: `2px solid ${tBorder}`,
                    background: tCardBg,
                    flexShrink: 0,
                  }}>
                    <img
                      src={c.photo
                        ? getImageUrl(c.photo)
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=222222&color=ffffff&size=512`
                      }
                      alt={c.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=222222&color=ffffff&size=512`;
                      }}
                    />
                  </div>
                  <h3 style={{
                    fontFamily: D, fontSize: 24, fontWeight: 900,
                    textTransform: "uppercase", letterSpacing: "0.04em",
                    color: tText, margin: "0 0 8px 0", lineHeight: 1.1,
                  }}>
                    {c.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                    {c.team?.flag && (
                      <img src={`https://flagcdn.com/w40/${c.team.flag.toLowerCase()}.png`} width="20" style={{ borderRadius: 2 }} alt="" />
                    )}
                    <span style={{ fontSize: 13, fontWeight: 700, color: tSubText, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {c.team?.name || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {selectedCoach && (
        <div className="m-overlay" onClick={() => setSelectedCoach(null)}>
          <div className="m-content" onClick={e => e.stopPropagation()}>
            <div className="m-left">
              <img 
                src={selectedCoach.photo ? getImageUrl(selectedCoach.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCoach.name)}&size=512`}
                alt={selectedCoach.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div className="m-right">
              <button className="close-btn" onClick={() => setSelectedCoach(null)}>&times;</button>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                {selectedCoach.team?.flag && (
                  <img src={`https://flagcdn.com/w80/${selectedCoach.team.flag.toLowerCase()}.png`} width="40" style={{ borderRadius: 4 }} alt="" />
                )}
                <span style={{ fontFamily: D, fontSize: 20, color: tSubText }}>{selectedCoach.nationality || selectedCoach.team?.name || "Sélectionneur National"}</span>
              </div>
              
              <h2 style={{ fontFamily: D, fontSize: 48, fontWeight: 900, textTransform: "uppercase", marginBottom: 32, lineHeight: 1 }}>
                {selectedCoach.name}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                <div>
                  <div className="m-label">Équipe</div>
                  <div className="m-value">{selectedCoach.team?.name || "N/A"}</div>
                </div>
                <div>
                  <div className="m-label">Nationalité</div>
                  <div className="m-value">{selectedCoach.nationality || selectedCoach.team?.name || "--"}</div>
                </div>
                <div>
                  <div className="m-label">Âge</div>
                  <div className="m-value">{selectedCoach.age ? `${selectedCoach.age} ans` : "--"}</div>
                </div>
                <div>
                  <div className="m-label">Expérience</div>
                  <div className="m-value">{selectedCoach.experience || "Internationale"}</div>
                </div>
              </div>

              <div className="m-label" style={{ marginTop: 20 }}>Parcours</div>
              <p style={{ fontFamily: B, fontSize: 16, color: tSubText, lineHeight: 1.6, margin: 0 }}>
                {selectedCoach.bio || "Responsable de la stratégie et de la performance technique de l'équipe nationale pour la Coupe du Monde de la FIFA 2026."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
