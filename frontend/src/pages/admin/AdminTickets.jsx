import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiShoppingBag, FiCalendar, FiDollarSign, FiUsers, FiFilter } from "react-icons/fi";
import { adminGetTickets, createTicket, updateTicket, deleteTicket, getMatches } from "../../services/api";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

export default function AdminTickets() {
  const { darkMode } = useTheme();
  const [tickets, setTickets] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    match_id: "",
    category: "CAT 1",
    price: "",
    quantity: "",
    status: "available"
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
      const [ticketsData, matchesData] = await Promise.all([
        adminGetTickets(),
        getMatches()
      ]);
      setTickets(ticketsData);
      setMatches(matchesData);
    } catch (err) {
      console.error("Error fetching admin tickets data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTicket(editId, formData);
      } else {
        await createTicket(formData);
      }
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      const msg = err.errors ? Object.values(err.errors).flat().join("\n") : (err.message || "Erreur inconnue");
      alert("Erreur lors de l'enregistrement :\n" + msg);
    }
  };

  const resetForm = () => {
    setFormData({ match_id: "", category: "CAT 1", price: "", quantity: "", status: "available" });
    setEditId(null);
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setFormData({
      match_id: t.match_id,
      category: t.category,
      price: t.price,
      quantity: t.quantity,
      status: t.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce billet ?")) return;
    try {
      await deleteTicket(id);
      fetchData();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
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
        .admin-sub {
          font-family: ${FB}; font-size: 14px; color: ${textSecondary};
          margin: 4px 0 0;
        }
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
        .admin-badge {
          display: inline-block; padding: 4px 12px; border-radius: 100px;
          font-family: ${FB}; font-size: 11px; font-weight: 700;
        }
        .admin-badge.available { background: rgba(34,197,94,0.1); color: #22c55e; }
        .admin-badge.sold_out { background: rgba(239,68,68,0.1); color: #ef4444; }
        
        .admin-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px; border: none; cursor: pointer;
          font-family: ${FD}; font-size: 13px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: ${accent}; color: ${accentContrast};
          transition: 0.2s;
        }
        .btn-icon {
          width: 36px; height: 36px; border-radius: 10px; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary}; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: 0.2s; margin-right: 8px;
        }
        .btn-icon:hover { background: ${accent}; color: ${accentContrast}; }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
          padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 500px; border-radius: 32px;
          padding: 40px; border: 1px solid ${border};
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 14px 18px; border-radius: 12px; background: ${surface}; border: 1px solid ${border}; color: ${textPrimary}; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Billetterie</h1>
              <p className="admin-sub">Gestion des places et tarifs par match</p>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Ajouter des billets
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Match</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Disponibilité</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : tickets.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Aucun billet configuré</td></tr>
                ) : tickets.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{t.match?.home_team} vs {t.match?.away_team}</div>
                      <div style={{ fontSize: 12, opacity: 0.6 }}>{t.match?.venue}, {t.match?.city}</div>
                    </td>
                    <td>{t.category}</td>
                    <td style={{ fontWeight: 800, color: "#c8102e" }}>{t.price} €</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                        <FiUsers size={14} /> {t.available} / {t.quantity}
                      </div>
                    </td>
                    <td>
                      <span className={`admin-badge ${t.status}`}>{t.status === 'available' ? 'Disponible' : 'Épuisé'}</span>
                    </td>
                    <td>
                      <button className="btn-icon" onClick={() => handleEdit(t)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon delete" onClick={() => handleDelete(t.id)}><FiTrash2 size={16} /></button>
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
              {editId ? "Modifier les billets" : "Nouveaux billets"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Match</label>
                <select 
                  className="form-input" 
                  value={formData.match_id} 
                  onChange={e => setFormData({...formData, match_id: e.target.value})}
                  required
                >
                  <option value="">Sélectionnez un match</option>
                  {matches.map(m => (
                    <option key={m.id} value={m.id}>{m.home_team} vs {m.away_team} ({m.city})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Catégorie</label>
                <select className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="CAT 1">Catégorie 1</option>
                  <option value="CAT 2">Catégorie 2</option>
                  <option value="CAT 3">Catégorie 3</option>
                  <option value="VIP">Loge VIP</option>
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Prix (€)</label>
                  <input type="number" className="form-input" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="Ex: 150" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Quantité</label>
                  <input type="number" className="form-input" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} placeholder="Ex: 500" required />
                </div>
              </div>
              <div className="form-group">
                 <label className="form-label">Statut</label>
                 <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="available">Disponible</option>
                    <option value="sold_out">Complet</option>
                  </select>
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
