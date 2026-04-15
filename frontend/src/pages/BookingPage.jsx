import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getAccommodation, storeReservation } from "../services/api";
import { 
  Star, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Home, 
  Check, 
  Info, 
  Calendar as CalendarIcon, 
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DoorOpen,
  User
} from "lucide-react";
import toast from "react-hot-toast";

const FD = "'Barlow Condensed', sans-serif";
const FB = "'Barlow', sans-serif";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
};

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const { user, loading: authLoading } = useAuth();

  const [acc, setAcc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Step-based booking: 'form' -> 'summary'
  const [step, setStep] = useState('form');

  const [form, setForm] = useState({
    check_in: "",
    check_out: "",
    guests: 1,
    notes: ""
  });

  // Fetch data
  useEffect(() => {
    window.scrollTo(0, 0);
    getAccommodation(id)
      .then(res => {
        setAcc(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Accommodation not found");
        setLoading(false);
      });
  }, [id]);

  // Auth Guard
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { state: { from: location } });
    }
  }, [user, authLoading, navigate, location]);

  // Auto-calculation
  const { nights, totalPrice } = useMemo(() => {
    if (!form.check_in || !form.check_out || !acc) return { nights: 0, totalPrice: 0 };
    const start = new Date(form.check_in);
    const end = new Date(form.check_out);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const effectiveNights = diff > 0 ? diff : 0;
    return {
      nights: effectiveNights,
      totalPrice: (effectiveNights * acc.price_per_night).toFixed(2)
    };
  }, [form.check_in, form.check_out, acc]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleGoToSummary = (e) => {
    e.preventDefault();
    if (nights <= 0) {
      toast.error("Please select valid stay dates (Check-out must be after Check-in)");
      return;
    }
    setStep('summary');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      await storeReservation({
        accommodation_id: id,
        ...form
      });
      setSuccess(true);
      toast.success("Booking confirmed!");
    } catch (err) {
      const msg = err.message || "An error occurred. The dates might already be taken.";
      setError(msg);
      toast.error(msg);
      setStep('form'); // Go back to form if error
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <div className="loader"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ background: darkMode ? "#0a0a0a" : "#fafafa", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 500, width: "100%", background: darkMode ? "#141414" : "white", padding: 48, borderRadius: 32, textAlign: "center", border: `1px solid ${darkMode ? "#222" : "#eee"}`, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
          <div style={{ color: "#22c55e", marginBottom: 24, display: "flex", justifyContent: "center" }}>
            <CheckCircle2 size={80} />
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>Booking Confirmed!</h2>
          <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>
            Your stay at <strong>{acc.name}</strong> is all set. Your tickets and summary are available in your dashboard.
          </p>
          <button onClick={() => navigate("/profile")} style={{ width: "100%", padding: "18px", borderRadius: 100, background: "#c8102e", color: "white", border: "none", fontWeight: 800, fontSize: 18, cursor: "pointer", transition: "transform 0.1s" }} onMouseDown={e => e.currentTarget.style.transform="scale(0.98)"} onMouseUp={e => e.currentTarget.style.transform="scale(1)"}>
            Go to My Dashboard
          </button>
          <Link to="/cities" style={{ display: "block", marginTop: 24, color: "#c8102e", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Explore more host cities</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: darkMode ? "#0a0a0a" : "#fafafa", color: darkMode ? "white" : "#0d0d0d", minHeight: "100vh", transition: "background 0.3s" }}>
      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px" }}>
        
        {/* Back navigation */}
        <button onClick={() => setStep('form')} style={{ display: step === 'summary' ? 'flex' : 'none', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: darkMode ? '#888' : '#666', cursor: 'pointer', marginBottom: 24, fontWeight: 700, padding: 0 }}>
          <ChevronLeft size={18} /> Edit details
        </button>

        {/* Header Section */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: 16 }}>
            {step === 'summary' ? "Request to Book" : acc.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", fontSize: 15, fontWeight: 600 }}>
             <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={18} fill="#ffb400" stroke="#ffb400" /> {acc.rating}</span>
             <span style={{ color: darkMode ? "#555" : "#ddd" }}>|</span>
             <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={18} /> {acc.location}</span>
             <span style={{ color: darkMode ? "#555" : "#ddd" }}>|</span>
             <span style={{ color: "#c8102e", display: "flex", alignItems: "center", gap: 6 }}><Home size={18} /> {t(`filters.${acc.type}`)}</span>
          </div>
        </div>

        {step === 'form' ? (
          <>
            {/* Gallery */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, height: 500, borderRadius: 32, overflow: "hidden", marginBottom: 48 }}>
               <img src={acc.image_url} alt={acc.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
               <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 16 }}>
                  <img src={acc.image_url.replace("w=800", "w=401")} alt="view 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <img src={acc.image_url.replace("w=800", "w=402")} alt="view 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
               </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 80, alignItems: "start" }}>
              {/* Main Info */}
              <div>
                <div style={{ paddingBottom: 32, borderBottom: `1px solid ${darkMode ? "#222" : "#eee"}`, marginBottom: 32 }}>
                   <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Hosted in {acc.city?.name}</h3>
                   <div style={{ display: "flex", gap: 20, color: darkMode ? "#888" : "#666", fontSize: 15, fontWeight: 500 }}>
                     <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Users size={18} /> {acc.capacity} {t('guests')}</span>
                     <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Bed size={18} /> {acc.beds} {t('beds')}</span>
                     <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Bath size={18} /> {acc.baths} {t('baths')}</span>
                   </div>
                </div>

                <div style={{ marginBottom: 48 }}>
                  <p style={{ fontSize: 18, lineHeight: 1.8, color: darkMode ? "#bbb" : "#444" }}>{acc.description}</p>
                </div>

                <div style={{ paddingBottom: 32, borderBottom: `1px solid ${darkMode ? "#222" : "#eee"}`, marginBottom: 32 }}>
                   <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24 }}>{t('amenities')}</h3>
                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      {(acc.amenities || []).map(item => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, fontWeight: 500 }}>
                           <Check size={20} strokeWidth={3} style={{ color: "#22c55e" }} />
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: 16, background: darkMode ? "#141414" : "#f0fdf4", padding: 24, borderRadius: 20, border: `1px solid ${darkMode ? "#222" : "#dcfce7"}` }}>
                   <ShieldCheck size={32} style={{ color: "#22c55e" }} />
                   <div>
                     <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>FIFA Verified Stay</h4>
                     <p style={{ margin: 0, fontSize: 14, color: darkMode ? "#888" : "#666" }}>This accommodation is officially vetted for World Cup 2026™ travelers.</p>
                   </div>
                </div>
              </div>

              {/* Sticky Booking Card */}
              <div style={{ position: "sticky", top: 140 }}>
                 <div style={{ background: darkMode ? "#1a1a1a" : "white", padding: 28, borderRadius: 24, border: `1px solid ${darkMode ? "#333" : "#e5e5e5"}`, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                       <div>
                          <span style={{ fontSize: 32, fontWeight: 900, color: darkMode ? "#fff" : "#111" }}>${acc.price_per_night}</span>
                          <span style={{ color: darkMode ? "#888" : "#666", fontWeight: 600, fontSize: 15 }}> / {t('perNight')}</span>
                       </div>
                       <div style={{ display: "flex", alignItems: "center", gap: 6, background: darkMode ? "#222" : "#f5f5f5", padding: "6px 12px", borderRadius: 20 }}>
                          <Star size={14} fill="#ffb400" stroke="#ffb400" />
                          <span style={{ fontWeight: 700, fontSize: 14 }}>{acc.rating}</span>
                       </div>
                    </div>

                    <form onSubmit={handleGoToSummary}>
                      <div style={{ border: `1px solid ${darkMode ? "#444" : "#ddd"}`, borderRadius: 16, overflow: "hidden", marginBottom: 20, background: darkMode ? "#0f0f0f" : "#fafafa" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${darkMode ? "#444" : "#ddd"}` }}>
                           <div style={{ padding: "16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                <DoorOpen size={14} style={{ color: "#c8102e" }} />
                                <label style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: darkMode ? "#888" : "#666" }}>{t('checkIn')}</label>
                              </div>
                              <input type="date" name="check_in" value={form.check_in} onChange={handleChange} required style={{ width: "100%", border: "none", outline: "none", background: "transparent", color: darkMode ? "#fff" : "#111", fontWeight: 700, fontSize: 14, fontFamily: FB }} />
                           </div>
                           <div style={{ padding: "16px", borderLeft: `1px solid ${darkMode ? "#444" : "#ddd"}` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                <DoorOpen size={14} style={{ transform: "scaleX(-1)", color: "#c8102e" }} />
                                <label style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: darkMode ? "#888" : "#666" }}>{t('checkOut')}</label>
                              </div>
                              <input type="date" name="check_out" value={form.check_out} onChange={handleChange} required style={{ width: "100%", border: "none", outline: "none", background: "transparent", color: darkMode ? "#fff" : "#111", fontWeight: 700, fontSize: 14, fontFamily: FB }} />
                           </div>
                        </div>
                        <div style={{ padding: "16px" }}>
                           <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                             <User size={14} style={{ color: "#c8102e" }} />
                             <label style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: darkMode ? "#888" : "#666" }}>{t('guests')}</label>
                           </div>
                           <input type="number" name="guests" min="1" max={acc.capacity} value={form.guests} onChange={handleChange} style={{ width: "100%", border: "none", outline: "none", background: "transparent", color: darkMode ? "#fff" : "#111", fontWeight: 700, fontSize: 14, fontFamily: FB }} />
                        </div>
                      </div>

                      <button type="submit" disabled={!acc.is_available} style={{ width: "100%", padding: "18px", borderRadius: 100, background: "#c8102e", color: "white", border: "none", fontWeight: 900, fontFamily: FD, letterSpacing: "0.12em", fontSize: 16, cursor: !acc.is_available ? "not-allowed" : "pointer", opacity: !acc.is_available ? 0.6 : 1, transition: "transform 0.1s", boxShadow: "0 4px 16px rgba(200, 16, 46, 0.3)" }} onMouseDown={e => !submitting && (e.currentTarget.style.transform="scale(0.98)")} onMouseUp={e => !submitting && (e.currentTarget.style.transform="scale(1)")}>
                        RESERVE NOW
                      </button>

                      {nights > 0 && (
                         <div style={{ marginTop: 24, padding: 20, background: darkMode ? "#0f0f0f" : "#fafafa", borderRadius: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: darkMode ? "#aaa" : "#555", fontWeight: 600, fontSize: 14 }}>
                               <span>${acc.price_per_night} × {nights} {t('nights')}</span>
                               <span>${totalPrice}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: `1px solid ${darkMode ? "#333" : "#eee"}`, fontWeight: 900, fontSize: 22 }}>
                               <span style={{ color: darkMode ? "#fff" : "#111" }}>Total</span>
                               <span style={{ color: "#c8102e" }}>${totalPrice}</span>
                            </div>
                         </div>
                      )}
                    </form>

                    <div style={{ textAlign: "center", marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <Info size={14} style={{ color: darkMode ? "#666" : "#999" }} />
                      <span style={{ fontSize: 12, color: darkMode ? "#666" : "#999", fontWeight: 500 }}>You won't be charged yet</span>
                    </div>
                 </div>
              </div>
            </div>
          </>
        ) : (
          /* Summary Step */
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <div style={{ background: darkMode ? "#141414" : "white", padding: 40, borderRadius: 32, border: `1px solid ${darkMode ? "#222" : "#eee"}` }}>
                <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 32 }}>Your journey details</h3>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#888" }}>Dates</p>
                    <p style={{ margin: "4px 0 0", fontSize: 16, fontWeight: 700 }}>{formatDate(form.check_in)} – {formatDate(form.check_out)}</p>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#888" }}>Guests</p>
                    <p style={{ margin: "4px 0 0", fontSize: 16, fontWeight: 700 }}>{form.guests} Guests</p>
                  </div>
                </div>

                <div style={{ marginBottom: 32 }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#888", marginBottom: 12 }}>Notes (Optional)</p>
                  <textarea 
                    name="notes" 
                    value={form.notes} 
                    onChange={handleChange} 
                    placeholder="Arriving late? Specific needs? Let us know."
                    style={{ width: "100%", padding: 16, borderRadius: 12, background: darkMode ? "#0a0a0a" : "#f9f9f9", border: `1px solid ${darkMode ? "#333" : "#eee"}`, color: "inherit", fontFamily: FB, minHeight: 120, outline: "none" }}
                  />
                </div>

                <div style={{ padding: 24, background: darkMode ? "#0a0a0a" : "#fff8f6", borderRadius: 20, border: "1px dashed #c8102e33" }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: darkMode ? "#ddd" : "#444", display: "flex", gap: 8, alignItems: "center" }}>
                    <ShieldCheck size={20} style={{ color: "#c8102e" }} /> Cancellation Policy
                  </p>
                  <p style={{ margin: "8px 0 0", fontSize: 13, color: "#888", lineHeight: 1.5 }}>Cancel up to 48 hours before check-in for a full refund (minus service fees).</p>
                </div>
              </div>
            </div>

            <div style={{ background: darkMode ? "#141414" : "white", padding: 32, borderRadius: 32, border: `1px solid ${darkMode ? "#222" : "#eee"}`, position: "sticky", top: 140 }}>
              <div style={{ display: "flex", gap: 16, paddingBottom: 24, borderBottom: `1px solid ${darkMode ? "#222" : "#eee"}`, marginBottom: 24 }}>
                <img src={acc.image_url} style={{ width: 100, height: 100, borderRadius: 16, objectFit: "cover" }} />
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>{acc.name}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>{acc.type} in {acc.city?.name}</p>
                  <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Star size={14} fill="#ffb400" stroke="#ffb400" /> {acc.rating} (FIFA Verified)
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 24 }}>Price Summary</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontWeight: 600 }}>
                <span>${acc.price_per_night} x {nights} nights</span>
                <span>${totalPrice}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, color: "#22c55e", fontWeight: 700 }}>
                <span>World Cup Discount</span>
                <span>-$0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 20, borderTop: `1px solid ${darkMode ? "#222" : "#eee"}`, fontSize: 22, fontWeight: 900 }}>
                <span>Total (USD)</span>
                <span>${totalPrice}</span>
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={submitting} 
                style={{ width: "100%", marginTop: 32, padding: "20px", borderRadius: 100, background: "#c8102e", color: "white", border: "none", fontWeight: 900, fontFamily: FD, fontSize: 18, letterSpacing: "0.1em", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                {submitting ? "PROCESSING..." : <>CONFIRM BOOKING <ArrowRight size={20} /></>}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #c8102e; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
