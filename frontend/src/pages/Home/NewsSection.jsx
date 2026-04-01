import { useEffect, useRef, useState } from "react";
import { FiCalendar, FiArrowRight, FiArrowUpRight, FiClock, FiImage } from "react-icons/fi";
import { FONT, NEWS_FEATURED, NEWS_SIDE, NEWS_MORE } from "./constants";
import { SectionHead } from "./ui";
import { useTheme } from "../../context/ThemeContext";

// ─── Shared hover hook ────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── Tag pill ─────────────────────────────────────────────────
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
function ArticleImg({ src, style, onLoad }) {
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
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }}
    />
  );
}

// ─── Resolve img field → URL ──────────────────────────────────
function resolveImg(img, size = "w640") {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  return `https://flagcdn.com/${size}/${img.toLowerCase()}.png`;
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

  const bg            = darkMode ? "#0d0d0d"                  : "#f5f5f5";
  const border        = darkMode ? "rgba(255,255,255,0.07)"   : "rgba(0,0,0,0.07)";
  const textPrimary   = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textMuted     = darkMode ? "rgba(255,255,255,0.2)"    : "rgba(0,0,0,0.25)";
  const textSecondary = darkMode ? "rgba(255,255,255,0.4)"    : "rgba(0,0,0,0.4)";
  const hover         = darkMode ? "rgba(255,255,255,0.025)"  : "rgba(0,0,0,0.025)";
  const accent        = darkMode ? "#ffffff"                   : "#0d0d0d";
  const skeleton      = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.06)";

  const ref = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fallback = [
    { value: "48",  label: "Équipes"       },
    { value: "104", label: "Matchs"        },
    { value: "6",   label: "Nations hôtes" },
    { value: "1",   label: "Champion"      },
  ];

  const items = (!loading && stats?.length) ? stats : fallback;

  return (
    <>
      <style>{`
        .sb-root { background: ${bg}; border-bottom: 1px solid ${border}; transition: background 0.3s, border-color 0.3s; }
        .sb-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); }
        .sb-cell {
          position: relative; display: flex; flex-direction: column;
          align-items: center; justify-content: center; padding: 20px 12px;
          cursor: default; background: transparent;
          transition: background 0.35s ease, opacity 0.55s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1), color 0.3s;
          opacity: 0; transform: translateY(10px);
        }
        .sb-cell:hover { background: ${hover}; }
        .sb-cell:not(:last-child)::after {
          content: ''; position: absolute; right: 0; top: 22%; bottom: 22%;
          width: 1px; background: ${border};
        }
        .sb-cell::before {
          content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 1px; background: ${accent}; opacity: 0.15;
          transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .sb-cell:hover::before { width: 100%; }
        .sb-in .sb-cell:nth-child(1) { opacity:1; transform:none; transition-delay:0.00s; }
        .sb-in .sb-cell:nth-child(2) { opacity:1; transform:none; transition-delay:0.08s; }
        .sb-in .sb-cell:nth-child(3) { opacity:1; transform:none; transition-delay:0.16s; }
        .sb-in .sb-cell:nth-child(4) { opacity:1; transform:none; transition-delay:0.24s; }
        .sb-num {
          font-family: ${FONT.display}; font-weight: 900; color: ${textPrimary};
          font-size: clamp(1.4rem, 2.4vw, 2rem); line-height: 1; letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums; transition: transform 0.3s ease, color 0.3s;
        }
        .sb-cell:hover .sb-num { transform: translateY(-1px); }
        .sb-label {
          font-family: ${FONT.body}; font-size: clamp(7px, 0.58vw, 8px);
          font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: ${textMuted}; margin-top: 5px; text-align: center;
          line-height: 1.4; transition: color 0.3s;
        }
        .sb-cell:hover .sb-label { color: ${textSecondary}; }
        @keyframes sb-pulse { 0%,100%{opacity:.05} 50%{opacity:.14} }
        .sb-sk { background: ${skeleton}; border-radius: 2px; animation: sb-pulse 1.7s ease-in-out infinite; }
        @media (max-width: 600px) {
          .sb-inner { grid-template-columns: repeat(2,1fr); }
          .sb-cell:nth-child(2)::after, .sb-cell:nth-child(4)::after { display: none; }
          .sb-cell:nth-child(1), .sb-cell:nth-child(2) { border-bottom: 1px solid ${border}; }
          .sb-cell { padding: 16px 10px; }
        }
      `}</style>

      <div className="sb-root" ref={ref}>
        <div className={`sb-inner${entered ? " sb-in" : ""}`}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="sb-cell" style={{ gap: 7, opacity: 1, transform: "none" }}>
                  <div className="sb-sk" style={{ width: 48, height: 26, animationDelay: `${i * 0.15}s` }} />
                  <div className="sb-sk" style={{ width: 38, height: 6, animationDelay: `${i * 0.1}s` }} />
                </div>
              ))
            : items.map((item, i) => (
                <StatCell key={i} index={i} value={item.value} label={item.label} started={entered} />
              ))
          }
        </div>
      </div>
    </>
  );
}

