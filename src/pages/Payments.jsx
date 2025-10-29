import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext.js';

const Payments = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  const handlePayment = () => {
    // Aquí podrías integrar tu lógica real de pago (ej: formulario, API, etc.)
    alert('¡Pago realizado con éxito! 🎉');
  };

  return (
    <Container className="mt-4">
      <h2>Resumen de Pago</h2>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
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

          {/* 🔹 Botón de pagar al final 🔹 */}
          <div className="d-flex justify-content-end">
            <Button variant="success" size="lg" onClick={handlePayment}>
              Pagar
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Payments;
