import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiCalendar, FiMapPin, FiClock, FiArrowRight, FiActivity, FiShield, FiZap, FiCheck } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { getMatches } from "../services/api";
import { getCode } from "./Home/constants";

const FONT_D = "'Barlow Condensed', sans-serif";
const FONT_B = "'Barlow', sans-serif";

export default function Tickets() {
  const { darkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get("match_id");

  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
        m.home_team.toLowerCase().includes(s) || 
        m.away_team.toLowerCase().includes(s) ||
        m.city.toLowerCase().includes(s) ||
        m.venue.toLowerCase().includes(s)
    );
  }

  if (matchId) {
    filteredMatches = matches.filter(m => String(m.id) === String(matchId));
  }

  const getFlag = (team) => {
    const code = getCode(team);
    return code ? `https://flagcdn.com/${code}.svg` : "https://flagcdn.com/un.svg";
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
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3vw,48px); }
        .pkg { border-radius:12px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.22s ease, box-shadow 0.22s ease; background: ${tCardBg}; border: 1px solid ${tBorder}; }
        .pkg:hover { transform:translateY(-5px); border-color: ${tBorderHov}; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
        .btn-shim { position:relative; overflow:hidden; }
        .btn-shim .sh { position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); pointer-events:none; }
        .btn-shim:hover .sh { animation:shim 0.5s ease forwards; }
        @keyframes shim { from{left:-80%;} to{left:130%;} }
        /* Grid */
        .g-tickets { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 24px; }
        @media(max-width: 768px) { .g-tickets { grid-template-columns: 1fr; } }
        
        /* Custom Ticket Styles */
        .ticket-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: ${tInputBg}; border-radius: 8px; margin-bottom: 8px; transition: all 0.2s; border: 1px solid transparent; }
        .ticket-row:hover { border-color: ${tBorderHov}; background: ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}; }
        .buy-btn { background: ${tBtnBg}; color: ${tBtnText}; border: none; padding: 6px 14px; borderRadius: 4px; font-size: 11px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; }
        .buy-btn:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>

      {/* HERO SECTION */}
      <section style={{ position: "relative", minHeight: "50vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${tDot} 1px,transparent 1px)`, backgroundSize: "32px 32px", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: tGradTop, zIndex: 1 }} />
        
        <div className="hw" style={{ position: "relative", zIndex: 2, width: "100%", padding: "clamp(120px,15vh,180px) clamp(16px,3vw,48px) 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
            <div style={{ height: 1, width: 36, background: tBorderHov, flexShrink: 0 }} />
            <span style={{ color: tSubText, fontFamily: FONT_B, fontSize: 10, fontWeight: 800, letterSpacing: "0.42em", textTransform: "uppercase" }}>Billetterie Officielle</span>
          </div>
          
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: FONT_D, fontSize: "clamp(48px,8vw,110px)", fontWeight: 900, lineHeight: 0.85, textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
              RESERVEZ VOS <span style={{ color: "transparent", WebkitTextStroke: tStroke }}>PLACES</span>
            </h1>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
            <div style={{ display: "flex", background: tInputBg, border: `1px solid ${tBorder}`, borderRadius: 100, overflow: "hidden", maxWidth: 400, flex: 1 }}>
              <input type="text" placeholder="Rechercher une équipe, un stade..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                style={{ background: "transparent", border: "none", outline: "none", color: tText, padding: "12px 20px", flex: 1, fontFamily: FONT_B, fontSize: 14 }} />
              <div style={{ background: tBtnBg, color: tBtnText, border: "none", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiSearch size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="hw" style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, scrollbarWidth: "none" }}>
          {stages.map(s => {
            const isSel = filter === s.query;
            return (
              <button key={s.query} onClick={() => setFilter(s.query)} style={{
                background: isSel ? tBtnBg : "transparent",
                color: isSel ? tBtnText : tSubText,
                border: isSel ? `1px solid ${tBtnBg}` : `1px solid ${tBorder}`,
                padding: "10px 22px", borderRadius: 100, fontSize: 12, fontWeight: 800,
                cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
                textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT_B
              }} onMouseOver={e => !isSel && (e.currentTarget.style.borderColor = tSubText)}
                 onMouseOut={e => !isSel && (e.currentTarget.style.borderColor = tBorder)}>
                {s.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* CONTENT */}
      <section className="hw" style={{ paddingBottom: 100 }}>
        {loading ? (
          <div className="g-tickets">
            {[...Array(6)].map((_, i) => <div key={i} style={{ height: 400, background: tInputBg, borderRadius: 12 }} />)}
          </div>
        ) : (
          <div className="g-tickets">
            {filteredMatches.map((m) => (
              <div key={m.id} className="pkg">
                <div style={{ padding: "32px", borderBottom: `1px solid ${tBorder}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, alignItems: "center" }}>
                    <span style={{ color: tSubText, fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", background: tInputBg, padding: "4px 10px", borderRadius: 4 }}>
                      {m.group_name || m.stage.replace("_", " ").toUpperCase()}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: tSubText, fontSize: 11, fontWeight: 700 }}>
                      <FiCalendar size={14} /> {m.match_date}
                    </span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: 20, marginBottom: 24 }}>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <img src={getFlag(m.home_team)} alt={m.home_team} style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4, marginBottom: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                      <div style={{ fontFamily: FONT_D, fontSize: 18, fontWeight: 800, textTransform: "uppercase" }}>{m.home_team}</div>
                    </div>
                    <div style={{ fontFamily: FONT_D, fontSize: 24, fontWeight: 900, opacity: 0.2 }}>VS</div>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <img src={getFlag(m.away_team)} alt={m.away_team} style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4, marginBottom: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                      <div style={{ fontFamily: FONT_D, fontSize: 18, fontWeight: 800, textTransform: "uppercase" }}>{m.away_team}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 16, justifyContent: "center", color: tSubText, fontSize: 11, fontWeight: 600 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}><FiMapPin size={14} /> {m.city}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}><FiClock size={14} /> {m.match_time}</div>
                  </div>
                </div>

                <div style={{ padding: "24px", background: darkMode ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)" }}>
                  <h5 style={{ margin: "0 0 16px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5 }}>
                    Catégories disponibles
                  </h5>
                  {m.tickets && m.tickets.length > 0 ? m.tickets.map((t) => (
                    <div key={t.id} className="ticket-row">
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800 }}>{t.category}</div>
                        <div style={{ fontSize: 10, opacity: 0.6, fontWeight: 600 }}>
                           {t.status === 'available' ? `${t.available} places` : 'Complet'}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 14, fontWeight: 900 }}>{t.price}€</span>
                        <button className="buy-btn" disabled={t.status !== 'available'}>
                          {t.status === 'available' ? 'Réserver' : 'Épuisé'}
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div style={{ padding: 20, textAlign: "center", color: tSubText, fontSize: 11 }}>
                      Bientôt disponible
                    </div>
                  )}
                </div>
              </div>
            ))}
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
            <p style={{ color: tSubText, fontSize: 14, lineHeight: 1.6 }}>Notre équipe d'assistance mondiale est disponible pour vous aider à chaque étape de votre voyage FIFA 2030.</p>
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
    </div>
  );
}