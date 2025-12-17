import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/productos");
  }, [user, loading, navigate]);

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 520, margin: "16px auto" }}>
        <h1 className="m0">Iniciar sesión</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Accede para crear pedidos y comprar.
        </p>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
