import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getUserReservations, deleteReservation, updateProfile, getUserTicketBookings } from "../services/api";
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
  Clock,
  Ticket,
  Printer
} from "lucide-react";
import toast from "react-hot-toast";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
};

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
  const [ticketBookings, setTicketBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile state
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Ticket Modal state
  const [showTixModal, setShowTixModal] = useState(false);
  const [activeTix, setActiveTix] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resRes, tixRes] = await Promise.all([
        getUserReservations(),
        getUserTicketBookings()
      ]);
      setReservations(resRes.data || []);
      setTicketBookings(tixRes.data || []);
    } catch (err) {
      toast.error("Failed to load your bookings");
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
    fetchData();
  }, [user, navigate, fetchData]);

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

  const handlePrint = () => {
    window.print();
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
        
        /* Digital Ticket Styles */
        .ticket-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); z-index: 1100; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.4s; }
        .ticket-modal-overlay.open { opacity: 1; pointer-events: auto; }
        .digital-ticket { background: ${darkMode ? "#1a1a1a" : "#fff"}; width: 380px; border-radius: 32px; overflow: hidden; position: relative; box-shadow: 0 30px 60px rgba(0,0,0,0.4); transform: translateY(50px); transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
        .ticket-modal-overlay.open .digital-ticket { transform: translateY(0); }
        .ticket-header { background: #c8102e; padding: 32px; color: white; position: relative; overflow: hidden; }
        .ticket-body { padding: 32px; position: relative; border-bottom: 2px dashed ${darkMode ? "#333" : "#eee"}; }
        .ticket-footer { padding: 32px; background: ${darkMode ? "#111" : "#fcfcfc"}; display: flex; flex-direction: column; align-items: center; }
        .qr-placeholder { width: 140px; height: 140px; background: white; padding: 10px; border-radius: 12px; }
        .perforation { position: absolute; bottom: -15px; width: 30px; height: 30px; background: black; border-radius: 50%; z-index: 5; }
        .perf-left { left: -15px; }
        .perf-right { right: -15px; }

        @media print {
          body * { visibility: hidden !important; background: none !important; color: black !important; }
          .digital-ticket, .digital-ticket * { visibility: visible !important; }
          .digital-ticket { 
            position: fixed !important; 
            left: 50% !important; 
            top: 50% !important; 
            transform: translate(-50%, -50%) !important; 
            width: 400px !important;
            box-shadow: none !important;
            border: 2px solid #000 !important;
            background: white !important;
          }
          .ticket-header { background: #c8102e !important; color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .perforation { display: none !important; }
        }
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

          <div className="nav-link" onClick={() => setActiveTab("bookings")} style={{ background: activeTab === "bookings" ? "#c8102e" : "transparent", color: activeTab === "bookings" ? "white" : "inherit" }}>
            <Calendar size={18} /> Accommodations
          </div>
          <div className="nav-link" onClick={() => setActiveTab("tickets")} style={{ background: activeTab === "tickets" ? "#c8102e" : "transparent", color: activeTab === "tickets" ? "white" : "inherit" }}>
            <Ticket size={18} /> My Tickets
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
              <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>My Stays</h2>
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
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {formatDate(res.check_in)} – {formatDate(res.check_out)}</span>
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
          ) : activeTab === "tickets" ? (
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>My Tickets</h2>
              <p style={{ color: darkMode ? "#888" : "#666", marginBottom: 32 }}>Your official match tickets for the 2026™ tournament</p>
              
              {loading ? (
                <p>Loading tickets...</p>
              ) : ticketBookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <AlertCircle size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                   <p style={{ color: darkMode ? "#888" : "#666" }}>No tickets found. Get ready for the action!</p>
                   <Link to="/tickets" style={{ display: "inline-block", marginTop: 16, color: "#c8102e", fontWeight: 800, textDecoration: "none" }}>Browse Tickets <ChevronRight size={14} style={{ verticalAlign: "middle" }} /></Link>
                </div>
              ) : (
                ticketBookings.map(book => {
                  const matchDate = new Date(book.ticket?.match?.match_date);
                  const day = isNaN(matchDate.getTime()) ? "--" : matchDate.getDate();
                  const month = isNaN(matchDate.getTime()) ? "" : matchDate.toLocaleString('fr-FR', { month: 'short' });
                  
                  return (
                    <div key={book.id} className="booking-card" style={{ overflow: "hidden" }}>
                      {/* Left Date Box */}
                      <div style={{ 
                        flexShrink: 0,
                        width: 80, 
                        height: 80, 
                        borderRadius: 16, 
                        background: darkMode ? "rgba(200, 16, 46, 0.1)" : "#f5f5f5", 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        textAlign: "center",
                        border: `1px solid ${darkMode ? "rgba(200, 16, 46, 0.2)" : "#eee"}`
                      }}>
                         <span style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", color: "#c8102e", letterSpacing: "0.05em" }}>
                           {book.ticket?.match?.stage || "MATCH"}
                         </span>
                         <span style={{ fontSize: 24, fontWeight: 900, lineHeight: 1, margin: "2px 0" }}>{day}</span>
                         <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, textTransform: "capitalize" }}>{month}</span>
                      </div>

                      {/* Middle Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom: 8 }}>
                           <span className={`status-tag ${book.status?.toLowerCase() === 'confirmed' ? 'confirmed' : ''}`} 
                                 style={{ 
                                   background: book.status?.toLowerCase() === 'confirmed' ? "rgba(34, 197, 94, 0.1)" : "rgba(200, 16, 46, 0.1)",
                                   color: book.status?.toLowerCase() === 'confirmed' ? "#22c55e" : "#c8102e",
                                   padding: "2px 8px",
                                   borderRadius: 4,
                                   fontSize: 9,
                                   fontWeight: 900,
                                   textTransform: "uppercase"
                                 }}>
                             {book.status}
                           </span>
                           <span style={{ fontSize: 11, fontWeight: 600, color: darkMode ? "#555" : "#aaa", letterSpacing: "0.05em" }}>
                             {book.booking_reference}
                           </span>
                        </div>
                        
                        <h4 style={{ 
                          margin: 0, 
                          fontSize: 18, 
                          fontWeight: 900, 
                          whiteSpace: "nowrap", 
                          overflow: "hidden", 
                          textOverflow: "ellipsis",
                          fontFamily: FD
                        }}>
                          {book.ticket?.match?.team1?.name || "TBD"} <span style={{ color: "#c8102e", fontSize: 14 }}>VS</span> {book.ticket?.match?.team2?.name || "TBD"}
                        </h4>
                        
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px", marginTop: 8, fontSize: 12, color: darkMode ? "#888" : "#666" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <MapPin size={14} style={{ color: "#c8102e" }} /> 
                            <span style={{ fontWeight: 600 }}>{book.ticket?.match?.venue}</span>
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Ticket size={14} style={{ color: "#c8102e" }} /> 
                            <span>Cat {book.ticket?.category} <b style={{ color: darkMode ? "#fff" : "#000" }}>(x{book.quantity})</b></span>
                          </span>
                        </div>
                      </div>

                      {/* Right Price & Action */}
                      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
                        <span style={{ display: "block", fontSize: 20, fontWeight: 900, color: "#c8102e", fontFamily: FD }}>
                          €{parseFloat(book.total_price).toFixed(2)}
                        </span>
                        <button 
                          onClick={() => { setActiveTix(book); setShowTixModal(true); }}
                          style={{ 
                            background: darkMode ? "#fff" : "#1a1a1a", 
                            color: darkMode ? "#000" : "#fff", 
                            border: "none", 
                            padding: "8px 16px", 
                            borderRadius: 12, 
                            fontSize: 10, 
                            fontWeight: 900, 
                            textTransform: "uppercase", 
                            cursor: "pointer", 
                            marginTop: 12,
                            transition: "all 0.2s",
                            letterSpacing: "0.05em"
                          }}
                          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                        >
                          Voir le ticket
                        </button>
                      </div>
                    </div>
                  );
                })
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

      {/* DIGITAL TICKET MODAL */}
      <div className={`ticket-modal-overlay ${showTixModal ? 'open' : ''}`} onClick={() => setShowTixModal(false)}>
        <div className="digital-ticket" onClick={e => e.stopPropagation()}>
          <div className="ticket-header" style={{ background: "#c8102e", padding: "32px", color: "white", position: "relative", overflow: "hidden" }}>
             <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
             <div style={{ position: "absolute", bottom: -30, left: -20, width: 80, height: 80, background: "rgba(0,0,0,0.1)", borderRadius: "50%" }} />
             
             <div style={{ borderLeft: "3px solid white", paddingLeft: 12, position: "relative", zIndex: 2 }}>
                <h3 style={{ fontFamily: FD, fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 4, opacity: 0.9 }}>FIFA World Cup 2026™</h3>
                <h2 style={{ fontFamily: FD, fontSize: 28, fontWeight: 900, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>Official Match Ticket</h2>
             </div>
          </div>
          
          <div className="ticket-body" style={{ padding: "32px", position: "relative", background: darkMode ? "#1a1a1a" : "#fff", borderBottom: `2px dashed ${darkMode ? "#333" : "#eee"}` }}>
            <div className="perforation perf-left" style={{ position: "absolute", bottom: "-15px", width: "30px", height: "30px", background: darkMode ? "#0a0a0a" : "#fafafa", borderRadius: "50%", zIndex: 5, left: "-15px" }} />
            <div className="perforation perf-right" style={{ position: "absolute", bottom: "-15px", width: "30px", height: "30px", background: darkMode ? "#0a0a0a" : "#fafafa", borderRadius: "50%", zIndex: 5, right: "-15px" }} />
            
            <div style={{ marginBottom: 28 }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#888", marginBottom: 6, letterSpacing: "0.05em" }}>Match Entry</p>
              <h4 style={{ margin: 0, fontSize: 22, fontWeight: 900, fontFamily: FD }}>
                {activeTix?.ticket?.match?.team1?.name || "TBD"} <span style={{ color: "#c8102e" }}>VS</span> {activeTix?.ticket?.match?.team2?.name || "TBD"}
              </h4>
              <div style={{ display: "inline-block", marginTop: 4, padding: "2px 8px", background: "rgba(200, 16, 46, 0.1)", color: "#c8102e", borderRadius: 4, fontSize: 10, fontWeight: 900, textTransform: "uppercase" }}>
                {activeTix?.ticket?.match?.stage}
              </div>
            </div>
 
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 28 }}>
              <div>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#888", marginBottom: 4 }}>Match Date</p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>
                  {activeTix?.ticket?.match?.match_date ? new Date(activeTix.ticket.match.match_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ""}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#888", marginBottom: 4 }}>Kick-off</p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>
                  {activeTix?.ticket?.match?.match_time || (activeTix?.ticket?.match?.match_date ? new Date(activeTix.ticket.match.match_date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : "--:--")}
                </p>
              </div>
            </div>
 
            <div style={{ marginBottom: 28 }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#888", marginBottom: 4 }}>Stadium Venue</p>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{activeTix?.ticket?.match?.venue}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#888", display: "flex", alignItems: "center", gap: 4 }}><MapPin size={12} /> {activeTix?.ticket?.match?.city}</p>
            </div>
 
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#888", marginBottom: 4 }}>Seat Category</p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Category {activeTix?.ticket?.category}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#888", marginBottom: 4 }}>Ref Number</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 900, color: "#c8102e", letterSpacing: "0.05em" }}>{activeTix?.booking_reference}</p>
              </div>
            </div>
          </div>
 
          <div className="ticket-footer" style={{ padding: "32px", background: darkMode ? "#111" : "#fcfcfc", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="qr-placeholder" style={{ width: "160px", height: "160px", background: "white", padding: "12px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${activeTix?.booking_reference}`} alt="QR Code" style={{ width: "100%", height: "100%" }} />
            </div>
            <p style={{ marginTop: "16px", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", color: "#aaa", letterSpacing: "0.15em" }}>Scan at turnstile</p>
            
            <div className="no-print" style={{ display: "flex", gap: 12, marginTop: 32, width: "100%" }}>
              <button 
                onClick={handlePrint}
                style={{ flex: 1, background: "#1a1a1a", color: "white", border: "none", padding: "12px 20px", borderRadius: "12px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}
              >
                <Printer size={16} /> Imprimer
              </button>
              <button 
                onClick={() => setShowTixModal(false)} 
                style={{ flex: 1, background: "transparent", border: `1px solid ${darkMode ? "#333" : "#eee"}`, color: darkMode ? "#fff" : "#000", padding: "12px 20px", borderRadius: "12px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", cursor: "pointer" }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
