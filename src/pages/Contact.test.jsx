import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from './Contact';

test('muestra errores si los campos están vacíos', async () => {
  render(<Contact />);

  const boton = screen.getByText(/enviar/i);
  fireEvent.click(boton);

  expect(await screen.findAllByText(/obligatorio/i)).toHaveLength(2);
});
