import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const isAdmin = user?.rol === "ADMIN";

  return (
    <header className="appHeader">
      <div className="container">
        <nav className="nav">
          <Link className="brand" to="/">EcoMarket</Link>

          <Link className="navLink" to="/productos">Productos</Link>

          {user && !isAdmin && (
            <Link className="navLink" to="/checkout">
              Carrito <span className="pill">{itemCount}</span>
            </Link>
          )}

          {user && <Link className="navLink" to="/pedidos">Pedidos</Link>}

          {isAdmin && (
            <Link className="navLink" to="/categorias">
              Gestión Categorías
            </Link>
          )}

          <div className="spacer" />

          <div className="userArea">
            {!user ? (
              <Link className="navLink" to="/login">Login</Link>
            ) : (
              <button className="btn secondary" onClick={logout}>Salir</button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
