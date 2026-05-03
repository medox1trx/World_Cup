import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiPlus, FiTrash2, FiEdit2, FiImage, FiCalendar, FiExternalLink } from "react-icons/fi";
import { getNews, createNews, updateNews, deleteNews, getImageUrl } from "../../services/api";
import ImageUpload from "../../components/ImageUpload.jsx";
import toast from "react-hot-toast";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminNews() {
  const { darkMode } = useTheme();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageData, setImageData] = useState({ type: 'url', value: '' });
  
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
      setNews(data.articles || data.data || data || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      toast.error("Erreur lors du chargement des actualités");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFile = imageData.type === 'file' && imageData.value;
    let payload;

    if (isFile) {
      payload = new FormData();
      Object.keys(formData).forEach(key => { if (key !== 'image_url') payload.append(key, formData[key]); });
      payload.append('image_url', imageData.value);
      if (editId) payload.append('_method', 'PUT');
    } else {
      payload = { ...formData, image_url: imageData.value };
    }

    try {
      if (editId) await updateNews(editId, payload);
      else await createNews(payload);
      toast.success("Article enregistré !");
      setShowModal(false);
      resetForm();
      fetchNews();
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", tag: "Actualités", image_url: "", url: "", source_name: "FIFA Official", published_at: new Date().toISOString().split('T')[0] });
    setImageData({ type: 'url', value: '' });
    setEditId(null);
  };

  const handleEdit = (n) => {
    setEditId(n.id);
    setFormData({
      title: n.title,
      description: n.description || "",
      tag: n.tag || "Actualités",
      image_url: n.urlToImage || n.image_url || "",
      url: n.url || "",
      source_name: n.source?.name || n.source_name || "FIFA Official",
      published_at: n.publishedAt ? new Date(n.publishedAt).toISOString().split('T')[0] : n.published_at || new Date().toISOString().split('T')[0]
    });
    setImageData({ type: 'url', value: n.urlToImage || n.image_url || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      await deleteNews(id);
      toast.success("Article supprimé");
      fetchNews();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
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
          margin: 0;
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
        .img-preview { width: 80px; height: 45px; border-radius: 8px; object-fit: cover; background: ${surface}; }
        .admin-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px; border: none; cursor: pointer;
          font-family: ${FD}; font-size: 13px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: ${accent}; color: ${accentContrast}; transition: 0.2s;
        }
        .btn-icon {
          width: 36px; height: 36px; border-radius: 10px; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary}; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: 0.2s; margin-right: 8px;
        }
        .btn-icon:hover { background: ${accent}; color: ${accentContrast}; }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 5000;
          padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 750px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          max-height: 95vh; overflow-y: auto;
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { 
          width: 100%; padding: 12px 18px; border-radius: 12px; 
          background-color: ${surface}; border: 1px solid ${border}; 
          color: ${textPrimary}; outline: none; transition: all 0.25s ease;
          font-family: ${FB}; font-size: 15px;
        }
        .form-input:focus { border-color: ${accent}; background-color: ${card}; }
        .admin-badge {
          padding: 4px 10px; border-radius: 100px; font-size: 10px; font-weight: 800;
          text-transform: uppercase; border: 1px solid ${border};
          background: ${surface}; color: ${textPrimary};
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Actualités</h1>
            </div>
            <button className="admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <FiPlus /> Nouvel Article
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Aperçu</th>
                  <th>Article</th>
                  <th>Catégorie</th>
                  <th>Source</th>
                  <th>Publication</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
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
                      <img src={getImageUrl(n.urlToImage || n.image_url)} className="img-preview" alt="" onError={e => e.target.src = "https://images.unsplash.com/photo-1504711432869-efd597cbb042?w=200&q=80"} />
                    </td>
                    <td>
                      <div style={{ fontWeight: 800, fontSize: 15, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: textSecondary, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.description}</div>
                    </td>
                    <td><span className="admin-badge">{n.tag || "News"}</span></td>
                    <td><div style={{ fontWeight: 600 }}>{n.source?.name || n.source_name}</div></td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}>
                        <FiCalendar size={14} color={textSecondary} />
                        {new Date(n.publishedAt || n.published_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => handleEdit(n)}><FiEdit2 size={16} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(n.id)}><FiTrash2 size={16} /></button>
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
              {editId ? "Modifier Article" : "Nouvel Article"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Titre de l'actualité</label>
                <input className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="Ex: Tirage au sort des groupes" />
              </div>

              <div className="form-group">
                <label className="form-label">Description courte</label>
                <textarea className="form-input" style={{ minHeight: 100 }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required placeholder="Résumé de l'article..." />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Catégorie (Tag)</label>
                  <input className="form-input" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} placeholder="Ex: LIVE, NEW, TOURNOI" />
                </div>
                <div className="form-group">
                  <label className="form-label">Source</label>
                  <input className="form-input" value={formData.source_name} onChange={e => setFormData({...formData, source_name: e.target.value})} placeholder="Ex: FIFA Communications" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Date de publication</label>
                  <input type="date" className="form-input" value={formData.published_at} onChange={e => setFormData({...formData, published_at: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Lien externe (optionnel)</label>
                  <input className="form-input" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="https://fifa.com/news/..." />
                </div>
              </div>

              <div className="form-group">
                <ImageUpload label="Image de couverture" defaultValue={formData.image_url} onChange={setImageData} darkMode={darkMode} folder="news" />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 1, justifyContent: "center" }}>Sauvegarder</button>
                <button type="button" className="admin-btn-primary" style={{ background: surface, color: textPrimary, border: `1px solid ${border}` }} onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
