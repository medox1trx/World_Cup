import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { forgotPassword } from "../services/api";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function ForgotPassword() {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const bg            = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card          = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border        = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary   = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary = darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const textMuted     = darkMode ? "rgba(255,255,255,0.32)"   : "rgba(0,0,0,0.32)";
  const inputBg       = darkMode ? "rgba(255,255,255,0.06)"   : "rgba(0,0,0,0.05)";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await forgotPassword(email);
      setMessage(res.message || "Lien de réinitialisation envoyé !");
    } catch (err) {
      setError(err.errors?.email?.[0] || err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyInContent: "center", padding: 24,
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
          font-family: ${FB}; font-size: 13px; transition: border-color 0.3s, background 0.3s, color 0.3s; outline: none; margin-bottom: 24px;
        }
        .submit-btn {
          width: 100%; padding: 14px; border-radius: 100px; border: none;
          background: ${textPrimary}; font-family: ${FD};
          letter-spacing: .18em; font-size: 12px; font-weight: 800;
          cursor: pointer; color: ${bg};
          transition: opacity 0.3s, transform 0.1s;
        }
        .submit-btn:hover:not(:disabled) { opacity: .92; }
        .submit-btn:disabled { opacity: .5; cursor: not-allowed; }
        .msg { font-family: ${FB}; font-size: 12px; padding: 10px; border-radius: 8px; margin-bottom: 16px; }
        .success { background: rgba(76,175,80,0.1); color: #4caf50; border: 1px solid rgba(76,175,80,0.3); }
        .error { background: rgba(248,113,113,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }
        .footer-link {
          display: block; text-align: center; margin-top: 24px;
          color: ${textSecondary}; font-family: ${FB}; font-size: 12px; text-decoration: none;
          transition: color 0.3s;
        }
        .footer-link:hover { color: ${textPrimary}; }
      `}</style>

      <div className="card">
        <h1 className="title">MOT DE PASSE OUBLIÉ</h1>
        <p className="sub">Entrez votre e-mail pour recevoir un lien de réinitialisation.</p>

        {message && <div className="msg success">{message}</div>}
        {error && <div className="msg error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="field-input"
            type="email"
            placeholder="votre@email.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "ENVOI..." : "ENVOYER LE LIEN"}
          </button>
        </form>

        <Link to="/login" className="footer-link">Retour à la connexion</Link>
      </div>
    </div>
  );
}
