import React from 'react';
import { render } from '@testing-library/react'; 
import MiComponente from './MiComponente';

describe('MiComponente', () => {
  it('renderiza correctamente', () => {
    const { getByText } = render(<MiComponente />);
    expect(getByText('Hola Mundo')).toBeInTheDocument();
  });
});
