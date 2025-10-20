describe('ServicioAPI', () => { 
  let servicioAPI;

  beforeEach(() => {
    servicioAPI = jasmine.createSpyObj('ServicioAPI', ['getData']); 
    servicioAPI.getData.and.returnValue(Promise.resolve({ data: 'test' }));
  });

  it('debería llamar a getData', async () => { 
    await servicioAPI.getData();
    expect(servicioAPI.getData).toHaveBeenCalled();
  });
});
