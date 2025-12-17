import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main style={{ padding: 24, textAlign: 'center' }}>
    <h1>404 — Página no encontrada</h1>
    <p>La página que buscas no existe.</p>
    <Link to="/">Ir al inicio</Link>
  </main>
);  
export default NotFound;