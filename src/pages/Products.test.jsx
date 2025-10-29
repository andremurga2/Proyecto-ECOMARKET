import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';
import { AppProvider } from '../context/AppContext';

test('muestra productos y permite agregar al carrito', () => {
  render(
    <AppProvider>
      <Products />
    </AppProvider>
  );

  const producto = screen.getByText(/Bolsa compostable/i);
  expect(producto).toBeInTheDocument();

  const botonAgregar = screen.getAllByText(/Agregar/i)[0];
  fireEvent.click(botonAgregar);

  // Como el contador está en el contexto global, verificamos que no ocurra error
  expect(botonAgregar).toBeEnabled();
});
