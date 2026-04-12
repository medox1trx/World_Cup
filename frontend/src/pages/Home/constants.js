// ─── COLORS ───────────────────────────────────────────────────
export const C = {
  black:  "#0d0d0d",
  white:  "#ffffff",
  red:    "#c8102e",
  gray:   "#f5f5f5",
  border: "#e8e8e8",
  mid:    "#8a8a8a",
  muted:  "rgba(255,255,255,0.45)",
};

// ─── FONTS ────────────────────────────────────────────────────
export const FONT = {
  display: "'Barlow Condensed', sans-serif",
  body:    "'Barlow', sans-serif",
};

// ─── COUNTRY CODES ────────────────────────────────────────────
export const CODES = {
  Brazil:"br", France:"fr", Germany:"de", Argentina:"ar",
  Allemagne:"de", Italie:"it",
  Spain:"es", England:"gb", Portugal:"pt", Morocco:"ma",
  USA:"us", Mexico:"mx", Italy:"it", Japan:"jp",
  Netherlands:"nl", Belgium:"be", Croatia:"hr", Uruguay:"uy",
  Colombia:"co", Senegal:"sn", Australia:"au", "South Korea":"kr",
  Switzerland:"ch", Serbia:"rs", Canada:"ca", Ecuador:"ec",
  Qatar:"qa", Iran:"ir", Poland:"pl", Denmark:"dk",
  Tunisia:"tn", Cameroon:"cm", "Saudi Arabia":"sa",
  "South Africa":"za", Egypt:"eg", Nigeria:"ng", Algeria:"dz",
  Brésil:"br", Argentine:"ar", Espagne:"es",
  Angleterre:"gb", Maroc:"ma", Colombie:"co", Japon:"jp",
  Mexique:"mx", Brazil:"br", Cameroon:"cm", 
  Morocco:"ma", France:"fr", Spain:"es", England:"gb",
};

export const STAGE_LABEL = {
  group:"Groupe", round_of_16:"8es",
  quarter:"Quarts", semi:"Demi", final:"FINALE",
};

// ─── IMAGE POOL (picsum.photos — always works, no hotlink block) ───
// Named seeds give consistent images across renders
const IMG = {
  final:   "https://www.atalayar.com/media/atalayar/images/2023/10/19/2023101911255391424.jpg",
  crowd:   "https://th.bing.com/th/id/OIP.rbZyi8bjd3WckIuKKaz9VwHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
  trophy:  "https://www.saurenergy.me/wp-content/uploads/2022/11/front-21.png",
  pitch:   "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/EB57/production/_128074206_bbcm_world-cup_final-front-page_composite.jpg",
  fans:    "https://editorial01.shutterstock.com/wm-preview-1500/9762843o/a38d997b/Shutterstock_9762843o.jpg",
  stadium: "https://moroccan-culture.com/wp-content/uploads/2025/05/Grand-Stade-Hassan-II-1.png",
  stadium2: "https://images.indianexpress.com/2025/12/fifa-var-word-cup.jpg",
  ball:    "https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/sport/foot-zidane-en-lice-pour-le-titre-de-meilleur-entraineur-fifa-de-lannee-3413477/43736945-1-fre-FR/Foot-Zidane-en-lice-pour-le-titre-de-meilleur-entraineur-Fifa-de-l-annee.jpg",
};

// ─── TICKER ───────────────────────────────────────────────────
export const TICKER_ITEMS = [
  "Tirage au sort FIFA 2030 : groupes confirmés — France, Maroc, Argentine parmi les favoris",
  "Stade Hassan II homologué : 115 000 places pour la finale à Rabat",
  "Billets Phase 2 : plus de 8 millions de demandes en 48 heures",
  "FIFA 2030 : diffusion assurée dans 210 pays partenaires",
  "48 équipes · 104 matchs · 6 nations hôtes · 11 juin – 19 juillet 2030",
];

// ─── NEWS ─────────────────────────────────────────────────────
export const NEWS_FEATURED = {
  tag:   "Sélection",
  title: "Bienvenue pour le Tirage au Sort de la Coupe du Monde de la FIFA 2030™",
  desc:  "Le tirage au sort historique de la Coupe du Monde FIFA 2030 a été effectué, révélant les 16 groupes.",
  date:  "14 Mar 2026",
  img:   IMG.final,
};

export const NEWS_SIDE = [
  { tag:"Stades",  title:"Le Stade Hassan II de Rabat officiellement homologué par la FIFA",       date:"13 Mar 2026", img: IMG.stadium },
  { tag:"Équipes", title:"Le Maroc dévoile son effectif élargi de 30 joueurs pour la compétition",  date:"12 Mar 2026", img: IMG.crowd   },
  { tag:"Billets", title:"Phase 2 — 8 millions de demandes enregistrées en 48 heures",              date:"10 Mar 2026", img: IMG.fans    },
  { tag:"Médias",  title:"Droits TV : accord mondial avec 210 pays partenaires officiels",           date:"9 Mar 2026",  img: IMG.pitch   },
];

