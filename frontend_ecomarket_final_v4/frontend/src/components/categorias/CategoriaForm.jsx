import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoriaService from '../../services/categoriaService';
import useForm from '../../hooks/useForm';
import Spinner from '../common/Spinner';

const CategoriaForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEdit);
  const [serverError, setServerError] = useState(null);

  const validate = (values) => {
    const errs = {};
    if (!values.nombre) errs.nombre = 'Nombre requerido';
    return errs;
  };

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      if (isEdit) {
        await categoriaService.update(id, { nombre: values.nombre });
      } else {
        await categoriaService.create({ nombre: values.nombre });
      }
      navigate('/categorias');
    } catch (err) {
      setServerError('Error al guardar categoría');
    }
  };

  const { values, setValues, handleChange, handleBlur, handleSubmit, errors } =
    useForm({ nombre: '' }, validate, onSubmit);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data = await categoriaService.getById(id);
          setValues({ nombre: data.nombre });
        } catch (err) {
          setServerError('Error al cargar categoría');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, isEdit, setValues]);

  if (loading) return <Spinner text="Cargando..." />;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <h2>{isEdit ? 'Editar categoría' : 'Crear categoría'}</h2>

      <div>
        <label>Nombre</label>
        <input
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>}
      </div>

      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}

      <button type="submit">{isEdit ? 'Guardar' : 'Crear'}</button>
      <button onClick={() => navigate('/categorias')}>Cancelar</button>
    </form>
  );
};

export default CategoriaForm;
