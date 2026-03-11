import { useTranslation } from "react-i18next";
import LanguageSelector from "../Header/LanguageSelector.jsx"; // path صحيح
import FooterSearchBar from "./FooterSearchBar.jsx"; // Search input modern
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">

      {/* Bottom row: Language selector + copyright */}
      <div className="footer-bottom">
        <LanguageSelector />
        <p>© 2026 World Cup. {t("allRightsReserved")}</p>
      </div>
      {/* Logo + description */}
      <div className="footer-section">
        <h2 className="footer-logo">🌐 World Cup</h2>
        <p>{t("footerDescription")}</p>
      </div>

      {/* Quick Links */}
      <div className="footer-section">
        <h3>{t("quickLinks")}</h3>
        <ul>
          <li>
            <Link to="/">{t("home")}</Link>
          </li>
          <li>
            <Link to="/teams">{t("teams")}</Link>
          </li>
          <li>
            <Link to="/matches">{t("matches")}</Link>
          </li>
          <li>
            <Link to="/tickets">{t("tickets")}</Link>
          </li>
          <li>
            <Link to="/fans">{t("fans")}</Link>
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="footer-section">
        <h3>{t("followUs")}</h3>
        <div className="social-icons">
          <span>🔵</span>
          <span>🐦</span>
          <span>📸</span>
          <span>▶️</span>
        </div>
      </div>

      {/* Newsletter Search */}
      <div className="footer-section">
        <h3>{t("newsletter")}</h3>
        <FooterSearchBar />
        <button>{t("subscribe")}</button>
      </div>


    </footer>
  );
}

export default Footer;