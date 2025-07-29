import '../styles/Components.css';
import adanImage from '../assets/adan.png';

function Specialties() {
  const specialties = [
    {
      id: 1,
      icon: "☁️",
      title: "Software as a Service (SaaS)",
      description: "Desarrollamos aplicaciones web escalables y seguras que se ejecutan en la nube, permitiendo a nuestros clientes acceder a sus herramientas desde cualquier lugar y dispositivo.",
      features: [
        "Arquitectura multi-tenant",
        "Escalabilidad automática",
        "Seguridad empresarial",
        "APIs RESTful",
        "Panel de administración",
        "Analíticas en tiempo real",
        "Integraciones personalizadas",
        "Soporte 24/7"
      ]
    },
    {
      id: 2,
      icon: "🤖",
      title: "Chatbots Inteligentes",
      description: "Creamos asistentes virtuales sofisticados que pueden integrarse con sistemas existentes, automatizar procesos y brindar atención al cliente personalizada las 24 horas.",
      features: [
        "Procesamiento de lenguaje natural (NLP)",
        "Integración con CRM y ERP",
        "Aprendizaje automático",
        "Soporte multicanal",
        "Análisis de sentimientos",
        "Escalación inteligente",
        "Base de conocimientos dinámica",
        "Métricas de conversación"
      ]
    }
  ];

  return (
    <section 
      id="specialties" 
      className="specialties"
    >
      {/* Imagen de fondo */}
      <div 
        className="specialties-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${adanImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          opacity: 0.3
        }}
      ></div>
      
      {/* Overlay semitransparente */}
      <div 
        className="specialties-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%)',
          zIndex: 1
        }}
      ></div>
      <div className="specialties-content">
        <h2>Nuestras Especialidades</h2>
        <p className="specialties-subtitle">
          Nos especializamos en el desarrollo de soluciones SaaS robustas y chatbots inteligentes 
          que transforman la manera en que las empresas operan y se relacionan con sus clientes.
        </p>
        <div className="specialties-grid">
          {specialties.map(specialty => (
            <div key={specialty.id} className="specialty-card">
              <div className="specialty-icon">{specialty.icon}</div>
              <h3>{specialty.title}</h3>
              <p>{specialty.description}</p>
              <ul className="specialty-features">
                {specialty.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specialties;
