import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FiSearch, FiGlobe, FiUser, FiX,
  FiChevronDown, FiShoppingCart,
} from "react-icons/fi";

const NAV = [
  {
    label: "Compétition",
    children: [
      { label: "Résultats & Calendrier", href: "/matches"       },
      { label: "Classements",            href: "/standings"      },
      { label: "Équipes",                href: "/teams"          },
      { label: "Qualifications",         href: "/qualifications" },
    ],
  },
  {
    label: "Médias",
    badge: "NEW",
    children: [
      { label: "Temps Forts",  href: "/highlights", badge: "NEW"  },
      { label: "Actualités",   href: "/news",        badge: "LIVE" },
    ],
  },
  {
    label: "Découvrir",
    children: [
      { label: "Villes Hôtes", href: "/cities" },
      { label: "Fan Zone",     href: "/fans"   },
    ],
  },
  {
    label: "Billetterie",
    children: [
      { label: "Billets",     href: "/tickets"     },
      { label: "Hospitalité", href: "/hospitality" },
    ],
  },
];

const LANGS = ["FR", "EN", "ES", "AR", "PT", "DE"];

export default function Header() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen,   setLangOpen]   = useState(false);
  const [openDrop,   setOpenDrop]   = useState(null);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [query,      setQuery]      = useState("");
  const [lang,       setLang]       = useState("FR");
  const [scrolled,   setScrolled]   = useState(false);

  const searchRef = useRef(null);
  const langRef   = useRef(null);
  const navRef    = useRef(null);
  const location  = useLocation();

  useEffect(() => {
    setMenuOpen(false); setSearchOpen(false);
    setLangOpen(false); setOpenDrop(null);
    setMobileOpen(null); setQuery("");
  }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const groupActive = (item) =>
    item.children?.some(c => isActive(c.href));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

        :root {
          --hh: 72px;
          --hbg: #ffffff;
          --hborder: #eeeeee;
          --htext: #0d0d0d;
          --hmuted: #666666;
          --hhover: #f8f8f8;
          --hfont: 'Barlow Condensed', sans-serif;
          --hbody: 'Barlow', sans-serif;
        }

        .hdr {
          position: sticky; top: 0; z-index: 1000;
          background: var(--hbg);
          border-bottom: 1px solid var(--hborder);
          transition: 0.3s;
        }
        .hdr.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.05); }

        .hdr-bar {
          max-width: 1440px; margin: 0 auto; padding: 0 32px;
          display: flex; align-items: center;
          height: var(--hh);
        }

        .hdr-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; margin-right: 40px; }
        .hdr-logo img { height: 44px; width: auto; }

        .hdr-nav { flex: 1; display: flex; align-items: stretch; height: 100%; position: relative; }
        .hdr-item { position: relative; display: flex; align-items: center; height: 100%; }

        .hdr-link {
          display: flex; align-items: center; gap: 6px; padding: 0 16px; height: 100%;
          color: var(--hmuted); text-decoration: none; font-family: var(--hfont);
          font-size: 13px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;
          white-space: nowrap; cursor: pointer; background: none; border: none; transition: 0.2s;
        }
        .hdr-link:hover { color: var(--htext); }
        .hdr-link.act, .hdr-link.grp { color: var(--htext); }
        .hdr-link::after {
          content: ''; position: absolute; bottom: 0; left: 16px; right: 16px;
          height: 3px; background: #c8102e; transform: scaleX(0); transition: 0.2s;
        }
        .hdr-link.act::after, .hdr-link.grp::after { transform: scaleX(1); }

        .hdr-drop {
          position: absolute; top: 100%; left: 0; background: white;
          border: 1px solid #eee; border-top: 3px solid #c8102e; min-width: 240px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08); opacity: 0; pointer-events: none;
          transform: translateY(10px); transition: 0.2s;
        }
        .hdr-drop.open { opacity: 1; pointer-events: all; transform: translateY(0); }
        .hdr-drop-item {
          display: block; padding: 14px 24px; color: #444; text-decoration: none;
          font-family: var(--hbody); font-size: 14px; font-weight: 600; border-bottom: 1px solid #f5f5f5;
          transition: 0.2s;
        }
        .hdr-drop-item:hover { background: #fcfcfc; color: #c8102e; padding-left: 30px; }

        .hdr-right { display: flex; align-items: center; gap: 8px; margin-left: 24px; }
        .hdr-btn {
          background: none; border: none; cursor: pointer; color: var(--hmuted);
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          border-radius: 50%; transition: 0.2s;
        }
        .hdr-btn:hover { background: var(--hhover); color: var(--htext); }

        .hdr-tickets {
          background: #0d0d0d; color: white; text-decoration: none; font-family: var(--hfont);
          font-size: 11px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 10px 24px; borderRadius: 100px; margin-left: 12px; transition: 0.2s;
          display: flex; alignItems: center; gap: 8px;
        }
        .hdr-tickets:hover { background: #333; transform: translateY(-2px); }

        @media (max-width: 1024px) {
          .hdr-nav { display: none; }
          .hdr-tickets { display: none; }
        }
      `}</style>

      <header className={`hdr${scrolled ? " scrolled" : ""}`}>
        <div className="hdr-bar">
          <a href="/" className="hdr-logo">
            <img src="/WC26_Logo.avif" alt="FIFA World Cup 2030" />
          </a>

          <nav className="hdr-nav" ref={navRef}>
            {NAV.map((item) => {
              const isOpen = openDrop === item.label;
              return (
                <div key={item.label} className="hdr-item"
                  onMouseEnter={() => setOpenDrop(item.label)}
                  onMouseLeave={() => setOpenDrop(null)}>
                  <button className={`hdr-link ${groupActive(item) ? 'grp' : ''}`}>
                    {item.label} <FiChevronDown style={{ marginLeft: 4 }} />
                  </button>
                  <div className={`hdr-drop${isOpen ? " open" : ""}`}>
                    {item.children.map(child => (
                      <a key={child.href} href={child.href} className="hdr-drop-item">
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hdr-right">
            <button className="hdr-btn"><FiSearch size={20} /></button>
            <button className="hdr-btn"><FiGlobe size={20} /></button>
            <a href="/login" className="hdr-btn"><FiUser size={20} /></a>
            <a href="/tickets" className="hdr-tickets">
              <FiShoppingCart /> Billetterie
            </a>
          </div>
        </div>
      </header>
    </>
  );
}