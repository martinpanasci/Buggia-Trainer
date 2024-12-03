import React from "react";
import './styles/Productos.css'
import { useCart } from "./CartContext";

export const filterProducts = (products, filters) => {
    
    return products.filter((product) => {
        const productFilters = product.filters;

        return (
            (filters.genero.length === 0 || filters.genero.some((f) => productFilters.genero?.includes(f))) &&
            (filters.objetivo.length === 0 || filters.objetivo.some((f) => productFilters.objetivo?.includes(f))) &&
            (filters.dias.length === 0 || filters.dias.some((f) => productFilters.dias?.includes(f))) &&
            (filters.tipo.length === 0 || filters.tipo.some((f) => productFilters.tipo?.includes(f))) &&
            (filters.experiencia.length === 0 || filters.experiencia.some((f) => productFilters.experiencia?.includes(f)))
        );
    });
};


const Productos = ({ products }) => {
    const { addToCart } = useCart();
    
    if (products.length === 0) {
        return <p>No hay productos disponibles para los filtros seleccionados.</p>;
    }
    
    return (
        <section className="product-section">                      
            <div className="container">
                <div className="products-grid">
                    {products.map(product => (
                        <div className="product" key={product.id}>
                            <a href={`programa/${product.routine_id}`}>
                                <div className="product-image">
                                    <img src={product.image} alt={product.description} />                                    
                                </div>
                                <h3>{product.name}</h3>
                            </a> 
                            <div className="product-info">
                                <span className="product-price">${product.price}</span>
                                <button 
                                    className="btn-add-cart-productos" 
                                    onClick={() => addToCart(product)}
                                >
                                    Agregar al carrito
                                </button>
                            </div>                            
                        </div>
                                               
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Productos;