import { useState } from 'react';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import NetworkAnimation from './NetworkAnimation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={isMenuOpen ? 'header-menu-open' : ''}>
      <NetworkAnimation />
      <div className="logo">
        <img 
          src={isMenuOpen ? logo2 : logo1} 
          width="120" 
          height="60" 
          alt="Picksys Innovation Logo"
          className="logo-img" 
        />
      </div>
      
      {/* Botón hamburguesa */}
      <button 
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menú de navegación */}
      <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
        <ul>
          <li><a href="#hero" onClick={closeMenu}>Inicio</a></li>
          <li><a href="#about-us" onClick={closeMenu}>Nosotros</a></li>
          <li><a href="#specialties" onClick={closeMenu}>Especialidades</a></li>
          <li><a href="#services" onClick={closeMenu}>Servicios</a></li>
          <li><a href="#products" onClick={closeMenu}>Productos</a></li>
          <li><a href="#clients" onClick={closeMenu}>Clientes</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contacto</a></li>
        </ul>
      </nav>

      {/* Overlay para cerrar el menú */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
}

export default Header;
