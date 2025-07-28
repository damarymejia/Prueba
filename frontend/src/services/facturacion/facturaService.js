// services/facturaService.js  
const API_BASE = 'http://localhost:4051/api/optica';  
  
// Función para obtener el token del localStorage  
const getAuthToken = () => {  
  return localStorage.getItem('token');  
};  
  
export const facturaService = {  
  // Obtener todas las facturas  
  obtenerFacturas: async () => {  
    const token = getAuthToken();  
    const response = await fetch(`${API_BASE}/facturas`, {  
      method: 'GET',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}` // Token JWT en el header  
      }  
    });  
      
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
    return response.json();  
  },  
    
  // Crear factura completa  
  crearFacturaCompleta: async (data) => {  
    const token = getAuthToken();  
    const response = await fetch(`${API_BASE}/factura-completa`, {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}` // Token JWT en el header  
      },  
      body: JSON.stringify(data)  
    });  
      
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
    return response.json();  
  },  
    
  // Obtener factura por ID  
  obtenerFacturaPorId: async (id) => {  
    const token = getAuthToken();  
    const response = await fetch(`${API_BASE}/factura/${id}`, {  
      method: 'GET',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}`  
      }  
    });  
      
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
    return response.json();  
  },  
    
  // Anular factura  
  anularFactura: async (id) => {  
    const token = getAuthToken();  
    const response = await fetch(`${API_BASE}/factura/${id}/anular`, {  
      method: 'PUT',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}`  
      }  
    });  
      
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
    return response.json();  
  },  
    
  // Descargar PDF de factura  
  descargarPDF: (id) => {  
    const token = getAuthToken();  
    // Para descargas de archivos, agregamos el token como query parameter  
    window.open(`${API_BASE}/factura/${id}/pdf?token=${token}`, '_blank');  
  }  
};



 
export const caiService = {  
  // Obtener CAI activo  
  obtenerCAIActivo: async () => {  
    const token = getAuthToken();  
    const response = await fetch(`${API_BASE}/cai/activo`, {  
      method: 'GET',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}`  
      }  
    });  
  
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
    return response.json();  
  },

  // Guardar datos CAI  
  guardarCAI: async (caiData) => {  
    const token = getAuthToken();  
    const response = await fetch(`${API_BASE}/cai`, {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}`  
      },  
      body: JSON.stringify(caiData)  
    });  
  
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
    return response.json();  
  },  
  
  // Obtener CAI por ID  
  obtenerCAIPorId: async (idCAI) => {  
    const token = getAuthToken();  
    const response = await fetch(`${API_BASE}/cai/${idCAI}`, {  
      method: 'GET',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}`  
      }  
    });  
  
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
    return response.json();  
  },  
  
  // Actualizar CAI  
  actualizarCAI: async (idCAI, caiData) => {  
    const token = getAuthToken();  
    const response = await fetch(`${API_BASE}/cai/${idCAI}`, {  
      method: 'PUT',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}`  
      },  
      body: JSON.stringify(caiData)  
    });  
  
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  
    return response.json();  
  }  




};