import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiCheck, FiShield, FiGlobe, FiPhone,
  FiStar, FiArrowRight, FiChevronDown, FiClock, FiActivity, FiMapPin
} from "react-icons/fi";
import { getHospitalities } from "../services/api";

const API_BASE_URL = "http://localhost:8000/api/v1";

// ─── Mixkit CDN video ──────────────────────────────────────────
const HERO_VIDEO = "https://assets.mixkit.co/videos/17398/17398-720.mp4";

// ─── Unsplash CDN photos ────────────────────────────────────────
const IMG = {
  hero:      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=85&fit=crop",
  dining:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80&fit=crop",
  lounge:    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=80&fit=crop",
  suite:     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80&fit=crop",
  champagne: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&fit=crop",
  gourmet:   "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&fit=crop",
  jet:       "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80&fit=crop",
};

const FONT_D = "'Bebas Neue', sans-serif";
const FONT_B = "'DM Sans', sans-serif";

const EXPERIENCES = [
  { num: "01", title: "Accueil Personnalisé",   desc: "Un agent FIFA dédié vous accompagne du début à la fin. Zéro attente, priorité absolue.",              img: IMG.champagne },
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

export default function Hospitality() {
  const [mounted, setMounted] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fetchHospitalities = async () => {
      try {
        const data = await getHospitalities();
        setPackages(data.filter(i => i.is_active));
      } catch (err) {
        console.error("Failed to fetch hospitalities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitalities();
  }, []);

  return (
    <div style={{ fontFamily: FONT_B, background: "#0d0d0d", color: "white", opacity: mounted ? 1 : 0, transition: "opacity 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes bgz  { from{transform:scale(1);}    to{transform:scale(1.06);}    }
        @keyframes shim { from{left:-80%;}             to{left:130%;}                }

        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3vw,48px); }

        .photo-card { position:relative; overflow:hidden; border-radius:8px; }
        .photo-card img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease; display:block; }
        .photo-card:hover img { transform:scale(1.05); }

        .pkg { border-radius:12px; overflow:hidden; display:flex; flex-direction:column; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); background: #141414; border: 1px solid rgba(255,255,255,0.06); }
        .pkg:hover { transform:translateY(-8px); border-color: rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

        .btn-shim { position:relative; overflow:hidden; }
        .btn-shim .sh { position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); pointer-events:none; }
        .btn-shim:hover .sh { animation:shim 0.5s ease forwards; }

        .g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .g4 { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .g2c{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
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
          .photo-band{display:none!important;}
        }
        
        .section-head { margin-bottom: 56px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 24px; }
        .eyebrow { display: block; font-size: 10px; font-weight: 800; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 12px; }
        .title { font-family: ${FONT_D}; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; color: white; line-height: 1; text-transform: uppercase; letter-spacing: 0.02em; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <video autoPlay muted playsInline loop style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4, animation: "bgz 20s linear infinite alternate" }}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0d 15%, transparent 70%), linear-gradient(to right, #0d0d0d 20%, transparent 80%)", zIndex: 1 }} />
        
        <div className="hw" style={{ position: "relative", zIndex: 2, paddingTop: 100 }}>
          <div style={{ maxWidth: 800 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, borderRadius: 100, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 16px", marginBottom: 32 }}>
              <FiShield size={14} color="#ef4444" />
              <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.8)" }}>Official FIFA Hospitality Program</span>
            </span>
            <h1 style={{ fontFamily: FONT_D, fontSize: "clamp(3.5rem, 10vw, 7.5rem)", fontWeight: 900, lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.02em", margin: "0 0 32px" }}>
              L'Excellence <br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.6)" }}>Au Sommet</span>
            </h1>
            <p style={{ fontSize: "clamp(16px, 1.2vw, 20px)", color: "rgba(255,255,255,0.5)", maxWidth: 600, lineHeight: 1.6, marginBottom: 48 }}>
              Vivez la Coupe du Monde 2026 comme jamais auparavant. Des loges privées aux salons gastronomiques, découvrez nos offres exclusives.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <a href="#packages" className="btn-shim" style={{ padding: "18px 40px", borderRadius: 10, background: "white", color: "#0d0d0d", fontWeight: 800, textDecoration: "none", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                <span className="sh" /> Explorer les offres <FiArrowRight style={{ marginLeft: 8 }} />
              </a>
              <a href="#contact" style={{ padding: "18px 40px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontWeight: 700, textDecoration: "none", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.3s" }}
                 onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                 onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO BAND ── */}
      <div className="photo-band" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: 280, gap: 1 }}>
        {[[IMG.dining, "Gastronomie Estivale"], [IMG.suite, "Suites Privatives"], [IMG.jet, "Conciergerie Luxe"]].map(([src, label], i) => (
          <div key={i} className="photo-card" style={{ borderRadius: 0 }}>
            <img src={src} alt={label} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: 24, left: 24 }}>
              <span style={{ fontFamily: FONT_D, fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "white" }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── EXPERIENCES ── */}
      <section style={{ padding: "clamp(80px, 12vh, 140px) 0", background: "#0d0d0d" }}>
        <div className="hw">
          <div className="section-head">
            <span className="eyebrow">Services Immortels</span>
            <h2 className="title">Ce Qui Vous Attend</h2>
          </div>
          <div className="g4" style={{ gap: 24 }}>
            {EXPERIENCES.map((exp, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ height: 220, borderRadius: 12, overflow: "hidden", position: "relative" }}>
                  <img src={exp.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                  <div style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", fontStyle: FONT_D, fontWeight: 900, fontSize: 14 }}>{exp.num}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: FONT_D, fontSize: 20, fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>{exp.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.6 }}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" style={{ padding: "clamp(80px, 12vh, 140px) 0", background: "#111" }}>
        <div className="hw">
          <div className="section-head" style={{ borderBottomColor: "rgba(255,255,255,0.05)" }}>
            <span className="eyebrow">Packages Officiels</span>
            <h2 className="title">Nos Offres Hospitalité</h2>
          </div>

          <div className="g3">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} style={{ height: 450, borderRadius: 12, background: "rgba(255,255,255,0.03)" }} />)
            ) : packages.length === 0 ? (
               <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.3)' }}>Aucun package disponible pour le moment.</div>
            ) : (
              packages.map((pkg, i) => (
                <div key={i} className="pkg" style={{ borderColor: pkg.is_featured ? "rgba(239, 68, 68, 0.4)" : "rgba(255,255,255,0.06)" }}>
                  <div style={{ height: 240, overflow: "hidden", position: "relative" }}>
                    <img src={pkg.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #141414, transparent 60%)" }} />
                    {pkg.badge && (
                      <span style={{ position: "absolute", top: 20, left: 20, background: "#ef4444", color: "white", fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{pkg.badge}</span>
                    )}
                    <div style={{ position: "absolute", bottom: 20, left: 24 }}>
                      <h3 style={{ fontFamily: FONT_D, fontSize: 28, fontWeight: 900, textTransform: "uppercase", margin: 0 }}>{pkg.tier}</h3>
                    </div>
                  </div>
                  <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ marginBottom: 20 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>À partir de</span>
                      <div style={{ fontFamily: FONT_D, fontSize: 32, fontWeight: 900, color: "white" }}>{pkg.price} € <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>/ match</span></div>
                    </div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 24 }}>{pkg.description}</p>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>Services Inclus</label>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                        {pkg.perks?.slice(0, 5).map((perk, j) => (
                          <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                            <FiCheck size={14} color="#22c55e" /> {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a href="#contact" className="btn-shim" style={{ marginTop: 32, padding: "16px", borderRadius: 10, background: pkg.is_featured ? "#ef4444" : "white", color: pkg.is_featured ? "white" : "#0d0d0d", textAlign: "center", fontWeight: 800, textDecoration: "none", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      <span className="sh" /> {pkg.cta_text}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "clamp(80px, 12vh, 140px) 0", background: "#0d0d0d" }}>
        <div className="hw">
          <div className="section-head">
            <span className="eyebrow">Paroles d'Exception</span>
            <h2 className="title">Avis de nos clients</h2>
          </div>
          <div className="g3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 32 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                  {[1, 2, 3, 4, 5].map(s => <FiStar key={s} size={14} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", fontStyle: "italic", marginBottom: 32, lineHeight: 1.7 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", fontWeight: 800 }}>{t.name[0]}</div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>{t.name}</h4>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "clamp(80px, 12vh, 140px) 0", background: "#111" }}>
        <div className="hw">
          <div className="gfq">
            <div style={{ position: "sticky", top: 140 }}>
              <span className="eyebrow">Support</span>
              <h2 className="title" style={{ marginBottom: 24, fontSize: "2.6rem" }}>Questions <br /> Fréquentes</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 32 }}>Vous avez besoin d'aide pour choisir votre package ? Nos experts sont là pour vous.</p>
              <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none", padding: "12px 24px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.3s" }}
                 onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                 onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                Discuter avec un agent <FiArrowRight />
              </a>
            </div>
            <div>
              {FAQ_ITEMS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "clamp(80px, 12vh, 140px) 0", background: "#0d0d0d" }}>
        <div className="hw">
          <div style={{ maxWidth: 1000, margin: "0 auto", background: "#141414", borderRadius: 24, overflow: "hidden", display: "grid", gridTemplateColumns: "400px 1fr", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ background: "#1a1a1a", padding: 48, display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <h3 style={{ fontFamily: FONT_D, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 12 }}>Une demande <br /> particulière ?</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.6 }}>Nos conseillers hospitalité vous proposent des solutions sur-mesure pour vos groupes et évènements corporate.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: FiPhone, label: "Ligne Directe", val: "+212 5XX XXX XXX" },
                  { icon: FiGlobe, label: "Partenariats", val: "partners@fifa-hospitality.com" },
                  { icon: FiMapPin, label: "Bureau Principal", val: "Casablanca Finance City" }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>{item.label}</span>
                      <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 48 }}>
              <div className="g2c" style={{ marginBottom: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Prénom</label>
                  <input type="text" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 14, color: "white", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Nom</label>
                  <input type="text" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 14, color: "white", outline: "none" }} />
                </div>
              </div>
              <div className="fg" style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Email Professionnel</label>
                <input type="email" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 14, color: "white", outline: "none" }} />
              </div>
              <div className="fg" style={{ marginBottom: 32 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Message</label>
                <textarea rows={4} style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 14, color: "white", outline: "none", resize: "none" }}></textarea>
              </div>
              <button className="btn-shim" style={{ width: "100%", padding: 16, borderRadius: 100, background: "white", color: "#0d0d0d", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", border: "none", cursor: "pointer" }}>
                <span className="sh" /> Envoyer la demande
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}