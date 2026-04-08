import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiCheck, FiInfo, FiMapPin, FiCalendar, FiClock, FiChevronRight, FiShield, FiZap, FiShoppingBag } from "react-icons/fi";
import { FONT, C, getCode } from "./Home/constants";
import { useTheme } from "../context/ThemeContext";
import { getMatches } from "../services/api";
import "./Tickets.css";

export default function Tickets() {
  const { darkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get("match_id");

  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setMounted(true); 
    fetchData();
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

  const stages = ["all", "group", "round_of_16", "quarter", "semi", "final"];

  let filteredMatches = filter === "all" 
    ? matches 
    : matches.filter(m => m.stage === filter);

  if (matchId) {
    filteredMatches = matches.filter(m => String(m.id) === String(matchId));
  }

  const getFlag = (team) => {
    const code = getCode(team);
    return code ? `https://flagcdn.com/${code}.svg` : "https://flagcdn.com/un.svg";
  };

  return (
    <div className="tickets-page" style={{
      "--bg-color": darkMode ? "#080808" : "#fdfdfd",
      "--card-bg": darkMode ? "#121212" : "#ffffff",
      "--text-color": darkMode ? "#ffffff" : "#0d0d0d",
      "--sub-text": darkMode ? "#888" : "#666",
      "--border-color": darkMode ? "rgba(255,255,255,0.08)" : "#f0f0f0",
      "--tag-bg": darkMode ? "#1a1a1a" : "#f5f5f5",
      "--options-bg": darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
      "--font-display": FONT.display,
      "--font-body": FONT.body,
      background: "var(--bg-color)",
      color: "var(--text-color)"
    }}>
      <section className="tickets-hero">
        <div className="hero-bg" />
        <div className="hero-gradient" />
        <div className="hero-content">
          <span className="hero-subtitle">Billetterie Officielle 2030</span>
          <h1 className="hero-title">Vivez la <span>Passion</span><br/>Sur le Terrain</h1>
          <p className="hero-desc">Sélectionnez votre match et rejoignez des millions de supporters pour l'événement le plus attendu de la décennie.</p>
        </div>
      </section>

      <div className="filter-bar-container">
        <div className="filter-bar">
          {stages.map(s => (
            <button key={s} className={`filter-btn ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
              {s === "all" ? "Tous les matchs" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <main>
        <div className="matches-grid">
          {filteredMatches.map((m) => (
            <article key={m.id} className="match-card">
              <div className="match-header">
                <div className="match-info-top">
                  <span className="match-stage">{m.group_name || m.stage.toUpperCase()}</span>
                  <div className="match-date"><FiCalendar size={14} /> {m.match_date}</div>
                </div>
                <div className="match-teams">
                  <div className="team-block">
                    <img src={getFlag(m.home_team)} alt={m.home_team} className="team-flag" />
                    <h4 className="team-name">{m.home_team}</h4>
                  </div>
                  <div className="vs-divider">VS</div>
                  <div className="team-block">
                    <img src={getFlag(m.away_team)} alt={m.away_team} className="team-flag" />
                    <h4 className="team-name">{m.away_team}</h4>
                  </div>
                </div>
                <div className="match-meta">
                  <div className="meta-item"><FiMapPin size={14} color="#c8102e" /> {m.venue}, {m.city}</div>
                  <div className="meta-item"><FiClock size={14} /> {m.match_time}</div>
                </div>
              </div>
              <div className="ticket-options">
                <h5 className="options-title">
                  Catégories disponibles
                </h5>
                {m.tickets && m.tickets.length > 0 ? m.tickets.map((t) => (
                  <div key={t.id} className="ticket-row">
                    <div className="ticket-info">
                      <div className="cat-name">{t.category}</div>
                      <div className="perks">
                         {t.status === 'available' ? `${t.available} places restantes` : 'Complet'}
                      </div>
                    </div>
                    <div className="ticket-price-action">
                      <span className="ticket-price">{t.price}€</span>
                      <button 
                        className="buy-btn" 
                        disabled={t.status !== 'available'}
                        style={darkMode ? {background: '#fff', color: '#000'} : {}}
                      >
                        {t.status === 'available' ? 'Acheter' : 'Épuisé'}
                      </button>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: 20, textAlign: "center", color: "#999", fontSize: 13 }}>
                    Aucun billet disponible pour le moment
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="info-section">
           <div className="info-card">
              <div className="info-icon"><FiShield color="#c8102e" size={24} /></div>
              <h3>Achat Sécurisé</h3>
              <p>Tous les billets sont émis via la technologie blockchain de la FIFA pour garantir l'authencité et prévenir les fraudes.</p>
           </div>
           <div className="info-card">
              <div className="info-icon"><FiZap color="#c8102e" size={24} /></div>
              <h3>Transfert Instantané</h3>
              <p>Recevez vos billets instantanément sur votre application officielle après confirmation du paiement.</p>
           </div>
           <div className="info-card">
              <div className="info-icon"><FiCheck color="#c8102e" size={24} /></div>
              <h3>Support 24/7</h3>
              <p>Notre équipe d'assistance mondiale est disponible pour vous aider à chaque étape de votre voyage FIFA 2030.</p>
           </div>
        </section>
      </main>
    </div>
  );
}