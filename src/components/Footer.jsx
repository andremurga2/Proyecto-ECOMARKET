import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#198754', 
      padding: '1.5rem 0', 
      marginTop: '2rem', 
      borderTop: '1px solid #e9ecef' 
    }}>
      <Container>
        <Row>
          <Col md={6}>
            <h4><b>EcoMarket 🌿</b></h4>
            <p>Calle Justiniano 245, Santa Cruz, Bolivia</p>
          </Col>
          <Col md={6}>
            <h4><b>Horario de Atención</b></h4>
            <p>Lunes a Viernes: 09:00 - 18:00</p>
            <p>Sábado: 10:00 - 14:00</p>
            <p>Domingo: Cerrados</p>
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
