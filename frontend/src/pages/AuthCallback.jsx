import { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

export default function AuthCallback() {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      axios.get(`${API_BASE_URL}/auth/${provider}/callback`, { 
        params: { code },
        withCredentials: true 
      })
      .then(res => {
        console.log("Social login success:", res.data);
        if (res.data.user) {
          login(res.data.user, true);
          navigate("/");
        } else {
          console.error("No user data in response");
          navigate("/login?error=no_user_data");
        }
      })
      .catch(err => {
        console.error("Social login error details:", err.response?.data || err.message);
        navigate("/login?error=social_auth_failed");
      });
    } else {
      navigate("/login");
    }
  }, [provider, searchParams, login, navigate]);

  return (
    <div style={{ 
      height: "80vh", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", color: "var(--text-main)" 
    }}>
      <div style={{ textAlign: "center" }}>
        <div className="spinner" style={{ 
          width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)", 
          borderTopColor: "var(--text-main)", borderRadius: "50%", 
          animation: "spin 1s linear infinite", margin: "0 auto 20px" 
        }} />
        <p>Authentification en cours...</p>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
