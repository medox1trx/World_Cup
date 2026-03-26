import React, { useState, useEffect } from 'react';
import { getGroupDetails, getGroups } from '../api/api';
import './GroupModal.css';

const GroupModal = ({ groupId, showAll, onClose }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const todayStr = new Date().toLocaleDateString("fr-FR");

    useEffect(() => {
        setLoading(true);
        if (showAll) {
            getGroups()
                .then(response => {
                    setGroups(response.data.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Impossible de charger les groupes.");
                    setLoading(false);
                });
        } else if (groupId) {
            getGroupDetails(groupId)
                .then(response => {
                    setGroups([response.data.data]);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Impossible de charger les détails du groupe.");
                    setLoading(false);
                });
        }
    }, [groupId, showAll]);

    if (!groupId && !showAll) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container animate-fade-in" onClick={e => e.stopPropagation()}>
                <header className="modal-header">
                    <div className="header-left">
                        <div className="fifa-logo">🏆</div>
                        <div className="header-titles">
                            <h2>Coupe du Monde de la FIFA 2026™</h2>
                            <span>Dernière mise à jour {todayStr}</span>
                        </div>
                    </div>
                    <button className="close-x-btn" onClick={onClose}>&times;</button>
                </header>

                <div className="modal-body custom-scrollbar">
                    {loading && (
                        <div className="modal-loader">
                            <div className="spinner"></div>
                            <p>Chargement des classements...</p>
                        </div>
                    )}

                    {error && (
                        <div className="modal-error-box">
                            <p>{error}</p>
                            <button onClick={onClose}>Fermer</button>
                        </div>
                    )}

                    {!loading && !error && groups.map(group => (
                        <div key={group.id} className="group-standing-section">
                            <div className="group-header-row">
                                <h3 className="group-name-title">{group.name}</h3>
                                <div className="standing-headers">
                                    <span className="col-h h-j">J</span>
                                    <span className="col-h h-g">G</span>
                                    <span className="col-h h-n">N</span>
                                    <span className="col-h h-p">P</span>
                                    <span className="col-h h-bp">Bp</span>
                                    <span className="col-h h-bc">Bc</span>
                                    <span className="col-h h-dif">Dif.</span>
                                    <span className="col-h h-pts">Pts</span>
                                    <span className="col-h h-forme">FORME</span>
                                </div>
                            </div>
                            <div className="teams-rows">
                                {group.teams.map((team, index) => (
                                    <div key={team.id} className="team-standing-row">
                                        <div className="team-identity">
                                            <span className="rank">{index + 1}</span>
                                            {team.iso ? (
                                                <img 
                                                    src={`https://flagcdn.com/w40/${team.iso.toLowerCase()}.png`} 
                                                    alt={team.name} 
                                                    className="standing-flag"
                                                />
                                            ) : (
                                                <span className="standing-flag-placeholder">🏳️</span>
                                            )}
                                            <span className="standing-team-name">{team.name}</span>
                                        </div>
                                        <div className="standing-data">
                                            <span className="val v-j">0</span>
                                            <span className="val v-g">0</span>
                                            <span className="val v-n">0</span>
                                            <span className="val v-p">0</span>
                                            <span className="val v-bp">0</span>
                                            <span className="val v-bc">0</span>
                                            <span className="val v-dif">0</span>
                                            <span className="val v-pts bold">0</span>
                                            <span className="val v-forme">- - - - -</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroupModal;

