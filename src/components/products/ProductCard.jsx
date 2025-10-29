import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(AppContext);

  return (
    <Card style={{ width: '18rem' }} className="mb-3 shadow-sm">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price.toLocaleString()}</Card.Text>
        <Button variant="success" onClick={() => addToCart(product)}>
          Agregar
        </Button>

      </Card.Body>
    </Card>
  );
}

export default ProductCard;
