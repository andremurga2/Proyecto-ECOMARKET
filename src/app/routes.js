import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Contact from '../pages/Contact';
import Payments from '../pages/Payments.jsx';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/pagos" element={<Payments />} />
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/contacto" element={<Contact />} />
    </Routes>
  );
}

export default AppRoutes;
