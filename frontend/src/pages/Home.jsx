import { useState } from "react";
import { Clock, ChevronRight, Heart, MapPin, Trophy, Ticket, Play, Globe, Users, Star } from "lucide-react";

const BLUE   = "#0a1128";
const RED    = "#c8102e";
const GREEN  = "#00a550";
const YELLOW = "#f5a623";

// Wikimedia Commons - open CORS, no hotlink block, always loads
const IMG = {
  hero:     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/FIFA_World_Cup_2022_-_Group_C_-_Argentina_v_Saudi_Arabia_%2801%29.jpg/1280px-FIFA_World_Cup_2022_-_Group_C_-_Argentina_v_Saudi_Arabia_%2801%29.jpg",
  spain:    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Spain_vs_Costa_Rica_FIFA_World_Cup_Qatar_2022.jpg/640px-Spain_vs_Costa_Rica_FIFA_World_Cup_Qatar_2022.jpg",
  tickets:  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/FIFA_World_Cup_2022_opening_ceremony.jpg/640px-FIFA_World_Cup_2022_opening_ceremony.jpg",
  brazil:   "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/FIFA_World_Cup_Qatar_2022_-_Group_G_-_Brazil_v_Serbia_%2804%29.jpg/640px-FIFA_World_Cup_Qatar_2022_-_Group_G_-_Brazil_v_Serbia_%2804%29.jpg",
  arg:      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/FIFA_World_Cup_2022_-_Group_C_-_Argentina_v_Saudi_Arabia_%2801%29.jpg/640px-FIFA_World_Cup_2022_-_Group_C_-_Argentina_v_Saudi_Arabia_%2801%29.jpg",
  france:   "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/FIFA_World_Cup_Qatar_2022_-_Group_D_-_France_v_Australia_%2801%29.jpg/640px-FIFA_World_Cup_Qatar_2022_-_Group_D_-_France_v_Australia_%2801%29.jpg",
  morocco:  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/FIFA_World_Cup_Qatar_2022_-_Group_F_-_Morocco_v_Croatia_%2801%29.jpg/640px-FIFA_World_Cup_Qatar_2022_-_Group_F_-_Morocco_v_Croatia_%2801%29.jpg",
  miami:    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Miami_collage_20110330.jpg/640px-Miami_collage_20110330.jpg",
  la:       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sunset_over_Los_Angeles.jpg/640px-Sunset_over_Los_Angeles.jpg",
  dallas:   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Dallas_Skyline_2015.jpg/640px-Dallas_Skyline_2015.jpg",
  nyc:      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Southwest_corner_of_Central_Park%2C_looking_east%2C_NYC.jpg/640px-Southwest_corner_of_Central_Park%2C_looking_east%2C_NYC.jpg",
  mexico:   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Mexico_City_at_night.jpg/640px-Mexico_City_at_night.jpg",
  toronto:  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Toronto_-_ON_-_Toronto_Harbourfront3.jpg/640px-Toronto_-_ON_-_Toronto_Harbourfront3.jpg",
  canada:   "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Niagara_Falls_2009.jpg/640px-Niagara_Falls_2009.jpg",
  mexflag:  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Mexico.svg/640px-Flag_of_Mexico.svg.png",
  usaflag:  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/640px-Flag_of_the_United_States.svg.png",
  s1:       "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/FIFA_World_Cup_2022_Final_-_Argentina_v_France_%2819%29.jpg/640px-FIFA_World_Cup_2022_Final_-_Argentina_v_France_%2819%29.jpg",
  s2:       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/FIFA_World_Cup_Qatar_2022_-_QF_-_Netherlands_v_Argentina_%2801%29.jpg/640px-FIFA_World_Cup_Qatar_2022_-_QF_-_Netherlands_v_Argentina_%2801%29.jpg",
  s3:       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/FIFA_World_Cup_2022_opening_ceremony.jpg/640px-FIFA_World_Cup_2022_opening_ceremony.jpg",
  s4:       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/FIFA_World_Cup_Qatar_2022_-_SF_-_Argentina_v_Croatia_%2801%29.jpg/640px-FIFA_World_Cup_Qatar_2022_-_SF_-_Argentina_v_Croatia_%2801%29.jpg",
};

