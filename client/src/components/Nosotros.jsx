import React from 'react';
import './styles/Nosotros.css';
import t1 from '../assets/images/t1.jpg';
import t2 from '../assets/images/t2.jpg';

const Nosotros = () => {
    return(
        <section className="info-2">
        <div className="info-content container">
            <h2>Nosotros</h2>
            <div className="testi">
                <div className="testi-left">
                    <div className="testi-txt">
                        <img src={t1} alt="t1"/>
                        <h3>Lorem</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Odit ullam porro dolore esse tempore perspiciatis,
                            suscipit dignissimos vero odio vel vitae iste praesentium
                            nostrum quaerat laudantium nisi delectus repudiandae tempora.
                        </p>
                    </div>
                </div>
                <div className="testi-right">
                    <div className="testi-txt">
                        <img src={t2} alt="t2"/>
                        <h3>Lorem</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Odit ullam porro dolore esse tempore perspiciatis,
                            suscipit dignissimos vero odio vel vitae iste praesentium
                            nostrum quaerat laudantium nisi delectus repudiandae tempora.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>        
    )
}

export default Nosotros;