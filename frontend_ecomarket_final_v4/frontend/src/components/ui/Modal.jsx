import React, { useEffect } from 'react';

const Modal = ({
  isOpen = false,
  title = '',
  children = null,
  onClose = () => {},
  onConfirm = null,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmLoading = false,
  closeOnBackdrop = true,
}) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={() => closeOnBackdrop && onClose()}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(1px)',
        }}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(720px, 95%)',
          maxHeight: '90vh',
          overflow: 'auto',
          background: '#fff',
          borderRadius: 8,
          padding: 20,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        {title && <header style={{ marginBottom: 12 }}><h3 style={{ margin: 0 }}>{title}</h3></header>}
        <div>{children}</div>
        <footer style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button type="button" onClick={onClose}>{cancelText}</button>
          {typeof onConfirm === 'function' && (
            <button type="button" onClick={onConfirm} disabled={confirmLoading} style={{ minWidth: 100 }}>
              {confirmLoading ? 'Procesando...' : confirmText}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Modal;