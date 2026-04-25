import React, { useState, useEffect } from 'react';
import { FiUpload, FiLink, FiX, FiCheck } from 'react-icons/fi';
import { getImageUrl } from '../services/api';

const ImageUpload = ({ defaultValue, onChange, label, folder = 'teams', darkMode = false }) => {
  const [mode, setMode] = useState('url'); // 'url' or 'upload'
  const [url, setUrl] = useState(defaultValue || '');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(defaultValue || '');

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
      // Always start in URL mode when editing an existing value.
      // The parent form state already tracks this as { type:'url', value }.
      // The user can switch to 'upload' mode manually if they want to replace
      // the image with a new file from their computer.
      setMode('url');
      setUrl(defaultValue);
    } else {
      setPreview('');
      setUrl('');
      setMode('url');
    }
  }, [defaultValue]);

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    if (newMode === 'url') {
      setFile(null);
      setPreview(url);
      onChange({ type: 'url', value: url });
    } else {
      setUrl('');
      setPreview(file ? preview : '');
      onChange({ type: 'file', value: file });
    }
  };

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    setPreview(val);
    setFile(null);
    onChange({ type: 'url', value: val });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("Image trop grande (max 2MB)");
        return;
      }
      setFile(selectedFile);
      setUrl('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setMode('upload');
      onChange({ type: 'file', value: selectedFile });
    }
  };

  const clear = () => {
    setFile(null);
    setUrl('');
    setPreview('');
    onChange({ type: 'url', value: '' });
  };

  const theme = {
    surface: darkMode ? "#171717" : "#f5f5f5",
    border: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    text: darkMode ? "#ffffff" : "#0d0d0d",
    textMuted: darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    accent: "#c8102e"
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <label style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 700, 
          color: theme.textMuted, 
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {label}
        </label>
      )}

      <div style={{ 
        display: 'flex', 
        gap: 2, 
        background: theme.surface, 
        padding: 4, 
        borderRadius: 12, 
        marginBottom: 12,
        border: `1px solid ${theme.border}`
      }}>
        <button
          type="button"
          onClick={() => handleModeSwitch('upload')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: 8,
            border: 'none',
            background: mode === 'upload' ? theme.accent : 'transparent',
            color: mode === 'upload' ? 'white' : theme.textMuted,
            fontSize: 11,
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: '0.2s'
          }}
        >
          <FiUpload size={14} /> TÉLÉVERSER
        </button>
        <button
          type="button"
          onClick={() => handleModeSwitch('url')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: 8,
            border: 'none',
            background: mode === 'url' ? theme.accent : 'transparent',
            color: mode === 'url' ? 'white' : theme.textMuted,
            fontSize: 11,
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: '0.2s'
          }}
        >
          <FiLink size={14} /> LIEN URL
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ 
          width: 80, 
          height: 80, 
          borderRadius: 16, 
          background: theme.surface, 
          border: `2px dashed ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative'
        }}>
          {preview ? (
            <img 
              src={preview.startsWith('data:') ? preview : getImageUrl(preview)} 
              alt="Preview" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23ccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23777'%3EImage Invalide%3C/text%3E%3C/svg%3E";
              }}
            />
          ) : (
            <FiUpload size={24} color={theme.textMuted} />
          )}
          {preview && (
            <button 
              type="button"
              onClick={clear}
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <FiX size={12} />
            </button>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {mode === 'url' ? (
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={url}
              onChange={handleUrlChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                color: theme.text,
                fontSize: 13,
                outline: 'none'
              }}
            />
          ) : (
            <div style={{ position: 'relative' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  zIndex: 2
                }}
              />
              <div style={{
                padding: '12px 16px',
                borderRadius: 12,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                color: file ? theme.text : theme.textMuted,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file ? file.name : "Choisir un fichier..."}
                </span>
                {file && <FiCheck color="#16a34a" />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
