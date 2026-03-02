import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Lien vers votre backend Laravel
    axios.get('http://localhost:8000/api/test')
      .then(response => {
        console.log("Réponse reçue :", response.data);
        setMessage(response.data.message);
      })
      .catch(err => {
        console.error("Erreur de connexion :", err);
        setError("Impossible de joindre le backend");
      });
  }, []);

  return (
    <div>
      <h1>Mon Projet Synthesis</h1>
      {message ? <p style={{color: 'green'}}>{message}</p> : <p>Chargement...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default App;