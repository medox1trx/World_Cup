import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";
import logo from "./logo.png";

import "./Header.css";

function Header() {
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
        <Link to="/">Home</Link>
        <Link to="/matches">Scores & Matchs</Link>
        <Link to="/standings">Classements</Link>
        <Link to="/teams">Equipes</Link>
        <Link to="/qualifications">Qualifications</Link>
        <Link to="/cities">Villes hôtes</Link>
        <Link to="/tickets">Billets</Link>
        <Link to="/hospitality">Hospitalité</Link>
        <Link to="/fans">Coin des fans</Link>
        <Link to="/tournaments">Tournois FIFA</Link>
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