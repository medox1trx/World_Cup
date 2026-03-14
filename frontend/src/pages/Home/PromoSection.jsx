import { useState } from "react";
import { FiShoppingCart, FiStar, FiArrowRight, FiUsers, FiGlobe, FiGrid, FiArrowUpRight } from "react-icons/fi";
import { C, FONT } from "./constants";
import { SectionHead } from "./ui";

// ─── Shared hover hook ────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── PROMO SECTION ────────────────────────────────────────────
export function PromoSection() {
  const cards = [
    {
      href: "/tickets",
      label: "Billets Officiels",
      icon: FiShoppingCart,
      title: "VIVEZ LE MATCH\nEN DIRECT",
      desc: "Des places disponibles dans les 6 nations hôtes. Réservez avant rupture.",
      cta: "Acheter maintenant",
      bg: C.black,
    },
    {
      href: "/hospitality",
      label: "Hospitalité FIFA",
      icon: FiStar,
      title: "L'EXPÉRIENCE\nVIP ULTIME",
      desc: "Loges privées, gastronomie étoilée, rencontres avec les légendes.",
      cta: "Découvrir les packages",
      bg: "#0f0f0f",
    },
  ];

  return (
    <>
      <style>{`
        .pr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          border-radius: 4px;
          overflow: hidden;
        }
        @media (max-width: 640px) { .pr-grid { grid-template-columns: 1fr; } }

        .pr-card {
          position: relative; display: flex; flex-direction: column;
          justify-content: space-between;
          min-height: clamp(180px, 28vw, 260px);
          padding: clamp(20px,3vw,36px);
          text-decoration: none;
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .pr-card:hover { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15); }

        .pr-card-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        .pr-icon-box {
          width: 28px; height: 28px; border-radius: 3px;
          background: rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .pr-card:hover .pr-icon-box { background: rgba(255,255,255,0.14); }

        .pr-title {
          font-weight: 900; color: white;
          font-size: clamp(1.4rem, 2.8vw, 2rem);
          line-height: 1.05; letter-spacing: 0.04em;
          white-space: pre-line; margin-bottom: 10px;
        }
        .pr-desc {
          color: rgba(255,255,255,0.35); font-size: 12px;
          line-height: 1.65; max-width: 280px;
        }
        .pr-footer {
          display: flex; align-items: center; gap: 8px;
          margin-top: 24px; padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .pr-cta-txt {
          color: white; font-size: 9px; font-weight: 900;
          letter-spacing: 0.18em; text-transform: uppercase;
          transition: letter-spacing 0.25s;
        }
        .pr-card:hover .pr-cta-txt { letter-spacing: 0.22em; }
        .pr-arrow {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.25s;
          flex-shrink: 0;
        }
        .pr-card:hover .pr-arrow {
          background: white; border-color: white;
          transform: rotate(-45deg);
        }
      `}</style>

      <section style={{ background: "#ebebeb", padding: "clamp(28px,5vw,48px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <div className="pr-grid">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <a key={i} href={card.href} className="pr-card" style={{ background: card.bg }}>
                  <div className="pr-card-noise" />

                  {/* Top */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                      <div className="pr-icon-box"><Icon size={13} color="white" /></div>
                      <span style={{
                        color: "rgba(255,255,255,0.4)", fontSize: 8, fontWeight: 900,
                        letterSpacing: "0.26em", textTransform: "uppercase", fontFamily: FONT.body,
                      }}>{card.label}</span>
                    </div>
                    <h3 className="pr-title" style={{ fontFamily: FONT.display }}>{card.title}</h3>
                    <p className="pr-desc" style={{ fontFamily: FONT.body }}>{card.desc}</p>
                  </div>

                  {/* Footer */}
                  <div className="pr-footer" style={{ position: "relative", zIndex: 1 }}>
                    <span className="pr-cta-txt" style={{ fontFamily: FONT.body }}>{card.cta}</span>
                    <div className="pr-arrow" style={{ marginLeft: "auto" }}>
                      <FiArrowUpRight size={11} color="white" className="pr-arrow-icon"
                        style={{ transition: "color 0.2s" }} />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── TOURNAMENT SECTION ───────────────────────────────────────
export function TournamentSection() {
  const phases = [
    {
      num: "48", unit: "équipes",
      label: "Phase de Groupes",
      desc: "16 groupes de 3 — les 2 premiers et les 8 meilleurs 3es qualifiés",
      dark: false,
    },
    {
      num: "32", unit: "équipes",
      label: "Phase Éliminatoire",
      desc: "Huitièmes, quarts, demi-finales — une défaite et c'est terminé",
      dark: false,
    },
    {
      num: "1", unit: "champion",
      label: "La Finale",
      desc: "19 juillet 2030 · Rabat · Stade Hassan II · 115 000 spectateurs",
      dark: true,
    },
  ];

  return (
    <>
      <style>{`
        .ts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid ${C.border};
          border-radius: 4px;
          overflow: hidden;
        }
        @media (max-width: 720px) { .ts-grid { grid-template-columns: 1fr; } }

        .ts-cell {
          padding: clamp(20px,3vw,32px);
          border-right: 1px solid ${C.border};
          position: relative; overflow: hidden;
          transition: background 0.2s;
        }
        .ts-cell:last-child { border-right: none; background: ${C.black}; }
        .ts-cell:not(:last-child):hover { background: #fafafa; }

        @media (max-width: 720px) {
          .ts-cell { border-right: none; border-bottom: 1px solid ${C.border}; }
          .ts-cell:last-child { border-bottom: none; }
        }

        .ts-num {
          font-weight: 900; line-height: 1;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }
        .ts-unit {
          font-size: 8px; font-weight: 900; letter-spacing: 0.18em;
          text-transform: uppercase; margin-left: 6px;
        }
        .ts-label {
          display: block; font-size: 8px; font-weight: 900;
          letter-spacing: 0.24em; text-transform: uppercase; margin-bottom: 8px;
        }
        .ts-desc { font-size: 12px; line-height: 1.65; }
        .ts-bar { margin-top: 24px; width: 20px; height: 2px; border-radius: 1px; }
      `}</style>

      <section style={{ background: "white", padding: "clamp(28px,5vw,48px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <SectionHead eyebrow="Format" title="Structure du Tournoi" icon={FiGrid} />
          <div className="ts-grid">
            {phases.map((p, i) => (
              <div key={i} className="ts-cell">
                <div style={{ display: "flex", alignItems: "baseline", marginBottom: 18 }}>
                  <span className="ts-num" style={{
                    fontFamily: FONT.display,
                    color: p.dark ? "white" : C.black,
                  }}>{p.num}</span>
                  <span className="ts-unit" style={{
                    fontFamily: FONT.body,
                    color: p.dark ? "rgba(255,255,255,0.22)" : C.mid,
                  }}>{p.unit}</span>
                </div>
                <span className="ts-label" style={{
                  fontFamily: FONT.body,
                  color: p.dark ? "rgba(255,255,255,0.4)" : C.mid,
                }}>{p.label}</span>
                <p className="ts-desc" style={{
                  fontFamily: FONT.body,
                  color: p.dark ? "rgba(255,255,255,0.28)" : C.mid,
                }}>{p.desc}</p>
                <div className="ts-bar" style={{
                  background: p.dark ? "rgba(255,255,255,0.15)" : "#e0e0e0",
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── FAN ZONE SECTION ─────────────────────────────────────────
export function FanZoneSection() {
  const [email, setEmail] = useState("");
  const [sent,  setSent]  = useState(false);
  const [focused, setFocused] = useState(false);

  const ctaButtons = [
    { href: "/tickets",     icon: FiShoppingCart, label: "Billets",  filled: true  },
    { href: "/fans",        icon: FiUsers,        label: "Fan Zone", filled: false },
    { href: "/hospitality", icon: FiStar,         label: "VIP",      filled: false },
  ];

  return (
    <>
      <style>{`
        .fz-root { background: ${C.black}; padding: clamp(36px,6vw,64px) 0; }
        .fz-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 clamp(16px,3vw,24px);
          display: grid; grid-template-columns: 1fr 380px;
          gap: clamp(32px,5vw,64px); align-items: center;
        }
        @media (max-width: 860px) {
          .fz-inner { grid-template-columns: 1fr; gap: 40px; }
        }

        /* Left */
        .fz-eyebrow {
          display: flex; align-items: center; gap: 8px; margin-bottom: 18px;
        }
        .fz-headline {
          font-weight: 900; color: white;
          font-size: clamp(2rem,5vw,3.8rem);
          line-height: 0.92; letter-spacing: 0.03em;
          text-transform: uppercase; margin-bottom: 14px;
        }
        .fz-body {
          color: rgba(255,255,255,0.28); font-size: 13px;
          line-height: 1.7; max-width: 360px; margin-bottom: 28px;
        }
        .fz-btns { display: flex; flex-wrap: wrap; gap: 8px; }

        .fz-btn {
          display: flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.06em;
          padding: 11px 22px; border-radius: 100px; text-decoration: none;
          transition: all 0.15s; cursor: pointer; border: none;
          white-space: nowrap;
        }
        .fz-btn-filled  { background: white; color: ${C.black}; }
        .fz-btn-filled:hover  { background: #e8e8e8; }
        .fz-btn-outline { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.18); }
        .fz-btn-outline:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.4); }

        /* Right — newsletter card */
        .fz-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px; padding: clamp(20px,3vw,28px);
        }
        .fz-card-eyebrow {
          display: flex; align-items: center; gap: 7px; margin-bottom: 6px;
        }
        .fz-card-title {
          font-weight: 800; color: white;
          font-size: clamp(1.2rem,2vw,1.5rem);
          letter-spacing: 0.04em; margin-bottom: 8px;
        }
        .fz-card-body {
          color: rgba(255,255,255,0.28); font-size: 12px;
          line-height: 1.65; margin-bottom: 18px;
        }
        .fz-input-row { display: flex; gap: 8px; }
        .fz-input {
          flex: 1; min-width: 0;
          background: rgba(255,255,255,0.05);
          border-radius: 100px; padding: 11px 18px;
          font-size: 12px; color: white;
          outline: none; font-weight: 500;
          transition: border-color 0.2s, background 0.2s;
        }
        .fz-input::placeholder { color: rgba(255,255,255,0.22); }
        .fz-submit {
          flex-shrink: 0; background: white; color: ${C.black};
          border: none; border-radius: 100px;
          padding: 11px 20px; cursor: pointer;
          font-size: 11px; font-weight: 900; letter-spacing: 0.1em;
          transition: background 0.15s; white-space: nowrap;
        }
        .fz-submit:hover { background: #e8e8e8; }
        .fz-legal {
          font-size: 9px; color: rgba(255,255,255,0.16);
          margin-top: 10px; line-height: 1.5;
        }
        .fz-legal a { color: rgba(255,255,255,0.3); }

        /* Success state */
        .fz-success {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 0;
        }
        .fz-success-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e; flex-shrink: 0;
        }
        .fz-success-txt {
          font-size: 12px; color: rgba(255,255,255,0.55);
          font-weight: 600;
        }
      `}</style>

      <section className="fz-root">
        <div className="fz-inner">

          {/* Left */}
          <div>
            <div className="fz-eyebrow">
              <FiUsers size={12} color="rgba(255,255,255,0.3)" />
              <span style={{
                color: "rgba(255,255,255,0.3)", fontSize: 8, fontWeight: 900,
                letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: FONT.body,
              }}>Zone Fan Officielle</span>
            </div>

            <h2 className="fz-headline" style={{ fontFamily: FONT.display }}>
              FAITES PARTIE<br />DE L'HISTOIRE
            </h2>

            <p className="fz-body" style={{ fontFamily: FONT.body }}>
              Concerts, écrans géants, FIFA Gaming, trophy experience — accès gratuit dans les 6 Fan Zones officielles.
            </p>

            <div className="fz-btns">
              {ctaButtons.map(({ href, icon: Icon, label, filled }) => (
                <a key={label} href={href}
                  className={`fz-btn ${filled ? "fz-btn-filled" : "fz-btn-outline"}`}
                  style={{ fontFamily: FONT.body }}
                >
                  <Icon size={12} /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — newsletter */}
          <div className="fz-card">
            <div className="fz-card-eyebrow">
              <FiGlobe size={12} color="rgba(255,255,255,0.3)" />
              <span style={{
                color: "rgba(255,255,255,0.3)", fontSize: 8, fontWeight: 900,
                letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: FONT.body,
              }}>Newsletter FIFA</span>
            </div>

            <h3 className="fz-card-title" style={{ fontFamily: FONT.display }}>Restez Informé</h3>
            <p className="fz-card-body" style={{ fontFamily: FONT.body }}>
              Scores live, tirages au sort, news exclusives FIFA 2030.
            </p>

            {sent ? (
              <div className="fz-success">
                <div className="fz-success-dot" />
                <span className="fz-success-txt" style={{ fontFamily: FONT.body }}>
                  Inscription confirmée — bienvenue !
                </span>
              </div>
            ) : (
              <>
                <div className="fz-input-row">
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="fz-input"
                    style={{
                      fontFamily: FONT.body,
                      border: `1px solid ${focused ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                      background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
                    }}
                  />
                  <button
                    className="fz-submit"
                    style={{ fontFamily: FONT.body }}
                    onClick={() => { if (email.includes("@")) setSent(true); }}
                  >
                    S'inscrire
                  </button>
                </div>
                <p className="fz-legal" style={{ fontFamily: FONT.body }}>
                  En vous inscrivant vous acceptez les{" "}
                  <a href="#">conditions FIFA</a>.
                </p>
              </>
            )}
          </div>

        </div>
      </section>
    </>
  );
}