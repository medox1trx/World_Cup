import { useState, useEffect } from "react";
import { getFanZones, createFanZone, updateFanZone, deleteFanZone, getPays, getVilles } from "../../services/api";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminFanZones() {
  const [fanZones, setFanZones] = useState([]);
  const [paysList, setPaysList] = useState([]);
  const [villesFiltered, setVillesFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    pays_id: "",
    ville_id: "",
    stade: "",
    capacite: "",
    nb_matchs: 0,
    adresse: "",
    zone_label: "",
    description: "",
    image_url: "",
    groupe: "Europe · Afrique",
    statut: "actif"
  });

  useEffect(() => { 
    fetchData(); 
    loadPays();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getFanZones();
      setFanZones(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPays = async () => {
    const data = await getPays();
    setPaysList(data);
  };

  const handlePaysChange = async (paysId) => {
    setFormData(prev => ({ ...prev, pays_id: paysId, ville_id: "" }));
    if (paysId) {
      const villes = await getVilles({ pays_id: paysId });
      setVillesFiltered(villes);
    } else {
      setVillesFiltered([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      delete payload.pays_id; // API doesn't need pays_id, just ville_id

      if (editId) await updateFanZone(editId, payload);
      else await createFanZone(payload);
      
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      alert("Erreur: " + (err.message || "Impossible d'enregistrer"));
    }
  };

  const resetForm = () => {
    setFormData({
      pays_id: "",
      ville_id: "",
      stade: "",
      capacite: "",
      nb_matchs: 0,
      adresse: "",
      zone_label: "",
      description: "",
      image_url: "",
      groupe: "Europe · Afrique",
      statut: "actif"
    });
    setVillesFiltered([]);
    setEditId(null);
  };

  const handleEdit = async (fz) => {
    setEditId(fz.id);
    setFormData({
      pays_id: fz.pays.id,
      ville_id: fz.ville.id,
      stade: fz.stade,
      capacite: fz.capacite,
      nb_matchs: fz.nb_matchs,
      adresse: fz.adresse,
      zone_label: fz.zone_label || "",
      description: fz.description || "",
      image_url: fz.image_url || "",
      groupe: fz.groupe,
      statut: fz.statut
    });
    // Load villes for the country
    const villes = await getVilles({ pays_id: fz.pays.id });
    setVillesFiltered(villes);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette Fan Zone ?")) {
      await deleteFanZone(id);
      fetchData();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        .fz-input {
          width: 100%; background: #0d0d0d; border: 1px solid rgba(255,255,255,0.1); 
          padding: 12px; borderRadius: 8px; color: white; outline: none;
          transition: all 0.25s ease;
        }
        .fz-input:focus {
          background: #000 !important;
          border-color: white !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important;
        }
        .fz-input:focus::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>
      <div style={{ background: "#0d0d0d", minHeight: "100vh", padding: 24, color: "white", fontFamily: FB }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: FD, fontSize: 32, fontWeight: 900, textTransform: "uppercase" }}>Fan Zones</h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Gestion dynamique des sites officiels</p>
          </div>
          <button onClick={() => { resetForm(); setShowModal(true); }} 
            style={{ background: "white", color: "#0d0d0d", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 800, cursor: "pointer", fontFamily: FD, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <FiPlus /> Ajouter une Fan Zone
          </button>
        </div>

        <div style={{ background: "#111", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)", textAlign: "left" }}>
                <th style={{ padding: "16px 20px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Ville · Pays</th>
                <th style={{ padding: "16px 20px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Stade</th>
                <th style={{ padding: "16px 20px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Groupe</th>
                <th style={{ padding: "16px 20px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Capacité</th>
                <th style={{ padding: "16px 20px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Matchs</th>
                <th style={{ padding: "16px 20px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Statut</th>
                <th style={{ padding: "16px 20px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fanZones.map(fz => (
                <tr key={fz.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontWeight: 700 }}>{fz.ville.nom}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{fz.pays.nom}</div>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: 13 }}>{fz.stade}</td>
                  <td style={{ padding: "16px 20px", fontSize: 13, color: fz.statut === 'centenaire' ? "#eab308" : "white" }}>{fz.groupe}</td>
                  <td style={{ padding: "16px 20px", fontSize: 13 }}>{fz.capacite}</td>
                  <td style={{ padding: "16px 20px", fontSize: 13, textAlign: "center" }}>{fz.nb_matchs}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ 
                      padding: "4px 10px", borderRadius: 100, fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                      background: fz.statut === 'actif' ? "rgba(255,255,255,0.1)" : fz.statut === 'centenaire' ? "rgba(234,179,8,0.1)" : "rgba(255,255,255,0.04)",
                      color: fz.statut === 'centenaire' ? "#eab308" : "white",
                      border: `1px solid ${fz.statut === 'actif' ? "rgba(255,255,255,0.2)" : fz.statut === 'centenaire' ? "rgba(234,179,8,0.2)" : "rgba(255,255,255,0.1)"}`
                    }}>
                      {fz.statut}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <button onClick={() => handleEdit(fz)} style={{ background: "none", border: "none", color: "white", marginRight: 12, cursor: "pointer" }}><FiEdit2 /></button>
                    <button onClick={() => handleDelete(fz.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer" }}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: 20 }}>
          <div style={{ background: "#111", padding: 32, borderRadius: 20, width: "100%", maxWidth: 800, border: "1px solid rgba(255,255,255,0.1)", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontFamily: FD, marginBottom: 32, fontSize: 24, fontWeight: 900, textTransform: "uppercase" }}>{editId ? "Modifier" : "Ajouter"} une Fan Zone</h2>
            <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>1. Pays</label>
                <select value={formData.pays_id} onChange={e => handlePaysChange(e.target.value)} 
                  className="fz-input" required>
                  <option value="">Sélectionner un pays</option>
                  {paysList.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>2. Ville</label>
                <select value={formData.ville_id} onChange={e => setFormData({ ...formData, ville_id: e.target.value })} 
                  disabled={!formData.pays_id}
                  className="fz-input"
                  style={{ opacity: formData.pays_id ? 1 : 0.5 }} required>
                  <option value="">{formData.pays_id ? "Sélectionner une ville" : "Choisissez d'abord un pays"}</option>
                  {villesFiltered.map(v => <option key={v.id} value={v.id}>{v.nom}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>3. Stade</label>
                <input type="text" value={formData.stade} onChange={e => setFormData({ ...formData, stade: e.target.value })} 
                  className="fz-input" required />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>4. Capacité</label>
                <input type="text" value={formData.capacite} onChange={e => setFormData({ ...formData, capacite: e.target.value })} 
                  placeholder="ex: 115 000"
                  className="fz-input" required />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>5. NB Matchs</label>
                <input type="number" value={formData.nb_matchs} onChange={e => setFormData({ ...formData, nb_matchs: e.target.value })} 
                  className="fz-input" required min="0" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>7. Zone Label</label>
                <input type="text" value={formData.zone_label} onChange={e => setFormData({ ...formData, zone_label: e.target.value })} 
                  placeholder="ex: Zone Diplomatique"
                  className="fz-input" />
              </div>

              <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>6. Adresse</label>
                <textarea value={formData.adresse} onChange={e => setFormData({ ...formData, adresse: e.target.value })} 
                  className="fz-input"
                  style={{ minHeight: 60 }} required />
              </div>

              <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>8. Description</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  className="fz-input"
                  style={{ minHeight: 80 }} required />
              </div>

              <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>9. Image URL</label>
                <input type="url" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} 
                  className="fz-input" required />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>10. Groupe</label>
                <select value={formData.groupe} onChange={e => setFormData({ ...formData, groupe: e.target.value })} 
                  className="fz-input" required>
                  <option value="Europe · Afrique">Europe · Afrique</option>
                  <option value="Amérique du Sud · Centenaire">Amérique du Sud · Centenaire</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>11. Statut</label>
                <select value={formData.statut} onChange={e => setFormData({ ...formData, statut: e.target.value })} 
                  className="fz-input" required>
                  <option value="actif">actif</option>
                  <option value="inactif">inactif</option>
                  <option value="centenaire">centenaire</option>
                </select>
              </div>

              <div style={{ gridColumn: "span 2", display: "flex", gap: 12, marginTop: 20 }}>
                <button type="submit" style={{ flex: 2, background: "white", color: "#0d0d0d", border: "none", padding: 16, borderRadius: 12, fontWeight: 900, fontFamily: FD, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer" }}>Sauvegarder la Fan Zone</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)", padding: 16, borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}