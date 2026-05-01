import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiCheck, FiX, FiEye, FiClock, FiCheckCircle, FiAlertCircle, FiPhone, FiMail, FiUser, FiInfo } from 'react-icons/fi';
import reservationService from '../../services/reservationService';
import { Spinner } from '../Home/ui';

const FONT_D = "'Bebas Neue', sans-serif";
const FONT_B = "'DM Sans', sans-serif";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedRes, setSelectedRes] = useState(null);
  const [updating, setUpdating] = useState(false);

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
      setReservations(Array.isArray(data) ? data : (data.data || []));
    } catch (err) {
      console.error("Failed to fetch reservations", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdating(true);
    try {
      await reservationService.updateStatus(id, newStatus);
      fetchReservations();
      if (selectedRes && selectedRes.id === id) {
        setSelectedRes(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Erreur lors de la mise à jour du statut.");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: 'rgba(234,179,8,0.1)', color: '#eab308', icon: <FiClock /> },
      confirmed: { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', icon: <FiCheckCircle /> },
      cancelled: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', icon: <FiAlertCircle /> }
    };
    const s = styles[status] || styles.pending;
    return (
      <span style={{ 
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 100, background: s.bg, color: s.color,
        fontSize: 10, fontWeight: 800, textTransform: 'uppercase'
      }}>
        {s.icon} {status}
      </span>
    );
  };

  return (
    <div style={{ padding: 40, background: '#0d0d0d', minHeight: '100vh', color: 'white', fontFamily: FONT_B }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: FONT_D, fontSize: 48, fontWeight: 900, textTransform: 'uppercase', marginBottom: 10 }}>Gestion des Réservations</h1>
        <p style={{ opacity: 0.5 }}>Gérez les demandes de Fan Zones et d'Hospitalité en temps réel.</p>
      </div>

      {/* Filters */}
      <div className="glass-panel" style={{ padding: 20, borderRadius: 12, marginBottom: 30, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FiFilter style={{ opacity: 0.4 }} />
          <span style={{ fontSize: 13, fontWeight: 700 }}>FILTRER :</span>
        </div>
        <select 
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmé</option>
          <option value="cancelled">Annulé</option>
        </select>
        <select 
          value={typeFilter} 
          onChange={e => setTypeFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="">Tous les types</option>
          <option value="fan_zone">Fan Zone</option>
          <option value="hospitality">Hospitalité</option>
        </select>
        <button onClick={fetchReservations} style={{ 
          background: 'white', color: 'black', border: 'none', padding: '10px 20px', 
          borderRadius: 100, fontSize: 12, fontWeight: 800, cursor: 'pointer' 
        }}>
          ACTUALISER
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>CLIENT</th>
              <th style={thStyle}>TYPE</th>
              <th style={thStyle}>DÉTAILS</th>
              <th style={thStyle}>TOTAL</th>
              <th style={thStyle}>STATUT</th>
              <th style={thStyle}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ padding: 60, textAlign: 'center' }}><Spinner /></td></tr>
            ) : reservations.length === 0 ? (
              <tr><td colSpan="7" style={{ padding: 60, textAlign: 'center', opacity: 0.4 }}>Aucune réservation trouvée.</td></tr>
            ) : (
              Array.isArray(reservations) && reservations.map(res => (
                <tr key={res.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                  <td style={tdStyle}>#{res.id}</td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 700 }}>{res.full_name}</div>
                    <div style={{ fontSize: 11, opacity: 0.5 }}>{res.email}</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ 
                      fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, 
                      background: res.type === 'hospitality' ? 'rgba(var(--gold-color-rgb), 0.1)' : 'rgba(255,255,255,0.05)',
                      color: res.type === 'hospitality' ? 'var(--gold-color)' : 'white',
                      textTransform: 'uppercase'
                    }}>
                      {res.type === 'hospitality' ? 'VIP' : 'Fan Zone'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: 12 }}>
                      {res.type === 'hospitality' ? res.hospitality?.tier : res.fan_zone?.zone_label}
                    </div>
                    <div style={{ fontSize: 11, opacity: 0.5 }}>Qté: {res.quantity}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 800 }}>{res.total_price} €</div>
                  </td>
                  <td style={tdStyle}>{getStatusBadge(res.status)}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setSelectedRes(res)} style={actionBtnStyle} title="Voir détails"><FiEye /></button>
                      {res.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatusUpdate(res.id, 'confirmed')} style={{...actionBtnStyle, color: '#22c55e'}} title="Confirmer"><FiCheck /></button>
                          <button onClick={() => handleStatusUpdate(res.id, 'cancelled')} style={{...actionBtnStyle, color: '#ef4444'}} title="Annuler"><FiX /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedRes && (
        <div style={modalOverlayStyle} onClick={() => setSelectedRes(null)}>
          <div className="glass-card" style={modalStyle} onClick={e => e.stopPropagation()}>
            <div style={{ padding: 32, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: FONT_D, fontSize: 32, margin: 0 }}>DÉTAILS RÉSERVATION #{selectedRes.id}</h2>
              <button onClick={() => setSelectedRes(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><FiX size={24} /></button>
            </div>
            <div style={{ padding: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                <div>
                  <h3 style={sectionTitleStyle}>Informations Client</h3>
                  <div style={infoRowStyle}><FiUser style={iconStyle} /> <span>{selectedRes.full_name}</span></div>
                  <div style={infoRowStyle}><FiMail style={iconStyle} /> <span>{selectedRes.email}</span></div>
                  <div style={infoRowStyle}><FiPhone style={iconStyle} /> <span>{selectedRes.phone}</span></div>
                </div>
                <div>
                  <h3 style={sectionTitleStyle}>Détails de l'Offre</h3>
                  <div style={infoRowStyle}><FiInfo style={iconStyle} /> <span>Type: {selectedRes.type === 'hospitality' ? 'Hospitalité VIP' : 'Fan Zone'}</span></div>
                  <div style={infoRowStyle}><FiCheckCircle style={iconStyle} /> <span>Produit: {selectedRes.type === 'hospitality' ? selectedRes.hospitality?.tier : selectedRes.fan_zone?.zone_label}</span></div>
                  <div style={infoRowStyle}><FiUser style={iconStyle} /> <span>Quantité: {selectedRes.quantity}</span></div>
                </div>
              </div>

              <div style={{ marginTop: 40 }}>
                <h3 style={sectionTitleStyle}>Demande Spéciale</h3>
                <p style={{ padding: 20, background: 'rgba(255,255,255,0.03)', borderRadius: 12, fontSize: 14, lineHeight: 1.6, opacity: 0.7 }}>
                  {selectedRes.special_request || "Aucune demande particulière."}
                </p>
              </div>

              <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 12, opacity: 0.5, textTransform: 'uppercase' }}>Total Calculé</span>
                  <div style={{ fontFamily: FONT_D, fontSize: 40, fontWeight: 900 }}>{selectedRes.total_price} €</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {selectedRes.status !== 'confirmed' && (
                    <button onClick={() => handleStatusUpdate(selectedRes.id, 'confirmed')} disabled={updating} className="fifa-btn" style={{ padding: '14px 30px' }}>
                      {updating ? 'Traitement...' : 'Confirmer'}
                    </button>
                  )}
                  {selectedRes.status !== 'cancelled' && (
                    <button onClick={() => handleStatusUpdate(selectedRes.id, 'cancelled')} disabled={updating} className="fifa-btn fifa-btn-outline" style={{ padding: '14px 30px' }}>
                      Annuler
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: '16px 20px', fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' };
const tdStyle = { padding: '20px', fontSize: 14 };
const selectStyle = { background: '#0d0d0d', border: '1px solid #333', color: 'white', padding: '10px 16px', borderRadius: 8, fontSize: 13, outline: 'none' };
const actionBtnStyle = { background: 'rgba(255,255,255,0.05)', border: 'none', width: 32, height: 32, borderRadius: 8, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' };
const modalOverlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 };
const modalStyle = { width: '100%', maxWidth: 800, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' };
const sectionTitleStyle = { fontSize: 12, fontWeight: 800, color: 'var(--gold-color)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 20 };
const infoRowStyle = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontSize: 15 };
const iconStyle = { color: 'rgba(255,255,255,0.3)' };
