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
function Stat({ num, label, dark = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: "clamp(1.1rem,2vw,1.5rem)",
        color: dark ? "#0d0d0d" : "white", lineHeight: 1, letterSpacing: "-0.02em",
      }}>{num}</span>
      <span style={{
        fontFamily: FONT.body, fontSize: 8, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)",
      }}>{label}</span>
    </div>
  );
}

// ─── PROMO SECTION ────────────────────────────────────────────
export function PromoSection() {
  return (
    <>
      <style>{`
        .pr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 860px) { .pr-grid { grid-template-columns: 1fr; } }

        .pr-card {
           position: relative; overflow: hidden; border-radius: 12px;
           padding: 40px; display: flex; flex-direction: column; min-height: 320px;
           text-decoration: none; transition: transform 0.3s;
        }
        .pr-card:hover { transform: translateY(-5px); }

        .pr-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%); }

        .pr-title {
          font-weight: 900; color: white; margin: 20px 0 12px; line-height: 1;
          font-size: clamp(2rem, 4vw, 3rem); text-transform: uppercase;
        }
        .pr-desc { color: rgba(255,255,255,0.7); font-size: 15px; max-width: 340px; }

        .pr-footer { margin-top: auto; display: flex; align-items: center; justify-content: space-between; }
        .pr-btn {
           background: white; color: #0d0d0d; padding: 12px 24px; border-radius: 100px;
           font-size: 11px; fontWeight: 800; textTransform: uppercase; letterSpacing: 0.1em;
        }
      `}</style>

      <section style={{ background: "#ffffff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 32px" }}>
          <SectionHead eyebrow="Expériences" title="Billets & Hospitalité" />
          <div className="pr-grid">
            
            {/* Tickets */}
            <a href="/tickets" className="pr-card" style={{ background: "#0d0d0d" }}>
               <div style={{ position: "relative", zIndex: 1 }}>
                 <FiShoppingCart size={24} color="white" />
                 <h3 className="pr-title" style={{ fontFamily: FONT.display }}>Vivez le Match<br/>en Direct</h3>
                 <p className="pr-desc">Réservez vos places pour les 104 matchs de la compétition historique.</p>
               </div>
               <div className="pr-footer" style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", gap: 20 }}>
                    <Stat num="6" label="Pays" />
                    <Stat num="16" label="Stades" />
                  </div>
                  <div className="pr-btn">Réserver</div>
               </div>
            </a>

            {/* VIP */}
            <a href="/hospitality" className="pr-card" style={{ background: "#c8102e" }}>
               <div style={{ position: "relative", zIndex: 1 }}>
                 <FiStar size={24} color="white" />
                 <h3 className="pr-title" style={{ fontFamily: FONT.display }}>L'Expérience<br/>VIP Ultime</h3>
                 <p className="pr-desc">Loges privées et services premium pour une immersion totale.</p>
               </div>
               <div className="pr-footer" style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", gap: 20 }}>
                    <Stat num="5★" label="Service" />
                    <Stat num="12" label="Villes" />
                  </div>
                  <div className="pr-btn">Découvrir</div>
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
  return (
    <section style={{ background: "#f8f8f8", padding: "80px 0", borderTop: "1px solid #eee" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 32px" }}>
        <SectionHead eyebrow="Organisation" title="Structure du Tournoi" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#eee", borderRadius: 12, overflow: "hidden", border: "1px solid #eee" }}>
          {[
            { num: "48",  label: "Équipes",   desc: "Un format élargi pour plus de spectacle." },
            { num: "104", label: "Matchs",    desc: "39 jours de compétition intense." },
            { num: "6",   label: "Nations",   desc: "Une célébration sur trois continents." },
          ].map((p, i) => (
            <div key={i} style={{ background: "white", padding: 40 }}>
              <span style={{ fontFamily: FONT.display, fontSize: 48, fontWeight: 900, color: "#0d0d0d", display: "block", marginBottom: 8 }}>{p.num}</span>
              <span style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "#c8102e" }}>{p.label}</span>
              <p style={{ fontSize: 14, color: "#666", marginTop: 16, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAN ZONE SECTION ─────────────────────────────────────────
export function FanZoneSection() {
  return (
    <section style={{ background: "#ffffff", padding: "100px 0" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FONT.display, fontSize: clamp(48, 62), fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 24 }}>Rejoignez<br/>la Fête</h2>
          <p style={{ fontSize: 18, color: "#666", lineHeight: 1.6, marginBottom: 40 }}>Inscrivez-vous pour recevoir les dernières alertes billets et les infos exclusives sur la Coupe du Monde FIFA 2030™.</p>
          
          <div style={{ display: "flex", gap: 12, maxWidth: 500, margin: "0 auto" }}>
            <input type="email" placeholder="votre@email.com" style={{ flex: 1, padding: "16px 24px", borderRadius: 100, border: "1px solid #ddd", fontSize: 16, outline: "none" }} />
            <button style={{ padding: "16px 32px", borderRadius: 100, background: "#0d0d0d", color: "white", fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer" }}>S'inscrire</button>
          </div>
          <p style={{ fontSize: 12, color: "#999", marginTop: 20 }}>En vous inscrivant, vous acceptez la politique de confidentialité de la FIFA.</p>
        </div>
      </div>
    </section>
  );
}

function clamp(min, max) {
  return `clamp(${min}px, 5vw, ${max}px)`;
}