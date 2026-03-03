import { useEffect, useState, useMemo } from "react";

// ─── Mock Data (replace fetch with real API) ─────────────────────────────────
const MOCK_ARTICLES = [
  {
    id: 1,
    title: "Morocco Stuns Argentina in Historic Quarter-Final Showdown",
    description: "In a breathtaking match at the Lusail Stadium, Morocco's Atlas Lions delivered a stunning performance to defeat the reigning champions Argentina 2-1, sending shockwaves through the football world.",
    content: "In a breathtaking match at the Lusail Stadium, Morocco's Atlas Lions delivered a stunning performance to defeat Argentina 2-1. The match began cautiously, with Argentina's Messi pulling strings in midfield. However, Morocco's disciplined defense stifled every attempt. Hakimi's brilliant free-kick in the 34th minute opened the scoring, followed by an own goal from Romero in the 67th minute. Despite a late Messi penalty, Morocco held firm to seal their historic victory. The scenes of celebration back in Casablanca were unmatched — millions flooded the streets in a sea of red and green.",
    urlToImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    url: "#",
    publishedAt: "2025-03-01T18:30:00Z",
    author: "Youssef El Fassi",
    category: "Match Reports",
    tags: ["#Maroc", "#PhaseDeGroupes", "#AtlasLions", "#FIFAWorldCup"],
    featured: true,
  },
  {
    id: 2,
    title: "Brazil's New Generation Ready to Reclaim the Trophy",
    description: "With Endrick leading the charge alongside veteran Vinicius Jr., Brazil's Seleção enters the tournament brimming with confidence and a renewed attacking philosophy under new coach Ancelotti.",
    content: "Brazil's pre-tournament preparations have gone smoothly, with Endrick earning rave reviews in training. Vinicius Jr. looks sharp after a strong La Liga season. Ancelotti's 4-3-3 system seems tailor-made for Brazil's technical players. The squad is deep, balanced, and hungry for their sixth World Cup title.",
    urlToImage: "https://images.unsplash.com/photo-1551958219-acbc595b48d6?w=800&q=80",
    url: "#",
    publishedAt: "2025-02-28T10:00:00Z",
    author: "Carlos Mendes",
    category: "Team News",
    tags: ["#Brazil", "#Seleção", "#Endrick", "#ViniciusJr"],
    featured: false,
  },
  {
    id: 3,
    title: "Bellingham Ruled Out of Opener After Ankle Setback",
    description: "England's talisman Jude Bellingham has been confirmed as a doubt for the opening group stage match after suffering a minor ankle sprain during training in Doha.",
    content: "England's medical staff remain cautiously optimistic about Bellingham's recovery. The midfielder rolled his ankle during a routine training drill on Monday. Scans show no ligament damage, but he will be monitored daily. Manager Gareth Southgate said he won't rush his star player back.",
    urlToImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    url: "#",
    publishedAt: "2025-02-27T14:15:00Z",
    author: "Sarah Mitchell",
    category: "Injury Updates",
    tags: ["#England", "#Bellingham", "#ThreeLions", "#InjuryNews"],
    featured: false,
  },
  {
    id: 4,
    title: "France Squad Depth the Envy of Every Nation",
    description: "Les Bleus boast arguably the most complete squad at the tournament, with world-class talent across every position and a bench that most nations would be proud to start.",
    content: "France's squad depth is extraordinary. With Mbappé, Giroud, Griezmann, Camavinga, and Tchouaméni all in peak form, Deschamps has an embarrassment of riches. The defensive unit, marshaled by Varane and Upamecano, conceded only twice in qualifying. Maignan in goal is arguably the best in the world right now.",
    urlToImage: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80",
    url: "#",
    publishedAt: "2025-02-26T09:00:00Z",
    author: "Pierre Dupont",
    category: "Team News",
    tags: ["#France", "#LesBleues", "#Mbappe", "#WorldCup2026"],
    featured: false,
  },
  {
    id: 5,
    title: "Group D Preview: The Group of Death Returns",
    description: "Germany, Spain, Japan, and Senegal are drawn together in what pundits are already calling the most competitive group of the tournament. Every match could be decisive.",
    content: "Group D lives up to its fearsome reputation. Germany, rebuilt under Nagelsmann, arrive hungry after missing out in 2022. Spain's tiki-taka revival under De La Fuente has been impressive. Japan's physical pressing game causes problems for anyone. Senegal, inspired by Sadio Mané, can't be underestimated. This group will produce drama from minute one.",
    urlToImage: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    url: "#",
    publishedAt: "2025-02-25T16:45:00Z",
    author: "Hans Weber",
    category: "Match Reports",
    tags: ["#Germany", "#Spain", "#Japan", "#Senegal", "#GroupD"],
    featured: false,
  },
  {
    id: 6,
    title: "Haaland Eyes Golden Boot as Norway Dark Horses",
    description: "Erling Haaland arrives at his first World Cup as the most feared striker on the planet. Norway, long outsiders, have built a team around their talisman and dream of a deep run.",
    content: "Haaland's stats this season are other-worldly: 47 goals in 44 appearances for Manchester City. Norway's qualification campaign was built on his back — 18 goals in 10 matches. Coach Ståle Solbakken has surrounded him with runners and creators. If Norway can keep clean sheets, Haaland could be the difference.",
    urlToImage: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80",
    url: "#",
    publishedAt: "2025-02-24T11:30:00Z",
    author: "Lars Andersen",
    category: "Team News",
    tags: ["#Norway", "#Haaland", "#GoldenBoot", "#WorldCup"],
    featured: false,
  },
];

