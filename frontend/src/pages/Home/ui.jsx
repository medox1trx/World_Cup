import { FiChevronRight, FiRefreshCw } from "react-icons/fi";
import { FONT, C } from "./constants";

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
export function Flag({ code, alt = "", size = 28 }) {
  if (!code) return null;
  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      alt={alt}
      loading="lazy"
      style={{
        width: size * 1.5, height: size,
        objectFit: "cover", flexShrink: 0,
        borderRadius: 2,
      }}
    />
  );
}

// ─── SPINNER ──────────────────────────────────────────────────
export function Spinner() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "48px 0", gap: 8, color: C.mid,
    }}>
      <FiRefreshCw size={14} style={{ animation: "spin 0.9s linear infinite" }} />
      <span style={{ fontSize: 12, fontFamily: FONT.body, fontWeight: 500 }}>Chargement…</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── SECTION HEAD ─────────────────────────────────────────────
export function SectionHead({ eyebrow, title, action, href }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:24 }}>
      <div>
        <p style={{
          fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
          color: C.mid, fontFamily: FONT.body, margin:"0 0 6px",
        }}>{eyebrow}</p>
        <h2 style={{
          fontSize:36, fontWeight:900, letterSpacing:"0.04em", textTransform:"uppercase",
          color: C.black, fontFamily: FONT.display, margin:0, lineHeight:1,
        }}>{title}</h2>
      </div>
      {action && (
        <a href={href} style={{
          fontSize:10, fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase",
          color: C.mid, textDecoration:"none", fontFamily: FONT.body,
          transition:"color 0.15s",
        }}
          onMouseOver={e => e.currentTarget.style.color = C.black}
          onMouseOut={e => e.currentTarget.style.color = C.mid}
        >{action} →</a>
      )}
    </div>
  );
}