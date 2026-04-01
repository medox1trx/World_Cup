import { useState } from "react";
import { FiShoppingCart, FiStar, FiArrowRight, FiUsers, FiGlobe, FiGrid, FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import { FONT } from "./constants";
import { SectionHead } from "./ui";
import { useTheme } from "../../context/ThemeContext";

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

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
  const sectionBg   = darkMode ? "#0d0d0d" : "#f0f0f0";
  const cardBg      = darkMode ? "#1c1c1c" : "#0d0d0d";
  const textPrimary = "#ffffff";
  const textMuted   = "rgba(255,255,255,0.28)";
  const textFaint   = "rgba(255,255,255,0.35)";
  const eyebrowText = darkMode ? "rgba(255,255,255,0.4)" : "#888888";
  const eyebrowLine = darkMode ? "rgba(255,255,255,0.15)" : "#aaaaaa";
  const divider     = "rgba(255,255,255,0.08)";
  const statDiv     = "rgba(255,255,255,0.1)";
  const sweepLine   = "rgba(255,255,255,0.2)";

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
          cursor: pointer;
        }
        .pr-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          height: 1px; width: 0%;
          background: ${sweepLine};
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .pr-card:hover::before { width: 100%; }
        .pr-card::after {
          content: ''; position: absolute; bottom: 0; right: 0;
          height: 1px; width: 0%;
          background: ${sweepLine};
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
          font-weight: 900; color: #ffffff;
          font-size: clamp(1.7rem, 3.2vw, 2.6rem);
          line-height: 0.95; letter-spacing: 0.02em;
          white-space: pre-line; margin: 18px 0 10px;
          transition: letter-spacing 0.3s;
        }
        .pr-card:hover .pr-title { letter-spacing: 0.035em; }

        .pr-desc {
          color: rgba(255,255,255,0.35); font-size: clamp(11px,1.1vw,13px);
          line-height: 1.7; max-width: 300px; margin: 0;
        }

        .pr-stats {
          display: flex; align-items: stretch; gap: 16px;
          margin-top: 20px; padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .pr-stat-divider {
          width: 1px; background: rgba(255,255,255,0.1); align-self: stretch;
        }
        .pr-divider {
          height: 1px; background: rgba(255,255,255,0.08); margin: 22px 0 18px;
        }
        .pr-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

        /* ── CTA button — always filled, never ghost ── */
        .pr-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #ffffff; color: #0d0d0d;
          font-family: ${FONT.body}; font-size: 10px; font-weight: 900;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 9px 18px; border-radius: 100px; border: none;
          cursor: pointer; text-decoration: none;
          transition: background 0.25s, transform 0.2s;
        }
        .pr-cta-btn:hover { background: #e8e8e8; transform: translateY(-1px); }
        .pr-cta-btn:active { transform: translateY(0); }
        .pr-cta-btn .arr { transition: transform 0.2s; }
        .pr-cta-btn:hover .arr { transform: translateX(3px); }
      `}</style>

      <section style={{
        background: sectionBg, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 22, height: 1, background: eyebrowLine, transition: "background 0.3s" }} />
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
                  <div className="pr-icon-box"><FiShoppingCart size={13} color="#ffffff" /></div>
                  <span style={{
                    fontFamily: FONT.body, fontSize: 8, fontWeight: 900,
                    letterSpacing: "0.26em", textTransform: "uppercase", color: textFaint,
                  }}>Billets Officiels</span>
                </div>
                <h3 className="pr-title" style={{ fontFamily: FONT.display }}>{"VIVEZ LE MATCH\nEN DIRECT"}</h3>
                <p className="pr-desc" style={{ fontFamily: FONT.body }}>
                  Des places disponibles dans les 6 nations hôtes. Réservez avant rupture de stock.
                </p>
                <div className="pr-stats">
                  <Stat num="6"   label="Nations hôtes" textPrimary="#ffffff" textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="104" label="Matchs"        textPrimary="#ffffff" textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="48"  label="Équipes"       textPrimary="#ffffff" textMuted={textMuted} />
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="pr-divider" />
                <div className="pr-footer">
                  <a href="/tickets" className="pr-cta-btn">
                    Acheter maintenant <FiArrowRight size={11} className="arr" />
                  </a>
                </div>
              </div>
            </a>

            {/* ── Card B — VIP ── */}
            <a href="/hospitality" className="pr-card" style={{ background: cardBg, transition: "background 0.3s" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="pr-icon-box"><FiStar size={13} color="#ffffff" /></div>
                  <span style={{
                    fontFamily: FONT.body, fontSize: 8, fontWeight: 900,
                    letterSpacing: "0.26em", textTransform: "uppercase", color: textFaint,
                  }}>Hospitalité FIFA</span>
                </div>
                <h3 className="pr-title" style={{ fontFamily: FONT.display }}>{"L'EXPÉRIENCE\nVIP ULTIME"}</h3>
                <p className="pr-desc" style={{ fontFamily: FONT.body }}>
                  Loges privées, gastronomie étoilée, rencontres avec les légendes du football.
                </p>
                <div className="pr-stats">
                  <Stat num="12" label="Packages VIP" textPrimary="#ffffff" textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="5★" label="Expérience"   textPrimary="#ffffff" textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="6"  label="Stades"        textPrimary="#ffffff" textMuted={textMuted} />
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="pr-divider" />
                <div className="pr-footer">
                  <a href="/hospitality" className="pr-cta-btn">
                    Découvrir les packages <FiArrowRight size={11} className="arr" />
                  </a>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>
    </>
  );
}

// ─── TOURNAMENT SECTION — Visual Flow Diagram ─────────────────
export function TournamentSection() {
  const { darkMode } = useTheme();
  const bg           = darkMode ? "#0d0d0d" : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const borderStrong = darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)";
  const textPrimary  = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.5)"  : "rgba(0,0,0,0.5)";
  const textMuted    = darkMode ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.32)";
  const surface      = darkMode ? "#1a1a1a" : "#f7f7f7";
  const surfaceHover = darkMode ? "#222222" : "#f0f0f0";
  const darkCard     = "#0d0d0d";
  const connectorColor = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const accentLine   = darkMode ? "rgba(255,255,255,0.6)"  : "rgba(0,0,0,0.5)";

  const stages = [
    {
      phase: "01",
      label: "Phase de Groupes",
      teams: "48",
      matches: "96",
      detail: "16 groupes · 3 équipes",
      rule: "Les 2 premiers + 8 meilleurs 3es qualifiés",
      icon: "⬡",
      dark: false,
    },
    {
      phase: "02",
      label: "Phase Éliminatoire",
      teams: "32",
      matches: "8",
      detail: "8es · Quarts · Demies",
      rule: "Élimination directe — une défaite et c'est fini",
      icon: "◆",
      dark: false,
    },
    {
      phase: "03",
      label: "La Finale",
      teams: "2",
      matches: "1",
      detail: "19 juillet 2030 · Rabat",
      rule: "Stade Hassan II · 115 000 spectateurs",
      icon: "★",
      dark: true,
    },
  ];

  return (
    <>
      <style>{`
        .ts-wrap {
          display: grid;
          grid-template-columns: 1fr 28px 1fr 28px 1fr;
          align-items: stretch;
          gap: 0;
        }
        @media (max-width: 720px) {
          .ts-wrap {
            grid-template-columns: 1fr;
            gap: 2px;
          }
          .ts-connector { display: none; }
        }

        .ts-card {
          border: 1px solid ${border};
          border-radius: 4px;
          padding: clamp(20px,2.8vw,32px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, background 0.25s;
          cursor: default;
        }
        .ts-card:not(.ts-card--dark):hover {
          border-color: ${borderStrong};
          background: ${surfaceHover};
        }
        .ts-card--dark {
          background: ${darkCard};
          border-color: transparent;
        }
        .ts-card--dark:hover { opacity: 0.95; }

        .ts-card--light { background: ${surface}; }

        /* accent top-left corner line */
        .ts-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 0; height: 2px;
          background: ${accentLine};
          transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .ts-card:hover::before { width: 100%; }
        .ts-card--dark::before { width: 100%; background: rgba(255,255,255,0.15); }

        .ts-connector {
          display: flex; align-items: center; justify-content: center;
        }
        .ts-connector svg { overflow: visible; }

        .ts-phase-num {
          font-family: ${FONT.display};
          font-size: 10px; font-weight: 900;
          letter-spacing: 0.3em; text-transform: uppercase;
          margin-bottom: 16px;
        }

        .ts-big-num {
          font-family: ${FONT.display};
          font-weight: 900;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          line-height: 1;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          transition: color 0.25s;
        }

        .ts-unit {
          font-family: ${FONT.body};
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          margin-left: 6px; vertical-align: middle;
        }

        .ts-label {
          font-family: ${FONT.body};
          font-size: 11px; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase;
          margin: 14px 0 4px;
          transition: color 0.25s;
        }

        .ts-detail {
          font-family: ${FONT.body};
          font-size: 11px; line-height: 1.65;
          transition: color 0.25s;
          margin: 0;
        }

        .ts-rule {
          margin-top: 12px; padding-top: 12px;
          border-top: 1px solid ${border};
          font-family: ${FONT.body}; font-size: 10px;
          line-height: 1.6; transition: color 0.25s, border-color 0.25s;
        }
        .ts-card--dark .ts-rule { border-top-color: rgba(255,255,255,0.08); }

        .ts-matches-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 10px; border-radius: 100px;
          font-family: ${FONT.body}; font-size: 9px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-top: 10px;
        }
        .ts-matches-badge--light {
          background: ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"};
          color: ${textMuted};
        }
        .ts-matches-badge--dark {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.4);
        }
      `}</style>

      <section style={{
        background: bg, padding: "clamp(28px,5vw,48px) 0",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,24px)" }}>
          <SectionHead eyebrow="Format" title="Structure du Tournoi" href="/format" />

          <div className="ts-wrap">
            {stages.map((s, i) => (
              <>
                <div
                  key={`card-${i}`}
                  className={`ts-card ${s.dark ? "ts-card--dark" : "ts-card--light"}`}
                >
                  {/* Phase badge */}
                  <span className="ts-phase-num" style={{
                    color: s.dark ? "rgba(255,255,255,0.2)" : textMuted,
                  }}>
                    Phase {s.phase}
                  </span>

                  {/* Big number */}
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <span className="ts-big-num" style={{
                      color: s.dark ? "#ffffff" : textPrimary,
                    }}>{s.teams}</span>
                    <span className="ts-unit" style={{
                      color: s.dark ? "rgba(255,255,255,0.25)" : textMuted,
                    }}>
                      {s.teams === "1" || s.teams === "2" ? (s.teams === "2" ? "finalistes" : "champion") : "équipes"}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="ts-label" style={{
                    color: s.dark ? "#ffffff" : textPrimary,
                  }}>{s.label}</p>

                  {/* Detail */}
                  <p className="ts-detail" style={{
                    color: s.dark ? "rgba(255,255,255,0.35)" : textSecondary,
                  }}>{s.detail}</p>

                  {/* Matches badge */}
                  <div className={`ts-matches-badge ts-matches-badge--${s.dark ? "dark" : "light"}`}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: s.dark ? "rgba(255,255,255,0.35)" : (darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"),
                      flexShrink: 0,
                    }} />
                    {s.matches} match{parseInt(s.matches) > 1 ? "s" : ""}
                  </div>

                  {/* Rule */}
                  <p className="ts-rule" style={{
                    color: s.dark ? "rgba(255,255,255,0.3)" : textMuted,
                  }}>{s.rule}</p>
                </div>

                {/* Connector arrow between cards */}
                {i < stages.length - 1 && (
                  <div key={`conn-${i}`} className="ts-connector">
                    <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
                      <path
                        d="M4 20 L20 20 M14 14 L20 20 L14 26"
                        stroke={connectorColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-start" }}>
            <a href="/format" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: textPrimary, color: bg === "#ffffff" ? "#ffffff" : (darkMode ? "#0d0d0d" : "#ffffff"),
              fontFamily: FONT.body, fontSize: 10, fontWeight: 900,
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "10px 20px", borderRadius: 100, textDecoration: "none",
              transition: "background 0.25s, transform 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseOut={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Explorer le format <FiArrowRight size={11} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── FAN ZONE SECTION ─────────────────────────────────────────
export function FanZoneSection() {
  const { darkMode } = useTheme();
  const bg              = darkMode ? "#0d0d0d" : "#ffffff";
  const cardBg          = darkMode ? "rgba(255,255,255,0.04)" : "#f5f5f5";
  const cardBorder      = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const textPrimary     = darkMode ? "#ffffff" : "#0d0d0d";
  const textMuted       = darkMode ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.4)";
  const textFaint       = darkMode ? "rgba(255,255,255,0.3)"  : "rgba(0,0,0,0.3)";
  const textVFaint      = darkMode ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.2)";
  const accent          = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast  = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover     = darkMode ? "#e8e8e8" : "#333333";
  const inputBorder     = darkMode ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.12)";
  const inputBorderFocus= darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)";
  const inputBg         = darkMode ? "rgba(255,255,255,0.05)" : "#ffffff";
  const legalColor      = darkMode ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.3)";
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

        /* All buttons fully filled — no ghost/empty */
        .fz-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.06em;
          padding: 11px 22px; border-radius: 100px; text-decoration: none;
          transition: background 0.25s, transform 0.2s; cursor: pointer; border: none;
          white-space: nowrap;
        }
        .fz-btn:hover { transform: translateY(-1px); }
        .fz-btn:active { transform: translateY(0); }

        /* Primary */
        .fz-btn-filled {
          background: ${accent}; color: ${accentContrast};
        }
        .fz-btn-filled:hover { background: ${accentHover}; }

        /* Secondary — still filled, just lighter */
        .fz-btn-secondary {
          background: ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"};
          color: ${textPrimary};
        }
        .fz-btn-secondary:hover {
          background: ${darkMode ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.12)"};
        }

        .fz-card {
          background: ${cardBg};
          border: 1px solid ${cardBorder};
          border-radius: 4px; padding: clamp(20px,3vw,28px);
          transition: background 0.3s, border-color 0.3s;
        }
        .fz-card-title {
          font-weight: 800; color: ${textPrimary};
          font-size: clamp(1.1rem,1.8vw,1.4rem);
          letter-spacing: 0.04em; margin-bottom: 6px;
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

        /* Submit always filled */
        .fz-submit {
          flex-shrink: 0; background: ${accent}; color: ${accentContrast};
          border: none; border-radius: 100px; padding: 11px 20px; cursor: pointer;
          font-size: 11px; font-weight: 900; letter-spacing: 0.1em;
          transition: background 0.25s, transform 0.2s; white-space: nowrap;
        }
        .fz-submit:hover { background: ${accentHover}; transform: translateY(-1px); }
        .fz-submit:active { transform: translateY(0); }

        .fz-legal { font-size: 9px; color: ${legalColor}; margin-top: 10px; line-height: 1.5; transition: color 0.3s; }
        .fz-success { display: flex; align-items: center; gap: 8px; padding: 14px 0; }
        .fz-success-dot { width: 8px; height: 8px; border-radius: 50%; background: ${successGreen}; flex-shrink: 0; }
        .fz-success-txt { font-size: 12px; color: ${successGreen}; font-weight: 600; }
      `}</style>

      <section className="fz-root">
        <div className="fz-inner">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <FiUsers size={12} color={textFaint} />
              <span style={{
                color: textFaint, fontSize: 8, fontWeight: 900, letterSpacing: "0.3em",
                textTransform: "uppercase", fontFamily: FONT.body,
                transition: "color 0.3s",
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
                <a
                  key={label} href={href}
                  className={`fz-btn ${filled ? "fz-btn-filled" : "fz-btn-secondary"}`}
                  style={{ fontFamily: FONT.body }}
                >
                  <Icon size={12} /> {label}
                </a>
              ))}
            </div>
          </div>

          <div className="fz-card">
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
              <FiGlobe size={12} color={textFaint} />
              <span style={{
                color: textFaint, fontSize: 8, fontWeight: 900, letterSpacing: "0.3em",
                textTransform: "uppercase", fontFamily: FONT.body,
              }}>Newsletter FIFA</span>
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
                      background: inputBg,
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
                  En vous inscrivant vous acceptez les <a href="#" style={{ color: legalColor }}>conditions FIFA</a>.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}