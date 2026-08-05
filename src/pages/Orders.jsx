import { useState, useEffect } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    const updated = orders.map((ord) => 
      ord.id === orderId ? { ...ord, status: newStatus } : ord
    );
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const deleteOrder = (orderId) => {
    const filtered = orders.filter((ord) => ord.id !== orderId);
    setOrders(filtered);
    localStorage.setItem('orders', JSON.stringify(filtered));
  };

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold mb-3">Lista de Pedidos Vacía</h1>
        <p className="text-muted">Aún no has registrado ningún pedido en la plataforma.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">Mis Pedidos Realizados</h1>
      <div className="d-flex flex-column gap-3">
        {orders.map((order) => (
          <div key={order.id} className="card shadow-sm p-3">
            <div className="row align-items-center g-3">
              <div className="col-auto">
                <img src={order.thumbnail} alt={order.title} className="rounded" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
              </div>
              <div className="col">
                <h5 className="fw-bold mb-1">{order.title}</h5>
                <p className="text-muted mb-1">${order.price}</p>
                <span className={`badge ${
                  order.status === 'Pendiente' ? 'bg-warning text-dark' :
                  order.status === 'Confirmado' ? 'bg-primary' :
                  order.status === 'Enviado' ? 'bg-success' : 'bg-danger'
                }`}>
                  Estado: {order.status}
                </span>
              </div>
              <div className="col-12 col-sm-auto d-flex gap-2 align-items-center">
                <select 
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="form-select form-select-sm"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                <button 
                  onClick={() => deleteOrder(order.id)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}