import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiEdit2, FiSave, FiX, FiRefreshCw, FiPlus, FiTrash2, FiChevronRight } from "react-icons/fi";
import { getMatches, updateMatch, createMatch, deleteMatch, getTeams } from "../../services/api";
import toast from "react-hot-toast";

const FD = "'Bebas Neue', sans-serif";
const FB = "'DM Sans', sans-serif";

const STAGES = [
  { id: "round_of_32", label: "16es de finale", count: 16 },
  { id: "round_of_16", label: "Huitièmes", count: 8 },
  { id: "quarter", label: "Quarts", count: 4 },
  { id: "semi", label: "Demi-finales", count: 2 },
  { id: "final", label: "Finale", count: 1 },
];

export default function AdminTournament() {
  const { darkMode } = useTheme();
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const bg           = darkMode ? "#0d0d0d"                  : "#ffffff";
  const card         = darkMode ? "#1c1c1c"                  : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const textPrimary  = darkMode ? "#ffffff"                  : "#0d0d0d";
  const textSecondary= darkMode ? "rgba(255,255,255,0.45)"   : "rgba(0,0,0,0.5)";
  const surface      = darkMode ? "#171717"                  : "#f9f9f9";
  const accent       = "#c8102e";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mRes, tRes] = await Promise.all([getMatches(), getTeams()]);
      const allMatches = mRes.data || mRes;
      // Sort matches to keep UI consistent
      setMatches(allMatches.sort((a,b) => a.id - b.id));
      setTeams(tRes.data || tRes);
    } catch (err) {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (m) => {
    setEditingId(m.id);
    setEditData({
      team1_id: m.team1_id || "",
      team2_id: m.team2_id || "",
      home_score: m.home_score || 0,
      away_score: m.away_score || 0,
      status: m.status || "upcoming",
      stage: m.stage
    });
  };

  const handleSave = async (id) => {
    try {
      await updateMatch(id, editData);
      toast.success("Mis à jour");
      setEditingId(null);
      fetchData();
    } catch (err) {
      toast.error("Erreur sauvegarde");
    }
  };

  const handleCreate = async (stageId) => {
    try {
      const payload = {
        stage: stageId,
        team1_id: null,
        team2_id: null,
        status: "upcoming",
        match_date: "2026-06-01",
        match_time: "20:00",
        venue: "TBD",
        city: "TBD"
      };
      await createMatch(payload);
      toast.success("Match ajouté");
      fetchData();
    } catch (err) {
      toast.error("Erreur création");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce match ?")) return;
    try {
      await deleteMatch(id);
      fetchData();
    } catch (err) {
      toast.error("Erreur suppression");
    }
  };

  return (
    <>
      <style>{`
        .admin-page { background: ${bg}; min-height: 100vh; padding: 60px 20px; color: ${textPrimary}; }
        .admin-inner { max-width: 1100px; margin: 0 auto; }
        
        .header-section { margin-bottom: 60px; border-bottom: 1px solid ${border}; padding-bottom: 30px; }
        .title { font-family: ${FD}; font-size: 52px; margin: 0; letter-spacing: -0.01em; }
        .subtitle { font-family: ${FB}; color: ${textSecondary}; margin-top: 10px; font-size: 15px; }

        .stage-card { background: ${card}; border: 1px solid ${border}; border-radius: 20px; margin-bottom: 40px; overflow: hidden; }
        .stage-header { padding: 24px 32px; border-bottom: 1px solid ${border}; display: flex; justify-content: space-between; align-items: center; }
        .stage-label { font-family: ${FD}; font-size: 24px; color: ${textPrimary}; text-transform: uppercase; }
        
        .match-row { 
          display: grid; grid-template-columns: 1fr auto; 
          padding: 20px 32px; border-bottom: 1px solid ${border};
          align-items: center; transition: background 0.2s;
        }
        .match-row:last-child { border-bottom: none; }
        .match-row:hover { background: ${surface}; }

        .team-display { display: flex; align-items: center; gap: 40px; flex: 1; }
        .team-block { display: flex; align-items: center; gap: 15px; min-width: 200px; }
        .team-name { font-family: ${FB}; font-weight: 700; font-size: 16px; }
        .score-box { 
          width: 40px; height: 40px; background: ${surface}; 
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-family: ${FD}; font-size: 20px; font-weight: 900;
        }

        .vs { font-family: ${FD}; color: ${textSecondary}; font-size: 12px; margin: 0 20px; }

        .edit-panel { background: ${surface}; padding: 32px; border-bottom: 1px solid ${border}; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; align-items: flex-end; }
        
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-label { font-size: 11px; font-weight: 800; color: ${textSecondary}; text-transform: uppercase; letter-spacing: 0.1em; }
        
        .admin-input {
          height: 50px; 
          padding: 0 15px; 
          border-radius: 12px;
          background: ${surface}; 
          border: 1px solid ${border};
          color: ${textPrimary}; 
          font-family: ${FB}; 
          font-size: 14px; 
          width: 100%; 
          box-sizing: border-box; 
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(textSecondary)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          background-size: 16px;
        }
        .admin-input:focus { border-color: ${textPrimary}; }
        
        select.admin-input option {
          background: ${card};
          color: ${textPrimary};
          padding: 10px;
        }
        .btn {
          height: 48px; padding: 0 24px; border-radius: 12px; border: none;
          font-family: ${FD}; font-size: 13px; font-weight: 800; 
          cursor: pointer; text-transform: uppercase; letter-spacing: 0.1em;
          display: flex; align-items: center; gap: 10px; transition: 0.2s;
        }
        .btn-primary { background: ${textPrimary}; color: ${bg}; }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-outline { background: transparent; border: 1px solid ${border}; color: ${textPrimary}; }
        .btn-outline:hover { background: ${border}; }
        .btn-danger { color: #ff4d4f; background: transparent; padding: 0 10px; }
        
        .empty-state { padding: 40px; text-align: center; color: ${textSecondary}; font-family: ${FB}; }
      `}</style>

      <div className="admin-page">
        <div className="admin-inner">
          <div className="header-section">
            <h1 className="title">Gestion du Tableau</h1>
            <p className="subtitle">Mise à jour rapide des équipes et résultats du tournoi final.</p>
          </div>

          {loading ? (
             <div style={{ textAlign: "center", padding: 100 }}><FiRefreshCw className="spin" size={32} /></div>
          ) : (
            STAGES.map(stage => {
              const stageMatches = matches.filter(m => m.stage === stage.id);
              return (
                <div key={stage.id} className="stage-card">
                  <div className="stage-header">
                    <span className="stage-label">{stage.label}</span>
                    <button className="btn btn-outline" style={{ height: 36, padding: "0 15px", fontSize: 11 }} onClick={() => handleCreate(stage.id)}>
                      <FiPlus /> Ajouter un match
                    </button>
                  </div>
                  
                  <div className="matches-list">
                    {stageMatches.length === 0 && <div className="empty-state">Aucun match dans cette catégorie.</div>}
                    {stageMatches.map((m, i) => (
                      <div key={m.id}>
                        {editingId === m.id ? (
                          <div className="edit-panel">
                            <div className="form-grid">
                              <div className="input-group">
                                <span className="input-label">Équipe domicile</span>
                                <select className="admin-input" value={editData.team1_id} onChange={e => setEditData({...editData, team1_id: e.target.value})}>
                                  <option value="">TBD</option>
                                  {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                                <input type="number" className="admin-input" placeholder="Score" value={editData.home_score} onChange={e => setEditData({...editData, home_score: e.target.value})} />
                              </div>
                              <div className="input-group">
                                <span className="input-label">Équipe extérieur</span>
                                <select className="admin-input" value={editData.team2_id} onChange={e => setEditData({...editData, team2_id: e.target.value})}>
                                  <option value="">TBD</option>
                                  {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                                <input type="number" className="admin-input" placeholder="Score" value={editData.away_score} onChange={e => setEditData({...editData, away_score: e.target.value})} />
                              </div>
                              <div className="input-group">
                                <span className="input-label">Statut</span>
                                <select className="admin-input" value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})}>
                                  <option value="upcoming">À venir</option>
                                  <option value="live">En direct</option>
                                  <option value="finished">Terminé</option>
                                </select>
                                <div style={{ display: "flex", gap: 10 }}>
                                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => handleSave(m.id)}><FiSave /> Sauver</button>
                                  <button className="btn btn-outline" onClick={() => setEditingId(null)}><FiX /></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="match-row">
                            <div className="team-display">
                              <div className="team-block">
                                <div className="score-box" style={{ opacity: m.status==='upcoming'?0.3:1 }}>{m.home_score ?? 0}</div>
                                <span className="team-name">{m.team1?.name || "TBD"}</span>
                              </div>
                              <span className="vs">VS</span>
                              <div className="team-block">
                                <span className="team-name" style={{ textAlign: "right", flex: 1 }}>{m.team2?.name || "TBD"}</span>
                                <div className="score-box" style={{ opacity: m.status==='upcoming'?0.3:1 }}>{m.away_score ?? 0}</div>
                              </div>
                              <div style={{ marginLeft: 40, display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.status==='live'?'#ff4d4f':m.status==='finished'?textSecondary:'#52c41a' }} />
                                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: textSecondary }}>{m.status}</span>
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: 10 }}>
                              <button className="btn btn-outline" style={{ height: 40, width: 40, padding: 0, justifyContent: "center" }} onClick={() => handleEdit(m)}><FiEdit2 /></button>
                              <button className="btn-danger" onClick={() => handleDelete(m.id)}><FiTrash2 /></button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 2s linear infinite; }
      `}</style>
    </>
  );
}
