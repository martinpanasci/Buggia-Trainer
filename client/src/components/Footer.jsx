import React, { useState, useEffect }  from 'react';
import './styles/Footer.css'; // Importa el CSS específico para el Footer
import footerLogo from '../assets/images/bg.jpg'; // Importa la imagen
import facebookIcon from '../assets/images/facebook.png'; // Importa la imagen
import instagramIcon from '../assets/images/instagram.png'; // Importa la imagen
import xIcon from '../assets/images/x.png'; // Importa la imagen
import whatsappIcon from '../assets/images/whatsapp.png'; // Importa la imagen

function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) { // Mostrar el botón si se ha scrolleado más de 200px
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-left">
            <ul>
              <li><a href="/programas">Programas</a></li>
              <li><a href="/test">Test</a></li>
              <li><a href="/alimentacion">Planes de Alimentación</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-center">
            <img src={footerLogo} alt="Logo" className="footer-logo" />
          </div>
          <div className="footer-right">
            <a href="/#"><img src={facebookIcon} alt="Facebook" /> Facebook</a>
            <a href="/#"><img src={instagramIcon} alt="Instagram" /> Instagram</a>
            <a href="/#"><img src={xIcon} alt="X" /> X</a>
            <a href="/#"><img src={whatsappIcon} alt="WhatsApp" /> WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Botón para volver al inicio */}
      {showScrollButton && (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}

    </footer>
  );
}

export default Footer;