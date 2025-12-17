import React from "react";
import PedidoList from "../components/pedidos/PedidoList";

const Pedidos = () => {
  return (
    <main className="container">
      <div className="row spaceBetween">
        <h1 className="m0">Pedidos</h1>
      </div>
      <PedidoList />
    </main>
  );
};

export default Pedidos;
