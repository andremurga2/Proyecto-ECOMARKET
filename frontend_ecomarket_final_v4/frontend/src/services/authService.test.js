import authService from "./authService";
import api from "../api/api";
import endpoints from "../api/endpoints";

jest.mock("../api/api", () => ({
  post: jest.fn(),
}));

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("login(credentials) llama POST a auth/login, guarda token y user, y retorna data", async () => {
    const credentials = {
      email: "admin@ecomarket.cl",
      password: "123456",
    };

    const mockResponse = {
      token: "jwt-token-123",
      user: { id: 1, rol: "ADMIN", email: "admin@ecomarket.cl" },
    };

    api.post.mockResolvedValueOnce({
      data: mockResponse,
    });

    const res = await authService.login(credentials);

    // ✔ llamada correcta al endpoint real
    expect(api.post).toHaveBeenCalledWith(
      endpoints.auth.login,
      credentials
    );

    // ✔ guarda datos en localStorage
    expect(localStorage.getItem("token")).toBe("jwt-token-123");
    expect(JSON.parse(localStorage.getItem("user"))).toEqual(
      mockResponse.user
    );

    // ✔ retorna data
    expect(res).toEqual(mockResponse);
  });

  test("register(payload) llama POST a auth/register y guarda token y user", async () => {
    const payload = {
      nombre: "Ana",
      email: "ana@ecomarket.cl",
      password: "123456",
    };

    const mockResponse = {
      token: "jwt-token-999",
      user: { id: 99, rol: "CLIENTE", email: "ana@ecomarket.cl" },
    };

    api.post.mockResolvedValueOnce({
      data: mockResponse,
    });

    const res = await authService.register(payload);

    expect(api.post).toHaveBeenCalledWith(
      endpoints.auth.register,
      payload
    );

    expect(localStorage.getItem("token")).toBe("jwt-token-999");
    expect(JSON.parse(localStorage.getItem("user"))).toEqual(
      mockResponse.user
    );

    expect(res).toEqual(mockResponse);
  });

  test("logout() elimina token y user del localStorage", () => {
    localStorage.setItem("token", "abc");
    localStorage.setItem("user", "{}");

    authService.logout();

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
