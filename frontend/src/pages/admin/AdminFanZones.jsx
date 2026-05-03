import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiMapPin } from "react-icons/fi";
import { getFanZones, createFanZone, updateFanZone, deleteFanZone, getCities, getImageUrl } from "../../services/api";
import ImageUpload from "../../components/ImageUpload.jsx";
import toast from "react-hot-toast";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminFanZones() {
  const { darkMode } = useTheme();
  const [fanZones, setFanZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageData, setImageData] = useState({ type: 'url', value: '' });
  
  const [formData, setFormData] = useState({
    city_id: "",
    zone_label: ""
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
      const [fzData, cData] = await Promise.all([getFanZones(), getCities()]);
      const fetchedFZ = fzData?.data || fzData;
      const fetchedCities = cData?.data || cData;
      setFanZones(Array.isArray(fetchedFZ) ? fetchedFZ : []);
      setCities(Array.isArray(fetchedCities) ? fetchedCities : []);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des Fan Zones");
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
      payload.append("city_id", formData.city_id);
      payload.append("zone_label", formData.zone_label);
      payload.append("image", imageData.value);
      if (editId) payload.append('_method', 'PUT');
    } else {
      payload = { ...formData, image_url: imageData.value };
    }

    try {
      if (editId) await updateFanZone(editId, payload);
      else await createFanZone(payload);
      
      toast.success("Fan Zone enregistrée !");
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({ city_id: "", zone_label: "" });
    setImageData({ type: 'url', value: '' });
    setEditId(null);
  };

  const handleEdit = (fz) => {
    setEditId(fz.id);
    setFormData({
      city_id: fz.city_id || "",
      zone_label: fz.zone_label || ""
    });
    setImageData({ type: 'url', value: fz.image_url || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette Fan Zone ?")) return;
    try {
      await deleteFanZone(id);
      toast.success("Fan Zone supprimée");
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
          background: ${bg}; width: 100%; max-width: 600px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { 
          width: 100%; padding: 12px 18px; border-radius: 12px; 
          background-color: ${surface}; border: 1px solid ${border}; 
          color: ${textPrimary}; outline: none; transition: all 0.25s ease;
          font-family: ${FB}; font-size: 15px; box-sizing: border-box;
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
        option { background-color: ${bg}; color: ${textPrimary}; }
        .fz-img-mini { width: 60px; height: 40px; border-radius: 8px; object-fit: cover; background: ${surface}; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Fan Zones</h1>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter une Fan Zone
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Fan Zone</th>
                  <th>Ville</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : fanZones.length === 0 ? (
                  <tr><td colSpan="3" style={{ textAlign: "center", padding: 40 }}>Aucune Fan Zone trouvée</td></tr>
                ) : fanZones.map((fz) => (
                  <tr key={fz.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img className="fz-img-mini" src={getImageUrl(fz.image_url)} alt={fz.zone_label} />
                        <span style={{ fontWeight: 800, fontSize: 16 }}>{fz.zone_label}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                         <FiMapPin color={textSecondary} size={14} />
                         <span style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase" }}>{fz.city_name || "N/A"}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => handleEdit(fz)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(fz.id)}><FiTrash2 size={16} /></button>
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
              {editId ? "Modifier Fan Zone" : "Nouvelle Fan Zone"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nom de la Fan Zone</label>
                <input className="form-input" value={formData.zone_label} onChange={e => setFormData({...formData, zone_label: e.target.value})} required placeholder="ex: FIFA Fan Festival NY" />
              </div>

              <div className="form-group">
                <label className="form-label">Ville</label>
                <select className="form-input" value={formData.city_id} onChange={e => setFormData({...formData, city_id: e.target.value})} required>
                  <option value="">Sélectionner une ville</option>
                  {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <ImageUpload 
                label="Image de la Zone" 
                defaultValue={formData.image_url} 
                onChange={setImageData} 
                darkMode={darkMode} 
                folder="fan_zones" 
              />

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