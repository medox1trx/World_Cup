import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/api";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function Field({ label, error, children, textSecondary }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom: error ? 8 : 16 }}>
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

function Divider({ border, textMuted }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
      <div style={{ flex:1, height:"1px", background: border, transition: "background 0.3s" }}/>
      <span style={{ fontSize:10, color: textMuted, letterSpacing:".16em", fontFamily:FB, transition: "color 0.3s" }}>OU</span>
      <div style={{ flex:1, height:"1px", background: border, transition: "background 0.3s" }}/>
    </div>
  );
}

export default function Register() {
  const { darkMode } = useTheme();
  const { register } = useAuth();
  const navigate     = useNavigate();

  const bg            = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary   = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const textMuted     = darkMode ? "rgba(255,255,255,0.32)"   : "rgba(0,0,0,0.32)";
  const hover         = darkMode ? "rgba(255,255,255,0.06)"   : "rgba(0,0,0,0.04)";
  const inputBg       = darkMode ? "rgba(255,255,255,0.06)"   : "rgba(0,0,0,0.05)";

  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [pass, setPass]               = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [errors, setErrors]           = useState({});
  const [touched, setTouched]         = useState({});
  const [serverError, setServerError] = useState(null);
  const [toast, setToast]             = useState(null);

  const validate = (f = { name, email, pass, confirmPass }) => {
    const err = {};
    if (!f.name.trim()) err.name = "Le nom est obligatoire";
    else if (f.name.trim().length < 2) err.name = "Minimum 2 caractères";
    if (!f.email.includes("@")) err.email = "Adresse e-mail invalide";
    if (f.pass.length < 6) err.pass = "Minimum 6 caractères";
    if (!f.confirmPass) err.confirmPass = "Veuillez confirmer le mot de passe";
    else if (f.pass !== f.confirmPass) err.confirmPass = "Les mots de passe ne correspondent pas";
    return err;
  };

  useEffect(() => {
    if (Object.keys(touched).length) setErrors(validate());
  }, [name, email, pass, confirmPass]); // eslint-disable-line

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, pass: true, confirmPass: true });
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    setServerError(null);

    try {
      const res = await registerUser({
        name, email,
        password: pass,
        password_confirmation: confirmPass,
      });
      register(res.user);
      showToast("success", "Compte créé avec succès !");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      const serverErrors = err.errors || {};
      const mappedErrors = {};
      if (serverErrors.name)                  mappedErrors.name = serverErrors.name[0];
      if (serverErrors.email)                 mappedErrors.email = serverErrors.email[0];
      if (serverErrors.password)              mappedErrors.pass = serverErrors.password[0];
      if (serverErrors.password_confirmation) mappedErrors.confirmPass = serverErrors.password_confirmation[0];
      if (!Object.keys(mappedErrors).length) {
        setServerError(err.message || "Erreur lors de l'inscription");
      } else {
        setErrors(mappedErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { background: ${bg}; margin: 0; transition: background 0.3s; }
        .register-wrap {
          min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;
          background: radial-gradient(ellipse 600px 400px at 70% 30%, ${darkMode ? "rgba(255,255,255,.025)" : "rgba(0,0,0,.025)"} 0%, transparent 70%), ${bg};
          transition: background 0.3s;
        }
        .reg-card {
          width: 400px; background: ${card}; padding: 44px 40px 40px;
          border-radius: 16px; border: 1px solid ${border};
          animation: fadeUp .4s ease both; transition: background 0.3s, border-color 0.3s;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .brand { margin-bottom: 32px; }
        .brand-title { font-family: ${FD}; font-size: 22px; font-weight: 800; letter-spacing: .06em; color: ${textPrimary}; margin: 0 0 4px; transition: color 0.3s; }
        .brand-sub { font-family: ${FB}; font-size: 12px; color: ${textSecondary}; margin: 0; letter-spacing: .02em; transition: color 0.3s; }
        .soc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px; }
        .soc-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 14px; background: ${inputBg};
          border: 1px solid ${border}; border-radius: 8px; color: ${textSecondary};
          font-family: ${FB}; font-size: 12px; font-weight: 500; cursor: pointer;
          transition: background 0.3s, border-color 0.3s, color 0.3s; letter-spacing: .02em;
        }
        .soc-btn:hover { background: ${hover}; border-color: ${darkMode ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.16)"}; color: ${textPrimary}; }
        .field-input {
          width: 100%; padding: 12px 14px; background: ${inputBg};
          border: 1px solid ${border}; border-radius: 8px; color: ${textPrimary};
          font-family: ${FB}; font-size: 13px; transition: border-color 0.3s, background 0.3s, color 0.3s; outline: none;
        }
        .field-input::placeholder { color: ${textMuted}; }
        .field-input:focus { 
          background: #0a0a0a; color: #ffffff; 
          border-color: ${textPrimary}; box-shadow: 0 4px 20px rgba(0,0,0,0.15); 
        }
        .field-input:focus::placeholder { color: rgba(255,255,255,0.4); }
        .field-input.has-error { border-color: rgba(248,113,113,.5); }
        .pass-wrap { position: relative; }
        .pass-wrap .field-input { padding-right: 42px; }
        .eye-btn {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: ${textMuted}; cursor: pointer;
          padding: 2px; display: flex; align-items: center; transition: color 0.3s;
        }
        .eye-btn:hover { color: ${textSecondary}; }
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
        .footer-text { margin-top: 20px; text-align: center; font-family: ${FB}; font-size: 12px; color: ${textMuted}; transition: color 0.3s; }
        .footer-link {
          background: none; border: none; color: ${textSecondary}; font-family: ${FB};
          font-size: 12px; cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
          transition: color 0.3s; margin-left: 4px;
        }
        .footer-link:hover { color: ${textPrimary}; }
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
        .toast.error   { background: #000000; color: white; border: 1px solid rgba(255,255,255,0.1); }
        @keyframes toastIn { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      )}

      <div className="register-wrap">
        <div className="reg-card">
          <div className="brand">
            <p className="brand-title">CRÉER UN COMPTE</p>
            <p className="brand-sub">Rejoignez la communauté FIFA 2026</p>
          </div>

          <div className="soc-grid">
            <button className="soc-btn"><GoogleIcon /> Google</button>
            <button className="soc-btn"><FacebookIcon /> Facebook</button>
          </div>

          <Divider border={border} textMuted={textMuted} />

          {serverError && <div className="server-error">{serverError}</div>}

          <Field label="Nom complet" error={errors.name} textSecondary={textSecondary}>
            <input
              className={`field-input${errors.name && touched.name ? " has-error" : ""}`}
              value={name} onChange={e => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="Votre nom" type="text" autoComplete="name"
            />
          </Field>

          <Field label="Adresse e-mail" error={errors.email} textSecondary={textSecondary}>
            <input
              className={`field-input${errors.email && touched.email ? " has-error" : ""}`}
              value={email} onChange={e => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="email@exemple.com" type="email" autoComplete="email"
            />
          </Field>

          <Field label="Mot de passe" error={errors.pass} textSecondary={textSecondary}>
            <div className="pass-wrap">
              <input
                className={`field-input${errors.pass && touched.pass ? " has-error" : ""}`}
                type={showPass ? "text" : "password"} value={pass}
                onChange={e => setPass(e.target.value)} onBlur={() => handleBlur("pass")}
                placeholder="••••••••" autoComplete="new-password"
              />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                <EyeIcon open={showPass} />
              </button>
            </div>
          </Field>

          <Field label="Confirmer le mot de passe" error={errors.confirmPass} textSecondary={textSecondary}>
            <div className="pass-wrap">
              <input
                className={`field-input${errors.confirmPass && touched.confirmPass ? " has-error" : ""}`}
                type={showConfirm ? "text" : "password"} value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)} onBlur={() => handleBlur("confirmPass")}
                placeholder="••••••••" autoComplete="new-password"
              />
              <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                <EyeIcon open={showConfirm} />
              </button>
            </div>
          </Field>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><span className="spinner" />Création…</>
              : "CRÉER MON COMPTE"
            }
          </button>

          <p className="footer-text">
            Vous avez déjà un compte ?
            <a href="/login" className="footer-link" style={{ textDecoration: "underline" }}>Se connecter</a>
          </p>
        </div>
      </div>
    </>
  );
}
