import { useState } from "react";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
];

export default function LanguageSelector() {
  const [current, setCurrent] = useState("en");

  return (
    <div className="relative">
      <select
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        aria-label="Select language"
        className="appearance-none bg-transparent text-fifa-mid hover:text-fifa-black font-body font-bold text-[0.72rem] tracking-widest uppercase outline-none cursor-pointer pr-4 transition-colors"
        style={{ paddingRight: "16px" }}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-fifa-mid text-[0.5rem]">
        ▾
      </span>
    </div>
  );
}