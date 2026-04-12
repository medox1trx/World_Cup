import React, { useEffect, useRef, useState } from "react";
import { FiCalendar, FiArrowRight, FiArrowUpRight, FiClock, FiImage } from "react-icons/fi";
import { FONT, NEWS_FEATURED, NEWS_SIDE, NEWS_MORE } from "./constants";
import { SectionHead } from "./ui";
import { useTheme } from "../../context/ThemeContext";
import { useNews } from "../../hooks/useWorldCup";

function resolveImg(img, size = "w640") {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  return `https://flagcdn.com/${size}/${img.toLowerCase()}.png`;
}

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

function Tag({ label, dark = false }) {
  const { darkMode } = useTheme();
  const accent         = darkMode ? "#ffffff"               : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d"               : "#ffffff";
  /* dark = "on image overlay (always dark surface)" → always bright pill */
  const tagBg    = dark ? accent : (darkMode ? "rgba(255,255,255,0.12)" : accent);
  const tagColor = dark ? accentContrast : accentContrast;

  return (
    <span style={{
      display: "inline-block", padding: "3px 9px",
      fontSize: 8, fontWeight: 900, letterSpacing: "0.24em",
      textTransform: "uppercase", fontFamily: FONT.body,
      background: tagBg,
      color: tagColor,
      borderRadius: 2, lineHeight: 1.6, whiteSpace: "nowrap",
      transition: "background 0.3s, color 0.3s",
    }}>{label}</span>
  );
}

// ─── Smart image — handles errors + fallback ──────────────────
function ArticleImg({ src, style, onLoad, transition = false, isEntering = false }) {
  const { darkMode } = useTheme();
  const patternA = darkMode ? "#1a1a1a" : "#e0e0e0";
  const patternB = darkMode ? "#141414" : "#ebebeb";
  const iconFaint = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  const [ok, setOk] = useState(!!src);

  useEffect(() => { setOk(!!src); }, [src]);

  if (!src || !ok) {
    return (
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 6,
        background: `repeating-linear-gradient(45deg,${patternA} 0,${patternA} 1px,${patternB} 0,${patternB} 50%)`,
        backgroundSize: "10px 10px",
        transition: "background 0.3s",
      }}>
        <FiImage size={18} color={iconFaint} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setOk(false)}
      onLoad={onLoad}
      style={{ 
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        opacity: transition ? 0 : 1,
        transform: transition 
          ? "translateX(-30px) scale(1.08)" 
          : isEntering 
            ? "translateX(40px) scale(0.95)" 
            : "translateX(0) scale(1)",
        transition: "opacity 0.18s ease-out, transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
        ...style 
      }}
    />
  );
}

// ─── Count-up ──────────────────────────────────────────────────
function useCountUp(target, duration = 1400, delay = 0, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const numeric = parseInt(target.toString().replace(/\D/g, ""), 10);
    const suffix  = target.toString().replace(/[0-9]/g, "");
    if (isNaN(numeric)) { setValue(target); return; }
    let raf, startTime = null;
    const tid = setTimeout(() => {
      raf = requestAnimationFrame(function step(ts) {
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / duration, 1);
        const e = 1 - Math.pow(1 - p, 4);
        setValue(Math.floor(e * numeric) + suffix);
        if (p < 1) raf = requestAnimationFrame(step);
        else setValue(numeric + suffix);
      });
    }, delay);
    return () => { clearTimeout(tid); cancelAnimationFrame(raf); };
  }, [started, target, duration, delay]);
  return value;
}

