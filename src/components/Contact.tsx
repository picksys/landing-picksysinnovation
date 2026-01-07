import '../styles/Components.css';

function Contact() {

  return (
    <section id="contact" className="contact">
      <h2>Contacto</h2>
      <p className="contact-subtitle">
        ¿Listo para transformar tu negocio? Contáctanos y te ayudaremos a hacer realidad tu proyecto.
      </p>
      <form 
        action="https://formspree.io/f/xyzgvzeq" 
        method="POST"
      >
        <div className="form-row">
          <input type="text" name="name" placeholder="Nombre" required />
          <input type="text" name="lastName" placeholder="Apellido" required />
        </div>
        <div className="form-row">
          <input type="tel" name="phone" placeholder="Teléfono" required />
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <input type="text" name="company" placeholder="Empresa" required />
        <textarea name="description" placeholder="Cuéntanos sobre tu proyecto..." required />
        <button type="submit">
          <span>Enviar mensaje</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </section>
  );
}

export default Contact;