// ─── Featured card ────────────────────────────────────────────
function FeaturedCard({ article }) {
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
    <a href="/news" style={{ textDecoration: "none", display: "block" }} {...hoverProps}>
      <div style={{
        position: "relative", overflow: "hidden",
        background: surface, minHeight: "clamp(280px,40vw,460px)",
        height: "100%",
        transition: "background 0.3s",
      }}>
        <ArticleImg
          src={src}
          style={{
            opacity: hovered ? 0.65 : 0.5,
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.4s",
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
            fontSize: "clamp(1.2rem,2.2vw,1.7rem)",
            lineHeight: 1.1, letterSpacing: "0.02em", margin: "10px 0 8px",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), color 0.3s",
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
            width: hovered ? "100%" : "0%", transition: "width 0.55s cubic-bezier(0.22,1,0.36,1)",
          }} />
        </div>
      </div>
    </a>
  );
}

// ─── Side article ─────────────────────────────────────────────
function SideArticle({ article, last }) {
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
    <a href="/news" style={{
      display: "flex", alignItems: "stretch",
      borderBottom: last ? "none" : `1px solid ${border}`,
      textDecoration: "none",
      background: hovered ? cardHover : card,
      transition: "background 0.3s, border-color 0.3s", flex: 1,
    }} {...hoverProps}>
      <div style={{
        width: 80, flexShrink: 0, background: surface, position: "relative", overflow: "hidden",
        transition: "background 0.3s",
      }}>
        <ArticleImg
          src={src}
          style={{
            opacity: 0.5,
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
      <div style={{
        flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column",
        justifyContent: "center", gap: 4,
        borderLeft: hovered ? `2px solid ${accent}` : "2px solid transparent",
        transition: "border-color 0.3s",
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
      transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
      boxShadow: hovered ? `0 6px 24px ${shadow}` : "none",
    }} {...hoverProps}>
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: surface, transition: "background 0.3s" }}>
        <ArticleImg
          src={src}
          style={{
            opacity: hovered ? 0.85 : 0.72,
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.4s",
          }}
        />
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
export function NewsSection() {
  const { darkMode } = useTheme();
  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";

  return (
    <>
      <style>{`
        .ns-grid {
          display: grid; grid-template-columns: 1fr 290px;
          border: 1px solid ${border}; border-radius: 4px; overflow: hidden;
          transition: border-color 0.3s;
        }
        .ns-side {
          display: flex; flex-direction: column; border-left: 1px solid ${border};
          background: ${card}; transition: background 0.3s, border-color 0.3s;
        }
        .ns-side a { flex: 1; }
        @media (max-width: 860px) {
          .ns-grid { grid-template-columns: 1fr; }
          .ns-side { border-left: none; border-top: 1px solid ${border}; flex-direction: row; flex-wrap: wrap; }
          .ns-side a { flex: 1 1 240px; }
        }
        @media (max-width: 520px) { .ns-side a { flex: 1 1 100%; } }
      `}</style>

      <section style={{
        background: bg, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <SectionHead eyebrow="Actualités" title="À La Une" action="Toutes les news" href="/news" icon={require("react-icons/fi").FiList} />
          <div className="ns-grid">
            <FeaturedCard article={NEWS_FEATURED} />
            <div className="ns-side">
              {NEWS_SIDE.map((n, i) => (
                <SideArticle key={i} article={n} last={i === NEWS_SIDE.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── MORE NEWS ────────────────────────────────────────────────
export function MoreNewsSection() {
  const { darkMode } = useTheme();
  const surface = darkMode ? "#171717" : "#f5f5f5";

  return (
    <>
      <style>{`
        .mn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 860px) { .mn-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 500px) { .mn-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section style={{
        background: surface, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <SectionHead eyebrow="Plus d'actualités" title="Dernières Nouvelles" action="Toutes" href="/news" icon={require("react-icons/fi").FiList} />
          <div className="mn-grid">
            {NEWS_MORE.map((n, i) => (
              <NewsCard key={i} article={n} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