const newsItems = [
  { id:1, title:"Spain crushes Australia 3–1 in World Cup warm-up",   tag:"MATCH REPORT", img:IMG.spain,   time:"2h ago",  cat:"red"   },
  { id:2, title:"FIFA World Cup 2026 ticket sales officially open",    tag:"NEWS",         img:IMG.tickets, time:"4h ago",  cat:"blue"  },
  { id:3, title:"Brazil announces full squad for March qualifiers",    tag:"SQUADS",       img:IMG.brazil,  time:"6h ago",  cat:"green" },
  { id:4, title:"Argentina extends unbeaten run to 12 matches",       tag:"NEWS",         img:IMG.arg,     time:"8h ago",  cat:"red"   },
  { id:5, title:"Mbappé scores brace as France top UEFA group",       tag:"HIGHLIGHTS",   img:IMG.france,  time:"10h ago", cat:"blue"  },
  { id:6, title:"Morocco qualify for 2026 as African champions",      tag:"QUALIFIER",    img:IMG.morocco, time:"12h ago", cat:"green" },
];

const standings = [
  { pos:1, team:"🇦🇷 Argentina", p:18, w:6, d:0, l:0, gd:"+18", pts:18 },
  { pos:2, team:"🇧🇷 Brazil",    p:18, w:5, d:1, l:0, gd:"+14", pts:16 },
  { pos:3, team:"🇨🇴 Colombia",  p:18, w:4, d:2, l:1, gd:"+8",  pts:14 },
  { pos:4, team:"🇺🇾 Uruguay",   p:18, w:4, d:1, l:1, gd:"+6",  pts:13 },
  { pos:5, team:"🇪🇨 Ecuador",   p:18, w:3, d:2, l:1, gd:"+5",  pts:11 },
  { pos:6, team:"🇵🇾 Paraguay",  p:18, w:3, d:1, l:2, gd:"+1",  pts:10 },
];

const matches = [
  { home:"GER", away:"FRA", date:"Mar 23", time:"20:45" },
  { home:"ESP", away:"BRA", date:"Mar 23", time:"21:00" },
  { home:"ARG", away:"URU", date:"Mar 26", time:"22:00" },
  { home:"ENG", away:"ITA", date:"Mar 27", time:"20:00" },
  { home:"POR", away:"MAR", date:"Mar 28", time:"21:00" },
];

const venues = [
  { name:"Miami",       country:"USA",    img:IMG.miami   },
  { name:"Los Angeles", country:"USA",    img:IMG.la      },
  { name:"Dallas",      country:"USA",    img:IMG.dallas  },
  { name:"New York",    country:"USA",    img:IMG.nyc     },
  { name:"Mexico City", country:"Mexico", img:IMG.mexico  },
  { name:"Toronto",     country:"Canada", img:IMG.toronto },
];

const socialPosts = [
  { handle:"@FIFAWorldCup", text:"The greatest show on Earth returns. #WC2026 🏆",           img:IMG.s1, likes:"22.3K" },
  { handle:"@FIFAWorldCup", text:"Quarterfinal drama! Who's your pick? ⚡ #FIFA",              img:IMG.s2, likes:"9.1K"  },
  { handle:"@FIFAWorldCup", text:"Opening ceremony vibes 🌟 See you in 2026!",                 img:IMG.s3, likes:"18.7K" },
  { handle:"@FIFAWorldCup", text:"Semi-final intensity. Nothing like it. 🔥 #WorldCup",       img:IMG.s4, likes:"12.4K" },
];

const hostNations = [
  { code:"CAN", name:"Canada",        flag:"🇨🇦", img:IMG.canada,  color:"#d80000" },
  { code:"MEX", name:"Mexico",        flag:"🇲🇽", img:IMG.mexico,  color:"#006847" },
  { code:"USA", name:"United States", flag:"🇺🇸", img:IMG.nyc,     color:"#002868" },
];

const confTabs = ["CONMEBOL","UEFA","CAF","AFC","CONCACAF"];

