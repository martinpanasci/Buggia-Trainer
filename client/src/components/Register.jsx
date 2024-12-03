import React, { useState } from "react";
import './styles/Register.css';
//import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [canResend, setCanResend] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "El nombre es obligatorio.";
        }

        if (!email.trim()) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "El correo electrónico no es válido.";
        }

        if (!password) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (password.length < 4) {
            newErrors.password = "La contraseña debe tener al menos 4 caracteres.";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = { name, email, password };

        fetch('http://localhost:3000/register', { // agregar nueva url ngrock
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 409) {
                    throw new Error('El correo ya está registrado.');
                }
                if (!response.ok) {
                    throw new Error('Registro fallido.');
                }
                return response.json();
            })
            .then(() => {
                setConfirmationMessage('Hemos enviado un correo de confirmación. Por favor, revisa tu bandeja de entrada.');
                setCanResend(false);

                // Habilitar el reenvío después de 60 segundos
                setTimeout(() => {
                    setCanResend(true);
                }, 60000);
            })
            .catch((error) => {
                if (error.message === 'El correo ya está registrado.') {
                    setErrors({ email: error.message });
                } else {
                    console.error('Error durante el registro:', error);
                    setServerError('Hubo un problema con el registro. Inténtalo de nuevo.');
                }
            });
    };

    const handleResendConfirmation = () => {
        fetch('http://localhost:3000/resendConfirmation', { // agregar nueva url ngrock
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al reenviar el correo de confirmación.');
                }
                return response.json();
            })
            .then(() => {
                alert('Correo reenviado con éxito. Por favor, revisa tu bandeja de entrada.');
                setCanResend(false);

                // Habilitar el reenvío después de otros 60 segundos
                setTimeout(() => {
                    setCanResend(true);
                }, 60000);
            })
            .catch((error) => {
                console.error('Error al reenviar el correo de confirmación:', error);
                alert('Hubo un problema al intentar reenviar el correo.');
            });
    };

    return (
        <div className="register-form-container">
            <h2>Registrarse</h2>
            {serverError && <div className="error-message">{serverError}</div>}
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmpassword(event.target.value)}
                        required
                    />
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
                <button type="submit">Registrarse</button>
            </form>

            {confirmationMessage && (
                <div className="confirmation-message">
                    <p>{confirmationMessage}</p>
                    {canResend && (
                        <button onClick={handleResendConfirmation} className="resend-button">
                            Reenviar correo de confirmación
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Register;
