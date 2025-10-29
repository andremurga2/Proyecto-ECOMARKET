import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const addToCart = (qty = 1) => setCount(prev => prev + qty);
  const clearCart = () => setCount(0);

  return (
    <CartContext.Provider value={{ count, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
