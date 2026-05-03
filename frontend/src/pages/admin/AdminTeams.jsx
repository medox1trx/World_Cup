import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiStar, FiUsers } from "react-icons/fi";
import { getTeams, createTeam, updateTeam, deleteTeam, getGroups, getImageUrl } from "../../services/api";
import ImageUpload from "../../components/ImageUpload.jsx";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

const CONFEDERATIONS = ["UEFA", "CAF", "AFC", "CONMEBOL", "CONCACAF", "OFC"];

export default function AdminTeams() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [teams, setTeams] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [flagData, setFlagData] = useState({ type: 'url', value: '' });
  const [heroImageData, setHeroImageData] = useState({ type: 'url', value: '' });
  const [formData, setFormData] = useState({
    name: "", code: "", flag: "", hero_image: "", group_id: "", world_ranking: 0, 
    key_player: "", coach: "", captain: "", world_cup_titles: 0, 
    description: "", image_url: "", confederation: "UEFA"
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
    fetchTeams();
    fetchGroups();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const data = await getTeams();
      setTeams(data.data || data);
    } catch (err) {
      console.error("Error fetching admin teams:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroups = async () => {
    try {
      const data = await getGroups();
      setGroups(data.data || data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFileFlag = flagData.type === 'file' && flagData.value;
    const isFileHero = heroImageData.type === 'file' && heroImageData.value;
    const useFormData = isFileFlag || isFileHero;

    let payload;
    if (useFormData) {
      payload = new FormData();
      Object.keys(formData).forEach(key => { if (key !== 'flag' && key !== 'hero_image') payload.append(key, formData[key]); });
      if (isFileFlag) payload.append('flag', flagData.value);
      else if (flagData.value) payload.append('flag', flagData.value);
      if (isFileHero) payload.append('hero_image', heroImageData.value);
      else if (heroImageData.value) payload.append('hero_image', heroImageData.value);
      if (editId) payload.append('_method', 'PUT');
    } else {
      payload = { ...formData, flag: flagData.value, hero_image: heroImageData.value };
    }

    try {
      if (editId) await updateTeam(editId, payload);
      else await createTeam(payload);
      setShowModal(false);
      resetForm();
      fetchTeams();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", code: "", flag: "", hero_image: "", group_id: "", world_ranking: 0, 
      key_player: "", coach: "", captain: "", world_cup_titles: 0, 
      description: "", image_url: "", confederation: "UEFA"
    });
    setFlagData({ type: 'url', value: '' });
    setHeroImageData({ type: 'url', value: '' });
    setEditId(null);
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setFormData({
      name: t.name, code: t.code, flag: t.flag, hero_image: t.hero_image || "", group_id: t.group_id || "",
      world_ranking: t.world_ranking, key_player: t.key_player || "",
      coach: t.coach || "", captain: t.captain || "",
      world_cup_titles: t.world_cup_titles || 0,
      description: t.description || "",
      image_url: t.image_url || "",
      confederation: t.confederation || "UEFA"
    });
    setFlagData({ type: 'url', value: t.flag || '' });
    setHeroImageData({ type: 'url', value: t.hero_image || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette équipe ?")) return;
    try {
      await deleteTeam(id);
      fetchTeams();
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
        .admin-flag-img {
          width: 32px; height: 22px; object-fit: cover; border-radius: 4px;
          display: inline-block; vertical-align: middle; margin-right: 12px;
        }
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
          background: ${bg}; width: 100%; max-width: 800px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          max-height: 90vh; overflow-y: auto;
        }
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
        .admin-badge {
          padding: 4px 10px; borderRadius: 100px; fontSize: 10px; fontWeight: 800;
          textTransform: uppercase; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary};
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Nations</h1>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter une nation
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nation</th>
                  <th>Groupe</th>
                  <th>Conféd.</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : teams.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 40 }}>Aucune nation trouvée</td></tr>
                ) : teams.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {t.flag && t.flag.length <= 10 ? (
                          <img src={`https://flagcdn.com/w80/${t.flag.toLowerCase().replace('gb-eng', 'gb-eng').replace('gb-sct', 'gb-sct')}.png`} width="32" style={{ borderRadius: 4 }} alt="" />
                        ) : (
                          <img className="admin-flag-img" src={getImageUrl(t.flag || t.image_url)} alt={t.name} />
                        )}
                        <span style={{ fontWeight: 800, fontSize: 16 }}>{t.name}</span>
                      </div>
                    </td>
                    <td><span className="admin-badge">{t.group?.name || t.group_name || "N/A"}</span></td>
                    <td>{t.confederation?.name || t.confederation_name || t.confederation || "—"}</td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => handleEdit(t)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon" onClick={() => navigate('/admin/joueurs')}><FiUsers size={16} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(t.id)}><FiTrash2 size={16} /></button>
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
              {editId ? "Modifier Nation" : "Nouvelle Nation"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Code FIFA</label>
                  <input className="form-input" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} required maxLength="3" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Confédération</label>
                  <select className="form-input" value={formData.confederation} onChange={e => setFormData({...formData, confederation: e.target.value})} required>
                    {CONFEDERATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Groupe</label>
                  <select className="form-input" value={formData.group_id} onChange={e => setFormData({...formData, group_id: e.target.value})} required>
                    <option value="">Sélectionner un groupe</option>
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
              </div>

              <ImageUpload label="Drapeau" defaultValue={formData.flag} onChange={setFlagData} darkMode={darkMode} folder="teams" />

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
