import { useState, useEffect } from "react";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

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

function Field({ label, error, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom: error ? 8 : 16 }}>
      <label style={{
        fontSize: 9,
        letterSpacing: ".22em",
        color: "rgba(255,255,255,.35)",
        fontFamily: FB,
        textTransform: "uppercase"
      }}>{label}</label>
      {children}
      {error && (
        <span style={{
          fontSize: 10,
          color: "#f87171",
          fontFamily: FB,
          letterSpacing: ".04em",
          marginBottom: 8
        }}>{error}</span>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
      <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,.08)" }}/>
      <span style={{ fontSize:10, color:"rgba(255,255,255,.25)", letterSpacing:".16em", fontFamily:FB }}>OU</span>
      <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,.08)" }}/>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fields = { email, pass }) => {
    const err = {};
    if (!fields.email.includes("@")) err.email = "Adresse e-mail invalide";
    if (fields.pass.length < 6) err.pass = "Minimum 6 caractères";
    return err;
  };

  useEffect(() => {
    if (Object.keys(touched).length) {
      setErrors(validate());
    }
  }, [email, pass]);

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = () => {
    setTouched({ email: true, pass: true });
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          background: #0a0a0a;
          margin: 0;
        }

        .login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background:
            radial-gradient(ellipse 600px 400px at 70% 30%, rgba(255,255,255,.025) 0%, transparent 70%),
            #0a0a0a;
        }

        .card {
          width: 380px;
          background: #111;
          padding: 44px 40px 40px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.07);
          animation: fadeUp .4s ease both;
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .brand {
          margin-bottom: 32px;
        }

        .brand-title {
          font-family: ${FD};
          font-size: 22px;
          font-weight: 800;
          letter-spacing: .06em;
          color: white;
          margin: 0 0 4px;
        }

        .brand-sub {
          font-family: ${FB};
          font-size: 12px;
          color: rgba(255,255,255,.35);
          margin: 0;
          letter-spacing: .02em;
        }

        .soc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 4px;
        }

        .soc-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 8px;
          color: rgba(255,255,255,.7);
          font-family: ${FB};
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background .15s, border-color .15s, color .15s;
          letter-spacing: .02em;
        }

        .soc-btn:hover {
          background: rgba(255,255,255,.07);
          border-color: rgba(255,255,255,.16);
          color: white;
        }

        .field-input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 8px;
          color: white;
          font-family: ${FB};
          font-size: 13px;
          transition: border-color .15s, background .15s;
          outline: none;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,.2);
        }

        .field-input:focus {
          border-color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.07);
        }

        .field-input.has-error {
          border-color: rgba(248,113,113,.5);
        }

        .pass-wrap {
          position: relative;
        }

        .pass-wrap .field-input {
          padding-right: 42px;
        }

        .eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,.3);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          transition: color .15s;
        }

        .eye-btn:hover { color: rgba(255,255,255,.7); }

        .bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          margin-top: 4px;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          font-family: ${FB};
          font-size: 11px;
          color: rgba(255,255,255,.4);
          user-select: none;
        }

        .remember-label input[type=checkbox] {
          appearance: none;
          width: 14px;
          height: 14px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
          position: relative;
          transition: border-color .15s, background .15s;
          flex-shrink: 0;
        }

        .remember-label input[type=checkbox]:checked {
          background: white;
          border-color: white;
        }

        .remember-label input[type=checkbox]:checked::after {
          content: '';
          position: absolute;
          left: 3px;
          top: 1px;
          width: 5px;
          height: 8px;
          border: 1.5px solid #111;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }

        .forgot-link {
          background: none;
          border: none;
          color: rgba(255,255,255,.35);
          font-family: ${FB};
          font-size: 11px;
          cursor: pointer;
          letter-spacing: .02em;
          transition: color .15s;
          text-decoration: none;
        }

        .forgot-link:hover { color: rgba(255,255,255,.7); }

        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 100px;
          border: none;
          background: white;
          font-family: ${FD};
          letter-spacing: .18em;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          color: #111;
          transition: opacity .2s, transform .1s;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          opacity: .92;
        }

        .submit-btn:active:not(:disabled) {
          transform: scale(.99);
        }

        .submit-btn:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .submit-btn.success-state {
          background: #4ade80;
        }

        .footer-text {
          margin-top: 20px;
          text-align: center;
          font-family: ${FB};
          font-size: 12px;
          color: rgba(255,255,255,.28);
        }

        .footer-link {
          background: none;
          border: none;
          color: rgba(255,255,255,.6);
          font-family: ${FB};
          font-size: 12px;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color .15s;
          margin-left: 4px;
        }

        .footer-link:hover { color: white; }

        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(17,17,17,.3);
          border-top-color: #111;
          border-radius: 50%;
          animation: spin .7s linear infinite;
          vertical-align: middle;
          margin-right: 6px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="login-wrap">
        <div className="card">

          <div className="brand">
            <p className="brand-title">CONNEXION</p>
            <p className="brand-sub">Bienvenue — connectez-vous pour continuer</p>
          </div>

          <div className="soc-grid">
            <button className="soc-btn"><GoogleIcon /> Google</button>
            <button className="soc-btn"><FacebookIcon /> Facebook</button>
          </div>

          <Divider />

          <Field label="Adresse e-mail" error={errors.email}>
            <input
              className={`field-input${errors.email && touched.email ? " has-error" : ""}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="email@exemple.com"
              type="email"
              autoComplete="email"
            />
          </Field>

          <Field label="Mot de passe" error={errors.pass}>
            <div className="pass-wrap">
              <input
                className={`field-input${errors.pass && touched.pass ? " has-error" : ""}`}
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={e => setPass(e.target.value)}
                onBlur={() => handleBlur("pass")}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                <EyeIcon open={showPass} />
              </button>
            </div>
          </Field>

          <div className="bottom-row">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Se souvenir de moi
            </label>
            <button className="forgot-link">Mot de passe oublié ?</button>
          </div>

          <button
            className={`submit-btn${success ? " success-state" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? <><span className="spinner" />Connexion…</>
              : success
              ? "✓  Connecté"
              : "SE CONNECTER"
            }
          </button>

          <p className="footer-text">
            Pas encore de compte ?
            <button className="footer-link">S'inscrire</button>
          </p>

        </div>
      </div>
    </>
  );
}