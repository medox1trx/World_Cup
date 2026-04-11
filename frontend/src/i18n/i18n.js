
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      matches: "Scores & Matches",
      standings: "Standings",
      teams: "Teams",
      qualifications: "Qualifications",
      cities: "Host Cities",
      tickets: "Tickets",
      hospitality: "Hospitality",
      fans: "Fans Zone",
      tournaments: "FIFA Tournaments",
      login: "Login",
      footerDescription: "Your portal for FIFA World Cup news, scores, and updates.",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      yourEmail: "Your email",
      subscribe: "Subscribe",
      allRightsReserved: "All rights reserved.",
      WorldCup: "World Cup",
      hostCities: "Host Cities",
      cityDetails: "City Details",
      accommodations: "Accommodations",
      filterLabel: "Filters",
      bookNow: "Book Now",
      perNight: "/ night",
      stadium: "Stadium",
      matchPeriod: "Match Period",
      loading: "Loading...",
      noResults: "No stays found matching your criteria.",
      readMore: "Read More",
      capacity: "Capacity",
      guestsCount: "{{count}} Guests",
      amenities: "Amenities",
      totalPrice: "Total Price",
      nightsCount: "{{count}} nights",
      loginToBook: "Please login to book",
      overlappingDates: "The selected dates are already booked.",
      availability: "Availability",
      available: "Available",
      notAvailable: "Not Available",
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Guests",
      profile_settings: "Profile Settings",
      logout: "Logout",
      reset: "Reset",
      bookingConfirmed: "Booking Confirmed!",
      filters: {
        all: "All Stays",
        hotel: "Hotels",
        apartment: "Apartments",
        house: "Houses"
      }
    }
  },
  fr: {
    translation: {
      home: "Accueil",
      matches: "Scores & Matchs",
      standings: "Classements",
      teams: "Equipes",
      qualifications: "Qualifications",
      cities: "Villes hôtes",
      tickets: "Billetterie",
      hospitality: "Hospitalité",
      fans: "Coin des fans",
      tournaments: "Tournois FIFA",
      login: "Connexion",
      footerDescription: "Votre portail pour les nouvelles, scores et mises à jour de la Coupe du Monde FIFA.",
      quickLinks: "Liens rapides",
      followUs: "Suivez-nous",
      newsletter: "Newsletter",
      yourEmail: "Votre email",
      subscribe: "S'abonner",
      allRightsReserved: "Tous droits réservés.",
      WorldCup: "Coupe du Monde",
      hostCities: "Villes hôtes",
      cityDetails: "Détails de la ville",
      accommodations: "Hébergements",
      filterLabel: "Filtres",
      bookNow: "Réserver",
      perNight: "/ nuit",
      stadium: "Stade",
      matchPeriod: "Période de match",
      loading: "Chargement...",
      noResults: "Aucun hébergement ne correspond à vos critères.",
      readMore: "Lire la suite",
      capacity: "Capacité",
      guestsCount: "{{count}} Personnes",
      amenities: "Équipements",
      totalPrice: "Prix Total",
      nightsCount: "{{count}} nuits",
      loginToBook: "Veuillez vous connecter pour réserver",
      overlappingDates: "Les dates sélectionnées sont déjà réservées.",
      availability: "Disponibilité",
      available: "Disponible",
      notAvailable: "Non disponible",
      checkIn: "Arrivée",
      checkOut: "Départ",
      guests: "Voyageurs",
      profile_settings: "Paramètres du profil",
      logout: "Déconnexion",
      reset: "Réinitialiser",
      bookingConfirmed: "Réservation confirmée !",
      filters: {
        all: "Tous les séjours",
        hotel: "Hôtels",
        apartment: "Appartements",
        house: "Maisons"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;