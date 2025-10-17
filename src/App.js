import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const sampleProducts = [
    { id: 1, name: 'Banana', description: 'Manzana orgánica', price: 500, image: '' },
    { id: 2, name: 'Pan', description: 'Pan integral', price: 1200, image: '' },
  ];

  return (
    <div className="App">
      <Navigation />
      <Container>
        <Row>
          <Col md={8}>
            <ProductList products={sampleProducts} />
          </Col>
          <Col md={4}>
            <ShoppingCart />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <RegistrationForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
