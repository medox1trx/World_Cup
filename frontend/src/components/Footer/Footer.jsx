import { useTheme } from "../../context/ThemeContext";

// ─── Inlined constants ────────────────────────────────────────
const FONT = { display: "'Barlow Condensed', sans-serif", body: "'Barlow', sans-serif" };

// ─── Social icons ─────────────────────────────────────────────
const SOCIALS = [
  {
    label: "X",
    href: "https://twitter.com/FIFAWorldCup",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/FIFAWorldCup",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/FIFAWorldCup",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/FIFAWorldCup",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@FIFAWorldCup",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.27a8.23 8.23 0 004.83 1.56V7.37a4.85 4.85 0 01-1.06-.68z"/></svg>,
  },
];

// ─── Sponsor logo data ────────────────────────────────────────
const GROUPS = [
  {
    label: "FIFA PARTNERS",
    items: [
      { name: "adidas",        src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",                          h: 32 },
      { name: "Coca-Cola",     src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",                       h: 28 },
      { name: "Hyundai Kia",   src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Hyundai_Motor_Company_logo.svg",            h: 22 },
      { name: "aramco",        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Saudi_Aramco_logo.svg/320px-Saudi_Aramco_logo.svg.png", h: 26 },
      { name: "Lenovo",        src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",                     h: 22 },
      { name: "Qatar Airways", src: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/320px-Qatar_Airways_Logo.svg.png", h: 40 },
      { name: "VISA",          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png", h: 24 },
    ],
  },
  {
    label: "SPONSORS",
    items: [
      { name: "Budweiser",     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Budweiser_logo.svg/320px-Budweiser_logo.svg.png", h: 28 },
      { name: "Wells Fargo",   src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wells_Fargo_Bank.svg/320px-Wells_Fargo_Bank.svg.png", h: 28 },
      { name: "Hisense",       src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Hisense_logo.svg/320px-Hisense_logo.svg.png", h: 22 },
      { name: "Lay's",         src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lays_logo.svg/320px-Lays_logo.svg.png", h: 44 },
      { name: "McDonald's",    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/200px-McDonald%27s_Golden_Arches.svg.png", h: 38 },
      { name: "Mengniu",       src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mengniu_logo.svg/320px-Mengniu_logo.svg.png", h: 26 },
      { name: "Dove",          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Dove-logo.svg/320px-Dove-logo.svg.png", h: 32 },
      { name: "Verizon",       src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Verizon_2015_logo_-vector.svg/320px-Verizon_2015_logo_-vector.svg.png", h: 22 },
    ],
  },
  {
    label: "SUPPORTERS",
    items: [
      { name: "Valvoline",     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Valvoline_logo.svg/320px-Valvoline_logo.svg.png", h: 32 },
    ],
  },
];

// ─── Logo image component ─────────────────────────────────────
function Logo({ name, src, h, darkMode }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 clamp(12px,2vw,24px)",
        opacity: 0.55, transition: "opacity 0.2s", cursor: "default",
      }}
      onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
      onMouseOut={e  => e.currentTarget.style.opacity = "0.55"}
    >
      <img
        src={src} alt={name}
        style={{
          height: h, width: "auto", maxWidth: 120,
          objectFit: "contain", display: "block",
          // In dark mode: make all logos white. In light mode: show natural colors.
          filter: darkMode ? "brightness(0) invert(1)" : "none",
          transition: "filter 0.3s",
        }}
        onError={e => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "block";
        }}
      />
      <span style={{
        display: "none",
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: 14,
        color: darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
        letterSpacing: "0.06em", whiteSpace: "nowrap",
      }}>{name}</span>
    </div>
  );
}

// ─── Store badge ──────────────────────────────────────────────
function StoreBadge({ store, darkMode }) {
  const apple = store === "apple";

  // Colors adapt to theme
  const borderColor    = darkMode ? "rgba(255,255,255,0.3)"  : "rgba(0,0,0,0.2)";
  const borderHover    = darkMode ? "rgba(255,255,255,0.7)"  : "rgba(0,0,0,0.5)";
  const bgHover        = darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const iconFill       = darkMode ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.7)";
  const labelColor     = darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";
  const nameColor      = darkMode ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.85)";

  return (
    <a
      href={apple ? "https://apps.apple.com" : "https://play.google.com"}
      target="_blank" rel="noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 8,
        border: `1px solid ${borderColor}`,
        borderRadius: 5, padding: "5px 12px",
        textDecoration: "none",
        transition: "border-color 0.2s, background 0.2s",
        minWidth: 126, background: "transparent",
      }}
      onMouseOver={e => { e.currentTarget.style.borderColor = borderHover; e.currentTarget.style.background = bgHover; }}
      onMouseOut={e  => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.background = "transparent"; }}
    >
      {apple
        ? <svg width="17" height="17" viewBox="0 0 24 24" fill={iconFill}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        : <svg width="17" height="17" viewBox="0 0 24 24" fill={iconFill}><path d="M3.18 23.76c.33.19.7.24 1.06.14L14 14 4.1.14C3.74.04 3.37.1 3.04.3A2 2 0 002 2.06v19.88a2 2 0 001.18 1.82zM16.54 11.6l2.76-2.76-9.19-5.3 6.43 8.06zm-6.43 4.46l9.19-5.3-2.76-2.76-6.43 8.06zM20.82 10.1l-1.22-.7 1.22-.7A2 2 0 0022 7.06v9.88a2 2 0 01-1.18 1.82l-1.22-.7-1.22-.7 1.44-.83z"/></svg>
      }
      <div>
        <div style={{ fontFamily: FONT.body, fontSize: 8, color: labelColor, letterSpacing: "0.05em" }}>
          {apple ? "Download on the" : "GET IT ON"}
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: nameColor, letterSpacing: "0.01em" }}>
          {apple ? "App Store" : "Google Play"}
        </div>
      </div>
    </a>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
export default function Footer() {
  const { darkMode } = useTheme();

  // ── Derived color tokens ──────────────────────────────────
  const bg          = darkMode ? "#0a0a0a"                  : "#f5f5f5";
  const border      = darkMode ? "rgba(255,255,255,0.07)"   : "rgba(0,0,0,0.08)";
  const wordmark    = darkMode ? "white"                    : "#0d0d0d";
  const socColor    = darkMode ? "rgba(255,255,255,0.4)"    : "rgba(0,0,0,0.4)";
  const socHoverBg  = darkMode ? "rgba(255,255,255,0.07)"   : "rgba(0,0,0,0.06)";
  const socHoverClr = darkMode ? "white"                    : "#0d0d0d";
  const dlLabel     = darkMode ? "rgba(255,255,255,0.35)"   : "rgba(0,0,0,0.4)";
  const groupLabel  = darkMode ? "rgba(255,255,255,0.3)"    : "rgba(0,0,0,0.3)";
  const divider     = darkMode ? "rgba(255,255,255,0.06)"   : "rgba(0,0,0,0.07)";
  const legalLink   = darkMode ? "rgba(255,255,255,0.32)"   : "rgba(0,0,0,0.35)";
  const legalHover  = darkMode ? "white"                    : "#0d0d0d";
  const copy        = darkMode ? "rgba(255,255,255,0.22)"   : "rgba(0,0,0,0.3)";
  const vline       = darkMode ? "rgba(255,255,255,0.12)"   : "rgba(0,0,0,0.12)";

  return (
    <footer style={{
      background: bg,
      borderTop: `1px solid ${border}`,
      fontFamily: FONT.body,
      transition: "background 0.3s, border-color 0.3s",
    }}>

      {/* ── TOP BAR ── */}
      <div style={{ borderBottom: `1px solid ${border}`, transition: "border-color 0.3s" }}>
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          padding: "0 clamp(16px,2.5vw,32px)",
          height: 52,
          display: "flex", alignItems: "center",
          gap: "clamp(8px,1.5vw,20px)",
          overflow: "hidden",
        }}>
          {/* Wordmark */}
          <a href="/" style={{
            fontFamily: FONT.display, fontSize: 22, fontWeight: 900,
            color: wordmark, letterSpacing: "0.06em", textDecoration: "none",
            flexShrink: 0, transition: "color 0.3s",
          }}>FIFA</a>

          {/* Vertical divider */}
          <div style={{ width: 1, height: 18, flexShrink: 0, background: vline, transition: "background 0.3s" }} />

          {/* Socials */}
          <div style={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
            {SOCIALS.map(s => (
              <a
                key={s.label} href={s.href}
                target="_blank" rel="noreferrer" aria-label={s.label}
                style={{
                  width: 32, height: 32, borderRadius: 3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: socColor, textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseOver={e => { e.currentTarget.style.background = socHoverBg; e.currentTarget.style.color = socHoverClr; }}
                onMouseOut={e  => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = socColor; }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Vertical divider */}
          <div style={{ width: 1, height: 18, flexShrink: 0, background: vline, transition: "background 0.3s" }} />

          {/* Download label */}
          <span style={{
            flex: 1, minWidth: 0,
            fontSize: "clamp(10px,0.9vw,12px)",
            color: dlLabel,
            letterSpacing: "0.02em",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            transition: "color 0.3s",
          }}>
            Télécharger dès maintenant FIFA+ pour plus de contenus
          </span>

          {/* Store badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <StoreBadge store="google" darkMode={darkMode} />
            <StoreBadge store="apple"  darkMode={darkMode} />
          </div>
        </div>
      </div>

      {/* ── SPONSORS ── */}
      <div style={{
        maxWidth: 1440, margin: "0 auto",
        padding: "clamp(20px,3vh,32px) clamp(16px,2.5vw,32px)",
        borderBottom: `1px solid ${border}`,
        transition: "border-color 0.3s",
      }}>
        {GROUPS.map((g, gi) => (
          <div key={g.label}>
            {gi > 0 && (
              <hr style={{ border: "none", borderTop: `1px solid ${divider}`, margin: "20px 0", transition: "border-color 0.3s" }} />
            )}
            <div style={{ marginBottom: gi === GROUPS.length - 1 ? 0 : 24 }}>
              <p style={{
                textAlign: "center",
                fontSize: 9, fontWeight: 800,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: groupLabel,
                marginBottom: 16, transition: "color 0.3s",
              }}>{g.label}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>
                {g.items.map(item => (
                  <Logo key={item.name} {...item} darkMode={darkMode} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ borderTop: `1px solid ${border}`, transition: "border-color 0.3s" }}>
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          padding: "0 clamp(16px,2.5vw,32px)",
          height: 48,
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
        }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2vw,28px)", flexWrap: "wrap" }}>
            {[
              { label: "Politique de confidentialité", href: "/privacy"  },
              { label: "Conditions d'utilisation",     href: "/terms"    },
              { label: "Cookies",                      href: "/cookies"  },
              { label: "Contact",                      href: "/contact"  },
            ].map(l => (
              <a
                key={l.href} href={l.href}
                style={{
                  fontSize: "clamp(9px,0.72vw,11px)", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: legalLink, textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseOver={e => e.currentTarget.style.color = legalHover}
                onMouseOut={e  => e.currentTarget.style.color = legalLink}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <span style={{
            fontSize: "clamp(9px,0.72vw,11px)",
            color: copy, letterSpacing: "0.03em", whiteSpace: "nowrap",
            transition: "color 0.3s",
          }}>
            Copyright © 1994 – 2030 FIFA. Tous droits réservés.
          </span>
        </div>
      </div>

    </footer>
  );
}