import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../../services/productoService", () => ({
  getAll: jest.fn(),
}));

import ProductoList from "./ProductoList";
import productoService from "../../services/productoService";

jest.mock("./ProductoCard", () => ({ producto }) => (
  <div data-testid="producto-card">{producto.nombre}</div>
));

test("muestra productos obtenidos del servicio", async () => {
  productoService.getAll.mockResolvedValueOnce([
    { id: 1, nombre: "Manzana" },
    { id: 2, nombre: "Pera" },
  ]);

  render(<ProductoList />);

  await waitFor(() => {
    expect(screen.getByText("Manzana")).toBeInTheDocument();
    expect(screen.getByText("Pera")).toBeInTheDocument();
  });

  expect(screen.getAllByTestId("producto-card")).toHaveLength(2);
});
