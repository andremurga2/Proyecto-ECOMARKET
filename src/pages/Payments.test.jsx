import { render, screen } from '@testing-library/react';
import { CartContext } from '../context/CartContext';
import Payments from './Payments';

describe('Payments', () => {
  test('muestra mensaje si el carrito está vacío', () => {
    render(
      <CartContext.Provider value={{ cartItems: [], totalPrice: 0 }}>
        <Payments />
      </CartContext.Provider>
    );

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  test('muestra productos y total correctamente', () => {
    const items = [
      { nombre: 'Pan Integral', categoria: 'Alimentos', precio: 1800 },
      { nombre: 'Leche de Avena', categoria: 'Bebidas', precio: 2200 }
    ];

    render(
      <CartContext.Provider value={{ cartItems: items, totalPrice: 4000 }}>
        <Payments />
      </CartContext.Provider>
    );

    expect(screen.getByText(/Pan Integral/i)).toBeInTheDocument();
    expect(screen.getByText(/Leche de Avena/i)).toBeInTheDocument();
    expect(screen.getByText(/\$4000/i)).toBeInTheDocument();
  });

});