const CATEGORIES = ["All", "Match Reports", "Team News", "Injury Updates"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function timeAgo(dateString) {
  const diff = (Date.now() - new Date(dateString)) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(dateString).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
  });
}

// Remove NewsAPI truncation artifacts — handles patterns like:
// "...text… [+2419 chars]"  or  "text… [+1369 chars]"  or  "text [+500 chars]"
function cleanContent(text) {
  if (!text) return "";
  return text
    .replace(/\.{0,3}\s*…?\s*\[\+\d+\s*chars?\]/gi, "")  // "… [+2419 chars]"
    .replace(/\s*\[\+\d+\s*chars?\]/gi, "")               // "[+1369 chars]" no ellipsis
    .replace(/\s*\[…\]/g, "")
    .replace(/…+$/, "")
    .replace(/\.{3,}$/, "")
    .trim();
}

// Check if raw NewsAPI content is truncated
function isTruncatedContent(text) {
  return /\[\+\d+\s*chars?\]/i.test(text || "");
}

// Auto-detect category from title/description keywords
function detectCategory(title = "", desc = "") {
  const text = (title + " " + desc).toLowerCase();
  if (/injur|hurt|doubt|ruled out|strain|sprain|fitness|knock|setback|absent|miss/.test(text)) return "Injury Updates";
  if (/squad|lineup|formation|signing|transfer|coach|manager|tactical|selection|team news|roster/.test(text)) return "Team News";
  if (/match|goal|score|defeat|beat|win|loss|draw|final|quarter|semi|group stage|result|fixture|kick.?off/.test(text)) return "Match Reports";
  return "Team News";
}

// Auto-generate tags from content keywords
function extractTags(title = "", desc = "") {
  const text = title + " " + desc;
  const found = [];
  const map = [
    [/\bmorocco|maroc\b/i, "#Maroc"],
    [/\bfrance\b/i, "#France"],
    [/\bbrazil\b/i, "#Brazil"],
    [/\bengland\b/i, "#England"],
    [/\bgermany\b/i, "#Germany"],
    [/\bspain\b/i, "#Spain"],
    [/\bargentina\b/i, "#Argentina"],
    [/\bjapan\b/i, "#Japan"],
    [/\bsenegal\b/i, "#Senegal"],
    [/\bnorway\b/i, "#Norway"],
    [/\bportugal\b/i, "#Portugal"],
    [/\bnetherlands\b/i, "#Netherlands"],
    [/\bgroup stage|phase de groupe/i, "#PhaseDeGroupes"],
    [/\bworld cup|worldcup/i, "#WorldCup2026"],
    [/\btransfer\b/i, "#Transfer"],
    [/\bgolden boot\b/i, "#GoldenBoot"],
    [/\bmbappe\b/i, "#Mbappe"],
    [/\bhaaland\b/i, "#Haaland"],
    [/\bbellingham\b/i, "#Bellingham"],
    [/\bmessi\b/i, "#Messi"],
  ];
  map.forEach(([regex, tag]) => { if (regex.test(text) && !found.includes(tag)) found.push(tag); });
  return found.slice(0, 5);
}

function isFootballArticle(title = "", description = "") {
  const text = (title + " " + description).toLowerCase();
  return /football|soccer|fifa|world cup|coupe du monde|premier league|la liga|bundesliga|serie a|ligue 1|champions league|europa league|goal|goalkeeper|striker|midfielder|defender|penalty|offside|transfer|matchday|kick.?off|hat.?trick|free.?kick|corner|red card|yellow card|VAR|pitch|stadium|squad|lineup|coach|manager|fixture|standings|league table|relegation|promotion|derby|el clasico|friendly|international|national team|ballon d.or|golden boot|clean sheet|assist|dribble|headers|possession|pressing|formation|tactics|substitut|brace|volley|overhead|bicycle kick/.test(text);
}

