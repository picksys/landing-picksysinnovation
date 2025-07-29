import '../styles/Components.css';
import logoChevrolet from '../assets/clientes/logo-chevrolet.png';
import logoDeLaOstia from '../assets/clientes/logo-de-la-ostia.jpg';
import logoGloboPadel from '../assets/clientes/logo-globo-padel.jpeg';
import logoNissan from '../assets/clientes/logo-nissan.jpg';
import logoWildFoxProducciones from '../assets/clientes/logo-wild-fox-produccione.jpg';
import logoVolkswagen from '../assets/clientes/logo-volkswagen.jpg';
import logoYacopini from '../assets/clientes/logo-yacopini.png';
import logoVacaNegra from '../assets/clientes/logo-vaca-negra.jpeg';
import logoLuchoMercado from '../assets/clientes/logo-lucho-mercado.png';
function Clients() {
  // Array de clientes con logos reales
  const clients = [
    {
      id: 1,
      name: "Chevrolet",
      logo: logoChevrolet,
      description: "Concesionario oficial Chevrolet",
      backgroundType: "dark" // Fondo oscuro para texto blanco
    },
    {
      id: 2,
      name: "De La Ostia",
      logo: logoDeLaOstia,
      description: "Productora de eventos",
      backgroundType: "light" // Fondo claro por defecto
    },
    {
      id: 3,
      name: "Globo Padel",
      logo: logoGloboPadel,
      description: "Club de amigos deportivo",
      backgroundType: "light"
    },
    {
      id: 4,
      name: "Nissan",
      logo: logoNissan,
      description: "Concesionario oficial Nissan",
      backgroundType: "light"
    },
    {
      id: 5,
      name: "Wild Fox Producciones",
      logo: logoWildFoxProducciones,
      description: "Productora de eventos de musica electronica",
      backgroundType: "light"
    },
    {
      id: 6,
      name: "Volkswagen",
      logo: logoVolkswagen,
      description: "Concesionario oficial Volkswagen",
      backgroundType: "light"
    },
    {
      id: 7,
      name: "Yacopini",
      logo: logoYacopini,
      description: "Grupo empresarial automotriz",
      backgroundType: "dark" // Fondo oscuro para texto blanco
    },
    {
      id: 8,
      name: "Vaca Negra",
      logo: logoVacaNegra,
      description: "Carniceria de San Juan",
      backgroundType: "light" // Fondo claro por defecto
    },
    {
      id: 9,
      name: "Lucho mercado trainer",
      logo: logoLuchoMercado,
      description: "Landing para un entrenador personal",
      backgroundType: "light" // Fondo claro por defecto
    }
  ];

  return (
    <section id="clients" className="clients">
      <div className="clients-content">
        <h2>Nuestros Clientes</h2>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--gray-800)', 
          marginBottom: '3rem', 
          maxWidth: '700px', 
          marginLeft: 'auto', 
          marginRight: 'auto' 
        }}>
          Confiamos en construir relaciones duraderas con nuestros clientes, 
          brindando soluciones que impulsan su crecimiento y éxito empresarial.
        </p>
        <div className="clients-grid">
          {clients.map(client => (
            <div 
              key={client.id} 
              className={`client-logo ${client.backgroundType === 'dark' ? 'client-logo-dark' : 'client-logo-light'}`}
            >
              <img 
                src={client.logo} 
                alt={`Logo de ${client.name}`}
                title={client.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
