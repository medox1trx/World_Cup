<<<<<<< HEAD
import { useTranslation } from "react-i18next";
function Home(){
  const { t } = useTranslation();
  return(
     <h2>{t("homeWorldCup")}</h2>
  );
}

export default Home;
=======
import { useState, useEffect } from "react";
import {
  FiCheck, FiShield, FiGlobe, FiPhone,
  FiStar, FiArrowRight, FiChevronDown,
} from "react-icons/fi";

// ─── Mixkit CDN video (no CORS) ───────────────────────────────
const HERO_VIDEO = "https://assets.mixkit.co/videos/17398/17398-720.mp4";

// ─── Unsplash CDN photos (open CORS, always load) ─────────────
const IMG = {
  hero:      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=85&fit=crop",
  dining:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80&fit=crop",
  lounge:    "https://traces-berberes.com/wp-content/uploads/2024/09/Best-5-places-to-visit-when-you-come-to-Morocco-1200x540.png",
  suite:     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80&fit=crop",
  champagne: "https://next.io/wp-content/uploads/2023/12/iGaming-Idol.jpg",
  gourmet:   "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&fit=crop",
  jet:       "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80&fit=crop",
  champagne2: "https://tse1.mm.bing.net/th/id/OIP.O5SXQOJX1-1OdEU8zfSdFAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
};

const FONT_D = "'Barlow Condensed', sans-serif";
const FONT_B = "'Barlow', sans-serif";

// ─── Data ──────────────────────────────────────────────────────
const PACKAGES = [
  {
    tier: "Premium",
    price: "2 500 €",
    badge: null,
    featured: false,
    perks: [
      "Siège catégorie Premium en tribune",
      "Accès salon hospitalité FIFA",
      "Repas gastronomique 3 services",
      "Programme de match officiel",
      "Cadeau de bienvenue FIFA",
      "Service voiturier",
    ],
    cta: "Réserver",
    img: IMG.lounge,
  },
  {
    tier: "Business",
    price: "5 000 €",
    badge: "Le plus populaire",
    featured: true,
    perks: [
      "Siège catégorie Business en tribune centrale",
      "Salon privatif avec vue terrain",
      "Menu dégustation & bar premium",
      "Conférencier invité FIFA",
      "Kit media & accréditation presse",
      "Transfert aller-retour luxe",
      "Accès vestiaires après match",
    ],
    cta: "Réserver",
    img: IMG.suite,
  },
  {
    tier: "Prestige",
    price: "Sur devis",
    badge: "Exclusif",
    featured: false,
    perks: [
      "Loge privée avec terrasse terrain",
      "Chef privé & sommelier personnel",
      "Rencontre avec une légende FIFA",
      "Accès pitch walk officiel",
      "Suite hôtel 5★ incluse",
      "Jet privé depuis votre ville",
      "Itinéraire 100% personnalisé",
    ],
    cta: "Contacter notre équipe",
    img: IMG.jet,
  },
];

const EXPERIENCES = [
  { num: "01", title: "Accueil Personnalisé",   desc: "Un agent FIFA dédié vous accompagne du début à la fin. Zéro attente, priorité absolue.",              img: IMG.champagne2 },
  { num: "02", title: "Gastronomie d'Exception", desc: "Chefs étoilés inspirés par les 6 nations hôtes. Menus créés spécialement pour la Coupe du Monde.",   img: IMG.gourmet   },
  { num: "03", title: "Rencontres Légendaires",  desc: "Discussions exclusives avec les légendes du football. Séances dédicaces en cadre premium.",            img: IMG.suite     },
  { num: "04", title: "Les Meilleures Places",   desc: "Sièges optimaux en tribune centrale, vues dégagées, confort maximal. Positions garanties.",            img: IMG.lounge    },
];

const TESTIMONIALS = [
  { name: "Thomas Heugel",  role: "PDG, Heugel Finance",           city: "Paris",    text: "Une expérience irréelle. Le package Business dépasse tout ce que j'avais imaginé. Le repas, la loge, l'accès terrain… parfait de A à Z."                       },
  { name: "Ana Ferreira",   role: "Directrice Marketing, NovaTech", city: "Lisbonne", text: "Nous avons emmené 12 clients. Tout était fluide, élégant, mémorable. FIFA Hospitality, c'est le meilleur investissement client possible."                     },
  { name: "James Okafor",   role: "Partner, Okafor & Associates",   city: "Lagos",    text: "La rencontre avec la légende était incroyable. Nos associés en parlent encore. On réserve déjà pour la finale."                                                 },
];

