import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Specialties from '../components/Specialties';
import Services from '../components/Services';
import Products from '../components/Products';
import Clients from '../components/Clients';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../styles/Components.css';

function Home() {
  return (
    <>
      <Header />
      
      <div className="content">
        <Hero />
        <AboutUs />
        <Specialties />
        <Services />
        <Products />
        <Clients />
        <Contact />
        <Footer />
      </div>
      
    </>
  );
}

export default Home;
