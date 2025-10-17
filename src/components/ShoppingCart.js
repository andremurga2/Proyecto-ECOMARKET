import React from 'react';
import OrderSummary from './OrderSummary.js';

const ShoppingCart = ({ cartItems = [] }) => {
  return (
    <div>
      <h2>Carrito de Compras</h2>
      <OrderSummary items={cartItems} />
    </div>
  );
};

export default ShoppingCart;
