import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiInfo, FiChevronDown, FiPlus, FiMinus, FiMapPin, FiCalendar, FiChevronRight } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getMatch, bookTicket } from "../services/api";
import { getCode } from "./Home/constants";
import toast from "react-hot-toast";

const FONT_D = "'Bebas Neue', sans-serif";
const FONT_B = "'DM Sans', sans-serif";

export default function MatchBooking() {
  const { matchId } = useParams();
  const [searchParams] = useSearchParams();
  const hospitalityIdFromUrl = searchParams.get("hospitality_id");
  
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetchMatch();
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  const fetchMatch = async () => {
    try {
      const data = await getMatch(matchId);
      setMatch(data);
      if (data.tickets && data.tickets.length > 0) {
        setSelectedTicket(data.tickets[0]);
      }
    } catch (err) {
      toast.error("Impossible de charger les détails du match.");
      navigate("/tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error("Veuillez vous connecter pour réserver.");
      navigate("/login");
      return;
    }

    const tid = toast.loading("Finalisation de votre réservation...");
    try {
      // Ensure hospitality_id is a valid ID or null
      const hId = hospitalityIdFromUrl && hospitalityIdFromUrl !== "null" && hospitalityIdFromUrl !== "undefined" 
        ? hospitalityIdFromUrl 
        : null;

      const res = await bookTicket({
        ticket_id: selectedTicket.id,
        quantity: quantity,
        hospitality_id: hId
      });
      
      if (res.status === 'success') {
        toast.success("Réservation confirmée !", { id: tid });
        navigate("/profile");
      }
    } catch (err) {
      toast.error(err.message || "Erreur lors de la réservation.", { id: tid });
    }
  };

  if (loading || !match) return <div style={{ height: '100vh', background: darkMode ? '#0d0d0d' : '#fdfdfd' }} />;

  const tBg = darkMode ? "#0d0d0d" : "#fdfdfd";
  const tText = darkMode ? "white" : "#0d0d0d";
  const tSubText = darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const tBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tCardBg = darkMode ? "#141414" : "#ffffff";
  const tInputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const accentColor = darkMode ? "#ffffff" : "#0d0d0d"; 

  const getFlag = (team) => {
    const code = (typeof team === 'object' ? team?.flag : null) || getCode(team);
    return code ? `https://flagcdn.com/w160/${code.toLowerCase()}.png` : "https://flagcdn.com/un.svg";
  };

  return (
    <div style={{ 
      fontFamily: FONT_B, 
      background: tBg, 
      color: tText, 
      minHeight: "100vh",
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.5s ease"
    }}>
      <style>{`
        .booking-hero {
          min-height: 580px;
          position: relative;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: 80px;
          padding-bottom: 60px;
          overflow: hidden;
        }
        .hero-bg-img {
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000') center/cover;
          opacity: 0.4;
          filter: grayscale(100%);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9));
        }
        .hero-content { position: relative; z-index: 10; color: white; width: 100%; max-width: 1200px; padding: 0 40px; }
        .back-link { position: absolute; top: 40px; left: 40px; display: flex; align-items: center; gap: 8px; color: white; font-size: 11px; font-weight: 800; text-transform: uppercase; cursor: pointer; background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; z-index: 100; }
        .back-link:hover { background: white; color: black; }
        .suite-link { position: absolute; top: 40px; right: 40px; display: flex; align-items: center; gap: 8px; color: white; font-size: 11px; font-weight: 800; cursor: pointer; opacity: 0.6; transition: opacity 0.2s; z-index: 100; }
        .suite-link:hover { opacity: 1; }
        
        .hero-flags { display: flex; align-items: center; justify-content: center; gap: 60px; margin-bottom: 32px; }
        .hero-flag { width: 70px; height: 44px; object-fit: cover; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .hero-title { font-family: ${FONT_D}; font-size: clamp(40px, 8vw, 100px); line-height: 0.85; text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 24px; }
        .hero-meta { display: flex; align-items: center; justify-content: center; gap: 40px; font-size: 16px; font-weight: 800; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .form-select { background-color: ${tInputBg}; border: 1px solid ${tBorder}; padding: 14px 48px 14px 24px; height: auto; min-height: 48px; border-radius: 100px; cursor: pointer; font-weight: 700; font-size: 13px; width: 100%; color: inherit; appearance: none; outline: none; }

        .booking-main { max-width: 600px; margin: 80px auto; padding: 0 40px; }
        .category-title { font-family: ${FONT_D}; font-size: 80px; line-height: 1; text-transform: uppercase; margin-bottom: 32px; text-align: center; }
        
        .input-group { margin-bottom: 32px; flex: 1; }
        .input-label { display: block; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; opacity: 0.5; }
        .qty-picker { display: flex; align-items: center; gap: 24px; background: ${tInputBg}; border: 1px solid ${tBorder}; width: fit-content; padding: 12px 24px; border-radius: 100px; }
        .qty-btn { background: transparent; border: none; color: ${tText}; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0.4; transition: opacity 0.2s; }
        .qty-btn:hover { opacity: 1; }
        .qty-val { font-weight: 800; min-width: 20px; text-align: center; font-size: 16px; }
        

        
        .price-summary { border-top: 1px solid ${tBorder}; padding-top: 40px; margin-top: 40px; }
        .price-total { font-size: 48px; font-weight: 900; margin-bottom: 24px; display: flex; align-items: baseline; gap: 12px; }
        .price-total span { font-size: 13px; opacity: 0.4; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .book-btn { background: ${accentColor}; color: ${tBg}; border: none; width: 100%; padding: 22px; border-radius: 100px; font-family: ${FONT_B}; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 0.3s; }
        .book-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; }

      `}</style>

      <div className="booking-hero">
        <div className="hero-bg-img" />
        <div className="hero-overlay" />
        
        <div className="back-link" onClick={() => navigate("/tickets")}>
          <FiArrowLeft /> Retour à la liste des matchs
        </div>
        
        <div className="hero-content">
          <div className="hero-flags">
            <img src={getFlag(match.team1)} className="hero-flag" alt="" style={{ width: 240, height: 160 }} />
            <span style={{ fontFamily: FONT_D, fontSize: 48, opacity: 0.3 }}>vs</span>
            <img src={getFlag(match.team2)} className="hero-flag" alt="" style={{ width: 240, height: 160 }} />
          </div>
          
          <div style={{ fontFamily: FONT_D, fontSize: 56, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 32 }}>
            Match {match.stage.replace('_', ' ')}
          </div>
          <div className="hero-meta">
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FiCalendar size={20} /> 
              {new Date(match.match_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FiMapPin size={20} /> 
              {match.venue} — {match.city}
            </span>
          </div>
        </div>
      </div>



      <div className="booking-main">
        <div className="booking-form">
          <h2 className="category-title">{selectedTicket?.category}</h2>

          <div style={{ display: 'flex', gap: 24 }}>
            <div className="input-group">
              <label className="input-label">Quantité</label>
              <div className="qty-picker">
                <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}><FiMinus /></button>
                <span className="qty-val">{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity(q => Math.min(3, q + 1))}><FiPlus /></button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Catégorie <FiInfo size={14} style={{ marginLeft: 6, verticalAlign: 'middle', opacity: 0.4 }} /></label>
              <div>
                <select 
                  className="form-select"
                  value={selectedTicket?.id || ""}
                  onChange={(e) => {
                    const tid = parseInt(e.target.value);
                    const ticket = match.tickets?.find(t => t.id === tid);
                    if (ticket) setSelectedTicket(ticket);
                  }}
                >
                  {match.tickets?.map(t => (
                    <option key={t.id} value={t.id}>{t.category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="price-summary">
            <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 12, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>
              {quantity} x Billet de match + {selectedTicket?.category}
            </div>
            <div className="price-total" style={{ justifyContent: "center" }}>
              ${(selectedTicket?.price * quantity).toLocaleString()}
            </div>
            <button className="book-btn" onClick={handleBooking}>
              Sélectionner {selectedTicket?.category}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
