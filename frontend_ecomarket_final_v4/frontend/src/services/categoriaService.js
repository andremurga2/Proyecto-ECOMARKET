import api from "../api/api";
import endpoints from "../api/endpoints";

const getAll = async () => {
  const { data } = await api.get(endpoints.categorias);
  return data;
};

// ADMIN
const create = async (payload) => {
  const { data } = await api.post(endpoints.categoriasAdmin, payload);
  return data;
};

const remove = async (id) => {
  const { data } = await api.delete(endpoints.categoriaAdmin(id));
  return data;
};

export default {
  getAll,
  create,
  remove,
};
