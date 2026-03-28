import { useState } from "react";
const C    = { black: "#0d0d0d", border: "#eeeeee", mid: "#666666", light: "#f8f8f8" };
const FONT = { display: "'Barlow Condensed', sans-serif", body: "'Barlow', sans-serif" };

const SOCIALS = [
  {
    label: "X",
    href: "https://twitter.com/FIFAWorldCup",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/FIFAWorldCup",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/FIFAWorldCup",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
];

const GROUPS = [
  {
    label: "FIFA PARTNERS",
    items: [
      { name: "adidas",        src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",h: 32 },
      { name: "Coca-Cola",     src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",h: 28 },
      { name: "Hyundai Kia",   src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg",h: 22 },
      { name: "VISA",          src: "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png",h: 30}  
    ],
  },
];

function Logo({ name, src, h }) {
  return (
    <div style={{ padding: "0 24px", opacity: 0.6, transition: "0.2s" }}>
      <img src={src} alt={name} style={{ height: h, width: "auto", maxWidth: 120, objectFit: "contain" }} />
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root { background: #fcfcfc; border-top: 1px solid #eeeeee; padding-top: 80px; font-family: ${FONT.body}; }
        .ft-inner { max-width: 1380px; margin: 0 auto; padding: 0 32px; }
        
        .ft-brand { margin-bottom: 48px; }
        .ft-logo { font-family: ${FONT.display}; font-size: 32px; font-weight: 900; color: #0d0d0d; text-decoration: none; display: block; margin-bottom: 24px; }
        
        .ft-nav { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 48px; border-top: 1px solid #eee; padding-top: 48px; margin-bottom: 64px; }
        .ft-col h4 { font-family: ${FONT.display}; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #c8102e; margin-bottom: 24px; }
        .ft-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .ft-col a { color: #666; text-decoration: none; font-size: 14px; font-weight: 600; transition: 0.2s; }
        .ft-col a:hover { color: #c8102e; }
        
        .ft-bottom { background: #ffffff; border-top: 1px solid #eeeeee; padding: 32px 0; }
        .ft-legal { display: flex; gap: 32px; }
        .ft-llink { font-size: 12px; color: #999; text-decoration: none; font-weight: 600; }
        .ft-copy { font-size: 12px; color: #999; font-weight: 500; }
      `}</style>

      <footer className="ft-root">
        <div className="ft-inner">
          <div className="ft-brand">
            <a href="/" className="ft-logo">FIFA WORLD CUP™</a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
               <p style={{ color: "#666", lineHeight: 1.6, maxWidth: 450, margin: 0 }}>Le rendez-vous historique du centenaire. Six nations, trois continents, une seule passion universelle.</p>
               <div style={{ display: "flex", gap: 16 }}>
                  {SOCIALS.map(s => (
                    <a key={s.label} href={s.href} style={{ color: "#0d0d0d", opacity: 0.6, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #eee", borderRadius: "50%" }}>{s.icon}</a>
                  ))}
               </div>
            </div>
          </div>
          
          <div className="ft-nav">
              <div className="ft-col">
                <h4>Compétition</h4>
                <ul>
                  <li><a href="/matches">Calendrier</a></li>
                  <li><a href="/standings">Classements</a></li>
                  <li><a href="/teams">Équipes</a></li>
                </ul>
              </div>
              <div className="ft-col">
                <h4>Infos Fans</h4>
                <ul>
                  <li><a href="/tickets">Billetterie</a></li>
                  <li><a href="/hospitality">Hospitalité</a></li>
                  <li><a href="/fans">Fan Zones</a></li>
                </ul>
              </div>
              <div className="ft-col">
                <h4>Villes Hôtes</h4>
                <ul>
                  <li><a href="/cities">Rabat</a></li>
                  <li><a href="/cities">Madrid</a></li>
                  <li><a href="/cities">Lisbonne</a></li>
                </ul>
              </div>
              <div className="ft-col">
                <h4>FIFA+</h4>
                <ul>
                  <li><a href="/highlights">Temps Forts</a></li>
                  <li><a href="/news">Actualités</a></li>
                  <li><a href="/login">Mon compte</a></li>
                </ul>
              </div>
          </div>
          
          <div style={{ textAlign: "center", padding: "64px 0", borderTop: "1px solid #eee" }}>
             <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.2em", color: "#bbb", textTransform: "uppercase", marginBottom: 32 }}>FIFA Partners</p>
             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 48 }}>
                {GROUPS[0].items.map(i => <Logo key={i.name} {...i} />)}
             </div>
          </div>
        </div>
        
        <div className="ft-bottom">
           <div className="ft-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
              <div className="ft-legal">
                 <a href="/privacy" className="ft-llink">Confidentialité</a>
                 <a href="/terms" className="ft-llink">Conditions</a>
                 <a href="/cookies" className="ft-llink">Cookies</a>
              </div>
              <div className="ft-copy">© 2030 FIFA WORLD CUP™ | TOUS DROITS RÉSERVÉS.</div>
           </div>
        </div>
      </footer>
    </>
  );
}
