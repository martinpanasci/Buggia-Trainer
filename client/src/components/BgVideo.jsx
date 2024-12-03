import React from 'react';
import './styles/Bgvideo.css';
import bgVideo from '../assets/videos/bg.mp4';

function BgVideo() {
    return (
        <section className="header-bg">
            <video autoPlay loop muted className="back-video">
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div className="header-content container">
                <div className="header-txt">
                    <h1>BUGGIA Trainer</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odit ullam porro dolore esse tempore perspiciatis,
                        suscipit dignissimos vero odio vel vitae iste praesentium
                        nostrum quaerat laudantium nisi delectus repudiandae tempora.
                    </p>
                    <a href="/test" className="btn-1">Selector de Programas</a>
                </div>
            </div>
        </section>
    );
}

export default BgVideo;



