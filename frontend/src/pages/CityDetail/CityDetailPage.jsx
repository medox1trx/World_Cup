import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Share, Heart, Award, ShieldCheck, Map, ChevronLeft } from 'lucide-react';
import BookingModal from '../../components/Booking/BookingModal';
import AccommodationCard from '../../components/Booking/AccommodationCard';
import './CityDetailPage.css';

const CityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cities/${id}`);
        setCity(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la ville:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (!city) return <div className="city-detail-container">Ville non trouvée.</div>;

  const handleSelectAccommodation = (acc) => {
    setSelectedAccommodation(acc);
    setShowBooking(true);
  };

  return (
    <div className="city-detail-container">
      <div className="detail-navigation">
        <button 
          onClick={() => navigate('/host-cities')}
          className="back-button"
        >
          <ChevronLeft size={20} /> Retour aux pays
        </button>
      </div>

      <div className="city-detail-header">
        <h1 className="city-title">Explorez {city.name}</h1>
        <div className="header-meta">
          <div className="city-location">
            <Star size={14} fill="currentColor" /> 4.95 · {city.country?.name} · {city.accommodations?.length || 0} hébergements
          </div>
          <div className="header-actions">
            <span className="action-btn"><Share size={16} /> Partager</span>
            <span className="action-btn"><Heart size={16} /> Enregistrer</span>
          </div>
        </div>
      </div>

      <div className="city-info-bar">
        <div className="info-item">
          <Award size={24} />
          <span>Ville d'accueil officielle</span>
        </div>
        <div className="info-item">
          <ShieldCheck size={24} />
          <span>Infrastructures Premium</span>
        </div>
        <div className="info-item">
          <Map size={24} />
          <span>Localisation Idéale</span>
        </div>
      </div>

      <section className="accommodations-section">
        <h2 className="section-title">Où séjourner à {city.name}</h2>
        <p className="section-subtitle">Découvrez les meilleurs hôtels, appartements et villas pour votre séjour.</p>
        
        <div className="accommodations-grid">
          {city.accommodations?.map(acc => (
            <AccommodationCard 
              key={acc.id} 
              accommodation={acc} 
              onSelect={handleSelectAccommodation}
            />
          ))}
        </div>
      </section>

      <div className="city-footer-description">
        <h3>À propos de {city.name}</h3>
        <p>
          Bienvenue à {city.name}. Vivez l'excitation de la Coupe du Monde dans une ville vibrante, 
          riche en culture et en histoire sportive. Profitez des événements locaux, 
          rencontrez des fans du monde entier et découvrez l'hospitalité unique de {city.country?.name}.
        </p>
      </div>

      <AnimatePresence>
        {showBooking && (
          <BookingModal 
            city={city} 
            accommodation={selectedAccommodation} 
            onClose={() => setShowBooking(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CityDetailPage;
