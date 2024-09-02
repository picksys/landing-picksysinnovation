import ServiceItem from './ServiceItem';

function Services() {
  const services = [
    {
      title: "Desarrollo a medida",
      description: "Creamos software personalizado según las necesidades de tu negocio.",
      details: "En nuestra empresa, entendemos que cada negocio es único. Por eso, ofrecemos soluciones de software a medida que se adaptan perfectamente a tus requerimientos específicos. Desde la fase de análisis hasta el desarrollo y la implementación, trabajamos estrechamente contigo para asegurarnos de que el software no solo cumpla con tus expectativas, sino que también impulse la eficiencia y productividad de tu empresa. Ya sea que necesites un sistema complejo o una herramienta específica, nuestro equipo está preparado para entregar un producto que se ajuste a tus necesidades exactas."
    },
    {
      title: "Consultoría",
      description: "Asesoramiento experto en la implementación de soluciones tecnológicas.",
      details: "Nuestro servicio de consultoría está diseñado para ayudarte a tomar decisiones informadas sobre la tecnología que mejor se adapta a tu negocio. Analizamos tus procesos actuales, identificamos áreas de mejora y te guiamos en la implementación de soluciones tecnológicas que optimicen tus operaciones. La automatización de procesos es uno de nuestros enfoques principales, permitiendo que tu empresa sea más ágil y eficiente. Te proporcionamos recomendaciones basadas en las mejores prácticas y en nuestro profundo conocimiento del sector para garantizar que obtengas el máximo valor de tus inversiones tecnológicas."

    },
    {
      title: "Soporte técnico",
      description: "Brindamos soporte continuo para garantizar que tus sistemas funcionen sin problemas.",
      details: "Nuestro soporte técnico está diseñado para mantener tus sistemas operando sin contratiempos. Ofrecemos asistencia continua para resolver cualquier problema técnico que puedas enfrentar, desde el mantenimiento preventivo hasta la resolución de incidencias imprevistas. Nuestro equipo de expertos está disponible para responder a tus consultas y proporcionar soluciones rápidas y efectivas, asegurando que tu negocio nunca se detenga. La proactividad y la rapidez en la respuesta son clave para minimizar el tiempo de inactividad y maximizar la estabilidad de tus sistemas."
    },
    {
      title: "Apoyo a emprendedores y pymes",
      description: "Facilitamos el desarrollo de software a medida para emprendedores y pequeñas empresas con potencial.",
      details: "En nuestra empresa, estamos comprometidos con el apoyo a emprendedores y pequeñas empresas que tienen grandes ideas pero quizás no el presupuesto completo para desarrollarlas. Evaluamos cada propuesta de proyecto, determinamos su viabilidad en el mercado y, si encontramos potencial, ofrecemos descuentos significativos en el desarrollo del software. Además, buscamos oportunidades para vender el software a otras empresas similares, lo que puede ayudar a financiar tu proyecto y ampliar su impacto. Trabajamos contigo para asegurar que tu idea no solo se haga realidad, sino que también tenga el potencial de ser un éxito en el mercado."
    }
  ];

  return (
    <section id="services" className="services">
      <h2>Nuestros Servicios</h2>
      <div className="service-list">
        {services.map(service => (
          <div key={service.title}>
            <ServiceItem
              title={service.title}
              description={service.description}
              details={service.details}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
