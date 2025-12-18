import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductoForm from "./ProductoForm";
import productoService from "../../services/productoService";
import categoriaService from "../../services/categoriaService";

// Mock de servicios
jest.mock("../../services/productoService", () => ({
  create: jest.fn(),
}));

jest.mock("../../services/categoriaService", () => ({
  getAll: jest.fn(),
}));

// Mock router (ProductoForm usa useNavigate / useParams)
jest.mock("react-router-dom", () => ({
  __esModule: true,
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
}));

describe("ProductoForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    categoriaService.getAll.mockResolvedValueOnce([{ id: 1, nombre: "Frutas" }]);
  });

  test("envía el formulario y llama a productoService.create", async () => {
    productoService.create.mockResolvedValueOnce({ id: 1 });

    const { container } = render(<ProductoForm />);

    // Espera a que carguen las categorías (evita warnings act y asegura select listo)
    await waitFor(() => {
      expect(categoriaService.getAll).toHaveBeenCalled();
    });

    // ✅ Buscar inputs por atributo name (porque labels no tienen htmlFor)
    const nombreInput = container.querySelector('input[name="nombre"]');
    const precioInput = container.querySelector('input[name="precio"]');
    const stockInput = container.querySelector('input[name="stock"]');
    const categoriaSelect = container.querySelector('select[name="categoriaId"]');

    expect(nombreInput).toBeTruthy();
    expect(precioInput).toBeTruthy();
    expect(stockInput).toBeTruthy();
    expect(categoriaSelect).toBeTruthy();

    const submitBtn = screen.getByRole("button", { name: /guardar/i });

    await userEvent.type(nombreInput, "Manzana");
    await userEvent.type(precioInput, "1000");
    await userEvent.type(stockInput, "10");

    // ✅ Seleccionar categoría (value "1")
    await userEvent.selectOptions(categoriaSelect, "1");

    await userEvent.click(submitBtn);

    // Espera async (por si el submit tiene awaits)
    await waitFor(() => {
      expect(productoService.create).toHaveBeenCalled();
    });

    // Verifica payload (puede venir como string o number según tu implementación)
    const payload = productoService.create.mock.calls[0][0];

    expect(payload).toEqual(
      expect.objectContaining({
        nombre: "Manzana",
        precio: 1000,
        stock: 10,
      })
    );

    // categoriaId puede venir "1" o 1, aceptamos ambos
    expect(String(payload.categoriaId)).toBe("1");
  });
});
