import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleOrder = (product) => {
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
    alert(`¡Pedido del producto "${product.title}" registrado como Pendiente!`);
  };

  if (loading) return <div className="text-center mt-5 fs-4">Cargando productos...</div>;
  if (error) return <div className="text-center mt-5 text-danger fs-4">Error: {error}</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold text-dark">Catálogo de Productos</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img src={product.thumbnail} alt={product.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column justify-between">
                <div>
                  <h5 className="card-title fw-bold">{product.title}</h5>
                  <p className="card-text text-muted small text-truncate">{product.description}</p>
                </div>
                <div>
                  <p className="text-primary fw-bold fs-5 mb-3">${product.price}</p>
                  <div className="d-flex gap-2">
                    <Link 
                      to={`/productos/${product.id}`}
                      className="btn btn-outline-secondary btn-sm flex-grow-1"
                    >
                      Ver Detalle
                    </Link>
                    <button 
                      onClick={() => handleOrder(product)}
                      className="btn btn-primary btn-sm flex-grow-1"
                    >
                      Pedir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}