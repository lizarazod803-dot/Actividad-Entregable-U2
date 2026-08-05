import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/productos/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/pedidos" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}