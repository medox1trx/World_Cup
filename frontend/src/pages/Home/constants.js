// ─── COLORS (black & white only — no gold) ───────────────────
export const C = {
    black:   "#0d0d0d",
    white:   "#ffffff",
    red:     "#c8102e",
    gray:    "#f5f5f5",
    border:  "#e8e8e8",
    mid:     "#8a8a8a",
    muted:   "rgba(255,255,255,0.45)",
  };
  
  // ─── FONTS ────────────────────────────────────────────────────
  export const FONT = {
    display: "'Barlow Condensed', sans-serif",
    body:    "'Barlow', sans-serif",
  };
  
  // ─── COUNTRY CODES ────────────────────────────────────────────
  export const CODES = {
    Brazil:"br", France:"fr", Germany:"de", Argentina:"ar",
    Spain:"es", England:"gb", Portugal:"pt", Morocco:"ma",
    USA:"us", Mexico:"mx", Italy:"it", Japan:"jp",
    Netherlands:"nl", Belgium:"be", Croatia:"hr", Uruguay:"uy",
    Colombia:"co", Senegal:"sn", Australia:"au", "South Korea":"kr",
    Switzerland:"ch", Serbia:"rs", Canada:"ca", Ecuador:"ec",
    Qatar:"qa", Iran:"ir", Poland:"pl", Denmark:"dk",
    Tunisia:"tn", Cameroon:"cm", "Saudi Arabia":"sa",
    "South Africa":"za", Egypt:"eg", Nigeria:"ng", Algeria:"dz",
    Brésil:"br", France:"fr", Argentine:"ar", Espagne:"es",
    Angleterre:"gb", Maroc:"ma", Colombie:"co", Japon:"jp",
    Mexique:"mx",
  };
  
  export const STAGE_LABEL = {
    group:"Groupe", round_of_16:"8es",
    quarter:"Quarts", semi:"Demi", final:"FINALE",
  };
  
  // ─── STATIC DATA ──────────────────────────────────────────────
  export const TICKER_ITEMS = [
    "Tirage au sort FIFA 2030 : groupes confirmés — France, Maroc, Argentine parmi les favoris",
    "Stade Hassan II homologué : 115 000 places pour la finale à Rabat",
    "Billets Phase 2 : plus de 8 millions de demandes en 48 heures",
    "FIFA 2030 : diffusion assurée dans 210 pays partenaires",
    "48 équipes · 104 matchs · 6 nations hôtes · 11 juin – 19 juillet 2030",
  ];
  
  export const NEWS_FEATURED = {
    tag: "Sélection",
    title: "Bienvenue pour le Tirage au Sort de la Coupe du Monde de la FIFA 2030™",
    desc: "Le tirage au sort historique de la Coupe du Monde FIFA 2030 a été effectué, révélant les 16 groupes.",
    date: "14 Mar 2026",
    img: "ma",
  };
  
  export const NEWS_SIDE = [
    { tag:"Stades",  title:"Le Stade Hassan II de Rabat officiellement homologué par la FIFA",      date:"13 Mar 2026", img:"ma" },
    { tag:"Équipes", title:"Le Maroc dévoile son effectif élargi de 30 joueurs pour la compétition", date:"12 Mar 2026", img:"fr" },
    { tag:"Billets", title:"Phase 2 — 8 millions de demandes enregistrées en 48 heures",             date:"10 Mar 2026", img:"ar" },
    { tag:"Médias",  title:"Droits TV : accord mondial avec 210 pays partenaires officiels",          date:"9 Mar 2026",  img:"gb" },
  ];
  
  export const NEWS_MORE = [
    { tag:"Formation",   title:"La FIFA lance un programme mondial d'entraîneurs pour la jeunesse",       date:"8 Mar 2026" },
    { tag:"Durabilité",  title:"FIFA 2030 : objectif zéro émission carbone pour les six nations hôtes",   date:"7 Mar 2026" },
    { tag:"Technologie", title:"VAR nouvelle génération déployée dans tous les stades officiels 2030",     date:"6 Mar 2026" },
  ];
  
  export const GROUPS = [
    {
      name:"Groupe A",
      teams:[
        { pos:1, team:"France",   code:"fr", pld:3, w:3, d:0, l:0, gd:"+7", pts:9,  q:true  },
        { pos:2, team:"Maroc",    code:"ma", pld:3, w:2, d:0, l:1, gd:"+3", pts:6,  q:true  },
        { pos:3, team:"Colombie", code:"co", pld:3, w:1, d:0, l:2, gd:"-2", pts:3,  q:false },
        { pos:4, team:"Japon",    code:"jp", pld:3, w:0, d:0, l:3, gd:"-8", pts:0,  q:false },
      ],
    },
    {
      name:"Groupe B",
      teams:[
        { pos:1, team:"Brésil",    code:"br", pld:3, w:2, d:1, l:0, gd:"+5", pts:7, q:true  },
        { pos:2, team:"Argentine", code:"ar", pld:3, w:2, d:0, l:1, gd:"+4", pts:6, q:true  },
        { pos:3, team:"USA",       code:"us", pld:3, w:1, d:0, l:2, gd:"-3", pts:3, q:false },
        { pos:4, team:"Mexique",   code:"mx", pld:3, w:0, d:1, l:2, gd:"-6", pts:1, q:false },
      ],
    },
    {
      name:"Groupe C",
      teams:[
        { pos:1, team:"Espagne",    code:"es", pld:3, w:3, d:0, l:0, gd:"+6", pts:9, q:true  },
        { pos:2, team:"Angleterre", code:"gb", pld:3, w:1, d:1, l:1, gd:"+1", pts:4, q:true  },
        { pos:3, team:"Portugal",   code:"pt", pld:3, w:1, d:1, l:1, gd:"0",  pts:4, q:false },
        { pos:4, team:"Sénégal",    code:"sn", pld:3, w:0, d:0, l:3, gd:"-7", pts:0, q:false },
      ],
    },
  ];
  
  export const TOP_SCORERS = [
    { player:"Kylian Mbappé", team:"France",     code:"fr", goals:6, assists:3 },
    { player:"Vinicius Jr.",  team:"Brésil",     code:"br", goals:5, assists:4 },
    { player:"A. Hakimi",     team:"Maroc",      code:"ma", goals:4, assists:2 },
    { player:"Lionel Messi",  team:"Argentine",  code:"ar", goals:4, assists:5 },
    { player:"Harry Kane",    team:"Angleterre", code:"gb", goals:3, assists:1 },
  ];
  
  export const HOST_CITIES = [
    { city:"Atlanta",      country:"États-Unis", code:"us", bg:"#1a1a2e" },
    { city:"Boston",       country:"États-Unis", code:"us", bg:"#1e1e1e" },
    { city:"Dallas",       country:"États-Unis", code:"us", bg:"#0f1f0f" },
    { city:"Guadalajara",  country:"Mexique",    code:"mx", bg:"#0f2010" },
    { city:"Kansas City",  country:"États-Unis", code:"us", bg:"#1a0a1a" },
    { city:"Los Angeles",  country:"États-Unis", code:"us", bg:"#1a1200" },
    { city:"Miami",        country:"États-Unis", code:"us", bg:"#1a0d00" },
    { city:"Rabat",        country:"Maroc",      code:"ma", bg:"#1f0505" },
    { city:"Madrid",       country:"Espagne",    code:"es", bg:"#1a0000" },
    { city:"Buenos Aires", country:"Argentine",  code:"ar", bg:"#001525" },
    { city:"Lisbonne",     country:"Portugal",   code:"pt", bg:"#001500" },
    { city:"Johannesburg", country:"Afr. du Sud",code:"za", bg:"#001510" },
  ];
  
  // ─── COUNTDOWN ────────────────────────────────────────────────
  export const WC_DATE = new Date("2030-06-11T16:00:00Z");
  
  export function getTimeLeft() {
    const d = WC_DATE - new Date();
    if (d <= 0) return { days:0, hours:0, minutes:0, seconds:0 };
    return {
      days:    Math.floor(d / 86400000),
      hours:   Math.floor((d % 86400000) / 3600000),
      minutes: Math.floor((d % 3600000) / 60000),
      seconds: Math.floor((d % 60000) / 1000),
    };
  }
  
  export function getCode(team) {
    return CODES[team] || null;
  }