function normalizeArticle(a, index) {
  const title = (a.title || "Untitled").replace(/\s*-\s*[^-]+$/, "").trim(); // strip " - Source Name" suffix
  const description = cleanContent(a.description || a.desc || "");
  const rawContent = a.content || a.body || "";
  const truncated = isTruncatedContent(rawContent);
  const cleanedContent = cleanContent(rawContent);

  // Use description as content if API content is just a repeat of description or very short
  const content = cleanedContent.length > 80 ? cleanedContent : description;

  const category = a.category || detectCategory(title, description);
  const tags = (Array.isArray(a.tags) && a.tags.length > 0)
    ? a.tags
    : extractTags(title, description);

  // author can be null in NewsAPI — fall back to source.name
  const author = a.author || a.source?.name || "World Cup News";

  return {
    id: a.id || a.url || index,
    title,
    description,
    content,
    urlToImage: a.urlToImage || a.image || a.thumbnail || null,
    url: a.url || "#",
    publishedAt: a.publishedAt || a.published_at || a.date || new Date().toISOString(),
    author,
    sourceName: a.source?.name || null,
    category,
    tags,
    featured: index === 0,
    isTruncated: truncated,
    sourceUrl: a.url || null,
  };
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Barlow+Condensed:wght@500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f4f6fb;
    --surface: #ffffff;
    --surface2: #eef1f7;
    --border: rgba(0,0,0,0.08);
    --accent: #1a6ef5;
    --accent2: #0d4fc4;
    --gold: #1a6ef5;
    --gold2: #0d4fc4;
    --green: #12b76a;
    --red: #e53e3e;
    --text: #0f1724;
    --muted: #6b7a99;
    --tag-bg: rgba(26,110,245,0.08);
    --tag-hover: rgba(26,110,245,0.18);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'Barlow', sans-serif; overflow-x: hidden; }

  /* ── SCROLL REVEAL ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s cubic-bezier(.22,.68,0,1.2), transform 0.55s cubic-bezier(.22,.68,0,1.2);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-left {
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }

  /* ── HEADER ── */
  .header {
    position: sticky; top: 0; z-index: 100;
    background: rgba(244,246,251,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
    transition: box-shadow 0.3s, background 0.3s;
  }
  .header.scrolled {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    background: rgba(244,246,251,0.98);
  }
  .logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; letter-spacing: 2px;
    color: var(--accent);
    display: flex; align-items: center; gap: 10px;
    cursor: default;
    transition: transform 0.2s;
  }
  .logo:hover { transform: scale(1.03); }
  .logo span { color: var(--text); }
  .logo-badge {
    background: var(--accent); color: #fff;
    font-size: 10px; font-weight: 700; font-family: 'Barlow', sans-serif;
    padding: 2px 6px; border-radius: 3px; letter-spacing: 1px;
    text-transform: uppercase;
    animation: badge-pulse 3s ease-in-out infinite;
  }
  @keyframes badge-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(26,110,245,0.4); }
    50% { box-shadow: 0 0 0 5px rgba(26,110,245,0); }
  }
  .header-right { display: flex; align-items: center; gap: 12px; }

  /* ── SEARCH (old navbar - kept for fallback) ── */
  .search-wrap { position: relative; display: flex; align-items: center; }
  .search-icon { position: absolute; left: 12px; color: var(--muted); pointer-events: none; font-size: 15px; }
  .search-input {
    background: var(--surface2); border: 1px solid var(--border); border-radius: 30px;
    padding: 8px 16px 8px 36px; color: var(--text);
    font-family: 'Barlow', sans-serif; font-size: 14px; width: 220px;
    outline: none; transition: all 0.3s cubic-bezier(.4,0,.2,1);
  }
  .search-input::placeholder { color: var(--muted); }
  .search-input:focus { border-color: var(--accent); width: 280px; background: var(--surface); box-shadow: 0 0 0 3px rgba(26,110,245,0.1); }
  .search-clear { position: absolute; right: 12px; background: none; border: none; color: var(--muted); cursor: pointer; font-size: 14px; display: flex; align-items: center; transition: color 0.15s, transform 0.15s; }
  .search-clear:hover { color: var(--text); transform: rotate(90deg); }

  /* ── VIEW TOGGLE ── */
  .view-toggle { display: flex; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .view-btn {
    padding: 6px 10px; border: none; background: none;
    color: var(--muted); cursor: pointer; font-size: 14px;
    transition: all 0.2s; position: relative; overflow: hidden;
  }
  .view-btn::after {
    content: ''; position: absolute; inset: 0;
    background: var(--accent); opacity: 0;
    transform: scale(0); border-radius: 4px;
    transition: opacity 0.2s, transform 0.2s;
  }
  .view-btn:hover::after { opacity: 0.08; transform: scale(1); }
  .view-btn.active { background: var(--accent); color: #fff; }

  /* ── SECTION SEARCH ── */
  .section-search { padding: 28px 24px 0; }
  .section-search-wrap { position: relative; display: flex; align-items: center; max-width: 560px; }
  .section-search-icon { position: absolute; left: 16px; color: var(--muted); pointer-events: none; font-size: 16px; transition: color 0.2s; }
  .section-search-wrap:focus-within .section-search-icon { color: var(--accent); }
  .section-search-input {
    width: 100%; background: var(--surface); border: 1.5px solid var(--border);
    border-radius: 14px; padding: 12px 20px 12px 44px; color: var(--text);
    font-family: 'Barlow', sans-serif; font-size: 15px; outline: none;
    transition: all 0.3s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .section-search-input::placeholder { color: var(--muted); }
  .section-search-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(26,110,245,0.1), 0 4px 16px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }

  /* ── CATEGORY TABS ── */
  .category-bar { display: flex; gap: 6px; padding: 16px 24px 0; overflow-x: auto; scrollbar-width: none; }
  .category-bar::-webkit-scrollbar { display: none; }
  .cat-btn {
    padding: 7px 18px; border-radius: 30px; border: 1px solid var(--border);
    background: transparent; color: var(--muted);
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 500;
    letter-spacing: 0.5px; text-transform: uppercase; cursor: pointer;
    transition: all 0.25s cubic-bezier(.4,0,.2,1); white-space: nowrap;
    position: relative; overflow: hidden;
  }
  .cat-btn::before {
    content: ''; position: absolute; inset: 0; border-radius: 30px;
    background: var(--accent); opacity: 0; transform: scale(0.85);
    transition: opacity 0.25s, transform 0.25s;
    z-index: 0;
  }
  .cat-btn span { position: relative; z-index: 1; }
  .cat-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(26,110,245,0.15); }
  .cat-btn.active {
    background: var(--accent); color: #fff; border-color: var(--accent);
    font-weight: 700; box-shadow: 0 4px 16px rgba(26,110,245,0.3);
    transform: translateY(-1px);
  }

  /* ── MAIN LAYOUT ── */
  .main { max-width: 1320px; margin: 0 auto; padding: 0 24px 80px; }

  /* ── HERO ── */
  .hero {
    margin: 28px 0 36px; position: relative;
    border-radius: 20px; overflow: hidden; cursor: pointer;
    height: 480px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.12);
    transition: box-shadow 0.4s, transform 0.4s;
  }
  .hero:hover {
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    transform: translateY(-2px);
  }
  .hero-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.7s cubic-bezier(.4,0,.2,1);
    will-change: transform;
  }
  .hero:hover .hero-img { transform: scale(1.05); }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 55%, transparent 100%);
    transition: opacity 0.3s;
  }
  .hero:hover .hero-overlay { opacity: 0.9; }
  .hero-content {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 36px 40px;
    transform: translateY(4px);
    transition: transform 0.4s cubic-bezier(.4,0,.2,1);
  }
  .hero:hover .hero-content { transform: translateY(0); }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--red); color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 4px 10px;
    border-radius: 4px; margin-bottom: 14px;
    animation: pulse-badge 2s infinite;
  }
  @keyframes pulse-badge {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(229,62,62,0.5); }
    50% { opacity: 0.9; box-shadow: 0 0 0 6px rgba(229,62,62,0); }
  }
  .dot { width: 6px; height: 6px; background: #fff; border-radius: 50%; animation: dot-blink 1.5s infinite; }
  @keyframes dot-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px, 5vw, 52px);
    line-height: 1.05; letter-spacing: 1px; color: #fff; margin-bottom: 12px;
  }
  .hero-desc { font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.6; max-width: 680px; margin-bottom: 20px; }
  .hero-meta { display: flex; align-items: center; gap: 16px; font-size: 13px; color: rgba(255,255,255,0.65); }
  .hero-meta b { color: #fff; font-weight: 600; }
  .hero-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 14px; }

  /* ── TAGS ── */
  .tag {
    font-size: 12px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 500; letter-spacing: 0.3px;
    background: var(--tag-bg); color: var(--accent);
    padding: 3px 10px; border-radius: 20px;
    border: 1px solid rgba(26,110,245,0.2);
    cursor: pointer; transition: all 0.2s cubic-bezier(.4,0,.2,1);
    text-decoration: none; display: inline-block;
  }
  .tag:hover {
    background: var(--accent); color: #fff;
    border-color: var(--accent);
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 4px 12px rgba(26,110,245,0.25);
  }
  .tag:active { transform: scale(0.97); }

  /* ── SECTION HEADER ── */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 26px;
    letter-spacing: 1.5px; color: var(--text);
    display: flex; align-items: center; gap: 10px;
  }
  .section-title::after {
    content: ''; display: block; width: 30px; height: 3px;
    background: var(--accent); border-radius: 2px;
    animation: bar-grow 0.5s ease both;
  }
  @keyframes bar-grow { from { width: 0; opacity: 0; } to { width: 30px; opacity: 1; } }
  .results-count { font-size: 13px; color: var(--muted); font-family: 'Barlow Condensed', sans-serif; }

  /* ── GRID VIEW ── */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 22px; }

  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden; cursor: pointer;
    transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s, border-color 0.3s;
    display: flex; flex-direction: column;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    will-change: transform;
  }
  .card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 20px 50px rgba(26,110,245,0.14);
    border-color: rgba(26,110,245,0.35);
  }
  .card:active { transform: translateY(-2px) scale(0.99); }
  .card-img-wrap { position: relative; height: 200px; overflow: hidden; }
  .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(.4,0,.2,1); }
  .card:hover .card-img { transform: scale(1.08); }
  .card-cat-pill {
    position: absolute; top: 12px; left: 12px;
    background: rgba(255,255,255,0.92); color: var(--accent);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 4px 10px;
    border-radius: 4px; backdrop-filter: blur(6px);
    transition: background 0.2s, transform 0.2s;
  }
  .card:hover .card-cat-pill { background: var(--accent); color: #fff; transform: scale(1.05); }
  .card-body { padding: 18px 20px 20px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .card-title {
    font-family: 'Barlow', sans-serif; font-weight: 700;
    font-size: 16px; line-height: 1.4; color: var(--text);
    transition: color 0.2s;
  }
  .card:hover .card-title { color: var(--accent); }
  .card-desc { font-size: 13px; color: var(--muted); line-height: 1.55; flex: 1; }
  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 12px; margin-top: auto; border-top: 1px solid var(--border);
  }
  .card-meta { font-size: 12px; color: var(--muted); }
  .card-meta b { color: var(--text); }
  .read-more-btn {
    font-size: 12px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600; letter-spacing: 0.5px;
    color: var(--accent); background: var(--tag-bg);
    border: 1px solid rgba(26,110,245,0.2);
    padding: 5px 12px; border-radius: 20px;
    cursor: pointer; transition: all 0.2s cubic-bezier(.4,0,.2,1);
    position: relative; overflow: hidden;
  }
  .read-more-btn:hover {
    background: var(--accent); color: #fff;
    transform: translateX(3px);
    box-shadow: 0 4px 12px rgba(26,110,245,0.3);
  }
  .card-tags { display: flex; gap: 5px; flex-wrap: wrap; }

  /* ── LIST VIEW ── */
  .list { display: flex; flex-direction: column; gap: 14px; }
  .list-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; overflow: hidden;
    display: grid; grid-template-columns: 200px 1fr;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s, border-color 0.3s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    will-change: transform;
  }
  .list-card:hover {
    transform: translateX(6px);
    box-shadow: 0 8px 32px rgba(26,110,245,0.12);
    border-color: rgba(26,110,245,0.3);
  }
  .list-card:active { transform: translateX(2px); }
  .list-img { width: 100%; height: 140px; object-fit: cover; transition: transform 0.4s ease; }
  .list-card:hover .list-img { transform: scale(1.06); }
  .list-body { padding: 18px 22px; display: flex; flex-direction: column; gap: 6px; }
  .list-header { display: flex; align-items: center; gap: 10px; }
  .cat-pill {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; padding: 2px 8px;
    border-radius: 3px; background: var(--tag-bg); color: var(--accent);
    transition: all 0.2s;
  }
  .list-card:hover .cat-pill { background: var(--accent); color: #fff; }
  .list-title {
    font-weight: 700; font-size: 16px; line-height: 1.35; color: var(--text);
    transition: color 0.2s;
  }
  .list-card:hover .list-title { color: var(--accent); }
  .list-desc { font-size: 13px; color: var(--muted); line-height: 1.5; }
  .list-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 10px; }

  /* ── EMPTY STATE ── */
  .empty {
    text-align: center; padding: 80px 20px;
    display: flex; flex-direction: column; align-items: center; gap: 16px;
    animation: fadeUp 0.4s ease;
  }
  .empty-icon { font-size: 56px; opacity: 0.3; animation: float 3s ease-in-out infinite; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .empty-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; color: var(--muted); }
  .empty-sub { font-size: 14px; color: var(--muted); }
  .empty-reset {
    margin-top: 8px; background: var(--accent); color: #fff;
    border: none; padding: 10px 24px; border-radius: 30px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 13px; letter-spacing: 1px;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.2s; box-shadow: 0 4px 16px rgba(26,110,245,0.25);
  }
  .empty-reset:hover { background: var(--accent2); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(26,110,245,0.35); }
  .empty-reset:active { transform: scale(0.97); }

  /* ── ARTICLE PAGE ── */
  .article-page { max-width: 800px; margin: 0 auto; padding: 40px 24px 80px; animation: fadeUp 0.4s cubic-bezier(.22,.68,0,1.2); }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); border-radius: 30px;
    padding: 8px 18px; font-size: 13px; cursor: pointer;
    font-family: 'Barlow', sans-serif;
    transition: all 0.25s cubic-bezier(.4,0,.2,1); margin-bottom: 30px;
  }
  .back-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateX(-4px); box-shadow: 0 4px 12px rgba(26,110,245,0.12); }
  .back-btn:active { transform: translateX(-2px) scale(0.98); }
  .article-cat {
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; color: var(--accent);
    margin-bottom: 14px; display: block;
  }
  .article-title {
    font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 6vw, 58px);
    line-height: 1.05; letter-spacing: 1px; color: var(--text); margin-bottom: 18px;
  }
  .article-meta {
    display: flex; align-items: center; gap: 16px; font-size: 13px; color: var(--muted);
    padding-bottom: 20px; border-bottom: 1px solid var(--border); margin-bottom: 28px; flex-wrap: wrap;
  }
  .article-meta strong { color: var(--text); }
  .meta-dot { width: 3px; height: 3px; background: var(--muted); border-radius: 50%; }
  .article-hero-img {
    width: 100%; max-height: 460px; object-fit: cover;
    border-radius: 16px; margin-bottom: 32px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  }
  .article-hero-img:hover { transform: scale(1.01); box-shadow: 0 12px 40px rgba(0,0,0,0.16); }
  .article-body { font-size: 17px; line-height: 1.8; color: #374151; letter-spacing: 0.1px; }
  .article-body p { margin-bottom: 20px; }
  .article-tags-section { margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--border); }
  .article-tags-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; color: var(--muted);
    margin-bottom: 12px; display: block;
  }
  .article-tags { display: flex; gap: 8px; flex-wrap: wrap; }

  /* ── ARTICLE SOURCE ROW ── */
  .article-source-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .source-badge {
    font-size: 12px; color: var(--muted);
    background: var(--surface2); border: 1px solid var(--border);
    padding: 3px 10px; border-radius: 20px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 500;
    transition: all 0.2s;
  }
  .source-badge:hover { border-color: var(--accent); color: var(--accent); }

  /* ── ARTICLE LEAD ── */
  .article-lead {
    font-size: 18px; font-weight: 600; line-height: 1.65;
    color: #1a2340; border-left: 3px solid var(--accent);
    padding-left: 16px; margin-bottom: 24px !important;
    transition: border-color 0.2s;
  }

  /* ── TRUNCATED NOTICE ── */
  .truncated-notice {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap; margin-top: 32px; padding: 20px 24px;
    background: linear-gradient(135deg, rgba(26,110,245,0.05), rgba(26,110,245,0.02));
    border: 1px solid rgba(26,110,245,0.18); border-left: 4px solid var(--accent);
    border-radius: 12px; transition: box-shadow 0.2s;
  }
  .truncated-notice:hover { box-shadow: 0 4px 16px rgba(26,110,245,0.1); }
  .truncated-notice-text { display: flex; align-items: center; gap: 14px; }
  .truncated-icon { font-size: 28px; flex-shrink: 0; }
  .truncated-title { font-weight: 700; font-size: 14px; color: var(--text); margin-bottom: 3px; }
  .truncated-sub { font-size: 13px; color: var(--muted); }
  .read-full-btn {
    display: inline-flex; align-items: center; background: var(--accent); color: #fff;
    padding: 10px 20px; border-radius: 30px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px;
    letter-spacing: 0.5px; text-decoration: none; white-space: nowrap;
    transition: all 0.25s cubic-bezier(.4,0,.2,1); flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(26,110,245,0.25);
  }
  .read-full-btn:hover { background: var(--accent2); transform: translateX(4px); box-shadow: 0 6px 20px rgba(26,110,245,0.35); }
  .read-full-btn:active { transform: translateX(2px) scale(0.98); }

  /* ── SOURCE ROW ── */
  .source-row { display: flex; align-items: center; gap: 8px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border); }
  .source-link { color: var(--accent); font-weight: 600; font-size: 13px; text-decoration: none; transition: all 0.2s; }
  .source-link:hover { text-decoration: underline; transform: translateX(2px); }

  /* ── LOADING SKELETON ── */
  .skeleton {
    background: linear-gradient(90deg, var(--surface) 25%, var(--surface2) 50%, var(--surface) 75%);
    background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 12px;
  }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .header { padding: 0 16px; }
    .hero { height: 320px; }
    .hero-content { padding: 20px; }
    .list-card { grid-template-columns: 1fr; }
    .list-img { height: 180px; }
    .grid { grid-template-columns: 1fr; }
    .article-page { padding: 24px 16px 60px; }
  }
