import { useState, useEffect } from "react";

// ── Activities data ───────────────────────────────────────────
const ACTIVITIES = [
  {
    icon: "🎮",
    title: "FIFA Gaming Arena",
    desc: "Affrontez des joueurs du monde entier sur les derniers jeux FIFA. Tournois quotidiens avec des prix à gagner.",
    tag: "Gaming",
    href: "#",
  },
  {
    icon: "⚽",
    title: "Terrain de Foot 5x5",
    desc: "Jouez sur des mini-terrains officiels FIFA. Réservation en ligne, sessions toutes les heures.",
    tag: "Sport",
    href: "#",
  },
  {
    icon: "🏆",
    title: "Trophy Experience",
    desc: "Photographiez-vous avec la Coupe du Monde FIFA originale. Disponible pendant 2h chaque soir.",
    tag: "Expérience",
    href: "#",
  },
  {
    icon: "📺",
    title: "Match Screening",
    desc: "Regardez tous les matchs en direct sur écran géant LED 4K. Capacité 5 000 places. Entrée libre.",
    tag: "Diffusion",
    href: "#",
  },
  {
    icon: "🎤",
    title: "Fan Stage Live",
    desc: "Concerts, animations et shows en direct chaque soir. Programme complet disponible sur l'application.",
    tag: "Musique",
    href: "#",
  },
  {
    icon: "🛍️",
    title: "FIFA Megastore",
    desc: "Collection officielle FIFA 2030, maillots personnalisés, éditions limitées. Livraison mondiale disponible.",
    tag: "Shopping",
    href: "#",
  },
];

const CITIES_FANZONE = [
  { name: "Madrid",       stadium: "Stade Bernabéu",      capacity: "81 044",  country: "Espagne",        code: "es" },
  { name: "Lisbonne",     stadium: "Stade de la Luz",      capacity: "65 647",  country: "Portugal",       code: "pt" },
  { name: "Buenos Aires", stadium: "Estadio Monumental",   capacity: "84 567",  country: "Argentine",      code: "ar" },
  { name: "Rabat",        stadium: "Stade Hassan II",      capacity: "115 000", country: "Maroc",          code: "ma" },
  { name: "Johannesburg", stadium: "FNB Stadium",           capacity: "94 736",  country: "Afrique du Sud", code: "za" },
  { name: "New York",     stadium: "MetLife Stadium",       capacity: "82 500",  country: "États-Unis",     code: "us" },
];

