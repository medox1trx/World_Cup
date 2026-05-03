import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiRadio, FiToggleLeft, FiToggleRight, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { adminGetTicker, createTickerItem, updateTickerItem, deleteTickerItem } from "../../services/api";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

const BLANK = {
  text: "",
  label: "EN DIRECT",
  url: "",
  active: true,
  sort_order: 0,
};

export default function AdminTicker() {
  const { darkMode } = useTheme();
  const [items,     setItems]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [formData,  setFormData]  = useState(BLANK);

  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const surface      = darkMode ? "#171717"                  : "#f5f5f5";
  const accent       = darkMode ? "#ffffff"                  : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                 : "#ffffff";

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await adminGetTicker();
      setItems(data.data || data || []);
    } catch { console.error("Error fetching ticker"); }
    finally { setLoading(false); }
  };

  const openAdd = () => {
    setEditId(null);
    setFormData({ ...BLANK, sort_order: items.length });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setFormData({
      text:        item.text        ?? "",
      label:       item.label       ?? "EN DIRECT",
      url:         item.url         ?? "",
      active:      item.active      ?? true,
      sort_order:  item.sort_order  ?? 0,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await updateTickerItem(editId, formData);
      else await createTickerItem(formData);
      setShowModal(false);
      fetchItems();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet élément ?")) return;
    try { await deleteTickerItem(id); fetchItems(); }
    catch { alert("Erreur lors de la suppression"); }
  };

  const toggleActive = async (item) => {
    try {
      await updateTickerItem(item.id, { active: !item.active });
      fetchItems();
    } catch { console.error("Error updating status"); }
  };

  const moveOrder = async (item, dir) => {
    try {
      await updateTickerItem(item.id, { sort_order: item.sort_order + dir });
      fetchItems();
    } catch { console.error("Error moving order"); }
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
        .admin-badge {
          padding: 4px 10px; borderRadius: 100px; fontSize: 10px; fontWeight: 800;
          textTransform: uppercase; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary};
        }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 5000; padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 600px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { 
          width: 100%; padding: 14px 18px; border-radius: 12px; 
          background: ${surface}; border: 1px solid ${border}; 
          color: ${textPrimary}; outline: none; transition: all 0.25s ease;
        }
        .form-input:focus { border-color: ${accent}; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title"><FiRadio style={{ marginRight: 10, verticalAlign: "middle" }} />Ticker Live</h1>
            </div>
            <button className="admin-btn-primary" onClick={openAdd}><FiPlus /> Ajouter</button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ordre</th>
                  <th>Badge</th>
                  <th>Texte</th>
                  <th>Statut</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 40 }}>Aucun élément trouvé</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: 100 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <button className="btn-icon" style={{ width: 24, height: 24 }} onClick={() => moveOrder(item, -1)}><FiArrowUp size={12} /></button>
                        <span style={{ fontWeight: 800 }}>{item.sort_order}</span>
                        <button className="btn-icon" style={{ width: 24, height: 24 }} onClick={() => moveOrder(item, 1)}><FiArrowDown size={12} /></button>
                      </div>
                    </td>
                    <td><span className="admin-badge">{item.label}</span></td>
                    <td style={{ fontWeight: 700 }}>{item.text}</td>
                    <td>
                      <button onClick={() => toggleActive(item)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: textPrimary, padding: 0 }}>
                        {item.active ? <FiToggleRight size={24} /> : <FiToggleLeft size={24} />}
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{item.active ? "ACTIF" : "INACTIF"}</span>
                      </button>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => openEdit(item)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(item.id)}><FiTrash2 size={16} /></button>
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
              {editId ? "Modifier Ticker" : "Nouvel Élément"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Texte</label>
                <input className="form-input" value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Badge (ex: EN DIRECT)</label>
                <input className="form-input" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value.toUpperCase()})} />
              </div>
              <div className="form-group">
                <label className="form-label">URL de destination</label>
                <input className="form-input" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Ordre</label>
                  <input type="number" className="form-input" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Statut</label>
                  <select className="form-input" value={formData.active ? "1" : "0"} onChange={e => setFormData({...formData, active: e.target.value === "1"})}>
                    <option value="1">Actif</option>
                    <option value="0">Inactif</option>
                  </select>
                </div>
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
