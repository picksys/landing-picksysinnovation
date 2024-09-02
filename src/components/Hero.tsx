import logo1 from '../assets/logo1.png';

function Hero() {
  return (
    <section id="hero" className="hero">
      <h1>Bienvenido a Picksys Innovation</h1>
      <p>Soluciones de software a medida para empresas de todos los tamaños.</p>
      <img src={logo1} />
    </section>
  );
}

export default Hero;
