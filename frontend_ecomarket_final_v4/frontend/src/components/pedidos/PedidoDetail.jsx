// ...existing code...
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pedidoService from '../../services/pedidoService';
import Spinner from '../common/Spinner';
import { useAuth } from '../../contexts/AuthContext';

const STATUS_OPTIONS = ['pendiente', 'pagado', 'procesando', 'enviado', 'completado', 'cancelado'];

const PedidoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await pedidoService.getById(id);
        if (!mounted) return;
        setPedido(data);
      } catch (err) {
        setServerError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleChangeStatus = async (newStatus) => {
    if (!window.confirm(`Cambiar estado a "${newStatus}"?`)) return;
    try {
      const updated = await pedidoService.update(id, { estado: newStatus });
      setPedido(updated);
    } catch (err) {
      alert(err?.response?.data?.message || 'Error al actualizar estado');
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Cancelar este pedido?')) return;
    try {
      await pedidoService.update(id, { estado: 'cancelado' });
      navigate('/pedidos');
    } catch (err) {
      alert(err?.response?.data?.message || 'Error al cancelar pedido');
    }
  };

  if (loading) return <Spinner text="Cargando pedido..." />;

  if (serverError) return (
    <div>
      <p>Error al cargar pedido: {serverError.message || JSON.stringify(serverError)}</p>
      <button onClick={() => navigate('/pedidos')}>Volver</button>
    </div>
  );

  if (!pedido) return <div>Pedido no encontrado</div>;

  const usuario = pedido.usuario || pedido.usuarioId || pedido.user || {};
  const items = pedido.items || pedido.detalles || [];
  const total = pedido.total != null ? pedido.total : pedido.monto || pedido.amount || 0;
  const pago = pedido.pago || pedido.payment || null;
  const fecha = pedido.createdAt ? new Date(pedido.createdAt).toLocaleString() : (pedido.fecha || '');

  return (
    <section style={{ maxWidth: 900, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Pedido {pedido.id || pedido._id}</h2>
        <div>
          <button onClick={() => navigate('/pedidos')} style={{ marginRight: 8 }}>Volver</button>
          {user && (user.roles?.includes('admin') || user.role === 'admin') && (
            <select
              value={pedido.estado || pedido.status || 'pendiente'}
              onChange={(e) => handleChangeStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
        </div>
      </header>

      <div style={{ marginTop: 12 }}>
        <h3>Cliente</h3>
        <div>{usuario.name || usuario.nombre || usuario.email || usuario}</div>

        <h3 style={{ marginTop: 12 }}>Detalles</h3>
        {items.length === 0 ? (
          <div>No hay ítems en este pedido.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8 }}>Producto</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Precio unit.</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Cantidad</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => {
                const nombre = it.nombre || it.name || it.productoNombre || it.producto?.nombre || it.producto?.name;
                const precio = it.precioUnitario ?? it.precio ?? it.price ?? it.unitPrice ?? 0;
                const cantidad = it.cantidad ?? it.quantity ?? it.qty ?? 1;
                return (
                  <tr key={idx} style={{ borderTop: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{nombre}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{Number(precio).toLocaleString()}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{cantidad}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{(precio * cantidad).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: 12, textAlign: 'right', fontWeight: 700 }}>
          Total: {Number(total).toLocaleString()}
        </div>

        <h3 style={{ marginTop: 12 }}>Pago</h3>
        {pago ? (
          <div>
            <div>Método: {pago.metodo || pago.method}</div>
            <div>Monto: {Number(pago.monto || pago.amount || total).toLocaleString()}</div>
            <div>Estado pago: {pago.estado || pago.status || 'desconocido'}</div>
          </div>
        ) : (
          <div>No hay información de pago registrada.</div>
        )}

        <div style={{ marginTop: 16 }}>
          <div>Estado: <strong>{pedido.estado || pedido.status}</strong></div>
          <div>Fecha: {fecha}</div>
        </div>

        <div style={{ marginTop: 16 }}>
          {/* Acciones para el usuario */}
          {!(user && (user.roles?.includes('admin') || user.role === 'admin')) && (pedido.estado !== 'cancelado') && (
            <button onClick={handleCancel} style={{ color: 'red' }}>Cancelar pedido</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PedidoDetail;