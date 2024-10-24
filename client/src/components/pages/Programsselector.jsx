import React, { useState } from 'react';
import Filtros from '../Filtros';
import Productos, { productsaray, filterProducts } from '../Productos';
import '../styles/Selector.css';


function Selector() {
    const [filteredProducts, setFilteredProducts] = useState(productsaray);

    const handleFilter = (filters) => {
        const filtered = filterProducts(productsaray, filters);
        setFilteredProducts(filtered);
    };

    return (
        <div className='selector-container'>
            <Filtros onFilter={handleFilter} />
            <Productos products={filteredProducts} />
        </div>
    );
};

export default Selector;