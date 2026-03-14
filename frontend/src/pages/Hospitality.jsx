import { useState, useEffect } from "react";

const PACKAGES = [
  {
    tier: "Premium",
    price: "À partir de 2 500 €",
    badge: null,
    color: "bg-white",
    dark: false,
    perks: [
      "Siège catégorie Premium en tribune",
      "Accès salon hospitalité FIFA",
      "Repas gastronomique 3 services",
      "Programme de match officiel",
      "Cadeau de bienvenue FIFA",
      "Service voiturier",
    ],
    cta: "Réserver",
  },
  {
    tier: "Business",
    price: "À partir de 5 000 €",
    badge: "Populaire",
    color: "bg-fifa-black",
    dark: true,
    perks: [
      "Siège catégorie Business en tribune centrale",
      "Salon privatif avec vue terrain",
      "Menu dégustation & bar premium",
      "Conférencier invité FIFA",
      "Kit media & accréditation",
      "Transfer aller-retour luxe",
      "Accès vestiaires après match",
    ],
    cta: "Réserver",
  },
  {
    tier: "Prestige",
    price: "Sur devis",
    badge: "Exclusif",
    color: "bg-[#f5f5f5]",
    dark: false,
    perks: [
      "Loge privée avec terrasse terrain",
      "Chef privé & sommelier personnel",
      "Rencontre avec une légende FIFA",
      "Accès pitch walk officiel",
      "Suite hôtel 5★ incluse",
      "Jet privé depuis votre ville",
      "Expériences sur mesure",
    ],
    cta: "Contacter notre équipe",
  },
];

const EXPERIENCES = [
  {
    num: "01",
    title: "Accueil Personnalisé",
    desc: "Un agent FIFA dédié vous accompagne de votre arrivée à votre départ. Zéro attente, priorité totale.",
  },
  {
    num: "02",
    title: "Gastronomie du Monde",
    desc: "Chefs étoilés inspirés par les 6 nations hôtes. Menus créés spécialement pour la FIFA World Cup 2030.",
  },
  {
    num: "03",
    title: "Legends Encounters",
    desc: "Discussions exclusives avec les légendes du football. Séances dédicaces et photos dans un cadre premium.",
  },
  {
    num: "04",
    title: "The Best Seats",
    desc: "Sièges optimaux en tribune centrale, vues dégagées, confort maximal. Les meilleures positions garanties.",
  },
];

const TESTIMONIALS = [
  {
    name: "Thomas Heugel",
    role: "PDG, Heugel Finance",
    text: "Une expérience irréelle. Le package Business dépasse tout ce que j'avais imaginé. Le repas, la loge, l'accès terrain… parfait de A à Z.",
    city: "Paris",
  },
  {
    name: "Ana Ferreira",
    role: "Directrice Marketing, NovaTech",
    text: "Nous avons emmené 12 clients. Tout était fluide, élégant, mémorable. FIFA Hospitality, c'est le meilleur investissement client possible.",
    city: "Lisbonne",
  },
  {
    name: "James Okafor",
    role: "Partner, Okafor & Associates",
    text: "La rencontre avec la légende était incroyable. Nos associés en parlent encore. On réserve déjà pour la finale.",
    city: "Lagos",
  },
];

