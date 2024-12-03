import React, { useState } from 'react';
import './styles/Progfaq.css'; 

const Faq = ({ faqs }) => {
    // Estado para controlar qué preguntas están activas
    const [activeIndex, setActiveIndex] = useState(null);

    // Función para manejar el click en las preguntas
    const toggleFaq = (index) => {        
        setActiveIndex(activeIndex === index ? null : index);
    };

    
    return (
        <section className="faq">
            <div className="container">
                <h2>Preguntas frecuentes</h2>
                {faqs.map((faq, index) => (
                    <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                        <button className="faq-question" onClick={() => toggleFaq(index)}>
                            {faq.question}
                            <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
                        </button>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faq;