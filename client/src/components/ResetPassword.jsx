import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './styles/ResetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setError(''); // Limpiar errores previos

        try {
            const response = await fetch('http://localhost:3000/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Contraseña restablecida correctamente.');
                setTimeout(() => {navigate('/login');}, 5000);
            } else {
                setMessage(result.message || 'Error al restablecer la contraseña.');
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setMessage('Error en el servidor.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Restablecer Contraseña</h2>
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newPassword">Nueva Contraseña:</label>
                    <div className="password-input-wrapper">
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />                        
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <div className="password-input-wrapper">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />                        
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Restablecer</button>
            </form>
            {message && <div className="reset-password-message">{message}</div>}
        </div>
    );
};

export default ResetPassword;
