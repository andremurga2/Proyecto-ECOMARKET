import React, { useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import { CartContext } from '../context/CartContext.js';

const Payments = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <Container className="mt-4">
      <h2>Resumen de Pago</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>${item.precio}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2"><strong>Total</strong></td>
              <td><strong>${totalPrice}</strong></td>
            </tr>
          </tfoot>
        </Table>
      )}
    </Container>
  );
};

export default Payments;
