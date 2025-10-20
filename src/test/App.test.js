import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renderiza la app principal con el botón', () => {
  render(<App />);
  expect(screen.getByText('Clic aquí')).toBeInTheDocument();
});

test('incluye el componente Navbar', () => {
  render(<App />);
  expect(screen.getByText('Mi Tienda')).toBeInTheDocument();
});
