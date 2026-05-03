import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { getReferees, createReferee, updateReferee, deleteReferee, getPays, getImageUrl } from "../../services/api";
import { FiPlus, FiEdit2, FiTrash2, FiCamera } from "react-icons/fi";
import ImageUpload from "../../components/ImageUpload";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

const ROLES = [
  { value: "central",           label: "Arbitre central" },
  { value: "assistant_1",       label: "Assistant 1" },
  { value: "assistant_2",       label: "Assistant 2" },
  { value: "fourth",            label: "4e arbitre" },
  { value: "var",               label: "VAR" },
  { value: "avar",              label: "AVAR" },
  { value: "reserve",           label: "Arbitre réserve" },
  { value: "delegate",          label: "Délégué de match" },
  { value: "commissioner",      label: "Commissaire de match" },
];

const BADGES = [
  { value: "international", label: "International" },
  { value: "elite",         label: "Élite" },
];

export default function AdminReferees() {
  const { darkMode } = useTheme();
  const [referees, setReferees] = useState([]);
  const [pays, setPays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageData, setImageData] = useState({ type: 'url', value: '' });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    nationality: "",
    nationality_code: "",
    role: "central",
    age: "",
    experience_years: "",
    matches_officiated: "",
    fifa_badge: "international",
    notes: ""
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
      const [rData, pData] = await Promise.all([getReferees(), getPays()]);
      const fetchedReferees = rData?.data || rData;
      const fetchedPays = pData?.data || pData;
      setReferees(Array.isArray(fetchedReferees) ? fetchedReferees : []);
      setPays(Array.isArray(fetchedPays) ? fetchedPays : []);
    } catch (err) {
      console.error("Error fetching referees:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      first_name: "",
      last_name: "",
      nationality: "",
      nationality_code: "",
      role: "central",
      age: "",
      experience_years: "",
      matches_officiated: "",
      fifa_badge: "international",
      notes: ""
    });
    setImageData({ type: 'url', value: '' });
  };

  const handleEdit = (r) => {
    setEditId(r.id);
    setFormData({
      first_name: r.first_name || "",
      last_name: r.last_name || "",
      nationality: r.nationality || "",
      nationality_code: r.nationality_code || "",
      role: r.role || "central",
      age: r.age || "",
      experience_years: r.experience_years || "",
      matches_officiated: r.matches_officiated || "",
      fifa_badge: r.fifa_badge || "international",
      notes: r.notes || ""
    });
    setImageData({ type: 'url', value: r.photo_url || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet arbitre ?")) return;
    try {
      await deleteReferee(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFile = imageData.type === 'file' && imageData.value;
    let payload;

    if (isFile) {
      payload = new FormData();
      Object.keys(formData).forEach(key => payload.append(key, formData[key]));
      payload.append("photo", imageData.value);
      if (editId) payload.append("_method", "PUT");
    } else {
      payload = { ...formData, photo: imageData.value };
    }

    try {
      if (editId) await updateReferee(editId, payload);
      else await createReferee(payload);
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <>
      <style>{`
        .admin-page { background: ${bg}; min-height: 100vh; padding: 40px 20px; }
        .admin-inner { max-width: 1200px; margin: 0 auto; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .admin-title { font-family: ${FD}; font-size: 48px; font-weight: 900; color: ${textPrimary}; text-transform: uppercase; margin: 0; }
        .admin-table-container { background: ${card}; border-radius: 24px; border: 1px solid ${border}; overflow: hidden; }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { background: ${surface}; padding: 18px 24px; text-align: left; font-family: ${FB}; font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${textSecondary}; letter-spacing: 0.1em; }
        .admin-table td { padding: 16px 24px; border-bottom: 1px solid ${border}; font-family: ${FB}; color: ${textPrimary}; }
        .admin-btn-primary { 
          background: ${accent}; color: ${accentContrast}; border: none; padding: 12px 24px; border-radius: 12px;
          font-family: ${FD}; font-size: 14px; font-weight: 800; text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; gap: 8px; transition: 0.2s;
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
          display: flex; align-items: center; justify-content: center; z-index: 5000; padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 700px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          max-height: 90vh; overflow-y: auto;
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
        .form-input:focus { border-color: ${accent}; background-color: ${card}; }
        .admin-badge {
          padding: 4px 10px; border-radius: 100px; font-size: 10px; font-weight: 800;
          text-transform: uppercase; border: 1px solid ${border}; background: ${surface}; color: ${textPrimary};
        }
        .ref-img-mini { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; background: ${surface}; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div><h1 className="admin-title">Arbitres</h1></div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter un arbitre
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Arbitre</th>
                  <th>Nation</th>
                  <th>Rôle</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : referees.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 40 }}>Aucun arbitre trouvé</td></tr>
                ) : referees.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img 
                          className="ref-img-mini" 
                          src={r.photo_url ? getImageUrl(r.photo_url) : `https://ui-avatars.com/api/?name=${encodeURIComponent(r.first_name + " " + r.last_name)}&background=222222&color=ffffff&size=128`} 
                          alt={r.first_name} 
                        />
                        <span style={{ fontWeight: 800, fontSize: 16 }}>{r.first_name} {r.last_name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {r.nationality_code && <img src={`https://flagcdn.com/w40/${r.nationality_code.toLowerCase()}.png`} width="24" style={{ borderRadius: 3 }} alt="" />}
                        <span style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase" }}>{r.nationality}</span>
                      </div>
                    </td>
                    <td><span className="admin-badge">{r.role}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => handleEdit(r)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(r.id)}><FiTrash2 size={16} /></button>
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
              {editId ? "Modifier Arbitre" : "Nouvel Arbitre"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Prénom</label>
                  <input className="form-input" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input className="form-input" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nationalité</label>
                <select className="form-input" value={formData.nationality} onChange={e => {
                  const p = pays.find(x => (x.name || x.nom) === e.target.value);
                  setFormData({...formData, nationality: e.target.value, nationality_code: p?.code || ""});
                }} required>
                  <option value="">Sélectionner un pays...</option>
                  {pays.map(p => <option key={p.id} value={p.name || p.nom}>{p.name || p.nom}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Rôle</label>
                <select className="form-input" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Photo</label>
                <ImageUpload value={imageData} onChange={setImageData} folder="referees" />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
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
