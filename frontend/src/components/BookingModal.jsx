import React, { useState } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiLoader, FiUser, FiMail, FiPhone, FiMessageSquare, FiHash } from 'react-icons/fi';
import reservationService from '../services/reservationService';

const FONT_D = "'Bebas Neue', sans-serif";
const FONT_B = "'DM Sans', sans-serif";

export default function BookingModal({ isOpen, onClose, item, type }) {
  const [step, setStep] = useState('form'); // form, loading, success, error
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    quantity: 1,
    special_request: ''
  });
  const [errors, setErrors] = useState({});
  const [reservationData, setReservationData] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name) newErrors.full_name = 'Nom complet requis';
    if (!formData.email) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.phone) newErrors.phone = 'Téléphone requis';
    if (formData.quantity < 1) newErrors.quantity = 'La quantité doit être au moins 1';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStep('loading');

    try {
      const payload = {
        ...formData,
        type: type,
        [type === 'hospitality' ? 'hospitality_id' : 'fan_zone_id']: item.id
      };

      const result = await reservationService.create(payload);
      setReservationData(result.data);
      setStep('success');
    } catch (err) {
      console.error(err);
      setStep('error');
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)'
    }}>
      <div className="glass-card" style={{
        width: '100%', maxWidth: 550, borderRadius: 24,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '32px 40px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div>
            <span style={{ 
              display: 'block', fontSize: 10, fontWeight: 800, 
              color: 'var(--gold-color)', letterSpacing: '0.3em', 
              textTransform: 'uppercase', marginBottom: 8 
            }}>Réservation Officielle</span>
            <h2 style={{ 
              fontFamily: FONT_D, fontSize: 32, fontWeight: 900, 
              color: 'white', textTransform: 'uppercase', margin: 0 
            }}>
              {type === 'hospitality' ? item.tier : item.zone_label || item.name}
            </h2>
          </div>
          <button onClick={onClose} style={{ 
            background: 'rgba(255,255,255,0.05)', border: 'none', 
            width: 36, height: 36, borderRadius: '50%', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 40px 40px' }}>
          {step === 'form' && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="input-group">
                  <label style={labelStyle}>Nom Complet</label>
                  <div style={inputWrapStyle}>
                    <FiUser style={iconStyle} />
                    <input 
                      name="full_name" 
                      placeholder="John Doe" 
                      value={formData.full_name}
                      onChange={handleChange}
                      style={inputStyle(errors.full_name)} 
                    />
                  </div>
                  {errors.full_name && <span style={errorTextStyle}>{errors.full_name}</span>}
                </div>
                <div className="input-group">
                  <label style={labelStyle}>Email</label>
                  <div style={inputWrapStyle}>
                    <FiMail style={iconStyle} />
                    <input 
                      name="email" 
                      type="email"
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle(errors.email)} 
                    />
                  </div>
                  {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="input-group">
                  <label style={labelStyle}>Téléphone</label>
                  <div style={inputWrapStyle}>
                    <FiPhone style={iconStyle} />
                    <input 
                      name="phone" 
                      placeholder="+33 6 00 00 00 00" 
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle(errors.phone)} 
                    />
                  </div>
                  {errors.phone && <span style={errorTextStyle}>{errors.phone}</span>}
                </div>
                <div className="input-group">
                  <label style={labelStyle}>Nombre de personnes</label>
                  <div style={inputWrapStyle}>
                    <FiHash style={iconStyle} />
                    <input 
                      name="quantity" 
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      style={inputStyle(errors.quantity)} 
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label style={labelStyle}>Demandes Spéciales</label>
                <div style={inputWrapStyle}>
                  <FiMessageSquare style={{...iconStyle, top: 20}} />
                  <textarea 
                    name="special_request" 
                    placeholder="Allergies, accès PMR, etc." 
                    rows="3"
                    value={formData.special_request}
                    onChange={handleChange}
                    style={{...inputStyle(), height: 'auto', paddingTop: 12, paddingLeft: 44}} 
                  />
                </div>
              </div>

              <button type="submit" className="fifa-btn" style={{ width: '100%', marginTop: 10 }}>
                Confirmer la Réservation
              </button>
            </form>
          )}

          {step === 'loading' && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'white' }}>
              <FiLoader size={48} className="animate-spin" style={{ color: 'var(--gold-color)', marginBottom: 20 }} />
              <p style={{ fontFamily: FONT_B, fontSize: 18, fontWeight: 600 }}>Traitement de votre demande...</p>
              <p style={{ opacity: 0.5 }}>Veuillez ne pas fermer cette fenêtre.</p>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', color: '#22c55e'
              }}>
                <FiCheckCircle size={40} />
              </div>
              <h3 style={{ fontFamily: FONT_D, fontSize: 36, fontWeight: 900, color: 'white', marginBottom: 12 }}>RESERVATION ENREGISTRÉE</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                Merci {formData.full_name}. Votre demande pour <strong>{formData.quantity} place(s)</strong> a bien été transmise. Un agent FIFA vous contactera sous 24h.
              </p>
              
              <div className="glass-panel" style={{ padding: 20, borderRadius: 16, textAlign: 'left', marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ opacity: 0.5, fontSize: 12 }}>RÉFÉRENCE</span>
                  <span style={{ color: 'var(--gold-color)', fontWeight: 800 }}>#FIFA-{reservationData?.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.5, fontSize: 12 }}>STATUT</span>
                  <span style={{ fontWeight: 800 }}>EN ATTENTE</span>
                </div>
              </div>

              <button onClick={onClose} className="fifa-btn fifa-btn-outline" style={{ width: '100%' }}>
                Fermer
              </button>
            </div>
          )}

          {step === 'error' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 80, height: 80, borderRadius: '50%', background: 'rgba(239,68,68,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', color: '#ef4444'
              }}>
                <FiAlertCircle size={40} />
              </div>
              <h3 style={{ fontFamily: FONT_D, fontSize: 36, fontWeight: 900, color: 'white', marginBottom: 12 }}>ERREUR</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                Une erreur est survenue lors de votre réservation. Veuillez réessayer ou contacter notre support.
              </p>
              <button onClick={() => setStep('form')} className="fifa-btn" style={{ width: '100%' }}>
                Réessayer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 11,
  fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
  marginBottom: 8, paddingLeft: 4
};

const inputWrapStyle = {
  position: 'relative'
};

const iconStyle = {
  position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
  color: 'rgba(255,255,255,0.3)', pointerEvents: 'none'
};

const inputStyle = (hasError) => ({
  width: '100%', padding: '12px 16px 12px 44px',
  background: 'rgba(255,255,255,0.03)',
  border: hasError ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, color: 'white', fontSize: 14, outline: 'none',
  transition: 'all 0.3s'
});

const errorTextStyle = {
  display: 'block', color: '#ef4444', fontSize: 11, marginTop: 4, paddingLeft: 4
};
