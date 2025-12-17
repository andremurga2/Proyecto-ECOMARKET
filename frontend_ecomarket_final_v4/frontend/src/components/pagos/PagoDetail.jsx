import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pagoService from "../../services/pagoService";
import Spinner from "../common/Spinner";

const PagoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pagoService
      .getById(id)
      .then((data) => setPago(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  if (!pago) return <p>Pago no encontrado</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Detalle del Pago</h2>

      <p><strong>ID:</strong> {pago.id}</p>
      <p><strong>Monto:</strong> ${pago.monto}</p>
      <p><strong>Método:</strong> {pago.metodo}</p>
      <p><strong>Estado:</strong> {pago.estado}</p>

      <button onClick={() => navigate("/pago")}>Volver</button>
    </div>
  );
};

export default PagoDetail;
