import React, { useEffect, useState } from 'react';

/**
 * Uso:
 * import { showToast } from './Toast';
 * showToast({ message: 'Guardado', type: 'success', duration: 4000 });
 *
 * Coloca <Toast /> en el root de la app (p.ej. en App.jsx).
 */

let toastId = 0;
export const showToast = ({ message = '', type = 'info', duration = 4000 } = {}) => {
  const event = new CustomEvent('app-toast', { detail: { id: ++toastId, message, type, duration } });
  window.dispatchEvent(event);
};

const stylesByType = {
  info: { background: '#2196f3', color: '#fff' },
  success: { background: '#4caf50', color: '#fff' },
  warning: { background: '#ff9800', color: '#000' },
  error: { background: '#f44336', color: '#fff' },
};

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const t = e.detail;
      setToasts((prev) => [...prev, t]);
      if (t.duration && t.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((x) => x.id !== t.id));
        }, t.duration);
      }
    };
    window.addEventListener('app-toast', handler);
    return () => window.removeEventListener('app-toast', handler);
  }, []);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  if (!toasts.length) return null;

  return (
    <div style={{ position: 'fixed', right: 16, top: 16, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          aria-live="polite"
          style={{
            minWidth: 220,
            padding: '10px 14px',
            borderRadius: 6,
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            ...stylesByType[t.type] || stylesByType.info,
          }}
        >
          <div style={{ flex: 1 }}>{t.message}</div>
          <button onClick={() => remove(t.id)} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}>✕</button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
