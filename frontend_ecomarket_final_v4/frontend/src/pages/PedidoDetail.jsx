import React from "react";
import { useParams } from "react-router-dom";

const PedidoDetail = () => {
  const { id } = useParams();

  return (
    <main style={{ padding: 16 }}>
      <h2>Detalle del pedido #{id}</h2>
      <p>Aquí puedes mostrar detalle del pedido.</p>
    </main>
  );
};

export default PedidoDetail;
