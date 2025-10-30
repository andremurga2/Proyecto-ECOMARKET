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

  test('muestra imagen estática del producto', () => {
  const product = { nombre: 'Manzana', precio: 2500, imagen: '/images/manzana.jpg' };

  render(
    <CartContext.Provider value={{ addToCart: jest.fn() }}>
      <ProductCard product={product} />
    </CartContext.Provider>
  );

  const imagen = screen.getByAltText('Manzana');
  expect(imagen).toBeInTheDocument();
  expect(imagen.src).toContain('/images/manzana.jpg');
});
});



