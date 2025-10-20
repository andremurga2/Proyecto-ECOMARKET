import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from '../components/RegistrationForm';

test('renderiza el formulario de registro', () => {
  render(<RegistrationForm />);
  expect(screen.getByText('Registro de Usuario')).toBeInTheDocument();
});

test('permite escribir en los campos', () => {
  render(<RegistrationForm />);
  const nameInput = screen.getByPlaceholderText('Nombre');
  const emailInput = screen.getByPlaceholderText('Email');
  fireEvent.change(nameInput, { target: { value: 'Juan' } });
  fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });
  expect(nameInput.value).toBe('Juan');
  expect(emailInput.value).toBe('juan@test.com');
});
