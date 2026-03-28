import { useState, useEffect } from "react";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", 
      background: "#fcfcfc", fontFamily: FB, padding: 24 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        .login-card { width: 100%; maxWidth: 420px; background: white; padding: 48px; borderRadius: 24px; border: 1px solid #eee; boxShadow: 0 10px 40px rgba(0,0,0,0.04); }
        .login-title { fontFamily: ${FD}; fontSize: 32px; fontWeight: 900; textTransform: uppercase; marginBottom: 8px; textAlign: center; }
        .login-sub { color: #666; textAlign: center; marginBottom: 32px; fontSize: 14px; }
        .login-input { width: 100%; padding: 14px 18px; borderRadius: 12px; border: 1px solid #eee; background: #fff; marginBottom: 16px; outline: none; transition: 0.2s; fontSize: 14px; }
        .login-input:focus { border-color: #c8102e; box-shadow: 0 0 0 4px rgba(200,16,46,0.05); }
        .login-btn { width: 100%; padding: 16px; borderRadius: 100px; background: #0d0d0d; color: white; border: none; fontWeight: 800; fontFamily: ${FD}; fontSize: 12px; letterSpacing: 0.15em; cursor: pointer; transition: 0.2s; textTransform: uppercase; }
        .login-btn:hover { background: #333; transform: translateY(-2px); }
        .social-btn { width: 100%; padding: 12px; borderRadius: 12px; border: 1px solid #eee; background: white; display: flex; alignItems: center; justifyContent: center; gap: 12px; fontWeight: 700; fontSize: 14px; cursor: pointer; transition: 0.2s; marginBottom: 12px; }
        .social-btn:hover { background: #f9f9f9; }
        .divider { display: flex; alignItems: center; margin: 24px 0; color: #ccc; fontSize: 10px; fontWeight: 800; textTransform: uppercase; letterSpacing: 0.2em; }
        .divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: #eee; }
        .divider::before { marginRight: 16px; }
        .divider::after { marginLeft: 16px; }
      `}</style>
      
      <div className="login-card">
         <h1 className="login-title">Connexion</h1>
         <p className="login-sub">Accédez à votre compte FIFA ID</p>
         
         <button className="social-btn">
            <GoogleIcon /> Continuer avec Google
         </button>
         
         <div className="divider">ou</div>
         
         <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Adresse e-mail" className="login-input" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Mot de passe" className="login-input" value={pass} onChange={e => setPass(e.target.value)} required />
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 24 }}>
               <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#666", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "#c8102e" }} /> Se souvenir
               </label>
               <a href="#" style={{ color: "#c8102e", textDecoration: "none", fontWeight: 700 }}>Oublié ?</a>
            </div>
            
            <button className="login-btn" disabled={loading}>
               {loading ? "Connexion..." : success ? "Connecté ✓" : "Se connecter"}
            </button>
         </form>
         
         <p style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "#666" }}>
            Pas de compte ? <a href="#" style={{ color: "#c8102e", textDecoration: "none", fontWeight: 700 }}>Créer un compte</a>
         </p>
      </div>
    </div>
  );
}