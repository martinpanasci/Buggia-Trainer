import React from 'react';
import './styles/Tiers.css';
import tier1Image from '../assets/images/tier1.jpg';
import tier2Image from '../assets/images/tier2.jpg';
import tier3Image from '../assets/images/tier3.jpg';

const ServiciosSection = () => {
  return (
    <section className="servicios-section">
      <div className="container">
        <h2>servicios</h2>
        <div className="servicios-cards">
          <div className="servicios-t1" style={{ backgroundImage: `url(${tier1Image})` }}>
            <h3>tier 1</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore at quibusdam voluptas facilis ad accusantium eum iusto nostrum eius. Sit, nesciunt. Expedita aut sit quod quidem? Nulla eveniet dolore sequi.
            </p>
            <a href="/#" className="btn-3">ver más</a>
          </div>
          <div className="servicios-t2" style={{ backgroundImage: `url(${tier2Image})` }}>
            <h3>tier 2</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore at quibusdam voluptas facilis ad accusantium eum iusto nostrum eius. Sit, nesciunt. Expedita aut sit quod quidem? Nulla eveniet dolore sequi.
            </p>
            <a href="/#" className="btn-3">ver más</a>
          </div>
          <div className="servicios-t3" style={{ backgroundImage: `url(${tier3Image})` }}>
            <h3>tier 3</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore at quibusdam voluptas facilis ad accusantium eum iusto nostrum eius. Sit, nesciunt. Expedita aut sit quod quidem? Nulla eveniet dolore sequi.
            </p>
            <a href="/#" className="btn-3">ver más</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosSection;