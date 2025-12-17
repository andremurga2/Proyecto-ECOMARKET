import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pagoService from "../services/pagoService";
import Spinner from "../components/common/Spinner";

const formatCLP = (n) =>
  Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

const Pago = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    pagoService
      .getAll()
      .then((data) => {
        if (mounted) setPagos(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setError("No se pudieron cargar los pagos (requiere rol ADMIN).");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Spinner text="Cargando pagos..." />;

  return (
    <main className="container">
      <div className="row spaceBetween">
        <h1 className="m0">Pagos</h1>
        <button className="btn" onClick={() => navigate("/pago/nuevo")}>
          Nuevo pago
        </button>
      </div>

      {error && <div className="alert" style={{ marginTop: 12 }}>{error}</div>}

      {pagos.length === 0 ? (
        <div className="card" style={{ marginTop: 16 }}>
          <p className="muted" style={{ margin: 0 }}>No hay pagos registrados.</p>
        </div>
      ) : (
        <div className="card" style={{ marginTop: 16, overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Monto</th>
                <th>Método</th>
                <th>Estado</th>
                <th>Cliente</th>
                <th className="right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{formatCLP(p.monto)}</td>
                  <td>{p.metodo}</td>
                  <td>
                    <span className={"pill " + (String(p.estado || "").toUpperCase() === "COMPLETADO" ? "pillOk" : "")}>
                      {p.estado}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{p.clienteNombre || '-'}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{p.clienteEmail || ''}</div>
                  </td>
                  <td className="right">
                    <Link className="link" to={`/pago/${p.id}`}>
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Pago;
