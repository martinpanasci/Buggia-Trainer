import React from "react";
import './styles/Progmain.css'


const Progmain = ({ data }) => {

    // Función para agregar al carrito
    const handleAddToCart = (program) => {
        // Recuperar el carrito actual desde localStorage o inicializarlo
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar si el producto ya está en el carrito
        const isProductInCart = carrito.some(item => item.id === program.id);

        // Si no está en el carrito, lo agregamos
        if (!isProductInCart) {
            carrito.push(program);
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardamos el carrito actualizado
            alert('Producto agregado al carrito');
        } else {
            alert('Este producto ya está en tu carrito.');
        }
    };

    if (!data || data.length === 0) {
      return <p>No hay programas disponibles.</p>;
    }

    return (
        <section className="main-section">
            {data.map((program, index) => (
                <div key={index} className="main container">
                    <div className="programa-img">
                        <img src={program.image} alt={program.name} />
                    </div>
                    <div className="programa-info">
                        <h3>{program.name}</h3>
                        <p>{program.description}</p>
                        <ul>
                            {program.categories.map((category, catIndex) => (
                                <li key={catIndex} className={catIndex % 2 === 0 ? 'catg-even' : 'catg-odd'}>
                                    <h5>{category}</h5>
                                </li>
                            ))}
                        </ul>
                        <h4>{program.price}</h4>
                        <button className="btn-comprar" onClick={() => handleAddToCart(program)}>Comprar</button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Progmain;