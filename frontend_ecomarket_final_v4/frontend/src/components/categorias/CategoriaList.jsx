import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import categoriaService from '../../services/categoriaService';
import Spinner from '../common/Spinner';
import { useAuth } from '../../contexts/AuthContext';

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriaService.getAll();
      setCategorias(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar categoría?')) return;
    try {
      await categoriaService.remove(id);
      fetchCategorias();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  if (loading) return <Spinner text="Cargando categorías..." />;

  if (error)
    return (
      <div>
        Error al cargar
        <button onClick={fetchCategorias}>Reintentar</button>
      </div>
    );

  return (
    <section>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Listado</h2>

        <button onClick={() => navigate('/categorias/nuevo')}>
          Nueva categoría
        </button>
      </header>

      {categorias.length === 0 ? (
        <p>No hay categorías</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categorias.map((c) => (
            <li
              key={c.id}
              style={{
                padding: 8,
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <strong>{c.nombre}</strong>
              </div>
              <div>
                <Link to={`/categorias/editar/${c.id}`}>Editar</Link>
                <button onClick={() => handleDelete(c.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CategoriaList;
