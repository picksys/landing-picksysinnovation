import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario.
    console.log(formData);
  };

  return (
    <section id="contact" className="contact">
      <h2>Contacto</h2>
      <form 
        action="https://formspree.io/f/xyzgvzeq" 
        method="POST"
      >
        <input type="text" name="name" placeholder="Nombre" required />
        <input type="text" name="lastName" placeholder="Apellido" required />
        <input type="tel" name="phone" placeholder="Teléfono" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="text" name="company" placeholder="Empresa" required />
        <textarea name="description" placeholder="Descripción" required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contact;