// ─── Stat cell ─────────────────────────────────────────────────
function StatCell({ value, label, started, index }) {
  const counted = useCountUp(value, 1400, index * 110, started);
  return (
    <div className="sb-cell">
      <span className="sb-num">{started ? counted : <span style={{ opacity: 0.1 }}>–</span>}</span>
      <span className="sb-label">{label}</span>
    </div>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────
export function StatsBar({ stats, loading }) {
  const { darkMode } = useTheme();

  const bg            = darkMode ? "#0a0a0a"                  : "#f8f8f8";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textMuted     = darkMode ? "rgba(255,255,255,0.65)"   : "rgba(0,0,0,0.65)";


  
  const items = [
    { value: "48",  label: "Équipes" },
    { value: "104", label: "Matchs" },
    { value: "16",  label: "Stades" },
    { value: "12",  label: "Villes hôtes" },
    { value: "800+", label: "Buts attendus" },
    { value: "3.5M", label: "Spectateurs" },
  ];

  const displayItems = [...items, ...items];

  return (
    <>
      <style>{`
        @keyframes sb-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-1080px); }
        }
        
        .sb-root { 
          background: ${bg}; 
          border-top: 1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
          border-bottom: 1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
          padding: 20px 0;
          overflow: hidden;
          transition: background 0.3s;
        }
        
        .sb-track {
          display: flex;
          align-items: center;
          animation: sb-scroll 40s linear infinite;
          width: max-content;
          height: 80px;
        }
        
        .sb-track:hover {
          animation-play-state: paused;
        }
        
        .sb-item {
          display: inline-flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding: 0;
          height: 80px;
          width: 180px;
          white-space: nowrap;
          transition: opacity 0.2s ease;
          flex-shrink: 0;
        }
        
        .sb-item:hover {
          opacity: 0.85;
        }
        

        
        .sb-value {
          font-family: ${FONT.display};
          font-weight: 900;
          color: ${textPrimary};
          font-size: 2.2rem;
          line-height: 1;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
        }
        
        .sb-label {
          font-family: ${FONT.body};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${textMuted};
          line-height: 1;
        }
        
        .sb-divider {
          width: 1px;
          height: 48px;
          background: ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'};
          flex-shrink: 0;
          align-self: center;
        }
        
        @media (max-width: 768px) {
          .sb-track { height: 72px; }
          .sb-item { padding: 0; gap: 4px; height: 72px; width: 160px; }
          .sb-value { font-size: 1.9rem; }
          .sb-divider { height: 44px; }
          @keyframes sb-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-960px); }
          }
        }
        
        @media (max-width: 480px) {
          .sb-track { height: 64px; }
          .sb-item { padding: 0; gap: 4px; height: 64px; width: 140px; }
          .sb-value { font-size: 1.7rem; }
          @keyframes sb-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-840px); }
          }
        }
      `}</style>

      <div className="sb-root">
        <div className="sb-track">
          {[...items, ...items].map((item, i) => {
            return (
              <React.Fragment key={i}>
                <div className="sb-item">
                  <span className="sb-value">{item.value}</span>
                  <span className="sb-label">{item.label}</span>
                </div>
                {i < 11 && <div className="sb-divider" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Featured card ────────────────────────────────────────────
function FeaturedCard({ article, transition = false, isEntering = false }) {
  const { darkMode } = useTheme();
  const textPrimary     = darkMode ? "#ffffff"                   : "#0d0d0d";
  const imageText       = darkMode ? "#ffffff"                   : "#ffffff";
  const imageTextSec    = darkMode ? "rgba(255,255,255,0.5)"    : "rgba(255,255,255,0.5)";
  const imageTextFaint  = darkMode ? "rgba(255,255,255,0.35)"   : "rgba(255,255,255,0.35)";
  const accent          = darkMode ? "#ffffff"                   : "#ffffff";
  const overlayGrad     = darkMode
    ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)"
    : "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)";
  const surface         = darkMode ? "#111111"                   : "#e0e0e0";

  const [hovered, hoverProps] = useHover();
  const src = resolveImg(article.img, "w640");

  return (
    <a href="/news" style={{ 
      textDecoration: "none", 
      display: "block",
      opacity: transition ? 0 : 1,
      transform: transition 
        ? "translateY(30px) scale(0.92) translateZ(-10px)" 
        : isEntering 
          ? "translateY(-25px) scale(1.04) translateZ(10px)" 
          : "translateY(0) scale(1) translateZ(0)",
      transition: "opacity 0.18s ease-out, transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
      perspective: "1000px",
    }} {...hoverProps}>
      <div style={{
        position: "relative", overflow: "hidden",
        background: surface, minHeight: "clamp(280px,40vw,460px)",
        height: "100%",
        transition: "background 0.3s",
      }}>
        <ArticleImg
          src={src}
          transition={transition}
          isEntering={isEntering}
          style={{
            opacity: hovered ? 0.7 : 0.5,
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: overlayGrad, transition: "background 0.3s" }} />
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "clamp(16px,2.5vw,28px)",
        }}>
          <Tag label={article.tag} dark />
          <h3 style={{
            fontFamily: FONT.display, fontWeight: 900, color: imageText,
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            lineHeight: 1.1, letterSpacing: "0.02em", margin: "12px 0 10px",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.3s",
          }}>{article.title}</h3>
          <p style={{
            color: imageTextSec, fontFamily: FONT.body,
            fontSize: "clamp(11px,1vw,13px)", lineHeight: 1.55, marginBottom: 14,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
            transition: "color 0.3s",
          }}>{article.desc}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              display: "flex", alignItems: "center", gap: 5,
              color: imageTextFaint, fontFamily: FONT.body, fontSize: 10,
              transition: "color 0.3s",
            }}>
              <FiClock size={9} /> {article.date}
            </span>
            <span style={{
              display: "flex", alignItems: "center", gap: 4, color: accent, fontFamily: FONT.body,
              fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase",
              opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s, color 0.3s",
            }}>Lire <FiArrowUpRight size={11} /></span>
          </div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, height: 2, background: accent,
            width: hovered ? "100%" : "0%", transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }} />
        </div>
      </div>
    </a>
  );
}

// ─── Side article ─────────────────────────────────────────────
function SideArticle({ article, last, className = "", active = false, onClick, transition = false }) {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const cardHover     = darkMode ? "rgba(255,255,255,0.06)"   : "#f7f7f7";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const accent        = darkMode ? "#ffffff"                   : "#0d0d0d";
  const surface       = darkMode ? "#171717"                   : "#e0e0e0";

  const [hovered, hoverProps] = useHover();
  const src = resolveImg(article.img, "w160");

  return (
    <a href="/news" className={className} style={{
      display: "flex", alignItems: "stretch",
      borderBottom: last ? "none" : `1px solid ${border}`,
      textDecoration: "none",
      background: active ? (darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)") : (hovered ? cardHover : card),
      borderLeft: active ? `3px solid ${accent}` : "3px solid transparent",
      transition: "background 0.3s ease, border-color 0.3s ease, opacity 0.18s ease-out, transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
      flex: 1,
      cursor: "pointer",
      opacity: transition ? 0 : 1,
      transform: transition ? "translateY(-20px)" : "translateY(0)",
    }} {...hoverProps} onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
    }}>
      <div style={{
        width: 80, flexShrink: 0, background: surface, position: "relative", overflow: "hidden",
        transition: "background 0.3s",
      }}>
        <ArticleImg
          src={src}
          style={{
            opacity: hovered ? 0.75 : 0.5,
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
          }}
        />
      </div>
      <div style={{
        flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column",
        justifyContent: "center", gap: 4,
        borderLeft: hovered ? `2px solid ${accent}` : "2px solid transparent",
        transition: "border-color 0.3s ease",
      }}>
        <Tag label={article.tag} />
        <p style={{
          fontSize: 12, fontWeight: 700, color: textPrimary, lineHeight: 1.4,
          fontFamily: FONT.body, display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden", marginTop: 4,
          transition: "color 0.3s",
        }}>{article.title}</p>
        <span style={{
          display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: textSecondary,
          fontFamily: FONT.body, marginTop: 2,
          transition: "color 0.3s",
        }}>
          <FiClock size={8} /> {article.date}
        </span>
      </div>
    </a>
  );
}

