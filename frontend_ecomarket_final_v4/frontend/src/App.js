import React from 'react';
import AppRoutes from './routes/AppRoutes';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
