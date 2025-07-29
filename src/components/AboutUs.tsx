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
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem', 
          marginTop: '3rem' 
        }}>
          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem', 
            background: 'rgba(255, 255, 255, 0.7)', 
            borderRadius: '1rem',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>🚀 Innovación</h3>
            <p style={{ fontSize: '0.95rem', margin: 0 }}>
              Adoptamos las últimas tecnologías para crear soluciones que marquen la diferencia
            </p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem', 
            background: 'rgba(255, 255, 255, 0.7)', 
            borderRadius: '1rem',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>⚡ Escalabilidad</h3>
            <p style={{ fontSize: '0.95rem', margin: 0 }}>
              Desarrollamos software que crece junto con tu negocio
            </p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem', 
            background: 'rgba(255, 255, 255, 0.7)', 
            borderRadius: '1rem',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>🤝 Compromiso</h3>
            <p style={{ fontSize: '0.95rem', margin: 0 }}>
              Tu éxito es nuestro éxito. Trabajamos como tu socio tecnológico
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
