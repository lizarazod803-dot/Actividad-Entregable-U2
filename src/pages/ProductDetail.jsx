import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Producto inexistente o error al cargar');
        setLoading(false);
      });
  }, [id]);

  const handleOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: Date.now(),
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      status: 'Pendiente',
    };
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
    alert(`¡Pedido registrado con éxito!`);
  };

  if (loading) return <div className="text-center mt-5 fs-4">Cargando detalle...</div>;
  if (error) return <div className="text-center mt-5 text-danger fs-4">{error}</div>;

  return (
    <div className="container py-5" style={{ maxWidth: '900px' }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4 btn-sm">
        ← Volver
      </button>
      <div className="card shadow p-4">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6">
            <img src={product.thumbnail} alt={product.title} className="img-fluid rounded" style={{ maxHeight: '350px', width: '100%', objectFit: 'cover' }} />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-between">
            <div>
              <h1 className="fw-bold mb-3">{product.title}</h1>
              <p className="text-muted mb-3">{product.description}</p>
              <h3 className="text-primary fw-bold mb-3">${product.price}</h3>
              <p className="text-secondary small mb-4">Categoría: <span className="text-uppercase fw-semibold">{product.category}</span></p>
            </div>
            <button 
              onClick={handleOrder}
              className="btn btn-primary fw-bold py-2"
            >
              Registrar Pedido (Pendiente)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}