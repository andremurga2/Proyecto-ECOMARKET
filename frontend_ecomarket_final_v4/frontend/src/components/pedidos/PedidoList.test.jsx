import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../../services/pedidoService", () => ({
  listar: jest.fn(),
}));

import PedidoList from "./PedidoList";
import pedidoService from "../../services/pedidoService";

test("renderiza pedidos", async () => {
  pedidoService.listar.mockResolvedValueOnce([{ id: 1 }, { id: 2 }]);

  render(<PedidoList />);

  // ✅ Usa getAllByText para evitar el error de "multiple elements"
  await waitFor(() => {
    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });
});