export const NEWS_MORE = [
  { tag:"Formation",   title:"La FIFA lance un programme mondial d'entraîneurs pour la jeunesse",     date:"8 Mar 2026", img: IMG.ball    },
  { tag:"Durabilité",  title:"FIFA 2030 : objectif zéro émission carbone pour les six nations hôtes", date:"7 Mar 2026", img: IMG.trophy  },
  { tag:"Technologie", title:"VAR nouvelle génération déployée dans tous les stades officiels 2030",   date:"6 Mar 2026", img: IMG.stadium2 },
];

// ─── GROUPS ───────────────────────────────────────────────────
export const GROUPS = [
  {
    name:"Groupe A",
    teams:[
      { pos:1, team:"France",   code:"fr", pld:"—", gd:"—", pts:"—" },
      { pos:2, team:"Maroc",    code:"ma", pld:"—", gd:"—", pts:"—" },
      { pos:3, team:"Colombie", code:"co", pld:"—", gd:"—", pts:"—" },
      { pos:4, team:"Japon",    code:"jp", pld:"—", gd:"—", pts:"—" },
    ],
  },
  {
    name:"Groupe B",
    teams:[
      { pos:1, team:"Brésil",    code:"br", pld:"—", gd:"—", pts:"—" },
      { pos:2, team:"Argentine", code:"ar", pld:"—", gd:"—", pts:"—" },
      { pos:3, team:"USA",       code:"us", pld:"—", gd:"—", pts:"—" },
      { pos:4, team:"Mexique",   code:"mx", pld:"—", gd:"—", pts:"—" },
    ],
  },
  {
    name:"Groupe C",
    teams:[
      { pos:1, team:"Espagne",    code:"es", pld:"—", gd:"—", pts:"—" },
      { pos:2, team:"Angleterre", code:"gb", pld:"—", gd:"—", pts:"—" },
      { pos:3, team:"Portugal",   code:"pt", pld:"—", gd:"—", pts:"—" },
      { pos:4, team:"Sénégal",    code:"sn", pld:"—", gd:"—", pts:"—" },
    ],
  },
];

export const TOP_SCORERS = [
  { player:"Kylian Mbappé", team:"France",     code:"fr", goals:0, assists:0 },
  { player:"Vinicius Jr.",  team:"Brésil",     code:"br", goals:0, assists:0 },
  { player:"A. Hakimi",     team:"Maroc",      code:"ma", goals:0, assists:0 },
  { player:"Lionel Messi",  team:"Argentine",  code:"ar", goals:0, assists:0 },
  { player:"Harry Kane",    team:"Angleterre", code:"gb", goals:0, assists:0 },
];

// ─── FIFA 2030 correct host nations: Spain · Portugal · Morocco
export const HOST_CITIES = [
  { city:"Maroc",    country:"Nation hôte · 6 villes", code:"ma", bg:"#8B0000" },
  { city:"Espagne",  country:"Nation hôte · 6 villes", code:"es", bg:"#AA151B" },
  { city:"Portugal", country:"Nation hôte · 2 villes", code:"pt", bg:"#006600" },
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
  if (!team) return null;
  const normalized = team.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return CODES[team] || CODES[normalized] || null;
}
// ─── MATCHES ──────────────────────────────────────────────────
export const MATCHES = [
  {
    id: 1,
    stage: "group", group_name: "Groupe A",
    home_team: "Brésil",    away_team: "France",
    match_date: "2030-06-11", match_time: "18:00",
    venue: "Stade Hassan II", city: "Rabat",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 2,
    stage: "group", group_name: "Groupe B",
    home_team: "Allemagne",  away_team: "Argentine",
    match_date: "2030-06-12", match_time: "15:00",
    venue: "Santiago Bernabéu", city: "Madrid",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 3,
    stage: "group", group_name: "Groupe C",
    home_team: "Espagne",    away_team: "Angleterre",
    match_date: "2030-06-12", match_time: "21:00",
    venue: "Camp Nou", city: "Barcelone",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 4,
    stage: "group", group_name: "Groupe C",
    home_team: "Portugal",   away_team: "Maroc",
    match_date: "2030-06-13", match_time: "18:00",
    venue: "Estádio da Luz", city: "Lisbonne",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 5,
    stage: "group", group_name: "Groupe B",
    home_team: "USA",        away_team: "Mexique",
    match_date: "2030-06-13", match_time: "20:00",
    venue: "Stade de Séville", city: "Séville",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 6,
    stage: "group", group_name: "Groupe A",
    home_team: "Italie",     away_team: "Japon",
    match_date: "2030-06-14", match_time: "18:00",
    venue: "Stade San Mamés", city: "Bilbao",
    status: "upcoming", home_score: null, away_score: null,
  },
];