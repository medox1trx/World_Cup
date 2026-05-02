import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  FiPlus, FiTrash2, FiEdit2, FiRadio, FiToggleLeft, FiToggleRight,
  FiLink, FiArrowUp, FiArrowDown
} from "react-icons/fi";
import {
  adminGetTicker, createTickerItem, updateTickerItem, deleteTickerItem
} from "../../services/api";
import toast from "react-hot-toast";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

const BLANK = {
  text: "",
  label: "EN DIRECT",
  label_color: "#c8102e",
  url: "",
  active: true,
  sort_order: 0,
};

const BADGE_PRESETS = [
  { label: "EN DIRECT",  color: "#c8102e" },
];

export default function AdminTicker() {
  const { darkMode } = useTheme();
  const [items,     setItems]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [formData,  setFormData]  = useState(BLANK);

  /* ── theme tokens ── */
  const bg           = darkMode ? "#0d0d0d"                : "#f8f8f8";
  const card         = darkMode ? "#1c1c1c"                : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                : "#0d0d0d";
  const textSec      = darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  const surface      = darkMode ? "#171717"                : "#f5f5f5";
  const accent       = darkMode ? "#ffffff"                : "#0d0d0d";
  const accentC      = darkMode ? "#0d0d0d"                : "#ffffff";

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await adminGetTicker();
      setItems(Array.isArray(data) ? data : []);
    } catch { toast.error("Impossible de charger les éléments."); }
    finally  { setLoading(false); }
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
      label:       item.label       ?? "En Direct",
      label_color: item.label_color ?? "#c8102e",
      url:         item.url         ?? "",
      active:      item.active      ?? true,
      sort_order:  item.sort_order  ?? 0,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, url: formData.url || null };
    try {
      if (editId) { await updateTickerItem(editId, payload); toast.success("Mise à jour réussie"); }
      else        { await createTickerItem(payload);          toast.success("Élément ajouté");     }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      const msg = err.errors ? Object.values(err.errors).flat().join("\n") : (err.message || "Erreur");
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet élément ?")) return;
    try { await deleteTickerItem(id); toast.success("Supprimé"); fetchItems(); }
    catch { toast.error("Erreur lors de la suppression"); }
  };

  const toggleActive = async (item) => {
    try {
      await updateTickerItem(item.id, { active: !item.active });
      fetchItems();
    } catch { toast.error("Erreur de mise à jour"); }
  };

  const moveOrder = async (item, dir) => {
    const newOrder = item.sort_order + dir;
    try {
      await updateTickerItem(item.id, { sort_order: newOrder });
      fetchItems();
    } catch { toast.error("Erreur de réordonnancement"); }
  };

  /* ── live preview ticker ── */
  const activeItems = items.filter(i => i.active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');

        .at-page { background:${bg}; min-height:calc(100vh - 102px); padding:clamp(24px,5vw,48px); transition:background 0.3s; }
        .at-inner { max-width:1100px; margin:0 auto; }
        .at-hdr   { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:36px; flex-wrap:wrap; gap:16px; }
        .at-title { font-family:${FD}; font-size:clamp(28px,5vw,44px); font-weight:900; letter-spacing:.02em; text-transform:uppercase; color:${textPrimary}; margin:0; }
        .at-sub   { font-family:${FB}; font-size:14px; color:${textSec}; margin:4px 0 0; }

        /* Preview ticker */
        .ticker-preview {
          display:flex; align-items:center; height:44px; gap:14px;
          background:${darkMode?"#0a0a0a":"#f5f5f5"};
          border:1px solid ${border}; border-radius:12px;
          padding:0 20px; margin-bottom:32px; overflow:hidden;
        }
        .ticker-badge {
          display:flex; align-items:center; gap:6px;
          flex-shrink:0;
        }

        /* Table */
        .at-table-wrap { background:${card}; border-radius:20px; overflow:hidden; border:1px solid ${border}; box-shadow:0 8px 24px rgba(0,0,0,0.05); }
        .at-table { width:100%; border-collapse:collapse; }
        .at-table th { font-family:${FB}; font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:${textSec}; background:${surface}; padding:16px 20px; text-align:left; border-bottom:1px solid ${border}; }
        .at-table td { font-family:${FB}; font-size:14px; color:${textPrimary}; padding:18px 20px; border-bottom:1px solid ${border}; vertical-align:middle; }
        .at-table tr:last-child td { border-bottom:none; }
        .at-table tr:hover td { background:${darkMode?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.01)"}; }

        /* Buttons */
        .btn-primary { display:inline-flex; align-items:center; gap:8px; padding:12px 22px; border-radius:12px; border:none; cursor:pointer; font-family:${FD}; font-size:13px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; background:${accent}; color:${accentC}; transition:transform .2s, opacity .2s; }
        .btn-primary:active { transform:scale(0.96); }
        .btn-icon { width:34px; height:34px; border-radius:8px; border:1px solid ${border}; background:${surface}; color:${textPrimary}; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:.2s; margin-right:6px; }
        .btn-icon:hover { background:${accent}; color:${accentC}; border-color:${accent}; }
        .btn-icon.del:hover { background:#ef4444; color:#fff; border-color:#ef4444; }
        .btn-icon.sm { width:28px; height:28px; border-radius:6px; margin-right:3px; }

        /* Modal */
        .mod-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; z-index:5000; padding:20px; }
        .mod-box { background:${darkMode?"#111":"#fff"}; width:100%; max-width:640px; border-radius:24px; padding:clamp(24px,4vw,36px); border:1px solid ${border}; box-shadow:0 40px 100px rgba(0,0,0,0.5); position:relative; max-height:95vh; overflow-y:auto; }
        .fg { margin-bottom:18px; }
        .fl { display:block; font-family:${FB}; font-size:11px; font-weight:700; color:${textSec}; margin-bottom:7px; text-transform:uppercase; }
        .fi { width:100%; padding:12px 16px; border-radius:10px; background:${surface}; border:1px solid ${border}; color:${textPrimary}; font-family:${FB}; font-size:15px; outline:none; box-sizing:border-box; }
        .fi:focus { border-color:#c8102e; }
        .presets { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
        .preset-btn { 
          padding:6px 14px; border-radius:8px; border:1px solid ${border}; 
          background:transparent; cursor:pointer; font-family:${FB}; font-size:11px; 
          font-weight:700; transition:.2s; display:flex; align-items:center; gap:6px;
          color:${textPrimary};
        }
        .preset-btn:hover { background:${surface}; }
      `}</style>

      <div className="at-page">
        <div className="at-inner">

          {/* Header */}
          <div className="at-hdr">
            <div>
              <h1 className="at-title"><FiRadio style={{ marginRight: 10, verticalAlign: "middle" }} />Bandeau Ticker</h1>
              <p className="at-sub">{items.length} éléments · {activeItems.length} actifs — gestion du fil d'actualités en direct</p>
            </div>
            <button className="btn-primary" onClick={openAdd}><FiPlus size={16} /> Ajouter</button>
          </div>

          {/* Live Preview */}
          {activeItems.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, color: textSec, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>
                Aperçu en direct
              </p>
              <div className="ticker-preview">
                <div className="ticker-badge">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c8102e", flexShrink: 0 }} />
                  <span style={{ color: "#c8102e", fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", fontFamily: FB, whiteSpace: "nowrap" }}>
                    EN DIRECT
                  </span>
                </div>
                <div style={{ width: 1, height: 16, background: border, flexShrink: 0 }} />
                <p style={{ flex: 1, color: textSec, fontSize: 12, fontFamily: FB, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", margin: 0 }}>
                  {activeItems[0].text}
                </p>
                <span style={{ fontFamily: FB, fontSize: 11, color: textSec, flexShrink: 0 }}>+{activeItems.length - 1} autres</span>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="at-table-wrap">
            <table className="at-table">
              <thead>
                <tr>
                  <th>Ordre</th>
                  <th>Badge</th>
                  <th>Texte</th>
                  <th>Lien</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40, color: textSec }}>Chargement...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40, color: textSec }}>Aucun élément. Cliquez "Ajouter" pour commencer.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id} style={{ opacity: item.active ? 1 : 0.5 }}>

                    {/* Sort order */}
                    <td style={{ width: 80 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <button className="btn-icon sm" onClick={() => moveOrder(item, -1)} title="Monter"><FiArrowUp size={12} /></button>
                        <span style={{ fontSize: 12, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.sort_order}</span>
                        <button className="btn-icon sm" onClick={() => moveOrder(item, 1)} title="Descendre"><FiArrowDown size={12} /></button>
                      </div>
                    </td>

                    {/* Badge */}
                    <td>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        color: "#c8102e",
                        fontSize: 12, fontWeight: 700, letterSpacing: ".02em",
                        textTransform: "uppercase", fontFamily: FB,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c8102e", flexShrink: 0 }} />
                        EN DIRECT
                      </span>
                    </td>

                    {/* Text */}
                    <td style={{ maxWidth: 360 }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600 }}>
                        {item.text}
                      </span>
                    </td>

                    {/* URL */}
                    <td>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          style={{ color: "#3b82f6", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <FiLink size={12} /> Lien
                        </a>
                      ) : (
                        <span style={{ color: textSec, fontSize: 12 }}>—</span>
                      )}
                    </td>

                    {/* Active toggle */}
                    <td>
                      <button onClick={() => toggleActive(item)}
                        style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, color: item.active ? "#22c55e" : textSec, fontFamily: FB, fontSize: 12, fontWeight: 700, padding: 0 }}>
                        {item.active ? <FiToggleRight size={20} /> : <FiToggleLeft size={20} />}
                        {item.active ? "Actif" : "Inactif"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td>
                      <button className="btn-icon" onClick={() => openEdit(item)} title="Modifier"><FiEdit2 size={14} /></button>
                      <button className="btn-icon del" onClick={() => handleDelete(item.id)} title="Supprimer"><FiTrash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="mod-overlay" onClick={() => setShowModal(false)}>
          <div className="mod-box" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: FD, fontSize: 28, fontWeight: 900, textTransform: "uppercase", marginBottom: 28, color: textPrimary }}>
              {editId ? "Modifier l'élément" : "Nouvel élément"}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Text */}
              <div className="fg">
                <label className="fl">Texte du ticker *</label>
                <input className="fi" required value={formData.text}
                  onChange={e => setFormData({...formData, text: e.target.value})}
                  placeholder="Tirage au sort FIFA 2026 : groupes confirmés..." />
              </div>



              {/* URL */}
              <div className="fg">
                <label className="fl">Lien (optionnel)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FiLink size={14} style={{ color: textSec, flexShrink: 0 }} />
                  <input className="fi" type="url" value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    placeholder="https://example.com/article" style={{ flex: 1 }} />
                </div>
              </div>

              {/* Sort order + Active */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="fg">
                  <label className="fl">Ordre d'affichage</label>
                  <input className="fi" type="number" value={formData.sort_order}
                    onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} />
                </div>
                <div className="fg">
                  <label className="fl">Statut</label>
                  <select className="fi" value={formData.active ? "1" : "0"}
                    onChange={e => setFormData({...formData, active: e.target.value === "1"})}>
                    <option value="1">Actif</option>
                    <option value="0">Inactif</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {editId ? "Mettre à jour" : "Créer"}
                </button>
                <button type="button" className="btn-primary"
                  style={{ background: surface, color: textPrimary, border: `1px solid ${border}` }}
                  onClick={() => setShowModal(false)}>
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
