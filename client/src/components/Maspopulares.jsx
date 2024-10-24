import React from 'react';
import './styles/Maspopulares.css';
import Prog1Image from '../assets/images/g1.jpg';
import Prog2Image from '../assets/images/g2.jpg';
import Prog3Image from '../assets/images/g3.jpg';
import Prog4Image from '../assets/images/g4.jpg';



const Maspopulares = () => {
    return(
        <section className="general">
        <h2>programas mas populares</h2>
        <div className="general-content container">
            <div className="general-1 txt" style={{ backgroundImage: `url(${Prog1Image})` }}>
                <a href="/#">
                    <h3>programa 1</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odit ullam porro dolore esse tempore perspiciatis,
                    </p>                                                      
                </a>
            </div>
            <div className="general-2 txt" style={{ backgroundImage: `url(${Prog2Image})` }}>
                <a href="/#">
                    <h3>programa 2</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odit ullam porro dolore esse tempore perspiciatis,
                    </p>                                                      
                </a>
            </div>
            <div className="general-3 txt" style={{ backgroundImage: `url(${Prog3Image})` }}>
                <a href="/#">
                    <h3>programa 3</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odit ullam porro dolore esse tempore perspiciatis,
                    </p>                                                      
                </a>
            </div>
            <div className="general-4 txt" style={{ backgroundImage: `url(${Prog4Image})` }}>
                <a href="/#">
                    <h3>programa 4</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odit ullam porro dolore esse tempore perspiciatis,
                    </p>                                                      
                </a>
            </div>
        </div>
    </section>
    )
}


export default Maspopulares;