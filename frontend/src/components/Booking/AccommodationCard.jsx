import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';

const AccommodationCard = ({ accommodation, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="accommodation-card"
      style={{
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif'
      }}
      onClick={() => onSelect(accommodation)}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '12px',
        backgroundColor: '#f1f1f1'
      }}>
        <img 
          src={accommodation.image_url} 
          alt={accommodation.name} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          color: 'white',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
        }}>
          <Heart size={24} fill="rgba(0,0,0,0.2)" strokeWidth={2} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 4px 0' }}>{accommodation.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
          <Star size={14} fill="currentColor" />
          <span>{accommodation.rating}</span>
        </div>
      </div>
      
      <p style={{ color: '#717171', fontSize: '0.9rem', margin: '0 0 8px 0' }}>{accommodation.type}</p>
      
      <p style={{ margin: 0 }}>
        <span style={{ fontWeight: '600' }}>{Math.round(accommodation.price)}€</span>
        <span style={{ color: '#222' }}> par nuit</span>
      </p>
    </motion.div>
  );
};

export default AccommodationCard;
