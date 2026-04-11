import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getUserReservations, deleteReservation, updateProfile } from "../services/api";
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Trash2, 
  ChevronRight, 
  LogOut, 
  CheckCircle, 
  AlertCircle,
  Clock
} from "lucide-react";
import toast from "react-hot-toast";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

function ProfileField({ label, value, onChange, disabled, error }) {
  const { darkMode } = useTheme();
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ 
        display: "block", 
        fontSize: 10, 
        fontWeight: 800, 
        textTransform: "uppercase", 
        letterSpacing: "0.1em",
        color: darkMode ? "#888" : "#666",
        marginBottom: 8
      }}>{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        disabled={disabled}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 8,
          background: darkMode ? "#1a1a1a" : "#f5f5f5",
          border: `1px solid ${error ? "#ef4444" : (darkMode ? "#333" : "#eee")}`,
          color: "inherit",
          fontFamily: FB,
          fontSize: 14,
          outline: "none"
        }}
      />
      {error && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("bookings");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile state
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await getUserReservations();
      setReservations(res.data);
    } catch (err) {
      toast.error("Failed to load your reservations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setProfileName(user.name || "");
    setProfileEmail(user.email || "");
    fetchBookings();
  }, [user, navigate, fetchBookings]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    
    const tid = toast.loading("Cancelling...");
    try {
      await deleteReservation(id);
      toast.success("Reservation cancelled", { id: tid });
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      toast.error(err.message || "Failed to cancel", { id: tid });
    }
  };

  const handleProfileUpdate = async () => {
    setProfileLoading(true);
    try {
      const res = await updateProfile({ name: profileName, email: profileEmail });
      updateUser(res.user);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setProfileLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ 
      background: darkMode ? "#0a0a0a" : "#fafafa", 
      color: darkMode ? "#fff" : "#000",
      minHeight: "100vh",
      paddingBottom: 100
    }}>
      <style>{`
        .dashboard-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; display: grid; grid-template-columns: 280px 1fr; gap: 40px; }
        @media (max-width: 900px) { .dashboard-container { grid-template-columns: 1fr; } }
        .sidebar { background: ${darkMode ? "#141414" : "#fff"}; border-radius: 20px; padding: 32px 16px; border: 1px solid ${darkMode?"#222" : "#eee"}; align-self: start; }
        .nav-link { 
          display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; 
          cursor: pointer; transition: all 0.2s; font-family: ${FD}; text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em; font-size: 13px;
          margin-bottom: 4px;
        }
        .nav-link.active { background: #c8102e; color: white; }
        .nav-link:not(.active):hover { background: ${darkMode ? "#222" : "#f0f0f0"}; }
        .logout-btn { color: #ef4444; margin-top: 20px; }
        .content-card { background: ${darkMode ? "#141414" : "#fff"}; border-radius: 24px; padding: 40px; border: 1px solid ${darkMode?"#222" : "#eee"}; min-height: 500px; }
        .booking-card { display: flex; align-items: center; gap: 20px; padding: 20px; border-radius: 16px; border: 1px solid ${darkMode ? "#222" : "#eee"}; margin-bottom: 16px; transition: transform 0.2s; }
        .booking-card:hover { transform: translateX(8px); border-color: #c8102e; }
        .booking-img { width: 100px; height: 100px; border-radius: 12px; object-fit: cover; }
        .status-tag { padding: 4px 10px; borderRadius: 100px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; }
        .status-tag.confirmed { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
      `}</style>

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div style={{ padding: "0 16px 32px" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#c8102e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "white", marginBottom: 12 }}>
              {user.name.charAt(0)}
            </div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>{user.name}</h3>
            <p style={{ margin: 0, fontSize: 13, color: darkMode ? "#888" : "#666" }}>{user.email}</p>
          </div>

          <div className="nav-link active" onClick={() => setActiveTab("bookings")} style={{ background: activeTab === "bookings" ? "#c8102e" : "transparent", color: activeTab === "bookings" ? "white" : "inherit" }}>
            <Calendar size={18} /> My Bookings
          </div>
          <div className="nav-link" onClick={() => setActiveTab("profile")} style={{ background: activeTab === "profile" ? "#c8102e" : "transparent", color: activeTab === "profile" ? "white" : "inherit" }}>
            <User size={18} /> My Profile
          </div>
          
          <div className="nav-link logout-btn" onClick={logout}>
            <LogOut size={18} /> {t('logout') || "Logout"}
          </div>
        </div>

        {/* Content */}
        <div className="content-card">
          {activeTab === "bookings" ? (
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>My Reservations</h2>
              <p style={{ color: darkMode ? "#888" : "#666", marginBottom: 32 }}>Manage your stays for FIFA World Cup 2026™</p>
              
              {loading ? (
                <p>Loading bookings...</p>
              ) : reservations.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <AlertCircle size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                   <p style={{ color: darkMode ? "#888" : "#666" }}>No reservations found. Ready for your next journey?</p>
                   <Link to="/cities" style={{ display: "inline-block", marginTop: 16, color: "#c8102e", fontWeight: 800, textDecoration: "none" }}>Browse Cities <ChevronRight size={14} style={{ verticalAlign: "middle" }} /></Link>
                </div>
              ) : (
                reservations.map(res => (
                  <div key={res.id} className="booking-card">
                    <img src={res.accommodation?.image_url} alt={res.accommodation?.name} className="booking-img" />
                    <div style={{ flex: 1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom: 4 }}>
                         <span className="status-tag confirmed">Confirmed</span>
                         <span style={{ fontSize: 12, color: darkMode ? "#666" : "#999" }}>#{res.id}</span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{res.accommodation?.name}</h4>
                      <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12, color: darkMode ? "#888" : "#666" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={14} /> {res.accommodation?.city?.name}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {res.check_in} – {res.check_out}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ display: "block", fontSize: 18, fontWeight: 900, color: "#c8102e" }}>${res.total_price}</span>
                      <button 
                        onClick={() => handleCancel(res.id)}
                        style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 12, padding: "8px 0", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
                        <Trash2 size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Profile Settings</h2>
              <p style={{ color: darkMode ? "#888" : "#666", marginBottom: 32 }}>Update your personal information</p>
              
              <div style={{ maxWidth: 500 }}>
                <ProfileField label="Full Name" value={profileName} onChange={e => setProfileName(e.target.value)} />
                <ProfileField label="Email Address" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} />
                
                <button 
                  onClick={handleProfileUpdate}
                  disabled={profileLoading} 
                  style={{ 
                    marginTop: 20, 
                    padding: "14px 32px", 
                    borderRadius: 100, 
                    border: "none", 
                    background: "#c8102e", 
                    color: "white", 
                    fontWeight: 800, 
                    fontFamily: FD, 
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    opacity: profileLoading ? 0.7 : 1
                  }}>
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
