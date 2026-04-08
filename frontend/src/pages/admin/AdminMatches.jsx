import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiCalendar, FiMapPin, FiClock, FiActivity } from "react-icons/fi";
import { getMatches, createMatch, updateMatch, deleteMatch } from "../../services/api";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

export default function AdminMatches() {
  const { darkMode } = useTheme();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    home_team: "",
    home_flag: "",
    away_flag: "",
    venue: "",
    city: "",
    match_date: "",
    match_time: "",
    stage: "group",
    group_name: "",
    status: "upcoming",
    home_score: 0,
    away_score: 0,
    stadium_image: "",
    video_url: "",
    referee: "",
    assistant_referees: "",
    weather_condition: "",
    weather_temp: ""
  });

  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const surface      = darkMode ? "#171717"                  : "#f5f5f5";
  const accent       = darkMode ? "#ffffff"                  : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                 : "#ffffff";

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const data = await getMatches();
      // Handle pagination if return object
      setMatches(data.data || data);
    } catch (err) {
      console.error("Error fetching admin matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateMatch(editId, formData);
      } else {
        await createMatch(formData);
      }
      setShowModal(false);
      resetForm();
      fetchMatches();
    } catch (err) {
      const msg = err.errors ? Object.values(err.errors).flat().join("\n") : (err.message || "Erreur inconnue");
      alert("Erreur lors de l'enregistrement :\n" + msg);
    }
  };

  const resetForm = () => {
    setFormData({
      home_team: "", away_team: "", home_flag: "", away_flag: "", venue: "", city: "",
      match_date: "", match_time: "", stage: "group", group_name: "",
      status: "upcoming", home_score: 0, away_score: 0,
      stadium_image: "", video_url: "", referee: "", assistant_referees: "",
      weather_condition: "", weather_temp: ""
    });
    setEditId(null);
  };

  const handleEdit = (m) => {
    setEditId(m.id);
    setFormData({
      home_team: m.home_team,
      away_team: m.away_team,
      venue: m.venue,
      city: m.city,
      match_date: m.match_date ? m.match_date.split('T')[0] : "",
      match_time: m.match_time,
      stage: m.stage,
      group_name: m.group_name || "",
      status: m.status,
      home_score: m.home_score || 0,
      away_score: m.away_score || 0,
      home_flag: m.home_flag || "",
      away_flag: m.away_flag || "",
      stadium_image: m.stadium_image || "",
      video_url: m.video_url || "",
      referee: m.referee || "",
      assistant_referees: m.assistant_referees || "",
      weather_condition: m.weather_condition || "",
      weather_temp: m.weather_temp || ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce match ?")) return;
    try {
      await deleteMatch(id);
      fetchMatches();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        .admin-page {
          background: ${bg}; min-height: calc(100vh - 102px);
          padding: clamp(24px,5vw,48px);
          transition: background 0.3s;
        }
        .admin-inner { max-width: 1200px; margin: 0 auto; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .admin-title {
          font-family: ${FD}; font-size: clamp(32px,5vw,48px); font-weight: 900;
          letter-spacing: 0.02em; text-transform: uppercase; color: ${textPrimary};
          margin: 0;
        }
        .admin-sub { font-family: ${FB}; font-size: 14px; color: ${textSecondary}; margin: 4px 0 0; }
        .admin-table-container { 
          background: ${card}; border-radius: 24px; overflow: hidden;
          border: 1px solid ${border}; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th {
          font-family: ${FB}; font-size: 11px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: ${textSecondary}; background: ${surface};
          padding: 18px 24px; text-align: left;
          border-bottom: 1px solid ${border};
        }
        .admin-table td {
          font-family: ${FB}; font-size: 14px; color: ${textPrimary};
          padding: 20px 24px; border-bottom: 1px solid ${border};
          vertical-align: middle;
        }
        .admin-badge {
          display: inline-block; padding: 4px 12px; border-radius: 100px;
          font-family: ${FB}; font-size: 11px; font-weight: 700; text-transform: uppercase;
        }
        .admin-badge.upcoming { background: rgba(59,130,246,0.1); color: #3b82f6; }
        .admin-badge.finished { background: rgba(75,85,99,0.1); color: #4b5563; }
        
        .admin-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px; border: none; cursor: pointer;
          font-family: ${FD}; font-size: 13px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: ${accent}; color: ${accentContrast}; transition: 0.2s;
        }
        .btn-icon {
          width: 36px; height: 36px; border-radius: 10px; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary}; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: 0.2s; margin-right: 8px;
        }
        .btn-icon:hover { background: ${accent}; color: ${accentContrast}; }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
          padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 600px; border-radius: 32px;
          padding: 40px; border: 1px solid ${border}; max-height: 90vh; overflow-y: auto;
        }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 14px 18px; border-radius: 12px; background: ${surface}; border: 1px solid ${border}; color: ${textPrimary}; outline: none; }
        .form-input:focus { border-color: #c8102e; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Calendrier</h1>
              <p className="admin-sub">Gestion des matchs et des phases de groupes</p>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter un match
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Match</th>
                  <th>Phase / Groupe</th>
                  <th>Lieu / Officiels</th>
                  <th>Date & Heure</th>
                  <th>Score / Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : matches.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Aucun match trouvé</td></tr>
                ) : matches.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div style={{ fontWeight: 800, fontSize: 16 }}>{m.home_team} vs {m.away_team}</div>
                    </td>
                    <td>
                       <div style={{ textTransform: "capitalize", fontWeight: 600 }}>{m.stage.replace('_', ' ')}</div>
                       {m.group_name && <div style={{ fontSize: 11, opacity: 0.6 }}>{m.group_name}</div>}
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600 }}>
                        <FiMapPin size={14} color="#ef4444" /> {m.city}
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>{m.venue}</div>
                      {m.referee && (
                        <div style={{ fontSize: 11, color: "#3b82f6", marginTop: 4 }}>
                           Arbitre: {m.referee}
                        </div>
                      )}
                      {m.weather_condition && (
                        <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 4, fontWeight: 700 }}>
                           Météo: {m.weather_condition} ({m.weather_temp}°C)
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{m.match_date ? new Date(m.match_date).toLocaleDateString() : 'N/A'}</div>
                      <div style={{ fontSize: 11, opacity: 0.6 }}>{m.match_time}</div>
                    </td>
                    <td>
                       {m.status === 'finished' ? (
                         <div style={{ fontWeight: 900, fontSize: 18, color: "#c8102e" }}>{m.home_score} - {m.away_score}</div>
                       ) : (
                         <span className={`admin-badge ${m.status}`}>Programmé</span>
                       )}
                    </td>
                    <td>
                      <button className="btn-icon" onClick={() => handleEdit(m)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon delete" onClick={() => handleDelete(m.id)}><FiTrash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: FD, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 30, color: textPrimary }}>
              {editId ? "Modifier le match" : "Nouveau match"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Équipe Domicile</label>
                  <input className="form-input" value={formData.home_team} onChange={e => setFormData({...formData, home_team: e.target.value})} required placeholder="Ex: Maroc" />
                </div>
                <div className="form-group">
                  <label className="form-label">Équipe Extérieur</label>
                  <input className="form-input" value={formData.away_team} onChange={e => setFormData({...formData, away_team: e.target.value})} required placeholder="Ex: France" />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Drapeau Domicile (Emoji ou URL)</label>
                  <input className="form-input" value={formData.home_flag} onChange={e => setFormData({...formData, home_flag: e.target.value})} placeholder="Ex: 🇲🇦" />
                </div>
                <div className="form-group">
                  <label className="form-label">Drapeau Extérieur (Emoji ou URL)</label>
                  <input className="form-input" value={formData.away_flag} onChange={e => setFormData({...formData, away_flag: e.target.value})} placeholder="Ex: 🇫🇷" />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Stade / Venue</label>
                  <input className="form-input" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} required placeholder="Ex: Grand Stade de Casablanca" />
                </div>
                <div className="form-group">
                  <label className="form-label">Ville</label>
                  <input className="form-input" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required placeholder="Ex: Casablanca" />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-input" value={formData.match_date} onChange={e => setFormData({...formData, match_date: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Heure</label>
                  <input type="time" className="form-input" value={formData.match_time} onChange={e => setFormData({...formData, match_time: e.target.value})} required />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Phase</label>
                  <select className="form-input" value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value})}>
                    <option value="group">Groupes</option>
                    <option value="round_of_16">8ème de finale</option>
                    <option value="quarter">Quart de finale</option>
                    <option value="semi">Demi-finale</option>
                    <option value="final">Finale</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Nom du Groupe</label>
                  <input className="form-input" value={formData.group_name} onChange={e => setFormData({...formData, group_name: e.target.value})} placeholder="Ex: Groupe A" />
                </div>
              </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">URL Image du Stade</label>
                    <input className="form-input" value={formData.stadium_image} onChange={e => setFormData({...formData, stadium_image: e.target.value})} placeholder="https://images.unsplash.com/..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">URL Vidéo (Résumé)</label>
                    <input className="form-input" value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} placeholder="https://www.youtube.com/..." />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Arbitre Principal</label>
                    <input className="form-input" value={formData.referee} onChange={e => setFormData({...formData, referee: e.target.value})} placeholder="Nom de l'arbitre" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Arbitres Assistants</label>
                    <input className="form-input" value={formData.assistant_referees} onChange={e => setFormData({...formData, assistant_referees: e.target.value})} placeholder="Assistant 1, Assistant 2" />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">État Météo</label>
                    <select className="form-input" value={formData.weather_condition} onChange={e => setFormData({...formData, weather_condition: e.target.value})}>
                      <option value="">Sélectionner</option>
                      <option value="Sunny">Ensoleillé</option>
                      <option value="Cloudy">Nuageux</option>
                      <option value="Rainy">Pluvieux</option>
                      <option value="Windy">Venteux</option>
                      <option value="Stormy">Orageux</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Température (°C)</label>
                    <input type="number" className="form-input" value={formData.weather_temp} onChange={e => setFormData({...formData, weather_temp: e.target.value})} placeholder="25" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Statut</label>
                  <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="upcoming">Programmé</option>
                    <option value="finished">Terminé</option>
                  </select>
                </div>

              {formData.status === 'finished' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Score Domicile</label>
                    <input type="number" className="form-input" value={formData.home_score} onChange={e => setFormData({...formData, home_score: parseInt(e.target.value)})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Score Extérieur</label>
                    <input type="number" className="form-input" value={formData.away_score} onChange={e => setFormData({...formData, away_score: parseInt(e.target.value)})} />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 1, justifyContent: "center" }}>Sauvegarder</button>
                <button type="button" className="admin-btn-primary" style={{ background: surface, color: textPrimary, border: `1px solid ${border}` }} onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
