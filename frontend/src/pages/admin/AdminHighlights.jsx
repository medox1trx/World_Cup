import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiVideo, FiClock } from "react-icons/fi";
import { getHighlights, createHighlight, updateHighlight, deleteHighlight } from "../../services/api";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminHighlights() {
  const { darkMode } = useTheme();
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    video_url: "",
    duration: "",
    category: "Match de Légende",
    status: "published"
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
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    setLoading(true);
    try {
      const data = await getHighlights();
      setHighlights(data.data || data);
    } catch (err) {
      console.error("Error fetching highlights:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await updateHighlight(editId, formData);
      else await createHighlight(formData);
      setShowModal(false);
      resetForm();
      fetchHighlights();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", image_url: "", video_url: "", duration: "", category: "Match de Légende", status: "published" });
    setEditId(null);
  };

  const handleEdit = (h) => {
    setEditId(h.id);
    setFormData({
      title: h.title,
      image_url: h.image_url,
      video_url: h.video_url || "",
      duration: h.duration,
      category: h.category,
      status: h.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce highlight ?")) return;
    try {
      await deleteHighlight(id);
      fetchHighlights();
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
        .img-preview { width: 80px; height: 45px; border-radius: 8px; object-fit: cover; background: ${surface}; }
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
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { 
          width: 100%; padding: 14px 18px; border-radius: 12px; 
          background: ${surface}; border: 1px solid ${border}; 
          color: ${textPrimary}; outline: none; transition: all 0.25s ease;
        }
        .form-input:focus { background: ${darkMode ? "#0a0a0a" : "#ffffff"}; border-color: ${accent}; }
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
              <h1 className="admin-title">Temps Forts</h1>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter une vidéo
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Aperçu</th>
                  <th>Titre</th>
                  <th>Catégorie</th>
                  <th>Durée</th>
                  <th>Statut</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : highlights.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Aucune vidéo trouvée</td></tr>
                ) : highlights.map((h) => (
                  <tr key={h.id}>
                    <td><img src={h.image_url} className="img-preview" alt="" /></td>
                    <td style={{ fontWeight: 800, fontSize: 15 }}>{h.title}</td>
                    <td>{h.category}</td>
                    <td>{h.duration}</td>
                    <td>
                      <span className="admin-badge">{h.status}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => handleEdit(h)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(h.id)}><FiTrash2 size={16} /></button>
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
              {editId ? "Modifier Vidéo" : "Nouvelle Vidéo"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Titre</label>
                <input className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">URL Image</label>
                <input className="form-input" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">URL Vidéo</label>
                <input className="form-input" value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Durée</label>
                  <input className="form-input" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <select className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Match de Légende">Match de Légende</option>
                    <option value="Compilations">Compilations</option>
                    <option value="Fan Experience">Fan Experience</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Statut</label>
                <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="published">Publié</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>

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