const FAQ_ITEMS = [
  { q: "Les packages incluent-ils les billets de match ?",        a: "Oui, tous nos packages incluent des billets de match officiels de la catégorie correspondante, en plus de l'ensemble des services mentionnés."                                                        },
  { q: "Combien de matchs puis-je sélectionner ?",                a: "Selon le package, vous pouvez sélectionner de 1 à 7 matchs. Le package Prestige permet de personnaliser entièrement votre calendrier, y compris la finale."                                             },
  { q: "Les packages sont-ils disponibles pour des groupes ?",    a: "Absolument. Nous proposons des offres corporate pour les groupes de 2 à 500 personnes. Contactez notre équipe dédiée B2B pour un devis personnalisé."                                                   },
  { q: "Quelle est la politique d'annulation ?",                  a: "Annulation gratuite jusqu'à 60 jours avant l'événement. Entre 60 et 30 jours, remboursement à 50 %. Après 30 jours, les packages sont non-remboursables."                                               },
];

// ─── FAQ Item ─────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 16,
        padding: "20px 0", background: "none", border: "none",
        cursor: "pointer", textAlign: "left",
      }}>
        <span style={{ color: "white", fontFamily: FONT_B, fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, color: "white", fontSize: 18, lineHeight: 1,
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform 0.22s ease",
        }}>+</span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 160 : 0, transition: "max-height 0.28s ease" }}>
        <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: FONT_B, fontSize: 14, lineHeight: 1.75, paddingBottom: 20 }}>{a}</p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────
