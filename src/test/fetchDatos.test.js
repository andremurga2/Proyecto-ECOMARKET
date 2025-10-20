import axios from 'axios'; 
jest.mock('axios');

test('fetches datos exitosamente', async () => { 
  const datos = { id: 1, nombre: 'Test' }; 
  axios.get.mockResolvedValue({ data: datos });
  
  const result = await fetchDatos(); 
  expect(result).toEqual(datos);
});
