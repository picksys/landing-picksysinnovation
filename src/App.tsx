
import './styles/Components.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Clients from './components/Clients';
import Products from './components/Products';
import Specialties from './components/Specialties';
import GlobalVideoBackground from './components/GlobalVideoBackground';

function App() {
  return (
    <>
      <GlobalVideoBackground />
      <Header />
      <Hero />
      <AboutUs />
      <Specialties />
      <Services />
      <Products />
      <Clients />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
