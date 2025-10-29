import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext.js';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      {/* Imagen del producto */}
      <Card.Img variant="top" src={product.imagen} alt={product.nombre} />

      <Card.Body>
        {/* Nombre del producto */}
        <Card.Title>{product.nombre}</Card.Title>

        {/* Precio */}
        <Card.Text>${product.precio}</Card.Text>

        {/* Botón agregar al carrito */}
        <Button variant="success" onClick={() => addToCart(product)}>
          Agregar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
