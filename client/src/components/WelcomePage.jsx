import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const WelcomePage = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.username;

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        navigate('/'); // Redirigir a la página de inicio de sesión
    };
    

    return (
        <div className="welcome-page" style={{justifyContent: 'center', alignItems: 'center',textAlign: 'center',padding: '50px'}}>
            <h2>¡Estás logueado!</h2>
            <h3>{email}</h3>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default WelcomePage;