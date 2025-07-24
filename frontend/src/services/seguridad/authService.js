// authService.jss

const API_BASE = 'http://localhost:4051/api/optica';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre_usuario: credentials.nombre_usuario, // Asegurar minúsculas y coincidencia con backend
          contraseña: credentials.contraseña
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error en el login');
      }

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify({
          idUsuario: data.idUsuario,
          nombre_usuario: credentials.nombre_usuario,
          rol: data.rol // Asumiendo que el backend devuelve el rol
        }));
      }

      return data;
    } catch (error) {
      console.error('Error en authService.login:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE}/auth/registro`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error en el registro');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en authService.register:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // Opcional: llamar al endpoint de logout del backend si existe
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getCurrentUser: () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  authFetch: async (url, options = {}) => {
    const token = authService.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      credentials: 'include',
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error en la solicitud');
    }

    return response;
  }
};