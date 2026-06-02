import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAuthUser, logout as apiLogout } from "../services/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "fifa2026_user";
const REMEMBER_KEY = "fifa2026_remember";
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await getAuthUser();
      if (res?.user) {
        setUser(res.user);
        const isRemembered = localStorage.getItem(REMEMBER_KEY) === 'true';
        if (isRemembered) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
        } else {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
        }
      } else {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback((userData, remember = false) => {
    setUser(userData);
    localStorage.setItem(REMEMBER_KEY, remember ? 'true' : 'false');
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
  }, []);

  const register = useCallback((userData, remember = false) => {
    setUser(userData);
    localStorage.setItem(REMEMBER_KEY, remember ? 'true' : 'false');
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
  }, []);

  const logout = useCallback(async () => {
    try { await apiLogout(); } catch { /* ignore */ }
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
    const isRemembered = localStorage.getItem(REMEMBER_KEY) === 'true';
    if (isRemembered) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
  }, []);

  // Inactivity logic
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      const isRemembered = localStorage.getItem(REMEMBER_KEY) === 'true';
      if (isRemembered || !user) return; // Do not apply timeout if remembered or not logged in

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
      }, INACTIVITY_TIMEOUT);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    // Initial setup
    resetTimer();

    const handleEvent = () => resetTimer();
    events.forEach(event => document.addEventListener(event, handleEvent));

    return () => {
      events.forEach(event => document.removeEventListener(event, handleEvent));
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, logout]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    fetchUser,
    updateUser,
    isAdmin: user?.role === "admin" || user?.role === "super_admin",
    isSuperAdmin: user?.role === "super_admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export default AuthContext;
