import { useState } from "react";
import { FiShoppingCart, FiStar, FiArrowRight, FiUsers, FiGlobe, FiGrid, FiArrowUpRight } from "react-icons/fi";
import { C, FONT } from "./constants";
import { SectionHead } from "./ui";

// ─── Shared hover hook ────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── Stat pill ────────────────────────────────────────────────
function Stat({ num, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: "clamp(1.1rem,2vw,1.5rem)",
        color: "white", lineHeight: 1, letterSpacing: "-0.02em",
      }}>{num}</span>
      <span style={{
        fontFamily: FONT.body, fontSize: 8, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.28)",
      }}>{label}</span>
    </div>
  );
}

// ─── PROMO SECTION ────────────────────────────────────────────
export function PromoSection() {
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
          position: relative;
          display: flex; flex-direction: column; justify-content: space-between;
          min-height: clamp(240px, 32vw, 340px);
          padding: clamp(24px,3vw,40px);
          text-decoration: none; overflow: hidden;
        }

        /* Sweep line — top on hover */
        .pr-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          height: 1px; width: 0%;
          background: rgba(255,255,255,0.3);
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .pr-card:hover::before { width: 100%; }

        /* Sweep line — bottom on hover */
        .pr-card::after {
          content: ''; position: absolute; bottom: 0; right: 0;
          height: 1px; width: 0%;
          background: rgba(255,255,255,0.3);
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .pr-card:hover::after { width: 100%; }

        .pr-icon-box {
          width: 30px; height: 30px; border-radius: 3px; flex-shrink: 0;
          background: rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .pr-card:hover .pr-icon-box { background: rgba(255,255,255,0.14); }

        .pr-title {
          font-weight: 900; color: white;
          font-size: clamp(1.7rem, 3.2vw, 2.6rem);
          line-height: 0.95; letter-spacing: 0.02em;
          white-space: pre-line; margin: 18px 0 10px;
          transition: letter-spacing 0.3s;
        }
        .pr-card:hover .pr-title { letter-spacing: 0.035em; }

        .pr-desc {
          color: rgba(255,255,255,0.32); font-size: clamp(11px,1.1vw,13px);
          line-height: 1.7; max-width: 300px; margin: 0;
        }

        .pr-stats {
          display: flex; align-items: stretch; gap: 16px;
          margin-top: 20px; padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .pr-stat-divider {
          width: 1px; background: rgba(255,255,255,0.1); align-self: stretch;
        }

        .pr-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 22px 0 18px; }

        .pr-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

        .pr-cta {
          color: white; font-size: 9px; font-weight: 900;
          letter-spacing: 0.18em; text-transform: uppercase;
          transition: letter-spacing 0.25s;
        }
        .pr-card:hover .pr-cta { letter-spacing: 0.24em; }

        .pr-arrow {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .pr-card:hover .pr-arrow { background: white; border-color: white; transform: rotate(-45deg); }
        .pr-card:hover .pr-arrow-icon { color: #0a0a0a !important; }
      `}</style>

      <section style={{ background: "#ebebeb", padding: "clamp(28px,5vw,48px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 22, height: 1, background: "#aaa" }} />
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: "0.26em",
              textTransform: "uppercase", color: "#999", fontFamily: FONT.body,
            }}>Offres Exclusives</span>
          </div>

          <div className="pr-grid">

            {/* ── Card A — Tickets ── */}
            <a href="/tickets" className="pr-card" style={{ background: C.black }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="pr-icon-box"><FiShoppingCart size={13} color="white" /></div>
                  <span style={{
                    fontFamily: FONT.body, fontSize: 8, fontWeight: 900,
                    letterSpacing: "0.26em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}>Billets Officiels</span>
                </div>
                <h3 className="pr-title" style={{ fontFamily: FONT.display }}>{"VIVEZ LE MATCH\nEN DIRECT"}</h3>
                <p className="pr-desc" style={{ fontFamily: FONT.body }}>
                  Des places disponibles dans les 6 nations hôtes. Réservez avant rupture de stock.
                </p>
                <div className="pr-stats">
                  <Stat num="6"   label="Nations hôtes" />
                  <div className="pr-stat-divider" />
                  <Stat num="104" label="Matchs" />
                  <div className="pr-stat-divider" />
                  <Stat num="48"  label="Équipes" />
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="pr-divider" />
                <div className="pr-footer">
                  <span className="pr-cta" style={{ fontFamily: FONT.body }}>Acheter maintenant</span>
                  <div className="pr-arrow">
                    <FiArrowUpRight size={12} color="white" className="pr-arrow-icon" style={{ transition: "color 0.2s" }} />
                  </div>
                </div>
              </div>
            </a>

            {/* ── Card B — VIP ── */}
            <a href="/hospitality" className="pr-card" style={{ background: "#111" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="pr-icon-box"><FiStar size={13} color="white" /></div>
                  <span style={{
                    fontFamily: FONT.body, fontSize: 8, fontWeight: 900,
                    letterSpacing: "0.26em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}>Hospitalité FIFA</span>
                </div>
                <h3 className="pr-title" style={{ fontFamily: FONT.display }}>{"L'EXPÉRIENCE\nVIP ULTIME"}</h3>
                <p className="pr-desc" style={{ fontFamily: FONT.body }}>
                  Loges privées, gastronomie étoilée, rencontres avec les légendes du football.
                </p>
                <div className="pr-stats">
                  <Stat num="12" label="Packages VIP" />
                  <div className="pr-stat-divider" />
                  <Stat num="5★" label="Expérience" />
                  <div className="pr-stat-divider" />
                  <Stat num="6"  label="Stades" />
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="pr-divider" />
                <div className="pr-footer">
                  <span className="pr-cta" style={{ fontFamily: FONT.body }}>Découvrir les packages</span>
                  <div className="pr-arrow">
                    <FiArrowUpRight size={12} color="white" className="pr-arrow-icon" style={{ transition: "color 0.2s" }} />
                  </div>
                </div>
              </div>
            </a>

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
                  <span className="ts-num" style={{ fontFamily: FONT.display, color: p.dark ? "white" : C.black }}>{p.num}</span>
                  <span className="ts-unit" style={{ fontFamily: FONT.body, color: p.dark ? "rgba(255,255,255,0.22)" : C.mid }}>{p.unit}</span>
                </div>
                <span className="ts-label" style={{ fontFamily: FONT.body, color: p.dark ? "rgba(255,255,255,0.4)" : C.mid }}>{p.label}</span>
                <p className="ts-desc" style={{ fontFamily: FONT.body, color: p.dark ? "rgba(255,255,255,0.28)" : C.mid }}>{p.desc}</p>
                <div className="ts-bar" style={{ background: p.dark ? "rgba(255,255,255,0.15)" : "#e0e0e0" }} />
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
  const [email,   setEmail]   = useState("");
  const [sent,    setSent]    = useState(false);
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
        @media (max-width: 860px) { .fz-inner { grid-template-columns: 1fr; gap: 40px; } }

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
          transition: all 0.15s; cursor: pointer; border: none; white-space: nowrap;
        }
        .fz-btn-filled  { background: white; color: ${C.black}; }
        .fz-btn-filled:hover  { background: #e8e8e8; }
        .fz-btn-outline { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.18); }
        .fz-btn-outline:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.4); }

        .fz-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px; padding: clamp(20px,3vw,28px);
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
          border-radius: 100px; padding: 11px 18px;
          font-size: 12px; color: white; outline: none; font-weight: 500;
          transition: border-color 0.2s, background 0.2s;
        }
        .fz-input::placeholder { color: rgba(255,255,255,0.22); }
        .fz-submit {
          flex-shrink: 0; background: white; color: ${C.black};
          border: none; border-radius: 100px; padding: 11px 20px; cursor: pointer;
          font-size: 11px; font-weight: 900; letter-spacing: 0.1em;
          transition: background 0.15s; white-space: nowrap;
        }
        .fz-submit:hover { background: #e8e8e8; }
        .fz-legal { font-size: 9px; color: rgba(255,255,255,0.16); margin-top: 10px; line-height: 1.5; }
        .fz-legal a { color: rgba(255,255,255,0.3); }
        .fz-success { display: flex; align-items: center; gap: 8px; padding: 14px 0; }
        .fz-success-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }
        .fz-success-txt { font-size: 12px; color: rgba(255,255,255,0.55); font-weight: 600; }
      `}</style>

      <section className="fz-root">
        <div className="fz-inner">

          {/* Left */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <FiUsers size={12} color="rgba(255,255,255,0.3)" />
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, fontWeight: 900, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: FONT.body }}>
                Zone Fan Officielle
              </span>
            </div>
            <h2 className="fz-headline" style={{ fontFamily: FONT.display }}>
              FAITES PARTIE<br />DE L'HISTOIRE
            </h2>
            <p className="fz-body" style={{ fontFamily: FONT.body }}>
              Concerts, écrans géants, FIFA Gaming, trophy experience — accès gratuit dans les 6 Fan Zones officielles.
            </p>
            <div className="fz-btns">
              {ctaButtons.map(({ href, icon: Icon, label, filled }) => (
                <a key={label} href={href} className={`fz-btn ${filled ? "fz-btn-filled" : "fz-btn-outline"}`} style={{ fontFamily: FONT.body }}>
                  <Icon size={12} /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — newsletter */}
          <div className="fz-card">
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
              <FiGlobe size={12} color="rgba(255,255,255,0.3)" />
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, fontWeight: 900, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: FONT.body }}>
                Newsletter FIFA
              </span>
            </div>
            <h3 className="fz-card-title" style={{ fontFamily: FONT.display }}>Restez Informé</h3>
            <p className="fz-card-body" style={{ fontFamily: FONT.body }}>
              Scores live, tirages au sort, news exclusives FIFA 2030.
            </p>
            {sent ? (
              <div className="fz-success">
                <div className="fz-success-dot" />
                <span className="fz-success-txt" style={{ fontFamily: FONT.body }}>Inscription confirmée — bienvenue !</span>
              </div>
            ) : (
              <>
                <div className="fz-input-row">
                  <input
                    type="email" placeholder="votre@email.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    className="fz-input"
                    style={{
                      fontFamily: FONT.body,
                      border: `1px solid ${focused ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                      background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
                    }}
                  />
                  <button className="fz-submit" style={{ fontFamily: FONT.body }} onClick={() => { if (email.includes("@")) setSent(true); }}>
                    S'inscrire
                  </button>
                </div>
                <p className="fz-legal" style={{ fontFamily: FONT.body }}>
                  En vous inscrivant vous acceptez les <a href="#">conditions FIFA</a>.
                </p>
              </>
            )}
          </div>

        </div>
      </section>
    </>
  );
}