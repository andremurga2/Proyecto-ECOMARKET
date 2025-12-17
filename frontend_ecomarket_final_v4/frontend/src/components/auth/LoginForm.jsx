import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext';
import Spinner from '../common/Spinner';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState(null);

  const validate = (values) => {
    const errs = {};
    if (!values.email) errs.email = 'Email requerido';
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = 'Email inválido';
    if (!values.password) errs.password = 'Password requerida';
    else if (values.password.length < 6) errs.password = 'La contraseña debe tener al menos 6 caracteres';
    return errs;
  };

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      await login({ email: values.email, password: values.password });
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error al autenticar';
      setServerError(msg);
      throw err;
    }
  };

  const { values, handleChange, handleSubmit, submitting, errors, handleBlur } = useForm(
    { email: '', password: '' },
    validate,
    onSubmit
  );

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>Iniciar sesión</h2>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width: '100%', padding: 8 }}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width: '100%', padding: 8 }}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>

      {serverError && <div style={{ color: 'red', marginBottom: 12 }}>{serverError}</div>}

      <div>
        <button type="submit" disabled={submitting} style={{ padding: '8px 16px' }}>
          {submitting ? <Spinner size={20} text="Ingresando..." /> : 'Entrar'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;