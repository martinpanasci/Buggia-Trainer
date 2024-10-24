import React from "react";
import './styles/Progdetails.css'


const Progdetails = ({ details }) => {
    // Verifica si hay detalles disponibles
    if (!details || details.length === 0) {
        return <p>No hay detalles disponibles.</p>;
    }

    return (
        <section className="details">
            <div className="container">
                <h2>¿Qué incluye?</h2>
                <div className="details-wrapper">
                    {details.map((detailss, index) => (
                        <div key={index} className="details-cards">
                            {/* Asegúrate de que cada detalle tenga una imagen y descripción */}
                            <img src={detailss.image} alt={`Detalle ${index + 1}`} />
                            <p>{detailss.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Progdetails;