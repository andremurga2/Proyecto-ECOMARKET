import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

describe('Filters funcionalidad', () => {
  test('cambia la categoría al hacer clic en un botón', () => {
    const setSelectedCategory = jest.fn();
    render(<Filters selectedCategory="Todos" setSelectedCategory={setSelectedCategory} />);

    const boton = screen.getByText('Alimentos');
    fireEvent.click(boton);

    expect(setSelectedCategory).toHaveBeenCalledWith('Alimentos');
  });
});
