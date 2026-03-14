import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";

const navLinks = [
  { label: "Matches",      href: "/matches"      },
  { label: "Teams",        href: "/teams"        },
  { label: "Standings",    href: "/standings"    },
  { label: "Tickets",      href: "/tickets"      },
  { label: "Fan Zone",     href: "/fans"         },
  { label: "Hospitality",  href: "/hospitality"  },
];

export default function Header() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => location.pathname === href;

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-shadow duration-300"
      style={{
        boxShadow: scrolled
          ? "0 1px 0 #e0e0e0, 0 4px 24px rgba(0,0,0,0.07)"
          : "0 1px 0 #e0e0e0",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────── */}
          <a href="/" className="shrink-0 flex items-center">
            <img
              src="/WC26_Logo.avif"
              alt="FIFA World Cup 2030"
              className="h-9 w-auto"
              onError={e => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback text logo */}
            <span
              className="font-display text-2xl text-fifa-black tracking-wider hidden"
              style={{ display: "none" }}
            >
              FIFA 2030
            </span>
          </a>

          {/* ── Desktop nav ───────────────────────────── */}
          <nav className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-5 font-body font-medium transition-colors duration-150 group"
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.04em",
                  color: isActive(link.href) ? "#0a0a0a" : "#8a8a8a",
                }}
              >
                {link.label}
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-fifa-black transition-all duration-200"
                  style={{ opacity: isActive(link.href) ? 1 : 0 }}
                />
                {/* Hover underline */}
                <span
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-fifa-black scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{ opacity: isActive(link.href) ? 0 : 1 }}
                />
              </a>
            ))}
          </nav>

          {/* ── Right controls ────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2">
            <SearchBar />
            <LanguageSelector />
            <UserMenu />
          </div>

          {/* ── Mobile right ──────────────────────────── */}
          <div className="flex lg:hidden items-center gap-3">
            <SearchBar compact />

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
            >
              <span className={`block h-[2px] bg-fifa-black origin-center transition-all duration-300
                ${menuOpen ? "rotate-45 translate-y-[7px]" : "w-full"}`} />
              <span className={`block h-[2px] bg-fifa-black transition-all duration-200
                ${menuOpen ? "opacity-0 w-0" : "w-full"}`} />
              <span className={`block h-[2px] bg-fifa-black origin-center transition-all duration-300
                ${menuOpen ? "-rotate-45 -translate-y-[7px]" : "w-full"}`} />
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────── */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "500px" : "0",
          borderTop: menuOpen ? "1px solid #e0e0e0" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 py-4">

          {/* Nav links */}
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-3.5 border-b border-fifa-border font-body font-medium transition-colors"
                style={{
                  fontSize: "0.9rem",
                  color: isActive(link.href) ? "#0a0a0a" : "#8a8a8a",
                }}
              >
                {link.label}
                <span className="text-fifa-mid text-lg">›</span>
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3 pt-4 mt-2">
            <LanguageSelector />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}