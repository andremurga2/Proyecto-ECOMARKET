import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productoService from "../services/productoService";

const formatCLP = (n) =>
  Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

const FALLBACK_IMG = "/images/no-image.png";

function ProductoPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await productoService.getById(id);
        setProducto(data);
      } catch (e) {
        console.error(e);
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Cargando producto...</p>;
  if (error) return <p style={{ padding: 20, color: "crimson" }}>{error}</p>;
  if (!producto) return <p style={{ padding: 20 }}>Producto no encontrado.</p>;

  const nombre = producto.nombre ?? "Producto";
  const descripcion = producto.descripcion ?? "Sin descripción por el momento.";
  const precio = producto.precio ?? 0;
  const stock = producto.stock ?? 0;
  const imgSrc = producto.imagenUrl || "";

  return (
    <div className="container" style={{ padding: 20 }}>
      <div style={{ marginBottom: 12 }}>
        <Link className="link" to="/productos">
          ← Volver a productos
        </Link>
      </div>

      <div className="card" style={{ display: "grid", gap: 16 }}>
        {/* Imagen */}
        <div style={{ borderRadius: 12, overflow: "hidden", background: "#f3f4f6" }}>
          <img
            src={imgSrc || FALLBACK_IMG}
            alt={nombre}
            style={{
              width: "100%",
              height: 320,
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
        </div>

        {/* Info */}
        <div className="row spaceBetween" style={{ alignItems: "center" }}>
          <h2 className="m0">{nombre}</h2>
          <span className="pill pillOk">{formatCLP(precio)}</span>
        </div>

        <p className="muted" style={{ margin: 0 }}>
          {descripcion}
        </p>

        <div className="row spaceBetween" style={{ alignItems: "center" }}>
          <span className="muted">
            Stock: <strong>{stock}</strong>
          </span>

          <span className={`stockBadge ${stock > 0 ? "ok" : "out"}`}>
            {stock > 0 ? "Disponible" : "Agotado"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductoPage;
