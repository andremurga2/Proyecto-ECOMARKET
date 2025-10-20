test('maneja errores de API correctamente', async () => { 
  axios.get.mockRejectedValue(new Error('API Error')); 
  await expect(fetchDatos()).rejects.toThrow('API Error');
});
