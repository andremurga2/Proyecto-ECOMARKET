import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
