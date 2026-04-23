import { useState, useEffect } from "react";
import { getVilles, createVille, updateVille, deleteVille, getPays } from "../../services/api";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminVilles() {
  const [villes, setVilles] = useState([]);
  const [pays, setPays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ nom: "", pays_id: "" });

  useEffect(() => { 
    fetchData(); 
    fetchPays();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getVilles();
      setVilles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPays = async () => {
    const data = await getPays();
    setPays(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await updateVille(editId, formData);
      else await createVille(formData);
      setShowModal(false);
      setFormData({ nom: "", pays_id: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      alert("Erreur: " + (err.message || "Impossible d'enregistrer"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette ville ?")) {
      await deleteVille(id);
      fetchData();
    }
  };

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", padding: 24, color: "white", fontFamily: FB }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: FD, fontSize: 32, fontWeight: 900, textTransform: "uppercase" }}>Villes</h1>
          <button onClick={() => { setEditId(null); setFormData({ nom: "", pays_id: "" }); setShowModal(true); }} 
            style={{ background: "white", color: "#0d0d0d", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>
            <FiPlus /> Ajouter
          </button>
        </div>

        <div style={{ background: "#111", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left" }}>
                <th style={{ padding: 16, fontSize: 12, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Nom</th>
                <th style={{ padding: 16, fontSize: 12, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Pays</th>
                <th style={{ padding: 16, fontSize: 12, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {villes.map(v => (
                <tr key={v.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: 16 }}>{v.nom}</td>
                  <td style={{ padding: 16 }}>{v.pays?.nom}</td>
                  <td style={{ padding: 16 }}>
                    <button onClick={() => { setEditId(v.id); setFormData({ nom: v.nom, pays_id: v.pays_id }); setShowModal(true); }} style={{ background: "none", border: "none", color: "white", marginRight: 12, cursor: "pointer" }}><FiEdit2 /></button>
                    <button onClick={() => handleDelete(v.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}><FiTrash2 /></button>
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
            <h2 style={{ fontFamily: FD, marginBottom: 24 }}>{editId ? "Modifier" : "Ajouter"} une Ville</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>PAYS</label>
                <select value={formData.pays_id} onChange={e => setFormData({ ...formData, pays_id: e.target.value })} 
                  style={{ width: "100%", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8, color: "white" }} required>
                  <option value="">Sélectionner un pays</option>
                  {pays.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>NOM DE LA VILLE</label>
                <input type="text" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} 
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
