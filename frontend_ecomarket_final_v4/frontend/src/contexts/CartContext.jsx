import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import pedidoService from "../services/pedidoService";
import pagoService from "../services/pagoService";
import { useAuth } from "./AuthContext";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  itemCount: 0,
  checkout: async () => {},
});

const CART_KEY = "cart:v1";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  });

  const { token } = useAuth();

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    const q = Math.max(1, Number(quantity || 1));
    setItems((prev) => {
      const idx = prev.findIndex((p) => String(p.id) === String(product.id));
      if (idx > -1) {
        const next = [...prev];
        const currentQty = Number(next[idx].quantity || 1);
        next[idx] = { ...next[idx], quantity: currentQty + q };
        return next;
      }
      return [...prev, { ...product, quantity: q }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((p) => String(p.id) !== String(productId)));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const q = Number(quantity);
    setItems((prev) => {
      if (!Number.isFinite(q) || q <= 0) return prev.filter((p) => String(p.id) !== String(productId));
      return prev.map((p) => (String(p.id) === String(productId) ? { ...p, quantity: q } : p));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + (Number(it.precio || it.price || 0) * Number(it.quantity || 1)), 0),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((sum, it) => sum + Number(it.quantity || 1), 0), [items]);

  /**
   * Flow:
   * 1) POST /pedidos  { items: [{ productoId, cantidad }] }
   * 2) POST /pagos    { pedidoId, monto, metodo }
   */
  const checkout = useCallback(
    async ({ metodo = "Tarjeta" } = {}) => {
      if (!token) throw new Error("Debes iniciar sesión para comprar.");
      if (!items.length) throw new Error("Tu carrito está vacío.");

  
      for (const it of items) {
        if (!it.id) throw new Error("Hay un producto inválido en el carrito.");
        const q = Number(it.quantity || 1);
        if (!Number.isFinite(q) || q <= 0) throw new Error("Cantidad inválida en el carrito.");
      }

      const pedidoPayload = {
        items: items.map((it) => ({
          productoId: it.id,
          cantidad: Number(it.quantity || 1),
        })),
      };

      const pedido = await pedidoService.crear(pedidoPayload);

      const pagoPayload = {
        pedidoId: pedido.id,
        monto: pedido.total,
        metodo,
      };

      const pago = await pagoService.crear(pagoPayload);

      clearCart();
      return { pedido, pago };
    },
    [token, items, clearCart]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, checkout }),
    [items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, checkout]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
