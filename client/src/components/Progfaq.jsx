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




//const faqData = [
//    {
//        question: "¿Cuál es la política de devoluciones?",
//        answer: "Ofrecemos una política de devolución de 30 días para todos los productos no utilizados y en su embalaje original."
//    },
//    {
//        question: "¿Cuánto tiempo tarda el envío?",
//        answer: "El tiempo de envío varía según la ubicación, pero generalmente toma entre 3 y 7 días hábiles."
//    },
//    {
//        question: "¿Los productos tienen garantía?",
//        answer: "Sí, todos nuestros productos cuentan con una garantía de 1 año a partir de la fecha de compra."
//    },
//    {
//        question: "¿Puedo cambiar un producto por otro?",
//        answer: "Sí, puedes cambiar productos siempre y cuando no hayan sido utilizados y estén en su embalaje original."
//    }
//];