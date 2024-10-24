import React, { useState } from "react";
import './styles/Register.css'
import { useNavigate } from "react-router-dom";

function Register() {   

    const [name, setName] = useState();
    const [email, setEmail] = useState();    
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmpassword] = useState();

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenimos el refresco de la página
        const data={
            name: name,
            email: email,
            password: password,
        }
        
     
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log({data});
        
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            })
        })
        .then(response=> {
            if (response.ok) {  // Verifica si el registro fue exitoso
                return response.json();  // Procesa la respuesta JSON si el registro fue exitoso
            } else {
                throw new Error("Registro fallido");
            }
            })
            .then(result => {  
                console.log("Registro exitoso", result);
                alert("Registro exitoso");              
                navigate('/login');
            })
            .catch(error =>{
                console.error("Error durante el registro:", error);
            alert("Hubo un problema con el registro. Inténtalo de nuevo.");
            }) 
        
    };

    return (
        <div className="register-form-container">
            <h2>Registrarse</h2>
            <form className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(event)=>{setName(event.target.value)}}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event)=>{setEmail(event.target.value)}}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event)=>{setPassword(event.target.value)}}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(event)=>{setConfirmpassword(event.target.value)}}
                        required
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
