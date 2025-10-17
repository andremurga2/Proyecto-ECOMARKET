import React from 'react';

const OrderSummary = ({ items = [] }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div>
      <h4>Resumen del Pedido</h4>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
    </div>
  );
};

export default OrderSummary;
