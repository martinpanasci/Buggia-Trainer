import React, { useState } from 'react';
import './styles/Filtros.css';

const Filtros = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        genero: [],
        objetivo: [],
        dias: [],
        tipo: [],
        experiencia: []
    });  

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;

        setFilters((prevFilters) => {
            const updatedCategory = checked
                ? [...prevFilters[name], value] // Agregar valor si está marcado
                : prevFilters[name].filter((item) => item !== value); // Quitar valor si está desmarcado

            return { ...prevFilters, [name]: updatedCategory };
        });
    };

    const handleFilterClick = () => { onFilter(filters); };

    const handleClearFilters = () => {
        const clearedFilters = {
            genero: [],
            objetivo: [],
            dias: [],
            tipo: [],
            experiencia: []
        };
        setFilters(clearedFilters);
        onFilter(clearedFilters); // También notifica al componente padre para actualizar los productos
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);    

    return (
        <section className="sidebar-section">
            <div className="sidebar">
                <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    ☰ Filtros
                </button>
                <div className={`sidebar-content ${isSidebarOpen ? "active" : ""}`}>
                    <h2>Filtros</h2>                    
                    <form id="filter-form">                        
                        <fieldset>
                            <legend>Programas para:</legend>
                            <label>
                                <input
                                    type="checkbox"
                                    name="genero"
                                    value="hombre"
                                    checked={filters.genero.includes("hombre")}
                                    onChange={handleCheckboxChange}
                                /> Hombre
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="genero"
                                    value="mujer"
                                    checked={filters.genero.includes("mujer")}
                                    onChange={handleCheckboxChange}
                                /> Mujer
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Objetivos, quiero ganar:</legend>
                            <label>
                                <input
                                    type="checkbox"
                                    name="objetivo"
                                    value="fuerza"
                                    checked={filters.objetivo.includes("fuerza")}
                                    onChange={handleCheckboxChange}
                                /> Fuerza
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="objetivo"
                                    value="musculo"
                                    checked={filters.objetivo.includes("musculo")}
                                    onChange={handleCheckboxChange}
                                /> Músculo
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="objetivo"
                                    value="ambos"
                                    checked={filters.objetivo.includes("ambos")}
                                    onChange={handleCheckboxChange}
                                /> Ambos
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Cantidad de días que puedo entrenar:</legend>
                            <label>
                                <input
                                    type="checkbox"
                                    name="dias"
                                    value="3"
                                    checked={filters.dias.includes("3")}
                                    onChange={handleCheckboxChange}
                                /> 3
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="dias"
                                    value="4"
                                    checked={filters.dias.includes("4")}
                                    onChange={handleCheckboxChange}
                                /> 4
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="dias"
                                    value="5"
                                    checked={filters.dias.includes("5")}
                                    onChange={handleCheckboxChange}
                                /> 5
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="dias"
                                    value="6"
                                    checked={filters.dias.includes("6")}
                                    onChange={handleCheckboxChange}
                                /> 6
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Tipo de Rutina:</legend>
                            <label>
                                <input
                                    type="checkbox"
                                    name="tipo"
                                    value="full-body"
                                    checked={filters.tipo.includes("full-body")}
                                    onChange={handleCheckboxChange}
                                /> Full Body
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="tipo"
                                    value="push-pull-legs"
                                    checked={filters.tipo.includes("push-pull-legs")}
                                    onChange={handleCheckboxChange}
                                /> Push/Pull/Legs
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="tipo"
                                    value="upper-lower"
                                    checked={filters.tipo.includes("upper-lower")}
                                    onChange={handleCheckboxChange}
                                /> Upper/Lower
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Experiencia:</legend>
                            <label>
                                <input
                                    type="checkbox"
                                    name="experiencia"
                                    value="principiante"
                                    checked={filters.experiencia.includes("principiante")}
                                    onChange={handleCheckboxChange}
                                /> Principiante
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="experiencia"
                                    value="intermedio"
                                    checked={filters.experiencia.includes("intermedio")}
                                    onChange={handleCheckboxChange}
                                /> Intermedio
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="experiencia"
                                    value="avanzado"
                                    checked={filters.experiencia.includes("avanzado")}
                                    onChange={handleCheckboxChange}
                                /> Avanzado
                            </label>
                        </fieldset>
                        <button className='btn-apply' type="button" onClick={handleFilterClick}>
                            Aplicar Filtros
                        </button>
                        <button className='btn-clear' type="button" onClick={handleClearFilters}>
                            Limpiar Filtros
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Filtros;
