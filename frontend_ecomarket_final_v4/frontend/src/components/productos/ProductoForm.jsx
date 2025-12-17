import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productoService from "../../services/productoService";
import categoriaService from "../../services/categoriaService";
import Spinner from "../common/Spinner";

const ProductoForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [values, setValues] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoriaId: "",
  });

  useEffect(() => {
    const boot = async () => {
      try {
        const cats = await categoriaService.getAll();
        setCategorias(Array.isArray(cats) ? cats : []);
      } catch {
        setCategorias([]);
      }
    };
    boot();
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!isEdit) return;
      setLoading(true);
      setError("");
      try {
        const p = await productoService.getById(id);
        setValues({
          nombre: p?.nombre || "",
          descripcion: p?.descripcion || "",
          precio: p?.precio ?? "",
          stock: p?.stock ?? "",
          categoriaId: p?.categoriaId ?? p?.categoria?.id ?? "",
        });
      } catch (e) {
        setError(e?.response?.data?.message || "No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!values.nombre.trim()) errs.nombre = "Nombre requerido";
    const precio = Number(values.precio);
    if (!Number.isFinite(precio) || precio <= 0) errs.precio = "Precio inválido";
    const stock = Number(values.stock);
    if (!Number.isFinite(stock) || stock < 0) errs.stock = "Stock inválido";
    if (!values.categoriaId) errs.categoriaId = "Categoría requerida";
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setError(Object.values(errs)[0]);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        nombre: values.nombre.trim(),
        descripcion: values.descripcion?.trim() || "",
        precio: Number(values.precio),
        stock: Number(values.stock),
        categoriaId: Number(values.categoriaId),
      };

      if (isEdit) {
        await productoService.update(id, payload);
      } else {
        await productoService.create(payload);
      }

      navigate("/productos");
    } catch (e2) {
      setError(e2?.response?.data?.message || "No se pudo guardar el producto");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner text="Cargando..." />;

  return (
    <div className="container" style={{ padding: 20, maxWidth: 720 }}>
      <div className="card">
        <h2 className="m0">{isEdit ? "Editar producto" : "Nuevo producto"}</h2>

        {error && (
          <div className="alert" style={{ marginTop: 12 }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} style={{ marginTop: 14 }}>
          <label className="label">Nombre</label>
          <input className="input" name="nombre" value={values.nombre} onChange={onChange} />

          <label className="label" style={{ marginTop: 12 }}>
            Descripción
          </label>
          <textarea
            className="input"
            rows="3"
            name="descripcion"
            value={values.descripcion}
            onChange={onChange}
          />

          <div className="grid2" style={{ marginTop: 12 }}>
            <div>
              <label className="label">Precio</label>
              <input className="input" type="number" name="precio" value={values.precio} onChange={onChange} />
            </div>
            <div>
              <label className="label">Stock</label>
              <input className="input" type="number" name="stock" value={values.stock} onChange={onChange} />
            </div>
          </div>

          <label className="label" style={{ marginTop: 12 }}>
            Categoría
          </label>
          <select className="input" name="categoriaId" value={values.categoriaId} onChange={onChange}>
            <option value="">Selecciona...</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <div className="row" style={{ gap: 10, marginTop: 14 }}>
            <button className="btn" type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button className="btn secondary" type="button" onClick={() => navigate("/productos")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoForm;
