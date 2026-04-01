import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/api";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

function Field({ label, error, children, textSecondary }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: error ? 8 : 16 }}>
      <label style={{
        fontSize: 9, letterSpacing: ".22em", color: textSecondary,
        fontFamily: FB, textTransform: "uppercase", transition: "color 0.3s"
      }}>{label}</label>
      {children}
      {error && (
        <span style={{
          fontSize: 10, color: "#f87171", fontFamily: FB,
          letterSpacing: ".04em", marginBottom: 8
        }}>{error}</span>
      )}
    </div>
  );
}

export default function Profile() {
  const { darkMode } = useTheme();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const bg = darkMode ? "#0d0d0d" : "#ffffff";
  const card = darkMode ? "#1c1c1c" : "#ffffff";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary = darkMode ? "#ffffff" : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  const textMuted = darkMode ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)";
  const hover = darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const inputBg = darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setName(user.name || "");
    setEmail(user.email || "");
  }, [user, navigate]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async () => {
    const err = {};
    if (!name.trim()) err.name = "Le nom est obligatoire";
    if (!email.includes("@")) err.email = "Adresse e-mail invalide";
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    setServerError(null);

    try {
      const payload = {};
      if (name !== user.name) payload.name = name;
      if (email !== user.email) payload.email = email;

      if (Object.keys(payload).length === 0) {
        showToast("success", "Aucune modification détectée.");
        setLoading(false);
        return;
      }

      const res = await updateProfile(payload);
      updateUser(res.user);
      showToast("success", res.message || "Profil mis à jour !");
    } catch (err) {
      const serverErrors = err.errors || {};
      const mappedErrors = {};
      if (serverErrors.name) mappedErrors.name = serverErrors.name[0];
      if (serverErrors.email) mappedErrors.email = serverErrors.email[0];
      if (!Object.keys(mappedErrors).length) {
        setServerError(err.message || "Erreur lors de la mise à jour");
      } else {
        setErrors(mappedErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { background: ${bg}; margin: 0; transition: background 0.3s; }
        .profile-wrap {
          min-height: calc(100vh - 102px); display: flex; align-items: flex-start; justify-content: center;
          padding: 48px 24px;
          background: radial-gradient(ellipse 600px 400px at 70% 30%, ${darkMode ? "rgba(255,255,255,.025)" : "rgba(0,0,0,.025)"} 0%, transparent 70%), ${bg};
          transition: background 0.3s;
        }
        .profile-card {
          width: 440px; background: ${card}; padding: 44px 40px 40px;
          border-radius: 16px; border: 1px solid ${border};
          animation: fadeUp .4s ease both; transition: background 0.3s, border-color 0.3s;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .brand { margin-bottom: 32px; }
        .brand-title { font-family: ${FD}; font-size: 22px; font-weight: 800; letter-spacing: .06em; color: ${textPrimary}; margin: 0 0 4px; transition: color 0.3s; }
        .brand-sub { font-family: ${FB}; font-size: 12px; color: ${textSecondary}; margin: 0; letter-spacing: .02em; transition: color 0.3s; }
        .profile-avatar {
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, #c8102e, #e8244a);
          display: flex; align-items: center; justify-content: center;
          font-family: ${FD}; font-size: 24px; font-weight: 900; color: white;
          margin-bottom: 24px; letter-spacing: 0.04em;
        }
        .profile-field-input {
          width: 100%; padding: 12px 14px; background: ${inputBg};
          border: 1px solid ${border}; border-radius: 8px; color: ${textPrimary};
          font-family: ${FB}; font-size: 13px; transition: border-color 0.3s, background 0.3s, color 0.3s; outline: none;
        }
        .profile-field-input::placeholder { color: ${textMuted}; }
        .profile-field-input:focus { border-color: ${darkMode ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.3)"}; background: ${hover}; }
        .profile-field-input.has-error { border-color: rgba(248,113,113,.5); }
        .profile-field-input:disabled {
          opacity: 0.5; cursor: not-allowed;
        }
        .profile-role-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 6px;
          font-family: ${FD}; font-size: 11px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .profile-role-badge.admin { background: rgba(234,179,8,0.15); color: #facc15; }
        .profile-role-badge.user { background: ${inputBg}; color: ${textSecondary}; }
        .submit-btn {
          width: 100%; padding: 14px; border-radius: 100px; border: none;
          background: ${textPrimary}; font-family: ${FD};
          letter-spacing: .18em; font-size: 12px; font-weight: 800;
          cursor: pointer; color: ${bg};
          transition: opacity 0.3s, transform 0.1s, background 0.3s, color 0.3s;
          position: relative; overflow: hidden; margin-top: 8px;
        }
        .submit-btn:hover:not(:disabled) { opacity: .92; }
        .submit-btn:active:not(:disabled) { transform: scale(.99); }
        .submit-btn:disabled { opacity: .5; cursor: not-allowed; }
        .server-error {
          background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.3);
          border-radius: 8px; padding: 10px 14px; margin-bottom: 16px;
          font-family: ${FB}; font-size: 12px; color: #f87171;
        }
        .spinner {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid ${darkMode ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.3)"};
          border-top-color: ${textPrimary}; border-radius: 50%;
          animation: spin .7s linear infinite; vertical-align: middle; margin-right: 6px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .toast {
          position: fixed; top: 20px; right: 20px; z-index: 99999;
          padding: 12px 20px; border-radius: 8px; font-family: ${FB};
          font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
          animation: toastIn .3s ease both; box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          display: flex; align-items: center; gap: 8px;
        }
        .toast.success { background: #16a34a; color: white; }
        .toast.error { background: #dc2626; color: white; }
        @keyframes toastIn { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        .back-link {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          font-family: ${FB}; font-size: 12px; color: ${textSecondary};
          margin-bottom: 20px; padding: 0; transition: color 0.2s;
          text-decoration: none; letter-spacing: 0.02em;
        }
        .back-link:hover { color: ${textPrimary}; }
      `}</style>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      )}

      <div className="profile-wrap">
        <div className="profile-card">
          <button className="back-link" onClick={() => navigate("/")}>
            ← Retour à l'accueil
          </button>

          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="brand">
            <p className="brand-title">MON PROFIL</p>
            <p className="brand-sub">Gérez vos informations personnelles</p>
          </div>

          <div className={`profile-role-badge ${user.role}`}>
            {user.role === "admin" ? "★ Administrateur" : "● Utilisateur"}
          </div>

          {serverError && <div className="server-error">{serverError}</div>}

          <Field label="Nom complet" error={errors.name} textSecondary={textSecondary}>
            <input
              className={`profile-field-input${errors.name ? " has-error" : ""}`}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Votre nom"
              type="text"
            />
          </Field>

          <Field label="Adresse e-mail" error={errors.email} textSecondary={textSecondary}>
            <input
              className={`profile-field-input${errors.email ? " has-error" : ""}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email@exemple.com"
              type="email"
            />
          </Field>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><span className="spinner" />Enregistrement…</>
              : "ENREGISTRER"
            }
          </button>
        </div>
      </div>
    </>
  );
}
