import { render } from '@testing-library/react'; 
import { performance } from 'perf_hooks';

test('renderiza rápidamente', () => { 
  const start = performance.now(); 
  render(<ComponentePesado />); 
  const end = performance.now();
  expect(end - start).toBeLessThan(100); // menos de 100ms
});
