import '../styles/Components.css';
import logo2 from '../assets/logo2.png';

function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Elementos decorativos de fondo */}
      <div className="hero-bg-gradient"></div>
      <div className="hero-bg-pattern"></div>
      <div className="hero-floating-shapes">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>
      
      <div className="hero-content">
        <span className="hero-badge">🚀 Innovación Tecnológica</span>
        <h1>Transformamos Ideas en Soluciones Digitales</h1>
        <p>
          Especialistas en desarrollo de <strong>SaaS</strong>, <strong>Chatbots con IA</strong> y 
          soluciones tecnológicas personalizadas para empresas que buscan liderar su industria.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="cta-button">
            <span>Comenzar Proyecto</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#about-us" className="cta-button-secondary">
            Conocer Más
          </a>
        </div>
        <div className="hero-logo">
          <img src={logo2} alt="Picksys Innovation Logo" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