// ─── More news card ───────────────────────────────────────────
function NewsCard({ article }) {
  const { darkMode } = useTheme();
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const borderHover   = darkMode ? "rgba(255,255,255,0.18)"   : "#b0b0b0";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const shadow        = darkMode ? "rgba(0,0,0,0.4)"          : "rgba(0,0,0,0.08)";
  const accent        = darkMode ? "#ffffff"                   : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                   : "#ffffff";
  const hover         = darkMode ? "rgba(255,255,255,0.06)"   : "#f0f0f0";
  const surface       = darkMode ? "#171717"                   : "#e0e0e0";
  const cardBorder    = darkMode ? "rgba(255,255,255,0.06)"   : "#f0f0f0";
  const mutedIcon     = darkMode ? "rgba(255,255,255,0.32)"   : "#aaaaaa";

  const [hovered, hoverProps] = useHover();
  const src = resolveImg(article.img, "w320");

  return (
    <a href="/news" style={{
      display: "flex", flexDirection: "column", textDecoration: "none", background: card,
      border: `1px solid ${hovered ? borderHover : border}`, borderRadius: 4, overflow: "hidden",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      boxShadow: hovered ? `0 12px 32px ${shadow}` : "none",
      transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
    }} {...hoverProps}>
       <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: surface, transition: "background 0.3s" }}>
         <ArticleImg
           src={src}
           style={{
             opacity: hovered ? 0.9 : 0.72,
             transform: hovered ? "scale(1.08)" : "scale(1)",
             transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
           }}
         />
         <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }} />
        <div style={{ position: "absolute", bottom: 10, left: 10 }}>
          <Tag label={article.tag} dark={!!src} />
        </div>
      </div>
      <div style={{
        padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8,
        transition: "background 0.3s",
      }}>
        <p style={{
          fontSize: 13, fontWeight: 700, color: textPrimary, lineHeight: 1.45, fontFamily: FONT.body, flex: 1,
          transition: "color 0.3s",
        }}>
          {article.title}
        </p>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 10, borderTop: `1px solid ${cardBorder}`, marginTop: "auto",
          transition: "border-color 0.3s",
        }}>
          <span style={{
            display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: textSecondary,
            fontFamily: FONT.body, transition: "color 0.3s",
          }}>
            <FiClock size={8} /> {article.date}
          </span>
          <div style={{
            width: 22, height: 22, borderRadius: "50%",
            background: hovered ? accent : hover,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.3s",
          }}>
            <FiArrowRight size={10} color={hovered ? accentContrast : mutedIcon} />
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── NEWS SECTION ─────────────────────────────────────────────
const MOCK_NEWS = [
  {
    urlToImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=640",
    title: "Coupe du Monde 2030 : Le Maroc prêt à accueillir le monde",
    description: "Le Maroc se prépare à accueillir la plus grande compétition de football avec de nouveaux stades et infrastructures modernes.",
    publishedAt: "2026-04-12T10:00:00Z",
    source: { name: "FIFA" }
  },
  {
    urlToImage: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=640",
    title: "48 équipes participeront à la Coupe du Monde 2030",
    description: "La FIFA confirme un record historique avec 48 équipes incontourna pour cette édition historique au Maroc, Espagne et Portugal.",
    publishedAt: "2026-04-11T15:00:00Z",
    source: { name: "Sports" }
  },
  {
    urlToImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=640",
    title: "Stades historiques : Les préparatifs avancent",
    description: "Les travaux de construction des nouveaux stades avancent selon le calendrier prévu pour le Mondial 2030.",
    publishedAt: "2026-04-10T09:00:00Z",
    source: { name: "Actu Foot" }
  },
  {
    urlToImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=640",
    title: "Billets : La demande dépasse les attentes",
    description: "Plus de 2 millions de demandes de billets enregistrées pour les matchs de la Coupe du Monde 2030.",
    publishedAt: "2026-04-09T12:00:00Z",
    source: { name: "FIFA" }
  }
];

