
import './styles/Components.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Clients from './components/Clients';
import Products from './components/Products';
import molineteVideo from './assets/molinete_largo.mp4';
import nodosVideo from './assets/nodos.mp4';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="video1">
        <video autoPlay muted loop playsInline>
          <source src={molineteVideo} type="video/mp4" />
        </video>
        <AboutUs />
        <Services />
      </div>
      <div className="video2">
        <video autoPlay muted loop playsInline>
          <source src={nodosVideo} type="video/mp4" />
        </video>
        <Clients />
        <Products />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
