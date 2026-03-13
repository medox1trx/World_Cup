import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";
import logo from "./logo.png";

function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex justify-between items-center px-5 py-3 bg-[#0d1117] text-white shadow-md sticky top-0 z-50">

      {/* Logo */}
  <div className="flex items-center">
    <Link to="/">
      <img
        src={logo}
        alt="WorldCup Logo"
        className="h-28 w-auto transition-transform duration-300 hover:scale-105 sm:h-16"
      />
    </Link>
  </div>

      {/* Navigation Menu */}
      <nav className="hidden lg:flex gap-4">
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/">{t("home")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/matches">{t("matches")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/standings">{t("standings")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/teams">{t("teams")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/qualifications">{t("qualifications")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/cities">{t("cities")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/tickets">{t("tickets")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/hospitality">{t("hospitality")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/fans">{t("fans")}</Link>
        <Link className="relative font-medium hover:text-[#f7b500] transition-colors duration-300"
              to="/tournaments">{t("tournaments")}</Link>
      </nav>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 sm:gap-2">
        <SearchBar />
        <LanguageSelector />
        <UserMenu />
      </div>

    </header>
  );
}

export default Header;