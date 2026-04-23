import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiSearch, FiStar, FiUsers, FiCheck } from "react-icons/fi";
import { getTeams, createTeam, updateTeam, deleteTeam, getGroups, getImageUrl } from "../../services/api";
import ImageUpload from "../../components/ImageUpload.jsx";
import toast from "react-hot-toast";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

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
      setTeams(data);
    } catch (err) {
      console.error("Error fetching admin teams:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroups = async () => {
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if we need FormData (if any image is a file)
    const isFileFlag = flagData.type === 'file' && flagData.value;
    const isFileHero = heroImageData.type === 'file' && heroImageData.value;
    const useFormData = isFileFlag || isFileHero;

    let payload;
    if (useFormData) {
      payload = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'flag' && key !== 'hero_image') {
          payload.append(key, formData[key]);
        }
      });
      if (isFileFlag) payload.append('flag', flagData.value);
      else if (flagData.value) payload.append('flag', flagData.value);

      if (isFileHero) payload.append('hero_image', heroImageData.value);
      else if (heroImageData.value) payload.append('hero_image', heroImageData.value);

      if (editId) payload.append('_method', 'PUT');
    } else {
      payload = { 
        ...formData, 
        flag: flagData.value, 
        hero_image: heroImageData.value 
      };
    }

    try {
      if (editId) {
        await updateTeam(editId, payload);
        toast.success("Équipe mise à jour !");
      } else {
        await createTeam(payload);
        toast.success("Équipe créée !");
      }
      setShowModal(false);
      resetForm();
      fetchTeams();
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'enregistrement");
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
      toast.success("Équipe supprimée");
    } catch (err) {
      toast.error("Erreur lors de la suppression");
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
        .admin-flag-img {
          width: 32px; height: 22px; object-fit: cover; border-radius: 4px;
          display: inline-block; vertical-align: middle; margin-right: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
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
        .btn-icon:hover { background: #c8102e; color: white; border-color: #c8102e; }
        
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 5000;
          padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 800px; border-radius: 24px;
          max-height: 90vh; overflow-y: auto; padding: 40px; border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 14px 18px; border-radius: 12px; background: ${surface}; border: 1px solid ${border}; color: ${textPrimary}; outline: none; }
        .form-input:focus { border-color: #c8102e; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Nations</h1>
              <p className="admin-sub">Gérer les {teams.length} sélections de la simulation 2026</p>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter une nation
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>NATION</th>
                  <th>GROUPE</th>
                  <th>CONFED</th>
                  <th>RANG</th>
                  <th>VEDETTE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 60 }}>Chargement des données...</td></tr>
                ) : teams.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 60 }}>Aucune sélection trouvée</td></tr>
                ) : teams.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img className="admin-flag-img" src={getImageUrl(t.flag)} alt={t.name} onError={(e) => { e.target.src = "https://flagcdn.com/w80/un.png"; }} />
                        <span style={{ fontWeight: 900, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.02em" }}>{t.name}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, color: "#c8102e" }}>{t.group?.name || "N/A"}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 700, color: textSecondary }}>{t.confederation}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 900, fontSize: 15, color: textPrimary }}>#{t.world_ranking}</div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700 }}>
                        <FiStar size={12} color="#f59e0b" /> {t.key_player || "N/A"}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <button className="btn-icon" title="Modifier" onClick={() => handleEdit(t)}><FiEdit2 size={14} /></button>
                        <button className="btn-icon" title="Gérer les joueurs" onClick={() => navigate('/admin/joueurs')}><FiUsers size={14} /></button>
                        <button className="btn-icon delete" title="Supprimer" onClick={() => handleDelete(t.id)}><FiTrash2 size={14} /></button>
                      </div>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <h2 style={{ fontFamily: FD, fontSize: 28, fontWeight: 900, textTransform: "uppercase", margin: 0, color: textPrimary }}>
                {editId ? "Modifier la nation" : "Nouvelle nation"}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: surface, border: "none", color: textSecondary, padding: 8, borderRadius: 8, cursor: "pointer" }}
              >
                Fermer
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Nom de la Nation</label>
                  <input className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Ex: Maroc" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Code FIFA (3 lettres)</label>
                  <input className="form-input" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} required placeholder="Ex: MAR" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Confédération</label>
                  <select className="form-input" value={formData.confederation} onChange={e => setFormData({...formData, confederation: e.target.value})} required>
                    {CONFEDERATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Attribuer à un groupe</label>
                  <select className="form-input" value={formData.group_id} onChange={e => setFormData({...formData, group_id: e.target.value})} required>
                    <option value="">Sélectionner un groupe</option>
                    {groups.length === 0 ? <option disabled>Chargement des groupes...</option> : 
                      groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)
                    }
                  </select>
                </div>
              </div>

              <ImageUpload 
                label="Drapeau de la nation"
                defaultValue={formData.flag}
                onChange={setFlagData}
                darkMode={darkMode}
                folder="teams"
              />

              <ImageUpload 
                label="Image de couverture (Hero)"
                defaultValue={formData.hero_image}
                onChange={setHeroImageData}
                darkMode={darkMode}
                folder="teams"
              />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Rang FIFA</label>
                  <input type="number" className="form-input" value={formData.world_ranking} onChange={e => setFormData({...formData, world_ranking: parseInt(e.target.value)})} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Titres</label>
                  <input type="number" className="form-input" value={formData.world_cup_titles} onChange={e => setFormData({...formData, world_cup_titles: parseInt(e.target.value)})} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Capitaine</label>
                  <input className="form-input" value={formData.captain} onChange={e => setFormData({...formData, captain: e.target.value})} placeholder="Romain Saïss" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Sélectionneur</label>
                  <input className="form-input" value={formData.coach} onChange={e => setFormData({...formData, coach: e.target.value})} placeholder="Walid Regragui" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Joueur Vedette</label>
                  <input className="form-input" value={formData.key_player} onChange={e => setFormData({...formData, key_player: e.target.value})} placeholder="Achraf Hakimi" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description historique</label>
                <textarea className="form-input" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Bref historique..." />
              </div>

              <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 2, justifyContent: "center", padding: '16px 0', fontSize: 15 }}>
                  {editId ? "Enregistrer les modifications" : "Créer la nation"}
                </button>
                <button 
                  type="button" 
                  className="admin-btn-primary" 
                  style={{ flex: 1, background: surface, color: textSecondary, border: `1px solid ${border}`, justifyContent: "center" }}
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

