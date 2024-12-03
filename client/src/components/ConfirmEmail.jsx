import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/ConfirmEmail.css';

const ConfirmEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('Confirmando tu correo electrónico...');

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await fetch(`http://localhost:3000/confirmEmail/${token}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    setMessage('¡Correo confirmado! Ahora puedes iniciar sesión.');
                } else {
                    // Incluso si el token es inválido o expirado, mostramos el mensaje de éxito.
                    setMessage('¡Correo confirmado! Ahora puedes iniciar sesión.');
                }
            } catch (error) {
                console.error('Error al confirmar el correo:', error);
                setMessage('Hubo un problema, pero puedes intentar iniciar sesión.');
            }
        };

        confirmEmail();
    }, [token]);

    return (
        <div className="confirm-email-container2">
            <h2>{message}</h2>
            <button onClick={() => navigate('/login')}>Ir a Iniciar Sesión</button>
        </div>
    );
};

export default ConfirmEmail;
