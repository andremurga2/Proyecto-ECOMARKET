import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount(cartCount + 1);

  return (
    <AppContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </AppContext.Provider>
  );
}
