import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';

describe('ProductCard', () => {
  const product = { nombre: 'Manzanas Orgánicas', precio: 2500, imagen: 'https://via.placeholder.com/150' };

  test('muestra nombre y precio', () => {
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
    render(
      <CartContext.Provider value={{ addToCart }}>
        <ProductCard product={product} />
      </CartContext.Provider>
    );

    const boton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(boton);

    expect(addToCart).toHaveBeenCalledTimes(1);
  });
});
