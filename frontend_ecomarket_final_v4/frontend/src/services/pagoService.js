import api from "../api/api";
import endpoints from "../api/endpoints";

// ADMIN en backend para listar
const getAll = async () => (await api.get(endpoints.pagos)).data;
const getById = async (id) => (await api.get(endpoints.pago(id))).data;

// Crear pago (lo usa Checkout)
const create = async (payload) => (await api.post(endpoints.pagos, payload)).data;

// Alias en español (por consistencia con pedidoService)
const crear = create;
const obtener = getById;
const listar = getAll;

export default { getAll, getById, create, crear, obtener, listar };
