import React, { useContext } from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { CartContext } from '../context/CartContext';

export default function NavBar() {
  const { count } = useContext(CartContext);

  return (
    <Navbar bg="light" fixed="top" expand="md">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>EcoMarket</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productos">
              <Nav.Link>Productos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contacto">
              <Nav.Link>Contacto</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Nav.Link disabled>
              Carrito <Badge bg="secondary">{count}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
