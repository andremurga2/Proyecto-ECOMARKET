export const DEFAULT_PAGE_SIZE = 20;
export const API_PREFIX = '/api'; // útil si se usa proxy o para construir rutas locales
export const CART_KEY = 'cart:v1';

export const USER_STORAGE_KEY = 'user';
export const TOKEN_STORAGE_KEY = 'token';

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const ORDER_STATUS = ['pendiente', 'pagado', 'procesando', 'enviado', 'completado', 'cancelado'];

export const PAYMENT_METHODS = [
  { id: 'manual', label: 'Pago manual' },
  { id: 'card', label: 'Tarjeta' },
  { id: 'paypal', label: 'PayPal' },
];

export const CURRENCY = {
  CODE: 'EUR',
  LOCALE: 'es-ES',
};

export const ENDPOINTS_HINT = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  USUARIOS: '/usuarios',
  PRODUCTOS: '/productos',
  CATEGORIAS: '/categorias',
  PEDIDOS: '/pedidos',
  PAGOS: '/pagos',
};