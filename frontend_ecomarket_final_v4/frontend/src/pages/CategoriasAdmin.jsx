import React, { useEffect, useMemo, useState } from "react";
import categoriaService from "../services/categoriaService";

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchCategorias = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await categoriaService.getAll();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const canCreate = useMemo(() => nombre.trim().length >= 2, [nombre]);

  const onCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!canCreate) {
      setError("Ingresa un nombre válido (mínimo 2 caracteres).");
      return;
    }

    setSaving(true);
    try {
      await categoriaService.create({ nombre: nombre.trim() });
      setNombre("");
      await fetchCategorias(); // ✅ refresca
    } catch (e2) {
      const msg =
        e2?.response?.data?.details ||
        e2?.response?.data?.error ||
        e2?.message ||
        "No se pudo crear la categoría";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    setError("");
    const ok = window.confirm("¿Eliminar esta categoría? (Si tiene productos asociados, no se podrá)");
    if (!ok) return;

    try {
      await categoriaService.remove(id);
      await fetchCategorias(); // ✅ refresca
    } catch (e3) {
      const msg =
        e3?.response?.data?.details ||
        e3?.response?.data?.error ||
        e3?.message ||
        "No se pudo eliminar la categoría";
      setError(msg);
    }
  };

  return (
    <main className="container" style={{ padding: 20 }}>
      <div className="row spaceBetween" style={{ gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 className="m0">Gestión de categorías</h2>
          <p className="muted" style={{ marginTop: 6 }}>
            Crea y elimina categorías. Al eliminar, se valida que no existan productos asociados.
          </p>
        </div>

        <button className="btn secondary" onClick={fetchCategorias} disabled={loading}>
          {loading ? "Cargando..." : "Refrescar"}
        </button>
      </div>

      {error && (
        <div className="alert" style={{ marginTop: 12 }}>
          {error}
        </div>
      )}

      <div className="grid2" style={{ marginTop: 16 }}>
        {/* Crear */}
        <div className="card">
          <h3 className="m0">Nueva categoría</h3>

          <form onSubmit={onCreate} style={{ marginTop: 12 }}>
            <label className="label">Nombre</label>
            <input
              className="input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Panadería"
              maxLength={60}
            />

            <button className="btn" style={{ marginTop: 12 }} disabled={!canCreate || saving}>
              {saving ? "Guardando..." : "Crear"}
            </button>
          </form>
        </div>

        {/* Listado */}
        <div className="card">
          <div className="row spaceBetween">
            <h3 className="m0">Listado</h3>
            <span className="muted">{categorias.length} categoría(s)</span>
          </div>

          {loading ? (
            <p style={{ marginTop: 12 }}>Cargando...</p>
          ) : categorias.length === 0 ? (
            <p style={{ marginTop: 12 }} className="muted">
              No hay categorías registradas.
            </p>
          ) : (
            <div className="list" style={{ marginTop: 12 }}>
              {categorias.map((c) => (
                <div className="listRow" key={c.id}>
                  <div style={{ minWidth: 0 }}>
                    <div className="itemTitle">{c.nombre}</div>
                    <div className="muted">ID: {c.id}</div>
                  </div>

                  <button className="btn danger" onClick={() => onDelete(c.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
