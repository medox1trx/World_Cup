import { useState, useEffect } from "react";
import { FiPlayCircle, FiEye, FiHeart, FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import { getHighlights, viewHighlight, likeHighlight, getComments, postComment } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const FONT_D = "'Barlow Condensed', sans-serif";
const FONT_B = "'Barlow', sans-serif";

const formatCount = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

export default function Highlights() {
  const { darkMode } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiking, setIsLiking] = useState({});

  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => { 
    const t = setTimeout(() => setMounted(true), 40);
    fetchVideos();
    return () => clearTimeout(t);
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await getHighlights();
      setVideos(data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (v) => {
    try {
      await viewHighlight(v.id);
      window.open(v.video_url, "_blank");
      setVideos(prev => prev.map(vid => vid.id === v.id ? { ...vid, views: vid.views + 1 } : vid));
    } catch (err) {
      console.error(err);
      window.open(v.video_url, "_blank");
    }
  };

  const handleLike = async (e, id) => {
    e.preventDefault(); e.stopPropagation();
    if (isLiking[id]) return;
    setIsLiking(prev => ({ ...prev, [id]: true }));
    try {
      const res = await likeHighlight(id);
      setVideos(prev => prev.map(v => v.id === id ? { ...v, likes: res.likes, liked_by_user: res.liked } : v));
    } catch (err) {
      if (err.status === 401) alert("Veuillez vous connecter pour aimer cette vidéo.");
      else console.error(err);
    } finally {
      setIsLiking(prev => ({ ...prev, [id]: false }));
    }
  };

  const openComments = async (e, video) => {
    e.preventDefault(); e.stopPropagation();
    setSelectedVideo(video);
    setComments([]);
    try {
      const data = await getComments(video.id);
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/register"); return; }
    if (!newComment.trim()) return;
    try {
      const data = await postComment(selectedVideo.id, { content: newComment });
      setComments([data, ...comments]);
      setNewComment("");
    } catch (err) { console.error(err); }
  };

  const cats = ["all", "Match de Légende", "Compilations", "Fan Experience"];
  const filteredVideos = activeCat === "all" ? videos : videos.filter(v => v.category === activeCat);

  const tBg = darkMode ? "#0d0d0d" : "#fdfdfd";
  const tText = darkMode ? "white" : "#0d0d0d";
  const tCardBg = darkMode ? "#111111" : "#ffffff";
  const tBorder = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tBorderHov = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const tSubText = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";
  const tStroke = darkMode ? "1.5px rgba(255,255,255,0.6)" : "1.5px rgba(0,0,0,0.2)";
  const tGradTop = darkMode ? "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0) 100%)" : "linear-gradient(to top, #fdfdfd 0%, rgba(253,253,253,0) 100%)";
  const tInputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const tDot = darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)";
  const tBtnBg = darkMode ? "white" : "#0d0d0d";
  const tBtnText = darkMode ? "#0d0d0d" : "white";

  return (
    <div style={{ fontFamily: FONT_B, background: tBg, color: tText, opacity: mounted ? 1 : 0, transition: "background-color 0.4s, color 0.4s, opacity 0.4s", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .hw { max-width: 1380px; margin: 0 auto; padding: 0 clamp(16px,3vw,48px); }
        .pkg { border-radius:10px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.22s ease, box-shadow 0.22s ease; background: ${tCardBg}; border: 1px solid ${tBorder}; }
        .pkg:hover { transform:translateY(-5px); border-color: ${tBorderHov}; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
        .btn-shim { position:relative; overflow:hidden; }
        .btn-shim .sh { position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); pointer-events:none; }
        .btn-shim:hover .sh { animation:shim 0.5s ease forwards; }
        @keyframes shim { from{left:-80%;} to{left:130%;} }
        .g-vids { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 30px; }
        @media(max-width: 768px) { .g-vids { grid-template-columns: 1fr; } }
      `}</style>

      {/* HERO SECTION */}
      <section style={{ position: "relative", minHeight: "50vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${tDot} 1px,transparent 1px)`, backgroundSize: "32px 32px", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: tGradTop, zIndex: 1 }} />
        
        <div className="hw" style={{ position: "relative", zIndex: 2, width: "100%", padding: "clamp(120px,15vh,180px) clamp(16px,3vw,48px) 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
            <div style={{ height: 1, width: 36, background: tBorderHov, flexShrink: 0 }} />
            <span style={{ color: tSubText, fontFamily: FONT_B, fontSize: 10, fontWeight: 800, letterSpacing: "0.42em", textTransform: "uppercase" }}>FIFA+ Archives</span>
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontFamily: FONT_D, fontSize: "clamp(48px,8vw,110px)", fontWeight: 900, lineHeight: 0.85, textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
              TEMPS <span style={{ color: "transparent", WebkitTextStroke: tStroke }}>FORTS</span>
            </h1>
          </div>
          <p style={{ color: tSubText, fontFamily: FONT_B, fontSize: 15, fontWeight: 500, maxWidth: 500, margin: 0 }}>
            Revivez les moments les plus intenses du football mondial. Actions, buts, et émotions en haute définition.
          </p>
        </div>
      </section>

      {/* TABS */}
      <div className="hw" style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, scrollbarWidth: "none" }}>
          {cats.map(cat => {
            const isSel = activeCat === cat;
            return (
              <button key={cat} onClick={() => setActiveCat(cat)} style={{
                background: isSel ? tBtnBg : "transparent",
                color: isSel ? tBtnText : tSubText,
                border: isSel ? `1px solid ${tBtnBg}` : `1px solid ${tBorder}`,
                padding: "10px 22px", borderRadius: 100, fontSize: 12, fontWeight: 800,
                cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
                textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT_B
              }} onMouseOver={e => !isSel && (e.currentTarget.style.borderColor = tSubText)}
                 onMouseOut={e => !isSel && (e.currentTarget.style.borderColor = tBorder)}>
                {cat === "all" ? "Toutes les vidéos" : cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* CONTENT */}
      <section className="hw" style={{ paddingBottom: 100 }}>
        {loading ? (
          <div className="g-vids">
            {[...Array(6)].map((_, i) => <div key={i} style={{ height: 350, background: tInputBg, borderRadius: 10 }} />)}
          </div>
        ) : (
          <div className="g-vids">
            {filteredVideos.map((v, i) => (
              <div key={v.id || i} onClick={() => handleView(v)} className="pkg" style={{ cursor: "pointer" }}>
                <div style={{ height: 240, overflow: "hidden", position: "relative" }}>
                   <img src={v.image_url} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                     onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                     onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
                   <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
                   <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                      <FiPlayCircle size={60} style={{ opacity: 0.9, dropShadow: "0 4px 20px rgba(0,0,0,0.5)" }} />
                   </div>
                   <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.8)", fontFamily: FONT_B, color: "white", padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 800, letterSpacing: "0.05em" }}>{v.duration}</div>
                </div>
                
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <span style={{ color: tSubText, fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{v.category}</span>
                  <h3 style={{ fontFamily: FONT_D, fontSize: 24, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", margin: "0 0 20px", lineHeight: 1.1, flex: 1, color: tText }}>{v.title}</h3>
                  
                  <div style={{ display: "flex", gap: 20, color: tSubText, fontSize: 12, fontWeight: 700, fontFamily: FONT_B, borderTop: `1px solid ${tBorder}`, paddingTop: 16 }}>
                     <div style={{ display: "flex", alignItems: "center", gap: 6 }}><FiEye size={14} /> {formatCount(v.views)}</div>
                     <div onClick={(e) => handleLike(e, v.id)} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", transition: "0.2s", color: v.liked_by_user ? tText : "inherit" }}>
                        <FiHeart size={14} fill={v.liked_by_user ? tText : "none"} /> {formatCount(v.likes)}
                     </div>
                     <div onClick={(e) => openComments(e, v)} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.color = tText} onMouseLeave={e => e.currentTarget.style.color = "inherit"}>
                        <FiMessageSquare size={14} /> {formatCount(v.comments_count || 0)}
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* COMMENTS MODAL */}
      {selectedVideo && (
        <div style={{ position: "fixed", inset: 0, background: darkMode ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(8px)" }} onClick={() => setSelectedVideo(null)}>
          <div style={{ background: tCardBg, width: "100%", maxWidth: 600, maxHeight: "90vh", borderRadius: 16, border: `1px solid ${tBorder}`, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
            
            <div style={{ padding: "24px 32px", borderBottom: `1px solid ${tBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: FONT_D, fontSize: 24, textTransform: "uppercase", margin: 0, letterSpacing: "0.02em", color: tText }}>Commentaires</h2>
              <button onClick={() => setSelectedVideo(null)} style={{ background: "none", border: "none", cursor: "pointer", color: tSubText }}>
                <FiX size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
              <div style={{ marginBottom: 32 }}>
                 <p style={{ fontWeight: 800, color: tText, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{selectedVideo.category}</p>
                 <p style={{ fontFamily: FONT_D, fontSize: 24, textTransform: "uppercase", margin: 0, lineHeight: 1.1, letterSpacing: "0.02em", color: tText }}>{selectedVideo.title}</p>
              </div>

              {comments.length === 0 ? (
                <div style={{ textAlign: "center", color: tSubText, padding: "40px 0", fontFamily: FONT_B, fontSize: 14 }}>Aucun commentaire pour le moment. Soyez le premier!</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {comments.map((c, i) => (
                    <div key={c.id || i} style={{ borderBottom: `1px solid ${tBorder}`, paddingBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontWeight: 800, fontSize: 13, fontFamily: FONT_B, color: tText, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.user_name || "Anonyme"}</span>
                        <span style={{ color: tSubText, fontSize: 11, fontFamily: FONT_B }}>{new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                      <p style={{ margin: 0, color: tSubText, fontSize: 14, fontFamily: FONT_B, lineHeight: 1.6 }}>{c.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: "24px 32px", background: darkMode ? "#0a0a0a" : "#f5f5f5", borderTop: `1px solid ${tBorder}` }}>
              {user ? (
                <form onSubmit={handlePostComment} style={{ display: "flex", gap: 12 }}>
                  <input type="text" placeholder="Ajoutez un commentaire..." value={newComment} onChange={(e) => setNewComment(e.target.value)}
                    style={{ flex: 1, padding: "14px 20px", borderRadius: 100, background: tInputBg, border: `1px solid ${tBorder}`, color: tText, fontFamily: FONT_B, fontSize: 14, outline: "none" }} />
                  <button type="submit" style={{ background: tBtnBg, color: tBtnText, border: "none", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <FiSend size={18} />
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: "0 0 16px", color: tSubText, fontSize: 13, fontFamily: FONT_B }}>Connectez-vous pour rejoindre la discussion.</p>
                  <button onClick={() => navigate("/register")} className="btn-shim" style={{ background: tBtnBg, color: tBtnText, border: "none", padding: "12px 28px", borderRadius: 100, fontWeight: 800, textTransform: "uppercase", fontSize: 11, cursor: "pointer", letterSpacing: "0.1em", fontFamily: FONT_B }}>
                    <span className="sh" style={{ background: `linear-gradient(90deg,transparent,${darkMode?"rgba(255,255,255,.45)":"rgba(0,0,0,.15)"},transparent)` }} /> S'inscrire
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}