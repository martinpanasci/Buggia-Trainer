import React, { useState } from "react";
import './styles/LoginForm.css';
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username) {
            newErrors.username = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(username)) {
            newErrors.username = "El correo electrónico no es válido.";
        }
        if (!password) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (password.length < 4) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
    };

    const handdleLogin = (e) => {
        e.preventDefault();
        setServerError(""); // Reinicia el mensaje de error del servidor
        if (!validateForm()) return;

        const data = {
            username: username,
            password: password
        };

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Credenciales incorrectas");
                }
                return response.json();
            })
            .then(result => {
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    navigate('/welcome');
                }
            })
            .catch(error => {
                setServerError(error.message || "Error al iniciar sesión");
            });
    };

    return (
        <div className="login-form-container">
            <h2>Iniciar sesión</h2>
            {serverError && <div className="error-message">{serverError}</div>}
            <form className="login-form" onSubmit={handdleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        onChange={(event) => setUsername(event.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        value={username}
                        required
                    />
                    {errors.username && <div className="error-message">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        required
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                <button type="submit">Iniciar Sesión</button>
                <div className="forgot-password">
                    <a href="/forgotPassword">¿Olvidaste tu contraseña?</a>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
