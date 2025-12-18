const endpoints = {
  // AUTH
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },

  // PRODUCTOS
  productos: "/productos",
  producto: (id) => `/productos/${id}`,
  productosCategoria: (categoriaId) => `/productos/categoria/${categoriaId}`,
  productosAdmin: "/productos/admin",
  productoAdmin: (id) => `/productos/admin/${id}`,

  // CATEGORÍAS
  categorias: "/categorias",
  categoriasAdmin: "/categorias/admin",
  categoriaAdmin: (id) => `/categorias/admin/${id}`,

  // PEDIDOS
  pedidos: "/pedidos",
  pedido: (id) => `/pedidos/${id}`, // ✅ AGREGADO (fix)
  pedidosAdmin: "/pedidos/admin",
  pedidosCliente: (idCliente) => `/pedidos/cliente/${idCliente}`,

  // PAGOS
  pagos: "/pagos",
  pago: (id) => `/pagos/${id}`,
};

export default endpoints;
