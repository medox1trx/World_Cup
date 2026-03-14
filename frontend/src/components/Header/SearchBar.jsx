import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ compact = false }) {
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 2) {
      setLoading(true);
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/search?q=${val}`);
        setResults(res.data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Toggle button (compact) or always-visible input */}
      {compact ? (
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 flex items-center justify-center text-fifa-mid hover:text-fifa-black transition-colors"
          aria-label="Search"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      ) : (
        <div className="flex items-center gap-2 border border-fifa-border hover:border-fifa-mid focus-within:border-fifa-black rounded-full px-4 py-2 transition-colors bg-fifa-gray">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            onFocus={() => setOpen(true)}
            placeholder="Search…"
            className="bg-transparent text-[0.8rem] text-fifa-black placeholder-fifa-mid outline-none w-32 focus:w-44 transition-all duration-300"
          />
        </div>
      )}

      {/* Compact expanded input */}
      {compact && open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-fifa-border rounded-xl shadow-lg p-2 z-50">
          <div className="flex items-center gap-2 border border-fifa-border rounded-lg px-3 py-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search teams, matches, venues…"
              className="bg-transparent text-[0.82rem] text-fifa-black placeholder-fifa-mid outline-none flex-1"
            />
            {loading && (
              <div className="w-3 h-3 border border-fifa-mid border-t-fifa-black rounded-full animate-spin shrink-0" />
            )}
          </div>
        </div>
      )}

      {/* Results dropdown */}
      {results.length > 0 && open && (
        <ul className="absolute right-0 top-full mt-2 w-72 bg-white border border-fifa-border rounded-xl shadow-lg overflow-hidden z-50">
          {results.map((item, i) => (
            <li key={i}>
              <a
                href={`/matches/${item.id}`}
                className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-fifa-black hover:bg-fifa-gray transition-colors border-b border-fifa-border last:border-0"
                onClick={() => { setOpen(false); setQuery(""); }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}