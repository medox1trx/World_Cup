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

  const theme = {
    bg: darkMode ? "#080808" : "#f8f9fa",
    card: darkMode ? "#111111" : "#ffffff",
    text: darkMode ? "#ffffff" : "#0d0d0d",
    subText: darkMode ? "#888" : "#666",
    border: darkMode ? "rgba(255,255,255,0.08)" : "#eeeeee",
    accent: C.red,
  };

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: theme.bg }}>
        <div style={{ animation: "spin 1s linear infinite", border: `3px solid ${theme.border}`, borderTop: `3px solid ${theme.accent}`, borderRadius: "50%", width: 40, height: 40 }} />
      </div>
    );
  }

  if (error || !team) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: theme.bg, color: theme.text }}>
        <h2 style={{ fontFamily: FONT.display, fontSize: 32, marginBottom: 16 }}>Oups !</h2>
        <p style={{ color: theme.subText }}>{error || "Données indisponibles."}</p>
        <button onClick={() => navigate("/teams")} style={{ marginTop: 24, padding: "12px 24px", background: theme.accent, color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>
          Retour aux équipes
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: "100vh", transition: "0.3s" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .detail-card { animation: fadeIn 0.6s ease-out backwards; }
      `}</style>
      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <button 
          onClick={() => navigate("/teams")}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: theme.subText, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 32, padding: 0 }}
        >
          <FiArrowLeft /> RETOUR AUX ÉQUIPES
        </button>

        <div className="detail-card" style={{ display: "grid", gridTemplateColumns: "clamp(300px, 40%, 500px) 1fr", gap: 60, alignItems: "start" }}>
          {/* Left Column: Image & Flag */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 32, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.2)", border: `1px solid ${theme.border}` }}>
              <img 
                src={getImageUrl(team.hero_image || team.image_url)} 
                alt={team.name}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80";
                }}
                style={{ width: "100%", height: 500, objectFit: "cover" }}
              />
            </div>
            <div style={{ position: "absolute", bottom: -24, right: 32, background: "white", padding: "12px 20px", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 12 }}>
              <Flag code={team.flag} size={32} />
              <span style={{ fontWeight: 900, fontSize: 14, color: "#000" }}>{team.code.toUpperCase()}</span>
            </div>
          </div>

          {/* Right Column: Info */}
          <div>
            <span style={{ color: theme.accent, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12 }}>Nation Participant</span>
            <h1 style={{ fontFamily: FONT.display, fontSize: clamp(48, 80), fontWeight: 900, textTransform: "uppercase", margin: "8px 0 24px", lineHeight: 0.9 }}>
              {team.name}
            </h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
              <div style={{ background: theme.card, padding: 24, borderRadius: 24, border: `1px solid ${theme.border}` }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 800, color: theme.subText, textTransform: "uppercase", marginBottom: 4 }}>Groupe</span>
                <span style={{ fontSize: 24, fontWeight: 900 }}>{team.group?.name || "N/A"}</span>
              </div>
              <div style={{ background: theme.card, padding: 24, borderRadius: 24, border: `1px solid ${theme.border}` }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 800, color: theme.subText, textTransform: "uppercase", marginBottom: 4 }}>Confédération</span>
                <span style={{ fontSize: 24, fontWeight: 900 }}>{team.confederation || "N/A"}</span>
              </div>
            </div>

            <div style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "#f0f0f0", borderRadius: 32, padding: 32, border: `1px solid ${theme.border}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                <div>
                  <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme.subText, textTransform: "uppercase" }}>Joueur Clé</span>
                  <span style={{ fontSize: 20, fontWeight: 900 }}>{team.key_player || "N/A"}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme.subText, textTransform: "uppercase" }}>Capitaine</span>
                  <span style={{ fontSize: 20, fontWeight: 900 }}>{team.captain || "N/A"}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme.subText, textTransform: "uppercase" }}>Sélectionneur</span>
                  <span style={{ fontSize: 20, fontWeight: 900 }}>{team.coach || "N/A"}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme.subText, textTransform: "uppercase" }}>Rang FIFA</span>
                  <span style={{ fontSize: 20, fontWeight: 900 }}>#{team.world_ranking || 0}</span>
                </div>
              </div>
              
              <p style={{ fontSize: 16, lineHeight: 1.6, color: theme.subText, margin: 0 }}>
                {team.description || `${team.name} participe à la Coupe du Monde 2026 avec de grandes ambitions.`}
              </p>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, opacity: 0.6 }}>
                <FiAward /> 03 Titres
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, opacity: 0.6 }}>
                <FiShield /> Qualifié
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 80 }}>
          <h2 style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>L'Effectif</h2>
          
          {!team.joueurs || team.joueurs.length === 0 ? (
            <p style={{ color: theme.subText }}>Aucun joueur enregistré pour cette équipe.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {team.joueurs.map((player) => (
                <div key={player.id} style={{ background: theme.card, borderRadius: 24, overflow: "hidden", border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", gap: 20, padding: "16px 20px" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, overflow: "hidden", border: `1px solid ${theme.border}` }}>
                    <img src={getImageUrl(player.photo)} alt={player.nom} onError={(e) => { e.target.src = "https://www.w3schools.com/howto/img_avatar.png"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.2 }}>{player.nom}</span>
                      <span style={{ fontSize: 22, fontWeight: 900, color: theme.accent, opacity: 0.8 }}>#{player.numero}</span>
                    </div>
                    <span style={{ display: "block", fontSize: 12, fontWeight: 800, color: theme.subText, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>
                      {player.poste}
                    </span>
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

function clamp(min, max) {
  return `clamp(${min}px, ${(max/12.8).toFixed(2)}vw, ${max}px)`;
}
