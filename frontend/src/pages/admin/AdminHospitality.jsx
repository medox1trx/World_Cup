import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiMapPin } from "react-icons/fi";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload.jsx";

const API = "http://localhost:8000/api";
const FD  = "'Bebas Neue', sans-serif";
const FB  = "'DM Sans', sans-serif";

const PRESETS = [
  "MATCH UNIQUE",
  "SÉRIE PAR STADE",
  "SUIVRE MON ÉQUIPE",
  "ACCÈS PLATINUM",
  "HÉBERGEMENT",
];

const EMPTY_FORM = {
  tier:        "",
  description: "",
  badge:       "",
  price:       "",
  perks:       "",   // newline-separated text
  image_url:   "",
};

export default function AdminHospitality() {
  const { darkMode } = useTheme();

  const [rows,      setRows]      = useState([]);
  const [cities,    setCities]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [modal,     setModal]     = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [imgData,   setImgData]   = useState({ type: "url", value: "" });
  const [saving,    setSaving]    = useState(false);
  const [error,     setError]     = useState("");

  /* ── theme ── */
  const bg      = darkMode ? "#0d0d0d" : "#ffffff";
  const card    = darkMode ? "#1c1c1c" : "#ffffff";
  const border  = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tp      = darkMode ? "#ffffff" : "#0d0d0d";
  const ts      = darkMode ? "rgba(255,255,255,0.5)"  : "rgba(0,0,0,0.45)";
  const surface = darkMode ? "#171717" : "#f5f5f5";
  const acc     = darkMode ? "#ffffff" : "#0d0d0d";
  const accC    = darkMode ? "#0d0d0d" : "#ffffff";
  const red     = "#e60000";

  /* ── fetch ── */
  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const [hRes, cRes] = await Promise.all([
        axios.get(`${API}/hospitalities?per_page=-1`, { headers }),
        axios.get(`${API}/cities`, { headers }),
      ]);

      // Handle both paginated ({data:[...]}) and plain array responses
      const hData = hRes.data?.data ?? hRes.data;
      const cData = cRes.data?.data ?? cRes.data;
      setRows(Array.isArray(hData) ? hData : []);
      setCities(Array.isArray(cData) ? cData : []);
    } catch (e) {
      console.error(e);
      setError("Erreur de chargement");
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  /* ── helpers ── */
  const openNew = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setImgData({ type: "url", value: "" });
    setError("");
    setModal(true);
  };

  const openEdit = (row) => {
    const perksArr = Array.isArray(row.perks)
      ? row.perks
      : (typeof row.perks === "string" ? JSON.parse(row.perks || "[]") : []);
    setEditId(row.id);
    setForm({
      tier:        row.tier        || "",
      description: row.description || "",
      badge:       row.badge       || "",
      price:       row.price       || "",
      perks:       perksArr.join("\n"),
      image_url:   row.image_url   || "",
    });
    setImgData({ type: "url", value: row.image_url || "" });
    setError("");
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce package ?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/hospitalities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAll();
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const perksArr = form.perks.split("\n").map(l => l.trim()).filter(Boolean);

    try {
      const token = localStorage.getItem("token");
      const isFile = imgData.type === "file" && imgData.value instanceof File;

      let payload;
      let headers;

      if (isFile) {
        payload = new FormData();
        payload.append("tier",        form.tier);
        payload.append("description", form.description);
        payload.append("badge",       form.badge || "");
        payload.append("price",       parseFloat(form.price) || 0);
        payload.append("cta_text",    "Réserver");
        payload.append("is_active",   1);
        payload.append("sort_order",  0);
        payload.append("image_url",   imgData.value);
        perksArr.forEach((p) => payload.append("perks[]", p));
        if (editId) payload.append("_method", "PUT");
        headers = { Authorization: `Bearer ${token}` };
      } else {
        payload = {
          tier:        form.tier,
          description: form.description,
          badge:       form.badge || null,
          price:       parseFloat(form.price) || 0,
          perks:       perksArr,
          cta_text:    "Réserver",
          is_active:   true,
          sort_order:  0,
          image_url:   imgData.value || form.image_url,
        };
        headers = { Authorization: `Bearer ${token}` };
      }

      if (editId && isFile) {
        await axios.post(`${API}/hospitalities/${editId}`, payload, { headers });
      } else if (editId) {
        await axios.put(`${API}/hospitalities/${editId}`, payload, { headers });
      } else {
        await axios.post(`${API}/hospitalities`, payload, { headers });
      }

      setModal(false);
      fetchAll();
    } catch (err) {
      const msg = err.response?.data?.message
        || JSON.stringify(err.response?.data?.errors || {})
        || "Erreur d'enregistrement";
      setError(msg);
    }
    setSaving(false);
  };

  /* ── image util ── */
  const imgSrc = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    if (cleanPath.startsWith('storage/')) {
      return `http://localhost:8000/${cleanPath}`;
    }
    return `http://localhost:8000/storage/${cleanPath}`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .ah-page   { background:${bg}; min-height:calc(100vh - 102px); padding:clamp(24px,5vw,48px); transition:background .3s; }
        .ah-inner  { max-width:1200px; margin:0 auto; }
        .ah-head   { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:40px; }
        .ah-title  { font-family:${FD}; font-size:clamp(32px,5vw,48px); font-weight:900; text-transform:uppercase; color:${tp}; margin:0; }

        /* Table */
        .ah-box    { background:${card}; border-radius:24px; overflow:hidden; border:1px solid ${border}; box-shadow:0 10px 30px rgba(0,0,0,.05); }
        .ah-table  { width:100%; border-collapse:collapse; }
        .ah-table th { font-family:${FB}; font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:${ts}; background:${surface}; padding:18px 24px; text-align:left; border-bottom:1px solid ${border}; }
        .ah-table td { font-family:${FB}; font-size:14px; color:${tp}; padding:20px 24px; border-bottom:1px solid ${border}; vertical-align:middle; }
        .ah-table tr:last-child td { border-bottom:none; }

        /* Img mini */
        .ah-img    { width:60px; height:40px; border-radius:8px; object-fit:cover; background:${surface}; display:block; }

        /* Badge */
        .ah-badge  { display:inline-block; background:${red}; color:#fff; font-size:11px; font-weight:700; padding:3px 10px; border-radius:4px; }

        /* Buttons */
        .btn-add   { display:inline-flex; align-items:center; gap:8px; padding:12px 24px; border-radius:12px; border:none; cursor:pointer; font-family:${FD}; font-size:13px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; background:${acc}; color:${accC}; transition:.2s; }
        .btn-ico   { width:36px; height:36px; border-radius:10px; border:1px solid ${border}; background:${surface}; color:${tp}; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:.2s; margin-right:6px; }
        .btn-ico:hover { background:${acc}; color:${accC}; }

        /* Modal */
        .ah-overlay { position:fixed; inset:0; background:rgba(0,0,0,.85); backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; z-index:5000; padding:20px; }
        .ah-modal   { background:${bg}; width:100%; max-width:640px; max-height:90vh; overflow-y:auto; border-radius:24px; padding:36px; border:1px solid ${border}; box-shadow:0 40px 100px rgba(0,0,0,.6); }

        /* Form */
        .ah-group  { margin-bottom:20px; }
        .ah-label  { display:block; font-family:${FB}; font-size:11px; font-weight:800; color:${ts}; margin-bottom:8px; letter-spacing:.06em; text-transform:uppercase; }
        .ah-input  { width:100%; padding:0 16px; height:50px; border-radius:12px; background:${surface}; border:1px solid ${border}; color:${tp}; font-family:${FB}; font-size:15px; outline:none; box-sizing:border-box; transition:.2s; }
        .ah-textarea { width:100%; padding:14px 16px; border-radius:12px; background:${surface}; border:1px solid ${border}; color:${tp}; font-family:${FB}; font-size:14px; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; }
        .ah-input:focus, .ah-textarea:focus { border-color:${acc}; }
        .ah-hint   { font-size:11px; color:${ts}; margin-top:5px; }
        .ah-error  { background:#fee; color:#c00; border:1px solid #fcc; border-radius:10px; padding:12px 16px; margin-bottom:16px; font-size:13px; font-family:${FB}; }

        /* Preset chips */
        .ah-chips  { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:8px; }
        .ah-chip   { font-size:12px; font-weight:600; padding:5px 12px; border-radius:8px; border:1px solid ${border}; background:${surface}; color:${tp}; cursor:pointer; transition:.15s; font-family:${FB}; }
        .ah-chip:hover { background:${acc}; color:${accC}; border-color:${acc}; }

        /* Row actions */
        .desc-cell { max-width:260px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:${ts}; font-size:13px; }
      `}</style>

      <div className="ah-page">
        <div className="ah-inner">
          {/* Header */}
          <div className="ah-head">
            <h1 className="ah-title">Hospitalité</h1>
            <button className="btn-add" onClick={openNew}>
              <FiPlus /> Nouveau Package
            </button>
          </div>

          {/* Table */}
          <div className="ah-box">
            <table className="ah-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Description</th>
                  <th>Prix</th>
                  <th>Badge</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 48, color: ts }}>Chargement…</td></tr>
                ) : rows.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: 48, color: ts }}>Aucun package</td></tr>
                ) : rows.map(row => (
                  <tr key={row.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        {row.image_url && (
                          <img className="ah-img" src={imgSrc(row.image_url)} alt={row.tier}
                            onError={e => { e.target.style.display = "none"; }} />
                        )}
                        <span style={{ fontWeight: 800, fontSize: 15 }}>{row.tier}</span>
                      </div>
                    </td>
                    <td>
                      <span className="desc-cell">
                        {row.description || <em style={{ opacity: .5 }}>—</em>}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>
                      {row.price ? `${Number(row.price).toLocaleString("fr-FR")} $` : "—"}
                    </td>
                    <td>
                      {row.badge
                        ? <span className="ah-badge">{row.badge}</span>
                        : <span style={{ color: ts }}>—</span>}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-ico" title="Modifier" onClick={() => openEdit(row)}>
                        <FiEdit2 size={15} />
                      </button>
                      <button className="btn-ico" title="Supprimer" onClick={() => handleDelete(row.id)}>
                        <FiTrash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="ah-overlay" onClick={() => setModal(false)}>
          <div className="ah-modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: FD, fontSize: 30, fontWeight: 900, textTransform: "uppercase", color: tp, marginBottom: 24 }}>
              {editId ? "Modifier Package" : "Nouveau Package"}
            </h2>

            {error && <div className="ah-error">{error}</div>}

            <form onSubmit={handleSave}>
              {/* Tier */}
              <div className="ah-group">
                <label className="ah-label">Titre du package</label>
                <div className="ah-chips">
                  {PRESETS.map(p => (
                    <span key={p} className="ah-chip" onClick={() => setForm(f => ({ ...f, tier: p }))}>
                      {p}
                    </span>
                  ))}
                </div>
                <input className="ah-input" required
                  value={form.tier}
                  onChange={e => setForm(f => ({ ...f, tier: e.target.value }))}
                  placeholder="ex: MATCH UNIQUE" />
              </div>

              {/* Description */}
              <div className="ah-group">
                <label className="ah-label">Description</label>
                <textarea className="ah-textarea" rows={3}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Vivez le plus beau des sports sur la plus grande scène…" />
              </div>

              {/* Perks */}
              <div className="ah-group">
                <label className="ah-label">Points clés — 1 par ligne</label>
                <textarea className="ah-textarea" rows={5}
                  value={form.perks}
                  onChange={e => setForm(f => ({ ...f, perks: e.target.value }))}
                  placeholder={"Phase de groupes : 1 match au choix\nOptions d'hospitalité : VIP, Pavillon FIFA…"} />
                <p className="ah-hint">Chaque ligne devient une puce (•) sur la carte publique.</p>
              </div>

              {/* Badge + Price */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="ah-group">
                  <label className="ah-label">Badge (optionnel)</label>
                  <input className="ah-input"
                    value={form.badge}
                    onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                    placeholder="ex: Populaire" />
                  <p className="ah-hint">Affiché en rouge sur la carte.</p>
                </div>
                <div className="ah-group">
                  <label className="ah-label">Prix ($)</label>
                  <input className="ah-input" type="number" min="0"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="ex: 950" />
                </div>
              </div>

              {/* Image */}
              <ImageUpload
                label="Image du package"
                defaultValue={form.image_url}
                onChange={setImgData}
                darkMode={darkMode}
                folder="hospitalities"
              />

              {/* Buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button type="submit" className="btn-add" style={{ flex: 1, justifyContent: "center" }} disabled={saving}>
                  {saving ? "Enregistrement…" : "Sauvegarder"}
                </button>
                <button type="button" className="btn-add"
                  style={{ background: surface, color: tp, border: `1px solid ${border}` }}
                  onClick={() => setModal(false)}>
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
