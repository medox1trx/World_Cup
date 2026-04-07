import { useState, useEffect } from "react";
import { FiPlayCircle, FiEye, FiHeart, FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import { FONT } from "./Home/constants";
import { getHighlights, viewHighlight, likeHighlight, getComments, postComment } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const formatCount = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

export default function Highlights() {
  const [mounted, setMounted] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Interaction states
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiking, setIsLiking] = useState({});

  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => { 
    setMounted(true); 
    fetchVideos();
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
      // Refresh count locally
      setVideos(prev => prev.map(vid => vid.id === v.id ? { ...vid, views: vid.views + 1 } : vid));
    } catch (err) {
      console.error(err);
      window.open(v.video_url, "_blank");
    }
  };

  const handleLike = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiking[id]) return;
    setIsLiking(prev => ({ ...prev, [id]: true }));
    try {
      const res = await likeHighlight(id);
      setVideos(prev => prev.map(v => v.id === id ? { ...v, likes: res.likes, liked_by_user: res.liked } : v));
    } catch (err) {
      if (err.status === 401) {
        alert("Veuillez vous connecter pour aimer cette vidéo.");
      } else {
        console.error(err);
      }
    } finally {
      setIsLiking(prev => ({ ...prev, [id]: false }));
    }
  };

  const openComments = async (e, video) => {
    e.preventDefault();
    e.stopPropagation();
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
    if (!user) {
      navigate("/register");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const data = await postComment(selectedVideo.id, { 
        content: newComment
      });
      setComments([data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const cats = ["all", "Match de Légende", "Compilations", "Fan Experience"];
  const filteredVideos = activeCat === "all" ? videos : videos.filter(v => v.category === activeCat);

  return (
    <div style={{ 
      fontFamily: FONT.body, 
      background: "#ffffff", 
      color: "#0d0d0d", 
      minHeight: "100vh", 
      opacity: mounted ? 1 : 0, 
      transition: "opacity 0.6s ease",
      paddingBottom: 100
    }}>
      <section style={{ padding: "100px 32px", maxWidth: 1380, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ color: "#c8102e", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13, marginBottom: 20, display: "block" }}>FIFA+ Archive</span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9 }}>Temps Forts</h1>
          <p style={{ color: "#666", fontSize: 20, marginTop: 24, maxWidth: 700, margin: "24px auto 0" }}>
            Revivez les moments les plus intenses du football mondial.
          </p>
        </div>

        {/* CATEGORIES */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 64, overflowX: "auto", paddingBottom: 15 }}>
          {cats.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                background: activeCat === cat ? "#0d0d0d" : "#f5f5f5",
                color: activeCat === cat ? "white" : "#666",
                border: "none",
                padding: "12px 28px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "0.2s"
              }}
            >
              {cat === "all" ? "Toutes les vidéos" : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 100, fontSize: 20, color: "#999" }}>Chargement des moments forts...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 32 }}>
            {filteredVideos.map((v, i) => (
              <div 
                key={v.id || i} 
                onClick={() => handleView(v)}
                style={{ 
                  borderRadius: 32, 
                  overflow: "hidden", 
                  background: "white", 
                  border: "1px solid #eee",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                  transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  transform: "scale(1)",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-10px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ height: 260, position: "relative", overflow: "hidden" }}>
                   <img src={v.image_url} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                   <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
                   <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                      <FiPlayCircle size={64} style={{ opacity: 0.9 }} className="play-icon" />
                   </div>
                   <div style={{ position: "absolute", bottom: 20, right: 20, background: "rgba(0,0,0,0.8)", color: "white", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 800 }}>{v.duration}</div>
                </div>
                
                <div style={{ padding: 32 }}>
                  <span style={{ color: "#c8102e", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>{v.category}</span>
                  <h3 style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 900, textTransform: "uppercase", marginBottom: 20, lineHeight: 1.2 }}>{v.title}</h3>
                  
                  <div style={{ display: "flex", gap: 24, color: "#888", fontSize: 13, fontWeight: 700 }}>
                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}><FiEye size={16} /> {formatCount(v.views)}</div>
                     <div 
                        onClick={(e) => handleLike(e, v.id)}
                        style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "0.2s", color: v.liked_by_user ? "#c8102e" : "inherit" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#c8102e"}
                        onMouseLeave={e => e.currentTarget.style.color = v.liked_by_user ? "#c8102e" : "inherit"}
                     >
                        <FiHeart size={16} fill={v.liked_by_user ? "#c8102e" : "none"} /> {formatCount(v.likes)}
                     </div>
                     <div 
                        onClick={(e) => openComments(e, v)}
                        style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#0d0d0d"}
                        onMouseLeave={e => e.currentTarget.style.color = "inherit"}
                     >
                        <FiMessageSquare size={16} /> {formatCount(v.comments_count || 0)}
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMMENTS MODAL */}
        {selectedVideo && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 10000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
            backdropFilter: "blur(8px)"
          }} onClick={() => setSelectedVideo(null)}>
            <div style={{
              background: "white", width: "100%", maxWidth: 600, maxHeight: "90vh",
              borderRadius: 32, display: "flex", flexDirection: "column", overflow: "hidden",
               position: "relative"
            }} onClick={e => e.stopPropagation()}>
              
              <div style={{ padding: 32, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontFamily: FONT.display, fontSize: 24, textTransform: "uppercase", margin: 0 }}>Commentaires</h2>
                <button onClick={() => setSelectedVideo(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#666" }}>
                  <FiX size={24} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
                <div style={{ marginBottom: 32 }}>
                   <p style={{ fontWeight: 800, color: "#c8102e", fontSize: 12, textTransform: "uppercase", marginBottom: 8 }}>{selectedVideo.category}</p>
                   <p style={{ fontFamily: FONT.display, fontSize: 20, margin: 0 }}>{selectedVideo.title}</p>
                </div>

                {comments.length === 0 ? (
                  <div style={{ textAlign: "center", color: "#999", padding: "40px 0" }}>Aucun commentaire pour le moment. Soyez le premier !</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {comments.map((c, i) => (
                      <div key={c.id || i} style={{ borderBottom: "1px solid #f5f5f5", paddingBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ fontWeight: 800, fontSize: 13 }}>{c.user_name || "Anonyme"}</span>
                          <span style={{ color: "#aaa", fontSize: 11 }}>{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <p style={{ margin: 0, color: "#444", fontSize: 14 }}>{c.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ padding: 32, background: "#f9f9f9", borderTop: "1px solid #eee" }}>
                {user ? (
                  <form onSubmit={handlePostComment} style={{ display: "flex", gap: 12 }}>
                    <input 
                      type="text" 
                      placeholder="Ajoutez un commentaire..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      style={{ 
                        flex: 1, padding: "12px 20px", borderRadius: 100, border: "1px solid #ddd",
                        fontFamily: FONT.body, outline: "none"
                      }}
                    />
                    <button type="submit" style={{ 
                      background: "#0d0d0d", color: "white", border: "none", width: 44, height: 44,
                       borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                       cursor: "pointer"
                    }}>
                      <FiSend size={18} />
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ margin: "0 0 16px", color: "#666", fontSize: 14 }}>Connectez-vous pour partager votre avis.</p>
                    <button 
                      onClick={() => navigate("/register")}
                      style={{
                        background: "#c8102e", color: "white", border: "none", padding: "12px 32px",
                        borderRadius: 100, fontWeight: 900, textTransform: "uppercase", fontSize: 12,
                        cursor: "pointer", letterSpacing: "0.1em"
                      }}
                    >
                      S'inscrire maintenant
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}