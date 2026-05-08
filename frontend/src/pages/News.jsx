import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiCalendar, FiArrowRight, FiActivity } from "react-icons/fi";
import { NEWS_SIDE, NEWS_MORE, NEWS_FEATURED } from "./Home/constants";
import { useTheme } from "../context/ThemeContext";
import { getImageUrl, subscribeNewsletter } from "../services/api";

const API_BASE_URL = "http://localhost:8000/api/v1";
const FONT_D = "'Bebas Neue', sans-serif";
const FONT_B = "'DM Sans', sans-serif";

export default function News() {
  const { darkMode } = useTheme();
  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await subscribeNewsletter(email);
      setMessage({ type: "success", text: res.data.message });
      setEmail("");
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.errors?.email?.[0] || err.response?.data?.message || "Une erreur est survenue." 
      });
    } finally {
      setSubmitting(false);
    }
  };
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); return () => clearTimeout(t); }, []);

  const categories = [
    { label: "À la Une", query: "" },
    { label: "Stades & Infrastructures", query: "Stades" },
    { label: "Billetterie", query: "Billets" },
    { label: "Tirage au Sort", query: "Tirage" },
    { label: "Technologies", query: "Technologie" },
    { label: "Développement Durable", query: "Durabilité" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/news`, {
          params: { language: "en", pageSize: 50 }
        });
        
        const articles = response.data.articles || [];
        const filtered = articles.filter(a => a.title && (a.urlToImage || a.img));
        
        if (filtered.length === 0) setNews([...NEWS_SIDE, ...NEWS_MORE, NEWS_FEATURED]); 
        else setNews(filtered);
      } catch (err) {
        console.error("News API Error:", err);
        setError("Impossible de charger les actualités fraîches. Affichage de la sélection.");
        setNews([...NEWS_SIDE, ...NEWS_MORE, NEWS_FEATURED]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filteredNews = news.filter(n => {
    const s = searchTerm.toLowerCase();
    const titleMatch = n.title?.toLowerCase().includes(s);
    const descMatch = n.description?.toLowerCase().includes(s);
    return titleMatch || descMatch;
  });

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const tText = "var(--text-main)";
  const tBtnBg = "var(--btn-bg)";
  const tBtnText = "var(--btn-text)";
  const tInputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const tCardGrad = darkMode 
    ? "linear-gradient(to top, rgba(13,13,13,0.5) 0%, transparent 100%)" 
    : "linear-gradient(to top, rgba(253,253,253,0.2) 0%, transparent 100%)";

  return (
    <div style={{ 
      fontFamily: FONT_B, 
      background: "var(--main-bg)", 
      color: "var(--text-main)", 
      opacity: mounted ? 1 : 0, 
      transition: "background-color 0.4s, color 0.4s, opacity 0.4s", 
      minHeight: "100vh" 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3vw,48px); }
        .pkg { border-radius:10px; overflow:hidden; display:flex; flex-direction:column; background: var(--card-bg); border: 1px solid var(--border-main); }
        .btn-shim { position:relative; overflow:hidden; }
        .btn-shim .sh { position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); pointer-events:none; }
        .btn-shim:hover .sh { animation:shim 0.5s ease forwards; }
        @keyframes shim { from{left:-80%;} to{left:130%;} }
        .g-news { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
        @media(max-width: 768px) { .g-news { grid-template-columns: 1fr; } }
        
        .cal-filter-bar::-webkit-scrollbar { display: none; }
        .cal-filter-bar { scrollbar-width: none; }

        /* ── RESET VISITED LINKS (NO PURPLE) ── */
        a, a:visited {
          color: inherit;
          text-decoration: none !important;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hw" style={{ position: "relative", paddingTop: 100, paddingBottom: 32 }}>
        <h1 style={{ fontFamily: FONT_D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>
          Actualités
        </h1>
        
        <div style={{ marginBottom: 40, position: "relative", maxWidth: 600 }}>
          <FiSearch style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: 20 }} />
          <input 
            type="text" 
            placeholder="Rechercher une actualité..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 20px 16px 50px",
              borderRadius: 100,
              border: `1px solid var(--border-main)`,
              background: "transparent",
              color: "var(--text-main)",
              fontFamily: FONT_B,
              fontSize: 16,
              outline: "none"
            }}
          />
        </div>
      </section>

      {/* CONTENT */}
      <section className="hw" style={{ paddingBottom: 100 }}>
        {error && (
          <div style={{ padding: 20, background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.2)", borderRadius: 10, color: "#ff6b6b", marginBottom: 30, display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600 }}>
            <FiActivity size={16} /> {error}
          </div>
        )}

        {loading ? (
          <div className="g-news">
            {[...Array(6)].map((_, i) => <div key={i} style={{ height: 400, background: tInputBg, borderRadius: 10 }} />)}
          </div>
        ) : (
          <div className="g-news">
            {filteredNews.map((item, i) => (
              <a href={item.url || "#"} target="_blank" rel="noopener noreferrer" key={i} className="pkg" style={{ textDecoration: "none", color: tText }}>
                <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                  <img 
                    src={getImageUrl(item.urlToImage || item.img)} 
                    alt={item.title} 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000"; }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: tCardGrad }} />
                  {i === 0 && (
                     <div style={{ position: "absolute", top: 14, left: 16, background: tBtnBg, color: tBtnText, fontFamily: FONT_B, fontSize: 9, fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2 }}>
                       À La Une
                     </div>
                  )}
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ color: "var(--text-muted)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {item.source?.name || item.tag || "FIFA 2026"}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: 11, fontWeight: 600 }}>
                      <FiCalendar size={14} /> {formatDate(item.publishedAt || item.date)}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: FONT_D, fontSize: 24, fontWeight: 800, lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "0.02em", margin: "0 0 12px" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, fontFamily: FONT_B, flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.description || item.desc}
                  </p>
                  <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6, color: "var(--text-main)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Lire l'article <FiArrowRight size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
      
      {/* Newsletter */}
      <section className="hw" style={{ paddingBottom: 100 }}>
        <div style={{ background: "var(--card-bg)", borderRadius: 10, border: `1px solid var(--border-main)`, padding: "clamp(40px,6vw,60px)", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: darkMode ? "none" : "0 20px 40px rgba(0,0,0,0.04)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(var(--text-muted) 1px,transparent 1px)`, opacity: 0.05, backgroundSize: "20px 20px" }} />
          <h2 style={{ fontFamily: FONT_D, position: "relative", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, textTransform: "uppercase", margin: "0 0 16px", color: "var(--text-main)" }}>Restez Connectés</h2>
          <p style={{ color: "var(--text-muted)", fontFamily: FONT_B, fontSize: 14, maxWidth: 500, margin: "0 auto 32px", position: "relative" }}>Abonnez-vous à notre newsletter pour recevoir les exclusivités sur la préparation de la Coupe du Monde 2026.</p>
          
          <form onSubmit={handleSubscribe} style={{ display: "flex", justifyContent: "center", gap: 10, maxWidth: 400, margin: "0 auto", position: "relative" }}>
            <input 
              type="email" 
              placeholder="votre@email.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: `1px solid var(--border-main)`, borderRadius: 100, padding: "0 20px", color: "var(--text-main)", fontFamily: FONT_B, fontSize: 14, outline: "none" }} 
            />
            <button 
              type="submit"
              disabled={submitting}
              className="btn-shim" 
              style={{ background: "var(--btn-bg)", color: "var(--btn-text)", border: "none", padding: "14px 24px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8, fontFamily: FONT_B, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1 }}
            >
              <span className="sh" style={{ background: `linear-gradient(90deg,transparent,${darkMode?"rgba(255,255,255,.45)":"rgba(0,0,0,.15)"},transparent)` }} /> 
              {submitting ? "Envoi..." : "S'inscrire"}
            </button>
          </form>

          {message && (
            <div style={{ 
              marginTop: 20, 
              color: message.type === "success" ? "#4caf50" : "#f44336", 
              fontFamily: FONT_B, 
              fontSize: 13,
              fontWeight: 600,
              position: "relative"
            }}>
              {message.text}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}