import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const formatCLP = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

// ✅ Placeholder LOCAL (frontend/public/images)
const FALLBACK_IMG = "/images/no-image.png";

const ProductoCard = ({ producto, onDelete }) => {
  const { addItem } = useCart();
  const { user } = useAuth();

  const id = producto.id ?? producto._id;
  const nombre = producto.nombre ?? producto.name ?? "Producto";
  const descripcion = producto.descripcion ?? producto.description ?? "";
  const precio = producto.precio ?? producto.price ?? 0;
  const stock = producto.stock ?? 0;

  // ✅ Backend EcoMarket guarda "/images/xxx.jpg"
  const imgSrc = producto.imagenUrl || "";

  const isAdmin = user?.rol === "ADMIN";

  const handleAdd = () => {
    if (stock <= 0) return;
    addItem({ id, nombre, precio, imagen: imgSrc, stock }, 1);
  };

  return (
    <div className="card productCard">
      {imgSrc ? (
        <div className="imgWrap">
          <img
            src={imgSrc}
            alt={nombre}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
        </div>
      ) : (
        <div className="imgPlaceholder">Sin imagen</div>
      )}

      <div className="row spaceBetween">
        <h3 className="m0">{nombre}</h3>
        <span className={`stockBadge ${stock > 0 ? "ok" : "out"}`}>
          {stock > 0 ? `Stock: ${stock}` : "Agotado"}
        </span>
      </div>

      {descripcion && <p className="muted">{descripcion}</p>}

      <div className="price">{formatCLP(precio)}</div>

      <div className="actions">
        {!isAdmin ? (
          <button className="btn" onClick={handleAdd} disabled={stock <= 0}>
            {stock > 0 ? "Agregar al carrito" : "Sin stock"}
          </button>
        ) : (
          <button
            className="btn"
            disabled
            title="El administrador no puede comprar"
          >
            Solo clientes
          </button>
        )}

        <Link className="btn secondary" to={`/productos/${id}`}>
          Ver
        </Link>

        {isAdmin && (
          <>
            <Link className="btn secondary" to={`/productos/editar/${id}`}>
              Editar
            </Link>
            <button
              className="btn danger"
              onClick={() => onDelete && onDelete(id)}
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductoCard;
