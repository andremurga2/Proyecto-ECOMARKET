import productoService from "./productoService";
import api from "../api/api";
import endpoints from "../api/endpoints";

jest.mock("../api/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("productoService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll() llama GET a endpoints.productos y retorna data", async () => {
    api.get.mockResolvedValueOnce({
      data: [{ id: 1, nombre: "Manzana" }],
    });

    const res = await productoService.getAll();

    expect(api.get).toHaveBeenCalledWith(endpoints.productos);
    expect(res).toEqual([{ id: 1, nombre: "Manzana" }]);
  });

  test("getById(id) llama GET a endpoints.producto(id) y retorna data", async () => {
    api.get.mockResolvedValueOnce({
      data: { id: 5, nombre: "Pera" },
    });

    const res = await productoService.getById(5);

    expect(api.get).toHaveBeenCalledWith(endpoints.producto(5));
    expect(res).toEqual({ id: 5, nombre: "Pera" });
  });

  test("getByCategoria(categoriaId) llama GET a endpoints.productosCategoria(categoriaId) y retorna data", async () => {
    api.get.mockResolvedValueOnce({
      data: [{ id: 2, nombre: "Manzana" }],
    });

    const res = await productoService.getByCategoria(3);

    expect(api.get).toHaveBeenCalledWith(endpoints.productosCategoria(3));
    expect(res).toEqual([{ id: 2, nombre: "Manzana" }]);
  });

  test("create(payload) llama POST a endpoints.productosAdmin y retorna data", async () => {
    const payload = { nombre: "Kiwi", precio: 1200 };

    api.post.mockResolvedValueOnce({
      data: { id: 9, ...payload },
    });

    const res = await productoService.create(payload);

    expect(api.post).toHaveBeenCalledWith(endpoints.productosAdmin, payload);
    expect(res).toEqual({ id: 9, nombre: "Kiwi", precio: 1200 });
  });

  test("update(id, payload) llama PUT a endpoints.productoAdmin(id) y retorna data", async () => {
    const payload = { nombre: "Kiwi Premium", precio: 1500 };

    api.put.mockResolvedValueOnce({
      data: { id: 9, ...payload },
    });

    const res = await productoService.update(9, payload);

    expect(api.put).toHaveBeenCalledWith(endpoints.productoAdmin(9), payload);
    expect(res).toEqual({ id: 9, nombre: "Kiwi Premium", precio: 1500 });
  });

  test("remove(id) llama DELETE a endpoints.productoAdmin(id) y retorna data", async () => {
    api.delete.mockResolvedValueOnce({
      data: { ok: true },
    });

    const res = await productoService.remove(9);

    expect(api.delete).toHaveBeenCalledWith(endpoints.productoAdmin(9));
    expect(res).toEqual({ ok: true });
  });
});
