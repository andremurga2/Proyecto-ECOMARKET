import React from "react";
import { render, screen } from "@testing-library/react";
import ProductoCard from "./ProductoCard";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  __esModule: true,
  Link: ({ children }) => <span>{children}</span>,
}));

jest.mock("../../contexts/CartContext", () => ({
  useCart: () => ({ addItem: jest.fn() }),
}));

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({ user: { rol: "CLIENTE" } }),
}));

test("muestra producto sin imagen", () => {
  const producto = { id: 1, nombre: "Manzana", precio: 1000 };

  render(<ProductoCard producto={producto} />);

  expect(screen.getByText("Manzana")).toBeInTheDocument();
  expect(screen.getByText(/sin imagen/i)).toBeInTheDocument();
});
