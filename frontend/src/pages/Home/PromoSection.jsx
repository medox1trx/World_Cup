import { useState } from "react";
import { FiShoppingCart, FiStar, FiArrowRight, FiUsers, FiGlobe, FiGrid, FiArrowUpRight, FiChevronRight, FiMapPin } from "react-icons/fi";
import { Trophy } from "lucide-react";
import { FONT } from "./constants";
import { SectionHead } from "./ui";
import { useTheme } from "../../context/ThemeContext";
import { useFanZones, useMatches } from "../../hooks/useWorldCup";

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
export default function PromoSection() {
  const { darkMode } = useTheme();
  const sectionBg = darkMode ? "#0d0d0d" : "#f0f0f0";
  const cardBg = darkMode ? "#1c1c1c" : "#0d0d0d";
  const textPrimary = "#ffffff";
  const textMuted = darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const textFaint = darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)";
  const eyebrowText = darkMode ? "rgba(255,255,255,0.4)" : "#888888";
  const eyebrowLine = darkMode ? "rgba(255,255,255,0.15)" : "#aaaaaa";
  const sweepLine = "rgba(255,255,255,0.2)";

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
        @media (max-width: 640px) {
          .pr-grid { grid-template-columns: 1fr; gap: 10px; }
        }
        .pr-card {
          position: relative;
          min-height: clamp(180px, 25vw, 300px);
          padding: clamp(16px,2.5vw,32px);
          border-radius: 4px; overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
        }
        .pr-card::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.3);
          pointer-events: none;
          border-radius: 4px;
        }
        @media (max-width: 480px) {
          .pr-card { min-height: 200px; padding: 14px; }
          .pr-title { font-size: clamp(1.2rem, 5vw, 1.8rem) !important; }
          .pr-desc { font-size: 10px !important; max-width: 100% !important; }
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
          width: 34px; height: 34px; border-radius: 4px; flex-shrink: 0;
          background: rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .pr-card:hover .pr-icon-box { background: rgba(255,255,255,0.14); }
        .pr-title {
          font-weight: 900; color: #ffffff;
          font-size: clamp(1.4rem, 2.8vw, 2.2rem);
          line-height: 0.95; letter-spacing: 0.02em;
          white-space: pre-line; margin: 14px 0 8px;
          transition: letter-spacing 0.3s;
        }
        .pr-card:hover .pr-title { letter-spacing: 0.035em; }
        .pr-desc {
          color: rgba(255,255,255,0.35); font-size: clamp(10px,1vw,12px);
          line-height: 1.6; max-width: 280px; margin: 0;
        }
        .pr-stats {
          display: flex; align-items: stretch; gap: 12px;
          margin-top: 16px; padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .pr-stat-divider { width: 1px; background: rgba(255,255,255,0.1); align-self: stretch; }
        .pr-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 16px 0 14px; }
        .pr-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .pr-cta-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: #ffffff; color: #0d0d0d;
          font-family: ${FONT.body}; font-size: 9px; font-weight: 900;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 8px 14px; border-radius: 100px; border: none;
          cursor: pointer; text-decoration: none;
          transition: background 0.25s, transform 0.2s;
        }
        .pr-cta-btn:hover { background: #e8e8e8; transform: translateY(-1px); }
        .pr-cta-btn:active { transform: translateY(0); }
        .pr-cta-btn:hover .arr { transform: translateX(3px); }
        
        /* ── RESET VISITED LINKS ── */
        a, a:visited, a:hover, a:active {
          text-decoration: none !important;
        }
        .pr-card, .pr-card:visited {
          text-decoration: none !important;
        }
        .pr-cta-btn, .pr-cta-btn *, .pr-cta-btn:visited {
          color: #0d0d0d !important;
          text-decoration: none !important;
        }
      `}</style>

      <section style={{
        background: sectionBg, padding: "var(--section-pad-y) 0",
        transition: "background 0.3s",
      }}>
        <div className="layout-container">



          <div className="pr-grid">
            <div className="pr-card" style={{ background: cardBg, transition: "background 0.3s", cursor: "default" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="pr-icon-box"><FiShoppingCart size={18} color="#ffffff" /></div>
                  <span style={{
                    fontFamily: FONT.body, fontSize: 8, fontWeight: 900,
                    letterSpacing: "0.26em", textTransform: "uppercase", color: textFaint,
                  }}>Billets Officiels</span>
                </div>
                <h3 className="pr-title" style={{ fontFamily: FONT.display }}>{"VIVEZ LE MATCH\nEN DIRECT"}</h3>
                <p className="pr-desc" style={{ fontFamily: FONT.body }}>
                  Des places disponibles dans les 3 nations hôtes. Réservez avant rupture de stock.
                </p>
                <div className="pr-stats">
                  <Stat num="3" label="Nations hôtes" textPrimary="#ffffff" textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="104" label="Matchs" textPrimary="#ffffff" textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="48" label="Équipes" textPrimary="#ffffff" textMuted={textMuted} />
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="pr-divider" />
                <div className="pr-footer">
                  <a href="/tickets" className="pr-cta-btn">
                    Acheter maintenant <FiArrowRight size={14} className="arr" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pr-card" style={{ background: cardBg, transition: "background 0.3s", cursor: "default" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="pr-icon-box"><FiStar size={18} color="#ffffff" /></div>
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
                  <Stat num="5★" label="Expérience" textPrimary="#ffffff" textMuted={textMuted} />
                  <div className="pr-stat-divider" />
                  <Stat num="16" label="Stades" textPrimary="#ffffff" textMuted={textMuted} />
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="pr-divider" />
                <div className="pr-footer">
                  <a href="/hospitality" className="pr-cta-btn">
                    Découvrir les packages <FiArrowRight size={14} className="arr" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// ─── TOURNAMENT SECTION — Dynamic, No Flags ───────────────────
// ═══════════════════════════════════════════════════════════════

const PLACEHOLDER_BRACKET = {
  r32_left: [
    { id: "m1", home: "1er Gr. A", away: "3e Gr. C/E/F" },
    { id: "m2", home: "2e Gr. A", away: "2e Gr. B" },
    { id: "m3", home: "1er Gr. B", away: "3e Gr. A/E/F" },
    { id: "m4", home: "1er Gr. C", away: "3e Gr. A/B/F" },
    { id: "m5", home: "1er Gr. D", away: "3e Gr. A/B/C" },
    { id: "m6", home: "2e Gr. C", away: "2e Gr. D" },
    { id: "m7", home: "1er Gr. E", away: "3e Gr. A/B/C/D" },
    { id: "m8", home: "2e Gr. E", away: "2e Gr. F" },
  ],
  r32_right: [
    { id: "m9", home: "1er Gr. F", away: "3e Gr. A/B/C/D/E" },
    { id: "m10", home: "2e Gr. G", away: "2e Gr. H" },
    { id: "m11", home: "1er Gr. G", away: "3e Gr. A/B/C/D/E/F" },
    { id: "m12", home: "2e Gr. I", away: "2e Gr. J" },
    { id: "m13", home: "1er Gr. H", away: "3e Gr. A/B/C/D/E/F/G" },
    { id: "m14", home: "2e Gr. K", away: "2e Gr. L" },
    { id: "m15", home: "1er Gr. I", away: "3e Gr. A/B/C/D/E/F/G/H" },
    { id: "m16", home: "1er Gr. J", away: "3e Gr. A/B/C/D/E/F/G/H/I" },
  ],
  r16_left: [
    { id: "m17", home: "Vain. M1", away: "Vain. M2" },
    { id: "m18", home: "Vain. M3", away: "Vain. M4" },
    { id: "m19", home: "Vain. M5", away: "Vain. M6" },
    { id: "m20", home: "Vain. M7", away: "Vain. M8" },
  ],
  r16_right: [
    { id: "m21", home: "Vain. M9", away: "Vain. M10" },
    { id: "m22", home: "Vain. M11", away: "Vain. M12" },
    { id: "m23", home: "Vain. M13", away: "Vain. M14" },
    { id: "m24", home: "Vain. M15", away: "Vain. M16" },
  ],
  qf_left:  [
    { id: "m25", home: "Vain. M17", away: "Vain. M18" },
    { id: "m26", home: "Vain. M19", away: "Vain. M20" },
  ],
  qf_right: [
    { id: "m27", home: "Vain. M21", away: "Vain. M22" },
    { id: "m28", home: "Vain. M23", away: "Vain. M24" },
  ],
  sf_left:  [{ id: "m29", home: "Vain. QF1", away: "Vain. QF2" }],
  sf_right: [{ id: "m30", home: "Vain. QF3", away: "Vain. QF4" }],
};

function BMatchCard({ match, tbd = false, darkMode, width = 120 }) {
  const surface    = darkMode ? "#141414" : "#ffffff";
  const surfaceHov = darkMode ? "#1e1e1e" : "#f8f8f8";
  const border     = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.10)";
  const borderHov  = darkMode ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.3)";
  const divClr     = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  const textPri    = darkMode ? "#ffffff" : "#000000";
  const textMut    = darkMode ? "#ffffff" : "#000000";

  const Row = ({ name, score, flag }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, padding: "6px 10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
        {flag && <img src={`https://flagcdn.com/w40/${flag.toLowerCase()}.png`} style={{ width: 14, height: 10, borderRadius: 1, objectFit: "cover" }} alt="" />}
        <span style={{
          flex: 1, fontSize: 10, fontWeight: 700, fontFamily: FONT.body,
          color: tbd ? textMut : textPri, fontStyle: tbd ? "italic" : "normal",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{name}</span>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, fontFamily: FONT.body, color: textPri, minWidth: 10, textAlign: "center" }}>
        {score !== null && score !== undefined ? score : "—"}
      </span>
    </div>
  );

  return (
    <div
      style={{
        width, background: surface,
        border: `1px solid ${border}`,
        borderRadius: 4, overflow: "hidden", cursor: "default",
        transition: "all 0.2s ease",
        opacity: tbd ? 0.8 : 1,
      }}
    >
      <Row name={match.home} score={match.homeScore} flag={match.homeFlag} />
      <div style={{ height: 1, background: divClr, margin: "0 8px" }} />
      <Row name={match.away} score={match.awayScore} flag={match.awayFlag} />
    </div>
  );
}

