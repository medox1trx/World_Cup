
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";
import logo from "./logo.png";

import "./Header.css";

function Header() {

  const { t } = useTranslation();

  return (
    <header className="header">

      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="WorldCup Logo" />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-links">
        <Link to="/">{t("home")}</Link>
        <Link to="/matches">{t("matches")}</Link>
        <Link to="/standings">{t("standings")}</Link>
        <Link to="/teams">{t("teams")}</Link>
        <Link to="/qualifications">{t("qualifications")}</Link>
        <Link to="/cities">{t("cities")}</Link>
        <Link to="/tickets">{t("tickets")}</Link>
        <Link to="/hospitality">{t("hospitality")}</Link>
        <Link to="/fans">{t("fans")}</Link>
        <Link to="/tournaments">{t("tournaments")}</Link>
      </nav>

      {/* Right Side Icons */}
      <div className="header-icons">
        <SearchBar />
        <LanguageSelector />
        <UserMenu />
      </div>

    </header>
  );
}

export default Header;

