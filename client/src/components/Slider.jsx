import React from 'react';
import Slider from 'react-slick';
import './styles/Slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import programsData from '../data/programsData';



function MultipleItems() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1200, // Cambia el número de slides para pantallas grandes (por ejemplo, tablets en landscape)
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 991, // Cambia el número de slides para pantallas medianas (por ejemplo, tablets en portrait)
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768, // Cambia el número de slides para pantallas pequeñas (por ejemplo, teléfonos)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };



    return (
        <div className="slider-container">
            <h2>Programas</h2>
            <div className='container'>
                <Slider {...settings}>
                    {programsData.map(program => (
                        <div key={program.id} className="carousel-card">
                            <a href={`/programa/${program.id}`}>
                                <h4>{program.data[0].name} <small>{program.data[0].description} </small></h4>
                                <img src={program.data[0].image} alt={`Imagen ${program.data[0].name}`} />
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default MultipleItems;
