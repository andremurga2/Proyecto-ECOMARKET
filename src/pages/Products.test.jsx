import { render, screen } from '@testing-library/react';
import ProductCard from '../components/products/ProductCard';
import { CartContext } from '../context/CartContext';

test('muestra nombre y precio del producto', () => {
  const product = { nombre: 'Manzanas Orgánicas', precio: 2500, imagen: '' };

  render(
    <CartContext.Provider value={{ addToCart: jest.fn() }}>
      <ProductCard product={product} />
    </CartContext.Provider>
  );

  expect(screen.getByText(/Manzanas Orgánicas/i)).toBeInTheDocument();
  expect(screen.getByText(/\$2500/i)).toBeInTheDocument();
});

test('aumenta el contador al hacer clic en Agregar', () => {
  const addToCart = jest.fn();
  const product = { nombre: 'Pan Integral', precio: 1800 };

  render(
    <CartContext.Provider value={{ addToCart }}>
      <ProductCard product={product} />
    </CartContext.Provider>
  );

  const boton = screen.getByRole('button', { name: /agregar/i });
  fireEvent.click(boton);

  expect(addToCart).toHaveBeenCalledTimes(1);
});
