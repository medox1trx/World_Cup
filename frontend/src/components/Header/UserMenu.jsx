import { useState, useRef, useEffect } from "react";

const menuItems = [
  { label: "Sign In", href: "/login" },
  { label: "Register", href: "/register" },
  { label: "My Profile", href: "/profile" },
];

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="User menu"
        aria-expanded={open}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-fifa-border hover:border-fifa-black transition-colors text-fifa-mid hover:text-fifa-black"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-fifa-border rounded-xl shadow-lg overflow-hidden z-50">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-[0.8rem] font-body font-medium text-fifa-black hover:bg-fifa-gray border-b border-fifa-border last:border-0 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}