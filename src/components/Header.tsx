import logo2 from '../assets/logo2.png';

function Header() {
  return (
    <header>
      
      <div className="logo">
      <img src={logo2}  width="120" height="60" />
      </div>
      <nav>
        <ul>
          <li><a href="#hero">Inicio</a></li>
          <li><a href="#about-us">Nosotros</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
