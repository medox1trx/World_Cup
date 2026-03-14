import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FiSearch, FiGlobe, FiUser, FiX, FiChevronDown, FiShoppingCart,
} from "react-icons/fi";

const NAV_LINKS = [
  { label: "RÉSULTATS & CALENDRIER",   href: "/matches"       },
  { label: "CLASSEMENTS",              href: "/standings"     },
  { label: "ÉQUIPES",                  href: "/teams"         },
  { label: "QUALIFICATIONS",           href: "/qualifications"},
  { label: "LES PAYS ET VILLES HÔTES", href: "/cities"        },
  { label: "BILLETS",                  href: "/tickets"       },
  { label: "HOSPITALITÉ",              href: "/hospitality"   },
];

const LANGS = ["FR", "EN", "ES", "AR", "PT", "DE", "ZH"];

export default function Header() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen,   setLangOpen]   = useState(false);
  const [query,      setQuery]      = useState("");
  const [lang,       setLang]       = useState("FR");
  const [scrolled,   setScrolled]   = useState(false);
  const searchRef = useRef(null);
  const location  = useLocation();

  // Close all panels on navigation
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setLangOpen(false);
    setQuery("");
  }, [location]);

  // Shadow on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const fn = (e) => {
      if (!e.target.closest(".hdr-lang-wrap")) setLangOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [langOpen]);

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

        :root {
          --hdr-bg:       #0d0d0d;
          --hdr-border:   rgba(255,255,255,0.07);
          --hdr-accent:   #ffffff;
          --hdr-accent-lt:#e0e0e0;
          --hdr-muted:    rgba(255,255,255,0.48);
          --hdr-hover:    rgba(255,255,255,0.08);
          --hdr-h:        62px;
          --hdr-font:     'Barlow Condensed', sans-serif;
          --hdr-body:     'Barlow', sans-serif;
        }

        /* ── ROOT ── */
        .hdr-root {
          background: var(--hdr-bg);
          border-bottom: 1px solid var(--hdr-border);
          font-family: var(--hdr-font);
          position: relative;
          transition: box-shadow 0.3s;
        }
        .hdr-root.scrolled {
          box-shadow: 0 4px 32px rgba(0,0,0,0.55);
        }

        /* ── ACCENT LINE ── */
        .hdr-accent-line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: rgba(255,255,255,0.1);
          pointer-events: none;
        }

        /* ── INNER WRAPPER ── */
        .hdr-inner {
          max-width: 1440px; margin: 0 auto;
          padding: 0 20px;
          display: flex; align-items: center;
          height: var(--hdr-h); gap: 0;
          position: relative;
        }

        /* ── LOGO ── */
        .hdr-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
          margin-right: 16px;
          padding: 8px 0;
        }
        .hdr-logo img {
          height: 40px; width: auto; object-fit: contain;
          display: block;
        }
        .hdr-logo-fallback {
          display: none;
          flex-direction: column; gap: 2px;
        }
        .hdr-logo-fallback .t1 {
          color: white; font-size: 14px; font-weight: 900;
          letter-spacing: 0.1em; line-height: 1;
          font-family: var(--hdr-font);
        }
        .hdr-logo-fallback .t2 {
          color: #ffffff; font-size: 12px; font-weight: 800;
          letter-spacing: 0.14em; line-height: 1;
          font-family: var(--hdr-font);
        }

        /* ── DESKTOP NAV ── */
        .hdr-nav {
          display: flex; align-items: stretch;
          height: var(--hdr-h); flex: 1;
          overflow-x: auto;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .hdr-nav::-webkit-scrollbar { display: none; }

        .hdr-navlink {
          position: relative;
          display: flex; align-items: center;
          padding: 0 14px; height: 100%;
          color: var(--hdr-muted);
          text-decoration: none;
          font-family: var(--hdr-font);
          font-size: 12.5px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: color 0.18s, border-color 0.18s;
        }
        .hdr-navlink::after {
          content: '';
          position: absolute; bottom: -1px; left: 14px; right: 14px;
          height: 2px; background: var(--hdr-accent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.22s ease;
        }
        .hdr-navlink:hover { color: white; }
        .hdr-navlink:hover::after { transform: scaleX(1); }
        .hdr-navlink.active { color: white; }
        .hdr-navlink.active::after { transform: scaleX(1); }

        /* ── RIGHT CONTROLS ── */
        .hdr-right {
          display: flex; align-items: center;
          gap: 2px; margin-left: 12px; flex-shrink: 0;
        }

        /* Icon button */
        .hdr-icon-btn {
          background: none; border: none; cursor: pointer;
          color: var(--hdr-muted);
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 4px;
          transition: background 0.15s, color 0.15s;
          font-family: var(--hdr-font);
        }
        .hdr-icon-btn:hover { background: var(--hdr-hover); color: white; }
        .hdr-icon-btn.active-btn { background: var(--hdr-hover); color: white; }

        /* Language selector */
        .hdr-lang-wrap { position: relative; }
        .hdr-lang-btn {
          display: flex; align-items: center; gap: 5px;
          background: none; border: 1px solid rgba(255,255,255,0.12);
          color: var(--hdr-muted); cursor: pointer;
          font-family: var(--hdr-font);
          font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
          padding: 0 10px; height: 34px; border-radius: 3px;
          transition: all 0.15s;
        }
        .hdr-lang-btn:hover { border-color: rgba(255,255,255,0.35); color: white; }
        .hdr-lang-btn .chevron {
          transition: transform 0.2s; color: var(--hdr-muted);
        }
        .hdr-lang-btn.open .chevron { transform: rotate(180deg); }

        .hdr-lang-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px; overflow: hidden;
          min-width: 90px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6);
          z-index: 100;
          opacity: 0; pointer-events: none;
          transform: translateY(-6px);
          transition: opacity 0.18s, transform 0.18s;
        }
        .hdr-lang-dropdown.open {
          opacity: 1; pointer-events: all; transform: translateY(0);
        }
        .hdr-lang-option {
          display: block; width: 100%; text-align: left;
          padding: 9px 16px; border: none;
          background: transparent; cursor: pointer;
          font-family: var(--hdr-font);
          font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          transition: background 0.12s, color 0.12s;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .hdr-lang-option:last-child { border-bottom: none; }
        .hdr-lang-option:hover { background: rgba(255,255,255,0.06); color: white; }
        .hdr-lang-option.sel { color: #ffffff; }

        /* Tickets CTA */
        .hdr-tickets {
          display: flex; align-items: center; gap: 7px;
          background: var(--hdr-accent);
          color: #0d0d0d; text-decoration: none;
          font-family: var(--hdr-font);
          font-size: 12px; font-weight: 900;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0 18px; height: 36px; border-radius: 2px;
          margin-left: 6px;
          transition: background 0.18s, transform 0.15s;
          white-space: nowrap; flex-shrink: 0;
        }
        .hdr-tickets:hover {
          background: var(--hdr-accent-lt);
          transform: translateY(-1px);
        }
        .hdr-tickets:active { transform: translateY(0); }

        /* ── SEARCH PANEL ── */
        .hdr-search-panel {
          position: absolute; top: 100%; left: 0; right: 0; z-index: 20;
          background: #111;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          transition: max-height 0.28s ease, opacity 0.22s;
        }
        .hdr-search-panel.closed { max-height: 0; opacity: 0; pointer-events: none; }
        .hdr-search-panel.open   { max-height: 80px; opacity: 1; }

        .hdr-search-inner {
          max-width: 680px; margin: 0 auto;
          padding: 14px 20px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .hdr-search-input {
          flex: 1; background: none; border: none; outline: none;
          color: white;
          font-family: var(--hdr-body);
          font-size: 15px; font-weight: 500;
          letter-spacing: 0.01em;
        }
        .hdr-search-input::placeholder { color: rgba(255,255,255,0.25); }

        /* ── HAMBURGER ── */
        .hdr-hamburger {
          display: none; flex-direction: column;
          justify-content: center; gap: 5px;
          background: none; border: none; cursor: pointer;
          padding: 8px; margin-right: 10px; flex-shrink: 0;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .hdr-hamburger:hover { background: var(--hdr-hover); }
        .hdr-hamburger span {
          display: block; width: 22px; height: 2px;
          background: white;
          transition: transform 0.28s, opacity 0.2s, width 0.2s;
          transform-origin: center;
        }
        .hdr-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hdr-hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
        .hdr-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE MENU ── */
        .hdr-mobile-menu {
          overflow: hidden;
          transition: max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.25s;
          background: #0f0f0f;
        }
        .hdr-mobile-menu.closed { max-height: 0; opacity: 0; }
        .hdr-mobile-menu.open   { max-height: 600px; opacity: 1; }

        .hdr-mobile-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          font-family: var(--hdr-font);
          font-size: 14px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.15s, background 0.15s, padding-left 0.15s;
        }
        .hdr-mobile-link:hover {
          color: white; background: rgba(255,255,255,0.03); padding-left: 24px;
        }
        .hdr-mobile-link.active { color: #ffffff; }
        .hdr-mobile-link-arrow { color: rgba(255,255,255,0.18); font-size: 18px; }

        .hdr-mobile-footer {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hdr-mobile-tickets {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: var(--hdr-accent); color: #0d0d0d;
          text-decoration: none;
          font-family: var(--hdr-font);
          font-size: 13px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 11px 20px; border-radius: 2px;
          transition: background 0.15s;
        }
        .hdr-mobile-tickets:hover { background: var(--hdr-accent-lt); }

        /* ── BREAKPOINTS ── */

        /* Tablet: hide long nav labels */
        @media (max-width: 1200px) {
          .hdr-navlink { padding: 0 10px; font-size: 11.5px; }
          .hdr-tickets { display: none; }
        }

        /* Small tablet: switch to hamburger */
        @media (max-width: 900px) {
          .hdr-nav        { display: none; }
          .hdr-hamburger  { display: flex; }
          .hdr-right .hdr-lang-wrap { display: none; }
          :root { --hdr-h: 58px; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .hdr-inner { padding: 0 14px; }
          :root { --hdr-h: 54px; }
          .hdr-logo img { height: 34px; }
        }

        /* Very small */
        @media (max-width: 380px) {
          :root { --hdr-h: 50px; }
          .hdr-logo img { height: 30px; }
          .hdr-inner { padding: 0 12px; }
        }
      `}</style>

      <header className={`hdr-root${scrolled ? " scrolled" : ""}`}>
        <div className="hdr-accent-line" />

        {/* ── MAIN BAR ── */}
        <div className="hdr-inner">

          {/* Hamburger (mobile/tablet) */}
          <button
            className={`hdr-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>

          {/* Logo */}
          <a href="/" className="hdr-logo">
            <img
              src="/WC26_Logo.avif"
              alt="FIFA World Cup 2030"
              onError={e => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hdr-logo-fallback">
              <span className="t1">WORLD CUP</span>
              <span className="t2">2030 ™</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hdr-nav" aria-label="Navigation principale">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`hdr-navlink${isActive(link.href) ? " active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hdr-right">

            {/* Search */}
            <button
              className={`hdr-icon-btn${searchOpen ? " active-btn" : ""}`}
              onClick={() => setSearchOpen(o => !o)}
              aria-label="Rechercher"
            >
              {searchOpen ? <FiX size={18} /> : <FiSearch size={18} />}
            </button>

            {/* Language */}
            <div className="hdr-lang-wrap">
              <button
                className={`hdr-lang-btn${langOpen ? " open" : ""}`}
                onClick={() => setLangOpen(o => !o)}
                aria-label="Langue"
              >
                <FiGlobe size={13} />
                {lang}
                <FiChevronDown size={11} className="chevron" />
              </button>
              <div className={`hdr-lang-dropdown${langOpen ? " open" : ""}`}>
                {LANGS.map(l => (
                  <button
                    key={l}
                    className={`hdr-lang-option${lang === l ? " sel" : ""}`}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* User */}
            <button className="hdr-icon-btn" aria-label="Mon compte">
              <FiUser size={18} />
            </button>

            {/* Tickets (hidden on small screens) */}
            <a href="/tickets" className="hdr-tickets">
              <FiShoppingCart size={13} />
              Billets
            </a>

          </div>
        </div>

        {/* ── SEARCH PANEL ── */}
        <div className={`hdr-search-panel${searchOpen ? " open" : " closed"}`}>
          <div className="hdr-search-inner">
            <FiSearch size={16} color="rgba(255,255,255,0.25)" style={{ flexShrink: 0 }} />
            <input
              ref={searchRef}
              className="hdr-search-input"
              placeholder="Rechercher matchs, équipes, joueurs…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Escape" && setSearchOpen(false)}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4 }}
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`hdr-mobile-menu${menuOpen ? " open" : " closed"}`}
          aria-hidden={!menuOpen}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`hdr-mobile-link${isActive(link.href) ? " active" : ""}`}
            >
              {link.label}
              <span className="hdr-mobile-link-arrow">›</span>
            </a>
          ))}
          <div className="hdr-mobile-footer">
            <button className="hdr-icon-btn" style={{ color: "rgba(255,255,255,0.5)" }}>
              <FiGlobe size={18} />
            </button>
            <button className="hdr-icon-btn" style={{ color: "rgba(255,255,255,0.5)" }}>
              <FiUser size={18} />
            </button>
            <a href="/tickets" className="hdr-mobile-tickets">
              <FiShoppingCart size={14} />
              Acheter des billets
            </a>
          </div>
        </div>

      </header>
    </>
  );
}