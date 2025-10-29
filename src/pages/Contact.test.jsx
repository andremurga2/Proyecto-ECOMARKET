import { render, screen, fireEvent } from '@testing-library/react';
import Contact from './Contact';
import '@testing-library/jest-dom';

test('muestra errores al enviar formulario vacío', async () => {
  render(<Contact />);

  const boton = screen.getByRole('button', { name: /enviar/i });
  fireEvent.click(boton);

  expect(await screen.findByText(/El nombre es obligatorio/i)).toBeInTheDocument();
  expect(await screen.findByText(/Ingresa un correo válido/i)).toBeInTheDocument();
  expect(await screen.findByText(/El mensaje no puede estar vacío/i)).toBeInTheDocument();
});

test('muestra mensaje de éxito al enviar formulario válido', async () => {
  render(<Contact />);

  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'ana@mail.com' } });
  fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Consulta sobre productos' } });

  fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

  expect(await screen.findByText(/Mensaje enviado correctamente/i)).toBeInTheDocument();
});
