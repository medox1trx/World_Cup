import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { getTeam, getImageUrl } from "../services/api";
import { FONT, C } from "./Home/constants";
import { Flag } from "./Home/ui";
import { FiArrowLeft, FiStar, FiAward, FiShield } from "react-icons/fi";

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const data = await getTeam(id);
        setTeam(data);
      } catch (err) {
        console.error("Error fetching team detail:", err);
        setError("Équipe non trouvée.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [id]);

  // THEME TOKENS
  const tBg     = darkMode ? "#0a0a0a" : "#fdfdfd";
  const tText   = darkMode ? "white"   : "#0a0a0a";
  const tCardBg = darkMode ? "#111111" : "#f5f5f5";
  const tBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tSub    = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: tBg }}>
        <div style={{ animation: "spin 1s linear infinite", border: `3px solid ${tBorder}`, borderTop: `3px solid ${C.red}`, borderRadius: "50%", width: 40, height: 40 }} />
      </div>
    );
  }

  if (error || !team) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: tBg, color: tText }}>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 32, marginBottom: 16 }}>Oups !</h2>
        <p style={{ color: tSub }}>{error || "Données indisponibles."}</p>
        <button onClick={() => navigate("/teams")} style={{ marginTop: 24, padding: "12px 28px", background: tText, color: tBg, border: "none", borderRadius: 100, fontWeight: 900, cursor: "pointer", fontFamily: 'Bebas Neue', textTransform: 'uppercase' }}>
          Retour aux équipes
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: tBg, color: tText, minHeight: "100vh", transition: "background 0.4s, color 0.4s", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .detail-card { animation: fadeIn 0.6s ease-out backwards; }
        .detail-card { animation: fadeIn 0.6s ease-out backwards; }
        .stat-card { background: ${tCardBg}; border: 1px solid ${tBorder}; padding: 24px; border-radius: 20px; }
        .player-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          cursor: default;
        }
        .player-circle {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid ${tBorder};
          background: ${tCardBg};
        }
        .player-img { width: 100%; height: 100%; object-fit: cover; }
        .player-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1;
          color: ${tText};
        }
        .player-meta {
          font-size: 11px;
          font-weight: 900;
          color: ${tSub};
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>
      
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px clamp(20px, 5vw, 80px)" }}>
        <button 
          onClick={() => navigate("/teams")}
          style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", color: tSub, fontSize: 13, fontWeight: 900, cursor: "pointer", marginBottom: 48, padding: 0, fontFamily: 'Bebas Neue', letterSpacing: '0.1em' }}
        >
          <FiArrowLeft size={16} /> RETOUR AUX ÉQUIPES
        </button>

        <div className="detail-card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 80, alignItems: "start" }}>
          {/* Left Column: Flag/Hero Image */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 24, overflow: "hidden", border: `1px solid ${tBorder}`, background: tCardBg }}>
              <img 
                src={(team.hero_image || team.image_url) ? getImageUrl(team.hero_image || team.image_url) : `https://flagcdn.com/w1280/${team.flag?.toLowerCase()}.png`} 
                alt={team.name}
                onError={(e) => {
                  e.target.src = `https://flagcdn.com/w1280/${team.flag?.toLowerCase()}.png`;
                }}
                style={{ width: "100%", height: 600, objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Column: Info */}
          <div>
            <h1 style={{ fontFamily: 'Bebas Neue', fontSize: "clamp(60px, 8vw, 120px)", fontWeight: 900, textTransform: "uppercase", margin: "10px 0 32px", lineHeight: 0.9 }}>
              {team.name}
            </h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
              <div className="stat-card">
                <span style={{ display: "block", fontSize: 11, fontWeight: 900, color: tSub, textTransform: "uppercase", marginBottom: 6, letterSpacing: '0.1em' }}>Groupe</span>
                <span style={{ fontSize: 32, fontWeight: 900, fontFamily: 'Bebas Neue' }}>{team.group?.name || "Group C"}</span>
              </div>
              <div className="stat-card">
                <span style={{ display: "block", fontSize: 11, fontWeight: 900, color: tSub, textTransform: "uppercase", marginBottom: 6, letterSpacing: '0.1em' }}>Confédération</span>
                <span style={{ fontSize: 32, fontWeight: 900, fontFamily: 'Bebas Neue' }}>{team.confederation || "CAF"}</span>
              </div>
            </div>

            {( (team.key_player && team.key_player !== "N/A") || 
               (team.captain && team.captain !== "N/A") || 
               (team.coach && team.coach !== "N/A") || 
               (team.world_ranking > 0) ) && (
              <div style={{ background: tCardBg, borderRadius: 24, padding: 40, border: `1px solid ${tBorder}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 32 }}>
                  {team.key_player && team.key_player !== "N/A" && (
                    <div>
                      <span style={{ display: "block", fontSize: 11, fontWeight: 900, color: tSub, textTransform: "uppercase", marginBottom: 4, letterSpacing: '0.05em' }}>Joueur Clé</span>
                      <span style={{ fontSize: 18, fontWeight: 900 }}>{team.key_player}</span>
                    </div>
                  )}
                  {team.captain && team.captain !== "N/A" && (
                    <div>
                      <span style={{ display: "block", fontSize: 11, fontWeight: 900, color: tSub, textTransform: "uppercase", marginBottom: 4, letterSpacing: '0.05em' }}>Capitaine</span>
                      <span style={{ fontSize: 18, fontWeight: 900 }}>{team.captain}</span>
                    </div>
                  )}
                  {(team.selectionneur || (team.coach && team.coach !== "N/A")) && (
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      {team.selectionneur?.photo && (
                        <div style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", border: `1px solid ${tBorder}`, background: tBg }}>
                          <img src={getImageUrl(team.selectionneur.photo)} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                        </div>
                      )}
                      <div>
                        <span style={{ display: "block", fontSize: 11, fontWeight: 900, color: tSub, textTransform: "uppercase", marginBottom: 4, letterSpacing: '0.05em' }}>Sélectionneur</span>
                        <span style={{ fontSize: 18, fontWeight: 900 }}>{team.selectionneur?.name || team.coach}</span>
                      </div>
                    </div>
                  )}
                  {team.world_ranking > 0 && (
                    <div>
                      <span style={{ display: "block", fontSize: 11, fontWeight: 900, color: tSub, textTransform: "uppercase", marginBottom: 4, letterSpacing: '0.05em' }}>Rang FIFA</span>
                      <span style={{ fontSize: 24, fontWeight: 900, color: C.red, fontFamily: 'Bebas Neue' }}>#{team.world_ranking}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 100 }}>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 48, fontWeight: 900, textTransform: "uppercase", marginBottom: 48 }}>L'Effectif</h2>
          
          {!team.joueurs || team.joueurs.length === 0 ? (
            <div style={{ padding: 60, border: `1px solid ${tBorder}`, borderRadius: 24, textAlign: 'center', background: tCardBg }}>
              <p style={{ color: tSub, fontWeight: 700 }}>Aucun joueur enregistré pour cette équipe.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "48px 32px" }}>
              {team.joueurs.map((player) => (
                <div key={player.id} className="player-item">
                  <div className="player-circle">
                    <img className="player-img" src={getImageUrl(player.photo)} alt={player.nom} onError={(e) => { e.target.src = "https://www.w3schools.com/howto/img_avatar.png"; }} />
                  </div>
                  <div>
                    <div className="player-name">
                      {player.nom} {player.numero && <span style={{ color: C.red }}>#{player.numero}</span>}
                    </div>
                    <div className="player-meta">{player.poste}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
