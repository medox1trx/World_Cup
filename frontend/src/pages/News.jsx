import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiCalendar, FiArrowRight, FiActivity } from "react-icons/fi";
import { NEWS_SIDE, NEWS_MORE, NEWS_FEATURED } from "./Home/constants";
import { useTheme } from "../context/ThemeContext";
import { getImageUrl } from "../services/api";

const API_BASE_URL = "http://localhost:8000/api/v1";
const FONT_D = "'Bebas Neue', sans-serif";
const FONT_B = "'DM Sans', sans-serif";

export default function News() {
  const { darkMode } = useTheme();
  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
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
          params: { q: filter, language: "en", pageSize: 20 }
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
  }, [filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) setFilter(searchTerm);
  };

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
        .pkg { border-radius:10px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.22s ease, box-shadow 0.22s ease; background: var(--card-bg); border: 1px solid var(--border-main); }
        .pkg:hover { transform:translateY(-5px); border-color: var(--border-hover); box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
        .btn-shim { position:relative; overflow:hidden; }
        .btn-shim .sh { position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); pointer-events:none; }
        .btn-shim:hover .sh { animation:shim 0.5s ease forwards; }
        @keyframes shim { from{left:-80%;} to{left:130%;} }
        .g-news { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
        @media(max-width: 768px) { .g-news { grid-template-columns: 1fr; } }
        
        /* ── RESET VISITED LINKS (NO PURPLE) ── */
        a, a:visited {
          color: inherit;
          text-decoration: none !important;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hw" style={{ position: "relative", paddingTop: 100, paddingBottom: 60 }}>
        <h1 style={{ fontFamily: FONT_D, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 60 }}>
          Actualités
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: `1px solid var(--border-main)`, borderRadius: 100, overflow: "hidden", maxWidth: 400, flex: 1 }}>
            <input type="text" placeholder="Chercher un sujet..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-main)", padding: "12px 20px", flex: 1, fontFamily: FONT_B, fontSize: 14 }} />
            <button type="submit" style={{ background: "var(--btn-bg)", color: "var(--btn-text)", border: "none", padding: "0 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiSearch size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* TABS */}
      <div className="hw" style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, scrollbarWidth: "none" }}>
          {categories.map(cat => {
            const isSel = filter === cat.query;
            return (
              <button key={cat.label} onClick={() => setFilter(cat.query)} style={{
                background: isSel ? "var(--btn-bg)" : "transparent",
                color: isSel ? "var(--btn-text)" : "var(--text-muted)",
                border: isSel ? `1px solid var(--btn-bg)` : `1px solid var(--border-main)`,
                padding: "10px 22px", borderRadius: 100, fontSize: 12, fontWeight: 800,
                cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
                textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT_B
              }} onMouseOver={e => !isSel && (e.currentTarget.style.borderColor = "var(--text-muted)")}
                 onMouseOut={e => !isSel && (e.currentTarget.style.borderColor = "var(--border-main)")}>
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

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
            {news.map((item, i) => (
              <a href={item.url || "#"} target="_blank" rel="noopener noreferrer" key={i} className="pkg" style={{ textDecoration: "none", color: tText }}>
                <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                  <img 
                    src={getImageUrl(item.urlToImage || item.img)} 
                    alt={item.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0) scale(1)"} 
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
          <div style={{ display: "flex", justifyContent: "center", gap: 10, maxWidth: 400, margin: "0 auto", position: "relative" }}>
            <input type="email" placeholder="votre@email.com" style={{ flex: 1, background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: `1px solid var(--border-main)`, borderRadius: 100, padding: "0 20px", color: "var(--text-main)", fontFamily: FONT_B, fontSize: 14, outline: "none" }} />
            <button className="btn-shim" style={{ background: "var(--btn-bg)", color: "var(--btn-text)", border: "none", padding: "14px 24px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8, fontFamily: FONT_B, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer" }}>
              <span className="sh" style={{ background: `linear-gradient(90deg,transparent,${darkMode?"rgba(255,255,255,.45)":"rgba(0,0,0,.15)"},transparent)` }} /> S'inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}