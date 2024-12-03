import React, { useState } from 'react';
import './styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Correo enviado. Revisa tu bandeja de entrada.');
            } else {
                setMessage(result.message || 'Error al enviar el correo.');
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            setMessage('Error en el servidor.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Recuperar Contraseña</h2>
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {message && <div className="forgot-password-message">{message}</div>}
        </div>

    );
};

export default ForgotPassword;
