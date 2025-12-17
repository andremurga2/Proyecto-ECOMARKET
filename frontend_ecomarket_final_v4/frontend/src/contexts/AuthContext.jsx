import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import authService from "../services/authService";
import usuarioService from "../services/usuarioService";

/**
 * CONTEXTO
 */
const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

/**
 * PROVIDER
 */
export const AuthProvider = ({ children }) => {
  // ===============================
  // STATE
  // ===============================
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [loading, setLoading] = useState(true);

  // ===============================
  // HELPERS
  // ===============================
  const persistAuth = useCallback((tokenValue, userValue) => {
    if (tokenValue) {
      localStorage.setItem("token", tokenValue);
    } else {
      localStorage.removeItem("token");
    }

    if (userValue) {
      localStorage.setItem("user", JSON.stringify(userValue));
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  // ===============================
  // BOOTSTRAP (recuperar sesión)
  // ===============================
  useEffect(() => {
    const boot = async () => {
      try {
        if (token && !user) {
          const me = await usuarioService.getProfile();
          setUser(me);
          persistAuth(token, me);
        }
      } catch (error) {
        // token inválido o expirado
        setToken(null);
        setUser(null);
        persistAuth(null, null);
      } finally {
        setLoading(false);
      }
    };

    boot();
  }, [token, user, persistAuth]);

  // ===============================
  // LOGIN
  // ===============================
  const login = useCallback(
    async (credentials) => {
      // backend puede devolver: { token, user } o { token, usuario }
      const data = await authService.login(credentials);
      const u = data.user ?? data.usuario ?? null;

      setToken(data.token);
      setUser(u);
      persistAuth(data.token, u);

      return data;
    },
    [persistAuth]
  );

  // ===============================
  // REGISTER
  // ===============================
  const register = useCallback(
    async (payload) => {
      const data = await authService.register(payload);
      const u = data.user ?? data.usuario ?? null;

      setToken(data.token);
      setUser(u);
      persistAuth(data.token, u);

      return data;
    },
    [persistAuth]
  );

  // ===============================
  // LOGOUT
  // ===============================
  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    persistAuth(null, null);
  }, [persistAuth]);

  // ===============================
  // VALUE
  // ===============================
  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * HOOK
 */
export const useAuth = () => useContext(AuthContext);
