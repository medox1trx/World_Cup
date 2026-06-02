import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { FiEdit2, FiTrash2, FiUserCheck, FiShield } from "react-icons/fi";
import { adminGetUsers, adminUpdateUser, adminDeleteUser } from "../../services/api";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

export default function AdminUsers() {
  const { darkMode } = useTheme();
  const { user: currentUser, isSuperAdmin } = useAuth();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "", email: "", role: "user"
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
    if (isSuperAdmin) {
      fetchUsers();
    }
  }, [isSuperAdmin]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminGetUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching admin users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await adminUpdateUser(editId, formData);
      }
      setShowModal(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", role: "user" });
    setEditId(null);
  };

  const handleEdit = (u) => {
    setEditId(u.id);
    setFormData({
      name: u.name,
      email: u.email,
      role: u.role || "user"
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (id === currentUser.id) {
      alert("Vous ne pouvez pas supprimer votre propre compte.");
      return;
    }
    if (!window.confirm("Supprimer cet utilisateur définitivement ?")) return;
    try {
      await adminDeleteUser(id);
      fetchUsers();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  if (!isSuperAdmin) {
    return <div style={{ padding: 40, color: textPrimary, textAlign: 'center', fontFamily: FB }}>Accès refusé. Droits Super Administrateur requis.</div>;
  }

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
        .btn-icon:hover:not(:disabled) { background: ${accent}; color: ${accentContrast}; }
        .btn-icon:disabled { opacity: 0.3; cursor: not-allowed; }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; z-index: 5000;
          padding: 20px;
        }
        .modal-content {
          background: ${bg}; width: 100%; max-width: 600px; border-radius: 24px;
          padding: 32px; border: 1px solid ${border}; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: ${FB}; font-size: 12px; font-weight: 700; color: ${textSecondary}; margin-bottom: 8px; }
        .form-input { 
          width: 100%; padding: 12px 18px; border-radius: 12px; 
          background-color: ${surface}; border: 1px solid ${border}; 
          color: ${textPrimary}; outline: none; transition: all 0.25s ease;
          box-sizing: border-box; font-family: ${FB}; font-size: 15px;
        }
        select.form-input {
          appearance: none !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(textSecondary)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important; 
          background-position: right 18px center !important; 
          background-size: 18px !important; 
          padding-right: 48px !important; 
          cursor: pointer;
        }
        .admin-badge {
          font-family: ${FB}; font-size: 11px; font-weight: 800;
          text-transform: uppercase; color: ${textPrimary};
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">Gestion Utilisateurs</h1>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom complet</th>
                  <th>E-mail</th>
                  <th>Rôle</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 40 }}>Chargement...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: 40 }}>Aucun utilisateur</td></tr>
                ) : users.map((u) => (
                  <tr key={u.id}>
                    <td><span style={{ fontWeight: 800, fontSize: 16 }}>{u.name}</span></td>
                    <td>{u.email}</td>
                    <td>
                      <span className="admin-badge">
                        {u.role === 'super_admin' ? 'Super Admin' : u.role === 'admin' ? 'Admin' : 'Utilisateur'}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon" onClick={() => handleEdit(u)} title="Modifier">
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        className="btn-icon" 
                        onClick={() => handleDelete(u.id)} 
                        title="Supprimer"
                        disabled={u.id === currentUser.id}
                      >
                        <FiTrash2 size={16} />
                      </button>
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
              Modifier Utilisateur
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nom complet</label>
                <input className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Adresse e-mail</label>
                <input className="form-input" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              </div>

              <div className="form-group">
                <label className="form-label">Rôle</label>
                <select 
                  className="form-input" 
                  value={formData.role} 
                  onChange={e => setFormData({...formData, role: e.target.value})} 
                  required
                  disabled={editId === currentUser.id} // Cannot change own role here
                >
                  <option value="user">Utilisateur (Standard)</option>
                  <option value="admin">Administrateur</option>
                  <option value="super_admin">Super Administrateur</option>
                </select>
                {editId === currentUser.id && <span style={{ fontSize: 10, color: textSecondary, marginTop: 4, display: 'block' }}>Vous ne pouvez pas modifier votre propre rôle.</span>}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
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
