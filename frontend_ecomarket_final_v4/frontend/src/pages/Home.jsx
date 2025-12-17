import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProductoList from "../components/productos/ProductoList";

const Home = () => {
  const { user } = useAuth();

  return (
    <main
      style={{
        padding: 16,
        backgroundColor: "#d4edda",
        minHeight: "100vh",
      }}
    >
      {/* Header con bienvenida */}
      <header style={{ marginBottom: 24, textAlign: "center" }}>
        <h1>Bienvenido a Mi Tienda</h1>
        <p>Explora los productos y realiza tus pedidos.</p>

        {user ? (
          <div>Conectado como: {user.name || user.email}</div>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </header>

      {/* Imagen debajo del header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <img
          src="/images/home.jpg"
          alt="Banner de inicio"
          style={{
            maxWidth: "100%",
            borderRadius: 10,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Productos destacados */}
      <section>
        <h2>Productos destacados</h2>

        <ProductoList />

        <div style={{ marginTop: 16 }}>
          <Link to="/productos">Ver todos los productos</Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
