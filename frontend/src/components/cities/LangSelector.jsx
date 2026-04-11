import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

const LANGUAGES = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "pt", label: "PT", flag: "🇵🇹" },
  { code: "de", label: "DE", flag: "🇩🇪" },
  { code: "ar", label: "AR", flag: "🇸🇦" }
];

export default function LangSelector() {
  const { i18n } = useTranslation();
  const { darkMode } = useTheme();

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
      {LANGUAGES.map((lang) => {
        const isActive = i18n.language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            style={{
              background: isActive ? (darkMode ? "#ffffff" : "#0d0d0d") : "transparent",
              color: isActive ? (darkMode ? "#0d0d0d" : "#ffffff") : (darkMode ? "#ffffff" : "#0d0d0d"),
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
              borderRadius: "100px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              transition: "all 0.2s"
            }}
          >
            <span style={{ fontSize: "16px" }}>{lang.flag}</span>
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
