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
  "Coupe du Monde FIFA 2026™ : J-X avant le coup d'envoi au Mexique",
  "Estadio Azteca prêt pour l'ouverture : Mexique vs Équateur le 11 juin",
  "Billets Phase Finale : le MetLife Stadium affiche complet pour le 19 juillet",
  "FIFA 2026 : diffusion mondiale assurée dans 210 pays",
  "48 nations · 104 matchs · 3 pays hôtes · 11 juin – 19 juillet 2026",
];

// ─── NEWS ─────────────────────────────────────────────────────
export const NEWS_FEATURED = {
  tag:   "Sélection",
  title: "Bienvenue pour la Coupe du Monde de la FIFA 2026™",
  desc:  "Le monde s'apprête à vibrer au rythme de la plus grande Coupe du Monde de l'histoire en Amérique du Nord.",
  date:  "22 Avr 2026",
  img:   IMG.final,
};

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

// ─── GROUPS ───────────────────────────────────────────────────
export const GROUPS = [
  {
    name:"Groupe A",
    teams:[
      { pos:1, team:"USA",      code:"us", pld:"—", gd:"—", pts:"—" },
      { pos:2, team:"Panama",   code:"pa", pld:"—", gd:"—", pts:"—" },
      { pos:3, team:"Albanie",  code:"al", pld:"—", gd:"—", pts:"—" },
      { pos:4, team:"Ukraine",  code:"ua", pld:"—", gd:"—", pts:"—" },
    ],
  },
  {
    name:"Groupe B",
    teams:[
      { pos:1, team:"Mexique",  code:"mx", pld:"—", gd:"—", pts:"—" },
      { pos:2, team:"Équateur", code:"ec", pld:"—", gd:"—", pts:"—" },
      { pos:3, team:"Jamaïque", code:"jm", pld:"—", gd:"—", pts:"—" },
      { pos:4, team:"Venezuela",code:"ve", pld:"—", gd:"—", pts:"—" },
    ],
  },
  {
    name:"Groupe C",
    teams:[
      { pos:1, team:"Canada",   code:"ca", pld:"—", gd:"—", pts:"—" },
      { pos:2, team:"Maroc",    code:"ma", pld:"—", gd:"—", pts:"—" },
      { pos:3, team:"Belgique", code:"be", pld:"—", gd:"—", pts:"—" },
      { pos:4, team:"Honduras", code:"hn", pld:"—", gd:"—", pts:"—" },
    ],
  },
];

export const TOP_SCORERS = [
  { player:"Kylian Mbappé", team:"France",     code:"fr", goals:0, assists:0 },
  { player:"Lionel Messi",  team:"Argentine",  code:"ar", goals:0, assists:0 },
  { player:"Vinicius Jr.",  team:"Brésil",     code:"br", goals:0, assists:0 },
  { player:"Christian Pulisic", team:"USA",    code:"us", goals:0, assists:0 },
  { player:"S. Giménez",    team:"Mexique",    code:"mx", goals:0, assists:0 },
];

// ─── FIFA 2026 host nations: USA · Mexico · Canada
export const HOST_CITIES = [
  { city:"USA",      country:"Nation hôte · 11 villes", code:"us", bg:"#002868" },
  { city:"Mexique",  country:"Nation hôte · 3 villes",  code:"mx", bg:"#006847" },
  { city:"Canada",   country:"Nation hôte · 2 villes",  code:"ca", bg:"#FF0000" },
];

// ─── COUNTDOWN ────────────────────────────────────────────────
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

export function getCode(team) {
  if (!team) return null;
  const normalized = team.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return CODES[team] || CODES[normalized] || null;
}
// ─── MATCHES ──────────────────────────────────────────────────
export const MATCHES = [
  {
    id: 1,
    stage: "group", group_name: "Groupe B",
    home_team: "Mexique",    away_team: "Équateur",
    match_date: "2026-06-11", match_time: "19:00",
    venue: "Estadio Azteca", city: "Mexico City",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 2,
    stage: "group", group_name: "Groupe A",
    home_team: "USA",        away_team: "Panama",
    match_date: "2026-06-12", match_time: "21:00",
    venue: "SoFi Stadium", city: "Los Angeles",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 3,
    stage: "group", group_name: "Groupe C",
    home_team: "Canada",     away_team: "Belgique",
    match_date: "2026-06-13", match_time: "18:00",
    venue: "BC Place", city: "Vancouver",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 4,
    stage: "group", group_name: "Groupe D",
    home_team: "Espagne",    away_team: "Brésil",
    match_date: "2026-06-14", match_time: "21:00",
    venue: "MetLife Stadium", city: "New York",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 5,
    stage: "group", group_name: "Groupe E",
    home_team: "France",     away_team: "Argentine",
    match_date: "2026-06-15", match_time: "21:00",
    venue: "AT&T Stadium", city: "Dallas",
    status: "upcoming", home_score: null, away_score: null,
  },
  {
    id: 6,
    stage: "group", group_name: "Groupe F",
    home_team: "Allemagne",  away_team: "Portugal",
    match_date: "2026-06-16", match_time: "18:00",
    venue: "Gillette Stadium", city: "Boston",
    status: "upcoming", home_score: null, away_score: null,
  },
];