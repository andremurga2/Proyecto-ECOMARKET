import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import ProductCard from '../components/products/ProductCard';
import productsData from '../data/gaming.mock';

function Products() {
  const [category, setCategory] = useState('all');
  const categories = ['all', ...new Set(productsData.map(p => p.category))];
  const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);

  return (
    <Container>
      <h2 className="text-center mb-3">Catálogo de productos</h2>
      <ButtonGroup className="mb-4 d-flex justify-content-center">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={cat === category ? 'success' : 'outline-success'}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </ButtonGroup>
      <Row>
        {filtered.map(product => (
          <Col key={product.id} md={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
