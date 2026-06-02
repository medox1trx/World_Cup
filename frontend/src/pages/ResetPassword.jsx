import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { resetPassword } from "../services/api";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function ResetPassword() {
  const { darkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [token] = useState(searchParams.get("token") || "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const bg            = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary   = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const inputBg       = darkMode ? "rgba(255,255,255,0.06)"   : "rgba(0,0,0,0.05)";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation
      });
      setMessage(res.message || "Mot de passe réinitialisé !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.errors ? Object.values(err.errors)[0][0] : err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      background: bg, transition: "background 0.3s"
    }}>
      <style>{`
        .card {
          width: 380px; background: ${card}; padding: 44px 40px 40px;
          border-radius: 16px; border: 1px solid ${border};
          animation: fadeUp .4s ease both; transition: background 0.3s, border-color 0.3s;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .title { font-family: ${FD}; font-size: 22px; font-weight: 800; letter-spacing: .06em; color: ${textPrimary}; margin: 0 0 12px; transition: color 0.3s; }
        .sub { font-family: ${FB}; font-size: 13px; color: ${textSecondary}; margin: 0 0 32px; line-height: 1.6; transition: color 0.3s; }
        .field-input {
          width: 100%; padding: 12px 14px; background: ${inputBg};
          border: 1px solid ${border}; border-radius: 8px; color: ${textPrimary};
          font-family: ${FB}; font-size: 13px; transition: border-color 0.3s, background 0.3s, color 0.3s; outline: none; margin-bottom: 16px;
        }
        .submit-btn {
          width: 100%; padding: 14px; border-radius: 100px; border: none;
          background: ${textPrimary}; font-family: ${FD};
          letter-spacing: .18em; font-size: 12px; font-weight: 800;
          cursor: pointer; color: ${bg};
          transition: opacity 0.3s, transform 0.1s; margin-top: 8px;
        }
        .submit-btn:hover:not(:disabled) { opacity: .92; }
        .submit-btn:disabled { opacity: .5; cursor: not-allowed; }
        .msg { font-family: ${FB}; font-size: 12px; padding: 10px; border-radius: 8px; margin-bottom: 16px; }
        .success { background: rgba(76,175,80,0.1); color: #4caf50; border: 1px solid rgba(76,175,80,0.3); }
        .error { background: rgba(248,113,113,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }
        .label { font-family: ${FB}; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: ${textSecondary}; margin-bottom: 6px; display: block; }
      `}</style>

      <div className="card">
        <h1 className="title">RÉINITIALISATION</h1>
        <p className="sub">Choisissez votre nouveau mot de passe sécurisé.</p>

        {message && <div className="msg success">{message}</div>}
        {error && <div className="msg error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="label">E-mail</label>
          <input
            className="field-input"
            type="email"
            readOnly
            value={email}
          />
          
          <label className="label">Nouveau mot de passe</label>
          <input
            className="field-input"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <label className="label">Confirmer le mot de passe</label>
          <input
            className="field-input"
            type="password"
            required
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "RÉINITIALISATION..." : "RÉINITIALISER"}
          </button>
        </form>
      </div>
    </div>
  );
}
