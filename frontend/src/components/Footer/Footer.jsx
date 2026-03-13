import { useTranslation } from "react-i18next";
import LanguageSelector from "../Header/LanguageSelector.jsx";
import FooterSearchBar from "./FooterSearchBar.jsx"; // search input component
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0d1117] text-white p-6 flex flex-wrap justify-between shadow-inner fixed bottom-0 left-0 w-full z-50 font-sans">
      {/* Bottom Row */}
      <div className="w-full mt-6 border-t border-white/20 pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <LanguageSelector />
        <p>© 2026 World Cup. {t("allRightsReserved")}</p>
      </div>
      {/* Logo + Description */}
      <div className="flex-1 min-w-[220px] m-2">
        <h2 className="text-2xl font-bold mb-2">🌐 {t("WorldCup")}</h2>
        <p>{t("footerDescription")}</p>
      </div>

      {/* Quick Links */}
      <div className="flex-1 min-w-[220px] m-2">
        <h3 className="text-yellow-500 uppercase font-semibold mb-2">{t("quickLinks")}</h3>
        <ul className="list-none p-0">
          {[
            { path: "/", label: t("home") },
            { path: "/teams", label: t("teams") },
            { path: "/matches", label: t("matches") },
            { path: "/tickets", label: t("tickets") },
            { path: "/fans", label: t("fans") },
          ].map((link, i) => (
            <li key={i} className="mb-2">
              <Link
                to={link.path}
                className="relative font-medium text-white hover:text-yellow-500 transition-all duration-300 after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-yellow-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Social Icons */}
      <div className="flex-1 min-w-[220px] m-2">
        <h3 className="text-yellow-500 uppercase font-semibold mb-2">{t("followUs")}</h3>
        <div className="flex gap-3 text-xl">
          <span className="cursor-pointer transition-transform duration-300 hover:scale-125 hover:text-yellow-500">🔵</span>
          <span className="cursor-pointer transition-transform duration-300 hover:scale-125 hover:text-yellow-500">🐦</span>
          <span className="cursor-pointer transition-transform duration-300 hover:scale-125 hover:text-yellow-500">📸</span>
          <span className="cursor-pointer transition-transform duration-300 hover:scale-125 hover:text-yellow-500">▶️</span>
        </div>
      </div>

      {/* Newsletter Search */}
      <div className="flex-1 min-w-[220px] m-2">
        <h3 className="text-yellow-500 uppercase font-semibold mb-2">{t("newsletter")}</h3>
        <div className="flex gap-2">
          <FooterSearchBar />
          <button className="px-4 py-2 bg-yellow-500 text-[#111] font-bold rounded transition-colors duration-300 hover:bg-yellow-600">
            {t("subscribe")}
          </button>
        </div>
      </div>

    </footer>
  );
}

export default Footer;