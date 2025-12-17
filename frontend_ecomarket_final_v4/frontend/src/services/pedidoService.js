import api from "../api/api";
import endpoints from "../api/endpoints";

const listar = async () => (await api.get(endpoints.pedidos)).data;

const listarAdmin = async () => (await api.get(`${endpoints.pedidos}/admin`)).data;

const listarPorClienteAdmin = async (clienteId) =>
  (await api.get(`${endpoints.pedidos}/cliente/${clienteId}`)).data;

const obtener = async (id) => (await api.get(endpoints.pedido(id))).data;

const crear = async (payload) => (await api.post(endpoints.pedidos, payload)).data;

export default {
  listar,
  listarAdmin,
  listarPorClienteAdmin,
  obtener,
  crear,
};
