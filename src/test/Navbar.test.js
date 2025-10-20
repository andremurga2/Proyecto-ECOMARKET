import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../components/Navbar';

test('renderiza el nombre de la tienda', () => {
  render(<Navigation />);
  expect(screen.getByText('EcoMarket')).toBeInTheDocument();
});

test('contiene enlace a Productos', () => {
  render(<Navigation />);
  expect(screen.getByText('Productos')).toBeInTheDocument();
});
