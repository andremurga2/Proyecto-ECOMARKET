import React, { useEffect, useState } from "react";
import pedidoService from "../../services/pedidoService";
import Spinner from "../common/Spinner";
import { useAuth } from "../../contexts/AuthContext";

const formatCLP = (n) =>
  Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

const PedidoList = () => {
  const { user } = useAuth();
  const isAdmin = user?.rol === "ADMIN";
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await pedidoService.listar();
      setPedidos(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("No se pudieron cargar los pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Spinner text="Cargando pedidos..." />;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="row spaceBetween">
        <div>
          <h3 className="m0">{isAdmin ? "Pedidos (todos)" : "Mis pedidos"}</h3>
          <div className="muted" style={{ marginTop: 4 }}>
            {pedidos.length} registro(s)
          </div>
        </div>
        <button className="btn secondary" onClick={load}>
          Refrescar
        </button>
      </div>

      {error && <div className="alert danger" style={{ marginTop: 12 }}>{error}</div>}

      {pedidos.length === 0 ? (
        <div style={{ marginTop: 12 }} className="muted">
          {isAdmin ? "Aún no hay pedidos registrados." : "Aún no tienes pedidos."}
        </div>
      ) : (
        <div className="tableWrap" style={{ marginTop: 12 }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Estado</th>
                <th>Total</th>
                {isAdmin && <th>Cliente</th>}
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <span className={"pill " + (String(p.estado||"").toUpperCase()==="PAGADO" ? "pillOk" : "")}>
                      {p.estado}
                    </span>
                  </td>
                  <td>{formatCLP(p.total)}</td>
                  {isAdmin && (
                    <td>
                      <div style={{ fontWeight: 700 }}>{p.clienteNombre || "-"}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{p.clienteEmail || ""}</div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PedidoList;
