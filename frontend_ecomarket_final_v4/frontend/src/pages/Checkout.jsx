import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { useCart } from "../contexts/CartContext";

const formatCLP = (n) =>
  Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export default function Checkout() {
  const { items, total, updateQuantity, removeItem, checkout } = useCart();
  const [metodo, setMetodo] = useState("Tarjeta");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const hasItems = items.length > 0;

  const totals = useMemo(() => {
    const subTotal = total;
    const envio = 0;
    const finalTotal = subTotal + envio;
    return { subTotal, envio, finalTotal };
  }, [total]);

  const onCheckout = async () => {
    setMsg("");
    if (!hasItems) return setMsg("Tu carrito está vacío.");
    setLoading(true);
    try {
      const { pago } = await checkout({ metodo });
      // cliente no ve la lista de pagos (es admin), así que mostramos éxito simple
      setMsg("✅ Compra confirmada. Pedido y pago registrados.");
      // opcional: redirigir a pedidos
      setTimeout(() => navigate("/pedidos"), 500);
    } catch (e) {
      setMsg(e?.message || "Error en checkout. Revisa stock o sesión.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner text="Procesando compra..." />;

  return (
    <div className="container">
      <div className="row spaceBetween">
        <h2 className="m0">Checkout</h2>
        <span className="muted">{items.length} producto(s)</span>
      </div>

      {msg && <div className="alert" style={{ marginTop: 12 }}>{msg}</div>}

      {!hasItems ? (
        <div className="card" style={{ marginTop: 16 }}>
          <p className="muted" style={{ marginTop: 0 }}>
            No tienes productos en el carrito.
          </p>
          <Link className="btn" to="/productos">
            Ir a productos
          </Link>
        </div>
      ) : (
        <div className="grid2" style={{ marginTop: 16 }}>
          <div className="card">
            <h3 className="m0">Tu carrito</h3>

            <div className="list" style={{ marginTop: 12 }}>
              {items.map((it) => {
                const precio = Number(it.precio || it.price || 0);
                const qty = Number(it.quantity || 1);
                return (
                  <div key={it.id} className="listRow">
                    <div style={{ minWidth: 0 }}>
                      <div className="itemTitle">{it.nombre}</div>
                      <div className="muted">{formatCLP(precio)} c/u</div>
                    </div>

                    <div className="qty">
                      <button
                        className="btn secondary"
                        onClick={() => updateQuantity(it.id, Math.max(1, qty - 1))}
                        aria-label="Disminuir cantidad"
                      >
                        –
                      </button>
                      <input
                        className="qtyInput"
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => updateQuantity(it.id, Number(e.target.value))}
                      />
                      <button
                        className="btn secondary"
                        onClick={() => updateQuantity(it.id, qty + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <div className="right">
                      <div className="price">{formatCLP(precio * qty)}</div>
                      <button className="link danger" onClick={() => removeItem(it.id)}>
                        Quitar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="divider" />

            <div className="row spaceBetween">
              <span className="muted">Subtotal</span>
              <b>{formatCLP(totals.subTotal)}</b>
            </div>
            <div className="row spaceBetween">
              <span className="muted">Envío</span>
              <b>{formatCLP(totals.envio)}</b>
            </div>
            <div className="row spaceBetween" style={{ marginTop: 6 }}>
              <span>Total</span>
              <b style={{ fontSize: 18 }}>{formatCLP(totals.finalTotal)}</b>
            </div>
          </div>

          <div className="card">
            <h3 className="m0">Pago</h3>
            <p className="muted" style={{ marginTop: 8 }}>
              Selecciona un método y confirma tu compra.
            </p>

            <label className="label" style={{ marginTop: 12 }}>
              Método
            </label>
            <select className="input" value={metodo} onChange={(e) => setMetodo(e.target.value)}>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
            </select>

            <button className="btn" style={{ marginTop: 14, width: "100%" }} onClick={onCheckout}>
              Confirmar y pagar
            </button>

            <p className="muted" style={{ marginTop: 10 }}>
              Luego podrás revisar tus pedidos en la sección <b>Pedidos</b>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
