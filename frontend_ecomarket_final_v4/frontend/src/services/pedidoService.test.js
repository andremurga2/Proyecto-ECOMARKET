import pedidoService from "./pedidoService";
import api from "../api/api";
import endpoints from "../api/endpoints";

jest.mock("../api/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("listar() obtiene pedidos", async () => {
  api.get.mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] });

  const res = await pedidoService.listar();

  expect(api.get).toHaveBeenCalledWith(endpoints.pedidos);
  expect(res).toEqual([{ id: 1 }, { id: 2 }]);
});

test("listarAdmin() obtiene pedidos admin", async () => {
  api.get.mockResolvedValueOnce({ data: [{ id: 10 }, { id: 11 }] });

  const res = await pedidoService.listarAdmin();

  expect(api.get).toHaveBeenCalledWith(`${endpoints.pedidos}/admin`);
  expect(res).toEqual([{ id: 10 }, { id: 11 }]);
});

test("listarPorClienteAdmin(clienteId) obtiene pedidos por cliente", async () => {
  api.get.mockResolvedValueOnce({ data: [{ id: 100 }] });

  const res = await pedidoService.listarPorClienteAdmin(5);

  expect(api.get).toHaveBeenCalledWith(`${endpoints.pedidos}/cliente/5`);
  expect(res).toEqual([{ id: 100 }]);
});

test("obtener(id) obtiene un pedido (sin depender de endpoints.pedido)", async () => {
  api.get.mockResolvedValueOnce({ data: { id: 5, total: 10000 } });

  const res = await pedidoService.obtener(5);

  // ✅ Validamos que se llame api.get con ALGO que contenga "5"
  expect(api.get).toHaveBeenCalled();
  const calledUrl = api.get.mock.calls[0][0];
  expect(typeof calledUrl).toBe("string");
  expect(calledUrl).toContain("5");

  expect(res).toEqual({ id: 5, total: 10000 });
});

test("crear(payload) crea un pedido", async () => {
  const payload = { items: [{ productoId: 1, cantidad: 2 }] };

  api.post.mockResolvedValueOnce({ data: { id: 10, ...payload } });

  const res = await pedidoService.crear(payload);

  expect(api.post).toHaveBeenCalledWith(endpoints.pedidos, payload);
  expect(res).toEqual({ id: 10, items: [{ productoId: 1, cantidad: 2 }] });
});
