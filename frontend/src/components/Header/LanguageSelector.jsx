
import { useState } from "react";
import i18n from "i18next";
import "./LanguageSelector.css";

function LanguageSelector() {

  const [open, setOpen] = useState(false);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="language-selector">

      <button className="lang-btn" onClick={() => setOpen(!open)}>
        🌐
      </button>

      {open && (
        <ul className="lang-dropdown">
          <li onClick={() => changeLang("en")}>🇬🇧 English</li>
          <li onClick={() => changeLang("fr")}>🇫🇷 Français</li>
          <li onClick={() => changeLang("ar")}>🇲🇦 العربية</li>
        </ul>
      )}

    </div>
  );
}

export default LanguageSelector;
