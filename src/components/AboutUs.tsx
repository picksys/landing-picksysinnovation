import '../styles/Components.css';

function AboutUs() {
  return (
    <section id="about-us" className="about-us">
      <div className="about-us-content">
        <h2>Sobre Nosotros</h2>
        <p>
          En <strong>Picksys Innovation</strong>, somos un equipo apasionado por la tecnología y la innovación. 
          Fundados en 2023 en San Juan, Argentina, nos especializamos en el desarrollo de 
          <strong> Software as a Service (SaaS)</strong> y <strong>Chatbots inteligentes</strong> que transforman 
          la manera en que las empresas operan y se conectan con sus clientes.
        </p>
        <p>
          Nuestra misión es empoderar a emprendedores y empresas de todos los tamaños proporcionando 
          soluciones de software personalizadas, escalables y de alta calidad. Creemos en la potencia 
          de la tecnología cloud y la inteligencia artificial para revolucionar los procesos empresariales.
        </p>
        <p>
          Aspiramos a ser líderes en la industria del desarrollo de software, destacándonos por nuestra 
          innovación en SaaS y automatización inteligente, nuestro compromiso con la excelencia y nuestra 
          capacidad para adaptarnos a las necesidades cambiantes del mercado digital.
        </p>
        <div className="about-values-grid">
          <div className="about-value-card">
            <div className="about-value-icon">🚀</div>
            <h3>Innovación</h3>
            <p>
              Adoptamos las últimas tecnologías para crear soluciones que marquen la diferencia
            </p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon">⚡</div>
            <h3>Escalabilidad</h3>
            <p>
              Desarrollamos software que crece junto con tu negocio
            </p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon">🤝</div>
            <h3>Compromiso</h3>
            <p>
              Tu éxito es nuestro éxito. Trabajamos como tu socio tecnológico
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
