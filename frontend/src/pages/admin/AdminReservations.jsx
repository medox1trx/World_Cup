import React, { useState, useEffect } from 'react';
import { useTheme } from "../../context/ThemeContext";
import { FiCheck, FiX, FiEye } from 'react-icons/fi';
import reservationService from '../../services/reservationService';

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminReservations() {
  const { darkMode } = useTheme();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedRes, setSelectedRes] = useState(null);

  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const surface      = darkMode ? "#171717"                  : "#f5f5f5";
  const accent       = darkMode ? "#ffffff"                  : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                 : "#ffffff";

  useEffect(() => {
    fetchReservations();
  }, [statusFilter, typeFilter]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (typeFilter) params.type = typeFilter;
      const data = await reservationService.getAll(params);
      setReservations(data.data || data || []);
    } catch (err) {
      console.error("Failed to fetch reservations", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await reservationService.updateStatus(id, newStatus);
      fetchReservations();
      if (selectedRes && selectedRes.id === id) setSelectedRes(null);
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
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
        .admin-sub { font-family: ${FB}; font-size: 14px; color: ${textSecondary}; margin: 4px 0 0; }
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
        .btn-icon {
          width: 36px; height: 36px; border-radius: 10px; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary}; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: 0.2s; margin-right: 8px;
        }
        .btn-icon:hover { background: ${accent}; color: ${accentContrast}; }
        .admin-badge {
          padding: 4px 10px; borderRadius: 100px; fontSize: 10px; fontWeight: 800;
          textTransform: uppercase; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary};
        }
        .filter-select {
          background: ${surface}; border: 1px solid ${border}; color: ${textPrimary};
          padding: 10px 16px; borderRadius: 12px; fontSize: 13px; outline: none;
        }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 5000; padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 700px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Réservations</h1>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">Statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
              </select>
              <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="">Types</option>
                <option value="fan_zone">Fan Zone</option>
                <option value="hospitality">Hospitalité</option>
              </select>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Produit</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : reservations.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Aucune réservation trouvée</td></tr>
                ) : reservations.map((res) => (
                  <tr key={res.id}>
                    <td>
                      <div style={{ fontWeight: 800 }}>{res.full_name}</div>
                      <div style={{ fontSize: 11, opacity: 0.5 }}>{res.email}</div>
                    </td>
                    <td><span className="admin-badge">{res.type === 'hospitality' ? 'VIP' : 'Fan Zone'}</span></td>
                    <td>{res.type === 'hospitality' ? res.hospitality?.tier : res.fan_zone?.zone_label}</td>
                    <td style={{ fontWeight: 900 }}>{res.total_price} €</td>
                    <td><span className="admin-badge">{res.status}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => setSelectedRes(res)}><FiEye size={16} /></button>
                      {res.status === 'pending' && (
                        <>
                          <button className="btn-icon" onClick={() => handleStatusUpdate(res.id, 'confirmed')}><FiCheck size={16} /></button>
                          <button className="btn-icon" onClick={() => handleStatusUpdate(res.id, 'cancelled')}><FiX size={16} /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedRes && (
        <div className="modal-overlay" onClick={() => setSelectedRes(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: FD, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 30, color: textPrimary }}>Détails #{selectedRes.id}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
              <div>
                <label style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", opacity: 0.5 }}>Client</label>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{selectedRes.full_name}</div>
                <div style={{ fontSize: 14, opacity: 0.7 }}>{selectedRes.email}</div>
                <div style={{ fontSize: 14, opacity: 0.7 }}>{selectedRes.phone}</div>
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", opacity: 0.5 }}>Offre</label>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{selectedRes.type === 'hospitality' ? 'VIP' : 'Fan Zone'}</div>
                <div style={{ fontSize: 14, opacity: 0.7 }}>{selectedRes.type === 'hospitality' ? selectedRes.hospitality?.tier : selectedRes.fan_zone?.zone_label}</div>
                <div style={{ fontSize: 14, opacity: 0.7 }}>Quantité: {selectedRes.quantity}</div>
              </div>
            </div>
            <div style={{ marginTop: 30 }}>
              <label style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", opacity: 0.5 }}>Demande spéciale</label>
              <div style={{ padding: 15, background: surface, borderRadius: 12, marginTop: 8, fontSize: 14, opacity: 0.8 }}>
                {selectedRes.special_request || "Aucune demande."}
              </div>
            </div>
            <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: FD, fontSize: 32, fontWeight: 900 }}>{selectedRes.total_price} €</div>
              <button className="admin-btn-primary" onClick={() => setSelectedRes(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
