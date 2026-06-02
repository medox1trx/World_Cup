import { useState, useEffect } from "react";
import { getReferees, getImageUrl } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Referees() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [referees, setReferees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReferee, setSelectedReferee] = useState(null);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getReferees().then(data => {
      const list = data?.data || data;
      setReferees(Array.isArray(list) ? list : []);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const roles = ["all", ...new Set(referees.map(r => r.role).filter(Boolean))];
  const filteredReferees = filter === "all" 
    ? referees 
    : referees.filter(r => r.role === filter);

  const tBg      = darkMode ? "#000000" : "#ffffff";
  const tText    = darkMode ? "#ffffff" : "#000000";
  const tBorder  = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tSubText = darkMode ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.45)";

  return (
    <div style={{
      fontFamily: B,
      background: tBg,
      color: tText,
      opacity: mounted ? 1 : 0,
      transition: "background-color 0.4s, color 0.4s, opacity 0.45s",
      minHeight: "100vh",
      paddingTop: 40
    }}>
      <style>{`
        .hw { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        
        .r-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 60px 20px;
        }

        @media (max-width: 1200px) { .r-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 900px) { .r-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .r-grid { grid-template-columns: repeat(2, 1fr); } }

        .r-item {
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }

        .r-avatar-container {
          width: 180px; height: 180px; 
          border-radius: 50%; overflow: hidden;
          border: 2px solid ${tBorder}; 
          margin-bottom: 20px; 
          background: ${darkMode ? "#151515" : "#f5f5f5"};
          flex-shrink: 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .r-name {
          font-family: ${D}; 
          font-size: 22px; 
          font-weight: 900; 
          text-transform: uppercase; 
          margin: 0; 
          letter-spacing: 0.04em;
          color: ${tText};
          line-height: 1.1;
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
        .m-left { width: 40%; background: ${darkMode ? "#1a1a1a" : "#f5f5f5"}; position: relative; }
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

      <section style={{ padding: "60px 0 120px" }}>
        <div className="hw">
          <h1 style={{ fontFamily: D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>
            Les Arbitres
          </h1>

          {/* Filter chips */}
          <div className="cal-filter-bar" style={{
            display: "flex", alignItems: "center", gap: 6,
            overflowX: "auto", paddingBottom: 4, marginBottom: 40
          }}>
            {roles.map(r => (
              <button key={r} onClick={() => setFilter(r)} style={{
                background: filter === r ? tText : "transparent",
                color: filter === r ? tBg : tSubText,
                border: `1px solid ${filter === r ? tText : tBorder}`,
                padding: "5px 14px", borderRadius: 100,
                fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer",
                whiteSpace: "nowrap", transition: "all 0.18s", fontFamily: B,
              }}>
                {r === "all" ? "Tous les Rôles" : r}
              </button>
            ))}
          </div>
          
          {loading ? (
            <div style={{ padding: 100, textAlign: "center", color: tSubText }}>Chargement...</div>
          ) : (
            <div className="r-grid">
              {filteredReferees.map((r) => {
                const fullName = `${r.first_name} ${r.last_name}`;
                const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=222222&color=ffffff&size=512`;
                
                return (
                  <div key={r.id} className="r-item" onClick={() => setSelectedReferee(r)} style={{ cursor: "pointer" }}>
                    <div className="r-avatar-container">
                      <img 
                        src={(r.photo_url && r.photo_url !== "") ? getImageUrl(r.photo_url) : fallbackImg} 
                        alt={fullName}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={e => { e.currentTarget.src = fallbackImg; }}
                      />
                    </div>
                    <h3 className="r-name">{fullName}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 8 }}>
                      {r.nationality_code && (
                        <img src={`https://flagcdn.com/w40/${r.nationality_code.toLowerCase()}.png`} width="20" style={{ borderRadius: 2 }} alt="" />
                      )}
                      <span style={{ fontSize: 13, fontWeight: 700, color: tSubText, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {r.nationality || "N/A"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedReferee && (() => {
        const fullName = `${selectedReferee.first_name} ${selectedReferee.last_name}`;
        const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=222222&color=ffffff&size=512`;
        
        return (
          <div className="m-overlay" onClick={() => setSelectedReferee(null)}>
            <div className="m-content" onClick={e => e.stopPropagation()}>
              <div className="m-left">
                <img 
                  src={(selectedReferee.photo_url && selectedReferee.photo_url !== "") ? getImageUrl(selectedReferee.photo_url) : fallbackImg}
                  alt={fullName}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div className="m-right">
                <button className="close-btn" onClick={() => setSelectedReferee(null)}>&times;</button>
                
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  {selectedReferee.nationality_code && (
                    <img src={`https://flagcdn.com/w80/${selectedReferee.nationality_code.toLowerCase()}.png`} width="40" style={{ borderRadius: 4 }} alt="" />
                  )}
                  <span style={{ fontFamily: D, fontSize: 20, color: tSubText }}>{selectedReferee.nationality || "Arbitre FIFA Officiel"}</span>
                </div>
                
                <h2 style={{ fontFamily: D, fontSize: 48, fontWeight: 900, textTransform: "uppercase", marginBottom: 32, lineHeight: 1 }}>
                  {fullName}
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                  <div>
                    <div className="m-label">Rôle</div>
                    <div className="m-value">{selectedReferee.role || "Arbitre Central"}</div>
                  </div>
                  <div>
                    <div className="m-label">Nationalité</div>
                    <div className="m-value">{selectedReferee.nationality || "--"}</div>
                  </div>
                  <div>
                    <div className="m-label">Fédération</div>
                    <div className="m-value">{selectedReferee.federation || "FIFA"}</div>
                  </div>
                  <div>
                    <div className="m-label">Expérience</div>
                    <div className="m-value">{selectedReferee.experience || "Pro"}</div>
                  </div>
                </div>

                <div className="m-label" style={{ marginTop: 20 }}>Notes</div>
                <p style={{ fontFamily: B, fontSize: 16, color: tSubText, lineHeight: 1.6, margin: 0 }}>
                  {selectedReferee.notes || "Arbitre sélectionné pour son excellence et sa maîtrise du jeu lors de la Coupe du Monde de la FIFA 2026."}
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
