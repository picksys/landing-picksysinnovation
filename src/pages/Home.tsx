import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../styles/Components.css';
import AboutUs from '../components/AboutUs';

function Home() {
  return (
    <>
      <Header />
      
      <div className="content">
        <Hero />
        <AboutUs />
        <Services />
        <Contact />
        <Footer />
      </div>
      
    </>
  );
}

export default Home;
