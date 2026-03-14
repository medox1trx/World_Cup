// ─── Inlined constants ────────────────────────────────────────
const C    = { black: "#0d0d0d", border: "#e8e8e8", mid: "#8a8a8a" };
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

// ─── Sponsor logo data (real SVG/PNG from Wikimedia — CSS filter makes them white) ──
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
function Logo({ name, src, h }) {
  return (
    <div style={{
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
          // Make any logo appear white on dark background
          filter: "brightness(0) invert(1)",
        }}
        onError={e => {
          // Fallback to text if image fails
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "block";
        }}
      />
      {/* Text fallback */}
      <span style={{
        display: "none",
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: 14, color: "rgba(255,255,255,0.55)",
        letterSpacing: "0.06em", whiteSpace: "nowrap",
      }}>{name}</span>
    </div>
  );
}

// ─── Store badge ──────────────────────────────────────────────
function StoreBadge({ store }) {
  const apple = store === "apple";
  return (
    <a href={apple ? "https://apps.apple.com" : "https://play.google.com"}
      target="_blank" rel="noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 8,
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: 5, padding: "5px 12px",
        textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
        minWidth: 126, background: "transparent",
      }}
      onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onMouseOut={e  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}
    >
      {apple
        ? <svg width="17" height="17" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        : <svg width="17" height="17" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)"><path d="M3.18 23.76c.33.19.7.24 1.06.14L14 14 4.1.14C3.74.04 3.37.1 3.04.3A2 2 0 002 2.06v19.88a2 2 0 001.18 1.82zM16.54 11.6l2.76-2.76-9.19-5.3 6.43 8.06zm-6.43 4.46l9.19-5.3-2.76-2.76-6.43 8.06zM20.82 10.1l-1.22-.7 1.22-.7A2 2 0 0022 7.06v9.88a2 2 0 01-1.18 1.82l-1.22-.7-1.22-.7 1.44-.83z"/></svg>
      }
      <div>
        <div style={{ fontFamily: FONT.body, fontSize: 8, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>
          {apple ? "Download on the" : "GET IT ON"}
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "0.01em" }}>
          {apple ? "App Store" : "Google Play"}
        </div>
      </div>
    </a>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root {
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-family: ${FONT.body};
        }

        /* ── Top bar ── */
        .ft-top {
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .ft-top-inner {
          max-width: 1440px; margin: 0 auto;
          padding: 0 clamp(16px,2.5vw,32px);
          height: 52px;
          display: flex; align-items: center;
          gap: clamp(8px,1.5vw,20px);
          overflow: hidden;
        }

        .ft-wordmark {
          font-family: ${FONT.display};
          font-size: 22px; font-weight: 900;
          color: white; letter-spacing: 0.06em;
          text-decoration: none; flex-shrink: 0;
        }

        .ft-vline {
          width: 1px; height: 18px; flex-shrink: 0;
          background: rgba(255,255,255,0.12);
        }

        .ft-socials {
          display: flex; align-items: center; gap: 1px; flex-shrink: 0;
        }
        .ft-soc {
          width: 32px; height: 32px; border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4); text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .ft-soc:hover { background: rgba(255,255,255,0.07); color: white; }

        .ft-dl-label {
          flex: 1; min-width: 0;
          font-size: clamp(10px,0.9vw,12px);
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.02em;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .ft-badges {
          display: flex; align-items: center; gap: 8px; flex-shrink: 0;
        }

        @media (max-width: 900px)  { .ft-dl-label { display: none; } }
        @media (max-width: 640px)  { .ft-badges   { display: none; } }

        /* ── Sponsor section ── */
        .ft-sponsors {
          max-width: 1440px; margin: 0 auto;
          padding: clamp(20px,3vh,32px) clamp(16px,2.5vw,32px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .ft-group { margin-bottom: 24px; }
        .ft-group:last-child { margin-bottom: 0; }

        .ft-glabel {
          text-align: center;
          font-size: 9px; font-weight: 800;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 16px;
        }

        .ft-logos {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 0;
        }

        /* ── Divider between groups ── */
        .ft-hdiv {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 20px 0;
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .ft-bottom-inner {
          max-width: 1440px; margin: 0 auto;
          padding: 0 clamp(16px,2.5vw,32px);
          height: 48px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
        }

        .ft-legal {
          display: flex; align-items: center;
          gap: clamp(14px,2vw,28px); flex-wrap: wrap;
        }
        .ft-llink {
          font-size: clamp(9px,0.72vw,11px); font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.32); text-decoration: none;
          transition: color 0.15s;
        }
        .ft-llink:hover { color: white; }

        .ft-copy {
          font-size: clamp(9px,0.72vw,11px);
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.03em; white-space: nowrap;
        }

        @media (max-width: 520px) {
          .ft-bottom-inner {
            height: auto; padding: 12px clamp(16px,3vw,24px);
            flex-direction: column; align-items: flex-start; gap: 6px;
          }
        }
      `}</style>

      <footer className="ft-root">

        {/* ── TOP BAR ── */}
        <div className="ft-top">
          <div className="ft-top-inner">
            <a href="/" className="ft-wordmark">FIFA</a>
            <div className="ft-vline" />
            <div className="ft-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} className="ft-soc"
                  target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="ft-vline" />
            <span className="ft-dl-label">
              Télécharger dès maintenant FIFA+ pour plus de contenus
            </span>
            <div className="ft-badges">
              <StoreBadge store="google" />
              <StoreBadge store="apple" />
            </div>
          </div>
        </div>

        {/* ── SPONSORS ── */}
        <div className="ft-sponsors">
          {GROUPS.map((g, gi) => (
            <div key={g.label}>
              {gi > 0 && <hr className="ft-hdiv" />}
              <div className="ft-group">
                <p className="ft-glabel">{g.label}</p>
                <div className="ft-logos">
                  {g.items.map(item => (
                    <Logo key={item.name} {...item} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">
            <nav className="ft-legal">
              <a href="/privacy"  className="ft-llink">Politique de confidentialité</a>
              <a href="/terms"    className="ft-llink">Conditions d'utilisation</a>
              <a href="/cookies"  className="ft-llink">Cookies</a>
              <a href="/contact"  className="ft-llink">Contact</a>
            </nav>
            <span className="ft-copy">
              Copyright © 1994 – 2030 FIFA. Tous droits réservés.
            </span>
          </div>
        </div>

      </footer>
    </>
  );
}