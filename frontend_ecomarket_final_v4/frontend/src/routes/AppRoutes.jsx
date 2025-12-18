import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Productos from "../pages/Productos";
import ProductoPage from "../pages/ProductoPage";
import ProductoForm from "../components/productos/ProductoForm";
import CategoriasAdmin from "../pages/CategoriasAdmin";
import Checkout from "../pages/Checkout";
import Pedidos from "../pages/Pedidos";
import Pago from "../pages/Pago";
import NotFound from "../pages/NotFound";
import CategoriaForm from "../components/categorias/CategoriaForm";
import PagoForm from "../components/pagos/PagoForm";
import PagoDetail from "../components/pagos/PagoDetail";
function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main style={{ minHeight: "70vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<ProductoPage />} />
              {/* ADMIN: PRODUCTOS */}
              <Route
                path="/productos/nuevo"
                element={
                  <ProtectedRoute requiredRoles={["ADMIN"]}>
                    <ProductoForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/productos/editar/:id"
                element={
                  <ProtectedRoute requiredRoles={["ADMIN"]}>
                    <ProductoForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute requiredRoles={["CLIENTE"]}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pedidos"
                element={
                  <ProtectedRoute>
                    <Pedidos />
                  </ProtectedRoute>
                }
              />
              {/* ADMIN: CATEGORÍAS */}
              <Route
                path="/categorias"
                element={
                  <ProtectedRoute requiredRoles={["ADMIN"]}>
                    <CategoriasAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categorias/nuevo"
                element={
                  <ProtectedRoute requiredRoles={["ADMIN"]}>
                    <CategoriaForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categorias/editar/:id"
                element={
                  <ProtectedRoute requiredRoles={["ADMIN"]}>
                    <CategoriaForm />
                  </ProtectedRoute>
                }
              />
              {/* ADMIN: PAGOS */}
              <Route
                path="/pago"
                element={
                  <ProtectedRoute requiredRoles={["ADMIN"]}>
                    <Pago />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pago/nuevo"
                element={
                  <ProtectedRoute requiredRoles={["ADMIN"]}>
                    <PagoForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pago/:id"
                element={
                  <ProtectedRoute requiredRoles={["ADMIN"]}>
                    <PagoDetail />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
