import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiMapPin, FiUsers, FiCalendar } from "react-icons/fi";
import { getStadiums, createStadium, updateStadium, deleteStadium, getVilles, getImageUrl } from "../../services/api";
import ImageUpload from "../../components/ImageUpload.jsx";
import toast from "react-hot-toast";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminStadiums() {
  const { darkMode } = useTheme();
  const [stadiums, setStadiums] = useState([]);
  const [villes, setVilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageData, setImageData] = useState({ type: 'url', value: '' });
  const [formData, setFormData] = useState({
    name: "",
    city_id: "",
    capacity: "",
    image_url: "",
    description: ""
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
      const [sRes, vRes] = await Promise.all([getStadiums(), getVilles()]);
      setStadiums(sRes.data || sRes);
      setVilles(vRes.data || vRes);
    } catch (err) {
      console.error("Error fetching admin stadiums data:", err);
      toast.error("Erreur lors du chargement des données");
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
      Object.keys(formData).forEach(key => { if (key !== 'image_url') payload.append(key, formData[key]); });
      payload.append('image_url', imageData.value);
      if (editId) payload.append('_method', 'PUT');
    } else {
      payload = { ...formData, image_url: imageData.value };
    }

    try {
      if (editId) await updateStadium(editId, payload);
      else await createStadium(payload);
      toast.success("Stade enregistré !");
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", city_id: "", capacity: "",
      image_url: "", description: ""
    });
    setImageData({ type: 'url', value: '' });
    setEditId(null);
  };

  const handleEdit = (s) => {
    setEditId(s.id);
    setFormData({
      name: s.name,
      city_id: s.city_id || "",
      capacity: s.capacity || "",
      image_url: s.image_url || "",
      description: s.description || ""
    });
    setImageData({ type: 'url', value: s.image_url || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce stade ?")) return;
    try {
      await deleteStadium(id);
      toast.success("Stade supprimé");
      fetchData();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
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
        .btn-icon:hover { background: ${accent}; color: ${accentContrast}; }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 5000;
          padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 650px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          max-height: 95vh; overflow-y: auto;
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { 
          width: 100%; padding: 12px 18px; border-radius: 12px; 
          background-color: ${surface}; border: 1px solid ${border}; 
          color: ${textPrimary}; outline: none; transition: all 0.25s ease;
          font-family: ${FB}; font-size: 15px;
        }
        .form-input:focus { border-color: ${accent}; background-color: ${card}; }
        .stadium-img-mini { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; background: ${surface}; }
        .admin-badge {
          padding: 4px 10px; border-radius: 100px; font-size: 10px; font-weight: 800;
          text-transform: uppercase; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary};
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Stades</h1>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter un stade
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Stade</th>
                  <th>Ville</th>
                  <th>Capacité</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : stadiums.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 40 }}>Aucun stade trouvé</td></tr>
                ) : stadiums.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img className="stadium-img-mini" src={getImageUrl(s.image_url)} alt={s.name} onError={e => e.target.src = "https://i.pinimg.com/736x/39/0a/45/390a454c565577a5a7bc57597b722328.jpg"} />
                        <span style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <FiMapPin size={14} color={textSecondary} />
                        <span style={{ fontWeight: 600 }}>{s.city?.name || "—"}</span>
                      </div>
                    </td>
                    <td><span className="admin-badge"><FiUsers size={12} style={{ marginRight: 4 }} /> {s.capacity?.toLocaleString() || "—"}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => handleEdit(s)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(s.id)}><FiTrash2 size={16} /></button>
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
              {editId ? "Modifier le stade" : "Nouveau stade"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nom du Stade</label>
                <input className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Ex: MetLife Stadium" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                <div className="form-group">
                  <label className="form-label">Ville</label>
                  <select className="form-input" value={formData.city_id} onChange={e => setFormData({...formData, city_id: e.target.value})} required>
                    <option value="">Sélectionner une ville</option>
                    {villes.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Capacité</label>
                  <input type="number" className="form-input" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} placeholder="82500" />
                </div>
              </div>

              <div className="form-group">
                <ImageUpload label="Photo du Stade" defaultValue={formData.image_url} onChange={setImageData} darkMode={darkMode} folder="stadiums" />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description du stade..." style={{ minHeight: 100, resize: "vertical" }} />
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
