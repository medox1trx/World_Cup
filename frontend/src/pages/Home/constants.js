// ─── COLORS ───────────────────────────────────────────────────
export const C = {
  black:  "#0d0d0d",
  white:  "#ffffff",
  red:    "#0d0d0d", // Monochromatic reset
  gray:   "#f5f5f5",
  border: "#e8e8e8",
  mid:    "#8a8a8a",
  muted:  "rgba(255,255,255,0.45)",
};

// ─── FONTS ────────────────────────────────────────────────────
export const FONT = {
  display: "'Bebas Neue', sans-serif",
  body:    "'DM Sans', sans-serif",
};

// ─── COUNTRY CODES ────────────────────────────────────────────
export const CODES = {
  USA: "us", Mexico: "mx", Canada: "ca",
  Brazil: "br", Argentina: "ar", France: "fr",
  Germany: "de", Spain: "es", England: "gb",
  Portugal: "pt", Morocco: "ma", Italy: "it",
  Japan: "jp", Netherlands: "nl", Belgium: "be",
  Croatia: "hr", Uruguay: "uy", Colombia: "co",
  Senegal: "sn", Australia: "au", "South Korea": "kr",
  Switzerland: "ch", Serbia: "rs", Denmark: "dk",
  Cameroon: "cm", "Saudi Arabia": "sa", Egypt: "eg",
  Nigeria: "ng", Algeria: "dz", Turkey: "tr",
  Panama: "pa", Albania: "al", Ukraine: "ua",
  Ecuador: "ec", Jamaica: "jm", Venezuela: "ve",
  Honduras: "hn", Iran: "ir", Peru: "pe",
  "Ivory Coast": "ci", Paraguay: "py",
  Qatar: "qa", Bolivia: "bo", Chile: "cl",
  "Costa Rica": "cr", Ghana: "gh", Iraq: "iq",
  "New Zealand": "nz", "South Africa": "za", "Czechia": "cz",
  "Bosnia and Herzegovina": "ba", "Haiti": "ht", "Scotland": "gb-sct",
  "Curacao": "cw", "Sweden": "se", "Tunisia": "tn",
  "Cape Verde": "cv", "Norway": "no", "Austria": "at",
  "Jordan": "jo", "DR Congo": "cd", "Uzbekistan": "uz",
};

export const STAGE_LABEL = {
  group: "Groupe", 
  round_of_32: "16es",
  round_of_16: "8es",
  quarter: "Quarts", 
  semi: "Demi", 
  final: "FINALE",
};

// ─── IMAGE POOL ───
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
  "Coupe du Monde FIFA 2026™ : 48 nations prêtes pour l'histoire",
  "Estadio Azteca : coup d'envoi le 11 juin 2026",
  "104 matchs, 16 villes, 3 nations : l'Amérique du Nord unie par le football",
  "FIFA World Cup 2026 : une fête mondiale sans précédent",
];

// ─── NEWS ─────────────────────────────────────────────────────
export const NEWS_FEATURED = {
  tag:   "FIFA 2026",
  title: "Bienvenue dans l'ère de la Coupe du Monde à 48 nations",
  desc:  "Découvrez le format élargi et les villes qui accueilleront le plus grand événement sportif de la planète.",
  date:  "01 Mai 2026",
  img:   IMG.final,
};

// ─── GROUPS (Static Fallback) ──────────────────────────────────
export const GROUPS = [
  {
    name:"Groupe A",
    teams:[
      { pos:1, team:"USA", code:"us", pld:"0", gd:"0", pts:"0" },
      { pos:2, team:"Panama", code:"pa", pld:"0", gd:"0", pts:"0" },
      { pos:3, team:"Albania", code:"al", pld:"0", gd:"0", pts:"0" },
      { pos:4, team:"Ukraine", code:"ua", pld:"0", gd:"0", pts:"0" },
    ],
  },
  {
    name:"Groupe B",
    teams:[
      { pos:1, team:"Mexico", code:"mx", pld:"0", gd:"0", pts:"0" },
      { pos:2, team:"Ecuador", code:"ec", pld:"0", gd:"0", pts:"0" },
      { pos:3, team:"Jamaica", code:"jm", pld:"0", gd:"0", pts:"0" },
      { pos:4, team:"Venezuela", code:"ve", pld:"0", gd:"0", pts:"0" },
    ],
  },
];

