import { useState } from "react";
import { FiShoppingCart, FiStar, FiArrowRight, FiUsers, FiGlobe, FiGrid, FiArrowUpRight } from "react-icons/fi";
import { FONT } from "./constants";
import { SectionHead } from "./ui";
import { useTheme } from "../../context/ThemeContext";

// ─── Shared hover hook ────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── Stat pill ────────────────────────────────────────────────
function Stat({ num, label, textPrimary, textMuted }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: "clamp(1.1rem,2vw,1.5rem)",
        color: textPrimary, lineHeight: 1, letterSpacing: "-0.02em",
        transition: "color 0.3s",
      }}>{num}</span>
      <span style={{
        fontFamily: FONT.body, fontSize: 8, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: textMuted, transition: "color 0.3s",
      }}>{label}</span>
    </div>
  );
}

// ─── PROMO SECTION ────────────────────────────────────────────
export function PromoSection() {
  const { darkMode } = useTheme();
  const sectionBg    = darkMode ? "#0d0d0d"                  : "#ebebeb";
  const cardBg       = darkMode ? "#1c1c1c"                  : "#0d0d0d";
  const textPrimary  = darkMode ? "#ffffff"                   : "#ffffff";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const textMuted    = darkMode ? "rgba(255,255,255,0.28)"   : "rgba(255,255,255,0.28)";
  const textFaint    = darkMode ? "rgba(255,255,255,0.35)"   : "rgba(255,255,255,0.35)";
  const eyebrowText  = darkMode ? "rgba(255,255,255,0.4)"    : "#999999";
  const eyebrowLine  = darkMode ? "rgba(255,255,255,0.15)"   : "#aaaaaa";
  const iconBoxBg    = darkMode ? "rgba(255,255,255,0.07)"   : "rgba(255,255,255,0.07)";
  const iconBoxHover = darkMode ? "rgba(255,255,255,0.14)"   : "rgba(255,255,255,0.14)";
  const divider      = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(255,255,255,0.08)";
  const statDiv      = darkMode ? "rgba(255,255,255,0.1)"    : "rgba(255,255,255,0.1)";
  const borderLight  = darkMode ? "rgba(255,255,255,0.2)"    : "rgba(255,255,255,0.2)";
  const sweepLine    = darkMode ? "rgba(255,255,255,0.3)"    : "rgba(255,255,255,0.3)";

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
          background: ${sweepLine};
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .pr-card:hover::before { width: 100%; }

        /* Sweep line — bottom on hover */
        .pr-card::after {
          content: ''; position: absolute; bottom: 0; right: 0;
          height: 1px; width: 0%;
          background: ${sweepLine};
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .pr-card:hover::after { width: 100%; }

        .pr-icon-box {
          width: 30px; height: 30px; border-radius: 3px; flex-shrink: 0;
          background: ${iconBoxBg};
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .pr-card:hover .pr-icon-box { background: ${iconBoxHover}; }

        .pr-title {
          font-weight: 900; color: ${textPrimary};
          font-size: clamp(1.7rem, 3.2vw, 2.6rem);
          line-height: 0.95; letter-spacing: 0.02em;
          white-space: pre-line; margin: 18px 0 10px;
          transition: letter-spacing 0.3s, color 0.3s;
        }
        .pr-card:hover .pr-title { letter-spacing: 0.035em; }

        .pr-desc {
          color: ${textMuted}; font-size: clamp(11px,1.1vw,13px);
          line-height: 1.7; max-width: 300px; margin: 0;
          transition: color 0.3s;
        }

        .pr-stats {
          display: flex; align-items: stretch; gap: 16px;
          margin-top: 20px; padding-top: 18px;
          border-top: 1px solid ${divider};
          transition: border-color 0.3s;
        }
        .pr-stat-divider {
          width: 1px; background: ${statDiv}; align-self: stretch;
          transition: background 0.3s;
        }

        .pr-divider {
          height: 1px; background: ${divider}; margin: 22px 0 18px;
          transition: background 0.3s;
        }

        .pr-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

        .pr-cta {
          color: ${textPrimary}; font-size: 9px; font-weight: 900;
          letter-spacing: 0.18em; text-transform: uppercase;
          transition: letter-spacing 0.25s, color 0.3s;
        }
        .pr-card:hover .pr-cta { letter-spacing: 0.24em; }

        .pr-arrow {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid ${borderLight};
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .pr-card:hover .pr-arrow { background: ${textPrimary}; border-color: ${textPrimary}; transform: rotate(-45deg); }
        .pr-card:hover .pr-arrow-icon { color: ${sectionBg} !important; }
      `}</style>

      <section style={{
        background: sectionBg, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 22, height: 1, background: eyebrowLine,
              transition: "background 0.3s",
            }} />
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: "0.26em",
              textTransform: "uppercase", color: eyebrowText, fontFamily: FONT.body,
              transition: "color 0.3s",
            }}>Offres Exclusives</span>
          </div>

          <div className="pr-grid">

            {/* ── Card A — Tickets ── */}
            <a href="/tickets" className="pr-card" style={{ background: cardBg, transition: "background 0.3s" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="pr-icon-box"><FiShoppingCart size={13} color={textPrimary} /></div>
                  <span style={{
                    fontFamily: FONT.body, fontSize: 8, fontWeight: 900,
                    letterSpacing: "0.26em", textTransform: "uppercase",
                    color: textFaint, transition: "color 0.3s",
                  }}>Billets Officiels</span>
                </div>
                <h3 className="pr-title" style={{ fontFamily: FONT.display }}>{"VIVEZ LE MATCH\nEN DIRECT"}</h3>
                <p className="pr-desc" style={{ fontFamily: FONT.body }}>
                  Des places disponibles dans les 6 nations hôtes. Réservez avant rupture de stock.
                </p>
                <div className="pr-stats">
                  <Stat num="6"   label="Nations hôtes" textPrimary={textPrimary} textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="104" label="Matchs" textPrimary={textPrimary} textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="48"  label="Équipes" textPrimary={textPrimary} textMuted={textMuted} />
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="pr-divider" />
                <div className="pr-footer">
                  <span className="pr-cta" style={{ fontFamily: FONT.body }}>Acheter maintenant</span>
                  <div className="pr-arrow">
                    <FiArrowUpRight size={12} color={textPrimary} className="pr-arrow-icon" style={{ transition: "color 0.3s" }} />
                  </div>
                </div>
              </div>
            </a>

            {/* ── Card B — VIP ── */}
            <a href="/hospitality" className="pr-card" style={{ background: cardBg, transition: "background 0.3s" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="pr-icon-box"><FiStar size={13} color={textPrimary} /></div>
                  <span style={{
                    fontFamily: FONT.body, fontSize: 8, fontWeight: 900,
                    letterSpacing: "0.26em", textTransform: "uppercase",
                    color: textFaint, transition: "color 0.3s",
                  }}>Hospitalité FIFA</span>
                </div>
                <h3 className="pr-title" style={{ fontFamily: FONT.display }}>{"L'EXPÉRIENCE\nVIP ULTIME"}</h3>
                <p className="pr-desc" style={{ fontFamily: FONT.body }}>
                  Loges privées, gastronomie étoilée, rencontres avec les légendes du football.
                </p>
                <div className="pr-stats">
                  <Stat num="12" label="Packages VIP" textPrimary={textPrimary} textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="5★" label="Expérience" textPrimary={textPrimary} textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="6"  label="Stades" textPrimary={textPrimary} textMuted={textMuted} />
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="pr-divider" />
                <div className="pr-footer">
                  <span className="pr-cta" style={{ fontFamily: FONT.body }}>Découvrir les packages</span>
                  <div className="pr-arrow">
                    <FiArrowUpRight size={12} color={textPrimary} className="pr-arrow-icon" style={{ transition: "color 0.3s" }} />
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
  const { darkMode } = useTheme();
  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const surface      = darkMode ? "#171717"                  : "#f5f5f5";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const textMuted    = darkMode ? "rgba(255,255,255,0.28)"   : "rgba(0,0,0,0.28)";
  const textFaint    = darkMode ? "rgba(255,255,255,0.22)"   : "rgba(0,0,0,0.22)";
  const hover        = darkMode ? "rgba(255,255,255,0.04)"   : "#fafafa";
  const darkCard     = darkMode ? "#111111"                   : "#0d0d0d";
  const darkText     = darkMode ? "#ffffff"                   : "#ffffff";
  const darkTextSec  = darkMode ? "rgba(255,255,255,0.22)"   : "rgba(255,255,255,0.22)";
  const darkTextMuted= darkMode ? "rgba(255,255,255,0.4)"    : "rgba(255,255,255,0.4)";
  const darkTextDesc = darkMode ? "rgba(255,255,255,0.28)"   : "rgba(255,255,255,0.28)";
  const darkBar      = darkMode ? "rgba(255,255,255,0.15)"   : "rgba(255,255,255,0.15)";
  const cellBar      = darkMode ? "#e0e0e0"                   : "#e0e0e0";

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
          border: 1px solid ${border};
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        @media (max-width: 720px) { .ts-grid { grid-template-columns: 1fr; } }

        .ts-cell {
          padding: clamp(20px,3vw,32px);
          border-right: 1px solid ${border};
          position: relative; overflow: hidden;
          transition: background 0.3s, border-color 0.3s;
        }
        .ts-cell:last-child { border-right: none; background: ${darkCard}; }
        .ts-cell:not(:last-child):hover { background: ${hover}; }

        @media (max-width: 720px) {
          .ts-cell { border-right: none; border-bottom: 1px solid ${border}; }
          .ts-cell:last-child { border-bottom: none; }
        }

        .ts-num {
          font-weight: 900; line-height: 1;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
          transition: color 0.3s;
        }
        .ts-unit {
          font-size: 8px; font-weight: 900; letter-spacing: 0.18em;
          text-transform: uppercase; margin-left: 6px;
          transition: color 0.3s;
        }
        .ts-label {
          display: block; font-size: 8px; font-weight: 900;
          letter-spacing: 0.24em; text-transform: uppercase; margin-bottom: 8px;
          transition: color 0.3s;
        }
        .ts-desc {
          font-size: 12px; line-height: 1.65;
          transition: color 0.3s;
        }
        .ts-bar {
          margin-top: 24px; width: 20px; height: 2px; border-radius: 1px;
          transition: background 0.3s;
        }
      `}</style>

      <section style={{
        background: bg, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <SectionHead eyebrow="Format" title="Structure du Tournoi" icon={FiGrid} />
          <div className="ts-grid">
            {phases.map((p, i) => (
              <div key={i} className="ts-cell">
                <div style={{ display: "flex", alignItems: "baseline", marginBottom: 18 }}>
                  <span className="ts-num" style={{
                    fontFamily: FONT.display,
                    color: p.dark ? darkText : textPrimary,
                  }}>{p.num}</span>
                  <span className="ts-unit" style={{
                    fontFamily: FONT.body,
                    color: p.dark ? darkTextSec : textFaint,
                  }}>{p.unit}</span>
                </div>
                <span className="ts-label" style={{
                  fontFamily: FONT.body,
                  color: p.dark ? darkTextMuted : textSecondary,
                }}>{p.label}</span>
                <p className="ts-desc" style={{
                  fontFamily: FONT.body,
                  color: p.dark ? darkTextDesc : textMuted,
                }}>{p.desc}</p>
                <div className="ts-bar" style={{
                  background: p.dark ? darkBar : cellBar,
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
  const { darkMode } = useTheme();
  const bg              = darkMode ? "#0d0d0d"                  : "#ffffff";
  const cardBg          = darkMode ? "rgba(255,255,255,0.04)"   : "rgba(0,0,0,0.04)";
  const cardBorder      = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary     = darkMode ? "#ffffff"                   : "#0d0d0d";
  const textSecondary   = darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const textMuted       = darkMode ? "rgba(255,255,255,0.28)"   : "rgba(0,0,0,0.28)";
  const textFaint       = darkMode ? "rgba(255,255,255,0.3)"    : "rgba(0,0,0,0.3)";
  const textVFaint      = darkMode ? "rgba(255,255,255,0.16)"   : "rgba(0,0,0,0.16)";
  const accent          = darkMode ? "#ffffff"                   : "#0d0d0d";
  const accentContrast  = darkMode ? "#0d0d0d"                   : "#ffffff";
  const accentHover     = darkMode ? "#e8e8e8"                   : "#333333";
  const borderMed       = darkMode ? "rgba(255,255,255,0.18)"   : "rgba(0,0,0,0.18)";
  const borderBright    = darkMode ? "rgba(255,255,255,0.4)"    : "rgba(0,0,0,0.4)";
  const inputBorder     = darkMode ? "rgba(255,255,255,0.1)"    : "rgba(0,0,0,0.1)";
  const inputBorderFocus= darkMode ? "rgba(255,255,255,0.3)"    : "rgba(0,0,0,0.3)";
  const inputBg         = darkMode ? "rgba(255,255,255,0.05)"   : "rgba(0,0,0,0.05)";
  const inputBgFocus    = darkMode ? "rgba(255,255,255,0.07)"   : "rgba(0,0,0,0.07)";
  const legalColor      = darkMode ? "rgba(255,255,255,0.16)"   : "rgba(0,0,0,0.16)";
  const legalLink       = darkMode ? "rgba(255,255,255,0.3)"    : "rgba(0,0,0,0.3)";
  const hoverBg         = darkMode ? "rgba(255,255,255,0.07)"   : "rgba(0,0,0,0.06)";
  const successGreen    = "#22c55e";

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
        .fz-root { background: ${bg}; padding: clamp(36px,6vw,64px) 0; transition: background 0.3s; }
        .fz-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 clamp(16px,3vw,24px);
          display: grid; grid-template-columns: 1fr 380px;
          gap: clamp(32px,5vw,64px); align-items: center;
        }
        @media (max-width: 860px) { .fz-inner { grid-template-columns: 1fr; gap: 40px; } }

        .fz-headline {
          font-weight: 900; color: ${textPrimary};
          font-size: clamp(2rem,5vw,3.8rem);
          line-height: 0.92; letter-spacing: 0.03em;
          text-transform: uppercase; margin-bottom: 14px;
          transition: color 0.3s;
        }
        .fz-body {
          color: ${textMuted}; font-size: 13px;
          line-height: 1.7; max-width: 360px; margin-bottom: 28px;
          transition: color 0.3s;
        }
        .fz-btns { display: flex; flex-wrap: wrap; gap: 8px; }
        .fz-btn {
          display: flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.06em;
          padding: 11px 22px; border-radius: 100px; text-decoration: none;
          transition: all 0.3s; cursor: pointer; border: none; white-space: nowrap;
        }
        .fz-btn-filled  { background: ${accent}; color: ${accentContrast}; }
        .fz-btn-filled:hover  { background: ${accentHover}; }
        .fz-btn-outline { background: transparent; color: ${textPrimary}; border: 1px solid ${borderMed}; }
        .fz-btn-outline:hover { background: ${hoverBg}; border-color: ${borderBright}; }

        .fz-card {
          background: ${cardBg};
          border: 1px solid ${cardBorder};
          border-radius: 4px; padding: clamp(20px,3vw,28px);
          transition: background 0.3s, border-color 0.3s;
        }
        .fz-card-title {
          font-weight: 800; color: ${textPrimary};
          font-size: clamp(1.2rem,2vw,1.5rem);
          letter-spacing: 0.04em; margin-bottom: 8px;
          transition: color 0.3s;
        }
        .fz-card-body {
          color: ${textMuted}; font-size: 12px;
          line-height: 1.65; margin-bottom: 18px;
          transition: color 0.3s;
        }
        .fz-input-row { display: flex; gap: 8px; }
        .fz-input {
          flex: 1; min-width: 0;
          border-radius: 100px; padding: 11px 18px;
          font-size: 12px; color: ${textPrimary}; outline: none; font-weight: 500;
          transition: border-color 0.3s, background 0.3s, color 0.3s;
        }
        .fz-input::placeholder { color: ${textVFaint}; }
        .fz-submit {
          flex-shrink: 0; background: ${accent}; color: ${accentContrast};
          border: none; border-radius: 100px; padding: 11px 20px; cursor: pointer;
          font-size: 11px; font-weight: 900; letter-spacing: 0.1em;
          transition: background 0.3s, color 0.3s; white-space: nowrap;
        }
        .fz-submit:hover { background: ${accentHover}; }
        .fz-legal { font-size: 9px; color: ${legalColor}; margin-top: 10px; line-height: 1.5; transition: color 0.3s; }
        .fz-legal a { color: ${legalLink}; transition: color 0.3s; }
        .fz-success { display: flex; align-items: center; gap: 8px; padding: 14px 0; }
        .fz-success-dot { width: 8px; height: 8px; border-radius: 50%; background: ${successGreen}; flex-shrink: 0; }
        .fz-success-txt { font-size: 12px; color: ${textSecondary}; font-weight: 600; transition: color 0.3s; }
      `}</style>

      <section className="fz-root">
        <div className="fz-inner">

          {/* Left */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <FiUsers size={12} color={textFaint} />
              <span style={{
                color: textFaint, fontSize: 8, fontWeight: 900, letterSpacing: "0.3em",
                textTransform: "uppercase", fontFamily: FONT.body,
                transition: "color 0.3s",
              }}>
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
              <FiGlobe size={12} color={textFaint} />
              <span style={{
                color: textFaint, fontSize: 8, fontWeight: 900, letterSpacing: "0.3em",
                textTransform: "uppercase", fontFamily: FONT.body,
                transition: "color 0.3s",
              }}>
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
                      border: `1px solid ${focused ? inputBorderFocus : inputBorder}`,
                      background: focused ? inputBgFocus : inputBg,
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
