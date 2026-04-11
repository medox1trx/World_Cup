import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { getReferees, createReferee, updateReferee, deleteReferee } from "../../services/api";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiFlag, FiUser, FiAward, FiShield } from "react-icons/fi";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

const ROLES = [
  { value: "main",      label: "Principal" },
  { value: "assistant",  label: "Assistant" },
  { value: "var",        label: "VAR" },
];

const BADGES = [
  { value: "international", label: "International" },
  { value: "elite",         label: "Élite" },
];

const EMPTY = {
  first_name: "", last_name: "", nationality: "", nationality_code: "",
  role: "main", age: "", experience_years: "", matches_officiated: "",
  photo_url: "", fifa_badge: "international", notes: "",
};

export default function AdminReferees() {
  const { darkMode } = useTheme();

  // theme tokens
  const bg             = darkMode ? "#0d0d0d"                : "#ffffff";
  const card           = darkMode ? "#1c1c1c"                : "#ffffff";
  const border         = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary    = darkMode ? "#ffffff"                : "#0d0d0d";
  const textSecondary  = darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  const textMuted      = darkMode ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)";
  const surface        = darkMode ? "#171717"                : "#f5f5f5";
  const accent         = "#c8102e";
  const inputBg        = darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const btnBg          = darkMode ? "#ffffff"                : "#0d0d0d";
  const btnText        = darkMode ? "#0d0d0d"                : "#ffffff";

  // state
  const [referees, setReferees] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState(null);
  const [toast, setToast]       = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const data = await getReferees();
      setReferees(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (r) => {
    setEditing(r);
    setForm({
      first_name:         r.first_name || "",
      last_name:          r.last_name || "",
      nationality:        r.nationality || "",
      nationality_code:   r.nationality_code || "",
      role:               r.role || "main",
      age:                r.age ?? "",
      experience_years:   r.experience_years ?? "",
      matches_officiated: r.matches_officiated ?? "",
      photo_url:          r.photo_url || "",
      fifa_badge:         r.fifa_badge || "international",
      notes:              r.notes || "",
    });
    setError(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.first_name.trim() || !form.last_name.trim() || !form.nationality.trim()) {
      setError("Prénom, nom et nationalité sont obligatoires.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        age:                form.age                ? Number(form.age)                : null,
        experience_years:   form.experience_years   ? Number(form.experience_years)   : null,
        matches_officiated: form.matches_officiated ? Number(form.matches_officiated) : null,
      };
      if (editing) {
        await updateReferee(editing.id, payload);
        flash("Arbitre mis à jour ✓");
      } else {
        await createReferee(payload);
        flash("Arbitre ajouté ✓");
      }
      setShowForm(false);
      fetchData();
    } catch (e) {
      setError(e.message || "Erreur lors de l'enregistrement.");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet arbitre ?")) return;
    try {
      await deleteReferee(id);
      flash("Arbitre supprimé ✓");
      fetchData();
    } catch (e) { console.error(e); }
  };

  const roleLabel = (role) => {
    const map = { main: "Principal", assistant: "Assistant", var: "VAR" };
    return map[role] || "—";
  };

  const badgeLabel = (badge) => {
    return badge === "elite" ? "Élite" : "International";
  };

  /* ── Input helper ── */
  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 8, fontSize: 13,
    fontFamily: FB, color: textPrimary, background: inputBg,
    border: `1px solid ${border}`, outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: 9, fontWeight: 900, letterSpacing: "0.16em",
    textTransform: "uppercase", color: textSecondary, fontFamily: FB,
    marginBottom: 5, display: "block",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        .ar-page {
          background: ${bg}; min-height: calc(100vh - 102px);
          padding: clamp(24px,5vw,48px); transition: background 0.3s;
        }
        .ar-inner { max-width: 1200px; margin: 0 auto; }
        .ar-table {
          width: 100%; border-collapse: collapse;
          background: ${card}; border-radius: 12px; overflow: hidden;
          border: 1px solid ${border}; transition: all 0.3s;
        }
        .ar-table th {
          font-family: ${FB}; font-size: 9px; font-weight: 900;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${textSecondary}; background: ${surface};
          padding: 14px 16px; text-align: left;
          border-bottom: 1px solid ${border};
        }
        .ar-table td {
          font-family: ${FB}; font-size: 13px; color: ${textPrimary};
          padding: 14px 16px; border-bottom: 1px solid ${border};
          vertical-align: middle;
        }
        .ar-table tr:last-child td { border-bottom: none; }
        .ar-table tr:hover td { background: ${darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)"}; }
        .ar-flag {
          width: 28px; height: 20px; object-fit: cover; border-radius: 3px;
          display: inline-block; vertical-align: middle; margin-right: 8px;
          border: 1px solid ${border};
        }
        .ar-btn-primary {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 11px 22px; border-radius: 100px; border: none; cursor: pointer;
          font-family: ${FD}; font-size: 12px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: ${btnBg}; color: ${btnText};
          transition: opacity 0.2s;
        }
        .ar-btn-primary:hover { opacity: 0.88; }
        .ar-btn-sm {
          padding: 6px 10px; border-radius: 8px; border: 1px solid ${border};
          background: transparent; color: ${textSecondary}; cursor: pointer;
          transition: all 0.2s; display: inline-flex; align-items: center;
        }
        .ar-btn-sm:hover { border-color: ${accent}; color: ${accent}; }
        .ar-btn-sm.danger:hover { border-color: #ef4444; color: #ef4444; }
        .ar-modal-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .ar-modal {
          background: ${card}; border: 1px solid ${border};
          border-radius: 20px; width: 100%; max-width: 640px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0,0,0,0.4);
        }
        .ar-modal-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 28px; border-bottom: 1px solid ${border};
        }
        .ar-modal-body { padding: 28px; }
        .ar-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width:600px) { .ar-grid-2 { grid-template-columns: 1fr; } }
        .toast-pop {
          position: fixed; top: 24px; right: 24px; z-index: 99999;
          padding: 12px 24px; border-radius: 12px;
          background: #16a34a; color: white;
          font-family: ${FB}; font-size: 13px; font-weight: 700;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          animation: slideIn 0.3s ease both;
        }
        @keyframes slideIn { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {toast && <div className="toast-pop">✓ {toast}</div>}

      <div className="ar-page">
        <div className="ar-inner">
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <FiShield size={24} color={accent} />
              <h1 style={{
                fontFamily: FD, fontSize: "clamp(24px,4vw,36px)", fontWeight: 900,
                letterSpacing: "0.04em", textTransform: "uppercase",
                color: textPrimary, margin: 0,
              }}>Gestion des Arbitres</h1>
            </div>
            <p style={{ fontFamily: FB, fontSize: 13, color: textSecondary, margin: 0 }}>
              Ajoutez, modifiez et gérez les arbitres officiels de la Coupe du Monde 2030
            </p>
          </div>

          {/* Action bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <button className="ar-btn-primary" onClick={openNew}>
              <FiPlus size={15} /> Ajouter un arbitre
            </button>
            <span style={{ fontFamily: FB, fontSize: 12, color: textMuted }}>
              {referees.length} arbitre{referees.length !== 1 ? "s" : ""} enregistré{referees.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Table */}
          {loading ? (
            <div style={{ textAlign: "center", padding: 60, color: textSecondary }}>Chargement...</div>
          ) : referees.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "80px 32px",
              background: surface, borderRadius: 16,
              border: `2px dashed ${border}`,
            }}>
              <FiUser size={40} color={textMuted} style={{ marginBottom: 16 }} />
              <p style={{ fontFamily: FD, fontSize: 22, fontWeight: 800, color: textPrimary, marginBottom: 8, textTransform: "uppercase" }}>
                Aucun arbitre
              </p>
              <p style={{ fontFamily: FB, fontSize: 14, color: textSecondary, marginBottom: 24 }}>
                Commencez par ajouter le premier arbitre officiel.
              </p>
              <button className="ar-btn-primary" onClick={openNew}>
                <FiPlus size={14} /> Ajouter un arbitre
              </button>
            </div>
          ) : (
            <table className="ar-table">
              <thead>
                <tr>
                  <th>Arbitre</th>
                  <th>Nationalité</th>
                  <th>Rôle</th>
                  <th>Badge FIFA</th>
                  <th>Exp.</th>
                  <th>Matchs</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {referees.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {r.photo_url ? (
                          <img src={r.photo_url} alt={r.last_name}
                            style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: `1px solid ${border}` }} />
                        ) : (
                          <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            background: `${accent}18`, color: accent,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: FD, fontSize: 12, fontWeight: 900,
                          }}>
                            {r.first_name?.[0]}{r.last_name?.[0]}
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 700, lineHeight: 1.2 }}>{r.first_name} {r.last_name}</div>
                          {r.age && <span style={{ fontSize: 11, color: textMuted }}>{r.age} ans</span>}
                        </div>
                      </div>
                    </td>
                    <td>
                      {r.nationality_code && (
                        <img className="ar-flag"
                          src={`https://flagcdn.com/w40/${r.nationality_code}.png`}
                          alt={r.nationality} />
                      )}
                      {r.nationality}
                    </td>
                    <td>{roleLabel(r.role)}</td>
                    <td>{badgeLabel(r.fifa_badge)}</td>
                    <td style={{ color: textSecondary }}>{r.experience_years ? `${r.experience_years} ans` : "—"}</td>
                    <td style={{ color: textSecondary }}>{r.matches_officiated || "—"}</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <button className="ar-btn-sm" onClick={() => openEdit(r)} title="Modifier">
                          <FiEdit2 size={14} />
                        </button>
                        <button className="ar-btn-sm danger" onClick={() => handleDelete(r.id)} title="Supprimer">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── MODAL FORM ── */}
      {showForm && (
        <div className="ar-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="ar-modal" onClick={e => e.stopPropagation()}>
            <div className="ar-modal-head">
              <h2 style={{ fontFamily: FD, fontSize: 22, fontWeight: 900, color: textPrimary, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {editing ? "Modifier l'arbitre" : "Nouvel arbitre"}
              </h2>
              <button onClick={() => setShowForm(false)} style={{
                background: surface, border: "none", width: 34, height: 34,
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer", color: textSecondary,
              }}><FiX size={18} /></button>
            </div>

            <div className="ar-modal-body">
              {error && (
                <div style={{
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
                  color: "#ef4444", padding: "10px 16px", borderRadius: 10,
                  fontFamily: FB, fontSize: 13, marginBottom: 20,
                }}>{error}</div>
              )}

              <div className="ar-grid-2">
                <div>
                  <label style={labelStyle}>Prénom *</label>
                  <input style={inputStyle} value={form.first_name}
                    onChange={e => setForm({ ...form, first_name: e.target.value })}
                    placeholder="Ex: Abdelhak" />
                </div>
                <div>
                  <label style={labelStyle}>Nom *</label>
                  <input style={inputStyle} value={form.last_name}
                    onChange={e => setForm({ ...form, last_name: e.target.value })}
                    placeholder="Ex: Nhari" />
                </div>
                <div>
                  <label style={labelStyle}>Nationalité *</label>
                  <input style={inputStyle} value={form.nationality}
                    onChange={e => setForm({ ...form, nationality: e.target.value })}
                    placeholder="Ex: Maroc" />
                </div>
                <div>
                  <label style={labelStyle}>Code pays (2 lettres)</label>
                  <input style={inputStyle} value={form.nationality_code}
                    onChange={e => setForm({ ...form, nationality_code: e.target.value.toLowerCase() })}
                    placeholder="Ex: ma" maxLength={2} />
                </div>
                <div>
                  <label style={labelStyle}>Rôle</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}>
                    {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Badge FIFA</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={form.fifa_badge}
                    onChange={e => setForm({ ...form, fifa_badge: e.target.value })}>
                    {BADGES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Âge</label>
                  <input style={inputStyle} type="number" value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                    placeholder="Ex: 42" min={20} max={70} />
                </div>
                <div>
                  <label style={labelStyle}>Années d'expérience</label>
                  <input style={inputStyle} type="number" value={form.experience_years}
                    onChange={e => setForm({ ...form, experience_years: e.target.value })}
                    placeholder="Ex: 15" min={0} />
                </div>
                <div>
                  <label style={labelStyle}>Matchs arbitrés</label>
                  <input style={inputStyle} type="number" value={form.matches_officiated}
                    onChange={e => setForm({ ...form, matches_officiated: e.target.value })}
                    placeholder="Ex: 230" min={0} />
                </div>
                <div>
                  <label style={labelStyle}>Photo URL</label>
                  <input style={inputStyle} value={form.photo_url}
                    onChange={e => setForm({ ...form, photo_url: e.target.value })}
                    placeholder="https://..." />
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <label style={labelStyle}>Notes</label>
                <textarea style={{ ...inputStyle, resize: "none", minHeight: 72 }}
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="Notes supplémentaires..." />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button className="ar-btn-primary" onClick={handleSave}
                  disabled={saving}
                  style={{ flex: 1, justifyContent: "center", opacity: saving ? 0.6 : 1 }}>
                  <FiSave size={14} />
                  {saving ? "Enregistrement..." : editing ? "Mettre à jour" : "Enregistrer"}
                </button>
                <button onClick={() => setShowForm(false)} style={{
                  padding: "11px 22px", borderRadius: 100, border: `1px solid ${border}`,
                  background: "transparent", color: textSecondary,
                  fontFamily: FB, fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
