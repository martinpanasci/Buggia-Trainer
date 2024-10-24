import React from "react";
import LoginForm from '../LoginForm';
import '../styles/LoginContainer.css';

function LoginPage() {
    return (
        <div className='login-container'>            
            <LoginForm />                    
        </div>
    );
};

export default LoginPage;