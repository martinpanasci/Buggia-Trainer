import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Verifica si el token existe en localStorage o si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token');
  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }  
  return children;
};

export default PrivateRoute;