`;


// ─── APP ─────────────────────────────────────────────────────────────────────
export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [activeTag, setActiveTag] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal observer — re-runs on every render to catch new cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/news");
        const data = await res.json();
        const raw = data.articles || data.results || [];
        if (raw.length === 0) { setArticles(MOCK_ARTICLES); return; }
        const normalized = raw
          .filter(a => isFootballArticle(a.title, a.description))
          .map((a, i) => normalizeArticle(a, i));
        setArticles(normalized.length > 0 ? normalized : MOCK_ARTICLES);
      } catch {
        setArticles(MOCK_ARTICLES);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const featuredArticle = useMemo(() => articles.find(a => a.featured) || articles[0], [articles]);

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const matchCat = category === "All" || a.category === category;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        a.title?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.tags?.some(t => t.toLowerCase().includes(q));
      const matchTag = !activeTag || a.tags?.includes(activeTag);
      return matchCat && matchSearch && matchTag;
    });
  }, [articles, category, search, activeTag]);

  const nonFeatured = useMemo(() =>
    filtered.filter(a => !a.featured || search || category !== "All" || activeTag),
    [filtered, search, category, activeTag]
  );

  const showHero = !search && category === "All" && !activeTag && featuredArticle;

  const handleTagClick = (tag) => {
    setActiveTag(prev => prev === tag ? "" : tag);
    setSearch("");
  };

  const resetFilters = () => {
    setSearch(""); setCategory("All"); setActiveTag("");
  };

  return (
    <>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="logo">
          ⚽ WORLD<span>CUP</span>
          <span className="logo-badge">2026</span>
        </div>
        <div className="header-right">
          <div className="view-toggle">
            <button className={`view-btn${view === "grid" ? " active" : ""}`} onClick={() => setView("grid")}>⊞</button>
            <button className={`view-btn${view === "list" ? " active" : ""}`} onClick={() => setView("list")}>☰</button>
          </div>
        </div>
      </header>

      {/* ── ARTICLE DETAIL VIEW ── */}
      {selected ? (
        <div className="article-page">
          <button className="back-btn" onClick={() => setSelected(null)}>← Retour aux actualités</button>

          <div className="article-source-row">
            <span className="article-cat">{selected.category}</span>
            {selected.sourceName && (
              <span className="source-badge">📡 {selected.sourceName}</span>
            )}
          </div>

          <h1 className="article-title">{selected.title}</h1>

          <div className="article-meta">
            <strong>{selected.author}</strong>
            {selected.publishedAt && <>
              <span className="meta-dot" />
              <span>{formatDate(selected.publishedAt)}</span>
              <span className="meta-dot" />
              <span style={{ color: "var(--accent)" }}>{timeAgo(selected.publishedAt)}</span>
            </>}
          </div>

          {selected.urlToImage && (
            <img
              className="article-hero-img"
              src={selected.urlToImage}
              alt={selected.title}
              onError={e => { e.target.style.display = "none"; }}
            />
          )}

          <div className="article-body">
            {/* Only show description — clean, no truncated API content */}
            {selected.description
              ? <p className="article-lead">{selected.description}</p>
              : <p style={{ color: "var(--muted)", fontStyle: "italic" }}>Aucune description disponible.</p>
            }

            {/* Link to full article */}
            {selected.sourceUrl && (
              <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="read-full-btn" style={{ display: "inline-flex", marginTop: 28 }}>
                Lire l'article complet →
              </a>
            )}
          </div>

          {selected.tags?.length > 0 && (
            <div className="article-tags-section">
              <span className="article-tags-label">Tags</span>
              <div className="article-tags">
                {selected.tags.map(tag => (
                  <span key={tag} className="tag" onClick={() => { setSelected(null); handleTagClick(tag); }}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="main">
          {/* ── HERO ── */}
          {showHero && featuredArticle && (
            <div className="hero" onClick={() => setSelected(featuredArticle)}>
              <img className="hero-img" src={featuredArticle.urlToImage} alt="featured" />
              <div className="hero-overlay" />
              <div className="hero-content">
                <div className="hero-badge"><span className="dot" /> Breaking News</div>
                <h2 className="hero-title">{featuredArticle.title}</h2>
                <p className="hero-desc">{featuredArticle.description}</p>
                <div className="hero-meta">
                  <b>{featuredArticle.author}</b>
                  <span>·</span>
                  <span>{timeAgo(featuredArticle.publishedAt)}</span>
                  <span>·</span>
                  <span>{featuredArticle.category}</span>
                </div>
                {featuredArticle.tags && (
                  <div className="hero-tags">
                    {featuredArticle.tags.map(tag => (
                      <span key={tag} className="tag" onClick={e => { e.stopPropagation(); handleTagClick(tag); }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── SEARCH BAR ── */}
          <div className="section-search">
            <div className="section-search-wrap">
              <span className="section-search-icon">🔍</span>
              <input
                className="section-search-input"
                type="text"
                placeholder="Rechercher des actualités foot..."
                value={search}
                onChange={e => { setSearch(e.target.value); setActiveTag(""); }}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")}>✕</button>
              )}
            </div>
          </div>

          {/* ── CATEGORY TABS ── */}
          <div className="category-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-btn${category === cat ? " active" : ""}`}
                onClick={() => { setCategory(cat); setActiveTag(""); }}
              >{cat}</button>
            ))}
            {activeTag && (
              <button className="cat-btn active" onClick={() => setActiveTag("")}>
                {activeTag} ✕
              </button>
            )}
          </div>

          {/* ── ARTICLES ── */}
          <div style={{ marginTop: 28 }}>
            <div className="section-header">
              <h2 className="section-title">
                {search ? "Search Results" : activeTag ? activeTag : category === "All" ? "Latest News" : category}
              </h2>
              <span className="results-count">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {loading ? (
              <div className="grid">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} style={{ height: 340 }} className="skeleton" />
                ))}
              </div>
            ) : (search || category !== "All" || activeTag) ? (
              filtered.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">🔍</div>
                  <div className="empty-title">Aucun résultat trouvé</div>
                  <div className="empty-sub">
                    {search
                      ? `Aucun article ne correspond à "${search}"`
                      : `Aucun article dans cette catégorie`
                    }
                  </div>
                  <button className="empty-reset" onClick={resetFilters}>Réinitialiser les filtres</button>
                </div>
              ) : (
                view === "grid" ? (
                  <div className="grid">
                    {filtered.map((a, i) => <ArticleCard key={a.id} article={a} index={i} onOpen={setSelected} onTag={handleTagClick} />)}
                  </div>
                ) : (
                  <div className="list">
                    {filtered.map(a => <ArticleListCard key={a.id} article={a} onOpen={setSelected} onTag={handleTagClick} />)}
                  </div>
                )
              )
            ) : (
              nonFeatured.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">📰</div>
                  <div className="empty-title">No more articles</div>
                </div>
              ) : view === "grid" ? (
                <div className="grid">
                  {nonFeatured.map((a, i) => <ArticleCard key={a.id} article={a} index={i} onOpen={setSelected} onTag={handleTagClick} />)}
                </div>
              ) : (
                <div className="list">
                  {nonFeatured.map(a => <ArticleListCard key={a.id} article={a} onOpen={setSelected} onTag={handleTagClick} />)}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Grid Card ───────────────────────────────────────────────────────────────
function ArticleCard({ article, index = 0, onOpen, onTag }) {
  return (
    <div
      className="card reveal"
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
      onClick={() => onOpen(article)}
    >
      <div className="card-img-wrap">
        {article.urlToImage
          ? <img className="card-img" src={article.urlToImage} alt={article.title} />
          : <div style={{ height: "100%", background: "var(--surface2)", display:"flex",alignItems:"center",justifyContent:"center",fontSize:40 }}>⚽</div>
        }
        <span className="card-cat-pill">{article.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{article.title}</h3>
        <p className="card-desc">{article.description}</p>
        {article.tags?.length > 0 && (
          <div className="card-tags">
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag" onClick={e => { e.stopPropagation(); onTag(tag); }}>{tag}</span>
            ))}
          </div>
        )}
        <div className="card-footer">
          <div className="card-meta"><b>{article.author}</b> · {timeAgo(article.publishedAt)}</div>
          <button className="read-more-btn" onClick={e => { e.stopPropagation(); onOpen(article); }}>Read →</button>
        </div>
      </div>
    </div>
  );
}

