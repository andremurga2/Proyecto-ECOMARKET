import React, { useEffect, useState } from 'react';
import ProductoCard from './ProductoCard';
import productoService from '../../services/productoService';

const ProductoList = ({ adminMode = false }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productoService.getAll();
        setProductos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await productoService.remove(id);
      setProductos((prev) => prev.filter((p) => p.id !== id && p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div className="grid">
      {productos.map((producto) => (
        <ProductoCard
          key={producto.id || producto._id}
          producto={producto}
          onDelete={adminMode ? handleDelete : null}
        />
      ))}
    </div>
  );
};

export default ProductoList;
