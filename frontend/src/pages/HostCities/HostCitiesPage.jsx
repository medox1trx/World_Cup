import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import CountrySection from '../../components/CountrySection';
import './HostCitiesPage.css';

const HostCitiesPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/countries');
        setCountries(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="host-cities-container loading">
        <div className="loader"></div>
        <p>Chargement des destinations...</p>
      </div>
    );
  }

  return (
    <div className="host-cities-container">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="host-cities-header"
      >
        <h1 className="main-title">LES PAYS ET LES VILLES HÔTES</h1>
        <p className="subtitle">Découvrez les destinations qui accueilleront la compétition</p>
      </motion.header>

      <motion.div 
        className="countries-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {countries.map(country => (
          <CountrySection key={country.id} country={country} />
        ))}
      </motion.div>
    </div>
  );
};

export default HostCitiesPage;
