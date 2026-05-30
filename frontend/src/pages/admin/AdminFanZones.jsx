import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiMapPin } from "react-icons/fi";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload.jsx";

const API = "http://localhost:8000/api/v1";
const FD  = "'Bebas Neue', sans-serif";
const FB  = "'DM Sans', sans-serif";

const EMPTY_FORM = {
  city_id:      "",
  zone_label:   "",
  image_url:    "",
  description:  "",
  location_url: "",
  capacity:     "",
};

export default function AdminFanZones() {
  const { darkMode } = useTheme();

  const [rows,    setRows]    = useState([]);
  const [cities,  setCities]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [editId,  setEditId]  = useState(null);
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [imgData, setImgData] = useState({ type: "url", value: "" });
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");

  /* ── theme ── */
  const bg      = darkMode ? "#0d0d0d" : "#ffffff";
  const card    = darkMode ? "#1c1c1c" : "#ffffff";
  const border  = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tp      = darkMode ? "#ffffff" : "#0d0d0d";
  const ts      = darkMode ? "rgba(255,255,255,0.5)"  : "rgba(0,0,0,0.45)";
  const surface = darkMode ? "#171717" : "#f5f5f5";
  const acc     = darkMode ? "#ffffff" : "#0d0d0d";
  const accC    = darkMode ? "#0d0d0d" : "#ffffff";

  /* ── fetch ── */
  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const [fzRes, cRes] = await Promise.all([
        axios.get(`${API}/fan-zones?per_page=-1`, { headers }),
        axios.get(`${API}/cities`, { headers }),
      ]);

      const fzData = fzRes.data?.data ?? fzRes.data;
      const cData  = cRes.data?.data ?? cRes.data;
      setRows(Array.isArray(fzData) ? fzData : []);
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
    setEditId(row.id);
    setForm({
      city_id:      row.city_id      || "",
      zone_label:   row.zone_label   || "",
      image_url:    row.image_url    || "",
      description:  row.description  || "",
      location_url: row.location_url || "",
      capacity:     row.capacity     || "",
    });
    setImgData({ type: "url", value: row.image_url || "" });
    setError("");
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette Fan Zone ?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/fan-zones/${id}`, {
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

    try {
      const token = localStorage.getItem("token");
      const isFile = imgData.type === "file" && imgData.value instanceof File;

      let payload;
      let headers;

      if (isFile) {
        payload = new FormData();
        payload.append("city_id",      parseInt(form.city_id));
        payload.append("zone_label",   form.zone_label);
        payload.append("description",  form.description);
        payload.append("location_url", form.location_url);
        payload.append("stadium_name", "Official Site");
        payload.append("capacity",     form.capacity);
        payload.append("matches_count",64);
        payload.append("address",      "Official Celebration Site");
        payload.append("status",       "active");
        payload.append("image_url",    imgData.value);
        if (editId) payload.append("_method", "PUT");
        headers = { Authorization: `Bearer ${token}` };
      } else {
        payload = {
          city_id:      parseInt(form.city_id),
          zone_label:   form.zone_label,
          image_url:    imgData.value || form.image_url,
          description:  form.description,
          location_url: form.location_url,
          stadium_name: "Official Site",
          capacity:     form.capacity,
          matches_count: 64,
          address:      "Official Celebration Site",
          status:       "active",
        };
        headers = { Authorization: `Bearer ${token}` };
      }

      if (editId && isFile) {
        // Use POST with _method=PUT for multipart
        await axios.post(`${API}/fan-zones/${editId}`, payload, { headers });
      } else if (editId) {
        await axios.put(`${API}/fan-zones/${editId}`, payload, { headers });
      } else {
        await axios.post(`${API}/fan-zones`, payload, { headers });
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

  /* ── city helper ── */
  const cityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city?.name || "N/A";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .afz-page   { background:${bg}; min-height:calc(100vh - 102px); padding:clamp(24px,5vw,48px); transition:background .3s; }
        .afz-inner  { max-width:1200px; margin:0 auto; }
        .afz-head   { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:40px; }
        .afz-title  { font-family:${FD}; font-size:clamp(32px,5vw,48px); font-weight:900; text-transform:uppercase; color:${tp}; margin:0; }

        /* Table */
        .afz-box    { background:${card}; border-radius:24px; overflow:hidden; border:1px solid ${border}; box-shadow:0 10px 30px rgba(0,0,0,.05); }
        .afz-table  { width:100%; border-collapse:collapse; }
        .afz-table th { font-family:${FB}; font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:${ts}; background:${surface}; padding:18px 24px; text-align:left; border-bottom:1px solid ${border}; }
        .afz-table td { font-family:${FB}; font-size:14px; color:${tp}; padding:20px 24px; border-bottom:1px solid ${border}; vertical-align:middle; }
        .afz-table tr:last-child td { border-bottom:none; }

        /* Img mini */
        .afz-img    { width:60px; height:40px; border-radius:8px; object-fit:cover; background:${surface}; display:block; }

        /* City label */
        .afz-city   { display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:13px; text-transform:uppercase; }

        .afz-badge {
          font-family: ${FB}; font-size: 11px; font-weight: 800;
          text-transform: uppercase; color: ${tp};
        }

        /* Buttons */
        .btn-ico   { width:36px; height:36px; border-radius:10px; border:1px solid ${border}; background:${surface}; color:${tp}; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:.2s; margin-right:6px; }
        .btn-ico:hover { background:${acc}; color:${accC}; }

        /* Modal */
        .afz-overlay { position:fixed; inset:0; background:rgba(0,0,0,.85); backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; z-index:5000; padding:20px; }
        .afz-modal   { background:${bg}; width:100%; max-width:640px; max-height:90vh; overflow-y:auto; border-radius:24px; padding:36px; border:1px solid ${border}; box-shadow:0 40px 100px rgba(0,0,0,.6); }

        /* Form */
        .afz-group  { margin-bottom:20px; }
        .afz-label  { display:block; font-family:${FB}; font-size:11px; font-weight:800; color:${ts}; margin-bottom:8px; letter-spacing:.06em; text-transform:uppercase; }
        .afz-input  { width:100%; padding:0 16px; height:50px; border-radius:12px; background:${surface}; border:1px solid ${border}; color:${tp}; font-family:${FB}; font-size:15px; outline:none; box-sizing:border-box; transition:.2s; }
        .afz-input:focus { border-color:${acc}; }
        select.afz-input {
          appearance: none !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(ts)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important; 
          background-position: right 18px center !important; 
          background-size: 18px !important; 
          padding-right: 48px !important; 
          cursor: pointer;
        }
        .afz-error  { background:#fee; color:#c00; border:1px solid #fcc; border-radius:10px; padding:12px 16px; margin-bottom:16px; font-size:13px; font-family:${FB}; }
        .btn-add   { display:inline-flex; align-items:center; gap:8px; padding:12px 24px; border-radius:12px; border:none; cursor:pointer; font-family:${FD}; font-size:13px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; background:${acc}; color:${accC}; transition:.2s; }
      `}</style>

      <div className="afz-page">
        <div className="afz-inner">
          {/* Header */}
          <div className="afz-head">
            <h1 className="afz-title">Fan Zones</h1>
            <button className="btn-add" onClick={openNew}>
              <FiPlus /> Ajouter une Fan Zone
            </button>
          </div>

          {/* Table */}
          <div className="afz-box">
            <table className="afz-table">
              <thead>
                <tr>
                  <th>Fan Zone</th>
                  <th>Ville</th>
                  <th>Capacité</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 48, color: ts }}>Chargement…</td></tr>
                ) : rows.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 48, color: ts }}>Aucune Fan Zone trouvée</td></tr>
                ) : rows.map(row => (
                  <tr key={row.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <img className="afz-img" src={imgSrc(row.image_url)} alt={row.zone_label}
                          onError={e => { e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800"; }} />
                        <span style={{ fontWeight: 800, fontSize: 15 }}>{row.zone_label}</span>
                      </div>
                    </td>
                    <td>
                      <span className="afz-city">
                        {cityName(row.city_id)}
                      </span>
                    </td>
                    <td>
                      <span className="afz-city" style={{ opacity: 0.8 }}>
                        {row.capacity || "—"}
                      </span>
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
        <div className="afz-overlay" onClick={() => setModal(false)}>
          <div className="afz-modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: FD, fontSize: 30, fontWeight: 900, textTransform: "uppercase", color: tp, marginBottom: 24 }}>
              {editId ? "Modifier Fan Zone" : "Nouvelle Fan Zone"}
            </h2>

            {error && <div className="afz-error">{error}</div>}

            <form onSubmit={handleSave}>
              {/* Zone Label */}
              <div className="afz-group">
                <label className="afz-label">Nom de la Fan Zone</label>
                <input className="afz-input" required
                  value={form.zone_label}
                  onChange={e => setForm(f => ({ ...f, zone_label: e.target.value }))}
                  placeholder="ex: FIFA Fan Festival NY" />
              </div>

              {/* City */}
              <div className="afz-group">
                <label className="afz-label">Ville</label>
                <select className="afz-input" required
                  value={form.city_id}
                  onChange={e => setForm(f => ({ ...f, city_id: e.target.value }))}>
                  <option value="">Sélectionner une ville</option>
                  {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {/* Capacity */}
              <div className="afz-group">
                <label className="afz-label">Capacité</label>
                <input className="afz-input"
                  value={form.capacity}
                  onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
                  placeholder="ex: 10000" />
              </div>

              {/* Image */}
              <ImageUpload
                label="Image de la Zone"
                defaultValue={form.image_url}
                onChange={setImgData}
                darkMode={darkMode}
                folder="fan_zones"
              />
              
              {/* Description */}
              <div className="afz-group">
                <label className="afz-label">Description</label>
                <textarea className="afz-input" 
                  style={{ height: "auto", minHeight: 100, padding: "12px 16px" }}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Description de la Fan Zone..." />
              </div>

              {/* Location URL */}
              <div className="afz-group">
                <label className="afz-label">URL de Localisation (Google Maps)</label>
                <input className="afz-input"
                  value={form.location_url}
                  onChange={e => setForm(f => ({ ...f, location_url: e.target.value }))}
                  placeholder="https://goo.gl/maps/..." />
              </div>

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