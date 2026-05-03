import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiCalendar, FiMapPin, FiClock, FiActivity } from "react-icons/fi";
import { getMatches, createMatch, updateMatch, deleteMatch, getTeams, getVilles, getStadiums, getReferees } from "../../services/api";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";


export default function AdminMatches() {
  const { darkMode } = useTheme();
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [villes, setVilles] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [refereesList, setRefereesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    team1_id: "",
    team2_id: "",
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
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mRes, tRes, vRes, sRes, rRes] = await Promise.all([
        getMatches(),
        getTeams(),
        getVilles(),
        getStadiums(),
        getReferees()
      ]);
      setMatches(mRes.data || mRes);
      setTeams(tRes);
      setVilles(vRes.data || vRes);
      setStadiums(sRes);
      setRefereesList(rRes);
    } catch (err) {
      console.error("Error fetching admin matches data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };

      if (editId) {
        await updateMatch(editId, payload);
      } else {
        await createMatch(payload);
      }
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      const msg = err.errors ? Object.values(err.errors).flat().join("\n") : (err.message || "Erreur inconnue");
      alert("Erreur lors de l'enregistrement :\n" + msg);
    }
  };

  const resetForm = () => {
    setFormData({
      team1_id: "", team2_id: "", 
      venue: "", city: "",
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
      team1_id: m.team1?.id || m.team1_id || "",
      team2_id: m.team2?.id || m.team2_id || "",
      venue: m.venue,
      city: m.city,
      match_date: m.match_date ? m.match_date.split('T')[0] : "",
      match_time: m.match_time,
      stage: m.stage,
      group_name: m.group_name || "",
      status: m.status,
      home_score: m.home_score || 0,
      away_score: m.away_score || 0,
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
      fetchData();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
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
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 5000;
          padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 850px; border-radius: 24px;
          padding: clamp(20px, 4vw, 32px); border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          max-height: 95vh; overflow-y: auto;
          position: relative;
        }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { 
          width: 100%; padding: 12px 18px; border-radius: 12px; 
          background-color: ${surface}; border: 1px solid ${border}; 
          color: ${textPrimary}; outline: none; transition: all 0.25s ease;
          box-sizing: border-box; font-family: ${FB}; font-size: 15px;
          height: auto; min-height: 50px;
        }
        select.form-input {
          appearance: none !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(textSecondary)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important; 
          background-position: right 18px center !important; 
          background-size: 18px !important; 
          padding-right: 48px !important; 
          cursor: pointer;
          line-height: 1.2;
        }
        .form-input:focus { 
          background: ${darkMode ? "#0a0a0a" : "#ffffff"}; 
          color: ${textPrimary}; 
          border-color: ${accent}; box-shadow: 0 4px 20px rgba(0,0,0,0.15); 
        }
        .form-input option {
          background: ${darkMode ? "#1c1c1c" : "#ffffff"};
          color: ${textPrimary};
        }
        .form-input:focus::placeholder { color: ${darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"}; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Calendrier</h1>
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
                      <div style={{ fontWeight: 800, fontSize: 16 }}>{m.team1?.name || m.home_team || "TBD"} vs {m.team2?.name || m.away_team || "TBD"}</div>
                    </td>
                    <td>
                       <div style={{ textTransform: "capitalize", fontWeight: 600 }}>{(m.stage || "group").replace('_', ' ')}</div>
                       {m.group_name && <div style={{ fontSize: 11, opacity: 0.6 }}>{m.group_name}</div>}
                    </td>
                    <td>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                         {m.city || m.city_name || "N/A"}
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>{m.venue || "N/A"}</div>
                      {m.referee && (
                        <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>
                           Arbitre: {m.referee}
                        </div>
                      )}
                      {m.weather_condition && (
                        <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4, fontWeight: 700 }}>
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
                         <div style={{ fontWeight: 900, fontSize: 18 }}>{m.home_score} - {m.away_score}</div>
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
                  <select className="form-input" value={formData.team1_id} onChange={e => setFormData({...formData, team1_id: e.target.value})} required>
                    <option value="">Sélectionner une équipe</option>
                    {teams.map(t => (
                      <option key={`home-${t.id}`} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Équipe Extérieur</label>
                  <select className="form-input" value={formData.team2_id} onChange={e => setFormData({...formData, team2_id: e.target.value})} required>
                    <option value="">Sélectionner une équipe</option>
                    {teams.map(t => (
                      <option key={`away-${t.id}`} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Stade / Venue</label>
                  <select className="form-input" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} required>
                    <option value="">Sélectionner un stade</option>
                    {stadiums.map(s => <option key={s.id} value={s.nom}>{s.nom}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ville</label>
                  <select className="form-input" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required>
                    <option value="">Sélectionner une ville</option>
                    {villes.map(v => <option key={v.id} value={v.nom}>{v.nom}</option>)}
                  </select>
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
                    <select className="form-input" value={formData.referee} onChange={e => setFormData({...formData, referee: e.target.value})}>
                      <option value="">Sélectionner un arbitre</option>
                      {refereesList.map(r => <option key={r.id} value={`${r.first_name} ${r.last_name}`}>{r.first_name} {r.last_name} ({r.nationality})</option>)}
                    </select>
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