function BConnector({ darkMode, count, step = 0, direction = "right" }) {
  const stroke = darkMode ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.18)";
  const slotH = 72 * Math.pow(2, step); 
  const totalH = slotH * count; 
  const w = 12; 
  const paths = [];
  for (let i = 0; i < count; i += 2) {
    const top = slotH * i + slotH / 2, bottom = slotH * (i + 1) + slotH / 2, mid = (top + bottom) / 2;
    if (direction === "right") {
      paths.push(`M0 ${top} L${w/2} ${top} L${w/2} ${mid}`);
      paths.push(`M0 ${bottom} L${w/2} ${bottom} L${w/2} ${mid} L${w} ${mid}`);
    } else {
      paths.push(`M${w} ${top} L${w/2} ${top} L${w/2} ${mid}`);
      paths.push(`M${w} ${bottom} L${w/2} ${bottom} L${w/2} ${mid} L0 ${mid}`);
    }
  }
  return (
    <svg width={w} height={totalH} viewBox={`0 0 ${w} ${totalH}`} fill="none" style={{ flexShrink: 0, display: "block" }}>
      {paths.map((d, i) => <path key={i} d={d} stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
  );
}

function BLineConn({ darkMode, step = 0 }) {
  const stroke = darkMode ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.18)";
  const h = 72 * Math.pow(2, step);
  return (
    <svg width={8} height={h} viewBox={`0 0 8 ${h}`} fill="none" style={{ flexShrink: 0 }}>
      <line x1="0" y1={h/2} x2="8" y2={h/2} stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

function BRoundCol({ label, matches, tbd, darkMode, align = "left", step = 0 }) {
  const textMut = darkMode ? "#ffffff" : "#000000";
  const slotH = 72 * Math.pow(2, step);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, alignItems: align === "right" ? "flex-end" : "flex-start" }}>
      <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: textMut, fontFamily: FONT.body, marginBottom: 8, whiteSpace: "nowrap", textAlign: align === "right" ? "right" : "left" }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {matches.map((m) => (
          <div key={m.id} style={{ height: slotH, display: "flex", alignItems: "center", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
            <BMatchCard match={m} tbd={m.tbd || tbd} darkMode={darkMode} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BMobileRound({ label, matches, tbd, darkMode }) {
  const border  = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.10)";
  const surface = darkMode ? "#141414" : "#ffffff";
  const divClr  = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  const textPri = darkMode ? "#ffffff" : "#000000";
  const textMut = darkMode ? "#ffffff" : "#000000";
  const eyebrow = darkMode ? "#ffffff" : "#000000";
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: eyebrow, fontFamily: FONT.body, marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {matches.map(m => (
          <div key={m.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden", opacity: tbd ? 0.55 : 1 }}>
            {[ {n:m.home, f:m.homeFlag, s:m.homeScore}, {n:m.away, f:m.awayFlag, s:m.awayScore} ].map((team, i) => (
              <div key={i}>
                {i > 0 && <div style={{ height: 1, background: divClr, margin: "0 10px" }} />}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "7px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    {team.f && <img src={`https://flagcdn.com/w40/${team.f.toLowerCase()}.png`} style={{ width: 16, height: 11, borderRadius: 1 }} alt="" />}
                    <span style={{ fontSize: 11, fontWeight: 600, fontFamily: FONT.body, color: tbd ? textMut : textPri, fontStyle: tbd ? "italic" : "normal" }}>{team.n}</span>
                  </div>
                  <span style={{ fontSize: 11, color: textMut, fontFamily: FONT.body }}>{team.s ?? "—"}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function toCard(m) {
  return { 
    id: m?.id || Math.random(), 
    home: m?.team1?.name || m?.home_team || "TBD", 
    away: m?.team2?.name || m?.away_team || "TBD",
    homeFlag: m?.team1?.flag,
    awayFlag: m?.team2?.flag,
    homeScore: m?.home_score,
    awayScore: m?.away_score,
    status: m?.status || "upcoming"
  };
}

export function TournamentSection({ hideTitle = false }) {
  const { darkMode } = useTheme();
  const bg      = darkMode ? "#0d0d0d" : "#ffffff";
  const textPri = darkMode ? "#ffffff" : "#000000";
  const textMut = darkMode ? "#ffffff" : "#000000";
  const dateBdr = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.10)";

  const { data: r32Data } = useMatches({ stage: "round_of_32", limit: 32 });
  const { data: r16Data } = useMatches({ stage: "round_of_16", limit: 16 });
  const { data: qfData  } = useMatches({ stage: "quarter",     limit: 8 });
  const { data: sfData  } = useMatches({ stage: "semi",        limit: 4 });
  const { data: fData   } = useMatches({ stage: "final",       limit: 1 });

  const finalMatch = fData?.[0] ? toCard(fData[0]) : null;

  const buildSide = (dbArr, ph) => {
    return ph.map((placeholder, idx) => {
      if (dbArr && dbArr[idx]) {
        return toCard(dbArr[idx]);
      }
      return { ...placeholder, tbd: true };
    });
  };

  const R32_L = buildSide(r32Data?.slice(0,8), PLACEHOLDER_BRACKET.r32_left);
  const R32_R = buildSide(r32Data?.slice(8,16),PLACEHOLDER_BRACKET.r32_right);
  const R16_L = buildSide(r16Data?.slice(0,4), PLACEHOLDER_BRACKET.r16_left);
  const R16_R = buildSide(r16Data?.slice(4,8), PLACEHOLDER_BRACKET.r16_right);
  const QF_L  = buildSide(qfData?.slice(0,2),  PLACEHOLDER_BRACKET.qf_left);
  const QF_R  = buildSide(qfData?.slice(2,4),  PLACEHOLDER_BRACKET.qf_right);
  const SF_L  = buildSide(sfData?.slice(0,1),  PLACEHOLDER_BRACKET.sf_left);
  const SF_R  = buildSide(sfData?.slice(1,2),  PLACEHOLDER_BRACKET.sf_right);

  const tbdR32 = !r32Data || r32Data.length === 0;
  const tbdR16 = !r16Data || r16Data.length === 0;
  const tbdQF  = !qfData  || qfData.length  === 0;
  const tbdSF  = !sfData  || sfData.length  === 0;

  return (
    <>
      <style>{`
        .ts-desktop { display: flex; }
        .ts-mobile  { display: none; }
        @media (max-width: 900px) { .ts-desktop { display: none; } .ts-mobile { display: block; } }
        .ts-final {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: ${darkMode ? "#141414" : "#ffffff"}; 
          border: 1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.10)"};
          border-radius: 4px; padding: 20px 8px; text-align: center;
          flex-shrink: 0; width: 80px; transition: transform 0.2s, box-shadow 0.2s;
        }
        .ts-dates { display: flex; flex-wrap: wrap; border: 1px solid ${dateBdr}; border-radius: 4px; overflow: hidden; margin-top: 24px; margin-bottom: 8px; }
        .ts-date-item { flex: 1; min-width: 90px; padding: 12px 16px; border-right: 1px solid ${dateBdr}; transition: background 0.2s; }
        .ts-date-item:last-child { border-right: none; }
        .ts-date-d { font-family: ${FONT.display}; font-size: 13px; font-weight: 900; color: ${textPri}; letter-spacing: 0.02em; }
        .ts-date-e { font-family: ${FONT.body}; font-size: 9px; font-weight: 600; color: ${textMut}; margin-top: 2px; letter-spacing: 0.04em; }
        @media (max-width: 540px) {
          .ts-date-item { min-width: 50%; flex: 0 0 50%; }
          .ts-date-item:nth-child(2n) { border-right: none; }
          .ts-date-item:nth-child(n+3) { border-top: 1px solid ${dateBdr}; }
        }
      `}</style>

      <section style={{ background: bg, padding: "clamp(28px,5vw,48px) 0", transition: "background 0.3s" }}>
        <div className="layout-container">
          {!hideTitle && <SectionHead title="Tableau du Tournoi" />}

          <div className="ts-desktop" style={{ 
            overflowX: "visible", 
            paddingBottom: 24,
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              width: "100%",
              justifyContent: "space-between" 
            }}>
              <BRoundCol label="16es de finale" matches={R32_L} tbd={tbdR32} darkMode={darkMode} align="left" step={0} />
              <BConnector darkMode={darkMode} count={8} step={0} direction="right" />
              <BRoundCol label="Huitièmes"      matches={R16_L} tbd={tbdR16} darkMode={darkMode} align="left" step={1} />
              <BConnector darkMode={darkMode} count={4} step={1} direction="right" />
              <BRoundCol label="Quarts"         matches={QF_L}  tbd={tbdQF}  darkMode={darkMode} align="left" step={2} />
              <BConnector darkMode={darkMode} count={2} step={2} direction="right" />
              <BRoundCol label="Demi-finale"    matches={SF_L}  tbd={tbdSF}  darkMode={darkMode} align="left" step={3} />
              <BLineConn darkMode={darkMode} step={3} />
              <div className="ts-final">
                <img src="/WC26_Logo.avif" alt="WC2026" style={{ width: 42, height: "auto", display: "block", marginBottom: 12 }} />
                {finalMatch ? (
                  <>
                    <div style={{ fontSize: 10, fontWeight: 800, color: textPri, marginBottom: 4 }}>{finalMatch.home} {finalMatch.homeScore}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: textPri, marginBottom: 8 }}>{finalMatch.away} {finalMatch.awayScore}</div>
                  </>
                ) : (
                  <span style={{ fontFamily: FONT.display, fontSize: 11, fontWeight: 900, color: textPri, letterSpacing: "0.14em", textTransform: "uppercase", display: "block", lineHeight: 1 }}>FINALE</span>
                )}
                <span style={{ fontFamily: FONT.body, fontSize: 8, fontWeight: 700, color: textMut, marginTop: 7, letterSpacing: "0.08em", textTransform: "uppercase", display: "block" }}>19 Juillet</span>
                <span style={{ fontFamily: FONT.body, fontSize: 8, fontWeight: 600, color: textMut, marginTop: 2, display: "block" }}>New York / NJ</span>
              </div>
              <BLineConn darkMode={darkMode} step={3} />
              <BRoundCol label="Demi-finale"    matches={SF_R}  tbd={tbdSF}  darkMode={darkMode} align="right" step={3} />
              <BConnector darkMode={darkMode} count={2} step={2} direction="left" />
              <BRoundCol label="Quarts"         matches={QF_R}  tbd={tbdQF}  darkMode={darkMode} align="right" step={2} />
              <BConnector darkMode={darkMode} count={4} step={1} direction="left" />
              <BRoundCol label="Huitièmes"      matches={R16_R} tbd={tbdR16} darkMode={darkMode} align="right" step={1} />
              <BConnector darkMode={darkMode} count={8} step={0} direction="left" />
              <BRoundCol label="16es de finale" matches={R32_R} tbd={tbdR32} darkMode={darkMode} align="right" step={0} />
            </div>
          </div>

          <div className="ts-mobile">
            <BMobileRound label="16es de finale"       matches={[...R32_L,...R32_R]} tbd={tbdR32} darkMode={darkMode} />
            <BMobileRound label="Huitièmes de finale" matches={[...R16_L,...R16_R]} tbd={tbdR16} darkMode={darkMode} />
            <BMobileRound label="Quarts de finale"    matches={[...QF_L,...QF_R]}   tbd={tbdQF}  darkMode={darkMode} />
            <BMobileRound label="Demi-finales"        matches={[...SF_L,...SF_R]}   tbd={tbdSF}  darkMode={darkMode} />
            <div style={{ background: "#0d0d0d", borderRadius: 4, padding: "16px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
              <Trophy size={22} color="#ffffff" />
              <div>
                <div style={{ fontFamily: FONT.display, fontSize: 13, fontWeight: 900, color: "#ffffff", letterSpacing: "0.12em", textTransform: "uppercase" }}>FINALE</div>
                <div style={{ fontFamily: FONT.body, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>19 Juillet 2026 · New York / New Jersey</div>
              </div>
            </div>
          </div>

          <div className="ts-dates">
            {[{d:"28 Juin",e:"16es · J1"},{d:"3 Juil",e:"16es · J2"},{d:"6 Juil",e:"Huitièmes · J1"},{d:"9 Juil",e:"Huitièmes · J2"},{d:"12 Juil",e:"Quarts · J1"},{d:"13 Juil",e:"Quarts · J2"},{d:"17 Juil",e:"Demi-finales"},{d:"19 Juil",e:"Finale · NY/NJ"}].map((item,i) => (
              <div key={i} className="ts-date-item">
                <div className="ts-date-d">{item.d}</div>
                <div className="ts-date-e">{item.e}</div>
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
  const bg = darkMode ? "#0d0d0d" : "#ffffff";
  const cardBg = darkMode ? "rgba(255,255,255,0.04)" : "#f5f5f5";
  const cardBorder = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textMuted = darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const textFaint = darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)";
  const textVFaint = darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)";
  const accent = darkMode ? "#ffffff" : "#0d0d0d";
  const accentContrast = darkMode ? "#0d0d0d" : "#ffffff";
  const accentHover = darkMode ? "#e8e8e8" : "#333333";
  const inputBorder = darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";
  const inputBorderFocus = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";
  const inputBg = darkMode ? "rgba(255,255,255,0.05)" : "#ffffff";
  const legalColor = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)";
  const successGreen = "#ffffff";

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  const ctaButtons = [
    { href: "/tickets", icon: FiShoppingCart, label: "Billets", filled: true },
    { href: "/fans", icon: FiUsers, label: "Fan Zone", filled: false },
    { href: "/hospitality", icon: FiStar, label: "VIP", filled: false },
  ];

  return (
    <>
      <style>{`
        .fz-root { background: ${bg}; padding: var(--section-pad-y) 0; transition: background 0.3s; }
        .fz-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 var(--section-pad-x);
          display: grid; grid-template-columns: 1fr 340px;
          gap: clamp(24px,4vw,48px); align-items: center;
        }
        @media (max-width: 860px) { .fz-inner { grid-template-columns: 1fr; gap: 32px; } }
        .fz-headline {
          font-weight: 900; color: ${textPrimary};
          font-size: clamp(1.6rem,4vw,3.2rem);
          line-height: 0.92; letter-spacing: 0.03em;
          text-transform: uppercase; margin-bottom: 12px;
          transition: color 0.3s;
        }
        .fz-body {
          color: ${textMuted}; font-size: 12px;
          line-height: 1.6; max-width: 320px; margin-bottom: 20px;
          transition: color 0.3s;
        }
        .fz-btns { display: flex; flex-wrap: wrap; gap: 8px; }
        .fz-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.05em;
          padding: 10px 18px; border-radius: 100px; text-decoration: none;
          transition: background 0.25s, transform 0.2s; cursor: pointer; border: none;
          white-space: nowrap;
        }
        .fz-btn:hover { transform: translateY(-1px); }
        .fz-btn:active { transform: translateY(0); }
        .fz-btn-filled { background: ${accent}; color: ${accentContrast} !important; }
        .fz-btn-filled *, .fz-btn-filled { color: ${accentContrast} !important; }
        .fz-btn-filled:hover { background: ${accentHover}; }
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
          border-radius: 4px; padding: clamp(18px,2.6vw,24px);
          transition: background 0.3s, border-color 0.3s;
        }
        .fz-card-title {
          font-weight: 800; color: ${textPrimary};
          font-size: clamp(1rem,1.6vw,1.2rem);
          letter-spacing: 0.04em; margin-bottom: 5px;
          transition: color 0.3s;
        }
        .fz-card-body {
          color: ${textMuted}; font-size: 11px;
          line-height: 1.6; margin-bottom: 14px;
          transition: color 0.3s;
        }
        .fz-input-row { display: flex; gap: 6px; }
        @media (max-width: 480px) {
          .fz-input-row { flex-direction: column; }
          .fz-submit { width: 100%; justify-content: center; }
        }
        .fz-input {
          flex: 1; min-width: 0;
          border-radius: 100px; padding: 10px 14px;
          font-size: 12px; color: ${textPrimary}; outline: none; font-weight: 500;
          transition: border-color 0.3s, background 0.3s, color 0.3s;
        }
        .fz-input::placeholder { color: ${textVFaint}; }
        .fz-submit {
          flex-shrink: 0; background: ${accent}; color: ${accentContrast};
          border: none; border-radius: 100px; padding: 10px 16px; cursor: pointer;
          font-size: 10px; font-weight: 900; letter-spacing: 0.1em;
          transition: background 0.25s, transform 0.2s; white-space: nowrap;
        }
        .fz-submit:hover { background: ${accentHover}; transform: translateY(-1px); }
        .fz-submit:active { transform: translateY(0); }
        .fz-legal { font-size: 8px; color: ${legalColor}; margin-top: 8px; line-height: 1.5; transition: color 0.3s; }
        .fz-success { display: flex; align-items: center; gap: 6px; padding: 12px 0; }
        .fz-success-dot { width: 7px; height: 7px; border-radius: 50%; background: ${successGreen}; flex-shrink: 0; }
        .fz-success-txt { font-size: 11px; color: ${successGreen}; font-weight: 600; }
        
        /* ── RESET VISITED LINKS ── */
        a, a:visited {
          text-decoration: none !important;
        }
      `}</style>

      <section className="fz-root">
        <div className="fz-inner layout-container">
          <div>

            <h2 className="fz-headline" style={{ fontFamily: FONT.display }}>
              FAITES PARTIE<br />DE L'HISTOIRE
            </h2>
            <p className="fz-body" style={{ fontFamily: FONT.body }}>
              Concerts, écrans géants, FIFA Gaming, trophy experience — accès gratuit dans les 16 Fan Zones officielles.
            </p>
            <div className="fz-btns">
              {ctaButtons.map(({ href, icon: Icon, label, filled }) => (
                <a
                  key={label} href={href}
                  className={`fz-btn ${filled ? "fz-btn-filled" : "fz-btn-secondary"}`}
                  style={{ fontFamily: FONT.body }}
                >
                  <Icon size={16} /> {label}
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
              Scores live, tirages au sort, news exclusives FIFA 2026.
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
