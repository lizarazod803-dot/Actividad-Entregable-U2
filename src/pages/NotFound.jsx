import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
      <h2 className="fw-semibold mb-2">Página no encontrada</h2>
      <p className="text-muted mb-4">La ruta que buscas no existe o fue movida.</p>
      <Link to="/productos" className="btn btn-primary fw-bold px-4 py-2">
        Volver al Panel Principal
      </Link>
    </div>
  );
}