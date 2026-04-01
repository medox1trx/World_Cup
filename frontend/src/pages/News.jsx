import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Calendar, Clock, ArrowRight, Newspaper, TrendingUp, ChevronRight, Share2 } from "lucide-react";
import { FONT, C, NEWS_FEATURED, NEWS_SIDE, NEWS_MORE } from "./Home/constants";
import { useTheme } from "../context/ThemeContext";

const API_BASE_URL = "http://localhost:8000/api/v1";

export default function News() {
  const { darkMode } = useTheme();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("FIFA World Cup");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Theme-aware palette
  const theme = {
    bg: darkMode ? "#080808" : "#fdfdfd",
    cardBg: darkMode ? "#121212" : "#ffffff",
    text: darkMode ? "#ffffff" : C.black,
    subText: darkMode ? "#a0a0a0" : "#555",
    border: darkMode ? "rgba(255,255,255,0.08)" : "#f0f0f0",
    tabBg: darkMode ? "#121212" : "#ffffff",
    shadow: darkMode ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.08)",
  };

  const categories = [
    { label: "Top Stories", query: "FIFA World Cup" },
    { label: "Morocco 2030", query: "World Cup Morocco" },
    { label: "Spain 2030", query: "World Cup Spain" },
    { label: "Portugal 2030", query: "World Cup Portugal" },
    { label: "Football News", query: "Football Soccer" },
  ];

  /* ... rest of the code logic remains same ... */
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/news`, {
          params: {
            q: filter,
            language: "en",
            pageSize: 12,
          }
        });
        
        const articles = response.data.articles || [];
        const filtered = articles.filter(a => a.title !== "[Removed]" && a.urlToImage);
        
        if (filtered.length === 0) {
          setNews([...NEWS_SIDE, ...NEWS_MORE, NEWS_FEATURED]); 
        } else {
          setNews(filtered);
        }
      } catch (err) {
        console.error("News API Error:", err);
        setError("Failed to fetch fresh news. Showing editor's picks.");
        setNews([...NEWS_SIDE, ...NEWS_MORE, NEWS_FEATURED]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setFilter(searchTerm);
    }
  };

  const formatDate = (dateStr) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('fr-FR', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ 
      fontFamily: FONT.body, 
      background: theme.bg, 
      color: theme.text, 
      minHeight: "100vh", 
      paddingBottom: 120,
      transition: "background 0.3s, color 0.3s"
    }}>
      {/* HEADER SECTION */}
      <div style={{ 
        background: `linear-gradient(135deg, ${C.black} 0%, #1a1a1a 100%)`, 
        color: "white",
        padding: "80px 32px 120px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle background decoration */}
        <div style={{ 
          position: "absolute", 
          top: "-50%", 
          right: "-10%", 
          width: "500px", 
          height: "500px", 
          background: `radial-gradient(circle, ${C.red}33 0%, transparent 70%)`,
          filter: "blur(60px)",
          borderRadius: "50%"
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ 
            color: C.red, 
            fontWeight: 800, 
            letterSpacing: "0.3em", 
            textTransform: "uppercase", 
            fontSize: 14, 
            display: "block", 
            marginBottom: 20 
          }}>
            Le Hub Actu Officiel de 2030
          </span>
          <h1 style={{ 
            fontFamily: FONT.display, 
            fontSize: "clamp(3.5rem, 10vw, 7rem)", 
            fontWeight: 900, 
            textTransform: "uppercase", 
            lineHeight: 0.85, 
            margin: "0 0 40px" 
          }}>
            Actualités <span style={{ color: "transparent", WebkitTextStroke: "1px white" }}>Mondiales</span>
          </h1>

          {/* SEARCH BOX */}
          <form onSubmit={handleSearch} style={{ 
            maxWidth: 600, 
            margin: "0 auto", 
            display: "flex", 
            background: "rgba(255,255,255,0.1)", 
            backdropFilter: "blur(10px)",
            borderRadius: 16,
            padding: 8,
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <input 
              type="text" 
              placeholder="Chercher un sujet ou une équipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                padding: "12px 20px",
                flex: 1,
                fontSize: 16,
                fontWeight: 500
              }}
            />
            <button type="submit" style={{
              background: C.red,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "12px 24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              transition: "transform 0.2s"
            }}>
              <Search size={18} />
              <span className="hide-mobile">Chercher</span>
            </button>
          </form>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ 
        maxWidth: 1300, 
        margin: "-40px auto 60px", 
        padding: "0 32px",
        position: "relative",
        zIndex: 10
      }}>
        <div style={{ 
          display: "flex", 
          gap: 12, 
          padding: 12, 
          background: theme.tabBg, 
          borderRadius: 20, 
          boxShadow: theme.shadow,
          overflowX: "auto",
          scrollbarWidth: "none",
          border: `1px solid ${theme.border}`,
          transition: "all 0.3s"
        }}>
          {categories.map(cat => {
            const isSel = filter === cat.query;
            return (
              <button 
                key={cat.label}
                onClick={() => setFilter(cat.query)}
                style={{
                  background: isSel ? (darkMode ? "white" : C.black) : "transparent",
                  color: isSel ? (darkMode ? C.black : "white") : (darkMode ? "rgba(255,255,255,0.5)" : "#666"),
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <section style={{ maxWidth: 1380, margin: "0 auto", padding: "0 32px" }}>
        {error && (
          <div style={{ 
            background: darkMode ? "rgba(197, 48, 48, 0.1)" : "#fff5f5", 
            border: `1px solid ${darkMode ? "rgba(197, 48, 48, 0.2)" : "#feb2b2"}`, 
            color: "#c53030", 
            padding: "16px 24px", 
            borderRadius: 12, 
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontWeight: 600
          }}>
            <TrendingUp size={20} />
            {error}
          </div>
        )}

        {/* NEWS GRID */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 32 }}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} style={{ height: 450, background: theme.border, borderRadius: 24, animation: "pulse 1.5s infinite ease-in-out" }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 40 }}>
            {/* FEATURED FIRST BIG BLOCK */}
            {news.map((item, i) => {
              const isLarge = i === 0;
              return (
                <article key={i} style={{ 
                  gridColumn: isLarge ? "1 / -1" : "auto",
                  display: isLarge ? "flex" : "block",
                  flexDirection: isLarge ? (window.innerWidth < 900 ? "column" : "row") : "column",
                  background: theme.cardBg,
                  borderRadius: 32,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: `1px solid ${theme.border}`,
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = darkMode ? "0 30px 60px rgba(0,0,0,0.6)" : "0 30px 60px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
                }}
                onClick={() => window.open(item.url || "#", "_blank")}
                >
                  {/* IMAGE */}
                  <div style={{ 
                    flex: isLarge ? "1.4" : "none",
                    height: isLarge ? 550 : 260,
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <img 
                      src={item.urlToImage || item.img} 
                      alt={item.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    {isLarge && (
                      <div style={{ 
                        position: "absolute", 
                        top: 24, 
                        left: 24, 
                        background: C.red, 
                        color: "white", 
                        padding: "8px 16px", 
                        borderRadius: 8, 
                        fontSize: 12, 
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em"
                      }}>
                        À LA UNE
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div style={{ 
                    flex: 1, 
                    padding: isLarge ? "60px" : "32px", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center" 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                      <span style={{ 
                        color: C.red, 
                        fontSize: 11, 
                        fontWeight: 900, 
                        textTransform: "uppercase", 
                        letterSpacing: "0.1em",
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                      }}>
                        <Newspaper size={14} />
                        {item.source?.name || item.tag || "FIFA 2030"}
                      </span>
                      <div style={{ width: 4, height: 4, background: darkMode ? "rgba(255,255,255,0.2)" : "#ccc", borderRadius: "50%" }} />
                      <span style={{ color: theme.subText, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                        <Calendar size={14} />
                        {formatDate(item.publishedAt || item.date)}
                      </span>
                    </div>

                    <h3 style={{ 
                      fontFamily: FONT.display, 
                      fontSize: isLarge ? "clamp(2rem, 4vw, 3.8rem)" : 28, 
                      fontWeight: 900, 
                      textTransform: "uppercase", 
                      margin: "0 0 20px", 
                      lineHeight: 1, 
                      color: theme.text 
                    }}>
                      {item.title}
                    </h3>

                    <p style={{ 
                      color: theme.subText, 
                      fontSize: isLarge ? 18 : 15, 
                      lineHeight: 1.6, 
                      margin: 0, 
                      maxWidth: "70ch",
                      display: "-webkit-box",
                      WebkitLineClamp: isLarge ? 3 : 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {item.description || item.desc}
                    </p>

                    <div style={{ 
                      marginTop: 32, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between" 
                    }}>
                      <div style={{ 
                        color: C.red, 
                        fontSize: 13, 
                        fontWeight: 900, 
                        textTransform: "uppercase", 
                        letterSpacing: "0.1em",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        transition: "gap 0.2s"
                      }}>
                        Lire la suite <ArrowRight size={18} />
                      </div>
                      
                      <button style={{ 
                        background: "transparent", 
                        border: "none", 
                        color: darkMode ? "rgba(255,255,255,0.2)" : "#ccc", 
                        cursor: "pointer" 
                      }} onClick={(e) => {
                        e.stopPropagation();
                      }}>
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* CALL TO ACTION */}
      <div style={{ 
        maxWidth: 1380, 
        margin: "120px auto 0", 
        padding: "0 32px" 
      }}>
        <div style={{ 
          background: C.red, 
          borderRadius: 40, 
          padding: "80px", 
          textAlign: "center", 
          color: "white",
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 30px 60px ${C.red}33`
        }}>
          {/* Decorative pattern */}
          <div style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            opacity: 0.1,
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />

          <h2 style={{ 
            fontFamily: FONT.display, 
            fontSize: "clamp(2.5rem, 6vw, 4rem)", 
            fontWeight: 900, 
            margin: "0 0 24px", 
            position: "relative" 
          }}>
            Restez Connectés à l'Histoire
          </h2>
          <p style={{ 
            maxWidth: 600, 
            margin: "0 auto 48px", 
            fontSize: 18, 
            opacity: 0.9, 
            position: "relative" 
          }}>
            Abonnez-vous à notre newsletter pour recevoir les exclusivités sur la préparation du Maroc, de l'Espagne et du Portugal.
          </p>
          <div style={{ 
            display: "flex", 
            maxWidth: 500, 
            margin: "0 auto", 
            gap: 12, 
            flexWrap: "wrap",
            position: "relative" 
          }}>
            <input 
              type="email" 
              placeholder="votre@email.com" 
              style={{
                flex: 1,
                padding: "20px 30px",
                borderRadius: 16,
                border: "none",
                fontSize: 16,
                fontWeight: 600,
                color: "#333"
              }}
            />
            <button style={{
              background: C.black,
              color: "white",
              padding: "20px 40px",
              borderRadius: 16,
              border: "none",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              textTransform: "uppercase"
            }}>
              S'inscrire
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .hide-mobile {
          @media (max-width: 600px) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}