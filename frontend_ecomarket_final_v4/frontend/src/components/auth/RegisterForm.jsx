import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext';
import Spinner from '../common/Spinner';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [serverError, setServerError] = useState(null);

  const validate = (values) => {
    const errs = {};
    if (!values.nombre) errs.nombre = 'Nombre requerido';
    if (!values.email) errs.email = 'Email requerido';
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = 'Email inválido';
    if (!values.password) errs.password = 'Password requerida';
    else if (values.password.length < 6) errs.password = 'La contraseña debe tener al menos 6 caracteres';
    if (values.password !== values.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden';
    return errs;
  };

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      // IMPORTANTE: el backend necesita "nombre"
      await register({
        nombre: values.nombre,
        email: values.email,
        password: values.password,
      });

      // Auto-login después de registrar
      await login({ email: values.email, password: values.password });

      navigate('/');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        'Error al registrar';
      setServerError(msg);
      throw err;
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    submitting,
    errors,
    handleBlur,
  } = useForm(
    {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit
  );

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: '0 auto' }}>
      <h2>Registrarse</h2>

      {/* NOMBRE */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width: '100%', padding: 8 }}
        />
        {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
      </div>

      {/* EMAIL */}
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

      {/* PASSWORD */}
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

      {/* CONFIRM PASSWORD */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width: '100%', padding: 8 }}
        />
        {errors.confirmPassword && (
          <div style={{ color: 'red' }}>{errors.confirmPassword}</div>
        )}
      </div>

      {/* SERVER ERROR */}
      {serverError && <div style={{ color: 'red', marginBottom: 12 }}>{serverError}</div>}

      {/* SUBMIT */}
      <div>
        <button type="submit" disabled={submitting} style={{ padding: '8px 16px' }}>
          {submitting ? <Spinner size={20} text="Registrando..." /> : 'Crear cuenta'}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
