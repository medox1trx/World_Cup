import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

export default function Hospitality() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const tBg     = darkMode ? "#0a0a0a" : "#ffffff";
  const tText   = darkMode ? "white"   : "#0a0a0a";
  const tSub    = darkMode ? "rgba(255,255,255,0.7)" : "#4a4a4a";
  const cardBg  = darkMode ? "#ffffff" : "#0a0a0a"; 
  const cardText = darkMode ? "#0a0a0a" : "#ffffff";
  const badgeColor = "#e60000"; 

  const staticOffers = [
    {
      id: 1,
      title: "MATCH UNIQUE",
      badge: "Populaire",
      desc: "Vivez le plus beau des sports sur la plus grande scène, au match de votre choix. Maintenant disponible : Matchs de l'équipe des États-Unis et Demi-finales !",
      bullets: [
        "Phase de groupes : 1 match au choix, incluant l'équipe des États-Unis",
        "Phases à élimination directe : 1 match au choix, sauf la Finale (éligible : 16es, 8es, Quarts, Demies, Petite Finale)",
        "Options d'hospitalité : Salon Bord de terrain, VIP, Salon des Trophées, Club des Champions, Pavillon FIFA"
      ]
    },
    {
      id: 2,
      title: "SÉRIE PAR STADE",
      desc: "Assistez à tous les matchs dans le stade de votre choix.",
      bullets: [
        "Comprend de 4 à 9 matchs, selon le stade",
        "Toutes les dates de match et toutes les phases sont éligibles",
        "Options d'hospitalité : Salon Bord de terrain, VIP, Salon des Trophées, Club des Champions, Pavillon FIFA"
      ]
    },
    {
      id: 3,
      title: "SUIVRE MON ÉQUIPE",
      desc: "Voyez votre équipe en action à chaque match de la phase de groupes, quel que soit le lieu.",
      bullets: [
        "Toutes les dates de match et tous les lieux sont éligibles",
        "« Suivre Mon Équipe » n'est actuellement pas disponible pour les équipes des pays hôtes (Canada, Mexique, États-Unis)",
        "Options d'hospitalité : Salon Bord de terrain, VIP, Salon des Trophées, Club des Champions, Pavillon FIFA"
      ]
    }
  ];

  const handleReserve = (id) => {
    navigate(`/tickets?hospitality_id=${id}`);
  };

  return (
    <div style={{
      fontFamily: B,
      background: tBg,
      color: tText,
      opacity: mounted ? 1 : 0,
      transition: "background-color 0.4s, color 0.4s, opacity 0.45s",
      minHeight: "100vh",
      paddingTop: 100,
    }}>
      <style>{`
        .hw { max-width: 1300px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 40px); }
        
        .hosp-header-container {
          margin-bottom: 50px;
        }

        .hosp-title {
          font-family: ${D};
          font-size: clamp(50px, 8vw, 80px);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1;
          margin: 0 0 20px 0;
          letter-spacing: 0.02em;
        }

        .fz-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 0 100px;
        }
        
        .fz-card {
          background-color: ${cardBg};
          color: ${cardText};
          border-radius: 20px;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .fz-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          background-color: ${badgeColor};
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .fz-name {
          font-family: ${D};
          font-size: clamp(40px, 4vw, 56px);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.9;
          margin: 0 0 24px 0;
          max-width: 80%;
        }

        .fz-card-desc {
          font-size: 15px;
          line-height: 1.5;
          color: ${darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'};
          margin: 0 0 24px 0;
        }

        .fz-bullets {
          list-style-type: disc;
          padding-left: 20px;
          margin: 0 0 40px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .fz-bullets li {
          font-size: 14px;
          line-height: 1.4;
          color: ${darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'};
        }

        .fz-buy-btn {
          margin-top: auto;
          align-self: flex-start;
          background: transparent;
          color: ${cardText};
          border: 1px solid ${darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'};
          padding: 12px 32px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          width: fit-content;
          text-align: center;
        }

        .fz-buy-btn:hover {
          background: ${cardText};
          color: ${cardBg};
        }

        .supp-section {
          background-color: ${darkMode ? '#111' : '#f0f4f8'};
          padding: 80px 0;
          margin-top: 40px;
        }

        .supp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-top: 40px;
        }

        .supp-card {
          background-color: ${darkMode ? '#1a1a1a' : '#ffffff'};
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }

        .supp-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .supp-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .supp-content {
          padding: 30px 40px 40px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .supp-name {
          font-family: ${D};
          font-size: clamp(32px, 3vw, 40px);
          font-weight: 900;
          text-transform: uppercase;
          margin: 0 0 16px 0;
          color: ${tText};
        }

        .supp-desc {
          font-size: 15px;
          line-height: 1.5;
          color: ${tSub};
          margin: 0 0 30px 0;
          flex: 1;
        }

        .supp-btn {
          align-self: flex-start;
          background: transparent;
          color: ${tText};
          border: 1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .supp-btn:hover {
          background: ${tText};
          color: ${tBg};
        }

        @media (max-width: 992px) {
          .fz-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .fz-grid { grid-template-columns: 1fr; }
          .supp-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section>
        <div className="hw">
          <div className="hosp-header-container">
            <h1 className="hosp-title">OFFRES DE MATCHES</h1>
          </div>

          <div className="fz-grid">
            {staticOffers.map((offer) => (
              <div key={offer.id} className="fz-card">
                {offer.badge && (
                  <div className="fz-badge">
                    <span style={{ fontSize: 14 }}>✧</span> {offer.badge}
                  </div>
                )}
                
                <h3 className="fz-name" dangerouslySetInnerHTML={{ __html: offer.title.replace(' ', '<br/>') }} />
                <p className="fz-card-desc">{offer.desc}</p>
                
                <ul className="fz-bullets">
                  {offer.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleReserve(offer.id)} 
                  className="fz-buy-btn"
                >
                  Réserver
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="supp-section">
        <div className="hw">
          <h2 className="hosp-title" style={{ fontSize: 'clamp(40px, 6vw, 60px)', marginBottom: 16 }}>
            OFFRES SUPPLÉMENTAIRES
          </h2>

          <div className="supp-grid">
            <div className="supp-card">
              <div className="supp-img-wrap">
                <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800" alt="Platinum Access" className="supp-img" />
              </div>
              <div className="supp-content">
                <h3 className="supp-name">ACCÈS PLATINUM</h3>
                <p className="supp-desc">
                  L'offre la plus exclusive. Bénéficiez d'une expérience exhaustive avec une personnalisation complète des services et l'accès aux meilleurs services.
                </p>
                <Link to="/tickets" className="supp-btn">Enregistrer votre intérêt</Link>
              </div>
            </div>

            <div className="supp-card">
              <div className="supp-img-wrap">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800" alt="Hébergement" className="supp-img" />
              </div>
              <div className="supp-content">
                <h3 className="supp-name">HÉBERGEMENT</h3>
                <p className="supp-desc">
                  Choisissez les hôtels, les expériences et/ou les voitures de location qui rendront votre séjour inoubliable.
                </p>
                <Link to="/hotels" className="supp-btn">Acheter Maintenant</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}