export function NewsSection() {
  const { darkMode } = useTheme();
  const { data: news, loading, error } = useNews({ q: "FIFA World Cup 2026", pageSize: 8 });
  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  
  const [rotationIndex, setRotationIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);
  
  const articles = (news?.articles?.length > 0 ? news.articles : MOCK_NEWS);
  
  useEffect(() => {
    if (articles.length < 2) return;
    
    const interval = setInterval(() => {
      setPrevIndex(rotationIndex);
      setIsEntering(true);
      setIsTransitioning(true);
      setTimeout(() => {
        setRotationIndex(i => (i + 1) % articles.length);
        setIsTransitioning(false);
        setTimeout(() => setIsEntering(false), 40);
      }, 180);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [articles.length, rotationIndex]);
  
  const handleNewsSelect = (index) => {
    setPrevIndex(rotationIndex);
    setIsEntering(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setRotationIndex(index);
      setIsTransitioning(false);
      setTimeout(() => setIsEntering(false), 40);
    }, 180);
  };
  
  const getMainArticle = () => {
    if (articles.length === 0) return null;
    return articles[rotationIndex % articles.length];
  };
  
  const getSideArticles = () => {
    if (articles.length <= 1) return [];
    return [
      articles[(rotationIndex + 1) % articles.length],
      articles[(rotationIndex + 2) % articles.length],
    ].filter(Boolean);
  };
  
  const mainArticle = getMainArticle();
  const sideArticles = getSideArticles();
  const activeSideIndex = rotationIndex % Math.max(1, sideArticles.length);

  return (
    <>
      <style>{`

        
        .ns-grid {
          display: grid; grid-template-columns: 1fr 260px;
          border: 1px solid ${border}; border-radius: 4px; overflow: hidden;
          transition: border-color 0.3s;
        }
        .ns-side {
          display: flex; flex-direction: column; border-left: 1px solid ${border};
          background: ${card}; transition: background 0.3s, border-color 0.3s;
          position: relative;
          height: 100%;
        }
        .ns-side .side-article {
          opacity: 1;
          pointer-events: auto;
          position: relative;
        }
        .side-article-enter {
          animation: slideIn 0.35s ease-out forwards;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 860px) {
          .ns-grid { grid-template-columns: 1fr; }
          .ns-side { border-left: none; border-top: 1px solid ${border}; flex-direction: row; flex-wrap: wrap; }
          .ns-side .side-article { flex: 1 1 260px; }
        }
        @media (max-width: 540px) { 
          .ns-side .side-article { flex: 1 1 100%; } 
          .sb-inner { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 400px) {
          .sb-cell { padding: 12px 8px; }
          .sb-num { font-size: clamp(1.3rem, 5vw, 2rem); }
          .sb-label { font-size: 8px; letter-spacing: 0.12em; }
        }
      `}</style>

      <section style={{
        background: bg, padding: "var(--section-pad-y) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 var(--section-pad-x)" }}>
          <SectionHead eyebrow="Actualités" title="À La Une" action="Toutes les news" href="/news" icon={require("react-icons/fi").FiList} />
          <div className="ns-grid">
            {loading ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 260px" }}>
                <div style={{ minHeight: 400, background: card }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, borderLeft: `1px solid ${border}`, borderTop: i > 0 ? `1px solid ${border}` : "none" }} />)}
                </div>
              </div>
            ) : (
               <>
                 <FeaturedCard article={{
                   img: mainArticle?.urlToImage,
                   title: mainArticle?.title,
                   desc: mainArticle?.description,
                   date: mainArticle ? new Date(mainArticle.publishedAt).toLocaleDateString('fr-FR') : '',
                   tag: mainArticle?.source?.name || "Actualité",
                   transition: isTransitioning,
                   isEntering: isEntering
                 }} />
                <div className="ns-side">
                  {sideArticles.map((n, i) => (
                    <SideArticle 
                      key={`${n?.title}-${i}`}
                      article={{
                        img: n?.urlToImage,
                        title: n?.title,
                        date: n ? new Date(n.publishedAt).toLocaleDateString('fr-FR') : '',
                        tag: n?.source?.name || "Actualité"
                      }} 
                      last={i === sideArticles.length - 1}
                      active={i === activeSideIndex}
                      onClick={() => handleNewsSelect((rotationIndex + 1 + i) % articles.length)}
                      className="side-article"
                      transition={isTransitioning}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── MORE NEWS ────────────────────────────────────────────────
export function MoreNewsSection() {
  const { darkMode } = useTheme();
  const { data: news, loading } = useNews({ q: "FIFA World Cup 2026", pageSize: 9 });
  const surface = darkMode ? "#171717" : "#f5f5f5";
  
  const newsArticles = (news?.articles?.length > 0 ? news.articles : MOCK_NEWS);

  return (
    <>
      <style>{`
        .mn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 860px) { .mn-grid { grid-template-columns: repeat(2,1fr); gap: 8px; } }
        @media (max-width: 480px) { .mn-grid { grid-template-columns: 1fr; gap: 12px; } }
      `}</style>

      <section style={{
        background: surface, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <SectionHead eyebrow="Plus d'actualités" title="Dernières Nouvelles" action="Toutes" href="/news" icon={require("react-icons/fi").FiList} />
          <div className="mn-grid">
            {loading || newsArticles.length === 0 ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ height: 240, borderRadius: 4, background: darkMode ? "#1c1c1c" : "#ffffff" }} />
              ))
            ) : (
              newsArticles.slice(0, 3).map((n, i) => (
                <NewsCard key={i} article={{
                  img: n.urlToImage,
                  title: n.title,
                  date: new Date(n.publishedAt).toLocaleDateString('fr-FR'),
                  tag: n.source?.name || "Actualité"
                }} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}