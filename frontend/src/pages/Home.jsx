import { useState, useEffect } from "react";
import { useStats, useMatches } from "../hooks/useWorldCup";

// ── Country → ISO code map ────────────────────────────────────
const CODES = {
  "Brazil":"br","France":"fr","Germany":"de","Argentina":"ar",
  "Spain":"es","England":"gb","Portugal":"pt","Morocco":"ma",
  "USA":"us","Mexico":"mx","Italy":"it","Japan":"jp",
  "Netherlands":"nl","Belgium":"be","Croatia":"hr","Uruguay":"uy",
  "Colombia":"co","Senegal":"sn","Australia":"au","South Korea":"kr",
  "Switzerland":"ch","Serbia":"rs","Canada":"ca","Ecuador":"ec",
  "Qatar":"qa","Iran":"ir","Poland":"pl","Denmark":"dk",
  "Tunisia":"tn","Cameroon":"cm","Saudi Arabia":"sa",
  "South Africa":"za","Egypt":"eg","Nigeria":"ng","Algeria":"dz",
};

function Flag({ country, size = 40 }) {
  const code = CODES[country];
  if (!code) return (
    <div style={{ width: size * 1.4, height: size }}
      className="bg-fifa-gray flex items-center justify-center rounded text-[10px] font-bold text-fifa-mid">
      {country?.slice(0,3).toUpperCase()}
    </div>
  );
  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      alt={country}
      style={{ width: size * 1.4, height: size, objectFit: "cover" }}
      className="rounded-sm"
      loading="lazy"
    />
  );
}

const STAGE_LABEL = {
  group:"Groupe", round_of_16:"8e de finale",
  quarter:"Quart de finale", semi:"Demi-finale", final:"FINALE",
};

function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="w-5 h-5 border-2 border-fifa-border border-t-fifa-black rounded-full animate-spin" />
    </div>
  );
}

