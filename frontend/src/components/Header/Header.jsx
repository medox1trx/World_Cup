import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiSearch, FiGlobe, FiUser, FiX,
  FiChevronDown, FiShoppingCart,
  FiLogOut, FiFileText, FiUsers,
  FiSun, FiMoon, FiCalendar,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useSeason } from "../../context/SeasonContext";

// ─── Navigation structure ─────────────────────────────────────
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
  const [userOpen,   setUserOpen]   = useState(false);
  const [seasonOpen, setSeasonOpen] = useState(false);

  const { darkMode, toggleTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const { season, selectSeason, clearSeason, seasons } = useSeason();
  const navigate = useNavigate();

  const searchRef  = useRef(null);
  const langRef    = useRef(null);
  const navRef     = useRef(null);
  const userRef    = useRef(null);
  const seasonRef  = useRef(null);
  const location   = useLocation();

  useEffect(() => {
    setMenuOpen(false); setSearchOpen(false);
    setLangOpen(false); setOpenDrop(null);
    setUserOpen(false); setSeasonOpen(false);
    setMobileOpen(null); setQuery("");
  }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80);
  }, [searchOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const fn = (e) => { if (!langRef.current?.contains(e.target)) setLangOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [langOpen]);

  useEffect(() => {
    if (!openDrop) return;
    const fn = (e) => { if (!navRef.current?.contains(e.target)) setOpenDrop(null); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [openDrop]);

  useEffect(() => {
    if (!userOpen) return;
    const fn = (e) => { if (!userRef.current?.contains(e.target)) setUserOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [userOpen]);

  useEffect(() => {
    if (!seasonOpen) return;
    const fn = (e) => { if (!seasonRef.current?.contains(e.target)) setSeasonOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [seasonOpen]);

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const groupActive = (item) =>
    item.children?.some(c => isActive(c.href));

  const handleLogout = async () => {
    await logout();
    setUserOpen(false);
    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

        :root {
          --hh: 62px;
          --hbg: #0d0d0d;
          --hborder: rgba(255,255,255,0.07);
          --hmuted: rgba(255,255,255,0.42);
          --hhover: rgba(255,255,255,0.07);
          --hfont: 'Barlow Condensed', sans-serif;
          --hbody: 'Barlow', sans-serif;
        }

        .hdr {
          position: sticky; top: 0; z-index: 1000;
          background: var(--hbg);
          border-bottom: 1px solid var(--hborder);
          transition: box-shadow 0.3s;
        }
        .hdr.scrolled { box-shadow: 0 4px 40px rgba(0,0,0,0.65); }

        .hdr-bar {
          max-width: 1440px; margin: 0 auto; padding: 0 20px;
          display: flex; align-items: center;
          height: var(--hh); gap: 0;
          position: relative;
        }

        .hdr-ham {
          display: none; flex-direction: column; justify-content: center; gap: 5px;
          background: none; border: none; cursor: pointer;
          padding: 6px; margin-right: 10px; flex-shrink: 0;
          border-radius: 3px; width: 36px; height: 36px;
          transition: background 0.15s;
        }
        .hdr-ham:hover { background: var(--hhover); }
        .hdr-ham span {
          display: block; height: 2px; background: white;
          transition: transform 0.26s, opacity 0.2s, width 0.2s;
          transform-origin: center; border-radius: 1px;
        }
        .hdr-ham span:nth-child(1) { width: 20px; }
        .hdr-ham span:nth-child(2) { width: 14px; }
        .hdr-ham span:nth-child(3) { width: 20px; }
        .hdr-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 20px; }
        .hdr-ham.open span:nth-child(2) { opacity: 0; width: 0; }
        .hdr-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 20px; }

        .hdr-logo {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none; flex-shrink: 0; margin-right: 12px;
        }
        .hdr-logo img { height: 38px; width: auto; display: block; }
        .hdr-logo-fb { display: none; flex-direction: column; gap: 2px; }
        .hdr-logo-fb .t1 { color: white; font-family: var(--hfont); font-size: 13px; font-weight: 900; letter-spacing: 0.1em; line-height: 1; }
        .hdr-logo-fb .t2 { color: rgba(255,255,255,0.45); font-family: var(--hfont); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; line-height: 1; }

        .hdr-nav {
          flex: 1; min-width: 0;
          display: flex; align-items: stretch;
          height: var(--hh);
          position: relative; overflow: visible;
        }

        .hdr-item { position: relative; display: flex; align-items: center; height: 100%; }

        .hdr-link {
          display: flex; align-items: center; gap: 2px;
          padding: 0 8px; height: 100%;
          color: var(--hmuted); text-decoration: none;
          font-family: var(--hfont);
          font-size: clamp(10px, 0.85vw, 11.5px);
          font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
          white-space: nowrap; cursor: pointer;
          background: none; border: none;
          transition: color 0.15s;
          position: relative;
        }
        .hdr-link::after {
          content: ''; position: absolute;
          bottom: 0; left: 12px; right: 12px;
          height: 2px; background: white;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.22s ease;
        }
        .hdr-link:hover        { color: white; }
        .hdr-link:hover::after { transform: scaleX(1); }
        .hdr-link.act          { color: white; }
        .hdr-link.act::after   { transform: scaleX(1); }
        .hdr-link.grp          { color: rgba(255,255,255,0.72); }
        .hdr-link.grp::after   { transform: scaleX(1); opacity: 0.35; }

        /* Admin links — red color */
        .hdr-link.admin-link          { color: #ef4444; }
        .hdr-link.admin-link::after   { background: #ef4444; }
        .hdr-link.admin-link:hover    { color: #f87171; }
        .hdr-link.admin-link.act      { color: #ef4444; }
        .hdr-link.admin-link.act::after { background: #ef4444; }

        .hdr-chev { opacity: 0.35; flex-shrink: 0; transition: transform 0.2s, opacity 0.15s; }
        .hdr-link.drop-open .hdr-chev { transform: rotate(180deg); opacity: 0.65; }

        .hdr-badge {
          display: inline-flex; align-items: center;
          background: white; color: #0d0d0d;
          font-family: var(--hfont); font-size: 7px; font-weight: 900;
          letter-spacing: 0.05em; padding: 1px 4px; border-radius: 2px;
          margin-left: 2px; line-height: 1.2; flex-shrink: 0;
        }
        .hdr-badge.admin-badge {
          background: #ef4444; color: white;
          font-size: 6px;
        }

        .hdr-drop {
          position: absolute; top: calc(100% + 1px); left: 0;
          background: #171717;
          border: 1px solid rgba(255,255,255,0.1);
          border-top: 2px solid white;
          border-radius: 0 0 4px 4px;
          overflow: hidden;
          min-width: 210px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.7);
          z-index: 9999;
          opacity: 0; pointer-events: none;
          transform: translateY(-6px);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .hdr-drop.open { opacity: 1; pointer-events: all; transform: translateY(0); }

        .hdr-drop-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px;
          color: rgba(255,255,255,0.48); text-decoration: none;
          font-family: var(--hbody); font-size: 13px; font-weight: 600;
          letter-spacing: 0.02em;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.12s, color 0.12s, padding-left 0.15s;
          position: relative;
        }
        .hdr-drop-item:last-child { border-bottom: none; }
        .hdr-drop-item:hover { background: rgba(255,255,255,0.05); color: white; padding-left: 22px; }
        .hdr-drop-item.act { color: white; background: rgba(255,255,255,0.04); }
        .hdr-drop-item.act::before {
          content: ''; position: absolute; left: 8px; top: 50%; transform: translateY(-50%);
          width: 3px; height: 3px; border-radius: 50%; background: white;
        }

        .hdr-drop-badge {
          background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.6);
          font-family: var(--hfont); font-size: 7px; font-weight: 900;
          letter-spacing: 0.14em; padding: 2px 5px; border-radius: 2px;
          flex-shrink: 0; margin-left: 8px;
        }

        .hdr-right { display: flex; align-items: center; gap: 2px; margin-left: 12px; flex-shrink: 0; }

        .hdr-btn {
          background: none; border: none; cursor: pointer;
          color: var(--hmuted); width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 3px;
          transition: background 0.15s, color 0.15s; flex-shrink: 0;
        }
        .hdr-btn:hover   { background: var(--hhover); color: white; }
        .hdr-btn.is-open { background: var(--hhover); color: white; }

        .hdr-theme-btn {
          background: none; border: none; cursor: pointer;
          color: var(--hmuted); width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 3px;
          transition: background 0.15s, color 0.15s, transform 0.3s; flex-shrink: 0;
        }
        .hdr-theme-btn:hover { background: var(--hhover); color: white; }
        .hdr-theme-btn:active { transform: rotate(20deg); }

        .hdr-lang-wrap { position: relative; }
        .hdr-lang-btn {
          display: flex; align-items: center; gap: 5px;
          background: none; border: 1px solid rgba(255,255,255,0.1);
          color: var(--hmuted); cursor: pointer;
          font-family: var(--hfont); font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
          padding: 0 9px; height: 32px; border-radius: 3px; flex-shrink: 0;
          transition: all 0.15s; white-space: nowrap;
        }
        .hdr-lang-btn:hover { border-color: rgba(255,255,255,0.35); color: white; }
        .hdr-lang-btn .lchev { transition: transform 0.2s; }
        .hdr-lang-btn.open .lchev { transform: rotate(180deg); }
        .hdr-lang-drop {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #1c1c1c; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px; overflow: hidden; min-width: 80px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.65); z-index: 9999;
          opacity: 0; pointer-events: none; transform: translateY(-6px);
          transition: opacity 0.16s, transform 0.16s;
        }
        .hdr-lang-drop.open { opacity: 1; pointer-events: all; transform: translateY(0); }
        .hdr-lang-opt {
          display: block; width: 100%; text-align: left;
          padding: 9px 16px; border: none; background: transparent; cursor: pointer;
          font-family: var(--hfont); font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          transition: background 0.1s, color 0.1s;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .hdr-lang-opt:last-child { border-bottom: none; }
        .hdr-lang-opt:hover { background: rgba(255,255,255,0.06); color: white; }
        .hdr-lang-opt.sel { color: white; }

        .hdr-tickets {
          display: flex; align-items: center; gap: 7px;
          background: white; color: #0d0d0d; text-decoration: none;
          font-family: var(--hfont); font-size: 12px; font-weight: 900;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0 16px; height: 34px; border-radius: 2px;
          margin-left: 6px; flex-shrink: 0; white-space: nowrap;
          transition: background 0.15s, transform 0.15s;
        }
        .hdr-tickets:hover  { background: #e8e8e8; transform: translateY(-1px); }
        .hdr-tickets:active { transform: translateY(0); }

        /* ── USER DROPDOWN ── */
        .hdr-user-wrap { position: relative; }

        .hdr-user-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #1c1c1c;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          min-width: 220px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.65);
          z-index: 9999;
          opacity: 0; pointer-events: none;
          transform: translateY(-6px);
          transition: opacity 0.16s, transform 0.16s;
        }
        .hdr-user-dropdown.open { opacity: 1; pointer-events: all; transform: translateY(0); }

        .hdr-user-info {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .hdr-user-name {
          font-family: var(--hfont); font-size: 14px; font-weight: 800;
          color: white; letter-spacing: 0.02em;
        }
        .hdr-user-email {
          font-family: var(--hbody); font-size: 11px;
          color: rgba(255,255,255,0.35); margin-top: 2px;
        }
        .hdr-user-role {
          display: inline-block; margin-top: 6px;
          font-family: var(--hfont); font-size: 7px; font-weight: 900;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 2px 7px; border-radius: 2px;
        }
        .hdr-user-role.admin { background: rgba(234,179,8,0.2); color: #facc15; }
        .hdr-user-role.user  { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); }

        .hdr-user-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 16px;
          color: rgba(255,255,255,0.5);
          font-family: var(--hbody); font-size: 13px; font-weight: 600;
          letter-spacing: 0.02em;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.12s, color 0.12s;
          cursor: pointer; background: none;
          border: none; border-bottom: 1px solid rgba(255,255,255,0.05);
          width: 100%; text-align: left;
          text-decoration: none;
        }
        .hdr-user-item:last-child { border-bottom: none; }
        .hdr-user-item:hover { background: rgba(255,255,255,0.05); color: white; }

        .hdr-user-divider {
          height: 1px; background: rgba(255,255,255,0.06);
          margin: 4px 0;
        }

        /* ── SEASON SELECTOR ── */
        .hdr-season-wrap { position: relative; }

        .hdr-season-btn {
          display: flex; align-items: center; gap: 5px;
          background: none; border: 1px solid rgba(255,255,255,0.1);
          color: var(--hmuted); cursor: pointer;
          font-family: var(--hfont); font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
          padding: 0 9px; height: 32px; border-radius: 3px; flex-shrink: 0;
          transition: all 0.15s; white-space: nowrap;
        }
        .hdr-season-btn:hover { border-color: rgba(255,255,255,0.35); color: white; }
        .hdr-season-btn.active-season { border-color: #c8102e; color: white; }
        .hdr-season-btn .schev { transition: transform 0.2s; }
        .hdr-season-btn.open .schev { transform: rotate(180deg); }

        .hdr-season-drop {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #1c1c1c; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px; overflow: hidden; min-width: 240px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.65); z-index: 9999;
          opacity: 0; pointer-events: none; transform: translateY(-6px);
          transition: opacity 0.16s, transform 0.16s;
        }
        .hdr-season-drop.open { opacity: 1; pointer-events: all; transform: translateY(0); }

        .hdr-season-opt {
          display: flex; flex-direction: column; width: 100%; text-align: left;
          padding: 10px 16px; border: none; background: transparent; cursor: pointer;
          font-family: var(--hbody); font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.45); letter-spacing: 0.02em;
          transition: background 0.1s, color 0.1s;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .hdr-season-opt:last-child { border-bottom: none; }
        .hdr-season-opt:hover { background: rgba(255,255,255,0.06); color: white; }
        .hdr-season-opt.sel { color: white; background: rgba(200,16,46,0.12); }
        .hdr-season-opt-host {
          font-size: 10px; color: rgba(255,255,255,0.3);
          margin-top: 2px; font-weight: 400;
        }
        .hdr-season-opt.sel .hdr-season-opt-host { color: rgba(255,255,255,0.5); }

        .hdr-season-clear {
          display: block; width: 100%; text-align: left;
          padding: 10px 16px; border: none; background: transparent; cursor: pointer;
          font-family: var(--hfont); font-size: 11px; font-weight: 700;
          color: #ef4444; letter-spacing: 0.1em; text-transform: uppercase;
          transition: background 0.1s;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hdr-season-clear:hover { background: rgba(239,68,68,0.1); }

        /* ── SEARCH PANEL ── */
        .hdr-search {
          overflow: hidden;
          background: #111;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: max-height 0.26s ease, opacity 0.2s;
        }
        .hdr-search.closed { max-height: 0; opacity: 0; pointer-events: none; }
        .hdr-search.open   { max-height: 70px; opacity: 1; }
        .hdr-search-inner {
          max-width: 640px; margin: 0 auto; padding: 13px 20px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .hdr-search-input {
          flex: 1; background: none; border: none; outline: none;
          color: white; font-family: var(--hbody);
          font-size: 15px; font-weight: 500;
        }
        .hdr-search-input::placeholder { color: rgba(255,255,255,0.2); }

        .hdr-mob {
          overflow: hidden; background: #0f0f0f;
          transition: max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hdr-mob.closed { max-height: 0; opacity: 0; border-top-color: transparent; }
        .hdr-mob.open   { max-height: 1000px; opacity: 1; }

        .hdr-macc {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 20px;
          color: rgba(255,255,255,0.4);
          font-family: var(--hfont); font-size: 13.5px; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase;
          background: none; border-width: 0 0 1px; border-style: solid;
          border-color: rgba(255,255,255,0.05); cursor: pointer; width: 100%;
          transition: color 0.12s, background 0.12s;
        }
        .hdr-macc:hover { color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.02); }
        .hdr-macc.open  { color: white; }
        .hdr-macc.grp   { color: rgba(255,255,255,0.75); }
        .hdr-macc-r { display: flex; align-items: center; gap: 8px; }
        .hdr-mchev { opacity: 0.35; transition: transform 0.22s, opacity 0.15s; }
        .hdr-macc.open .hdr-mchev { transform: rotate(180deg); opacity: 0.7; }

        .hdr-msub {
          overflow: hidden; background: rgba(0,0,0,0.25);
          transition: max-height 0.24s ease;
        }
        .hdr-msub.closed { max-height: 0; }
        .hdr-msub.open   { max-height: 400px; }
        .hdr-msub-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 20px 12px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.35); text-decoration: none;
          font-family: var(--hbody); font-size: 13px; font-weight: 600;
          transition: color 0.12s, padding-left 0.15s, background 0.12s;
        }
        .hdr-msub-link:hover { color: white; padding-left: 36px; background: rgba(255,255,255,0.02); }
        .hdr-msub-link.act   { color: white; }
        .hdr-msub-link:last-child { border-bottom: 1px solid rgba(255,255,255,0.05); }
        .hdr-msub-badge {
          background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.55);
          font-family: var(--hfont); font-size: 7px; font-weight: 900;
          letter-spacing: 0.14em; padding: 2px 5px; border-radius: 2px;
        }

        .hdr-mfooter {
          display: flex; align-items: center; gap: 8px;
          padding: 13px 20px; border-top: 1px solid rgba(255,255,255,0.07);
        }
        .hdr-mtickets {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: white; color: #0d0d0d; text-decoration: none;
          font-family: var(--hfont); font-size: 13px; font-weight: 900;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 12px 20px; border-radius: 2px; transition: background 0.15s;
        }
        .hdr-mtickets:hover { background: #e8e8e8; }

        @media (max-width: 1180px) {
          .hdr-tickets { display: none; }
          .hdr-link    { padding: 0 9px; font-size: 11px; }
          .hdr-link::after { left: 9px; right: 9px; }
        }
        @media (max-width: 900px) {
          .hdr-nav       { display: none !important; }
          .hdr-lang-wrap { display: none !important; }
          .hdr-ham       { display: flex; }
        }
        @media (max-width: 600px) {
          .hdr-bar { padding: 0 14px; }
          :root { --hh: 54px; }
          .hdr-logo img { height: 32px; }
        }
        @media (max-width: 380px) {
          .hdr-bar { padding: 0 10px; }
          :root { --hh: 50px; }
          .hdr-logo img { height: 28px; }
          .hdr-btn.xs-hide { display: none; }
        }

        ${!darkMode ? `
          :root {
            --hbg: #ffffff;
            --hborder: rgba(0,0,0,0.08);
            --hmuted: rgba(0,0,0,0.45);
            --hhover: rgba(0,0,0,0.05);
          }
          .hdr.scrolled { box-shadow: 0 4px 24px rgba(0,0,0,0.10); }
          .hdr-ham span               { background: #0d0d0d; }
          .hdr-link                   { color: rgba(0,0,0,0.5); }
          .hdr-link:hover             { color: #0d0d0d; }
          .hdr-link::after            { background: #0d0d0d; }
          .hdr-link.act               { color: #0d0d0d; }
          .hdr-link.grp               { color: rgba(0,0,0,0.72); }
          .hdr-link.admin-link        { color: #dc2626; }
          .hdr-link.admin-link::after { background: #dc2626; }
          .hdr-link.admin-link:hover  { color: #ef4444; }
          .hdr-badge                  { background: #0d0d0d; color: white; }
          .hdr-badge.admin-badge      { background: #dc2626; color: white; }
          .hdr-drop                   { background: #fafafa; border-color: rgba(0,0,0,0.08); border-top-color: #0d0d0d; box-shadow: 0 20px 50px rgba(0,0,0,0.12); }
          .hdr-drop-item              { color: rgba(0,0,0,0.48); border-bottom-color: rgba(0,0,0,0.05); }
          .hdr-drop-item:hover        { background: rgba(0,0,0,0.04); color: #0d0d0d; }
          .hdr-drop-item.act          { color: #0d0d0d; background: rgba(0,0,0,0.04); }
          .hdr-drop-item.act::before  { background: #0d0d0d; }
          .hdr-drop-badge             { background: rgba(0,0,0,0.08); color: rgba(0,0,0,0.5); }
          .hdr-btn                    { color: rgba(0,0,0,0.45); }
          .hdr-btn:hover              { background: rgba(0,0,0,0.05); color: #0d0d0d; }
          .hdr-btn.is-open            { background: rgba(0,0,0,0.05); color: #0d0d0d; }
          .hdr-theme-btn              { color: rgba(0,0,0,0.45) !important; }
          .hdr-theme-btn:hover        { background: rgba(0,0,0,0.05) !important; color: #0d0d0d !important; }
          .hdr-lang-btn               { border-color: rgba(0,0,0,0.12); color: rgba(0,0,0,0.5); }
          .hdr-lang-btn:hover         { border-color: rgba(0,0,0,0.35); color: #0d0d0d; }
          .hdr-lang-drop              { background: #fafafa; border-color: rgba(0,0,0,0.08); box-shadow: 0 14px 40px rgba(0,0,0,0.12); }
          .hdr-lang-opt               { color: rgba(0,0,0,0.4); border-bottom-color: rgba(0,0,0,0.04); }
          .hdr-lang-opt:hover         { background: rgba(0,0,0,0.04); color: #0d0d0d; }
          .hdr-lang-opt.sel           { color: #0d0d0d; }
          .hdr-tickets                { background: #0d0d0d; color: white; }
          .hdr-tickets:hover          { background: #333; }
          .hdr-search                 { background: #f5f5f5; border-bottom-color: rgba(0,0,0,0.06); }
          .hdr-search-inner           { border-bottom-color: rgba(0,0,0,0.06); }
          .hdr-search-input           { color: #0d0d0d; }
          .hdr-search-input::placeholder { color: rgba(0,0,0,0.25); }
          .hdr-mob                    { background: #f8f8f8; border-top-color: rgba(0,0,0,0.06); }
          .hdr-macc                   { color: rgba(0,0,0,0.4); border-color: rgba(0,0,0,0.06); }
          .hdr-macc:hover             { color: rgba(0,0,0,0.75); background: rgba(0,0,0,0.02); }
          .hdr-macc.open              { color: #0d0d0d; }
          .hdr-macc.grp               { color: rgba(0,0,0,0.75); }
          .hdr-msub                   { background: rgba(0,0,0,0.03); }
          .hdr-msub-link              { color: rgba(0,0,0,0.35); border-bottom-color: rgba(0,0,0,0.04); }
          .hdr-msub-link:hover        { color: #0d0d0d; background: rgba(0,0,0,0.02); }
          .hdr-msub-link.act          { color: #0d0d0d; }
          .hdr-msub-link:last-child   { border-bottom-color: rgba(0,0,0,0.05); }
          .hdr-msub-badge             { background: rgba(0,0,0,0.08); color: rgba(0,0,0,0.5); }
          .hdr-mfooter                { border-top-color: rgba(0,0,0,0.07); }
          .hdr-mtickets               { background: #0d0d0d; color: white; }
          .hdr-mtickets:hover         { background: #333; }
          .hdr-user-dropdown          { background: #fafafa; border-color: rgba(0,0,0,0.08); box-shadow: 0 14px 40px rgba(0,0,0,0.12); }
          .hdr-user-name              { color: #0d0d0d; }
          .hdr-user-info              { border-bottom-color: rgba(0,0,0,0.06); }
          .hdr-user-item              { color: rgba(0,0,0,0.5); border-bottom-color: rgba(0,0,0,0.04); }
          .hdr-user-item:hover        { background: rgba(0,0,0,0.04); color: #0d0d0d; }
          .hdr-user-divider           { background: rgba(0,0,0,0.06); }
          .hdr-season-btn             { border-color: rgba(0,0,0,0.12); color: rgba(0,0,0,0.5); }
          .hdr-season-btn:hover       { border-color: rgba(0,0,0,0.35); color: #0d0d0d; }
          .hdr-season-btn.active-season { border-color: #c8102e; color: #0d0d0d; }
          .hdr-season-drop            { background: #fafafa; border-color: rgba(0,0,0,0.08); box-shadow: 0 14px 40px rgba(0,0,0,0.12); }
          .hdr-season-opt             { color: rgba(0,0,0,0.5); border-bottom-color: rgba(0,0,0,0.04); }
          .hdr-season-opt:hover       { background: rgba(0,0,0,0.04); color: #0d0d0d; }
          .hdr-season-opt.sel         { color: #0d0d0d; background: rgba(200,16,46,0.08); }
          .hdr-season-opt-host        { color: rgba(0,0,0,0.35); }
          .hdr-season-opt.sel .hdr-season-opt-host { color: rgba(0,0,0,0.5); }
          .hdr-season-clear           { color: #dc2626; }
          .hdr-season-clear:hover     { background: rgba(220,38,38,0.06); }
        ` : ''}
      `}</style>

      <header className={`hdr${scrolled ? " scrolled" : ""}`}>

        <div className="hdr-bar">
          <button className={`hdr-ham${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>

          <Link to="/" className="hdr-logo">
            <img src="/WC26_Logo.avif" alt="FIFA World Cup 2030"
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div className="hdr-logo-fb">
              <span className="t1">WORLD CUP</span>
              <span className="t2">2030 ™</span>
            </div>
          </Link>

          <nav className="hdr-nav" ref={navRef} aria-label="Navigation principale">
            {NAV.map((item) => {
              const isOpen   = openDrop === item.label;
              const gActive  = groupActive(item);
              const linkCls  = [
                "hdr-link",
                gActive  ? "grp"       : "",
                isOpen   ? "drop-open" : "",
              ].filter(Boolean).join(" ");

              return (
                <div key={item.label} className="hdr-item"
                  onMouseEnter={() => setOpenDrop(item.label)}
                  onMouseLeave={() => setOpenDrop(null)}>
                  <button className={linkCls}
                    onClick={() => setOpenDrop(isOpen ? null : item.label)}
                    aria-expanded={isOpen} aria-haspopup="true">
                    {item.label}
                    {item.badge && <span className="hdr-badge">{item.badge}</span>}
                    <FiChevronDown size={10} className="hdr-chev" />
                  </button>
                  <div className={`hdr-drop${isOpen ? " open" : ""}`} role="menu">
                    {item.children.map(child => (
                      <Link key={child.href} to={child.href} role="menuitem"
                        className={`hdr-drop-item${isActive(child.href) ? " act" : ""}`}>
                        {child.label}
                        {child.badge && <span className="hdr-drop-badge">{child.badge}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Admin nav links — visible only to admins */}
            {isAdmin && (
              <>
                <div className="hdr-item">
                  <Link to="/admin/highlights"
                    className={`hdr-link admin-link${isActive("/admin/highlights") ? " act" : ""}`}>
                    Vidéos
                    <span className="hdr-badge admin-badge">ADMIN</span>
                  </Link>
                </div>
                <div className="hdr-item">
                  <Link to="/admin/matches"
                    className={`hdr-link admin-link${isActive("/admin/matches") ? " act" : ""}`}>
                    Calendrier
                    <span className="hdr-badge admin-badge">ADMIN</span>
                  </Link>
                </div>
                <div className="hdr-item">
                  <Link to="/admin/teams"
                    className={`hdr-link admin-link${isActive("/admin/teams") ? " act" : ""}`}>
                    Équipes
                    <span className="hdr-badge admin-badge">ADMIN</span>
                  </Link>
                </div>
                <div className="hdr-item">
                  <Link to="/admin/tickets"
                    className={`hdr-link admin-link${isActive("/admin/tickets") ? " act" : ""}`}>
                    Billets
                    <span className="hdr-badge admin-badge">ADMIN</span>
                  </Link>
                </div>
              </>
            )}
          </nav>

          <div className="hdr-right">
            <button
              className={`hdr-btn${searchOpen ? " is-open" : ""}`}
              onClick={() => setSearchOpen(o => !o)}
              aria-label="Rechercher">
              {searchOpen ? <FiX size={17} /> : <FiSearch size={17} />}
            </button>

            {/* Dark / Light toggle */}
            <button
              className="hdr-theme-btn"
              onClick={toggleTheme}
              aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              title={darkMode ? "Mode clair" : "Mode sombre"}
            >
              {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>

            <div className="hdr-lang-wrap" ref={langRef}>
              <button className={`hdr-lang-btn${langOpen ? " open" : ""}`}
                onClick={() => setLangOpen(o => !o)} aria-label="Langue">
                <FiGlobe size={12} />
                {lang}
                <FiChevronDown size={10} className="lchev" />
              </button>
              <div className={`hdr-lang-drop${langOpen ? " open" : ""}`}>
                {LANGS.map(l => (
                  <button key={l}
                    className={`hdr-lang-opt${lang === l ? " sel" : ""}`}
                    onClick={() => { setLang(l); setLangOpen(false); }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Season selector */}
            <div className="hdr-season-wrap" ref={seasonRef}>
              <button className={`hdr-season-btn${seasonOpen ? " open" : ""}${season ? " active-season" : ""}`}
                onClick={() => setSeasonOpen(o => !o)} aria-label="Saison">
                <FiCalendar size={12} />
                {season ? season.id : "Saison"}
                <FiChevronDown size={10} className="schev" />
              </button>
              <div className={`hdr-season-drop${seasonOpen ? " open" : ""}`}>
                {seasons.map(s => (
                  <button key={s.id}
                    className={`hdr-season-opt${season?.id === s.id ? " sel" : ""}`}
                    onClick={() => { selectSeason(s.id); setSeasonOpen(false); }}>
                    <span>{s.label}</span>
                    <span className="hdr-season-opt-host">{s.host}</span>
                  </button>
                ))}
                {season && (
                  <button className="hdr-season-clear"
                    onClick={() => { clearSeason(); setSeasonOpen(false); }}>
                    ✕ Réinitialiser
                  </button>
                )}
              </div>
            </div>

            {/* User — dropdown shows name/email/role + profile + logout */}
            <div className="hdr-user-wrap" ref={userRef}>
              <button
                className="hdr-btn xs-hide"
                onClick={() => {
                  if (!user) { navigate("/login"); return; }
                  setUserOpen(o => !o);
                }}
                aria-label="Mon compte">
                <FiUser size={17} />
              </button>

              {user && (
                <div className={`hdr-user-dropdown${userOpen ? " open" : ""}`}>
                  <div className="hdr-user-info">
                    <div className="hdr-user-name">{user.name}</div>
                    <div className="hdr-user-email">{user.email}</div>
                    <span className={`hdr-user-role ${user.role}`}>
                      {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                    </span>
                  </div>

                  <div className="hdr-user-divider" />
                  <button className="hdr-user-item" onClick={() => { navigate("/profile"); setUserOpen(false); }}>
                    <FiUser size={14} /> Mon Profil
                  </button>
                  <button className="hdr-user-item" onClick={handleLogout}>
                    <FiLogOut size={14} /> Se déconnecter
                  </button>
                </div>
              )}
            </div>

            <Link to="/tickets" className="hdr-tickets">
              <FiShoppingCart size={12} />
              Billets
            </Link>
          </div>
        </div>

        <div className={`hdr-search${searchOpen ? " open" : " closed"}`}>
          <div className="hdr-search-inner">
            <FiSearch size={15} color="rgba(255,255,255,0.22)" style={{ flexShrink: 0 }} />
            <input
              ref={searchRef}
              className="hdr-search-input"
              placeholder="Rechercher matchs, équipes, joueurs…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Escape" && setSearchOpen(false)}
            />
            {query && (
              <button onClick={() => setQuery("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4 }}>
                <FiX size={13} />
              </button>
            )}
          </div>
        </div>

        <nav className={`hdr-mob${menuOpen ? " open" : " closed"}`} aria-hidden={!menuOpen}>
          {NAV.map((item) => {
            const isOpen  = mobileOpen === item.label;
            const gActive = groupActive(item);
            return (
              <div key={item.label}>
                <button
                  className={`hdr-macc${isOpen ? " open" : ""}${gActive ? " grp" : ""}`}
                  onClick={() => setMobileOpen(isOpen ? null : item.label)}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {item.label}
                    {item.badge && <span className="hdr-badge" style={{ display: "inline-flex" }}>{item.badge}</span>}
                  </span>
                  <div className="hdr-macc-r">
                    <FiChevronDown size={14} className="hdr-mchev" />
                  </div>
                </button>
                <div className={`hdr-msub${isOpen ? " open" : " closed"}`}>
                  {item.children.map(child => (
                    <Link key={child.href} to={child.href}
                      className={`hdr-msub-link${isActive(child.href) ? " act" : ""}`}>
                      {child.label}
                      {child.badge && <span className="hdr-msub-badge">{child.badge}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Profile mobile link */}
          {user && (
            <Link to="/profile" className="hdr-msub-link" style={{ paddingLeft: 20, fontWeight: 700 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FiUser size={14} /> Mon Profil
              </span>
            </Link>
          )}

          {/* Season selector mobile */}
          <div>
            <button
              className={`hdr-macc${mobileOpen === "Saison" ? " open" : ""}`}
              onClick={() => setMobileOpen(mobileOpen === "Saison" ? null : "Saison")}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FiCalendar size={14} />
                {season ? season.label : "Saison"}
              </span>
              <div className="hdr-macc-r">
                <FiChevronDown size={14} className="hdr-mchev" />
              </div>
            </button>
            <div className={`hdr-msub${mobileOpen === "Saison" ? " open" : " closed"}`}>
              {seasons.map(s => (
                <button key={s.id}
                  className={`hdr-msub-link${season?.id === s.id ? " act" : ""}`}
                  style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
                  onClick={() => { selectSeason(s.id); setMobileOpen(null); }}>
                  <span>{s.label}</span>
                  <span className="hdr-msub-badge">{s.host}</span>
                </button>
              ))}
              {season && (
                <button className="hdr-msub-link"
                  style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", color: "#ef4444" }}
                  onClick={() => { clearSeason(); setMobileOpen(null); }}>
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Admin mobile links */}
          {isAdmin && (
            <>
              <Link to="/admin/highlights" className="hdr-msub-link" style={{ color: "#ef4444", paddingLeft: 20, fontWeight: 800 }}>
                <span>Vidéos (Admin)</span>
                <span className="hdr-msub-badge" style={{ background: "rgba(239,68,68,0.2)", color: "#fca5a5" }}>ADMIN</span>
              </Link>
              <Link to="/admin/teams" className="hdr-msub-link" style={{ color: "#ef4444", paddingLeft: 20, fontWeight: 800 }}>
                <span>Équipes (Admin)</span>
                <span className="hdr-msub-badge" style={{ background: "rgba(239,68,68,0.2)", color: "#fca5a5" }}>ADMIN</span>
              </Link>
            </>
          )}

          <div className="hdr-mfooter">
            <button className="hdr-btn"
              style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)", borderRadius: 3 }}
              aria-label="Langue">
              <FiGlobe size={17} />
            </button>
            <button className="hdr-btn"
              onClick={() => { if (!user) { navigate("/login"); return; } navigate("/profile"); }}
              style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
              aria-label="Mon compte">
              <FiUser size={17} />
            </button>
            <Link to="/tickets" className="hdr-mtickets">
              <FiShoppingCart size={13} />
              Acheter des billets
            </Link>
          </div>
        </nav>

      </header>
    </>
  );
}
