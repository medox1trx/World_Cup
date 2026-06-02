import { useState, useEffect } from "react";
import { getJoueurs, getImageUrl } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Joueurs() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [joueurs, setJoueurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJoueur, setSelectedJoueur] = useState(null);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getJoueurs().then(data => {
      setJoueurs(data);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const positions = ["all", ...new Set(joueurs.map(j => j.position).filter(Boolean))];
  const filteredJoueurs = filter === "all" 
    ? joueurs 
    : joueurs.filter(j => j.position === filter);

  // Theme tokens — same pattern as Tickets.jsx
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

      <section id="joueurs-list" style={{ padding: "clamp(56px,8vh,100px) 0" }}>
        <div className="hw">
          <h1 style={{ fontFamily: D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>
            Les Joueurs
          </h1>

          {/* Filter chips */}
          <div className="cal-filter-bar" style={{
            display: "flex", alignItems: "center", gap: 6,
            overflowX: "auto", paddingBottom: 4, marginBottom: 40
          }}>
            {positions.map(p => (
              <button key={p} onClick={() => setFilter(p)} style={{
                background: filter === p ? tText : "transparent",
                color: filter === p ? tBg : tSubText,
                border: `1px solid ${filter === p ? tText : tBorder}`,
                padding: "5px 14px", borderRadius: 100,
                fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer",
                whiteSpace: "nowrap", transition: "all 0.18s", fontFamily: B,
              }}>
                {p === "all" ? "Toutes les Positions" : p}
              </button>
            ))}
          </div>
          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: tSubText, fontFamily: B }}>
              Chargement des joueurs...
            </div>
          ) : (
            <div className="j-grid">
              {filteredJoueurs.map((p) => (
                <div key={p.id} className="j-card" onClick={() => setSelectedJoueur(p)}>
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
                      src={p.photo
                        ? getImageUrl(p.photo)
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=222222&color=ffffff&size=512`
                      }
                      alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=222222&color=ffffff&size=512`;
                      }}
                    />
                  </div>
                  <h3 style={{
                    fontFamily: D, fontSize: 24, fontWeight: 900,
                    textTransform: "uppercase", letterSpacing: "0.04em",
                    color: tText, margin: "0 0 8px 0", lineHeight: 1.1,
                  }}>
                    {p.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                    {p.team?.flag && (
                      <img src={`https://flagcdn.com/w40/${p.team.flag.toLowerCase()}.png`} width="20" style={{ borderRadius: 2 }} alt="" />
                    )}
                    <span style={{ fontSize: 13, fontWeight: 700, color: tSubText, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {p.team?.name || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {selectedJoueur && (
        <div className="m-overlay" onClick={() => setSelectedJoueur(null)}>
          <div className="m-content" onClick={e => e.stopPropagation()}>
            <div className="m-left">
              <img 
                src={selectedJoueur.photo ? getImageUrl(selectedJoueur.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedJoueur.name)}&size=512`}
                alt={selectedJoueur.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div className="m-right">
              <button className="close-btn" onClick={() => setSelectedJoueur(null)}>&times;</button>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                {selectedJoueur.team?.flag && (
                  <img src={`https://flagcdn.com/w80/${selectedJoueur.team.flag.toLowerCase()}.png`} width="40" style={{ borderRadius: 4 }} alt="" />
                )}
                <span style={{ fontFamily: D, fontSize: 20, color: tSubText }}>{selectedJoueur.team?.name || "Équipe Nationale"}</span>
              </div>
              
              <h2 style={{ fontFamily: D, fontSize: 48, fontWeight: 900, textTransform: "uppercase", marginBottom: 32, lineHeight: 1 }}>
                {selectedJoueur.name}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                <div>
                  <div className="m-label">Position</div>
                  <div className="m-value">{selectedJoueur.position || "Joueur"}</div>
                </div>
                <div>
                  <div className="m-label">Numéro</div>
                  <div className="m-value">#{selectedJoueur.number || "--"}</div>
                </div>
                <div>
                  <div className="m-label">Âge</div>
                  <div className="m-value">{selectedJoueur.age ? `${selectedJoueur.age} ans` : "--"}</div>
                </div>
                <div>
                  <div className="m-label">Club</div>
                  <div className="m-value">{selectedJoueur.club || "N/A"}</div>
                </div>
              </div>

              <div className="m-label" style={{ marginTop: 20 }}>Biographie</div>
              <p style={{ fontFamily: B, fontSize: 16, color: tSubText, lineHeight: 1.6, margin: 0 }}>
                {selectedJoueur.bio || "Aucune information supplémentaire disponible pour le moment."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
