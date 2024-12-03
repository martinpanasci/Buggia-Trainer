import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/FormHeader.css';

const SecondHeader = () => {
    const location = useLocation();
  
    return (      
      <header className="second-header">
        
        <nav className="second-header__nav">
          <Link
            to="/form"
            className={`second-header__link ${
              location.pathname === "/form" ? "second-header__link--active" : ""
            }`}
          >
            Cargar rutina
          </Link>
          <Link
            to="/schedule"
            className={`second-header__link ${
              location.pathname === "/schedule" ? "second-header__link--active" : ""
            }`}
          >
            Organizar rutina
          </Link>
          <Link
            to="/viewroutines"
            className={`second-header__link ${
              location.pathname === "/viewroutines" ? "second-header__link--active" : ""
            }`}
          >
            Visualizar rutinas
          </Link>
          <Link
            to="/Assignroutine"
            className={`second-header__link ${
              location.pathname === "/Assignroutine" ? "second-header__link--active" : ""
            }`}
          >
            Asignar rutinas
          </Link>
          <Link
            to="/ProgramForm"
            className={`second-header__link ${
              location.pathname === "/ProgramForm" ? "second-header__link--active" : ""
            }`}
          >
            Cargar Programa
          </Link>
          <Link
            to="/deletePrograms"
            className={`second-header__link ${
              location.pathname === "/deletePrograms" ? "second-header__link--active" : ""
            }`}
          >
            Borrar Programa
          </Link>
        </nav>
      </header>
    );
  };

export default SecondHeader;
