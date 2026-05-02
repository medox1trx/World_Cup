import React, { useState, useEffect, useRef } from "react";
import { FiChevronRight, FiRefreshCw } from "react-icons/fi";
import { FONT } from "./constants";
import { useTheme } from "../../context/ThemeContext";
import { getImageUrl } from "../../services/api";

// ─── REVEAL ON SCROLL ──────────────────────────────────────────
export function Reveal({ children, delay = 0, width = "100%" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── GLOBAL FONTS ─────────────────────────────────────────────
export function GlobalFonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700;800&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      .font-display { font-family: ${FONT.display}; }
      .font-body    { font-family: ${FONT.body}; }
    `}</style>
  );
}

// ─── FLAG ─────────────────────────────────────────────────────
// Helper to convert country flag emojis to 2-letter ISO codes
function convertEmojiToCode(emoji) {
  if (!emoji || emoji.length < 4) return null; // Emojis are multiple bytes
  const codePts = [...emoji].map(c => c.codePointAt(0));
  if (codePts.length === 2 && 
      codePts[0] >= 0x1F1E6 && codePts[0] <= 0x1F1FF && 
      codePts[1] >= 0x1F1E6 && codePts[1] <= 0x1F1FF) {
    return String.fromCharCode(codePts[0] - 0x1F1E6 + 97) + 
           String.fromCharCode(codePts[1] - 0x1F1E6 + 97);
  }
  return null;
}

export function Flag({ code, alt = "", size = 22 }) {
  if (!code) return null;

  // Responsive size calculation
  const getResponsiveSize = () => {
    if (typeof size === 'number') return size;
    const match = size.toString().match(/clamp\(([^,]+),([^,]+),([^)]+)\)/);
    if (match) return parseFloat(match[2]);
    return parseFloat(size) || 28;
  };
  
  const baseSize = getResponsiveSize();

  // If it's a full URL or local storage path
  if (code.startsWith('http') || code.startsWith('/storage/')) {
     const src = getImageUrl(code);
     return (
       <img 
         src={src} 
         alt={alt} 
         loading="lazy" 
         decoding="async"
         onError={(e) => { e.target.src = "https://flagcdn.com/w80/un.png"; }}
         style={{ 
           width: "auto", height: baseSize,
           maxHeight: baseSize,
           maxWidth: baseSize * 1.5,
           objectFit: "cover", 
           borderRadius: 2,
           display: "block"
         }} 
       />
     );
  }

  // Check if it's an emoji flag
  const emojiCode = convertEmojiToCode(code);
  let finalCode = emojiCode ? emojiCode : code;

  // If it's still non-ascii and not a converted emoji, just show text (fallback)
  if (/[^\x00-\x7F]/.test(finalCode)) {
    return (
      <span style={{ fontSize: baseSize, lineHeight: 1, display: "inline-block", verticalAlign: "middle" }}>
        {finalCode}
      </span>
    );
  }

  // Standard flagcdn code with responsive sizing
  return (
    <img
      src={`https://flagcdn.com/w80/${finalCode.toLowerCase()}.png`}
      srcSet={`
        https://flagcdn.com/w40/${finalCode.toLowerCase()}.png 40w,
        https://flagcdn.com/w80/${finalCode.toLowerCase()}.png 80w,
        https://flagcdn.com/w160/${finalCode.toLowerCase()}.png 160w
      `}
      sizes="(max-width: 480px) 24px, (max-width: 768px) 32px, 48px"
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{
        width: "auto", height: baseSize,
        maxHeight: baseSize,
        maxWidth: baseSize * 1.5,
        objectFit: "cover", flexShrink: 0,
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        display: "block"
      }}
    />
  );
}

// ─── SPINNER ──────────────────────────────────────────────────
export function Spinner() {
  const { darkMode } = useTheme();
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "48px 0", gap: 8, color: textSecondary,
      transition: "color 0.3s",
    }}>
      <FiRefreshCw size={14} style={{ animation: "spin 0.9s linear infinite" }} />
      <span style={{ fontSize: 12, fontFamily: FONT.body, fontWeight: 500 }}>Chargement…</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── SECTION HEAD ─────────────────────────────────────────────
export function SectionHead({ eyebrow, title, action, href }) {
  const { darkMode } = useTheme();
  const textPrimary   = darkMode ? "#ffffff"               : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .section-head { flex-direction: column; align-items: flex-start; gap: 12px; }
          .section-head h2 { font-size: 28px !important; }
          .section-head a { font-size: 9px !important; }
        }
        @media (max-width: 400px) {
          .section-head h2 { font-size: 24px !important; }
          .section-head p { font-size: 9px !important; }
        }
      `}</style>
      <div className="section-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            color: textSecondary, fontFamily: FONT.body, margin: "0 0 6px",
            transition: "color 0.3s",
          }}>{eyebrow}</p>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, letterSpacing: "0.04em", textTransform: "uppercase",
            color: textPrimary, fontFamily: FONT.display, margin: 0, lineHeight: 1,
            transition: "color 0.3s",
          }}>{title}</h2>
        </div>
        {action && (
          <a href={href} style={{
            fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase",
            color: textSecondary, textDecoration: "none", fontFamily: FONT.body,
            transition: "color 0.3s",
          }}
            onMouseOver={e => e.currentTarget.style.color = textPrimary}
            onMouseOut={e => e.currentTarget.style.color = textSecondary}
          >{action} →</a>
        )}
      </div>
    </>
  );
}