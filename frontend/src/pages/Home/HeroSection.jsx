import { useState, useEffect, useRef } from "react";
import { FiShoppingCart, FiArrowRight, FiPlay, FiCalendar } from "react-icons/fi";
import { FONT, TICKER_ITEMS } from "./constants";
import { useTheme } from "../../context/ThemeContext";
import { getTicker, getImageUrl } from "../../services/api";
import { useMatches } from "../../hooks/useWorldCup";
import { getCode } from "./constants";
import { Flag } from "./ui";

const YT_VIDEO_ID = "RDtdVQgB9ME";

// ─── NEWS TICKER ───────────────────────────────────────────────
export function NewsTicker() {
  const { darkMode } = useTheme();

  const bg            = darkMode ? "#050505" : "#f5f5f5";
  const borderColor   = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const badgeBg       = darkMode ? "#ffffff" : "#0d0d0d";
  const badgeText     = darkMode ? "#0a0a0a" : "#ffffff";
  const divider       = darkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)";
  const textSecondary = darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)";
  const dotActive     = darkMode ? "#ffffff" : "#0d0d0d";
  const dotInactive   = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";

  const [items, setItems] = useState([]);
  const [idx,   setIdx]   = useState(0);
  const [fade,  setFade]  = useState(true);
  const timerRef = useRef(null);

  /* ── Fetch from API, fall back to constants ── */
  useEffect(() => {
    getTicker()
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setItems(arr.length > 0 ? arr : TICKER_ITEMS.map((t, i) => ({ id: i, text: t, label: "En Direct", label_color: "#c8102e" })));
      })
      .catch(() => {
        setItems(TICKER_ITEMS.map((t, i) => ({ id: i, text: t, label: "En Direct", label_color: "#c8102e" })));
      });
  }, []);

  /* ── Auto-rotate ── */
  useEffect(() => {
    if (items.length < 2) return;
    timerRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % items.length); setFade(true); }, 280);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [items]);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setFade(false);
    setTimeout(() => { setIdx(i); setFade(true); }, 200);
  };

  const current = items[idx] ?? null;
  const badgeLabel = "EN DIRECT"; // Force uppercase and only this label
  const dotColor   = "#c8102e"; // Always red as requested

  return (
    <div style={{
      background: bg,
      borderBottom: `1px solid ${borderColor}`,
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <div style={{
        maxWidth: 1380, margin: "0 auto", padding: "0 40px",
        display: "flex", alignItems: "center", height: 48, gap: 16,
      }}>
        {/* Badge */}
        <div style={{
          flexShrink: 0, display: "flex", alignItems: "center", gap: 8,
          transition: "background 0.3s",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: dotColor,
            flexShrink: 0, animation: "tdot 1.4s ease-in-out infinite",
            transition: "background 0.4s",
          }} />
          <span style={{
            color: dotColor, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            fontFamily: FONT.body, whiteSpace: "nowrap",
            transition: "color 0.3s",
          }}>{badgeLabel}</span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 18, background: divider, flexShrink: 0, transition: "background 0.3s" }} />

        {/* Text */}
        {current?.url ? (
          <a href={current.url} target="_blank" rel="noopener noreferrer" className="nt-link" style={{
            flex: 1, fontSize: 13,
            fontFamily: FONT.body, overflow: "hidden", whiteSpace: "nowrap",
            textOverflow: "ellipsis", opacity: fade ? 1 : 0,
            transition: "opacity 0.28s, color 0.3s",
            minWidth: 0, textDecoration: "none", fontWeight: 500,
          }}>
            {current.text}
          </a>
        ) : (
          <p className="nt-link" style={{
            flex: 1, fontSize: 13,
            fontFamily: FONT.body, overflow: "hidden", whiteSpace: "nowrap",
            textOverflow: "ellipsis", opacity: fade ? 1 : 0,
            transition: "opacity 0.28s, color 0.3s",
            minWidth: 0, margin: 0, fontWeight: 500,
          }}>
            {current?.text ?? ""}
          </p>
        )}

        {/* Dots */}
        {items.length > 1 && (
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            {items.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                width: i === idx ? 14 : 5, height: 5, borderRadius: 3,
                border: "none", cursor: "pointer", padding: 0,
                background: i === idx ? dotActive : dotInactive,
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes tdot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(.6);}}
        .nt-link { color: ${textSecondary} !important; }
        .nt-link:hover { opacity: 0.8; }
      `}</style>
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────
export function HeroSection() {
  const { darkMode } = useTheme();

  /* ── colour tokens ── */
  const heroBg = darkMode ? "#0d0d0d" : "#ffffff";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSub = darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)";
  const textMuted = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)";
  
  /* Hero section specific tokens */
  const hText = darkMode ? "#ffffff" : "#0d0d0d";
  const hTextSub = darkMode ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.55)";
  const hStroke = darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.35)";
  const hLine = darkMode ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.15)";
  
  /* Overlays */
  const ovColor = darkMode ? "0,0,0" : "255,255,255";
  const ovOpacity = darkMode ? 0.85 : 0.65;
  const videoOpacity = darkMode ? 0.45 : 0.3;

  /* Match card tokens */
  const cardBg = darkMode ? "rgba(10,10,10,0.78)" : "rgba(255,255,255,0.85)";
  const mcText = darkMode ? "#ffffff" : "#0d0d0d";
  const mcTextMuted = darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const mcBorder = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const shadow = darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)";
  
  const accent = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover = darkMode ? "#f0f0f0" : "#333333";
  
  const secondaryBtnBg = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)";
  const secondaryBtnHover = darkMode ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.12)";
  const secondaryBtnText = darkMode ? "#ffffff" : "#0d0d0d";
  
  const liveGreen = "#22c55e";
  
  /* Additional Missing Tokens */
  const dotBg = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
  const dotActive = darkMode ? "#ffffff" : "#0d0d0d";
  const heroLineBg = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
  const heroTextMuted = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const shadowStrong = darkMode ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.25)";
  const shimmerColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)";
  const borderSub = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const mcAccentHover = darkMode ? "#f0f0f0" : "#333333";

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

  const { data: matchesData } = useMatches({ status: 'upcoming', limit: 1 });
  const featuredMatch = (matchesData && matchesData.length > 0) ? matchesData[0] : null;

  const getTeamCode = (team) => {
    if (!team) return "TBD";
    const code = getCode(team);
    return (code && code.length === 2) ? code.toUpperCase() : (team.name ? team.name.substring(0,3).toUpperCase() : "TBD");
  };

  const getTeamFlag = (team) => {
    const code = getCode(team);
    if (!code) return "https://flagcdn.com/w80/un.png";
    if (code.startsWith('http') || code.startsWith('/storage/')) return getImageUrl(code);
    return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
  };

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
          background: linear-gradient(to top,
            rgba(${ovColor},${ovOpacity}) 0%, rgba(${ovColor},${ovOpacity * 0.5}) 38%,
            rgba(${ovColor},${ovOpacity * 0.2}) 68%, rgba(${ovColor},${ovOpacity * 0.4}) 100%);
          transition: background 0.4s;
        }
        .hero-root::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(${ovColor},0.15);
          pointer-events: none;
          transition: background 0.4s;
        }
        .hero-ov-l {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to right,
            rgba(${ovColor},${ovOpacity * 1.05}) 0%, rgba(${ovColor},${ovOpacity * 0.5}) 52%, transparent 100%);
          transition: background 0.4s;
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
          grid-template-columns: 1fr auto;
          gap: clamp(24px, 5vw, 64px);
          align-items: center;
        }

        .hero-ey {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: clamp(12px, 2vh, 20px);
          width: 100%;
        }
        .hero-ey-line { width: 32px; height: 1px; background: ${heroLineBg}; flex-shrink: 0; transition: background 0.3s; }
        .hero-ey-txt {
          color: ${heroTextMuted};
          font-family: 'Barlow', sans-serif;
          font-size: clamp(9px, 1.2vw, 11px); font-weight: 800;
          letter-spacing: .4em; text-transform: uppercase;
          transition: color 0.3s;
        }

.hero-h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900; line-height: 0.9;
  text-transform: uppercase; letter-spacing: -.02em; margin: 0;
  display: block; width: 100%; overflow: visible;
  font-size: clamp(80px, 12vw, 160px);
}
        .hero-h1:last-child { padding-bottom: 0.06em; }

        .h1-le    { font-size: clamp(64px, 10vw, 140px); }
        .h1-monde { font-size: clamp(64px, 10vw, 140px); }
        .h1-uni   { font-size: clamp(64px, 10vw, 140px); }

.h1-w { color: ${hText}; transition: color 0.4s; }
.h1-o {
  color: transparent;
  -webkit-text-stroke: clamp(1px, 0.13vw, 2px) ${hStroke};
  transition: -webkit-text-stroke-color 0.4s;
}

        .hero-sub {
          color: ${hTextSub};
          font-family: 'Barlow', sans-serif;
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 400; line-height: 1.6;
          margin: clamp(16px,3vh,24px) 0 clamp(32px,4vh,48px);
          max-width: 45ch; width: 100%;
          transition: color 0.4s;
        }
        
        .hero-cta { 
          display: flex; 
          align-items: center; 
          gap: 16px; 
        }

        .btn-buy, .btn-buy * { color: ${accentContrast} !important; }
        .btn-buy {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          background: ${accent};
          font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 800; letter-spacing: .04em;
          height: 52px; min-width: 210px; justify-content: center;
          padding: 0 28px;
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

        .btn-watch, .btn-watch * { color: ${secondaryBtnText} !important; }
        .btn-watch {
          display: inline-flex; align-items: center; gap: 9px;
          text-decoration: none;
          background: ${secondaryBtnBg};
          border: 1px solid ${mcBorder};
          border-radius: 100px;
          height: 52px; min-width: 210px; justify-content: center;
          padding: 0 22px;
          transition: background .25s, transform .2s;
          white-space: nowrap;
        }
        .btn-watch:hover {
          background: ${secondaryBtnHover};
          transform: translateY(-2px);
        }
        .btn-watch:active { transform: translateY(0); }
        .btn-watch-circle {
          width: clamp(22px,2.2vw,26px); height: clamp(22px,2.2vw,26px);
          border-radius: 50%; background: ${mcBorder};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background .25s;
        }
        .btn-watch:hover .btn-watch-circle { background: ${darkMode ? "rgba(255,255,255,0.26)" : "rgba(0,0,0,0.18)"}; }
        .btn-watch-label {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(11px,1.1vw,13px); font-weight: 700; letter-spacing: .04em;
          transition: color .3s;
        }

        .hero-live, .hero-live * { color: #ffffff !important; }
        .hero-live {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          text-decoration: none; transition: all .3s;
          width: fit-content;
        }
        .hero-live:hover { background: rgba(255,255,255,0.13); border-color: rgba(255,255,255,0.25); }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: ${liveGreen}; flex-shrink: 0;
          animation: lpul 1.8s ease-in-out infinite;
        }
        .live-txt {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(10px,1vw,11px); font-weight: 500; letter-spacing: .05em;
          white-space: nowrap; transition: color 0.3s;
          opacity: 0.6;
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
          color: ${mcText}; font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(11px,1.1vw,14px); font-weight: 800; letter-spacing: .08em;
          transition: color 0.3s;
        }
        .mc-vs { text-align: center; }
        .mc-vs-t {
          display: block; color: ${mcTextMuted}; font-family: 'Barlow', sans-serif;
          font-size: clamp(10px,1vw,12px); font-weight: 600;
          transition: color 0.3s; opacity: 0.5;
        }
        .mc-time {
          display: block; color: ${mcTextMuted}; font-family: 'Barlow', sans-serif;
          font-size: clamp(9px,.9vw,10px); margin-top: 3px;
          transition: color 0.3s;
        }
        .mc-btn, .mc-btn * { color: ${accentContrast} !important; }
        .mc-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          background: ${accent}; font-family: 'Barlow', sans-serif;
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
          .hero-h1 { font-size: clamp(70px, 11vw, 130px); }
        }

        @media (max-width: 860px) {
          .hero-wrap {
            grid-template-columns: 1fr;
            padding: clamp(40px, 6vh, 60px) clamp(16px, 3vw, 28px);
          }
          .hero-right { display: none; }
          .hero-ov-l {
            background: linear-gradient(to right,
              rgba(0,0,0,0.92) 0%,
              rgba(0,0,0,0.65) 50%,
              rgba(0,0,0,0.25) 100%);
          }
          .hero-h1  { font-size: clamp(48px, 12vw, 100px); }
          .hero-sub { max-width: 42ch; font-size: clamp(13px, 1.5vw, 16px); }
          .hero-cta { flex-direction: row; flex-wrap: wrap; gap: 10px; }
          .btn-buy  { flex: 1 1 auto; min-width: 140px; justify-content: center; }
          .btn-watch{ flex: 1 1 auto; min-width: 140px; justify-content: center; }
          .btn-watch-label { display: inline !important; }
        }

        @media (max-width: 600px) {
          .hero-root { min-height: 100svh; }
          .hero-wrap { padding: 40px 12px 50px; }
          .hero-h1   { font-size: clamp(40px, 13vw, 72px); }
          .hero-sub  { font-size: 13px; max-width: 100%; line-height: 1.5; margin: 12px 0 16px; }
          .hero-ey-txt { font-size: 9px; letter-spacing: .15em; }
          .hero-cta { flex-direction: column; align-items: stretch; gap: 8px; width: 100%; }
          .btn-buy  { width: 100%; justify-content: center; box-sizing: border-box; padding: 12px 16px; font-size: 12px; }
          .btn-watch{ width: 100%; justify-content: center; box-sizing: border-box; padding: 12px 16px; }
          .btn-watch-label { display: inline !important; font-size: 12px; }
          .btn-watch-circle { display: flex; }
        }

        @media (max-width: 380px) {
          .hero-h1  { font-size: clamp(32px, 11vw, 54px); }
          .hero-sub { font-size: 12px; }
          .btn-buy  { font-size: 11px; padding: 11px 12px; }
          .btn-watch{ padding: 11px 12px; font-size: 11px; }
        }
      `}</style>

      <section className="hero-root">

        {/* ── VIDEO BACKGROUND ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <iframe
            src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100vw",
              height: "56.25vw",
              minWidth: "177.78vh",
              minHeight: "100%",
              border: "none",
              opacity: ytReady ? videoOpacity : 0,
              transition: "opacity 1.2s ease",
            }}
            title="hero-bg"
          />
        </div>

        <div className="hero-ov-b" />
        <div className="hero-ov-l" />

        <div className="hero-wrap">

          {/* ── LEFT ── */}
          <div>

            {/* Eyebrow removed */}

            {/* Words — each fills its own full width */}
            <div style={{ width: "100%", overflow: "visible" }}>
              <h1 className="hero-h1 h1-w" style={s(0.12)}>
                LE <span className="h1-o">MONDE</span> UNI.
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
                  <FiPlay size={18} color="#ffffff" style={{ marginLeft: 3 }} />
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
                <span className="mc-head-txt">{featuredMatch ? (featuredMatch.status === 'live' ? 'Match en direct' : 'Prochain match') : 'Prochain match'}</span>
              </div>
              <div className="mc-teams">
                <div className="mc-team">
                  <Flag code={getCode(featuredMatch?.team1)} alt={featuredMatch?.team1?.name} size={30} />
                  <span className="mc-code">{featuredMatch ? getTeamCode(featuredMatch.team1) : "MEX"}</span>
                </div>
                <div className="mc-vs">
                  <span className="mc-vs-t">VS</span>
                  <span className="mc-time">{featuredMatch ? `${new Date(featuredMatch.match_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} · ${featuredMatch.match_time?.substring(0,5)}` : "11 juin · 19h00"}</span>
                </div>
                <div className="mc-team">
                  <Flag code={getCode(featuredMatch?.team2)} alt={featuredMatch?.team2?.name} size={30} />
                  <span className="mc-code">{featuredMatch ? getTeamCode(featuredMatch.team2) : "ECU"}</span>
                </div>
              </div>
              <a href="/matches" className="mc-btn">
                <FiCalendar size={16} />
                <span>{featuredMatch ? 'Détails du match' : 'Voir le match'}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}