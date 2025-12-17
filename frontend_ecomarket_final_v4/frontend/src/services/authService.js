import api from "../api/api";
import endpoints from "../api/endpoints";

const login = async (credentials) => {
  const { data } = await api.post(endpoints.auth.login, credentials);
  // backend: { token, usuario }
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

const register = async (payload) => {
  const { data } = await api.post(endpoints.auth.register, payload);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default {
  login,
  register,
  logout,
};
