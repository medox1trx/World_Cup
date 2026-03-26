import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import CityCard from './CityCard';
import { ChevronRight, ChevronDown } from 'lucide-react';

const CountrySection = ({ country }) => {
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCityId, setActiveCityId] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleExpand = async () => {
    if (!isOpen && cities.length === 0) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/countries/${country.id}/cities`);
        setCities(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des villes:", error);
      } finally {
        setLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="country-section" style={{ marginBottom: '40px' }}>
      <div 
        className="country-header" 
        onClick={toggleExpand}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isOpen ? '0 4px 15px rgba(0,0,0,0.05)' : 'none',
          marginBottom: isOpen ? '20px' : '0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '8px',
            height: '32px',
            background: 'linear-gradient(to bottom, #007bff, #00c6ff)',
            borderRadius: '4px'
          }}></div>
          <h2 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '1.8rem', 
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#2d3436'
          }}>
            {country.name}
          </h2>
        </div>
        {isOpen ? <ChevronDown size={28} /> : <ChevronRight size={28} />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>Chargement des villes...</div>
            ) : (
              <div className="cities-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                padding: '10px'
              }}>
                {cities.map(city => (
                  <CityCard 
                    key={city.id} 
                    city={city} 
                    isActive={activeCityId === city.id}
                    onClick={setActiveCityId}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountrySection;
