import logo2 from '../assets/logo2.png';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Bienvenido a Picksys Innovation</h1>
        <p>
          Transformamos ideas en soluciones tecnológicas innovadoras. 
          Especialistas en Inteligencia Artificial, SaaS y Chatbots inteligentes para empresas que buscan liderar su industria.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="cta-button">
            Comenzar Proyecto
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
