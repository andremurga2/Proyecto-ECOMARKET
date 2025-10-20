import { render, fireEvent } from '@testing-library/react';

test('incrementa el contador cuando se hace clic', () => { 
  const { getByText } = render(<Contador />);
  const boton = getByText('Incrementar');
  fireEvent.click(boton);
  expect(getByText('Contador: 1')).toBeInTheDocument();
});
