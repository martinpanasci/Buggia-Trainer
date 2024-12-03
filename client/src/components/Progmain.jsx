import React from "react";
import './styles/Progmain.css'
import { useCart } from "./CartContext";

const Progmain = ({ data }) => {
    const { addToCart } = useCart();
    

    if (!data || data.length === 0) {
      return <p>No hay programas disponibles.</p>;
    }

    return (
        <section className="main-section">
            <div className="main container">
                <div className="programa-img">
                    <img src={data.image} alt={data.name} />
                </div>
                <div className="programa-info">
                    <h3>{data.name}</h3>
                    <p>{data.description}</p>
                    <ul>
                        {data.categories.map((category, index) => (
                            <li key={index} className={index % 2 === 0 ? 'catg-even' : 'catg-odd'}>
                                <h5>{category.trim()}</h5>
                            </li>
                        ))}
                    </ul>
                    <h4>${data.price}</h4>
                    <button className="btn-comprar" onClick={() => addToCart(data)}>Agregar al carrito</button>
                </div>
            </div>
        </section>
    );
}

export default Progmain;