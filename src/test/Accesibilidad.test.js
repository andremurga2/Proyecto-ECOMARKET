import { axe } from 'jest-axe';

test('no tiene violaciones de accesibilidad', async () => { 
  const { container } = render(<MiComponente />); 
  const results = await axe(container); 
  expect(results).toHaveNoViolations();
});
