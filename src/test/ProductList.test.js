import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '../components/ProductList';

const sampleProducts = [
  { id: 1, name: 'Manzana', description: 'Manzana orgánica', price: 500, image: '' },
  { id: 2, name: 'Pan', description: 'Pan integral', price: 1200, image: '' },
];

test('muestra el título de la lista de productos', () => {
  render(<ProductList products={sampleProducts} />);
  expect(screen.getByText('Lista de Productos')).toBeInTheDocument();
});

test('renderiza los productos pasados por props', () => {
  render(<ProductList products={sampleProducts} />);
  expect(screen.getByText('Manzana')).toBeInTheDocument();
  expect(screen.getByText('Pan')).toBeInTheDocument();
});
