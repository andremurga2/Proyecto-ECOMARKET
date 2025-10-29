import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartCount((prevCount) => prevCount + 1);
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.precio, 0);

  return (
    <CartContext.Provider value={{ cartCount, addToCart, cartItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
