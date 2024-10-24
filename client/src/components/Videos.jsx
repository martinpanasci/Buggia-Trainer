import React from 'react';
import './styles/Videos.css';
import video1 from '../assets/videos/f1.mp4';  
import video2 from '../assets/videos/f2.mp4';  

function Videos() {
  return (
    <section className="videos container">
      <h2>Videos</h2>
      <div className="videos-content">
        <div className="videos-1">
          <video controls>
            <source src={video1} type="video/mp4" />
          </video>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="videos-2">
          <video controls>
            <source src={video2} type="video/mp4" />
          </video>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Videos;
