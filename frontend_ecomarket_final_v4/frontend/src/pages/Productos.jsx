import React, { useEffect, useMemo, useState } from "react";
import productoService from "../services/productoService";
import categoriaService from "../services/categoriaService";
import ProductoCard from "../components/productos/ProductoCard";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const { user } = useAuth();
  const isAdmin = user?.rol === "ADMIN";

  const fetchCategorias = async () => {
    try {
      const data = await categoriaService.getAll();
      setCategorias(Array.isArray(data) ? data : []);
    } catch {
      setCategorias([]);
    }
  };

  const fetchProductos = async () => {
    setLoading(true);
    setError("");

    try {
      const data = categoriaActiva
        ? await productoService.getByCategoria(categoriaActiva)
        : await productoService.getAll();

      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar productos");
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [categoriaActiva]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return productos;

    return productos.filter((p) =>
      (p.nombre || "").toLowerCase().includes(term)
    );
  }, [productos, q]);

  const handleDelete = async (id) => {
    if (!isAdmin) return;

    const ok = window.confirm("¿Eliminar este producto?");
    if (!ok) return;

    try {
      await productoService.remove(id);
      await fetchProductos();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "No se pudo eliminar el producto");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Cargando productos...</p>;

  return (
    <div className="container" style={{ padding: 20 }}>
      <div
        className="row spaceBetween"
        style={{ gap: 12, flexWrap: "wrap" }}
      >
        <h2 className="m0">Productos</h2>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            className="input"
            style={{ maxWidth: 320 }}
            placeholder="Buscar producto..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          {isAdmin && (
            <Link className="btn" to="/productos/nuevo">
              + Nuevo producto
            </Link>
          )}
        </div>
      </div>

      {/* Filtro por categorías */}
      <div className="categoryBar" style={{ marginTop: 14 }}>
        <button
          className={!categoriaActiva ? "chip active" : "chip"}
          onClick={() => setCategoriaActiva(null)}
        >
          Todas
        </button>

        {categorias.map((c) => (
          <button
            key={c.id}
            className={categoriaActiva === c.id ? "chip active" : "chip"}
            onClick={() => setCategoriaActiva(c.id)}
            title={`Filtrar por ${c.nombre}`}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      {error && (
        <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>
      )}

      {filtered.length === 0 ? (
        <div className="card" style={{ marginTop: 16 }}>
          <p className="muted" style={{ margin: 0 }}>
            No hay productos para este filtro.
          </p>
        </div>
      ) : (
        <div className="gridProducts" style={{ marginTop: 16 }}>
          {filtered.map((p) => (
            <ProductoCard
              key={p.id}
              producto={p}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;