// ── Match Card — clean, flat, editorial ───────────────────────
function MatchCard({ m }) {
  const isLive = m.status === "live";
  const isDone = m.status === "finished";
  const date = new Date(m.match_date + "T00:00:00")
    .toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

  return (
    <div className={`bg-white border rounded-lg overflow-hidden transition-colors duration-150 hover:border-fifa-mid
      ${isLive ? "border-green-500" : "border-fifa-border"}`}>

      {/* Status strip */}
      <div className={`h-[2px] w-full ${isLive ? "bg-green-500" : isDone ? "bg-fifa-border" : "bg-fifa-black"}`} />

      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-fifa-mid">
            {STAGE_LABEL[m.stage] || "Groupe"}{m.group_name ? ` · ${m.group_name}` : ""}
          </span>
          {isLive ? (
            <span className="flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-widest text-green-600">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              En direct
            </span>
          ) : (
            <span className="text-[0.6rem] text-fifa-mid tabular-nums">
              {date} · {m.match_time?.slice(0, 5)}
            </span>
          )}
        </div>

        {/* Teams + Score */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col items-center gap-2.5 flex-1 min-w-0">
            <Flag country={m.home_team} size={32} />
            <span className="font-body font-semibold text-[0.78rem] text-fifa-black text-center leading-snug truncate w-full text-center">
              {m.home_team}
            </span>
          </div>

          <div className="flex flex-col items-center shrink-0 px-2">
            {isDone ? (
              <span className="font-display text-[1.7rem] text-fifa-black tracking-wider leading-none">
                {m.home_score}&thinsp;–&thinsp;{m.away_score}
              </span>
            ) : isLive ? (
              <span className="font-display text-[1.7rem] text-green-600 tracking-wider leading-none">
                {m.home_score ?? 0}&thinsp;–&thinsp;{m.away_score ?? 0}
              </span>
            ) : (
              <span className="font-display text-[1.1rem] text-fifa-mid tracking-widest leading-none">
                VS
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-2.5 flex-1 min-w-0">
            <Flag country={m.away_team} size={32} />
            <span className="font-body font-semibold text-[0.78rem] text-fifa-black text-center leading-snug truncate w-full text-center">
              {m.away_team}
            </span>
          </div>
        </div>

        {/* Venue footer */}
        <div className="mt-4 pt-3 border-t border-fifa-border flex items-center justify-between gap-2">
          <span className="text-[0.62rem] text-fifa-mid truncate">{m.venue}, {m.city}</span>
          <a href="/tickets"
            className="shrink-0 text-[0.6rem] font-bold tracking-[0.12em] uppercase text-fifa-black border border-fifa-black hover:bg-fifa-black hover:text-white transition-colors px-3 py-1 rounded-full">
            Billets
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────
function StatsBar({ stats, loading }) {
  if (loading) return <div className="bg-fifa-black py-8"><Spinner /></div>;
  if (!stats?.length) return null;
  return (
    <div className="bg-fifa-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center py-10 px-6 hover:bg-white/[0.03] transition-colors">
              <span className="font-display text-white leading-none tabular-nums"
                style={{ fontSize: "clamp(2.4rem,4.5vw,3.6rem)" }}>
                {s.value}
              </span>
              <span className="text-white/35 font-body text-[0.58rem] tracking-[0.2em] uppercase font-bold mt-2 text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Filter Tab ────────────────────────────────────────────────
function FilterTab({ active, onClick, children, dot }) {
  return (
    <button onClick={onClick}
      className={`shrink-0 flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border transition-all duration-150 ${
        active
          ? "bg-fifa-black text-white border-fifa-black"
          : "bg-white text-fifa-mid border-fifa-border hover:border-fifa-mid hover:text-fifa-black"
      }`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-400" : "bg-green-500"} animate-pulse`} />}
      {children}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function Home() {
  const [filter, setFilter] = useState("upcoming");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);

  const { data: stats, loading: statsLoading } = useStats();
  const { data: matches, loading: matchesLoading, error: matchesError, refetch } = useMatches({ status: filter, limit: 6 });

  return (
    <div className={`font-body bg-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-fifa-black overflow-hidden" style={{ minHeight: "92vh" }}>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-100"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />

        {/* Gold top line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gold" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14"
          style={{ minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "80px", paddingTop: "120px" }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="font-body font-bold text-gold text-[0.6rem] tracking-[0.35em] uppercase">
              FIFA World Cup 2030™
            </span>
          </div>

          {/* Headline — editorial split */}
          <div className="mb-8">
            <h1 className="font-display text-white leading-[0.82] uppercase"
              style={{ fontSize: "clamp(68px,11vw,148px)" }}>
              THE
            </h1>
            <h1 className="font-display leading-[0.82] uppercase"
              style={{
                fontSize: "clamp(68px,11vw,148px)",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.9)",
                color: "transparent",
              }}>
              WORLD
            </h1>
            <h1 className="font-display text-white leading-[0.82] uppercase"
              style={{ fontSize: "clamp(68px,11vw,148px)" }}>
              UNITED.
            </h1>
          </div>

          {/* Sub */}
          <p className="text-white/40 font-body font-light text-[0.95rem] leading-relaxed mb-10 max-w-xs">
            Six continents. Six nations hôtes.<br />Un tournoi historique.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href="/tickets"
              className="bg-white text-fifa-black font-body font-bold text-[0.78rem] tracking-wide px-7 py-3.5 rounded-full hover:bg-gold hover:text-white transition-colors duration-200">
              Acheter des billets
            </a>
            <a href="/matches"
              className="border border-white/25 text-white font-body font-medium text-[0.78rem] px-7 py-3.5 rounded-full hover:border-white transition-colors duration-200">
              Calendrier →
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 pointer-events-none">
            <div className="w-[1px] h-8 bg-white animate-fade-up" />
            <span className="text-white text-[0.5rem] tracking-[0.3em] uppercase">Scroll</span>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════ */}
      <StatsBar stats={stats} loading={statsLoading} />

      {/* ═══════════════════════════════════════════════
          FIXTURES
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f5] py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">

          {/* Section head */}
          <div className="flex items-end justify-between mb-10 pb-5 border-b border-[#ddd]">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Calendrier</span>
              <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Prochains Matchs
              </h2>
            </div>
            <a href="/matches"
              className="hidden sm:inline-flex text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-black border border-fifa-black hover:bg-fifa-black hover:text-white transition-colors px-5 py-2.5 rounded-full">
              Tous les matchs
            </a>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
            <FilterTab active={filter === "upcoming"} onClick={() => setFilter("upcoming")}>À venir</FilterTab>
            <FilterTab active={filter === "live"} onClick={() => setFilter("live")} dot>En direct</FilterTab>
            <FilterTab active={filter === "finished"} onClick={() => setFilter("finished")}>Résultats</FilterTab>
          </div>

          {/* Grid */}
          {matchesLoading ? <Spinner /> :
           matchesError ? (
            <div className="text-center py-16 text-fifa-mid text-sm">
              Erreur de chargement.{" "}
              <button onClick={refetch} className="underline font-bold text-fifa-black">Réessayer</button>
            </div>
           ) : !matches?.length ? (
            <div className="text-center py-16 text-fifa-mid text-sm">
              Aucun match {filter === "upcoming" ? "à venir" : filter === "live" ? "en direct" : "terminé"}.
            </div>
           ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {matches.map(m => <MatchCard key={m.id} m={m} />)}
            </div>
           )}

          <a href="/matches" className="sm:hidden mt-6 flex items-center justify-center text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-black border border-fifa-black hover:bg-fifa-black hover:text-white transition-colors px-5 py-3 rounded-full w-full">
            Tous les matchs
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EDITORIAL TOURNAMENT PHASES
      ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10 pb-5 border-b border-fifa-border">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Tournoi</span>
              <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Chaque Phase, Chaque Histoire
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-fifa-border rounded-lg overflow-hidden">
            {[
              {
                num: "01", tag: "Phase de Groupes", title: "La Route Commence",
                desc: "48 nations. La phase de groupes met en scène le plus grand spectacle sportif au monde.",
                bg: "bg-white", dark: false,
              },
              {
                num: "02", tag: "Élimination Directe", title: "Gagner ou Partir",
                desc: "Un drame à élimination directe comme aucun autre. Chaque match est une finale.",
                bg: "bg-[#f5f5f5]", dark: false,
              },
              {
                num: "03", tag: "La Finale", title: "La Gloire Attend",
                desc: "Une nation soulèvera le trophée doré. Faites partie du moment qui définit une génération.",
                bg: "bg-fifa-black", dark: true,
              },
            ].map((c, i) => (
              <div key={i}
                className={`${c.bg} p-10 border-r border-fifa-border last:border-r-0 ${i < 2 ? "border-b md:border-b-0" : ""}`}>
                <span className="font-display block mb-6 leading-none"
                  style={{ fontSize: "4rem", color: c.dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                  {c.num}
                </span>
                <span className={`text-[0.58rem] tracking-[0.22em] uppercase font-bold block mb-3 ${c.dark ? "text-gold" : "text-fifa-mid"}`}>
                  {c.tag}
                </span>
                <h3 className={`font-display text-[1.6rem] tracking-wide mb-4 leading-tight ${c.dark ? "text-white" : "text-fifa-black"}`}>
                  {c.title}
                </h3>
                <p className={`text-[0.85rem] leading-relaxed ${c.dark ? "text-white/40" : "text-fifa-mid"}`}>
                  {c.desc}
                </p>
                <div className={`mt-8 w-6 h-[1.5px] ${c.dark ? "bg-gold" : "bg-fifa-black"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOST NATIONS
      ═══════════════════════════════════════════════ */}
      <section className="bg-fifa-black py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10 pb-5 border-b border-white/10">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-gold font-bold uppercase mb-2">Pays Hôtes</span>
              <h2 className="font-display text-white" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Six Nations. Un Rêve.
              </h2>
            </div>
            <a href="/cities"
              className="text-[0.68rem] font-bold tracking-[0.12em] uppercase border border-white/20 hover:border-white text-white px-5 py-2.5 rounded-full transition-colors">
              Explorer
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { city: "Madrid",       country: "Espagne",        code: "es" },
              { city: "Lisbonne",     country: "Portugal",       code: "pt" },
              { city: "Buenos Aires", country: "Argentine",      code: "ar" },
              { city: "Rabat",        country: "Maroc",          code: "ma" },
              { city: "Johannesburg", country: "Afrique du Sud", code: "za" },
              { city: "New York",     country: "États-Unis",     code: "us" },
            ].map((c, i) => (
              <a key={i} href="/cities"
                className="group relative rounded-lg overflow-hidden border border-white/10 hover:border-gold/60 transition-all duration-200 aspect-[3/4] flex flex-col justify-end">
                <img
                  src={`https://flagcdn.com/w320/${c.code}.png`}
                  alt={c.country}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 p-3">
                  <p className="text-white font-body font-bold text-[0.82rem] leading-tight">{c.city}</p>
                  <p className="text-white/45 font-body text-[0.58rem] tracking-wide mt-0.5">{c.country}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LATEST NEWS STRIP (static editorial)
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f5] py-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 pb-5 border-b border-[#ddd]">
            <div>
              <span className="block text-[0.58rem] tracking-[0.25em] text-fifa-mid font-bold uppercase mb-2">Actualités</span>
              <h2 className="font-display tracking-wide text-fifa-black" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Dernières Nouvelles
              </h2>
            </div>
            <a href="/news"
              className="hidden sm:inline-flex text-[0.68rem] font-bold tracking-[0.12em] uppercase text-fifa-black border border-fifa-black hover:bg-fifa-black hover:text-white transition-colors px-5 py-2.5 rounded-full">
              Toutes les news
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { tag: "Équipes", title: "Le Maroc confirme son statut de favori après les qualifications historiques", date: "12 Mar 2026" },
              { tag: "Stades", title: "Les six stades hôtes officiellement homologués par la FIFA pour 2030", date: "10 Mar 2026" },
              { tag: "Billets", title: "Phase 2 de la vente de billets : plus de 8 millions de demandes enregistrées", date: "8 Mar 2026" },
            ].map((n, i) => (
              <a key={i} href="/news"
                className={`group block p-7 rounded-lg border border-[#ddd] hover:border-fifa-mid transition-colors bg-white ${i === 0 ? "md:col-span-1" : ""}`}>
                <span className="text-[0.58rem] tracking-[0.22em] uppercase font-bold text-gold block mb-3">{n.tag}</span>
                <h3 className="font-body font-bold text-fifa-black text-[0.95rem] leading-snug mb-4 group-hover:underline underline-offset-2">
                  {n.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] text-fifa-mid">{n.date}</span>
                  <span className="text-[0.7rem] text-fifa-mid group-hover:text-fifa-black transition-colors">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="bg-white py-24 px-5 sm:px-8 border-t border-fifa-border">
        <div className="max-w-lg mx-auto text-center">
          <span className="block text-[0.58rem] tracking-[0.3em] text-fifa-mid font-bold uppercase mb-5">
            Disponibilité Limitée
          </span>
          <h2 className="font-display text-fifa-black mb-6" style={{ fontSize: "clamp(2.6rem,7vw,5rem)", lineHeight: "0.88" }}>
            FAITES PARTIE<br />DE L'HISTOIRE
          </h2>
          <p className="text-fifa-mid font-body text-[0.9rem] leading-relaxed mb-10">
            Rejoignez des millions de fans pour le plus grand événement sportif de la planète.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/tickets"
              className="bg-fifa-black text-white font-body font-bold text-[0.78rem] tracking-wide px-9 py-4 rounded-full hover:bg-gold transition-colors duration-200">
              Acheter des billets
            </a>
            <a href="/fans"
              className="border border-fifa-border text-fifa-black font-body font-medium text-[0.78rem] px-9 py-4 rounded-full hover:border-fifa-black transition-colors">
              Zone Fan
            </a>
            <a href="/hospitality"
              className="border border-fifa-border text-fifa-black font-body font-medium text-[0.78rem] px-9 py-4 rounded-full hover:border-fifa-black transition-colors">
              Hospitalité VIP
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}