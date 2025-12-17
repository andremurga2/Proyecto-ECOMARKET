import api from "../api/api";
import endpoints from "../api/endpoints";

const getAll = async () => {
  const { data } = await api.get(endpoints.productos);
  return data;
};

const getById = async (id) => {
  const { data } = await api.get(endpoints.producto(id));
  return data;
};

const getByCategoria = async (categoriaId) => {
  const { data } = await api.get(endpoints.productosCategoria(categoriaId));
  return data;
};

// ✅ ADMIN
const create = async (payload) => {
  const { data } = await api.post(endpoints.productosAdmin, payload);
  return data;
};

const update = async (id, payload) => {
  const { data } = await api.put(endpoints.productoAdmin(id), payload);
  return data;
};

const remove = async (id) => {
  const { data } = await api.delete(endpoints.productoAdmin(id));
  return data;
};

export default {
  getAll,
  getById,
  getByCategoria,
  create,
  update,
  remove,
};
