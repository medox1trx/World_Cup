import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  FiPlus, FiTrash2, FiEdit2, FiStar, FiCheck, FiImage, FiSettings, FiArrowRight, FiToggleLeft, FiToggleRight, FiMenu
} from "react-icons/fi";
import {
  getHospitalities, createHospitality, updateHospitality, deleteHospitality
} from "../../services/api";
import toast from "react-hot-toast";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

const BLANK = {
  tier: "",
  price: "",
  badge: "",
  is_featured: false,
  description: "",
  perks: [],
  cta_text: "Réserver",
  image_url: "",
  sort_order: 0,
  is_active: true,
};

export default function AdminHospitality() {
  const { darkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(BLANK);
  const [newPerk, setNewPerk] = useState("");

  /* ── theme tokens ── */
  const bg = darkMode ? "#0d0d0d" : "#f8f8f8";
  const card = darkMode ? "#1c1c1c" : "#ffffff";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSec = darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  const surface = darkMode ? "#171717" : "#f5f5f5";
  const accent = darkMode ? "#ef4444" : "#c8102e";

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getHospitalities();
      setItems(data);
    } catch { toast.error("Impossible de charger les hospitalités."); }
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
      tier: item.tier,
      price: item.price,
      badge: item.badge || "",
      is_featured: !!item.is_featured,
      description: item.description || "",
      perks: Array.isArray(item.perks) ? item.perks : [],
      cta_text: item.cta_text || "Réserver",
      image_url: item.image_url || "",
      sort_order: item.sort_order || 0,
      is_active: !!item.is_active,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateHospitality(editId, formData);
        toast.success("Mis à jour avec succès");
      } else {
        await createHospitality(formData);
        toast.success("Package créé avec succès");
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Une erreur est survenue");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce package ?")) return;
    try {
      await deleteHospitality(id);
      toast.success("Supprimé");
      fetchItems();
    } catch { toast.error("Erreur lors de la suppression"); }
  };

  const addPerk = () => {
    if (!newPerk.trim()) return;
    setFormData({ ...formData, perks: [...formData.perks, newPerk.trim()] });
    setNewPerk("");
  };

  const removePerk = (index) => {
    const next = [...formData.perks];
    next.splice(index, 1);
    setFormData({ ...formData, perks: next });
  };

  return (
    <>
      <style>{`
        .ah-page { background: ${bg}; min-height: calc(100vh - 102px); padding: clamp(24px, 5vw, 48px); transition: background 0.3s; }
        .ah-inner { max-width: 1200px; margin: 0 auto; }
        .ah-hdr { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .ah-title { font-family: ${FD}; font-size: clamp(32px, 5vw, 48px); font-weight: 900; letter-spacing: 0.02em; text-transform: uppercase; color: ${textPrimary}; margin: 0; }
        .ah-sub { font-family: ${FB}; font-size: 14px; color: ${textSec}; margin: 4px 0 0; }

        .mgmt-card { background: ${card}; border-radius: 20px; overflow: hidden; border: 1px solid ${border}; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .mgmt-table { width: 100%; border-collapse: collapse; }
        .mgmt-table th { font-family: ${FB}; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: ${textSec}; background: ${surface}; padding: 18px 24px; text-align: left; border-bottom: 1px solid ${border}; }
        .mgmt-table td { font-family: ${FB}; font-size: 14px; color: ${textPrimary}; padding: 20px 24px; border-bottom: 1px solid ${border}; vertical-align: middle; }
        .mgmt-table tr:hover td { background: ${darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"}; }

        .badge-ui { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${accent}; }
        .badge-ui::before { content:''; width:6px; height:6px; border-radius:50%; background:${accent}; }

        .btn-plus { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 12px; border: none; cursor: pointer; font-family: ${FD}; font-size: 13px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; background: ${textPrimary}; color: ${darkMode ? "#000" : "#fff"}; transition: transform 0.2s, opacity 0.2s; }
        .btn-plus:active { transform: scale(0.96); }

        .btn-icon { width: 36px; height: 36px; border-radius: 10px; border: 1px solid ${border}; background: ${surface}; color: ${textPrimary}; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: 0.2s; margin-right: 8px; }
        .btn-icon:hover { background: ${textPrimary}; color: ${darkMode ? "#000" : "#fff"}; border-color: ${textPrimary}; }
        .btn-icon.del:hover { background: #ef4444; color: white; border-color: #ef4444; }

        .mod-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 5000; padding: 20px; }
        .mod-box { background: ${card}; width: 100%; max-width: 900px; border-radius: 24px; padding: clamp(24px, 4vw, 40px); border: 1px solid ${border}; box-shadow: 0 40px 100px rgba(0,0,0,0.5); position: relative; max-height: 95vh; overflow-y: auto; display: grid; grid-template-columns: 1fr 320px; gap: 40px; }
        @media(max-width: 850px) { .mod-box { grid-template-columns: 1fr; } }
        
        .fg { margin-bottom: 20px; }
        .fl { display: block; font-family: ${FB}; font-size: 11px; font-weight: 700; color: ${textSec}; margin-bottom: 8px; text-transform: uppercase; }
        .fi { width: 100%; padding: 14px; border-radius: 12px; background: ${surface}; border: 1px solid ${border}; color: ${textPrimary}; font-family: ${FB}; font-size: 14px; outline: none; }
        .fi:focus { border-color: ${accent}; }
        
        .perk-tag { display: inline-flex; align-items: center; gap: 8px; background: ${surface}; border: 1px solid ${border}; padding: 6px 12px; border-radius: 8px; font-size: 12px; color: ${textPrimary}; margin: 0 8px 8px 0; }
        .perk-tag button { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 14px; display: flex; align-items: center; }

        .preview-card { background: ${darkMode ? "#111" : "#fcfcfc"}; border: 1px solid ${border}; border-radius: 16px; overflow: hidden; height: fit-content; position: sticky; top: 0; }
        .preview-img { width: 100%; height: 160px; object-fit: cover; background: ${surface}; }
        .preview-body { padding: 20px; }
      `}</style>

      <div className="ah-page">
        <div className="ah-inner">
          <div className="ah-hdr">
            <div>
              <h1 className="ah-title">Hospitalité</h1>
              <p className="ah-sub">Gestion des offres et packages VIP de la Coupe du Monde</p>
            </div>
            <button className="btn-plus" onClick={openAdd}><FiPlus size={16} /> Ajouter un package</button>
          </div>

          <div className="mgmt-card">
            <table className="mgmt-table">
              <thead>
                <tr>
                  <th>Ordre</th>
                  <th>Image</th>
                  <th>Tier / Offre</th>
                  <th>Prix</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 60, color: textSec }}>Chargement des offres...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 60, color: textSec }}>Aucune offre configurée.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id} style={{ opacity: item.is_active ? 1 : 0.5 }}>
                    <td style={{ width: 80, fontWeight: 800 }}>#{item.sort_order}</td>
                    <td style={{ width: 100 }}>
                      <img src={item.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 6 }} alt="" />
                    </td>
                    <td>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{item.tier}</div>
                      {item.is_featured && <span className="badge-ui" style={{ fontSize: 9, marginTop: 4 }}>Featured</span>}
                    </td>
                    <td style={{ fontFamily: FD, fontWeight: 700, fontSize: 16 }}>{item.price} €</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, color: item.is_active ? "#22c55e" : textSec, fontWeight: 700, fontSize: 12 }}>
                        {item.is_active ? <FiToggleRight size={20} /> : <FiToggleLeft size={20} />}
                        {item.is_active ? "Actif" : "Inactif"}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <button className="btn-icon" onClick={() => openEdit(item)}><FiEdit2 size={16} /></button>
                        <button className="btn-icon del" onClick={() => handleDelete(item.id)}><FiTrash2 size={16} /></button>
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
        <div className="mod-overlay" onClick={() => setShowModal(false)}>
          <div className="mod-box" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: FD, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 30, color: textPrimary }}>
                {editId ? "Modifier l'offre" : "Nouvelle offre hospitality"}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="fg">
                  <label className="fl">Nom de l'offre / Tier *</label>
                  <input className="fi" required value={formData.tier} onChange={e => setFormData({ ...formData, tier: e.target.value })} placeholder="ex: Business" />
                </div>
                <div className="fg">
                  <label className="fl">Prix (€) *</label>
                  <input className="fi" required type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="ex: 2 500" />
                </div>
              </div>

              <div className="fg">
                <label className="fl">Description</label>
                <textarea className="fi" style={{ minHeight: 80, resize: "vertical" }} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Résumé de l'offre..." />
              </div>

              <div className="fg">
                <label className="fl">URL de l'image</label>
                <input className="fi" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." />
              </div>

              <div className="fg">
                <label className="fl">Avantages (Perks)</label>
                <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
                  <input className="fi" style={{ flex: 1 }} value={newPerk} onChange={e => setNewPerk(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addPerk())} placeholder="Ajouter un avantage..." />
                  <button type="button" className="btn-icon" style={{ height: 46, width: 46, borderRadius: 12 }} onClick={addPerk}><FiPlus /></button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {formData.perks.map((p, i) => (
                    <div key={i} className="perk-tag">
                      {p} <button type="button" onClick={() => removePerk(i)}>&times;</button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="fg">
                  <label className="fl">Badge Spécial (optionnel)</label>
                  <input className="fi" value={formData.badge} onChange={e => setFormData({ ...formData, badge: e.target.value })} placeholder="ex: Le plus populaire" />
                </div>
                <div className="fg">
                  <label className="fl">Texte du bouton</label>
                  <input className="fi" value={formData.cta_text} onChange={e => setFormData({ ...formData, cta_text: e.target.value })} placeholder="Réserver" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                <div className="fg">
                   <label className="fl">Ordre</label>
                   <input className="fi" type="number" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="fg">
                   <label className="fl">Featured</label>
                   <select className="fi" value={formData.is_featured ? "1" : "0"} onChange={e => setFormData({ ...formData, is_featured: e.target.value === "1" })}>
                     <option value="1">Oui</option>
                     <option value="0">Non</option>
                   </select>
                </div>
                <div className="fg">
                   <label className="fl">Statut</label>
                   <select className="fi" value={formData.is_active ? "1" : "0"} onChange={e => setFormData({ ...formData, is_active: e.target.value === "1" })}>
                     <option value="1">Actif</option>
                     <option value="0">Inactif</option>
                   </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button type="submit" className="btn-plus" style={{ flex: 1, justifyContent: "center" }}>Sauvegarder</button>
                <button type="button" className="btn-plus" style={{ background: surface, color: textPrimary, border: `1px solid ${border}` }} onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>

            <div className="preview-side">
              <h3 className="fl">Aperçu direct</h3>
              <div className="preview-card">
                <img src={formData.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} className="preview-img" alt="" />
                <div className="preview-body">
                  {formData.badge && <div className="badge-ui" style={{ fontSize: 9, marginBottom: 8 }}>{formData.badge}</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
                    <h4 style={{ fontFamily: FD, fontSize: 24, fontWeight: 900, textTransform: "uppercase", margin: 0 }}>{formData.tier || "Package Tier"}</h4>
                    <span style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: accent }}>{formData.price || "0"} €</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                    {formData.perks.slice(0, 3).map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: textSec }}>
                        <FiCheck size={14} color="#22c55e" /> {p}
                      </div>
                    ))}
                    {formData.perks.length > 3 && <div style={{ fontSize: 11, color: textSec, fontStyle: "italic", marginLeft: 22 }}>+{formData.perks.length - 3} autres...</div>}
                  </div>
                  <div style={{ width: "100%", padding: "12px", borderRadius: 8, background: accent, color: "white", textAlign: "center", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {formData.cta_text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
