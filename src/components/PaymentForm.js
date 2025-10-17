import React, { useState } from 'react';

const PaymentForm = () => {
  const [method, setMethod] = useState('tarjeta');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pago realizado con:', method);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pago</h2>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="tarjeta">Tarjeta</option>
        <option value="transferencia">Transferencia</option>
        <option value="efectivo">Efectivo</option>
      </select>
      <button type="submit">Pagar</button>
    </form>
  );
};

export default PaymentForm;
