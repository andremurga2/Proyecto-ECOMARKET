import React from 'react';

const Footer = () => (
  <footer style={{ padding: 16, borderTop: '1px solid #eee', marginTop: 24, textAlign: 'center' }}>
    <small>© {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</small>
  </footer>
);

export default Footer;