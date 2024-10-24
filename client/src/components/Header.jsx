import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Header.css'; 
import menuIcon from '../assets/images/menu.png';
import carrito from '../assets/images/carrito.png';


function Header() {

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLoginRedirect = () => {
    if (isAuthenticated) {
      navigate('/welcome'); // Redirigir a la página de bienvenida
    } else {
      navigate('/login'); // Redirigir a la página de login
    }
  };

  return (
    <header className="header">
      <div className="menu">
        <div className="menu-bg"></div>
        <div className="container">
          <a href="/" className="logo">logo</a>
          <input type="checkbox" id="menu" />
          <label htmlFor="menu"> <img src={menuIcon} className="menu-icono" alt="Menu" /> </label>
          <nav className="navbar">
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/programas">Programas</a></li>
              <li><a href="/test">Test</a></li>
              <li><a href="/alimentacion">Planes de Alimentación</a></li>
              <li><a href="/carrito"><img src={carrito} alt="Carrito"/></a></li>               
              <li>
                {!isAuthenticated ? (
                  <>
                    <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>Login</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                  </>
                ) : (
                  <button onClick={handleLoginRedirect}>Cuenta</button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

