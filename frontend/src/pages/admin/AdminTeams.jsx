import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiSearch, FiStar, FiUsers } from "react-icons/fi";
import { getTeams, createTeam, updateTeam, deleteTeam } from "../../services/api";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

const WORLD_CUP_COE_LIST = [
  { code: "dz", name: "Algérie" }, { code: "de", name: "Allemagne" }, { code: "gb", name: "Angleterre" },
  { code: "sa", name: "Arabie Saoudite" }, { code: "ar", name: "Argentine" }, { code: "au", name: "Australie" },
  { code: "be", name: "Belgique" }, { code: "br", name: "Brésil" }, { code: "cm", name: "Cameroun" },
  { code: "ca", name: "Canada" }, { code: "co", name: "Colombie" }, { code: "kr", name: "Corée du Sud" },
  { code: "hr", name: "Croatie" }, { code: "dk", name: "Danemark" }, { code: "eg", name: "Égypte" },
  { code: "ec", name: "Équateur" }, { code: "es", name: "Espagne" }, { code: "fr", name: "France" },
  { code: "ir", name: "Iran" }, { code: "it", name: "Italie" }, { code: "jp", name: "Japon" },
  { code: "ma", name: "Maroc" }, { code: "mx", name: "Mexique" }, { code: "ng", name: "Nigeria" },
  { code: "nl", name: "Pays-Bas" }, { code: "pl", name: "Pologne" }, { code: "pt", name: "Portugal" },
  { code: "qa", name: "Qatar" }, { code: "sn", name: "Sénégal" }, { code: "rs", name: "Serbie" },
  { code: "ch", name: "Suisse" }, { code: "tn", name: "Tunisie" }, { code: "uy", name: "Uruguay" },
  { code: "us", name: "USA" }
];

export default function AdminTeams() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "", code: "", flag: "", group_name: "", world_ranking: 0, 
    key_player: "", coach: "", captain: "", world_cup_titles: 0, 
    description: "", image_url: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTeam(editId, formData);
      } else {
        await createTeam(formData);
      }
      setShowModal(false);
      resetForm();
      fetchTeams();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", code: "", flag: "", group_name: "", world_ranking: 0, 
      key_player: "", coach: "", captain: "", world_cup_titles: 0, 
      description: "", image_url: "" 
    });
    setEditId(null);
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setFormData({
      name: t.name, code: t.code, flag: t.flag, group_name: t.group_name,
      world_ranking: t.world_ranking, key_player: t.key_player || "",
      coach: t.coach || "", captain: t.captain || "",
      world_cup_titles: t.world_cup_titles || 0,
      description: t.description || "",
      image_url: t.image_url || ""
    });
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
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        .admin-page {
          background: ${bg}; min-height: calc(100vh - 102px);
          padding: clamp(24px,5vw,48px);
          transition: background 0.3s;
        }
        .admin-inner { max-width: 1100px; margin: 0 auto; }
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
        .admin-flag {
          width: 28px; height: 20px; object-fit: cover; border-radius: 2px;
          display: inline-block; vertical-align: middle; margin-right: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
          background: ${bg}; width: 100%; max-width: 600px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; 
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
              <h1 className="admin-title">Gestion des Équipes</h1>
              <p className="admin-sub">Gérer les nations participant à la Coupe du Monde 2026</p>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter une équipe
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Équipe</th>
                  <th>Groupe</th>
                  <th>Rang FIFA</th>
                  <th>Joueur Clé</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : teams.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 40 }}>Aucune équipe trouvée</td></tr>
                ) : teams.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img className="admin-flag" src={`https://flagcdn.com/w80/${t.flag}.png`} alt={t.name} />
                        <span style={{ fontWeight: 800, fontSize: 16 }}>{t.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge" style={{ fontWeight: 600 }}>{t.group_name}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 800 }}>#{t.world_ranking}</div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600 }}>
                        <FiStar size={14} color="#f59e0b" /> {t.key_player || "N/A"}
                      </div>
                    </td>
                    <td>
                      <button className="btn-icon" title="Modifier" onClick={() => handleEdit(t)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon" title="Gérer les joueurs" onClick={() => navigate('/admin/joueurs')}><FiUsers size={16} /></button>
                      <button className="btn-icon delete" title="Supprimer" onClick={() => handleDelete(t.id)}><FiTrash2 size={16} /></button>
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
            <h2 style={{ fontFamily: FD, fontSize: 24, fontWeight: 900, textTransform: "uppercase", marginBottom: 24, color: textPrimary }}>
              {editId ? "Modifier l'équipe" : "Nouvelle équipe"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Nom de la Nation</label>
                  <input className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Ex: Maroc" />
                </div>
                <div className="form-group">
                  <label className="form-label">Code FIFA (3 lettres)</label>
                  <input className="form-input" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} required placeholder="Ex: MAR" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Code ISO Drapeau (2 lettres)</label>
                  <select className="form-input" value={formData.flag} onChange={e => setFormData({...formData, flag: e.target.value})} required>
                    <option value="">Sélectionner</option>
                    {WORLD_CUP_COE_LIST.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code.toUpperCase()})</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Groupe</label>
                  <input className="form-input" value={formData.group_name} onChange={e => setFormData({...formData, group_name: e.target.value})} required placeholder="Ex: Groupe A" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Rang FIFA</label>
                  <input type="number" className="form-input" value={formData.world_ranking} onChange={e => setFormData({...formData, world_ranking: parseInt(e.target.value)})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Titres Mondiaux</label>
                  <input type="number" className="form-input" value={formData.world_cup_titles} onChange={e => setFormData({...formData, world_cup_titles: parseInt(e.target.value)})} required />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Sélectionneur</label>
                  <input className="form-input" value={formData.coach} onChange={e => setFormData({...formData, coach: e.target.value})} placeholder="Walid Regragui" />
                </div>
                <div className="form-group">
                  <label className="form-label">Capitaine</label>
                  <input className="form-input" value={formData.captain} onChange={e => setFormData({...formData, captain: e.target.value})} placeholder="Romain Saïss" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Joueur Vedette</label>
                <input className="form-input" value={formData.key_player} onChange={e => setFormData({...formData, key_player: e.target.value})} placeholder="Ex: Achraf Hakimi" />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Bref historique de l'équipe..." />
              </div>

              <div className="form-group">
                <label className="form-label">URL Image de couverture</label>
                <input className="form-input" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://images.unsplash.com/..." />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
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
