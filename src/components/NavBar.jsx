import { useContext } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.js';


function NavBar() {
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate(); // Para navegar al detalle de pagos

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Ecomarket</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Badge
            bg="light"
            text="dark"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/pagos')} // Aquí navega al detalle del pago
          >
            🛒 {cartCount}
          </Badge>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
