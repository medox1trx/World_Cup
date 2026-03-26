import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CityCard = ({ city, isActive, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(city.id);
    navigate(`/host-cities/${city.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className={`city-card ${isActive ? 'active' : ''}`}
      style={{
        backgroundColor: 'var(--card-bg, #ffffff)',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        minWidth: '150px',
        border: isActive ? '2px solid #007bff' : '2px solid transparent',
        transition: 'border 0.2s ease',
      }}
    >
      <div className="city-icon" style={{
        background: isActive ? 'linear-gradient(135deg, #007bff, #00c6ff)' : 'rgba(0,0,0,0.05)',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isActive ? '#fff' : '#666'
      }}>
        <MapPin size={24} />
      </div>
      <span style={{ 
        fontFamily: 'Inter, sans-serif', 
        fontWeight: '600',
        fontSize: '1.1rem',
        color: isActive ? '#007bff' : '#333'
      }}>
        {city.name}
      </span>
    </motion.div>
  );
};

export default CityCard;
