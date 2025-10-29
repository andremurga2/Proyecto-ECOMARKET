import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '1.5rem 0', 
      marginTop: '2rem', 
      borderTop: '1px solid #e9ecef' 
    }}>
      <Container>
        <Row>
          <Col md={6}>
            <h5>EcoMarket 🌿</h5>
            <p>Dirección: Calle Falsa 123, Ciudad, País</p>
          </Col>
          <Col md={6}>
            <h5>Horario de Atención</h5>
            <p>Lunes a Viernes: 09:00 - 18:00</p>
            <p>Sábado: 10:00 - 14:00</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <small>© 2025 EcoMarket. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
