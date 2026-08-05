const API_BASE = 'https://dummyjson.com';

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error en la autenticación');
  }
  return data;
};

export const getProducts = async () => {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) throw new Error('Error al cargar los productos');
  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE}/products/${id}`);
  if (!response.ok) throw new Error('Producto no encontrado');
  return await response.json();
};