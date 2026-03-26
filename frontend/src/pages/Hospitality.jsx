import { useState, useEffect } from "react";
import {
  FiCheck, FiShield, FiGlobe, FiPhone,
  FiStar, FiArrowRight, FiChevronDown,
} from "react-icons/fi";

const HERO_VIDEO = "https://assets.mixkit.co/videos/17398/17398-720.mp4";

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
    cta: "Contacter",
    img: IMG.jet,
  },
];

const FAQ_ITEMS = [
  { q: "Les packages incluent-ils les billets de match ?", a: "Oui, tous nos packages incluent des billets de match officiels." },
  { q: "Combien de matchs puis-je sélectionner ?", a: "Selon le package, de 1 à 7 matchs." },
  { q: "Offres pour les groupes ?", a: "Oui, nous avons des solutions pour les entreprises de 10 à 500 personnes." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #eee" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "24px 0", background: "none", border: "none",
        cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#0d0d0d" }}>{q}</span>
        <FiChevronDown style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "0.3s" }}>
        <p style={{ paddingBottom: 24, color: "#666", fontSize: 15, lineHeight: 1.6 }}>{a}</p>
      </div>
    </div>
  );
}

export default function Hospitality() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ fontFamily: FONT_B, background: "#ffffff", color: "#0d0d0d", opacity: mounted ? 1 : 0, transition: "opacity 0.4s" }}>
      
      {/* Hero Section */}
      <section style={{ height: "80vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video autoPlay muted playsInline loop style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 900, padding: "0 32px" }}>
          <span style={{ color: "#c8102e", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 12, marginBottom: 20, display: "block" }}>L'Expérience Ultime</span>
          <h1 style={{ fontFamily: FONT_D, fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.85, marginBottom: 32 }}>Hospitalité<br/>FIFA 2030</h1>
          <p style={{ fontSize: 20, color: "#666", maxWidth: 600, margin: "0 auto 40px" }}>Vivez le tournoi dans des conditions d'exception. Loges privées, gastronomie étoilée et service personnalisé.</p>
          <a href="#packages" style={{ background: "#0d0d0d", color: "white", padding: "16px 40px", borderRadius: 100, fontWeight: 800, textDecoration: "none", fontSize: 14 }}>Découvrir nos offres</a>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" style={{ padding: "100px 32px", maxWidth: 1380, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontFamily: FONT_D, fontSize: 48, fontWeight: 900, textTransform: "uppercase" }}>Nos Packages</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
          {PACKAGES.map((pkg, i) => (
            <div key={i} style={{ 
              background: "#ffffff", borderRadius: 24, overflow: "hidden", border: "1px solid #eee", 
              boxShadow: pkg.featured ? "0 20px 40px rgba(0,0,0,0.06)" : "none",
              transform: pkg.featured ? "scale(1.03)" : "none",
              zIndex: pkg.featured ? 1 : 0
            }}>
              <div style={{ height: 250, position: "relative" }}>
                <img src={pkg.img} alt={pkg.tier} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 24, left: 24 }}>
                  <h3 style={{ fontFamily: FONT_D, fontSize: 32, fontWeight: 900, color: "white", textTransform: "uppercase" }}>{pkg.tier}</h3>
                </div>
              </div>
              <div style={{ padding: 40 }}>
                <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>{pkg.price}</div>
                <p style={{ fontSize: 13, color: "#999", marginBottom: 32 }}>par personne · par match</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {pkg.perks.map((p, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#444" }}>
                      <FiCheck color="#16a34a" /> {p}
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", padding: "16px", borderRadius: 100, background: pkg.featured ? "#c8102e" : "#0d0d0d", color: "white", fontWeight: 800, border: "none" }}>{pkg.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ background: "#f8f8f8", padding: "100px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FONT_D, fontSize: 42, fontWeight: 900, textTransform: "uppercase", textAlign: "center", marginBottom: 48 }}>Questions Fréquentes</h2>
          <div style={{ background: "white", borderRadius: 24, padding: "24px 40px", border: "1px solid #eee" }}>
            {FAQ_ITEMS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: FONT_D, fontSize: 42, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>Contactez-nous</h2>
          <p style={{ color: "#666", marginBottom: 48 }}>Notre équipe dédiée vous accompagne pour une expérience sur mesure.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
               <input type="text" placeholder="Prénom" style={{ padding: "16px 24px", borderRadius: 12, border: "1px solid #ddd", width: "100%" }} />
               <input type="text" placeholder="Nom" style={{ padding: "16px 24px", borderRadius: 12, border: "1px solid #ddd", width: "100%" }} />
            </div>
            <input type="email" placeholder="Email" style={{ padding: "16px 24px", borderRadius: 12, border: "1px solid #ddd", width: "100%" }} />
            <textarea rows={4} placeholder="Votre projet..." style={{ padding: "16px 24px", borderRadius: 12, border: "1px solid #ddd", width: "100%", resize: "none" }} />
            <button style={{ padding: "18px", borderRadius: 100, background: "#0d0d0d", color: "white", fontWeight: 800, fontSize: 16, border: "none", marginTop: 16 }}>Envoyer la Demande</button>
          </div>
        </div>
      </section>
    </div>
  );
}
