import React from "react";
import './styles/Productos.css'
import img1 from '../assets/images/g1.jpg';
import img2 from '../assets/images/g2.jpg';
import img3 from '../assets/images/g3.jpg';
import img4 from '../assets/images/g4.jpg';
import img5 from '../assets/images/g5.jpg';
import img6 from '../assets/images/g6.jpg';

export const productsaray = [
    {
        id: 1,
        imgSrc: img1,
        title: "Producto 1",
        details: "hombre, musculo, 5, full-body, intermedio",
        genero: "hombre", 
        objetivo: "musculo", 
        dias: "5", 
        tipo: "full-body", 
        experiencia: "intermedio" 
    },
    {
        id: 2,
        imgSrc: img2,
        title: "Producto 2",
        details: "hombre, ambos, 4, full-body, intermedio",
        genero: "hombre", 
        objetivo: "ambos", 
        dias: "4", 
        tipo: "full-body", 
        experiencia: "intermedio"
    },
    {
        id: 3,
        imgSrc: img3,
        title: "Producto 3",
        details: "hombre, fuerza, 3, upper-lower, avanzado",
        genero: "hombre", 
        objetivo: "fuerza", 
        dias: "3", 
        tipo: "upper-lower", 
        experiencia: "avanzado"
    },
    {
        id: 4,
        imgSrc: img4,
        title: "Producto 4",
        details: "mujer, musculo, 4, upper-lower, intermedio",
        genero: "mujer", 
        objetivo: "musculo", 
        dias: "4", 
        tipo: "upper-lower", 
        experiencia: "intermedio"
    },
    {
        id: 5,
        imgSrc: img5,
        title: "Producto 5",
        details: "mujer, musculo, 5, full-body, principiante",
        genero: "mujer", 
        objetivo: "musculo", 
        dias: "5", 
        tipo: "full-body", 
        experiencia: "principiante"
    },
    {
        id: 6,
        imgSrc: img6,
        title: "Producto 6",
        details: "mujer, fuerza, 3, push-pull-legs, intermedio",
        genero: "mujer", 
        objetivo: "fuerza", 
        dias: "3", 
        tipo: "push-pull-legs", 
        experiencia: "intermedio"
    },    
    // Agrega más productos según sea necesario
];

export const filterProducts = (products, filters) => {
    return products.filter(product => {
        return (
            (filters.genero.length === 0 || filters.genero.includes(product.genero)) &&
            (filters.objetivo.length === 0 || filters.objetivo.includes(product.objetivo)) &&
            (filters.dias.length === 0 || filters.dias.includes(product.dias)) &&
            (filters.tipo.length === 0 || filters.tipo.includes(product.tipo)) &&
            (filters.experiencia.length === 0 || filters.experiencia.includes(product.experiencia))
        );
    });
};

const Productos = ({ products }) => {
    return (
        <section className="product-section">
            <div className="container">
                <div className="products-grid">
                    {products.map(product => (
                        <div className="product" key={product.id}>
                            <a href={`programa/${product.id}`}>
                                <div className="product-image">
                                    <img src={product.imgSrc} alt={product.title} />
                                    <div className="product-details">
                                        <p>{product.details}</p>
                                    </div>
                                </div>
                                <h3>{product.title}</h3>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Productos;