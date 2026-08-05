import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setValidationError('Por favor completa todos los campos.');
      return;
    }
    setValidationError('');
    const success = await login(username, password);
    if (success) {
      navigate('/productos');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center text-primary fw-bold mb-4">ShopPanel Login</h2>
        
        {validationError && <div className="alert alert-danger py-2">{validationError}</div>}
        {error && <div className="alert alert-danger py-2">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Ej: emilys"
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold">Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Ej: emilyspass"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-100 btn btn-primary fw-bold"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}