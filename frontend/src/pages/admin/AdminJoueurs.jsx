import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiSearch, FiUsers, FiStar } from "react-icons/fi";
import { adminGetJoueurs, createJoueur, updateJoueur, deleteJoueur, getTeams, getImageUrl } from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import toast from "react-hot-toast";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

const POSTES = ["Gardien", "Défenseur", "Milieu", "Attaquant"];

export default function AdminJoueurs() {
  const { darkMode } = useTheme();
  const [joueurs, setJoueurs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageData, setImageData] = useState({ type: 'url', value: '' });
  const [formData, setFormData] = useState({
    nom: "", numero: "", poste: "Attaquant", photo: "", team_id: ""
  });

  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const surface      = darkMode ? "#171717"                  : "#f5f5f5";
  const accent       = darkMode ? "#ef4444"                  : "#ef4444";
  const accentContrast= "#ffffff";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jData, tData] = await Promise.all([adminGetJoueurs(), getTeams()]);
      setJoueurs(jData);
      setTeams(tData);
    } catch (err) {
      console.error("Error fetching admin joueurs data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFile = imageData.type === 'file' && imageData.value;
    let payload;

    if (isFile) {
      payload = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'photo') {
          payload.append(key, formData[key]);
        }
      });
      payload.append('photo', imageData.value);
      if (editId) payload.append('_method', 'PUT');
    } else {
      payload = {
        ...formData,
        photo: imageData.value
      };
    }

    try {
      if (editId) {
        await updateJoueur(editId, payload);
        toast.success("Joueur mis à jour !");
      } else {
        await createJoueur(payload);
        toast.success("Joueur créé !");
      }
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({ nom: "", numero: "", poste: "Attaquant", photo: "", team_id: "" });
    setImageData({ type: 'url', value: '' });
    setEditId(null);
  };

  const handleEdit = (j) => {
    setEditId(j.id);
    setFormData({
      nom: j.nom,
      numero: j.numero,
      poste: j.poste,
      photo: j.photo || "",
      team_id: j.team_id
    });
    setImageData({ type: 'url', value: j.photo || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce joueur ?")) return;
    try {
      await deleteJoueur(id);
      toast.success("Joueur supprimé");
      fetchData();
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
          max-height: 90vh; overflow-y: auto; padding: 32px; border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 14px 18px; border-radius: 12px; background: ${surface}; border: 1px solid ${border}; color: ${textPrimary}; outline: none; }
        .form-input:focus { border-color: #c8102e; }
        .player-img-mini { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; background: ${surface}; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Effectifs</h1>
              <p className="admin-sub">Gérer les {joueurs.length} joueurs de la compétition</p>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter un joueur
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>JOUEUR</th>
                  <th>NUMÉRO</th>
                  <th>POSTE</th>
                  <th>NATION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 60 }}>Chargement des joueurs...</td></tr>
                ) : joueurs.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 60 }}>Aucun joueur trouvé</td></tr>
                ) : joueurs.map((j) => (
                  <tr key={j.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img className="player-img-mini" src={getImageUrl(j.photo)} alt={j.nom} />
                        <span style={{ fontWeight: 800, fontSize: 16 }}>{j.nom}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 900, fontSize: 18, color: accent }}>#{j.numero}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 12, color: textSecondary }}>{j.poste}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                         <img src={getImageUrl(j.team?.flag)} width="24" style={{ borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                         <span style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase" }}>{j.team?.name || "N/A"}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <button className="btn-icon" onClick={() => handleEdit(j)}><FiEdit2 size={14} /></button>
                        <button className="btn-icon delete" onClick={() => handleDelete(j.id)}><FiTrash2 size={14} /></button>
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
              <h2 style={{ fontFamily: FD, fontSize: 24, fontWeight: 900, textTransform: "uppercase", margin: 0, color: textPrimary }}>
                {editId ? "Modifier le profil" : "Nouveau joueur"}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: surface, border: "none", color: textSecondary, padding: 8, borderRadius: 8, cursor: "pointer" }}
              >
                Fermer
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nom Complet</label>
                <input className="form-input" value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} required placeholder="Ex: Hakim Ziyech" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Numéro de maillot</label>
                  <input type="number" className="form-input" value={formData.numero} onChange={e => setFormData({...formData, numero: e.target.value})} required placeholder="Ex: 7" />
                </div>
                <div className="form-group">
                  <label className="form-label">Poste</label>
                  <select className="form-input" value={formData.poste} onChange={e => setFormData({...formData, poste: e.target.value})} required>
                    {POSTES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Sélection Nationale</label>
                <select className="form-input" value={formData.team_id} onChange={e => setFormData({...formData, team_id: e.target.value})} required>
                  <option value="">Sélectionner une équipe</option>
                  {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              <ImageUpload 
                label="Photo du joueur"
                defaultValue={formData.photo}
                onChange={setImageData}
                darkMode={darkMode}
                folder="players"
              />

              <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 2, justifyContent: "center", padding: '14px 0' }}>Enregistrer</button>
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
