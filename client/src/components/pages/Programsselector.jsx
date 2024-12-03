import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filtros from '../Filtros';
import Productos, { filterProducts } from '../Productos';
import '../styles/Selector.css';

function Selector() {
    const [products, setProducts] = useState([]); // Todos los programas
    const [filteredProducts, setFilteredProducts] = useState([]); // Programas filtrados

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getAllPrograms');
               setProducts(response.data);
                setFilteredProducts(response.data); // Mostrar todos por defecto
                console.log(response.data);
            } catch (error) {
                console.error('Error al cargar los programas:', error);
            }
        };

        fetchPrograms();
    }, []);

    
    const handleFilter = (filters) => {
        const filtered = filterProducts(products, filters);
        setFilteredProducts(filtered);
    };
    

    return (
        <div className='selector-container'>                  
            <Filtros onFilter={handleFilter} />            
            <Productos products={filteredProducts} />
        </div>
    );
}

export default Selector;