// ─── List Card ───────────────────────────────────────────────────────────────
function ArticleListCard({ article, onOpen, onTag }) {
  return (
    <div className="list-card reveal-left" onClick={() => onOpen(article)}>
      {article.urlToImage
        ? <img className="list-img" src={article.urlToImage} alt={article.title} />
        : <div style={{ background:"var(--surface2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36 }}>⚽</div>
      }
      <div className="list-body">
        <div className="list-header">
          <span className="cat-pill">{article.category}</span>
          <span style={{ fontSize:12,color:"var(--muted)" }}>{timeAgo(article.publishedAt)}</span>
        </div>
        <h3 className="list-title">{article.title}</h3>
        <p className="list-desc">{article.description}</p>
        {article.tags?.length > 0 && (
          <div className="card-tags" style={{ marginTop:4 }}>
            {article.tags.slice(0, 4).map(tag => (
              <span key={tag} className="tag" onClick={e => { e.stopPropagation(); onTag(tag); }}>{tag}</span>
            ))}
          </div>
        )}
        <div className="list-footer">
          <span style={{ fontSize:12,color:"var(--muted)" }}><b style={{color:"var(--text)"}}>{article.author}</b></span>
          <button className="read-more-btn" onClick={e => { e.stopPropagation(); onOpen(article); }}>Read More →</button>
        </div>
      </div>
    </div>
  );
}