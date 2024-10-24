import React, {useState} from "react";
import './styles/LoginForm.css'
import { useNavigate } from "react-router-dom";


function LoginForm() {

    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const navigate = useNavigate();
    
    const handdlelogin = (e) =>{
        e.preventDefault();
        const data ={
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
        .then(response=> response.json())
            .then(result => {                  
                if(result.token){
                    localStorage.setItem('token', result.token)
                    navigate('/welcome');
                }          
            })
            .catch(error =>{
                console.log(error)
            })
    }

    return(
        <div className="login-form-container">
            <h2>Iniciar sesión</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input onChange={(event)=>{setUsername(event.target.value)}}
                           type="email"
                           id="email"
                           name="email"
                           required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input onChange={(event)=>{setPassword(event.target.value)}}
                           type="password"
                           id="password"
                           name="password"
                           required />
                </div>
                <button onClick={handdlelogin}>Iniciar Sesión</button>
                <div className="forgot-password">
                    <a href="/forgot-password">Olvidaste tu contraseña?</a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;