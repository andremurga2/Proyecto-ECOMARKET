import categoriaService from "./categoriaService";
import api from "../api/api";
import endpoints from "../api/endpoints";

jest.mock("../api/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

describe("categoriaService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll() llama GET a endpoints.categorias y retorna data", async () => {
    api.get.mockResolvedValueOnce({
      data: [{ id: 1, nombre: "Frutas" }],
    });

    const res = await categoriaService.getAll();

    expect(api.get).toHaveBeenCalledWith(endpoints.categorias);
    expect(res).toEqual([{ id: 1, nombre: "Frutas" }]);
  });

  test("create(payload) llama POST a endpoints.categoriasAdmin y retorna data", async () => {
    const payload = { nombre: "Verduras" };

    api.post.mockResolvedValueOnce({
      data: { id: 2, ...payload },
    });

    const res = await categoriaService.create(payload);

    expect(api.post).toHaveBeenCalledWith(endpoints.categoriasAdmin, payload);
    expect(res).toEqual({ id: 2, nombre: "Verduras" });
  });

  test("remove(id) llama DELETE a endpoints.categoriaAdmin(id) y retorna data", async () => {
    api.delete.mockResolvedValueOnce({
      data: { ok: true },
    });

    const res = await categoriaService.remove(1);

    expect(api.delete).toHaveBeenCalledWith(endpoints.categoriaAdmin(1));
    expect(res).toEqual({ ok: true });
  });
});