const FAQ_HOSP = [
  { q: "Les packages incluent-ils les billets de match ?", a: "Oui, tous nos packages d'hospitalité incluent des billets de match officiel de la catégorie correspondante, en plus de tous les services mentionnés." },
  { q: "Combien de matchs puis-je sélectionner ?", a: "Selon le package, vous pouvez sélectionner de 1 à 7 matchs. Le package Prestige permet de personnaliser entièrement votre calendrier, y compris la finale." },
  { q: "Les packages sont-ils disponibles pour des groupes ?", a: "Absolument. Nous proposons des offres corporate pour les groupes de 2 à 500 personnes. Contactez notre équipe dédiée B2B pour un devis personnalisé." },
  { q: "Quelle est la politique d'annulation ?", a: "Annulation gratuite jusqu'à 60 jours avant l'événement. Entre 60 et 30 jours, remboursement à 50%. Après 30 jours, les packages sont non-remboursables." },
];

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-body font-semibold text-[0.88rem] text-white leading-snug">{q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[0.7rem] text-white transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"}`}>
        <p className="text-white/40 text-[0.85rem] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Hospitality() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);

  return (
    <div className={`font-body bg-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>

      {/* ═══════════════════════════════════════════════
          HERO — Luxury / VIP
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "80vh", background: "#0a1220" }}>

        {/* Fine grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />

        {/* Gold top line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gold" />

        {/* Decorative number */}
        <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden leading-none"
          style={{ fontSize: "clamp(12rem,25vw,28rem)" }}>
          <span className="font-display block"
            style={{ WebkitTextStroke: "1px rgba(201,168,76,0.06)", color: "transparent", lineHeight: 1 }}>
            VIP
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14"
          style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "80px", paddingTop: "120px" }}>

          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="font-body font-bold text-gold text-[0.6rem] tracking-[0.35em] uppercase">FIFA Hospitality™</span>
          </div>

          <h1 className="font-display leading-[0.85] uppercase mb-6"
            style={{ fontSize: "clamp(52px,9vw,114px)" }}>
            <span className="text-white block">L'EXCELLENCE</span>
            <span className="block" style={{ WebkitTextStroke: "1.5px rgba(201,168,76,0.8)", color: "transparent" }}>AU SOMMET</span>
            <span className="text-white block">DU SPORT</span>
          </h1>

          <p className="text-white/35 font-body text-[0.9rem] leading-relaxed max-w-sm mb-8">
            Des expériences d'hospitalité officielles FIFA pensées pour l'excellence — pour particuliers, entreprises et groupes d'exception.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#packages"
              className="bg-gold text-white font-body font-bold text-[0.78rem] tracking-wide px-7 py-3.5 rounded-full hover:bg-[#e8c96a] transition-colors">
              Voir les packages
            </a>
            <a href="#contact"
              className="border border-white/20 text-white font-body font-medium text-[0.78rem] px-7 py-3.5 rounded-full hover:border-gold hover:text-gold transition-colors">
              Demande corporate →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EXPERIENCE STEPS
      ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 pb-5 border-b border-fifa-border">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Votre Séjour</span>
              <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Une Expérience Sans Égale
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-fifa-border rounded-lg overflow-hidden">
            {EXPERIENCES.map((e, i) => (
              <div key={i} className="p-8 border-r border-fifa-border last:border-r-0 border-b sm:border-b-0">
                <span className="font-display text-[3.5rem] leading-none block mb-5"
                  style={{ color: "rgba(0,0,0,0.05)" }}>
                  {e.num}
                </span>
                <h3 className="font-body font-bold text-fifa-black text-[0.92rem] mb-3">{e.title}</h3>
                <p className="text-fifa-mid text-[0.82rem] leading-relaxed">{e.desc}</p>
                <div className="mt-6 w-5 h-[1.5px] bg-gold" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PACKAGES
      ═══════════════════════════════════════════════ */}
      <section id="packages" className="bg-[#f5f5f5] py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10 pb-5 border-b border-[#ddd]">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Offres</span>
              <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Choisissez Votre Package
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PACKAGES.map((p, i) => (
              <div key={i}
                className={`${p.color} border rounded-lg overflow-hidden flex flex-col
                  ${p.dark ? "border-white/10" : "border-[#ddd]"}`}>

                {/* Header */}
                <div className={`p-7 border-b ${p.dark ? "border-white/10" : "border-[#ddd]"}`}>
                  <div className="flex items-start justify-between mb-5">
                    <span className={`font-display text-[1.8rem] tracking-wide ${p.dark ? "text-white" : "text-fifa-black"}`}>
                      {p.tier}
                    </span>
                    {p.badge && (
                      <span className={`text-[0.58rem] tracking-[0.18em] uppercase font-bold px-2.5 py-1 rounded-full
                        ${p.dark ? "bg-gold text-white" : "bg-fifa-black text-white"}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className={`font-body font-bold text-[1.05rem] ${p.dark ? "text-gold" : "text-fifa-black"}`}>
                    {p.price}
                  </p>
                  <p className={`text-[0.7rem] mt-1 ${p.dark ? "text-white/30" : "text-fifa-mid"}`}>
                    par personne / par match
                  </p>
                </div>

                {/* Perks */}
                <div className="p-7 flex-1">
                  <ul className="flex flex-col gap-3">
                    {p.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`shrink-0 mt-0.5 text-[0.7rem] ${p.dark ? "text-gold" : "text-gold"}`}>✓</span>
                        <span className={`text-[0.82rem] leading-snug ${p.dark ? "text-white/70" : "text-fifa-mid"}`}>
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-7 pt-0">
                  <a href="#contact"
                    className={`block text-center font-body font-bold text-[0.78rem] tracking-wide py-3.5 rounded-full transition-colors
                      ${p.dark
                        ? "bg-gold text-white hover:bg-[#e8c96a]"
                        : "bg-fifa-black text-white hover:bg-gold"
                      }`}>
                    {p.cta} →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-fifa-mid text-[0.72rem] mt-6">
            * Tous les prix sont indicatifs et hors taxes. Contactez notre équipe pour un devis personnalisé.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10 pb-5 border-b border-fifa-border">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Témoignages</span>
              <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Ce Qu'ils En Disent
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="border border-fifa-border rounded-lg p-7 flex flex-col gap-5">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-gold text-[0.85rem]">★</span>
                  ))}
                </div>
                <p className="text-fifa-black text-[0.88rem] leading-relaxed flex-1">
                  « {t.text} »
                </p>
                <div className="pt-4 border-t border-fifa-border flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f5f5f5] border border-fifa-border flex items-center justify-center">
                    <span className="text-[0.75rem] font-bold text-fifa-mid">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-bold text-[0.82rem] text-fifa-black">{t.name}</p>
                    <p className="text-fifa-mid text-[0.68rem]">{t.role} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════ */}
      <section className="bg-fifa-black py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-gold font-bold uppercase mb-2">FAQ</span>
              <h2 className="font-display text-white tracking-wide" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Questions<br />Fréquentes
              </h2>
              <p className="text-white/35 text-[0.85rem] leading-relaxed mt-4 max-w-xs">
                Notre équipe corporate est disponible 24h/24, 7j/7 pour répondre à toutes vos questions.
              </p>
              <a href="#contact" className="mt-6 inline-flex text-[0.7rem] font-bold tracking-[0.12em] uppercase border border-white/20 text-white hover:border-gold hover:text-gold transition-colors px-5 py-2.5 rounded-full">
                Parler à un expert
              </a>
            </div>
            <div className="border-t border-white/10">
              {FAQ_HOSP.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CONTACT / LEAD FORM
      ═══════════════════════════════════════════════ */}
      <section id="contact" className="bg-[#f5f5f5] py-20 px-5 sm:px-8 lg:px-14 border-t border-[#ddd]">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Contact</span>
            <h2 className="font-display text-fifa-black tracking-wide" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Demandez Votre Devis
            </h2>
            <p className="text-fifa-mid text-[0.88rem] mt-3">
              Notre équipe vous répond sous 24h ouvrées.
            </p>
          </div>

          <div className="bg-white border border-[#ddd] rounded-lg p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-mid">Prénom</label>
                <input type="text" placeholder="Jean"
                  className="border border-[#ddd] rounded-lg px-4 py-3 text-[0.85rem] font-body outline-none focus:border-fifa-black transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-mid">Nom</label>
                <input type="text" placeholder="Dupont"
                  className="border border-[#ddd] rounded-lg px-4 py-3 text-[0.85rem] font-body outline-none focus:border-fifa-black transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-mid">Email</label>
                <input type="email" placeholder="jean@entreprise.com"
                  className="border border-[#ddd] rounded-lg px-4 py-3 text-[0.85rem] font-body outline-none focus:border-fifa-black transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-mid">Téléphone</label>
                <input type="tel" placeholder="+33 6 00 00 00 00"
                  className="border border-[#ddd] rounded-lg px-4 py-3 text-[0.85rem] font-body outline-none focus:border-fifa-black transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-mid">Package souhaité</label>
              <select className="border border-[#ddd] rounded-lg px-4 py-3 text-[0.85rem] font-body outline-none focus:border-fifa-black transition-colors bg-white appearance-none">
                <option value="">Sélectionnez un package</option>
                <option value="premium">Premium — à partir de 2 500 €</option>
                <option value="business">Business — à partir de 5 000 €</option>
                <option value="prestige">Prestige — sur devis</option>
                <option value="corporate">Corporate / Groupe</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-mid">Message (optionnel)</label>
              <textarea rows={3} placeholder="Précisez vos besoins, le nombre de personnes, les dates préférées…"
                className="border border-[#ddd] rounded-lg px-4 py-3 text-[0.85rem] font-body outline-none focus:border-fifa-black transition-colors resize-none" />
            </div>
            <button
              className="w-full bg-fifa-black text-white font-body font-bold text-[0.82rem] tracking-wide py-4 rounded-full hover:bg-gold transition-colors">
              Envoyer ma demande →
            </button>
            <p className="text-center text-fifa-mid text-[0.68rem] mt-4">
              En soumettant ce formulaire, vous acceptez les{" "}
              <a href="#" className="underline hover:text-fifa-black transition-colors">conditions FIFA</a>.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: "🔒", label: "Paiement Sécurisé" },
              { icon: "✅", label: "Officiel FIFA" },
              { icon: "🌍", label: "Livraison Mondiale" },
              { icon: "📞", label: "Support 24/7" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-fifa-mid">
                <span className="text-base">{b.icon}</span>
                <span className="text-[0.68rem] font-bold tracking-wide">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}