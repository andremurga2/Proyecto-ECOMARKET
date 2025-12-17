import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pagoService from "../../services/pagoService";

const PagoForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    pedidoId: "",
    monto: "",
    metodo: "Tarjeta",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!values.pedidoId) return "Pedido ID es requerido";
    if (!Number.isFinite(Number(values.pedidoId)) || Number(values.pedidoId) <= 0) return "Pedido ID inválido";
    if (values.monto === "") return "Monto es requerido";
    if (!Number.isFinite(Number(values.monto)) || Number(values.monto) <= 0) return "Monto inválido";
    if (!values.metodo) return "Método es requerido";
    return "";
  };

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const payload = {
        pedidoId: Number(values.pedidoId),
        monto: Number(values.monto),
        metodo: values.metodo,
      };

      const resp = await pagoService.create(payload);
      navigate(`/pago/${resp.id}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Error al registrar pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "16px auto" }}>
        <h2 className="m0">Registrar Pago (ADMIN)</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          En EcoMarket un pago siempre pertenece a un pedido. Ingresa el <b>ID del pedido</b>.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <label className="label">Pedido ID</label>
          <input
            className="input"
            type="number"
            name="pedidoId"
            value={values.pedidoId}
            onChange={handleChange}
            min="1"
            required
          />

          <label className="label" style={{ marginTop: 12 }}>
            Monto
          </label>
          <input
            className="input"
            type="number"
            name="monto"
            value={values.monto}
            onChange={handleChange}
            min="1"
            required
          />

          <label className="label" style={{ marginTop: 12 }}>
            Método de pago
          </label>
          <select className="input" name="metodo" value={values.metodo} onChange={handleChange}>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </select>

          {error && (
            <div className="alert danger" style={{ marginTop: 12 }}>
              {error}
            </div>
          )}

          <div className="row" style={{ marginTop: 14, gap: 10 }}>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Guardando..." : "Registrar"}
            </button>
            <button type="button" className="btn secondary" onClick={() => navigate("/pago")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PagoForm;
