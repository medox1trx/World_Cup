import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FiMapPin, FiClock, FiWifi, FiShield, FiStar,
  FiArrowRight, FiGlobe, FiMonitor, FiMusic,
  FiShoppingBag, FiCamera, FiZap, FiUsers,
  FiChevronRight, FiMail, FiCheck, FiPhone, FiMenu, FiX,
} from "react-icons/fi";

const API_BASE_URL = "http://localhost:8000/api/v1";
const D = "'Bebas Neue', sans-serif";
const B = "'DM Sans', sans-serif";

/* ─── All city images: unique, tested URLs ─────────────────── */
const CITY_IMGS = {
  rabat:       "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=900&q=80&fit=crop",
  madrid:      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=900&q=80&fit=crop",
  barcelone:   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&fit=crop",
  lisbonne:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop",
  porto:       "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80&fit=crop",
  seville:     "https://images.unsplash.com/photo-1534442845756-8ad9e52fa8a1?w=900&q=80&fit=crop",
  buenosaires: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=900&q=80&fit=crop",
  montevideo:  "https://images.unsplash.com/photo-1586982530409-1e4ff7125a29?w=900&q=80&fit=crop",
  asuncion:    "https://images.unsplash.com/photo-1596568899404-b1e48c5d0f3a?w=900&q=80&fit=crop",
};

/* ─── Activity images ───────────────────────────────────────── */
const ACT_IMGS = {
  gaming:    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80&fit=crop",
  football:  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80&fit=crop",
  trophy:    "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&q=80&fit=crop",
  screening: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80&fit=crop",
  stage:     "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80&fit=crop",
  store:     "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fit=crop",
};

const HERO_IMG   = "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&q=85&fit=crop";
const HERO_VIDEO = "https://assets.mixkit.co/videos/17398/17398-720.mp4";

const BAND_IMGS = [
  ["https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80&fit=crop", "Ambiance Festive"],
  ["https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80&fit=crop",  "Terrain Officiel" ],
  ["https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80&fit=crop", "Atmosphère Unique"],
];

const ACTIVITIES = [
  { Icon:FiZap,         tag:"Gaming",      title:"FIFA Gaming Arena",    desc:"Tournois quotidiens EA Sports FIFA. Classements live, prix officiels et grand final en soirée.",             img: ACT_IMGS.gaming    },
  { Icon:FiUsers,       tag:"Sport",       title:"Terrain 5×5 Officiel", desc:"Mini-terrains certifiés FIFA. Sessions réservables via l'app, disponibles toutes les heures.",               img: ACT_IMGS.football  },
  { Icon:FiCamera,      tag:"Expérience",  title:"Trophy Experience",    desc:"Photos officielles avec la Coupe du Monde FIFA originale. Créneaux limités — réservation obligatoire.",        img: ACT_IMGS.trophy    },
  { Icon:FiMonitor,     tag:"Diffusion",   title:"Match Screening 4K",   desc:"Écran géant LED 4K · 5 000 places · Entrée libre. Chaque match retransmis en direct.",                      img: ACT_IMGS.screening },
  { Icon:FiMusic,       tag:"Musique",     title:"Fan Stage Live",       desc:"Concerts, shows et animations en direct chaque soir. Programme hebdomadaire sur l'app officielle FIFA.",       img: ACT_IMGS.stage     },
  { Icon:FiShoppingBag, tag:"Shopping",    title:"FIFA Megastore",       desc:"Collection officielle FIFA 2026, maillots personnalisés, éditions limitées. Livraison mondiale disponible.",   img: ACT_IMGS.store     },
];

const FAQ = [
  { q:"L'entrée à la Fan Zone est-elle gratuite ?",      a:"Oui, l'accès est entièrement gratuit. Certaines activités comme le Trophy Experience nécessitent une réservation préalable via l'application officielle FIFA 2026." },
  { q:"Quels sont les horaires d'ouverture ?",           a:"10h – 00h les jours de match, 12h – 22h les autres jours. Les horaires peuvent varier selon la ville hôte et la phase de la compétition." },
  { q:"Y a-t-il des navettes depuis les stades ?",       a:"Des navettes officielles FIFA circulent entre tous les stades et Fan Zones. Ce service est inclus dans chaque billet de match." },
  { q:"Puis-je apporter ma propre nourriture ?",         a:"Les aliments et boissons extérieurs ne sont pas autorisés. Plus de 80 stands proposent les spécialités culinaires des pays hôtes à l'intérieur." },
  { q:"Les Fan Zones sont-elles ouvertes tous les jours ?", a:"Les Fan Zones de Mexico, New York et Toronto sont ouvertes quotidiennement pendant toute la durée du tournoi, avec une programmation spéciale 2026." },
];

