import { render, screen } from '@testing-library/react';
import Payments from './Payments';
import { CartContext } from '../context/CartContext';
import '@testing-library/jest-dom';

test('muestra el total correcto de los productos', () => {
  const cartItems = [
    { nombre: 'Manzanas', categoria: 'Alimentos', precio: 2000 },
    { nombre: 'Pan', categoria: 'Panadería', precio: 1500 }
  ];

  const totalPrice = 3500;

  render(
    <CartContext.Provider value={{ cartItems, totalPrice }}>
      <Payments />
    </CartContext.Provider>
  );

  expect(screen.getByText(/\$3500/i)).toBeInTheDocument();
});
