import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import productsData from '../data/products.js';
import ProductCard from '../components/products/ProductCard.jsx';
import Filters from '../components/Filters.jsx';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProducts =
    selectedCategory === 'Todos'
      ? productsData
      : productsData.filter(p => p.categoria === selectedCategory);

  return (
    <Container>
      <h2 className="my-4">Productos</h2>
      <Filters selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