/* ─── Subcomponents ─────────────────────────────────────────── */
function ShimBtn({ href, onClick, style, children, dark }) {
  const base = {
    position:"relative", overflow:"hidden", display:"inline-flex",
    alignItems:"center", justifyContent:"center", gap:8,
    fontFamily:B, fontSize:13, fontWeight:800, letterSpacing:"0.04em",
    padding:"14px 28px", borderRadius:100, textDecoration:"none",
    border:"none", cursor:"pointer", transition:"background 0.18s, opacity 0.18s",
    ...(dark
      ? { background:"#0d0d0d", color:"white" }
      : { background:"white",   color:"#0d0d0d" }),
    ...style,
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} style={base}
      onMouseOver={e => e.currentTarget.style.opacity = "0.88"}
      onMouseOut={e => e.currentTarget.style.opacity  = "1"}>
      <span style={{
        position:"absolute", top:0, left:"-80%", width:"50%", height:"100%",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)",
        pointerEvents:"none",
        animation: undefined,
      }} className="shbtn-shine" />
      {children}
    </Tag>
  );
}

function OutlineBtn({ href, onClick, style, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onClick={onClick} style={{
      display:"inline-flex", alignItems:"center", gap:8,
      fontFamily:B, fontSize:13, fontWeight:600,
      padding:"13px 26px", borderRadius:100, textDecoration:"none",
      border: hov ? "1px solid rgba(255,255,255,0.65)" : "1px solid rgba(255,255,255,0.22)",
      color:"white", background: hov ? "rgba(255,255,255,0.05)" : "transparent",
      transition:"all 0.2s", ...style,
    }}
      onMouseOver={() => setHov(true)}
      onMouseOut={() => setHov(false)}>
      {children}
    </a>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width:"100%", display:"flex", alignItems:"flex-start",
        justifyContent:"space-between", gap:16,
        padding:"20px 0", background:"none", border:"none",
        cursor:"pointer", textAlign:"left",
      }}>
        <span style={{ color:"white", fontFamily:B, fontSize:14, fontWeight:600, lineHeight:1.5, paddingTop:1 }}>{q}</span>
        <span style={{
          width:26, height:26, minWidth:26, borderRadius:"50%",
          border:"1px solid rgba(255,255,255,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"rgba(255,255,255,0.7)", fontSize:17, lineHeight:1,
          transform: open ? "rotate(45deg)" : "none",
          transition:"transform 0.22s ease",
        }}>+</span>
      </button>
      <div style={{ overflow:"hidden", maxHeight: open ? 300 : 0, transition:"max-height 0.3s ease" }}>
        <p style={{ color:"rgba(255,255,255,0.8)", fontFamily:B, fontSize:13, lineHeight:1.85, paddingBottom:20 }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function FanZone() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [mounted,   setMounted]     = useState(false);
  const [email,     setEmail]       = useState("");
  const [subscribed,setSubscribed]  = useState(false);
  const [hovAct,    setHovAct]      = useState(null);
  const [imgFade,   setImgFade]     = useState(true);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFanZones = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/fan-zones`);
        const data = res.data;
        
        const grouped = data.reduce((acc, fz) => {
          const g = fz.groupe || 'Autres';
          if (!acc[g]) acc[g] = [];
          acc[g].push({
            key:      fz.id,
            name:     fz.ville.nom,
            country:  fz.pays.nom,
            code:     fz.pays.code_iso,
            stadium:  fz.stade,
            cap:      fz.capacite,
            matches:  fz.nb_matchs,
            zone:     fz.zone_label,
            desc:     fz.description,
            img:      fz.image_url,
            is_centenary: fz.statut === 'centenaire'
          });
          return acc;
        }, {});

        const groupsArray = Object.entries(grouped).map(([label, cities]) => ({ label, cities }));
        setGroups(groupsArray);
        if (groupsArray.length > 0 && groupsArray[0].cities.length > 0) {
          setActiveIdx(0);
        }
      } catch (err) {
        console.error("Failed to fetch fan zones:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFanZones();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const selectCity = idx => {
    setImgFade(false);
    setTimeout(() => { setActiveIdx(idx); setImgFade(true); }, 180);
  };

  const allCities = groups.flatMap(g => g.cities || []);
  const city = allCities[activeIdx] || { name: '', country: '', code: '', stadium: '', cap: '', matches: 0, zone: '', desc: '', img: '' };
  const isCent = city.matches === 1;

  return (
    <div style={{ fontFamily:B, background:"#0d0d0d", color:"white", opacity: mounted ? 1 : 0, transition:"opacity 0.45s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior: smooth; }

        @keyframes bgz  { from{transform:scale(1);}   to{transform:scale(1.06);}  }
        @keyframes shim { from{left:-80%;}            to{left:130%;}              }

        .shbtn-shine { animation: none !important; }
        a:hover .shbtn-shine, button:hover .shbtn-shine { animation: shim 0.5s ease forwards !important; }
        
        /* ── RESET VISITED LINKS (TEXT WHITE) ── */
        a, a:visited {
          color: white !important;
          text-decoration: none !important;
        }

        .hw { max-width:1380px; margin:0 auto; padding:0 clamp(16px,3.5vw,52px); }

        .sl { display:block; font-size:9px; font-weight:800; letter-spacing:.3em;
              text-transform:uppercase; color:rgba(255,255,255,.7); margin-bottom:10px; font-family:'DM Sans',sans-serif; }
        .st { font-family:'Bebas Neue',sans-serif; font-size:clamp(1.9rem,3.5vw,2.9rem);
              font-weight:900; letter-spacing:.03em; color:white; line-height:1; }
        .sh { margin-bottom:48px; padding-bottom:22px; border-bottom:1px solid rgba(255,255,255,.08); }

        /* photo */
        .phc { position:relative; overflow:hidden; }
        .phc img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s ease; }
        .phc:hover img { transform:scale(1.05); }

        /* activity card */
        .ac {
          border-radius:10px; overflow:hidden; display:flex; flex-direction:column;
          background:#141414; border:1px solid rgba(255,255,255,.07);
          transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease; cursor:pointer;
        }
        .ac:hover { transform:translateY(-6px); border-color:rgba(255,255,255,.22); box-shadow:0 20px 48px rgba(0,0,0,.5); }

        .tag-pill {
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.7);
          font-family: ${B}; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.12em;
        }

        .cr {
          display:flex; align-items:center; gap:14px; padding:13px 18px;
          cursor:pointer; border-bottom:1px solid rgba(255,255,255,.06);
          transition:background .18s; position:relative;
        }
        .cr:last-child { border-bottom:none; }
        .cr:hover  { background:rgba(255,255,255,.04); }
        .cr.on     { background:rgba(255,255,255,.07); }
        .cr.on::before { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:white; }

        .clabel {
          padding:9px 18px 7px; font-family:'DM Sans',sans-serif; font-size:8px; font-weight:800;
          letter-spacing:.28em; text-transform:uppercase; color:rgba(255,255,255,.22);
          border-bottom:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.02);
        }

        .cent-badge {
          display:inline-flex; align-items:center; gap: 6px;
          color:rgb(234,179,8); font-family:'DM Sans',sans-serif; font-size:10px;
          font-weight:700; letter-spacing:.1em; text-transform:uppercase;
        }
        .cent-badge::before {
          content: ''; width: 5px; height: 5px; border-radius: 50%; background: rgb(234,179,8);
        }

        /* stat row */
        .stat-row {
          display:flex; justify-content:space-between; align-items:center;
          padding:11px 0; border-bottom:1px solid rgba(255,255,255,.05);
        }
        .stat-row:last-child { border-bottom:none; }

        /* ── RESPONSIVE ───────────────────────────────── */

        /* stats band: 4 cols → 2×2 on mobile */
        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .stat-cell  {
          display:flex; flex-direction:column; align-items:center;
          padding:clamp(18px,3vw,30px) 12px;
          border-right:1px solid rgba(255,255,255,.07);
        }
        .stat-cell:last-child { border-right:none; }

        /* activities: 3 → 2 → 1 */
        .act-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }

        /* city selector */
        .city-wrap { display:grid; grid-template-columns:1fr 380px; gap:14px; align-items:start; }

        /* app section */
        .app-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(36px,6vw,80px); align-items:center; }

        /* faq */
        .faq-grid { display:grid; grid-template-columns:320px 1fr; gap:clamp(40px,6vw,80px); align-items:start; }

        /* photo band */
        .pband { display:grid; grid-template-columns:1fr 1fr 1fr; height:280px; }

        /* Feature tiles */
        .feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }

        @media(max-width:1100px) {
          .city-wrap { grid-template-columns:1fr 340px; }
        }
        @media(max-width:900px) {
          .city-wrap  { grid-template-columns:1fr; }
          .faq-grid   { grid-template-columns:1fr; gap:36px; }
          .app-grid   { grid-template-columns:1fr; gap:40px; }
        }
        @media(max-width:768px) {
          .act-grid   { grid-template-columns:1fr 1fr; gap:12px; }
          .pband      { display:none !important; }
          .stats-grid { grid-template-columns:repeat(2,1fr); }
          .stat-cell  { border-right:none; border-bottom:1px solid rgba(255,255,255,.07); }
          .stat-cell:nth-child(odd)  { border-right:1px solid rgba(255,255,255,.07); }
          .stat-cell:nth-last-child(-n+2) { border-bottom:none; }
        }
        @media(max-width:560px) {
          .act-grid   { grid-template-columns:1fr; }
          .feat-grid  { grid-template-columns:repeat(2,1fr); }
          .sh         { margin-bottom:32px; }
        }
        @media(max-width:420px) {
          .feat-grid  { grid-template-columns:1fr 1fr; }
          .hero-btns  { flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section style={{ position:"relative", background:"#0d0d0d", minHeight:"92vh", overflow:"hidden", display:"flex", alignItems:"flex-end" }}>
        <video autoPlay muted playsInline loop
          onError={e => e.currentTarget.style.display="none"}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.25, animation:"bgz 22s ease-in-out infinite alternate" }}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <img src={HERO_IMG} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.2, zIndex:0 }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,#0d0d0d 0%,rgba(13,13,13,.85) 38%,rgba(13,13,13,.22) 72%,rgba(13,13,13,.55) 100%)", zIndex:1 }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(13,13,13,.92) 0%,rgba(13,13,13,.45) 52%,transparent 100%)", zIndex:1 }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.022) 1px,transparent 1px)", backgroundSize:"32px 32px", zIndex:1 }} />
        {/* Ghost text */}
        <div style={{ position:"absolute", bottom:-10, right:-10, zIndex:1, fontFamily:D, fontWeight:900, fontSize:"clamp(9rem,21vw,24rem)", lineHeight:1, textTransform:"uppercase", letterSpacing:"-0.04em", WebkitTextStroke:"1px rgba(255,255,255,.04)", color:"transparent", pointerEvents:"none", userSelect:"none" }}>FAN</div>

        <div className="hw" style={{ position:"relative", zIndex:2, width:"100%", paddingTop:"clamp(80px,12vh,140px)", paddingBottom:"clamp(64px,9vh,100px)" }}>
          {/* eyebrow */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
            <div style={{ height:1, width:32, background:"rgba(255,255,255,.25)", flexShrink:0 }} />
            <span style={{ color:"rgba(255,255,255,.8)", fontFamily:B, fontSize:10, fontWeight:800, letterSpacing:".42em", textTransform: "uppercase" }}>FIFA 2026 · Zone Fan Officielle</span>
          </div>
          {/* headline */}
          <div style={{ marginBottom:26 }}>
            {[["VIVEZ LA",false],["PASSION",true],["DU MONDE.",false]].map(([w,stroke]) => (
              <div key={w} style={{ fontFamily:D, fontSize:"clamp(46px,9vw,128px)", fontWeight:900, lineHeight:.87, textTransform:"uppercase", letterSpacing:"-0.02em", color:stroke?"transparent":"white", WebkitTextStroke:stroke?"1.5px rgba(255,255,255,.55)":"none" }}>{w}</div>
            ))}
          </div>
            16 Fan Zones officielles dans 3 pays hôtes. Du Mexique au Canada, vivez des expériences inoubliables au cœur de la plus grande Coupe du Monde de l'histoire.
          {/* CTAs */}
          <div className="hero-btns" style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:44 }}>
            <ShimBtn href="#activities" style={{ boxShadow:"0 4px 24px rgba(0,0,0,.5)" }}>
              Découvrir les activités <FiArrowRight size={14} />
            </ShimBtn>
            <OutlineBtn href="#fanzones">
              Trouver ma Fan Zone <FiChevronRight size={14} />
            </OutlineBtn>
          </div>
          {/* trust pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(16px,2.5vw,24px)", paddingTop:22, borderTop:"1px solid rgba(255,255,255,.08)" }}>
            {[[FiMapPin,"16 Fan Zones"],[FiStar,"Entrée gratuite"],[FiGlobe,"3 Pays hôtes"],[FiWifi,"Wi-Fi officiel"]].map(([Icon,label]) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:7, color:"rgba(255,255,255,.7)" }}>
                <Icon size={12} /><span style={{ fontFamily:B, fontSize:11, fontWeight:600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          STATS
      ════════════════════════════════════ */}
      <div style={{ background:"#111", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
        <div className="hw">
          <div className="stats-grid">
            {[{v:"16",l:"Fan Zones"},{v:"3",l:"Pays Hôtes"},{v:"10M+",l:"Visiteurs Attendus"},{v:"100+",l:"Activités Gratuites"}].map((s,i) => (
              <div key={i} className="stat-cell">
                <span style={{ fontFamily:D, fontSize:"clamp(1.9rem,3.5vw,3rem)", fontWeight:900, color:"white", lineHeight:1 }}>{s.v}</span>
                <span style={{ fontFamily:B, fontSize:9, fontWeight:800, letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.26)", marginTop:7, textAlign:"center" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          PHOTO BAND (desktop only)
      ════════════════════════════════════ */}
      <div className="pband">
        {BAND_IMGS.map(([src,label],i) => (
          <div key={i} className="phc" style={{ height:280, borderRight: i<2?"2px solid #0d0d0d":"none" }}>
            <img src={src} alt={label} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(13,13,13,.88) 0%,transparent 55%)" }} />
            <div style={{ position:"absolute", bottom:22, left:26 }}>
              <span style={{ fontFamily:D, fontSize:14, fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.8)" }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════
          ACTIVITIES
      ════════════════════════════════════ */}
      <section id="activities" style={{ background:"#0d0d0d", padding:"clamp(56px,8vh,100px) 0" }}>
        <div className="hw">
          <div className="sh">
            <span className="sl">Expériences</span>
            <h2 className="st">Ce Qui Vous Attend</h2>
          </div>
          <div className="act-grid">
            {ACTIVITIES.map((a,i) => {
              const {Icon} = a;
              const hov = hovAct===i;
              return (
                <div key={i} className="ac"
                  onMouseEnter={() => setHovAct(i)}
                  onMouseLeave={() => setHovAct(null)}>
                  <div style={{ height:200, overflow:"hidden", position:"relative" }}>
                    <img src={a.img} alt={a.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .55s ease", transform:hov?"scale(1.07)":"scale(1)" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(20,20,20,.95) 0%,rgba(20,20,20,.15) 55%,transparent 100%)" }} />
                    <div style={{ position:"absolute", top:14, left:14 }}>
                      <span className="tag-pill"><Icon size={12} style={{flexShrink:0}} />{a.tag}</span>
                    </div>
                    <div style={{ position:"absolute", bottom:14, left:16, width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon size={15} color="white" />
                    </div>
                  </div>
                  <div style={{ padding:"18px 20px 22px", flex:1, display:"flex", flexDirection:"column", gap:9 }}>
                    <h3 style={{ fontFamily:D, fontSize:18, fontWeight:900, color:"white", letterSpacing:".04em", textTransform:"uppercase", lineHeight:1 }}>{a.title}</h3>
                    <p style={{ color:"rgba(255,255,255,.85)", fontSize:13, lineHeight:1.75, fontFamily:B, flex:1 }}>{a.desc}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:6, color:hov?"white":"rgba(255,255,255,.38)", marginTop:4, transition:"color .2s" }}>
                      <span style={{ fontFamily:B, fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" }}>En savoir plus</span>
                      <FiArrowRight size={12} style={{ transform:hov?"translateX(4px)":"none", transition:"transform .2s" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FAN ZONES — 9 CITIES
      ════════════════════════════════════ */}
      <section id="fanzones" style={{ background:"#111", padding:"clamp(56px,8vh,100px) 0" }}>
        <div className="hw">
          <div className="sh" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div>
              <span className="sl">3 Pays · 16 Villes</span>
              <h2 className="st">Trouvez Votre Fan Zone</h2>
            </div>
            <span style={{ fontFamily:B, fontSize:12, color:"rgba(255,255,255,.25)", paddingBottom:2 }}>Sélectionnez une ville</span>
          </div>

          <div className="city-wrap">
            {/* ── LIST ── */}
            <div style={{ background:"#0d0d0d", border:"1px solid rgba(255,255,255,.08)", borderRadius:10, overflow:"hidden" }}>
              {loading ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Chargement...</div>
              ) : (
                groups.map((g,gi) => (
                  <div key={gi}>
                    <div className="clabel">{g.label}</div>
                    {g.cities.map((c) => {
                      const idx = allCities.findIndex(city => city.key === c.key);
                      const on  = activeIdx===idx;
                      return (
                        <div key={c.key} className={`cr${on?" on":""}`} onClick={() => selectCity(idx)}>
                          <img src={`https://flagcdn.com/w80/${c.code}.png`} alt={c.country}
                            style={{ width:34, height:23, objectFit:"cover", borderRadius:2, flexShrink:0, opacity:on?1:.5, transition:"opacity .2s" }} />
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
                              <p style={{ fontFamily:D, fontSize:16, fontWeight:900, color:on?"white":"rgba(255,255,255,.52)", letterSpacing:".04em", textTransform:"uppercase", lineHeight:1, transition:"color .2s" }}>{c.name}</p>
                              {c.is_centenary && <span style={{ fontSize:7, fontFamily:B, fontWeight:800, letterSpacing:".1em", color:"rgb(234,179,8)", textTransform:"uppercase", background:"rgba(234,179,8,.1)", padding:"2px 6px", borderRadius:2 }}>Centenaire</span>}
                            </div>
                            <p style={{ fontFamily:B, fontSize:11, color:"rgba(255,255,255,.25)", marginTop:2 }}>{c.country}</p>
                          </div>
                          <span style={{ fontFamily:B, fontSize:11, fontWeight:700, color:on?"white":"rgba(255,255,255,.18)", flexShrink:0, transition:"color .2s" }}>
                            {c.matches} match{c.matches>1?"s":""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* ── DETAIL PANEL ── */}
            <div style={{ background:"#0d0d0d", border:"1px solid rgba(255,255,255,.08)", borderRadius:10, overflow:"hidden", display:"flex", flexDirection:"column" }}>
              {/* City image with fade */}
              <div className="phc" style={{ height:230 }}>
                <img key={city.key} src={city.img} alt={city.name}
                  style={{ height:"100%", opacity:imgFade?1:0, transition:"opacity .25s ease" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,#0d0d0d 0%,rgba(13,13,13,.42) 52%,rgba(13,13,13,.18) 100%)" }} />
                {/* Flag top-right */}
                <div style={{ position:"absolute", top:14, right:14 }}>
                  <img src={`https://flagcdn.com/w80/${city.code}.png`} alt={city.country}
                    style={{ width:42, height:28, objectFit:"cover", borderRadius:3, border:"1px solid rgba(255,255,255,.2)" }} />
                </div>
                {/* City name overlay */}
                <div style={{ position:"absolute", bottom:18, left:22 }}>
                  {isCent && <div className="cent-badge" style={{ marginBottom:8 }}>Centenaire 1930–2026</div>}
                  <span style={{ display:"block", fontFamily:B, fontSize:9, fontWeight:800, letterSpacing:".28em", textTransform:"uppercase", color:"rgba(255,255,255,.8)", marginBottom:5 }}>{city.country}</span>
                  <span style={{ fontFamily:D, fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:900, color:"white", textTransform:"uppercase", letterSpacing:".03em", lineHeight:1 }}>{city.name}</span>
                </div>
              </div>

              {/* Description */}
              <div style={{ padding:"14px 22px 14px", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                <p style={{ fontFamily:B, fontSize:13, lineHeight:1.78, color:"rgba(255,255,255,.9)" }}>{city.desc}</p>
              </div>

              {/* Stats table */}
              <div style={{ padding:"4px 22px 4px", flex:1 }}>
                {[
                  ["Stade officiel",    city.stadium,                                          "rgba(255,255,255,.85)"],
                  ["Capacité",          city.cap+" places",                                    "rgba(255,255,255,.85)"],
                  ["Matchs programmés", city.matches+(city.matches>1?" matchs":" match"),       "rgba(255,255,255,.85)"],
                  ["Fan Zone",          city.zone,                                             "rgba(255,255,255,.85)"],
                  ["Ouverture",         "10h – 00h (jours de match)",                          "rgb(74,222,128)"     ],
                ].map(([lbl,val,col]) => (
                  <div key={lbl} className="stat-row">
                    <span style={{ fontFamily:B, fontSize:11, color:"rgba(255,255,255,.3)", fontWeight:500 }}>{lbl}</span>
                    <span style={{ fontFamily:B, fontSize:12, fontWeight:700, color:col, textAlign:"right", maxWidth:"58%", lineHeight:1.4 }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding:"14px 22px 22px" }}>
                <ShimBtn style={{ width:"100%", padding:"14px" }}>
                  Explorer {city.name} <FiArrowRight size={13} />
                </ShimBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          APP PROMO
      ════════════════════════════════════ */}
      <section style={{ background:"#0d0d0d", padding:"clamp(56px,8vh,100px) 0", borderTop:"1px solid rgba(255,255,255,.06)" }}>
        <div className="hw">
          <div className="app-grid">
            <div>
              <span className="sl">Application Officielle</span>
              <h2 style={{ fontFamily:D, fontSize:"clamp(2rem,4vw,3.6rem)", fontWeight:900, color:"white", lineHeight:.88, marginBottom:18, textTransform:"uppercase" }}>
                TOUT LE TOURNOI<br />
                <span style={{ WebkitTextStroke:"1.5px rgba(255,255,255,.55)", color:"transparent" }}>DANS VOTRE POCHE</span>
              </h2>
              <p style={{ color:"rgba(255,255,255,.8)", fontSize:"clamp(13px,1.5vw,14px)", lineHeight:1.85, marginBottom:30, maxWidth:380, fontFamily:B }}>
                Scores en temps réel, planificateur Fan Zone, navigation GPS vers les 16 sites, billets digitaux et alertes match personnalisées.
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {["App Store","Google Play"].map(label => (
                  <ShimBtn key={label} href="#" style={{ padding:"12px 22px" }}>{label}</ShimBtn>
                ))}
              </div>
            </div>
            <div className="feat-grid">
              {[
                [FiMapPin,    "Navigation Fan Zone"],
                [FiZap,       "Alertes Match"      ],
                [FiShield,    "Billets Digitaux"   ],
                [FiMonitor,   "Stats Live"         ],
                [FiGlobe,     "9 Langues"          ],
                [FiCamera,    "Accréditation"      ],
              ].map(([Icon,label],i) => (
                <div key={i} style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:8, padding:"16px 12px", display:"flex", flexDirection:"column", gap:11, alignItems:"center", textAlign:"center", transition:"border-color .2s,background .2s", cursor:"default" }}
                  onMouseOver={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.22)"; e.currentTarget.style.background="rgba(255,255,255,.06)"; }}
                  onMouseOut={e  => { e.currentTarget.style.borderColor="rgba(255,255,255,.07)"; e.currentTarget.style.background="rgba(255,255,255,.03)"; }}>
                  <Icon size={20} color="rgba(255,255,255,.45)" />
                  <span style={{ fontFamily:B, fontSize:10, fontWeight:700, color:"rgba(255,255,255,.42)", lineHeight:1.4 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ
      ════════════════════════════════════ */}
      <section style={{ background:"#111", padding:"clamp(56px,8vh,100px) 0" }}>
        <div className="hw">
          <div className="faq-grid">
            <div>
              <span className="sl">FAQ</span>
              <h2 style={{ fontFamily:D, fontSize:"clamp(1.9rem,3.5vw,2.7rem)", fontWeight:900, letterSpacing:".03em", color:"white", lineHeight:1, marginBottom:16 }}>
                Questions<br />Fréquentes
              </h2>
              <p style={{ color:"rgba(255,255,255,.35)", fontSize:13, lineHeight:1.8, fontFamily:B, marginBottom:28, maxWidth:280 }}>
                Notre équipe support est disponible 7j/7 pour vous accompagner avant et pendant votre visite.
              </p>
              <OutlineBtn href="#" style={{ fontSize:12, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:"11px 20px" }}>
                <FiPhone size={12} /> Contacter FIFA
              </OutlineBtn>
            </div>
            <div style={{ borderTop:"1px solid rgba(255,255,255,.08)" }}>
              {FAQ.map((f,i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          NEWSLETTER
      ════════════════════════════════════ */}
      <section style={{ background:"#0d0d0d", padding:"clamp(56px,8vh,100px) 0", borderTop:"1px solid rgba(255,255,255,.06)" }}>
        <div className="hw">
          <div style={{ maxWidth:580, margin:"0 auto", textAlign:"center" }}>
            <span className="sl" style={{ display:"block", textAlign:"center" }}>Alertes Fan Zone</span>
            <h2 style={{ fontFamily:D, fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:900, color:"white", lineHeight:.9, marginBottom:14, textTransform:"uppercase" }}>
              RESTEZ DANS<br />
              <span style={{ WebkitTextStroke:"1.5px rgba(255,255,255,.5)", color:"transparent" }}>L'ACTION</span>
            </h2>
            <p style={{ color:"rgba(255,255,255,.35)", fontSize:14, fontFamily:B, lineHeight:1.8, margin:"0 auto 32px", maxWidth:400 }}>
              Programmes, offres exclusives et mises à jour pour les 16 Fan Zones, directement dans votre boîte mail.
            </p>

            {subscribed ? (
              <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(74,222,128,.08)", border:"1px solid rgba(74,222,128,.25)", borderRadius:100, padding:"14px 32px", fontFamily:B, fontSize:14, fontWeight:700, color:"rgb(74,222,128)" }}>
                <FiCheck size={16} /> Inscription confirmée — à bientôt !
              </div>
            ) : (
              <div style={{ display:"flex", gap:8, maxWidth:460, margin:"0 auto" }}>
                <input type="email" placeholder="Votre adresse e-mail"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ flex:1, background:"rgba(255,255,255,.055)", border:"1px solid rgba(255,255,255,.1)", borderRadius:100, padding:"13px 20px", color:"white", fontFamily:B, fontSize:14, outline:"none", transition:"border-color .18s", minWidth:0 }}
                  onFocus={e => e.target.style.borderColor="rgba(255,255,255,.38)"}
                  onBlur={e  => e.target.style.borderColor="rgba(255,255,255,.1)"} />
                <ShimBtn onClick={() => email.includes("@") && setSubscribed(true)} style={{ flexShrink:0, padding:"13px 22px" }}>
                  S'inscrire
                </ShimBtn>
              </div>
            )}

            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"clamp(16px,3vw,28px)", marginTop:36, paddingTop:26, borderTop:"1px solid rgba(255,255,255,.07)" }}>
              {[[FiShield,"Données protégées"],[FiMail,"Offres exclusives"],[FiGlobe,"9 Fan Zones"],[FiClock,"Alertes temps réel"]].map(([Icon,label]) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:7, color:"rgba(255,255,255,.26)" }}>
                  <Icon size={12} /><span style={{ fontSize:11, fontWeight:600, fontFamily:B }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}