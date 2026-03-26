import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const BookingModal = ({ city, accommodation, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    guests: 1,
    name: '',
    email: ''
  });

  const price = accommodation ? Math.round(accommodation.price) : 95;
  const itemName = accommodation ? accommodation.name : city.name;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:8000/api/reservations', {
        accommodation_id: accommodation?.id || 1, // Fallback for testing
        guest_name: formData.name,
        guest_email: formData.email,
        arrival_date: formData.date,
        guests_count: formData.guests
      });
      setStep(3); // Go to confirmation
    } catch (err) {
      console.error("Erreur lors de la réservation:", err);
      setError("Désolé, une erreur est survenue lors de la réservation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="booking-modal-content"
        style={{
          backgroundColor: '#fff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '500px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#666',
          zIndex: 10
        }}>
          <X size={24} />
        </button>

        <div style={{ padding: '40px' }}>
          {step === 1 && (
            <div className="step-1">
              <h2 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '10px' }}>Réserver à {itemName}</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>{price}€ par nuit · Séjour Coupe du Monde</p>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  <Calendar size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                  Date d'arrivée
                </label>
                <input 
                  type="date" 
                  required 
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '12px', 
                    border: '1px solid #ddd',
                    fontFamily: 'inherit'
                  }}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  <Users size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                  Nombre de voyageurs
                </label>
                <select 
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '12px', 
                    border: '1px solid #ddd',
                    fontFamily: 'inherit'
                  }}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n > 1 ? 'personnes' : 'personne'}</option>)}
                </select>
              </div>

              <button 
                onClick={() => setStep(2)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #FF385C, #E31C5F)',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Continuer
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-2">
              <h2 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '30px' }}>Vos informations</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <input 
                    type="text" 
                    placeholder="Nom complet" 
                    required 
                    style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '12px', border: '1px solid #ddd' }}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <input 
                    type="email" 
                    placeholder="Adresse email" 
                    required 
                    style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '12px', border: '1px solid #ddd' }}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
              {error && (
                <div style={{ 
                  color: '#d63031', 
                  backgroundColor: '#fab1a0', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem'
                }}>
                  <AlertCircle size={18} /> {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  disabled={loading}
                  style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
                >
                  Retour
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  style={{ 
                    flex: 2, 
                    padding: '16px', 
                    borderRadius: '12px', 
                    border: 'none', 
                    background: '#FF385C', 
                    color: '#fff', 
                    fontWeight: '600', 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  {loading && <Loader2 size={20} className="animate-spin" />}
                  {loading ? 'Traitement...' : 'Confirmer'}
                </button>
              </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="step-3" style={{ textAlign: 'center', padding: '20px 0' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
              >
                <CheckCircle size={80} color="#00C48C" style={{ margin: '0 auto 20px' }} />
              </motion.div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '10px' }}>Réservation confirmée !</h2>
              <p style={{ color: '#666', marginBottom: '30px' }}>Un email de confirmation a été envoyé à {formData.email}.</p>
              <button 
                onClick={onClose}
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: '#2d3436', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
