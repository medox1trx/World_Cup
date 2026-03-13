import { useState } from "react";
import i18n from "i18next";

function LanguageSelector() {
  const [open, setOpen] = useState(false);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative inline-block font-sans">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#1b1b1b] text-white border-2 border-[#f7b500] rounded-full px-3 py-2 flex items-center gap-1 text-sm transition-all duration-300 hover:bg-[#f7b500] hover:text-black"
      >
        🌐
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute top-full left-0 mt-2 bg-[#111] border-2 border-[#f7b500] rounded-lg shadow-lg min-w-[120px] z-50">
          <li
            onClick={() => changeLang("en")}
            className="px-4 py-2 cursor-pointer hover:bg-[#f7b500] hover:text-black transition-all duration-200"
          >
            🇬🇧 English
          </li>
          <li
            onClick={() => changeLang("fr")}
            className="px-4 py-2 cursor-pointer hover:bg-[#f7b500] hover:text-black transition-all duration-200"
          >
            🇫🇷 Français
          </li>
          <li
            onClick={() => changeLang("ar")}
            className="px-4 py-2 cursor-pointer hover:bg-[#f7b500] hover:text-black transition-all duration-200"
          >
            🇲🇦 العربية
          </li>
        </ul>
      )}

    </div>
  );
}

export default LanguageSelector;