const FAQ = [
  { q: "L'entrée à la Fan Zone est-elle gratuite ?", a: "Oui, l'accès à la Fan Zone FIFA 2030 est entièrement gratuit. Certaines activités spécifiques comme le Trophy Experience nécessitent une réservation préalable." },
  { q: "Quels sont les horaires d'ouverture ?", a: "Les Fan Zones sont ouvertes de 10h à minuit les jours de match, et de 12h à 22h les jours sans match. Les horaires peuvent varier selon la ville hôte." },
  { q: "Y a-t-il un service de navette depuis les stades ?", a: "Des navettes officielles FIFA sont disponibles entre tous les stades et les Fan Zones. Service inclus dans le billet de match." },
  { q: "Peut-on apporter sa propre nourriture ?", a: "Les aliments et boissons extérieurs ne sont pas autorisés. Plus de 80 stands de restauration vous proposent des spécialités du monde entier à l'intérieur." },
];

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-fifa-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-body font-semibold text-[0.92rem] text-fifa-black leading-snug">{q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full border border-fifa-border flex items-center justify-center text-[0.7rem] transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"}`}>
        <p className="text-fifa-mid text-[0.87rem] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Fans() {
  const [activeCity, setActiveCity] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);

  return (
    <div className={`font-body bg-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>

      {/* ═══════════════════════════════════════════════
          HERO — Fan Zone
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-fifa-black overflow-hidden" style={{ minHeight: "70vh" }}>

        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gold" />

        {/* Big decorative text */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden leading-none"
          style={{ fontSize: "clamp(8rem,18vw,18rem)" }}>
          <span className="font-display block"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)", color: "transparent", lineHeight: 1 }}>
            FAN
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14"
          style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "72px", paddingTop: "120px" }}>

          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="font-body font-bold text-gold text-[0.6rem] tracking-[0.35em] uppercase">Zone Fan</span>
          </div>

          <h1 className="font-display text-white leading-[0.85] uppercase mb-6"
            style={{ fontSize: "clamp(56px,9vw,120px)" }}>
            VIVEZ LA<br />
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.9)", color: "transparent" }}>PASSION</span>
          </h1>

          <p className="text-white/40 font-body text-[0.9rem] leading-relaxed max-w-sm mb-8">
            Six Fan Zones officielles FIFA. Des expériences inoubliables au cœur du tournoi.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#activities"
              className="bg-white text-fifa-black font-body font-bold text-[0.78rem] tracking-wide px-7 py-3.5 rounded-full hover:bg-gold hover:text-white transition-colors">
              Découvrir les activités
            </a>
            <a href="#fanzones"
              className="border border-white/25 text-white font-body font-medium text-[0.78rem] px-7 py-3.5 rounded-full hover:border-white transition-colors">
              Trouver ma Fan Zone →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          KEY STATS
      ═══════════════════════════════════════════════ */}
      <div className="bg-gold">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
            {[
              { v: "6",    l: "Fan Zones Officielles" },
              { v: "5M+",  l: "Visiteurs Attendus"    },
              { v: "80+",  l: "Activités Gratuites"   },
              { v: "24/7", l: "Support FIFA"          },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center py-8 px-6">
                <span className="font-display text-white leading-none tabular-nums"
                  style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)" }}>
                  {s.v}
                </span>
                <span className="text-black/40 font-body text-[0.58rem] tracking-[0.18em] uppercase font-bold mt-1.5 text-center">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          ACTIVITIES
      ═══════════════════════════════════════════════ */}
      <section id="activities" className="bg-[#f5f5f5] py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10 pb-5 border-b border-[#ddd]">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Expériences</span>
              <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Ce Qui Vous Attend
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ACTIVITIES.map((a, i) => (
              <a key={i} href={a.href}
                className="group bg-white border border-[#ddd] hover:border-fifa-mid rounded-lg p-7 transition-colors flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{a.icon}</span>
                  <span className="text-[0.58rem] tracking-[0.18em] uppercase font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                    {a.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-body font-bold text-fifa-black text-[0.95rem] mb-2 group-hover:underline underline-offset-2">
                    {a.title}
                  </h3>
                  <p className="text-fifa-mid text-[0.83rem] leading-relaxed">{a.desc}</p>
                </div>
                <span className="text-[0.68rem] font-bold text-fifa-black mt-auto group-hover:underline underline-offset-2">
                  En savoir plus →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAN ZONES MAP Selector
      ═══════════════════════════════════════════════ */}
      <section id="fanzones" className="bg-white py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10 pb-5 border-b border-fifa-border">
            <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Lieux</span>
            <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Trouvez Votre Fan Zone
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* City list */}
            <div className="flex flex-col gap-0 border border-fifa-border rounded-lg overflow-hidden">
              {CITIES_FANZONE.map((c, i) => (
                <button key={i} onClick={() => setActiveCity(i)}
                  className={`flex items-center gap-5 px-6 py-5 border-b border-fifa-border last:border-0 text-left transition-colors ${
                    activeCity === i ? "bg-fifa-black" : "bg-white hover:bg-[#f5f5f5]"
                  }`}>
                  <img src={`https://flagcdn.com/w80/${c.code}.png`} alt={c.country}
                    className="w-10 h-7 object-cover rounded-sm shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className={`font-body font-bold text-[0.92rem] ${activeCity === i ? "text-white" : "text-fifa-black"}`}>
                      {c.name}
                    </p>
                    <p className={`text-[0.7rem] ${activeCity === i ? "text-white/40" : "text-fifa-mid"}`}>
                      {c.country}
                    </p>
                  </div>
                  <span className={`text-[0.7rem] transition-colors ${activeCity === i ? "text-gold" : "text-fifa-mid"}`}>→</span>
                </button>
              ))}
            </div>

            {/* City detail panel */}
            <div className="bg-[#f5f5f5] rounded-lg border border-[#ddd] p-7 flex flex-col gap-6">
              <div>
                <img
                  src={`https://flagcdn.com/w320/${CITIES_FANZONE[activeCity].code}.png`}
                  alt={CITIES_FANZONE[activeCity].country}
                  className="w-full h-32 object-cover rounded-lg mb-5 border border-[#ddd]"
                />
                <span className="text-[0.58rem] tracking-[0.22em] uppercase font-bold text-gold block mb-2">
                  {CITIES_FANZONE[activeCity].country}
                </span>
                <h3 className="font-display text-[2rem] text-fifa-black tracking-wide">
                  {CITIES_FANZONE[activeCity].name}
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between py-3 border-b border-[#ddd]">
                  <span className="text-[0.72rem] text-fifa-mid">Stade officiel</span>
                  <span className="text-[0.78rem] font-bold text-fifa-black text-right max-w-[55%]">
                    {CITIES_FANZONE[activeCity].stadium}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#ddd]">
                  <span className="text-[0.72rem] text-fifa-mid">Capacité</span>
                  <span className="text-[0.78rem] font-bold text-fifa-black">
                    {CITIES_FANZONE[activeCity].capacity}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[0.72rem] text-fifa-mid">Zone Fan — Ouverture</span>
                  <span className="text-[0.78rem] font-bold text-green-600">10h – 00h</span>
                </div>
              </div>

              <a href="/cities"
                className="block text-center bg-fifa-black text-white font-body font-bold text-[0.78rem] tracking-wide py-3.5 rounded-full hover:bg-gold transition-colors">
                Explorer {CITIES_FANZONE[activeCity].name} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          APP PROMO BAND
      ═══════════════════════════════════════════════ */}
      <section className="bg-fifa-black py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[0.58rem] tracking-[0.25em] text-gold font-bold uppercase block mb-4">Application Officielle</span>
              <h2 className="font-display text-white leading-[0.88] mb-6" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
                TOUT LE TOURNOI<br />DANS VOTRE POCHE
              </h2>
              <p className="text-white/40 text-[0.88rem] leading-relaxed mb-8 max-w-sm">
                Scores en temps réel, planificateur de Fan Zone, navigation GPS, billets digitaux et bien plus encore.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#"
                  className="flex items-center gap-2.5 bg-white text-fifa-black font-body font-bold text-[0.78rem] px-5 py-3 rounded-full hover:bg-gold hover:text-white transition-colors">
                  <span className="text-lg">🍎</span> App Store
                </a>
                <a href="#"
                  className="flex items-center gap-2.5 bg-white text-fifa-black font-body font-bold text-[0.78rem] px-5 py-3 rounded-full hover:bg-gold hover:text-white transition-colors">
                  <span className="text-lg">▶</span> Google Play
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "📍", label: "Navigation Fan Zone" },
                { icon: "🔔", label: "Alertes Match" },
                { icon: "🎫", label: "Billets Digitaux" },
                { icon: "📊", label: "Stats Live" },
                { icon: "🌍", label: "6 Langues" },
                { icon: "🛡️", label: "Accréditation" },
              ].map((f, i) => (
                <div key={i} className="bg-white/[0.04] border border-white/10 rounded-lg p-4 flex flex-col gap-2 items-center text-center">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-white/60 text-[0.62rem] font-body font-medium leading-snug">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">FAQ</span>
              <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Questions<br />Fréquentes
              </h2>
              <p className="text-fifa-mid text-[0.85rem] leading-relaxed mt-4">
                Vous ne trouvez pas votre réponse ? Contactez notre support officiel FIFA.
              </p>
              <a href="#" className="mt-6 inline-flex text-[0.7rem] font-bold tracking-[0.12em] uppercase border border-fifa-black text-fifa-black hover:bg-fifa-black hover:text-white transition-colors px-5 py-2.5 rounded-full">
                Contacter FIFA
              </a>
            </div>
            <div className="border-t border-fifa-border">
              {FAQ.map((f, i) => <Accordion key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA REGISTER
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f5] py-16 px-5 sm:px-8 border-t border-[#ddd]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-fifa-black mb-4" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            INSCRIVEZ-VOUS AUX ALERTES FAN ZONE
          </h2>
          <p className="text-fifa-mid text-[0.88rem] mb-8">
            Recevez les programmes, offres exclusives et mises à jour directement dans votre boîte mail.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-1 border border-[#ddd] rounded-full px-5 py-3.5 text-[0.82rem] font-body outline-none focus:border-fifa-black transition-colors"
            />
            <button className="shrink-0 bg-fifa-black text-white font-body font-bold text-[0.78rem] px-6 py-3.5 rounded-full hover:bg-gold transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}