export default function FifaBody() {
  const [activeConf, setActiveConf] = useState("CONMEBOL");

  return (
    <div style={{fontFamily:"Inter,sans-serif",background:"#f0f0f0",color:BLUE}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        img{display:block;}

        .wrap{max-width:1280px;margin:0 auto;padding:0 28px;}

        /* TICKER */
        .ticker{background:${RED};overflow:hidden;white-space:nowrap;padding:8px 0;}
        .tick-track{display:inline-flex;animation:marquee 35s linear infinite;}
        .tick-track:hover{animation-play-state:paused;}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

        /* HERO */
        .hero{position:relative;height:540px;overflow:hidden;display:flex;align-items:flex-end;}
        .hero img.hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;transition:transform 8s ease;}
        .hero:hover img.hero-img{transform:scale(1.04);}
        .hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,${BLUE} 0%,rgba(10,17,40,.75) 45%,rgba(10,17,40,.15) 100%);}
        .hero-content{position:relative;z-index:2;padding:48px 40px;max-width:660px;}

        /* BADGE */
        .badge{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:800;padding:4px 10px;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:12px;}
        .b-red  {background:${RED};  color:white;}
        .b-blue {background:${BLUE}; color:white;}
        .b-green{background:${GREEN};color:white;}

        /* SEC HEAD */
        .sh{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;padding-bottom:12px;border-bottom:3px solid ${BLUE};}
        .st{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:2px;color:${BLUE};}
        .sl{display:flex;align-items:center;gap:4px;color:${RED};font-weight:700;font-size:13px;text-decoration:none;transition:gap .2s;}
        .sl:hover{gap:8px;}

        /* NEWS */
        .ngrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
        @media(max-width:920px){.ngrid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:580px){.ngrid{grid-template-columns:1fr;}}
        .nc{background:white;overflow:hidden;cursor:pointer;transition:transform .25s,box-shadow .25s;border-bottom:3px solid transparent;border-radius:2px;}
        .nc:hover{transform:translateY(-5px);box-shadow:0 14px 32px rgba(0,0,0,.14);border-bottom-color:${RED};}
        .nc-img{overflow:hidden;height:195px;}
        .nc-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s;}
        .nc:hover .nc-img img{transform:scale(1.08);}
        .nc-body{padding:16px 18px 20px;}
        .nc-meta{display:flex;align-items:center;gap:6px;margin-top:10px;color:#aaa;}

        /* STANDINGS */
        .tbl{width:100%;border-collapse:collapse;font-size:13px;}
        .tbl thead tr{background:${BLUE};color:white;}
        .tbl th{padding:11px 14px;text-align:center;font-weight:700;font-size:11px;letter-spacing:.8px;text-transform:uppercase;}
        .tbl th:nth-child(2){text-align:left;}
        .tbl td{padding:11px 14px;text-align:center;border-bottom:1px solid #eee;}
        .tbl td:nth-child(2){text-align:left;font-weight:700;}
        .tbl tbody tr{transition:background .15s;cursor:pointer;}
        .tbl tbody tr:hover{background:#eef2ff;}

        /* CONF TABS */
        .ctabs{display:flex;flex-wrap:wrap;border-bottom:2px solid #e5e5e5;margin-bottom:0;}
        .ctab{border:none;padding:11px 22px;font-family:Inter;font-weight:700;font-size:12px;letter-spacing:.6px;cursor:pointer;transition:all .15s;background:white;color:#888;border-bottom:3px solid transparent;margin-bottom:-2px;}
        .ctab.on{color:${BLUE};border-bottom-color:${RED};background:white;}
        .ctab:hover:not(.on){color:${BLUE};background:#f5f5f5;}

        /* VENUES */
        .vgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
        @media(max-width:720px){.vgrid{grid-template-columns:repeat(2,1fr);}}
        .vc{position:relative;height:180px;overflow:hidden;cursor:pointer;border-radius:2px;}
        .vc img{width:100%;height:100%;object-fit:cover;transition:transform .5s;filter:brightness(.85);}
        .vc:hover img{transform:scale(1.09);filter:brightness(1);}
        .vc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,17,40,.88) 30%,transparent);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:16px;}
        .vc-name{color:white;font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:2px;line-height:1;}
        .vc-country{display:flex;align-items:center;gap:4px;color:rgba(255,255,255,.65);font-size:11px;font-weight:600;margin-top:4px;}

        /* HOST NATIONS */
        .hgrid{display:grid;grid-template-columns:repeat(3,1fr);}
        .hc{position:relative;height:260px;overflow:hidden;cursor:pointer;}
        .hc img{width:100%;height:100%;object-fit:cover;transition:transform .6s;filter:brightness(.45);}
        .hc:hover img{transform:scale(1.07);filter:brightness(.6);}
        .hc-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;}
        .hc-code{font-family:'Bebas Neue',sans-serif;font-size:62px;color:white;letter-spacing:7px;line-height:1;text-shadow:0 3px 20px rgba(0,0,0,.6);}
        .hc-name{font-size:13px;color:rgba(255,255,255,.85);font-weight:700;letter-spacing:2px;text-transform:uppercase;}

        /* SOCIAL */
        .sgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        @media(max-width:820px){.sgrid{grid-template-columns:repeat(2,1fr);}}
        .sc{background:white;overflow:hidden;cursor:pointer;border-radius:2px;transition:transform .2s,box-shadow .2s;}
        .sc:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.12);}
        .sc-img{position:relative;}
        .sc-img img{width:100%;height:160px;object-fit:cover;}
        .sc-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.6),transparent);}
        .sc-likes{position:absolute;bottom:10px;left:12px;display:flex;align-items:center;gap:5px;color:white;font-size:12px;font-weight:700;}

        /* PROMO */
        .promo{position:relative;overflow:hidden;background:linear-gradient(125deg,${BLUE} 0%,#152060 55%,#0d1e3d 100%);padding:56px 48px;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;}
        .promo-ring{position:absolute;border-radius:50%;pointer-events:none;}

        /* BTNS */
        .btn-red{background:${RED};color:white;border:none;padding:14px 32px;font-weight:800;font-size:13px;cursor:pointer;letter-spacing:1px;transition:background .2s;display:inline-flex;align-items:center;gap:8px;}
        .btn-red:hover{background:#a80d1f;}
        .btn-yellow{background:${YELLOW};color:${BLUE};border:none;padding:14px 32px;font-weight:800;font-size:13px;cursor:pointer;letter-spacing:1px;display:inline-flex;align-items:center;gap:8px;}
        .btn-yellow:hover{opacity:.88;}
        .btn-ghost{background:transparent;color:white;border:2px solid rgba(255,255,255,.4);padding:12px 28px;font-weight:700;font-size:13px;cursor:pointer;letter-spacing:1px;transition:all .2s;display:inline-flex;align-items:center;gap:8px;}
        .btn-ghost:hover{background:white;color:${BLUE};border-color:white;}

        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-thumb{background:${BLUE};}
      `}</style>

      {/* ── LIVE TICKER ── */}
      <div className="ticker">
        <div className="tick-track">
          {[...matches,...matches].map((m,i)=>(
            <span key={i} style={{color:"white",fontWeight:700,fontSize:12,padding:"0 24px",borderRight:"1px solid rgba(255,255,255,.2)",display:"inline-flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:14}}>⚽</span> {m.home} <span style={{color:YELLOW,fontWeight:900}}>vs</span> {m.away}
              <span style={{color:"rgba(255,255,255,.6)",fontWeight:500,fontSize:11}}>{m.date} · {m.time}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="hero">
        <img className="hero-img" src={IMG.hero} alt="FIFA World Cup 2026" />
        <div className="hero-overlay"/>
        <div className="hero-content">
          <span className="badge b-red">
            <span style={{width:6,height:6,borderRadius:"50%",background:"white",display:"inline-block",animation:"pulse 1.2s infinite"}}/>
            Breaking News
          </span>
          <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}`}</style>
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(40px,6vw,76px)",color:"white",lineHeight:1.02,marginBottom:16,letterSpacing:2}}>
            Spain Dismantles Australia<br/>
            <span style={{color:YELLOW}}>3 – 1 in Seville</span>
          </h1>
          <p style={{color:"rgba(255,255,255,.72)",fontSize:15,lineHeight:1.75,maxWidth:520,marginBottom:28}}>
            Rodri's superb brace and Morata's clinical finish sealed a dominant Spain victory as La Roja fine-tune preparations for the 2026 World Cup.
          </p>
          <div style={{display:"flex",gap:12}}>
            <button className="btn-red"><Star size={15}/>Read Full Report</button>
            <button className="btn-ghost"><Play size={14}/>Watch Highlights</button>
          </div>
        </div>
      </div>

      {/* ── LATEST NEWS ── */}
      <div style={{background:"#f0f0f0",padding:"48px 0"}}>
        <div className="wrap">
          <div className="sh">
            <span className="st">Latest News</span>
            <a href="#" className="sl">View All <ChevronRight size={14}/></a>
          </div>
          <div className="ngrid">
            {newsItems.map(item=>(
              <div key={item.id} className="nc">
                <div className="nc-img"><img src={item.img} alt={item.title}/></div>
                <div className="nc-body">
                  <span className={`badge b-${item.cat}`}>{item.tag}</span>
                  <p style={{fontWeight:700,fontSize:14,lineHeight:1.5,color:BLUE}}>{item.title}</p>
                  <div className="nc-meta">
                    <Clock size={11}/><span style={{fontSize:11}}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STANDINGS ── */}
      <div style={{background:"white",padding:"48px 0"}}>
        <div className="wrap">
          <div className="sh">
            <span className="st">Qualifying Standings</span>
            <a href="#" className="sl">Full Table <ChevronRight size={14}/></a>
          </div>
          <div className="ctabs">
            {confTabs.map(t=>(
              <button key={t} className={`ctab ${activeConf===t?"on":""}`} onClick={()=>setActiveConf(t)}>{t}</button>
            ))}
          </div>
          <table className="tbl">
            <thead>
              <tr>{["#","Team","P","W","D","L","GD","Pts"].map(h=><th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {standings.map((row,i)=>(
                <tr key={row.pos} style={{background:i%2===0?"white":"#fafafa"}}>
                  <td>
                    {i<3
                      ?<span style={{background:GREEN,color:"white",padding:"2px 9px",fontWeight:800,borderRadius:2,fontSize:12}}>{row.pos}</span>
                      :<span style={{fontWeight:700,color:"#999"}}>{row.pos}</span>}
                  </td>
                  <td>{row.team}</td>
                  <td style={{color:"#888"}}>{row.p}</td>
                  <td style={{color:"#888"}}>{row.w}</td>
                  <td style={{color:"#888"}}>{row.d}</td>
                  <td style={{color:"#888"}}>{row.l}</td>
                  <td style={{fontWeight:700,color:row.gd.startsWith("+")?"#00a550":"#c8102e"}}>{row.gd}</td>
                  <td style={{fontWeight:800,color:BLUE,fontSize:15}}>{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{marginTop:14,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:10,height:10,background:GREEN,display:"inline-block",borderRadius:2}}/>
            <span style={{fontSize:11,color:"#888",fontWeight:500}}>Qualified for FIFA World Cup 2026</span>
          </div>
        </div>
      </div>

      {/* ── WC 2026 PROMO ── */}
      <div className="promo">
        <div className="promo-ring" style={{right:-100,top:-100,width:400,height:400,border:"60px solid rgba(255,255,255,.03)"}}/>
        <div className="promo-ring" style={{right:80,bottom:-120,width:280,height:280,border:"40px solid rgba(245,166,35,.07)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <Globe size={18} color="rgba(255,255,255,.4)"/>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"rgba(255,255,255,.4)",letterSpacing:6}}>FIFA</span>
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:"white",letterSpacing:4,lineHeight:1}}>WORLD CUP</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:70,color:YELLOW,letterSpacing:6,lineHeight:1,marginBottom:18}}>2026™</div>
          <p style={{color:"rgba(255,255,255,.7)",fontSize:15,maxWidth:440,lineHeight:1.7}}>
            USA · Canada · Mexico — 48 nations, 104 matches, one dream.<br/>The biggest World Cup in history starts here.
          </p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14,position:"relative",zIndex:1}}>
          <button className="btn-yellow"><Ticket size={15}/>Get Tickets</button>
          <button className="btn-ghost"><Trophy size={14}/>Learn More</button>
        </div>
      </div>

      {/* ── HOST CITIES ── */}
      <div style={{background:"#f0f0f0",padding:"48px 0"}}>
        <div className="wrap">
          <div className="sh">
            <span className="st">Host Cities</span>
            <a href="#" className="sl">All Venues <ChevronRight size={14}/></a>
          </div>
          <div className="vgrid">
            {venues.map(v=>(
              <div key={v.name} className="vc">
                <img src={v.img} alt={v.name}/>
                <div className="vc-overlay">
                  <span className="vc-name">{v.name}</span>
                  <span className="vc-country"><MapPin size={10}/>{v.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOST NATIONS ── */}
      <div>
        <div className="wrap" style={{paddingBottom:18}}>
          <div className="sh"><span className="st">Host Nations</span></div>
        </div>
        <div className="hgrid">
          {hostNations.map(h=>(
            <div key={h.code} className="hc">
              <img src={h.img} alt={h.name}/>
              <div className="hc-overlay">
                <span style={{fontSize:44}}>{h.flag}</span>
                <span className="hc-code">{h.code}</span>
                <span className="hc-name">{h.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SOCIAL FEED ── */}
      <div style={{background:"white",padding:"48px 0"}}>
        <div className="wrap">
          <div className="sh">
            <span className="st">Social Feed</span>
            <a href="#" className="sl"><Users size={13}/>Follow @FIFAWorldCup <ChevronRight size={14}/></a>
          </div>
          <div className="sgrid">
            {socialPosts.map((post,i)=>(
              <div key={i} className="sc">
                <div className="sc-img">
                  <img src={post.img} alt=""/>
                  <div className="sc-ov"/>
                  <div className="sc-likes"><Heart size={12} fill="white" color="white"/>{post.likes}</div>
                </div>
                <div style={{padding:"12px 14px 16px"}}>
                  <p style={{fontSize:12,fontWeight:800,color:BLUE,marginBottom:5}}>{post.handle}</p>
                  <p style={{fontSize:12,color:"#555",lineHeight:1.5}}>{post.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}