export default function Hospitality() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); return () => clearTimeout(t); }, []);

  return (
    <div style={{ fontFamily: FONT_B, background: "#0d0d0d", color: "white", opacity: mounted ? 1 : 0, transition: "opacity 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes bgz  { from{transform:scale(1);}    to{transform:scale(1.06);}    }
        @keyframes shim { from{left:-80%;}             to{left:130%;}                }

        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3vw,48px); }

        /* ── Photo card ── */
        .photo-card { position:relative; overflow:hidden; border-radius:8px; }
        .photo-card img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease; display:block; }
        .photo-card:hover img { transform:scale(1.05); }

        /* ── Package card ── */
        .pkg { border-radius:10px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.22s ease, box-shadow 0.22s ease; }
        .pkg:hover { transform:translateY(-5px); }

        /* ── Shimmer btn ── */
        .btn-shim { position:relative; overflow:hidden; }
        .btn-shim .sh { position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); pointer-events:none; }
        .btn-shim:hover .sh { animation:shim 0.5s ease forwards; }

        /* ── Grids ── */
        .g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .g4 { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .g2c{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .gfq{ display:grid; grid-template-columns:360px 1fr; gap:clamp(40px,6vw,80px); align-items:start; }

        @media(max-width:960px){
          .g3{grid-template-columns:1fr 1fr;}
          .g4{grid-template-columns:1fr 1fr;}
          .gfq{grid-template-columns:1fr;}
        }
        @media(max-width:640px){
          .g3{grid-template-columns:1fr;}
          .g4{grid-template-columns:1fr;}
          .g2c{grid-template-columns:1fr;}
          .gfq{grid-template-columns:1fr;}
          .photo-band{display:none!important;}
        }
      `}</style>

      {/* ═══════════════════════════════════════
          HERO — video bg, dark, full viewport
      ═══════════════════════════════════════ */}
      <section style={{
        position: "relative", background: "#0d0d0d",
        minHeight: "90vh", overflow: "hidden",
        display: "flex", alignItems: "flex-end",
      }}>
        {/* Video */}
        <video autoPlay muted playsInline loop
          onError={e => e.currentTarget.style.display = "none"}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.3,
            animation: "bgz 22s ease-in-out infinite alternate",
          }}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Fallback: hero photo if video fails */}
        <img src={IMG.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.25, zIndex: 0,
        }} />

        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.8) 40%, rgba(13,13,13,0.3) 75%, rgba(13,13,13,0.55) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.5) 55%, transparent 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "32px 32px", zIndex: 1 }} />

        {/* Content */}
        <div className="hw" style={{ position: "relative", zIndex: 2, width: "100%", padding: "clamp(72px,10vh,120px) clamp(16px,3vw,48px) clamp(72px,9vh,96px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
            <div style={{ height: 1, width: 36, background: "rgba(255,255,255,0.28)", flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.38)", fontFamily: FONT_B, fontSize: 10, fontWeight: 800, letterSpacing: "0.42em", textTransform: "uppercase" }}>FIFA Hospitality™</span>
          </div>

          <div style={{ marginBottom: 24 }}>
            {[["L'EXCELLENCE", false], ["AU SOMMET", true], ["DU SPORT.", false]].map(([w, stroke]) => (
              <h1 key={w} style={{
                fontFamily: FONT_D,
                fontSize: "clamp(52px,8.5vw,120px)",
                fontWeight: 900, lineHeight: 0.86,
                textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0,
                color: stroke ? "transparent" : "white",
                WebkitTextStroke: stroke ? "1.5px rgba(255,255,255,0.6)" : "none",
              }}>{w}</h1>
            ))}
          </div>

          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: FONT_B, fontSize: 15, fontWeight: 400, lineHeight: 1.8, marginBottom: 36, maxWidth: 400 }}>
            Des expériences d'hospitalité officielles FIFA pensées pour l'excellence — pour particuliers, entreprises et groupes d'exception.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44 }}>
            <a href="#packages" className="btn-shim" style={{
              position: "relative", display: "inline-flex", alignItems: "center", gap: 9,
              background: "white", color: "#0d0d0d",
              fontFamily: FONT_B, fontSize: 13, fontWeight: 800, letterSpacing: "0.05em",
              padding: "14px 28px", borderRadius: 100, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)", transition: "transform 0.2s",
            }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "none"}>
              <span className="sh" />
              Voir les packages <FiArrowRight size={14} />
            </a>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "transparent", color: "white",
              fontFamily: FONT_B, fontSize: 13, fontWeight: 600,
              padding: "13px 28px", borderRadius: 100, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.25)", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.65)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.background = "transparent"; }}>
              Demande corporate
            </a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[[FiShield,"Officiel FIFA"],[FiStar,"5★ Garanti"],[FiPhone,"Support 24/7"],[FiGlobe,"6 Nations hôtes"]].map(([Icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.3)" }}>
                <Icon size={12} /><span style={{ fontFamily: FONT_B, fontSize: 11, fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PHOTO BAND — 3 real hospitality photos
      ═══════════════════════════════════════ */}
      <div className="photo-band" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: 260 }}>
        {[[IMG.dining, "Fine Dining"], [IMG.suite, "Loges VIP"], [IMG.champagne, "Expérience Premium"]].map(([src, label], i) => (
          <div key={i} className="photo-card" style={{ borderRadius: 0, height: 260, borderRight: i < 2 ? "2px solid #0d0d0d" : "none" }}>
            <img src={src} alt={label} style={{ height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT_D, fontSize: 15, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          EXPERIENCE — 4 tiles with photos
      ═══════════════════════════════════════ */}
      <section style={{ background: "#111", padding: "clamp(64px,8vh,96px) 0" }}>
        <div className="hw">
          {/* Section header */}
          <div style={{ marginBottom: 48, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ display: "block", fontSize: 9, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8, fontFamily: FONT_B }}>Votre séjour</span>
            <h2 style={{ fontFamily: FONT_D, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "0.04em", color: "white", lineHeight: 1 }}>Une Expérience Sans Égale</h2>
          </div>

          <div className="g4" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
            {EXPERIENCES.map((exp, i) => (
              <div key={i} style={{
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                display: "flex", flexDirection: "column",
              }}>
                {/* Photo */}
                <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                  <img src={exp.img} alt={exp.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,17,17,0.9) 0%, transparent 60%)" }} />
                  <span style={{
                    position: "absolute", bottom: 14, left: 20,
                    fontFamily: FONT_D, fontSize: "clamp(2.5rem,4vw,3.5rem)",
                    fontWeight: 900, color: "rgba(255,255,255,0.12)", lineHeight: 1,
                  }}>{exp.num}</span>
                </div>
                {/* Text */}
                <div style={{ padding: "clamp(16px,2vw,24px)", flex: 1 }}>
                  <h3 style={{ fontFamily: FONT_D, fontSize: 16, fontWeight: 800, color: "white", marginBottom: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>{exp.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, lineHeight: 1.7, fontFamily: FONT_B }}>{exp.desc}</p>
                  <div style={{ marginTop: 20, width: 24, height: 2, background: "white", opacity: 0.3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PACKAGES
      ═══════════════════════════════════════ */}
      <section id="packages" style={{ background: "#0d0d0d", padding: "clamp(64px,8vh,96px) 0" }}>
        <div className="hw">
          <div style={{ marginBottom: 48, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ display: "block", fontSize: 9, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8, fontFamily: FONT_B }}>Offres</span>
            <h2 style={{ fontFamily: FONT_D, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "0.04em", color: "white", lineHeight: 1 }}>Choisissez Votre Package</h2>
          </div>

          <div className="g3">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className="pkg" style={{
                background: pkg.featured ? "#1a1a1a" : "#141414",
                border: `1px solid ${pkg.featured ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: pkg.featured ? "0 20px 60px rgba(0,0,0,0.5)" : "none",
              }}>
                {/* Package photo */}
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img src={pkg.img} alt={pkg.tier} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.3) 60%, transparent 100%)" }} />
                  {pkg.badge && (
                    <div style={{
                      position: "absolute", top: 14, left: 16,
                      background: "white", color: "#0d0d0d",
                      fontFamily: FONT_B, fontSize: 9, fontWeight: 900,
                      letterSpacing: "0.16em", textTransform: "uppercase",
                      padding: "4px 10px", borderRadius: 2,
                    }}>{pkg.badge}</div>
                  )}
                  <div style={{ position: "absolute", bottom: 16, left: 20 }}>
                    <h3 style={{ fontFamily: FONT_D, fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 900, letterSpacing: "0.05em", textTransform: "uppercase", color: "white", lineHeight: 1 }}>{pkg.tier}</h3>
                  </div>
                </div>

                {/* Price */}
                <div style={{ padding: "20px 20px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontFamily: FONT_D, fontSize: "clamp(1.4rem,2vw,1.8rem)", fontWeight: 900, color: "white" }}>
                      À partir de {pkg.price}
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, fontFamily: FONT_B, paddingBottom: 20 }}>par personne / par match</p>
                </div>

                {/* Perks */}
                <div style={{ padding: "20px", flex: 1 }}>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                    {pkg.perks.map((perk, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <FiCheck size={13} style={{ color: "rgba(255,255,255,0.55)", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.5, fontFamily: FONT_B }}>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div style={{ padding: "0 20px 20px" }}>
                  <a href="#contact" className="btn-shim" style={{
                    position: "relative", overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: "white", color: "#0d0d0d",
                    fontFamily: FONT_B, fontSize: 13, fontWeight: 800, letterSpacing: "0.05em",
                    padding: "14px", borderRadius: 100, textDecoration: "none",
                    transition: "background 0.18s, transform 0.15s",
                  }}
                    onMouseOver={e => { e.currentTarget.style.background = "#ebebeb"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseOut={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "none"; }}>
                    <span className="sh" />
                    {pkg.cta} <FiArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 11, marginTop: 20, color: "rgba(255,255,255,0.25)", fontFamily: FONT_B }}>
            * Prix indicatifs hors taxes. Contactez notre équipe pour un devis personnalisé.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS — dark cards
      ═══════════════════════════════════════ */}
      <section style={{ background: "#111", padding: "clamp(64px,8vh,96px) 0" }}>
        <div className="hw">
          <div style={{ marginBottom: 48, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ display: "block", fontSize: 9, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8, fontFamily: FONT_B }}>Témoignages</span>
            <h2 style={{ fontFamily: FONT_D, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "0.04em", color: "white", lineHeight: 1 }}>Ce Qu'ils En Disent</h2>
          </div>
          <div className="g3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, padding: "clamp(20px,2.5vw,28px)",
                display: "flex", flexDirection: "column", gap: 20,
                transition: "border-color 0.2s",
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              >
                <div style={{ display: "flex", gap: 3 }}>
                  {[...Array(5)].map((_, j) => <FiStar key={j} size={13} fill="white" color="white" />)}
                </div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.72, fontFamily: FONT_B, flex: 1, fontWeight: 500 }}>
                  « {t.text} »
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.6)", fontFamily: FONT_D, letterSpacing: "0.05em" }}>
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: "white", fontFamily: FONT_B }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: FONT_B, marginTop: 2 }}>{t.role} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section style={{ background: "#0d0d0d", padding: "clamp(64px,8vh,96px) 0" }}>
        <div className="hw">
          <div className="gfq">
            <div>
              <span style={{ display: "block", fontSize: 9, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12, fontFamily: FONT_B }}>FAQ</span>
              <h2 style={{ fontFamily: FONT_D, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, letterSpacing: "0.04em", color: "white", lineHeight: 1, marginBottom: 20 }}>Questions<br />Fréquentes</h2>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, lineHeight: 1.75, fontFamily: FONT_B, marginBottom: 28, maxWidth: 280 }}>
                Notre équipe est disponible 24h/24, 7j/7 pour répondre à toutes vos questions.
              </p>
              <a href="#contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "white", fontFamily: FONT_B, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "11px 22px", borderRadius: 100, textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.22)", transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.background = "transparent"; }}>
                Parler à un expert
              </a>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {FAQ_ITEMS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT FORM
      ═══════════════════════════════════════ */}
      <section id="contact" style={{ background: "#111", padding: "clamp(64px,8vh,96px) 0" }}>
        <div className="hw">
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ display: "block", fontSize: 9, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12, fontFamily: FONT_B }}>Contact</span>
              <h2 style={{ fontFamily: FONT_D, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "0.04em", color: "white", lineHeight: 1, marginBottom: 12 }}>Demandez Votre Devis</h2>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, fontFamily: FONT_B }}>Notre équipe vous répond sous 24h ouvrées.</p>
            </div>

            <div style={{ background: "#0d0d0d", borderRadius: 10, padding: "clamp(24px,4vw,40px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="g2c" style={{ marginBottom: 16 }}>
                {[["Prénom","Jean","text"],["Nom","Dupont","text"],["Email","jean@entreprise.com","email"],["Téléphone","+33 6 00 00 00 00","tel"]].map(([label, ph, type]) => (
                  <div key={label}>
                    <label style={{ display: "block", marginBottom: 7, fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", fontFamily: FONT_B }}>{label}</label>
                    <input type={type} placeholder={ph} style={{
                      width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 6, padding: "13px 16px", color: "white", fontFamily: FONT_B, fontSize: 14,
                      outline: "none", transition: "border-color 0.18s",
                    }}
                      onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.45)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 7, fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", fontFamily: FONT_B }}>Package souhaité</label>
                <select style={{
                  width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6, padding: "13px 16px", color: "white", fontFamily: FONT_B, fontSize: 14,
                  outline: "none", cursor: "pointer",
                }}
                  onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.45)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}>
                  <option value="" style={{ background: "#1a1a1a" }}>Sélectionnez un package</option>
                  <option style={{ background: "#1a1a1a" }}>Premium — à partir de 2 500 €</option>
                  <option style={{ background: "#1a1a1a" }}>Business — à partir de 5 000 €</option>
                  <option style={{ background: "#1a1a1a" }}>Prestige — sur devis</option>
                  <option style={{ background: "#1a1a1a" }}>Corporate / Groupe</option>
                </select>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", marginBottom: 7, fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", fontFamily: FONT_B }}>Message (optionnel)</label>
                <textarea rows={3} placeholder="Précisez vos besoins, le nombre de personnes, les dates préférées…" style={{
                  width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6, padding: "13px 16px", color: "white", fontFamily: FONT_B, fontSize: 14,
                  outline: "none", resize: "none", transition: "border-color 0.18s",
                }}
                  onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.45)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>

              <button className="btn-shim" style={{
                position: "relative", overflow: "hidden",
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                background: "white", color: "#0d0d0d",
                fontFamily: FONT_B, fontSize: 14, fontWeight: 800, letterSpacing: "0.05em",
                padding: "16px", borderRadius: 100, border: "none", cursor: "pointer",
                transition: "background 0.18s",
              }}
                onMouseOver={e => e.currentTarget.style.background = "#ebebeb"}
                onMouseOut={e => e.currentTarget.style.background = "white"}>
                <span className="sh" />
                Envoyer ma demande <FiArrowRight size={14} />
              </button>

              <p style={{ textAlign: "center", fontSize: 11, marginTop: 16, color: "rgba(255,255,255,0.25)", fontFamily: FONT_B }}>
                En soumettant ce formulaire, vous acceptez les{" "}
                <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}>conditions FIFA</a>.
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 28, marginTop: 36 }}>
              {[[FiShield,"Paiement Sécurisé"],[FiStar,"Officiel FIFA"],[FiGlobe,"6 Nations Hôtes"],[FiPhone,"Support 24/7"]].map(([Icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.28)" }}>
                  <Icon size={13} /><span style={{ fontSize: 11, fontWeight: 600, fontFamily: FONT_B }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
>>>>>>> e7a2f46026e732ac53b4f487cda974313c195070
