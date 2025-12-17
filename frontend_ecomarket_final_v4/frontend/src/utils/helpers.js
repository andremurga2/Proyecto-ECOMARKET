// ...existing code...
/**
 * Utility helpers to normalize data between frontend and backend.
 * Ajustar según el contrato del backend.
 */

export const formatCurrency = (value, locale = 'es-ES', currency = 'EUR') => {
  const n = Number(value) || 0;
  return n.toLocaleString(locale, { style: 'currency', currency });
};

export const formatDate = (isoString, options = {}) => {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: '2-digit', ...options });
  } catch {
    return isoString;
  }
};

export const safeGet = (obj, path, fallback = null) => {
  if (!obj || !path) return fallback;
  const parts = path.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return fallback;
    cur = cur[p];
  }
  return cur == null ? fallback : cur;
};

export const parseApiError = (err) => {
  if (!err) return { message: 'Error desconocido', status: null, details: null };
  const status = err?.response?.status || null;
  const data = err?.response?.data;
  const message = (data && (data.message || data.msg || data.error)) || err.message || 'Error de red';
  return { message, status, details: data };
};

export const buildQueryParams = (params = {}) => {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => {
      if (Array.isArray(v)) return v.map((x) => `${encodeURIComponent(k)}=${encodeURIComponent(String(x))}`).join('&');
      return `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`;
    })
    .join('&');
  return qs ? `?${qs}` : '';
};

/* Mappers: normalizar respuesta del backend a los campos usados por el frontend */
export const mapProductFromApi = (p = {}) => ({
  id: p.id ?? p._id ?? null,
  nombre: p.nombre ?? p.name ?? '',
  descripcion: p.descripcion ?? p.description ?? '',
  precio: p.precio ?? p.price ?? 0,
  imagen: p.imagen ?? p.image ?? p.img ?? '',
  categoriaId: p.categoriaId ?? p.categoria ?? p.categoryId ?? null,
  raw: p,
});

export const mapCategoryFromApi = (c = {}) => ({
  id: c.id ?? c._id ?? null,
  nombre: c.nombre ?? c.name ?? '',
  descripcion: c.descripcion ?? c.description ?? '',
  raw: c,
});

export const mapUserFromApi = (u = {}) => ({
  id: u.id ?? u._id ?? null,
  name: u.nombre ?? u.name ?? '',
  email: u.email ?? '',
  roles: u.roles ?? (u.role ? [u.role] : []),
  raw: u,
});

export const mapOrderFromApi = (o = {}) => {
  const items = (o.items ?? o.detalles ?? []).map((it) => ({
    productoId: it.productoId ?? it.productId ?? safeGet(it, 'producto.id') ?? null,
    nombre: it.nombre ?? it.name ?? safeGet(it, 'producto.nombre') ?? '',
    cantidad: it.cantidad ?? it.quantity ?? it.qty ?? 1,
    precioUnitario: it.precioUnitario ?? it.precio ?? it.price ?? safeGet(it, 'producto.precio') ?? 0,
    raw: it,
  }));
  const total = o.total ?? o.monto ?? o.amount ?? items.reduce((s, it) => s + (it.precioUnitario || 0) * (it.cantidad || 1), 0);
  return {
    id: o.id ?? o._id ?? null,
    usuario: mapUserFromApi(o.usuario ?? o.user ?? o.usuarioId ?? {}),
    items,
    total,
    estado: o.estado ?? o.status ?? 'pendiente',
    createdAt: o.createdAt ?? o.fecha ?? null,
    pago: o.pago ?? o.payment ?? null,
    raw: o,
  };
};

export const calculateOrderTotal = (items = []) =>
  items.reduce((sum, it) => sum + (Number(it.precioUnitario ?? it.precio ?? it.price ?? 0) * Number(it.cantidad ?? it.quantity ?? 1)), 0);

export const capitalize = (s = '') => String(s).charAt(0).toUpperCase() + String(s).slice(1);
