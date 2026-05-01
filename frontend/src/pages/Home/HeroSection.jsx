import { useState, useEffect, useRef } from "react";
import { FiShoppingCart, FiArrowRight, FiPlay, FiCalendar } from "react-icons/fi";
import { FONT, TICKER_ITEMS } from "./constants";
import { useTheme } from "../../context/ThemeContext";
import { getTicker } from "../../services/api";

const YT_VIDEO_ID = "T99QF5-T2Ik";

// ─── NEWS TICKER ───────────────────────────────────────────────
export function NewsTicker() {
  const { darkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const data = await getTicker();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch ticker:", err);
        // Fallback to constants if API fails
        setItems(TICKER_ITEMS.map((text, i) => ({
          id: `fallback-${i}`,
          text,
          label: "Info",
          label_color: "#c8102e"
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchTicker();
  }, []);

  const displayItems = items.length > 0 ? items : TICKER_ITEMS.map((text, i) => ({
    id: `static-${i}`,
    text,
    label: "Info",
    label_color: "#c8102e"
  }));

  // Triple for infinite loop
  const list = [...displayItems, ...displayItems, ...displayItems];

  return (
    <div className="ticker-root" style={{
      background: darkMode ? "rgba(10,10,10,0.95)" : "rgba(255,255,255,0.98)",
      borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`
    }}>
      <style>{`
        .ticker-root {
          width: 100%; height: clamp(40px, 5vh, 48px);
          backdrop-filter: blur(12px);
          overflow: hidden; position: relative;
          display: flex; align-items: center;
          z-index: 50;
        }
        .ticker-track {
          display: flex; white-space: nowrap;
          animation: ticker-scroll 80s linear infinite;
          will-change: transform;
        }
        @keyframes ticker-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
        .ticker-item {
          display: flex; align-items: center; gap: 12px;
          padding: 0 40px; 
          border-right: 1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
        }
        .ticker-badge {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800; font-size: 10px; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 2px 8px; border-radius: 3px;
          color: #fff;
        }
        .ticker-text {
          color: ${darkMode ? "#ffffff" : "#000000"}; 
          font-family: 'Barlow', sans-serif;
          font-weight: 600; font-size: 13px; letter-spacing: 0.01em;
          opacity: 0.9;
        }
        .ticker-root:hover .ticker-track {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-track">
        {list.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-badge" style={{ background: item.label_color || "#c8102e" }}>
              {item.label || "INFO"}
            </span>
            <span className="ticker-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


// ─── HERO ──────────────────────────────────────────────────────
export default function HeroSection() {
  const { darkMode } = useTheme();

  /* ── colour tokens ── */
  const heroBg = darkMode ? "#0a0a0a" : "#f5f5f5";
  const oR = darkMode ? "10,10,10" : "245,245,245";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSub = darkMode ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.35)";
  const textMuted = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)";
  const textFaint = darkMode ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.22)";
  const textVFaint = darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)";
  /* ── Hero text tokens — now theme-aware ── */
  const heroTextPrimary = darkMode ? "#ffffff" : "#000000";
  const heroTextSub     = darkMode ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.7)";
  const heroTextMuted   = darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)";
  const heroTextFaint   = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)";
  const heroTextVFaint  = darkMode ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.25)";
  const heroStroke      = darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)";
  const heroLineBg      = darkMode ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.25)";
  /* ── Match card uses theme-aware values ── */
  const strokeColor = heroStroke;
  const borderBase   = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const borderSub    = "rgba(255,255,255,0.12)";
  const borderMed    = "rgba(255,255,255,0.22)";
  const borderStrong = "rgba(255,255,255,0.38)";
  const borderBright = "rgba(255,255,255,0.82)";
  const hover        = "rgba(255,255,255,0.07)";
  const hoverStrong  = "rgba(255,255,255,0.16)";
  const subtleBg     = "rgba(255,255,255,0.06)";
  const subtleHover  = "rgba(255,255,255,0.11)";
  const accent       = darkMode ? "#ffffff" : "#ffffff";
  const accentContrast = darkMode ? "#0a0a0a" : "#0d0d0d";
  const accentHover  = "#efefef";
  const cardBg       = darkMode ? "rgba(10,10,10,0.78)" : "rgba(255,255,255,0.85)";
  const shadow       = darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)";
  const shadowStrong = darkMode ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.3)";
  const dotBg        = "rgba(255,255,255,0.3)";
  const dotActive    = "#ffffff";
  const lineBg       = heroLineBg;
  const shimmerColor = "rgba(255,255,255,0.55)";
  /* mc-code / mc-btn text uses card-aware theme */
  const mcTextPrimary   = darkMode ? "#ffffff" : "#0d0d0d";
  const mcTextMuted     = darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const mcTextFaint     = darkMode ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const mcTextVFaint    = darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
  const mcAccent        = darkMode ? "#ffffff" : "#0d0d0d";
  const mcAccentContrast = darkMode ? "#0a0a0a" : "#ffffff";
  const mcAccentHover   = darkMode ? "#efefef" : "#333333";
  const liveGreen = "#22c55e";
  
  /* ── TYPEWRITER LOGIC ── */
  const phrases = ["LE MONDE UNI.", "ONE GAME.", "WE ARE ONE."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !isDeleting) {
      const t = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(t);
    }
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setSubIndex((i) => i + (isDeleting ? -1 : 1));
    }, isDeleting ? 60 : 120);
    return () => clearTimeout(t);
  }, [subIndex, index, isDeleting, phrases]);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(t);
  }, []);

  const fullText = phrases[index];
  const typedText = fullText.substring(0, subIndex);

  // Function to render typed text with specific words outlined
  const renderTyped = (str) => {
    const config = [
      { // "LE MONDE UNI."
        parts: [
          { text: "LE ", style: "solid" },
          { text: "MONDE", style: "outlined" },
          { text: " UNI.", style: "solid" }
        ]
      },
      { // "ONE GAME."
        parts: [
          { text: "ONE ", style: "solid" },
          { text: "GAME", style: "outlined" },
          { text: ".", style: "solid" }
        ]
      },
      { // "WE ARE ONE."
        parts: [
          { text: "WE ARE ", style: "solid" },
          { text: "ONE", style: "outlined" },
          { text: ".", style: "solid" }
        ]
      }
    ];

    const currentConfig = config[index] || { parts: [{ text: str, style: "solid" }] };
    let currentPos = 0;

    return currentConfig.parts.map((part, i) => {
      const partLen = part.text.length;
      const startInStr = Math.max(0, currentPos);
      const endInStr = Math.min(str.length, currentPos + partLen);
      const visiblePart = str.substring(startInStr, endInStr);
      currentPos += partLen;

      if (!visiblePart) return null;
      return (
        <span key={i} className={part.style === "outlined" ? "h1-o" : "h1-w"} style={{ color: part.style === "outlined" ? "transparent" : heroTextPrimary }}>
          {visiblePart}
        </span>
      );
    });
  };

  const [vis, setVis] = useState(false);
  const [ytReady, setYtReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fallback = setTimeout(() => setYtReady(true), 3000);
    const handler = (e) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "onReady" || data?.info?.playerState === 1) {
          clearTimeout(fallback);
          setYtReady(true);
        }
      } catch (_) { }
    };
    window.addEventListener("message", handler);
    return () => { clearTimeout(fallback); window.removeEventListener("message", handler); };
  }, []);

  const s = (d) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(18px)",
    transition: `opacity .6s ease ${d}s, transform .6s ease ${d}s`,
  });

  return (
    <>
      <style>{`
        @keyframes bgz  { from{transform:scale(1);}   to{transform:scale(1.05);}  }
        @keyframes shim { from{left:-80%;}            to{left:130%;}              }
        @keyframes lpul { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.45);}
                          60%{box-shadow:0 0 0 8px rgba(34,197,94,0);}            }
        @keyframes idot { 0%,100%{opacity:1;transform:scale(1);}
                          50%{opacity:.3;transform:scale(.6);}                    }
        @keyframes bblink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        .hero-root {
          --bars: 146px;
          position: relative;
          background: ${heroBg};
          min-height: max(500px, calc(100svh - var(--bars)));
          display: flex;
          align-items: center;
          overflow-x: hidden;
          overflow-y: visible;
          transition: background 0.3s;
        }

        .hero-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 20%;
          animation: bgz 18s ease-in-out infinite alternate;
          transition: opacity .7s ease;
          pointer-events: none; user-select: none;
        }
        .hero-ov-b {
          position: absolute; inset: 0; pointer-events: none;
          background: ${darkMode ? 
            'radial-gradient(circle at 20% 50%, rgba(0,0,0,0.4) 0%, transparent 70%)' :
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 70%)'};
          z-index: 2;
        }
        .hero-root::after {
          content: '';
          position: absolute; inset: 0;
          background: ${darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)'};
          pointer-events: none;
          z-index: 2;
        }

        .hero-dots {
          position: absolute; bottom: 20px; right: clamp(16px,3vw,32px);
          z-index: 20; display: flex; gap: 5px;
        }
        .hero-dot {
          height: 5px; border-radius: 3px; border: none;
          cursor: pointer; padding: 0;
          background: ${dotBg}; transition: all .35s;
        }
        .hero-dot.on  { width: 18px; background: ${dotActive}; }
        .hero-dot.off { width: 5px; }

        .hero-wrap {
          position: relative; z-index: 10;
          width: 100%; max-width: 1380px; margin: 0 auto;
          padding: clamp(32px, 8vh, 100px) clamp(16px, 4vw, 40px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: clamp(24px, 5vw, 64px);
          align-items: center;
        }



.hero-h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900; line-height: 0.9;
  text-transform: uppercase; letter-spacing: -.02em; margin: 0;
  display: block; width: 100%; overflow: visible;
  font-size: clamp(50px, 7.5vw, 95px);
  white-space: nowrap;
  color: ${heroTextPrimary};
  text-shadow: ${darkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 1px 8px rgba(255,255,255,0.8)'};
}
        .hero-h1:last-child { padding-bottom: 0.06em; }

        .h1-le    { font-size: clamp(64px, 10vw, 140px); }
        .h1-monde { font-size: clamp(64px, 10vw, 140px); }
        .h1-uni   { font-size: clamp(64px, 10vw, 140px); }

.h1-w { color: ${heroTextPrimary}; transition: color 0.3s; }
.h1-o {
  color: transparent;
  -webkit-text-stroke: clamp(1.5px, 0.15vw, 2.5px) ${heroStroke};
  text-shadow: none;
  transition: -webkit-text-stroke-color 0.3s;
}

        .hero-sub {
          color: ${heroTextSub};
          font-family: 'Barlow', sans-serif;
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 600; line-height: 1.6;
          margin: clamp(16px,3vh,24px) 0 clamp(32px,4vh,48px);
          max-width: 45ch; width: 100%;
          text-shadow: ${darkMode ? '0 2px 4px rgba(0,0,0,0.5)' : '0 1px 2px rgba(255,255,255,0.5)'};
          transition: color 0.3s;
        }

        .hero-cta {
          display: flex; flex-wrap: wrap;
          align-items: center; gap: clamp(8px,1.5vw,12px);
          margin-bottom: clamp(18px,2.5vh,28px);
          width: 100%;
        }

        .btn-buy {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          background: ${accent}; color: ${accentContrast};
          font-family: 'Barlow', sans-serif;
          font-size: clamp(12px,1.2vw,14px); font-weight: 800; letter-spacing: .04em;
          padding: clamp(11px,1.4vh,14px) clamp(20px,2.2vw,28px);
          border-radius: 100px; text-decoration: none;
          box-shadow: 0 4px 20px ${shadow};
          transition: transform .2s ease, box-shadow .2s ease, background .3s, color 0.3s;
          white-space: nowrap;
        }
        .btn-buy:hover {
          background: ${accentHover};
          transform: translateY(-2px);
          box-shadow: 0 10px 30px ${shadowStrong};
        }
        .btn-buy:active { transform: translateY(0); }
        .btn-buy .shimmer {
          position: absolute; top: 0; left: -80%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, ${shimmerColor}, transparent);
          pointer-events: none;
        }
        .btn-buy:hover .shimmer { animation: shim .5s ease forwards; }
        .btn-buy .arr { transition: transform .2s; }
        .btn-buy:hover .arr { transform: translateX(3px); }

        .btn-watch {
          display: inline-flex; align-items: center; gap: 9px;
          text-decoration: none;
          background: ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)"};
          border: none;
          border-radius: 100px;
          padding: clamp(11px,1.4vh,14px) clamp(16px,2vw,22px);
          transition: background .25s, transform .2s;
          white-space: nowrap;
        }
        .btn-watch:hover {
          background: ${darkMode ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.1)"};
          transform: translateY(-2px);
        }
        .btn-watch:active { transform: translateY(0); }
        .btn-watch-circle {
          width: clamp(22px,2.2vw,26px); height: clamp(22px,2.2vw,26px);
          border-radius: 50%; background: ${darkMode ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.1)"};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background .25s;
        }
        .btn-watch:hover .btn-watch-circle { background: ${darkMode ? "rgba(255,255,255,0.26)" : "rgba(0,0,0,0.16)"}; }
        .btn-watch-label {
          color: ${heroTextPrimary}; font-family: 'Barlow', sans-serif;
          font-size: clamp(11px,1.1vw,13px); font-weight: 700; letter-spacing: .04em;
          transition: color .3s;
        }

        .hero-live {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px; border-radius: 100px;
          border: 1px solid ${darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"};
          background: ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.03)"};
          backdrop-filter: blur(8px);
          text-decoration: none; transition: all .3s;
          width: fit-content;
        }
        .hero-live:hover { background: ${darkMode ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.06)"}; border-color: ${darkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"}; }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: ${liveGreen}; flex-shrink: 0;
          animation: lpul 1.8s ease-in-out infinite;
        }
        .live-txt {
          color: ${heroTextSub}; font-family: 'Barlow', sans-serif;
          font-size: clamp(10px,1vw,11px); font-weight: 500; letter-spacing: .05em;
          white-space: nowrap; transition: color 0.3s;
        }

        .match-card {
          background: ${cardBg};
          border: 1px solid ${borderSub};
          border-radius: clamp(10px,1.2vw,16px);
          padding: clamp(14px,1.8vw,22px);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          width: clamp(180px,18vw,240px);
          flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s;
        }
        .mc-head { display: flex; align-items: center; gap: 6px; margin-bottom: clamp(12px,1.5vh,18px); }
        .mc-head-txt {
          color: ${mcTextMuted}; font-family: 'Barlow', sans-serif;
          font-size: clamp(8px,.9vw,9px); font-weight: 800;
          letter-spacing: .2em; text-transform: uppercase;
          transition: color 0.3s;
        }
        .mc-teams {
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; gap: 6px;
          margin-bottom: clamp(12px,1.5vh,18px);
        }
        .mc-team { display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .mc-flag {
          width: clamp(32px,3.5vw,44px); height: clamp(22px,2.3vw,30px);
          object-fit: cover; border-radius: 3px; display: block;
          box-shadow: 0 2px 8px ${shadow};
        }
        .mc-code {
          color: ${mcTextPrimary}; font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(11px,1.1vw,14px); font-weight: 800; letter-spacing: .08em;
          transition: color 0.3s;
        }
        .mc-vs { text-align: center; }
        .mc-vs-t {
          display: block; color: ${mcTextVFaint}; font-family: 'Barlow', sans-serif;
          font-size: clamp(10px,1vw,12px); font-weight: 600;
          transition: color 0.3s;
        }
        .mc-time {
          display: block; color: ${mcTextFaint}; font-family: 'Barlow', sans-serif;
          font-size: clamp(9px,.9vw,10px); margin-top: 3px;
          transition: color 0.3s;
        }
        .mc-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          background: ${mcAccent}; color: ${mcAccentContrast}; font-family: 'Barlow', sans-serif;
          font-size: clamp(9px,.95vw,11px); font-weight: 800;
          letter-spacing: .12em; text-transform: uppercase;
          padding: clamp(8px,1vh,11px) 14px;
          border-radius: 100px; text-decoration: none;
          transition: background .3s, color 0.3s;
        }
        .mc-btn:hover { background: ${mcAccentHover}; }

        @media (max-width: 1024px) {
          .hero-wrap { grid-template-columns: 1fr auto; gap: 20px; }
          .match-card { width: clamp(140px, 14vw, 180px); }
          .hero-h1 { font-size: clamp(45px, 7vw, 90px); }
        }

        @media (max-width: 860px) {
          .hero-wrap {
            grid-template-columns: 1fr;
            padding: clamp(40px, 6vh, 60px) clamp(16px, 3vw, 28px);
          }
          .hero-right { display: none; }
          .hero-ov-l {
            background: ${darkMode ? 
              'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.25) 100%)' :
              'linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.35) 100%)'};
          }
          .hero-h1  { font-size: clamp(40px, 8vw, 75px); }
          .hero-sub { max-width: 42ch; font-size: clamp(13px, 1.5vw, 16px); }
          .hero-cta { flex-direction: row; flex-wrap: wrap; gap: 10px; }
          .btn-buy  { flex: 1 1 auto; min-width: 140px; justify-content: center; }
          .btn-watch{ flex: 1 1 auto; min-width: 140px; justify-content: center; }
          .btn-watch-label { display: inline !important; }
        }

        @media (max-width: 600px) {
          .hero-root { min-height: 100svh; }
          .hero-wrap { padding: 40px 12px 50px; }
          .hero-h1   { font-size: clamp(32px, 8vw, 55px); }
          .hero-sub  { font-size: 13px; max-width: 100%; line-height: 1.5; margin: 12px 0 16px; }
          .hero-ey-txt { font-size: 9px; letter-spacing: .15em; }
          .hero-cta { flex-direction: column; align-items: stretch; gap: 8px; width: 100%; }
          .btn-buy  { width: 100%; justify-content: center; box-sizing: border-box; padding: 12px 16px; font-size: 12px; }
          .btn-watch{ width: 100%; justify-content: center; box-sizing: border-box; padding: 12px 16px; }
          .btn-watch-label { display: inline !important; font-size: 12px; }
          .btn-watch-circle { display: flex; }
        }

        @media (max-width: 380px) {
          .hero-h1  { font-size: clamp(28px, 9vw, 42px); }
          .hero-sub { font-size: 12px; }
          .btn-buy  { font-size: 11px; padding: 11px 12px; }
          .btn-watch{ padding: 11px 12px; font-size: 11px; }
        }
      `}</style>

      <section className="hero-root">

        {/* ── VIDEO BACKGROUND ── */}
        <div style={{ 
          position: "absolute", inset: 0, 
          pointerEvents: "none", overflow: "hidden",
          background: heroBg,
          zIndex: 1
        }}>
          {/* Protective layer to block interactions with the iframe */}
          <div style={{ 
            position: "absolute", inset: 0, 
            zIndex: 10, cursor: "default",
            pointerEvents: "auto"
          }} />

          <iframe
            src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1&cc_load_policy=0&fs=0&vq=hd1080`}
            allow="autoplay; encrypted-media"
            tabIndex="-1"
            style={{
              position: "absolute",
              top: "-50%", left: "-50%", // Extreme offset
              width: "200%", height: "200%", // Extreme scale
              border: "none",
              opacity: ytReady ? 1 : 0,
              transition: "opacity 2s ease",
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 5,
              filter: "brightness(1.05) contrast(1.05)"
            }}
            title="hero-bg"
          />
        </div>

        <div className="hero-ov-b" />
        <div className="hero-ov-l" />

        <div className="hero-wrap">

          {/* ── LEFT ── */}
          <div>



            {/* Typewriter Title */}
            <div style={{ width: "100%", overflow: "visible", minHeight: "1.2em", marginBottom: "8px" }}>
              <h1 className="hero-h1" style={s(0.12)}>
                {renderTyped(typedText)}
                <span style={{ 
                  display: "inline-block", 
                  width: "0.06em", 
                  height: "0.85em", 
                  background: heroTextPrimary,
                  marginLeft: "6px",
                  verticalAlign: "middle",
                  opacity: blink ? 1 : 0,
                  transition: "opacity 0.05s"
                }} />
              </h1>
            </div>

            <p className="hero-sub" style={s(0.38)}>
              11 juin – 19 juillet 2026
            </p>

            <div className="hero-cta" style={s(0.48)}>
              <a href="/tickets" className="btn-buy">
                <span className="shimmer" />
                <FiShoppingCart size={20} />
                <span className="btn-buy-txt-long">Acheter des billets</span>
                <span className="btn-buy-txt-short" style={{ display: "none" }}>Billets</span>
                <FiArrowRight size={16} className="arr" />
              </a>
              <a href="/highlights" className="btn-watch">
                <div className="btn-watch-circle">
                  <FiPlay size={18} color={heroTextPrimary} style={{ marginLeft: 3 }} />
                </div>
                <span className="btn-watch-label">Voir les temps forts</span>
              </a>
            </div>

          </div>

          {/* ── RIGHT: Match card ── */}
          <div className="hero-right" style={s(0.62)}>
            <div className="match-card">
              <div className="mc-head">
                <span className="live-dot" />
                <span className="mc-head-txt">Prochain match</span>
              </div>
              <div className="mc-teams">
                <div className="mc-team">
                  <img className="mc-flag" src="https://flagcdn.com/w80/mx.png" alt="Mexique" />
                  <span className="mc-code">MEX</span>
                </div>
                <div className="mc-vs">
                  <span className="mc-vs-t">VS</span>
                  <span className="mc-time">11 juin · 19h00</span>
                </div>
                <div className="mc-team">
                  <img className="mc-flag" src="https://flagcdn.com/w80/ec.png" alt="Équateur" />
                  <span className="mc-code">ECU</span>
                </div>
              </div>
              <a href="/matches" className="mc-btn">
                <FiCalendar size={16} />
                <span>Voir le match</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}