import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiTag, FiCalendar, FiGlobe, FiFileText, FiImage } from "react-icons/fi";
import { getNews, createNews, updateNews, deleteNews } from "../../services/api";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminNews() {
  const { darkMode } = useTheme();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "Actualités",
    image_url: "",
    url: "",
    source_name: "FIFA Official",
    published_at: new Date().toISOString().split('T')[0]
  });

  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.55)"   : "rgba(0,0,0,0.5)";
  const surface      = darkMode ? "#171717"                  : "#f5f5f5";
  const accent       = darkMode ? "#ffffff"                  : "#0d0d0d";
  const accentContrast= darkMode ? "#0d0d0d"                 : "#ffffff";

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await getNews({ pageSize: 50 });
      setNews(data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateNews(editId, formData);
      } else {
        await createNews(formData);
      }
      setShowModal(false);
      setFormData({ title: "", description: "", tag: "Actualités", image_url: "", url: "", source_name: "FIFA Official", published_at: new Date().toISOString().split('T')[0] });
      setEditId(null);
      fetchNews();
    } catch (err) {
      const msg = err.errors ? Object.values(err.errors).flat().join("\\n") : (err.message || "Erreur inconnue");
      alert("Erreur lors de l'enregistrement :\\n" + msg);
      console.error(err);
    }
  };

  const handleEdit = (n) => {
    setEditId(n.id);
    let pDate = "";
    if (n.publishedAt) {
      pDate = new Date(n.publishedAt).toISOString().split('T')[0];
    }
    setFormData({
      title: n.title,
      description: n.description || "",
      tag: n.tag || "Actualités",
      image_url: n.urlToImage || "",
      url: n.url || "",
      source_name: n.source?.name || "FIFA Official",
      published_at: pDate || new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!id) return alert("ID invalide");
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      await deleteNews(id);
      fetchNews();
    } catch (err) {
      const msg = err.message || (err.error ? err.error : "Erreur inconnue");
      alert("Erreur lors de la suppression :\\n" + msg);
      console.error(err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        .admin-page {
          background: ${bg}; min-height: calc(100vh - 102px);
          padding: clamp(24px,5vw,48px);
          transition: background 0.3s;
        }
        .admin-inner { max-width: 1200px; margin: 0 auto; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .admin-title {
          font-family: ${FD}; font-size: clamp(32px,5vw,48px); font-weight: 900;
          letter-spacing: 0.02em; text-transform: uppercase; color: ${textPrimary};
          margin: 0; transition: color 0.3s;
        }
        .admin-sub {
          font-family: ${FB}; font-size: 14px; color: ${textSecondary};
          margin: 4px 0 0; transition: color 0.3s;
        }
        .admin-table-container { 
          background: ${card}; border-radius: 24px; overflow: hidden;
          border: 1px solid ${border}; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th {
          font-family: ${FB}; font-size: 11px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: ${textSecondary}; background: ${surface};
          padding: 18px 24px; text-align: left;
          border-bottom: 1px solid ${border};
        }
        .admin-table td {
          font-family: ${FB}; font-size: 14px; color: ${textPrimary};
          padding: 20px 24px; border-bottom: 1px solid ${border};
          vertical-align: middle;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: ${darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"}; }
        
        .img-preview { width: 80px; height: 45px; border-radius: 8px; object-fit: cover; background: #eee; }
        
        .admin-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px; border: none; cursor: pointer;
          font-family: ${FD}; font-size: 13px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: ${accent}; color: ${accentContrast};
          transition: transform 0.2s, opacity 0.2s;
        }
        .admin-btn-primary:active { transform: scale(0.96); }

        .btn-icon {
          width: 36px; height: 36px; border-radius: 10px; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary}; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: 0.2s; margin-right: 8px;
        }
        .btn-icon:hover { background: ${accent}; color: ${accentContrast}; border-color: ${accent}; }
        .btn-icon.delete:hover { background: #ef4444; color: white; border-color: #ef4444; }

        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 5000;
          padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 850px; border-radius: 24px;
          padding: clamp(20px, 4vw, 32px); border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          max-height: 95vh; overflow-y: auto;
          position: relative;
        }
        .form-group { margin-bottom: 20px; }
        .form-label { 
          display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; 
          color: ${textSecondary}; margin-bottom: 8px; text-transform: uppercase; 
        }
        .form-input, .form-textarea {
          width: 100%; padding: 14px 18px; border-radius: 12px; 
          background: ${surface}; border: 1px solid ${border};
          color: ${textPrimary}; font-family: ${FB}; font-size: 14px; outline: none;
          transition: all 0.25s ease;
        }
        .form-textarea { resize: vertical; min-height: 100px; }
        .form-input:focus, .form-textarea:focus { 
          background: #0a0a0a; color: #ffffff; 
          border-color: ${accent}; box-shadow: 0 4px 20px rgba(0,0,0,0.15); 
        }
        .form-input:focus::placeholder, .form-textarea:focus::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Actualités</h1>
              <p className="admin-sub">Gestion des articles et publications officielles</p>
            </div>
            <button className="admin-btn-primary" onClick={() => { setEditId(null); setFormData({ title: "", description: "", tag: "Actualités", image_url: "", url: "", source_name: "FIFA Official", published_at: new Date().toISOString().split('T')[0] }); setShowModal(true); }}>
              <FiPlus /> Nouvel Article
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Tag / Catégorie</th>
                  <th>Source</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : news.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 40 }}>Aucun article trouvé</td></tr>
                ) : news.map((n) => (
                  <tr key={n.id}>
                    <td>
                      {n.urlToImage ? <img src={n.urlToImage} className="img-preview" alt="" /> : <div className="img-preview" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FiImage size={20} color={textSecondary} /></div>}
                    </td>
                    <td style={{ fontWeight: 700 }}>
                      <div style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                         {n.title}
                      </div>
                    </td>
                    <td>
                       <span style={{ fontSize: 13, color: textSecondary, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                         {n.tag}
                       </span>
                    </td>
                    <td>
                       <span style={{ display: "inline-flex", alignItems: "center", gap: 6, opacity: 0.85 }}>
                         <FiGlobe size={14} /> {n.source?.name}
                       </span>
                    </td>
                    <td>
                       <span style={{ display: "inline-flex", alignItems: "center", gap: 6, opacity: 0.85 }}>
                         <FiCalendar size={14} /> {new Date(n.publishedAt).toLocaleDateString()}
                       </span>
                    </td>
                    <td>
                      <button className="btn-icon" onClick={() => handleEdit(n)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon delete" onClick={() => handleDelete(n.id)}><FiTrash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: FD, fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 30, color: textPrimary }}>
              {editId ? "Modifier l'article" : "Nouvel article"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Titre de l'article</label>
                <input 
                  className="form-input" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Le stade de 115 000 places homologué..."
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description / Contenu court</label>
                <textarea 
                  className="form-textarea" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Résumé accrocheur de l'article..."
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">URL de l'image</label>
                <input 
                  className="form-input" 
                  value={formData.image_url} 
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Tag / Sujet</label>
                  <input 
                    className="form-input" 
                    value={formData.tag} 
                    onChange={e => setFormData({...formData, tag: e.target.value})}
                    placeholder="Ex: Stades, Billets..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Source</label>
                  <input 
                    className="form-input" 
                    value={formData.source_name} 
                    onChange={e => setFormData({...formData, source_name: e.target.value})}
                    placeholder="Ex: FIFA Official"
                  />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Date de Publication</label>
                  <input 
                    type="date"
                    className="form-input" 
                    value={formData.published_at} 
                    onChange={e => setFormData({...formData, published_at: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Lien externe (Optionnel)</label>
                  <input 
                    className="form-input" 
                    value={formData.url} 
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  Sauvegarder
                </button>
                <button type="button" className="admin-btn-primary" style={{ background: surface, color: textPrimary, border: `1px solid ${border}` }} onClick={() => setShowModal(false)}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
