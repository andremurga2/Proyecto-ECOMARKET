import React from 'react';

const Spinner = ({ size = 36, text = 'Cargando...' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16 }}>
    <div
      style={{
        width: size,
        height: size,
        border: `${Math.max(3, Math.round(size / 10))}px solid #ccc`,
        borderTopColor: '#1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
    <div style={{ marginTop: 8, color: '#555' }}>{text}</div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Spinner;