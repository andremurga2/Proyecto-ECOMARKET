// usuarioService.js
import api from "../api/api";
import endpoints from "../api/endpoints";

// Obtener el perfil del usuario autenticado
const getProfile = async () => {
  try {
    const { data } = await api.get(endpoints.me);
    return data; // { id, nombre, email, rol }
  } catch (err) {
    throw err;
  }
};

export default {
  getProfile,
};
