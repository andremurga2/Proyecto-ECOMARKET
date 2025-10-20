test('llama a onSubmit cuando se envía el formulario', () => { 
  const onSubmit = jasmine.createSpy('onSubmit');
  const { getByText } = render(<Formulario onSubmit={onSubmit} />);
 
  fireEvent.click(getByText('Enviar')); 
  expect(onSubmit).toHaveBeenCalled();
});
