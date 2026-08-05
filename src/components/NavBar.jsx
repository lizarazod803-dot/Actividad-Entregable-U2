import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/productos">ShopPanel</Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/pedidos">Mis Pedidos</Link>
            </li>
            <li className="nav-item">
              <span className="badge bg-light text-primary px-3 py-2">
                {user.firstName || user.username}
              </span>
            </li>
            <li className="nav-item">
              <button 
                onClick={handleLogout}
                className="btn btn-danger btn-sm fw-semibold"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}