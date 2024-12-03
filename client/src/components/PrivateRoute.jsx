import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, requiredRole }) => {
  // Verifica si el token existe en localStorage o si el usuario está autenticado
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    // Redirige al login si no está autenticado
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    try {
      const decodedToken = jwtDecode(token); // Decodifica el token JWT
      const userRole = decodedToken.role; // Extrae el rol del token

      // Verifica si el rol del usuario coincide con el requerido
      if (userRole !== requiredRole) {
        return <Navigate to="/unauthorized" />; // Redirige a una página de no autorizado
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return <Navigate to="/login" />; // Si hay un error con el token, redirige al login
    }
  }

  return children; // Renderiza el contenido protegido si pasa todas las validaciones
};

export default PrivateRoute;

