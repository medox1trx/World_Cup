import { useState, useEffect } from "react";
import "./LanguageSelector.css";

function LanguageSelector() {
  const [lang, setLang] = useState(sessionStorage.getItem("lang") || "en");
  const [open, setOpen] = useState(false);

  const changeLang = (newLang) => {
    sessionStorage.setItem("lang", newLang);
    setLang(newLang);
    setOpen(false);
    // optionally reload page if needed
    // window.location.reload();
  };

  return (
    <div className="language-selector">
      <button className="lang-btn" onClick={() => setOpen(!open)}>
        🌐 {lang.toUpperCase()}
      </button>
      {open && (
        <ul className="lang-dropdown">
          <li onClick={() => changeLang("en")}>🇬🇧 English</li>
          <li onClick={() => changeLang("fr")}>🇫🇷 Français</li>
        </ul>
      )}
    </div>
  );
}

export default LanguageSelector;