// ─── HOST CITIES ──────────────────────────────────────────────
export const HOST_CITIES = [
  { city:"USA", country:"11 Villes Hôtes", code:"us", bg: "#111111" },
  { city:"Mexico", country:"3 Villes Hôtes", code:"mx", bg: "#1a1a1a" },
  { city:"Canada", country:"2 Villes Hôtes", code:"ca", bg: "#222222" },
];

export const WC_DATE = new Date("2026-06-11T19:00:00Z");

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

export const NEWS_SIDE = [
  { tag:"Stades",  title:"Le SoFi Stadium de Los Angeles prêt pour les grands rendez-vous",       date:"21 Avr 2026", img: IMG.stadium },
  { tag:"Équipes", title:"Le Mexique dévoile son effectif pour le match d'ouverture",             date:"20 Avr 2026", img: IMG.crowd   },
  { tag:"Billets", title:"Phase finale : record de ventes pour les matchs à New York",            date:"19 Avr 2026", img: IMG.fans    },
  { tag:"Médias",  title:"Technologie : la VAR 2.0 sera déployée dans les 16 stades hôtes",       date:"18 Avr 2026", img: IMG.pitch   },
];

export const NEWS_MORE = [
  { tag:"Formation",   title:"Programme FIFA Grassroots : l'héritage de 2026 commence maintenant",     date:"17 Avr 2026", img: IMG.ball    },
  { tag:"Durabilité",  title:"Objectif Zéro Carbone : l'engagement des trois nations hôtes pour 2026", date:"16 Avr 2026", img: IMG.trophy  },
  { tag:"Sécurité",    title:"Dispositif de sécurité renforcé pour les 104 matchs de la compétition", date:"15 Avr 2026", img: IMG.stadium2 },
];

export const TOP_SCORERS = [
  { player:"Kylian Mbappé", team:"France",     code:"fr", goals:0, assists:0 },
  { player:"Lionel Messi",  team:"Argentina",  code:"ar", goals:0, assists:0 },
  { player:"Vinicius Jr.",  team:"Brazil",     code:"br", goals:0, assists:0 },
  { player:"Christian Pulisic", team:"USA",    code:"us", goals:0, assists:0 },
  { player:"S. Giménez",    team:"Mexico",     code:"mx", goals:0, assists:0 },
];

export const MATCHES = [
  {
    id: 1,
    stage: "group", group_name: "Groupe B",
    team1: "Mexico",     team2: "Ecuador",
    match_date: "2026-06-11", match_time: "19:00",
    venue: "Estadio Azteca", city: "Mexico City",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 2,
    stage: "group", group_name: "Groupe A",
    team1: "USA",        team2: "Panama",
    match_date: "2026-06-12", match_time: "21:00",
    venue: "SoFi Stadium", city: "Los Angeles",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 3,
    stage: "group", group_name: "Groupe C",
    team1: "Canada",     team2: "Belgium",
    match_date: "2026-06-13", match_time: "18:00",
    venue: "BC Place", city: "Vancouver",
    status: "upcoming", home_score: null, away_score: null,
  },
];

export function getCode(team) {
  if (!team) return null;
  if (typeof team === 'object' && team !== null) {
    if (team.flag_url) return team.flag_url;
    if (team.country?.flag_url) return team.country.flag_url;
    if (team.code) return team.code;
    if (team.country?.code) return team.country.code;
    if (team.flag) return team.flag;
    if (team.name) team = team.name;
    else return null;
  }
  if (typeof team !== 'string') return null;
  const normalized = team.trim();
  return CODES[normalized] || null;
}