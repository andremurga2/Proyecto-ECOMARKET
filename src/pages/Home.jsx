import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-4">
      {/* Texto de bienvenida */}
      <Row className="mb-4">
        <Col className="text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            Bienvenido a EcoMarket 🌿
          </h1>
          <p style={{ fontSize: '1.5rem' }}>
            Productos sostenibles y ecológicos para tu día a día.
          </p>
        </Col>
      </Row>

      {/* Imagen grande debajo del texto */}
      <Row>
        <Col className="text-center">
          <Image
            src="/images/fondohome.jpg"
            alt="Comprando verduras"
            fluid
            style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
            rounded
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
