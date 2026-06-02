import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiSearch, FiCalendar, FiMapPin, FiClock, FiArrowRight, FiActivity, FiShield, FiZap, FiCheck, FiShoppingBag } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getMatches, bookTicket } from "../services/api";
import { getCode } from "./Home/constants";
import toast from "react-hot-toast";

const FONT_D = "'Bebas Neue', sans-serif";
const FONT_B = "'DM Sans', sans-serif";

export default function Tickets() {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get("match_id");
  const hospitalityId = searchParams.get("hospitality_id");

  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { 
    
    const t = setTimeout(() => setMounted(true), 40); 
    fetchData();
    return () => clearTimeout(t);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const matchesData = await getMatches();
      setMatches(matchesData);
    } catch (err) {
      console.error("Tickets data fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookTicket = (m) => {
    const availableTickets = m.tickets?.filter(t => t.status === 'available') || [];
    if (availableTickets.length === 0) {
       toast.error("Aucun billet disponible.");
       return;
    }
    const cheapestTicket = availableTickets.sort((a, b) => a.price - b.price)[0];
    
    if (!user) {
      toast.error("Veuillez vous connecter pour réserver des billets.");
      navigate("/login");
      return;
    }
    setActiveTicket(cheapestTicket);
    setQuantity(1);
    setShowConfirm(true);
  };

  const executeBooking = async () => {
    if (!activeTicket) return;
    
    setBookingId(activeTicket.id);
    setShowConfirm(false);
    
    const tid = toast.loading("Finalisation de votre réservation...");
    
    try {
      const res = await bookTicket({
        ticket_id: activeTicket.id,
        quantity: quantity
      });
      
      if (res.status === 'success') {
        toast.success(res.message || "Réservation confirmée !", { id: tid });
        setMatches(prev => prev.map(match => ({
          ...match,
          tickets: match.tickets.map(t => {
            if (t.id === activeTicket.id) {
              const newAvailable = t.available - quantity;
              return { 
                ...t, 
                available: newAvailable,
                status: newAvailable <= 0 ? 'sold_out' : t.status
              };
            }
            return t;
          })
        })));
      }
    } catch (err) {
      toast.error(err.message || "Erreur lors de la réservation.", { id: tid });
    } finally {
      setBookingId(null);
      setActiveTicket(null);
      setQuantity(1);
    }
  };


  const stages = [
    { label: "Tous les Matchs", query: "all" },
    { label: "Phase de Groupes", query: "group" },
    { label: "Huitièmes", query: "round_of_16" },
    { label: "Quarts", query: "quarter" },
    { label: "Demi-finales", query: "semi" },
    { label: "Finale", query: "final" },
  ];

  let filteredMatches = filter === "all" 
    ? matches 
    : matches.filter(m => m.stage === filter);

  if (searchTerm.trim()) {
    const s = searchTerm.toLowerCase();
    filteredMatches = filteredMatches.filter(m => 
        (m.team1?.name || m.team1).toLowerCase().includes(s) || 
        (m.team2?.name || m.team2).toLowerCase().includes(s) ||
        m.city.toLowerCase().includes(s) ||
        m.venue.toLowerCase().includes(s)
    );
  }

  if (matchId) {
    filteredMatches = matches.filter(m => String(m.id) === String(matchId));
  }

  const getFlag = (team) => {
    const code = (typeof team === 'object' ? team?.flag : null) || getCode(team);
    return code ? `https://flagcdn.com/w80/${code.toLowerCase()}.png` : "https://flagcdn.com/un.svg";
  };

  const tBg = darkMode ? "#0d0d0d" : "#fdfdfd";
  const tText = darkMode ? "white" : "#0d0d0d";
  const tCardBg = darkMode ? "#111111" : "#ffffff";
  const tBorder = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tBorderHov = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const tSubText = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";
  const tStroke = darkMode ? "1.5px rgba(255,255,255,0.6)" : "1.5px rgba(0,0,0,0.2)";
  const tGradTop = darkMode ? "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0) 100%)" : "linear-gradient(to top, #fdfdfd 0%, rgba(253,253,253,0) 100%)";
  const tInputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const tDot = darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)";
  const tBtnBg = darkMode ? "white" : "#0d0d0d";
  const tBtnText = darkMode ? "#0d0d0d" : "white";

  return (
    <div style={{ fontFamily: FONT_B, background: tBg, color: tText, opacity: mounted ? 1 : 0, transition: "background-color 0.4s, color 0.4s, opacity 0.4s", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3vw,48px); }
        .pkg { border-radius:12px; overflow:hidden; display:flex; flex-direction:column; background: ${tCardBg}; border: 1px solid ${tBorder}; }
        .btn-shim { position:relative; overflow:hidden; }
        .btn-shim .sh { position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); pointer-events:none; }
        .btn-shim:hover .sh { animation:shim 0.5s ease forwards; }
        @keyframes shim { from{left:-80%;} to{left:130%;} }
        /* Grid */
        .g-tickets { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 24px; }
        @media(max-width: 768px) { .g-tickets { grid-template-columns: 1fr; } }
        
        .cal-filter-bar::-webkit-scrollbar { display: none; }
        .cal-filter-bar { scrollbar-width: none; }

        /* ── RESET VISITED LINKS (NO PURPLE) ── */
        a, a:visited {
          color: inherit;
          text-decoration: none !important;
        }
        
        /* Custom Ticket Styles */
        .ticket-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: ${tInputBg}; border-radius: 8px; margin-bottom: 8px; transition: all 0.2s; border: 1px solid transparent; }
        .ticket-row:hover { border-color: ${tBorderHov}; background: ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}; }
        .buy-btn { background: ${tBtnBg}; color: ${tBtnText}; border: none; padding: 10px 24px; border-radius: 100px; font-size: 13px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .buy-btn:hover { transform: scale(1.05); opacity: 0.9; }
        .buy-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 1000; display: flex; alignItems: center; justifyContent: center; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .modal-overlay.open { opacity: 1; pointer-events: auto; }
        .modal-content { background: ${tCardBg}; border: 1px solid ${tBorder}; border-radius: 24px; width: 90%; max-width: 500px; padding: 40px; transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .modal-overlay.open .modal-content { transform: scale(1); }
      `}</style>

      {/* HERO SECTION */}
      <section className="hw" style={{ position: "relative", paddingTop: 100, paddingBottom: 32 }}>
        <h1 style={{ fontFamily: FONT_D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>
          Les Billets
        </h1>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", background: tInputBg, border: `1px solid ${tBorder}`, borderRadius: 100, overflow: "hidden", maxWidth: 400, flex: 1 }}>
            <input type="text" placeholder="Rechercher une équipe, un stade..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              style={{ background: "transparent", border: "none", outline: "none", color: tText, padding: "12px 20px", flex: 1, fontFamily: FONT_B, fontSize: 14 }} />
            <div style={{ background: tBtnBg, color: tBtnText, border: "none", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiSearch size={16} />
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="cal-filter-bar" style={{
          display: "flex", alignItems: "center", gap: 6,
          overflowX: "auto", paddingBottom: 4, marginBottom: 40
        }}>
          {stages.map(s => {
            const isSel = filter === s.query;
            return (
              <button key={s.query} onClick={() => setFilter(s.query)} style={{
                background: isSel ? tText : "transparent",
                color: isSel ? tBg : tSubText,
                border: `1px solid ${isSel ? tText : tBorder}`,
                padding: "5px 14px", borderRadius: 100,
                fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer",
                whiteSpace: "nowrap", transition: "all 0.18s", fontFamily: FONT_B,
              }}>
                {s.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* CONTENT */}
      <section className="hw" style={{ paddingBottom: 100 }}>
        {loading ? (
          <div className="g-tickets">
            {[...Array(6)].map((_, i) => <div key={i} style={{ height: 400, background: tInputBg, borderRadius: 12 }} />)}
          </div>
        ) : (
          <div className="g-tickets">
            {filteredMatches.map((m) => {
              const cheapestTicket = m.tickets && m.tickets.length > 0 
                ? [...m.tickets].sort((a,b) => a.price - b.price)[0] 
                : null;

              return (
                <div key={m.id} className="pkg" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img src={getFlag(m.team1)} alt="" style={{ width: 36, height: 24, borderRadius: 3, objectFit: "cover" }} />
                      <span style={{ fontFamily: FONT_D, fontSize: 20, textTransform: "uppercase" }}>{m.team1?.name || m.team1}</span>
                      <span style={{ opacity: 0.2, fontWeight: 900 }}>VS</span>
                      <span style={{ fontFamily: FONT_D, fontSize: 20, textTransform: "uppercase" }}>{m.team2?.name || m.team2}</span>
                      <img src={getFlag(m.team2)} alt="" style={{ width: 36, height: 24, borderRadius: 3, objectFit: "cover" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: tSubText, fontSize: 13, fontWeight: 600 }}>
                      <FiClock size={16} />
                      {m.match_time}
                      <span style={{ margin: "0 8px", opacity: 0.3 }}>|</span>
                      <FiMapPin size={14} /> {m.city}
                    </div>

                    {cheapestTicket ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.05em" }}>À partir de</div>
                          <div style={{ fontSize: 18, fontWeight: 900 }}>{cheapestTicket.price}€</div>
                        </div>
                        <button 
                          className="buy-btn"
                          onClick={() => handleBookTicket(m)}
                        >
                          Acheter
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, textTransform: "uppercase" }}>Bientôt disponible</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* INFO SECTION - Editorial Style */}
      <section className="hw" style={{ paddingBottom: 100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          <div style={{ background: tCardBg, padding: 40, borderRadius: 12, border: `1px solid ${tBorder}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: tInputBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <FiShield size={24} />
            </div>
            <h3 style={{ fontFamily: FONT_D, fontSize: 24, fontWeight: 800, textTransform: "uppercase", marginBottom: 16 }}>Achat Sécurisé</h3>
            <p style={{ color: tSubText, fontSize: 14, lineHeight: 1.6 }}>Tous les billets sont émis via la technologie blockchain de la FIFA pour garantir l'authencité et prévenir les fraudes.</p>
          </div>
          <div style={{ background: tCardBg, padding: 40, borderRadius: 12, border: `1px solid ${tBorder}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: tInputBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <FiZap size={24} />
            </div>
            <h3 style={{ fontFamily: FONT_D, fontSize: 24, fontWeight: 800, textTransform: "uppercase", marginBottom: 16 }}>Accès Digital</h3>
            <p style={{ color: tSubText, fontSize: 14, lineHeight: 1.6 }}>Recevez vos billets instantanément sur votre application officielle après confirmation du paiement.</p>
          </div>
          <div style={{ background: tCardBg, padding: 40, borderRadius: 12, border: `1px solid ${tBorder}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: tInputBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <FiCheck size={24} />
            </div>
            <h3 style={{ fontFamily: FONT_D, fontSize: 24, fontWeight: 800, textTransform: "uppercase", marginBottom: 16 }}>Support Elite</h3>
            <p style={{ color: tSubText, fontSize: 14, lineHeight: 1.6 }}>Notre équipe d'assistance mondiale est disponible pour vous aider à chaque étape de votre voyage FIFA 2026.</p>
          </div>
        </div>
      </section>
      
      {/* Newsletter - Same as News */}
      <section className="hw" style={{ paddingBottom: 100 }}>
        <div style={{ background: tCardBg, borderRadius: 12, border: `1px solid ${tBorder}`, padding: "clamp(40px,6vw,60px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${tDot} 1px,transparent 1px)`, backgroundSize: "20px 20px" }} />
          <h2 style={{ fontFamily: FONT_D, position: "relative", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, textTransform: "uppercase", margin: "0 0 16px", color: tText }}>Ventes Prioritaires</h2>
          <p style={{ color: tSubText, fontFamily: FONT_B, fontSize: 14, maxWidth: 500, margin: "0 auto 32px", position: "relative" }}>Devenez membre pour accéder aux pré-ventes exclusives et aux meilleures places du tournoi.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, maxWidth: 400, margin: "0 auto", position: "relative" }}>
            <input type="email" placeholder="votre@email.com" style={{ flex: 1, background: tInputBg, border: `1px solid ${tBorder}`, borderRadius: 100, padding: "0 20px", color: tText, fontFamily: FONT_B, fontSize: 14, outline: "none" }} />
            <button className="btn-shim" style={{ background: tBtnBg, color: tBtnText, border: "none", padding: "14px 24px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8, fontFamily: FONT_B, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer" }}>
              <span className="sh" style={{ background: `linear-gradient(90deg,transparent,${darkMode?"rgba(255,255,255,.45)":"rgba(0,0,0,.15)"},transparent)` }} /> S'abonner
            </button>
          </div>
        </div>
      </section>
      {/* CONFIRMATION MODAL */}
      <div className={`modal-overlay ${showConfirm ? 'open' : ''}`} onClick={() => setShowConfirm(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: tInputBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiShoppingBag size={32} />
            </div>
          </div>
          
          <h2 style={{ fontFamily: FONT_D, fontSize: 32, fontWeight: 900, textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>
            Confirmation
          </h2>
          
          <p style={{ textAlign: "center", color: tSubText, fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
            Sélectionnez le nombre de billets pour la catégorie <strong style={{color: tText}}>{activeTicket?.category}</strong>.
          </p>

          <div style={{ background: tInputBg, borderRadius: 16, padding: 24, marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontWeight: 800, textTransform: "uppercase", fontSize: 12, opacity: 0.6 }}>Quantité</span>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${tBorder}`, background: tCardBg, color: tText, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                > - </button>
                <span style={{ fontSize: 18, fontWeight: 900, minWidth: 20, textAlign: "center" }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(Math.min(3, activeTicket?.available || 3), q + 1))}
                  style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${tBorder}`, background: tCardBg, color: tText, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                > + </button>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: `1px dashed ${tBorder}` }}>
              <span style={{ fontWeight: 800, textTransform: "uppercase", fontSize: 12, opacity: 0.6 }}>Total</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: "#c8102e" }}>{(activeTicket?.price * quantity).toFixed(2)}€</span>
            </div>
            
            <p style={{ fontSize: 10, color: "#c8102e", textAlign: "center", marginTop: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Limite de 3 billets par commande
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <button onClick={() => setShowConfirm(false)} style={{ 
              background: "transparent", border: `1px solid ${tBorder}`, 
              color: tText, padding: "16px", borderRadius: 100, fontWeight: 800, 
              fontSize: 13, textTransform: "uppercase", cursor: "pointer" 
            }}>
              Annuler
            </button>
            <button onClick={executeBooking} style={{ 
              background: "#c8102e", border: "none", color: "white", 
              padding: "16px", borderRadius: 100, fontWeight: 800, 
              fontSize: 13, textTransform: "uppercase", cursor: "pointer" 
            }}>
              Réserver {quantity > 1 ? `(${quantity})` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}