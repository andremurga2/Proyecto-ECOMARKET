import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza la app y muestra el header EcoMarket", () => {
  render(<App />);
  expect(screen.getByText(/ecomarket/i)).toBeInTheDocument();
});
