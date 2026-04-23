import { useState, useEffect } from "react";
import { getPays, createPays, updatePays, deletePays } from "../../services/api";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminPays() {
  const [pays, setPays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ nom: "", code_iso: "" });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const data = await getPays();
      setPays(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await updatePays(editId, formData);
      else await createPays(formData);
      setShowModal(false);
      setFormData({ nom: "", code_iso: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      alert("Erreur: " + (err.message || "Impossible d'enregistrer"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce pays ?")) {
      await deletePays(id);
      fetchData();
    }
  };

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", padding: 24, color: "white", fontFamily: FB }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: FD, fontSize: 32, fontWeight: 900, textTransform: "uppercase" }}>Pays</h1>
          <button onClick={() => { setEditId(null); setFormData({ nom: "", code_iso: "" }); setShowModal(true); }} 
            style={{ background: "white", color: "#0d0d0d", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>
            <FiPlus /> Ajouter
          </button>
        </div>

        <div style={{ background: "#111", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left" }}>
                <th style={{ padding: 16, fontSize: 12, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Nom</th>
                <th style={{ padding: 16, fontSize: 12, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Code ISO</th>
                <th style={{ padding: 16, fontSize: 12, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pays.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: 16 }}>{p.nom}</td>
                  <td style={{ padding: 16 }}>{p.code_iso.toUpperCase()}</td>
                  <td style={{ padding: 16 }}>
                    <button onClick={() => { setEditId(p.id); setFormData({ nom: p.nom, code_iso: p.code_iso }); setShowModal(true); }} style={{ background: "none", border: "none", color: "white", marginRight: 12, cursor: "pointer" }}><FiEdit2 /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#111", padding: 32, borderRadius: 16, width: 400, border: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 style={{ fontFamily: FD, marginBottom: 24 }}>{editId ? "Modifier" : "Ajouter"} un Pays</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>NOM</label>
                <input type="text" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} 
                  style={{ width: "100%", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8, color: "white" }} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>CODE ISO (EX: MA)</label>
                <input type="text" maxLength={2} value={formData.code_iso} onChange={e => setFormData({ ...formData, code_iso: e.target.value.toLowerCase() })} 
                  style={{ width: "100%", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8, color: "white" }} required />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button type="submit" style={{ flex: 1, background: "white", color: "#0d0d0d", border: "none", padding: 12, borderRadius: 8, fontWeight: 800 }}>Sauvegarder</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, background: "rgba(255,255,255,0.1)", color: "white", border: "none", padding: 12, borderRadius: 8 }}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
