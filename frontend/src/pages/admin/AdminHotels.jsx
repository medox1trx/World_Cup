import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiMapPin, FiGlobe, FiLink } from "react-icons/fi";
import { getHotels, createHotel, updateHotel, deleteHotel, getImageUrl } from "../../services/api";
import ImageUpload from "../../components/ImageUpload.jsx";
import toast from "react-hot-toast";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminHotels() {
  const { darkMode } = useTheme();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageData, setImageData] = useState({ type: 'url', value: '' });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    country: "",
    website_url: "",
    image: ""
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
      const res = await getHotels();
      setHotels(Array.isArray(res) ? res : (res.data || []));
    } catch (err) {
      console.error("Error fetching admin hotels data:", err);
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
      Object.keys(formData).forEach(key => { if (key !== 'image') payload.append(key, formData[key]); });
      payload.append('image', imageData.value);
      if (editId) payload.append('_method', 'PUT');
    } else {
      payload = { ...formData, image: imageData.value };
    }

    try {
      if (editId) await updateHotel(editId, payload);
      else await createHotel(payload);
      toast.success("Hôtel enregistré !");
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", description: "", address: "",
      city: "", country: "", website_url: "", image: ""
    });
    setImageData({ type: 'url', value: '' });
    setEditId(null);
  };

  const handleEdit = (h) => {
    setEditId(h.id);
    setFormData({
      name: h.name,
      description: h.description || "",
      address: h.address || "",
      city: h.city || "",
      country: h.country || "",
      website_url: h.website_url || "",
      image: h.image || ""
    });
    setImageData({ type: 'url', value: h.image || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet hôtel ?")) return;
    try {
      await deleteHotel(id);
      toast.success("Hôtel supprimé");
      fetchData();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <>
      <style>{`
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
        .hotel-img-mini { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; background: ${surface}; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Gestion Hôtels</h1>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter un hôtel
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Hôtel</th>
                  <th>Localisation</th>
                  <th>Pays</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : hotels.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 40 }}>Aucun hôtel trouvé</td></tr>
                ) : hotels.map((h) => (
                  <tr key={h.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img className="hotel-img-mini" src={getImageUrl(h.image)} alt={h.name} onError={e => e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"} />
                        <span style={{ fontWeight: 800, fontSize: 16 }}>{h.name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 600 }}>{h.city || "—"}</span>
                        <span style={{ fontSize: 12, color: textSecondary }}>{h.address || "—"}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 12 }}>{h.country || "—"}</span>
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
              {editId ? "Modifier l'hôtel" : "Nouvel hôtel"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nom de l'Hôtel</label>
                <input className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Ex: The Ritz-Carlton" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                <div className="form-group">
                  <label className="form-label">Ville</label>
                  <input className="form-input" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required placeholder="Ex: New York" />
                </div>
                <div className="form-group">
                  <label className="form-label">Pays</label>
                  <input className="form-input" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} required placeholder="Ex: USA" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Adresse</label>
                <input className="form-input" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Ex: 50 Central Park S" />
              </div>

              <div className="form-group">
                <ImageUpload label="Photo de l'Hôtel" defaultValue={formData.image} onChange={setImageData} darkMode={darkMode} folder="hotels" />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description de l'hôtel..." style={{ minHeight: 80, resize: "vertical" }} />
              </div>

              <div className="form-group">
                <label className="form-label">Lien du Site Web</label>
                <input className="form-input" value={formData.website_url} onChange={e => setFormData({...formData, website_url: e.target.value})} placeholder="https://..." />
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
