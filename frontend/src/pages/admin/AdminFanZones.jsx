import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiMapPin, FiGlobe, FiCalendar, FiUsers, FiImage } from "react-icons/fi";
import { adminGetFanZones, createFanZone, updateFanZone, deleteFanZone } from "../../services/api";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

export default function AdminFanZones() {
  const { darkMode } = useTheme();
  const [fanZones, setFanZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    city_name: "",
    country: "",
    country_code: "",
    stadium_name: "",
    capacity: "",
    matches_count: 0,
    zone_name: "",
    description: "",
    image_url: "",
    opening_hours: "10h – 00h",
    is_centenary: false,
    group_label: "",
    sort_order: 0,
    is_active: true
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
      const data = await adminGetFanZones();
      const allZones = data.flatMap(g => g.cities.map(c => ({ ...c, group_label: g.label })));
      setFanZones(allZones);
    } catch (err) {
      console.error("Error fetching admin fan zones:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateFanZone(editId, formData);
      } else {
        await createFanZone(formData);
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
      city_name: "",
      country: "",
      country_code: "",
      stadium_name: "",
      capacity: "",
      matches_count: 0,
      zone_name: "",
      description: "",
      image_url: "",
      opening_hours: "10h – 00h",
      is_centenary: false,
      group_label: "",
      sort_order: 0,
      is_active: true
    });
    setEditId(null);
  };

  const handleEdit = (f) => {
    setEditId(f.id);
    setFormData({
      city_name: f.city_name || "",
      country: f.country || "",
      country_code: f.country_code || "",
      stadium_name: f.stadium_name || "",
      capacity: f.capacity || "",
      matches_count: f.matches_count || 0,
      zone_name: f.zone_name || "",
      description: f.description || "",
      image_url: f.image_url || "",
      opening_hours: f.opening_hours || "10h – 00h",
      is_centenary: f.is_centenary || false,
      group_label: f.group_label || "",
      sort_order: f.sort_order || 0,
      is_active: f.is_active !== undefined ? f.is_active : true
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette Fan Zone ?")) return;
    try {
      await deleteFanZone(id);
      fetchData();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100%; }
        
        .fz-admin-page {
          background: ${bg};
          min-height: 100vh;
          padding: 24px;
          transition: background 0.3s;
          overflow-x: hidden;
        }
        .fz-admin-inner {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }
        .fz-admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .fz-admin-title {
          font-family: ${FD};
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: ${textPrimary};
          margin: 0;
        }
        .fz-admin-sub {
          font-family: ${FB};
          font-size: 14px;
          color: ${textSecondary};
          margin: 4px 0 0;
        }
        
        .fz-table-wrap {
          background: ${card};
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid ${border};
          overflow-x: auto;
        }
        .fz-table {
          width: 100%;
          min-width: 600px;
          border-collapse: collapse;
        }
        .fz-table th {
          font-family: ${FB};
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${textSecondary};
          background: ${surface};
          padding: 16px 20px;
          text-align: left;
          border-bottom: 1px solid ${border};
        }
        .fz-table td {
          font-family: ${FB};
          font-size: 14px;
          color: ${textPrimary};
          padding: 16px 20px;
          border-bottom: 1px solid ${border};
        }
        .fz-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 100px;
          font-family: ${FB};
          font-size: 11px;
          font-weight: 700;
        }
        .fz-badge.active { background: rgba(34,197,94,0.1); color: #22c55e; }
        .fz-badge.inactive { background: rgba(239,68,68,0.1); color: #ef4444; }
        .fz-badge.centenary { background: rgba(234,179,8,0.1); color: #eab308; }
        
        .fz-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-family: ${FD};
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: ${accent};
          color: ${accentContrast};
        }
        .fz-btn-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid ${border};
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          cursor: pointer;
          color: ${textSecondary};
        }
        
        /* MODAL STYLES */
        .fz-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 10000;
          padding: 40px 20px;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .fz-modal-content {
          background: ${card};
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          border: 1px solid ${border};
          margin: 0 auto;
          flex-shrink: 0;
        }
        .fz-modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid ${border};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fz-modal-title {
          font-family: ${FD};
          font-size: 20px;
          font-weight: 900;
          text-transform: uppercase;
          color: ${textPrimary};
          margin: 0;
        }
        .fz-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding: 24px;
        }
        @media (max-width: 500px) {
          .fz-form-grid { grid-template-columns: 1fr; }
        }
        .fz-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .fz-form-group.full { grid-column: 1 / -1; }
        .fz-form-label {
          font-family: ${FB};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${textSecondary};
        }
        .fz-form-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid ${border};
          background: ${surface};
          color: ${textPrimary};
          font-family: ${FB};
          font-size: 14px;
        }
        .fz-form-textarea {
          width: 100%;
          min-height: 80px;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid ${border};
          background: ${surface};
          color: ${textPrimary};
          font-family: ${FB};
          font-size: 14px;
          resize: vertical;
        }
        .fz-form-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        .fz-form-checkbox input { width: 16px; height: 16px; }
        .fz-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid ${border};
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        .fz-btn-submit {
          padding: 10px 24px;
        }
        .fz-btn-cancel {
          background: ${surface};
          color: ${textPrimary};
          border: 1px solid ${border};
        }
      `}</style>

      <div className="fz-admin-page">
        <div className="fz-admin-inner">
          <div className="fz-admin-header">
            <div>
              <h1 className="fz-admin-title">Fan Zones</h1>
              <p className="fz-admin-sub">Gestion des zones fans officielles</p>
            </div>
            <button className="fz-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus size={16} /> Ajouter
            </button>
          </div>

          <div className="fz-table-wrap">
            <table className="fz-table">
              <thead>
                <tr>
                  <th>Ville</th>
                  <th>Pays</th>
                  <th>Stade</th>
                  <th>Groupe</th>
                  <th>Capacité</th>
                  <th>Matchs</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : fanZones.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: "center", padding: 40 }}>Aucune Fan Zone trouvée</td></tr>
                ) : (
                  fanZones.map((f, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{f.city_name}</td>
                      <td>{f.country}</td>
                      <td>{f.stadium_name}</td>
                      <td style={{ color: f.is_centenary ? "#eab308" : "inherit" }}>
                        {f.group_label}
                      </td>
                      <td>{f.capacity}</td>
                      <td>{f.matches_count}</td>
                      <td>
                        <span className={`fz-badge ${f.is_centenary ? 'centenary' : (f.is_active ? 'active' : 'inactive')}`}>
                          {f.is_centenary ? "Centenaire" : (f.is_active ? "Active" : "Inactive")}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="fz-btn-icon" onClick={() => handleEdit(f)} title="Modifier">
                            <FiEdit2 size={14} />
                          </button>
                          <button className="fz-btn-icon" onClick={() => handleDelete(f.id)} title="Supprimer">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fz-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="fz-modal-content" onClick={e => e.stopPropagation()}>
            <div className="fz-modal-header">
              <h2 className="fz-modal-title">{editId ? "Modifier" : "Ajouter"} Fan Zone</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="fz-form-grid">
                <div className="fz-form-group">
                  <label className="fz-form-label">Ville</label>
                  <input type="text" name="city_name" className="fz-form-input" value={formData.city_name} onChange={handleInputChange} required />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Pays</label>
                  <input type="text" name="country" className="fz-form-input" value={formData.country} onChange={handleInputChange} required />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Code Pays</label>
                  <input type="text" name="country_code" className="fz-form-input" value={formData.country_code} onChange={handleInputChange} required />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Stade</label>
                  <input type="text" name="stadium_name" className="fz-form-input" value={formData.stadium_name} onChange={handleInputChange} required />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Capacité</label>
                  <input type="text" name="capacity" className="fz-form-input" value={formData.capacity} onChange={handleInputChange} required />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Matchs</label>
                  <input type="number" name="matches_count" className="fz-form-input" value={formData.matches_count} onChange={handleInputChange} min="0" />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Zone</label>
                  <input type="text" name="zone_name" className="fz-form-input" value={formData.zone_name} onChange={handleInputChange} required />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Groupe</label>
                  <input type="text" name="group_label" className="fz-form-input" value={formData.group_label} onChange={handleInputChange} required />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Image URL</label>
                  <input type="url" name="image_url" className="fz-form-input" value={formData.image_url} onChange={handleInputChange} />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Horaire</label>
                  <input type="text" name="opening_hours" className="fz-form-input" value={formData.opening_hours} onChange={handleInputChange} />
                </div>
                <div className="fz-form-group full">
                  <label className="fz-form-label">Description</label>
                  <textarea name="description" className="fz-form-textarea" value={formData.description} onChange={handleInputChange} required />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-label">Ordre</label>
                  <input type="number" name="sort_order" className="fz-form-input" value={formData.sort_order} onChange={handleInputChange} min="0" />
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-checkbox">
                    <input type="checkbox" name="is_centenary" checked={formData.is_centenary} onChange={handleInputChange} />
                    <span style={{ color: textPrimary }}>Centenaire</span>
                  </label>
                </div>
                <div className="fz-form-group">
                  <label className="fz-form-checkbox">
                    <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                    <span style={{ color: textPrimary }}>Active</span>
                  </label>
                </div>
              </div>
              <div className="fz-modal-footer">
                <button type="submit" className="fz-btn-primary fz-btn-submit" style={{ flex: 1, justifyContent: "center" }}>Sauvegarder</button>
                <button type="button" className="fz-btn-primary fz-btn-cancel" onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}