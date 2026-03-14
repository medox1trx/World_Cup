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
export function SectionHead({ eyebrow, title, action, href, dark = false, icon: Icon }) {
  return (
    <>
      <style>{`
        .sh-root {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px; padding-bottom: 12px;
          border-bottom: 1px solid ${dark ? "rgba(255,255,255,0.08)" : C.border};
          gap: 12px;
        }
        .sh-left  { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .sh-icon  {
          width: 26px; height: 26px; border-radius: 3px; flex-shrink: 0;
          background: ${dark ? "rgba(255,255,255,0.08)" : C.black};
          display: flex; align-items: center; justify-content: center;
        }
        .sh-eyebrow {
          display: block; font-size: 8px; font-weight: 800;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: ${dark ? "rgba(255,255,255,0.35)" : C.mid};
          margin-bottom: 2px; font-family: ${FONT.body};
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .sh-title {
          font-family: ${FONT.display};
          font-size: clamp(1.15rem, 2vw, 1.6rem);
          font-weight: 800; letter-spacing: 0.04em;
          color: ${dark ? "#fff" : C.black};
          line-height: 1; white-space: nowrap;
        }
        .sh-action {
          display: flex; align-items: center; gap: 4px; flex-shrink: 0;
          font-size: 10px; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
          color: ${dark ? "rgba(255,255,255,0.35)" : C.mid};
          font-family: ${FONT.body};
          transition: color 0.15s; white-space: nowrap;
        }
        .sh-action:hover { color: ${dark ? "#fff" : C.black}; }

        @media (max-width: 480px) {
          .sh-eyebrow { display: none; }
          .sh-title   { font-size: 1.1rem; }
          .sh-action span { display: none; }
        }
      `}</style>

      <div className="sh-root">
        <div className="sh-left">
          {Icon && (
            <div className="sh-icon">
              <Icon size={12} color="white" />
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            {eyebrow && <span className="sh-eyebrow">{eyebrow}</span>}
            <h2 className="sh-title">{title}</h2>
          </div>
        </div>

        {action && href && (
          <a href={href} className="sh-action">
            <span>{action}</span>
            <FiChevronRight size={11} />
          </a>
        )}
      </div>
    </>
  );
}