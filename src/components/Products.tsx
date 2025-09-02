import '../styles/Components.css';
import logoClubAgenda from '../assets/prouductos/logo-club-agenda.jpeg';
import logoPediloWapido from '../assets/prouductos/logo-pedilo-wapido.png';

function Products() {
  // Array de productos propios
  const products = [
    {
      id: 1,
      name: "Club Agenda",
      logo: logoClubAgenda,
      description: "Plataforma integral para la gestión de clubes deportivos y actividades recreativas.",
      features: ["Gestión de reservas", "Control de socios", "Calendario de eventos", "Análisis de uso", "Cupones de descuento"],
      url: "https://clubagenda.com", // URL de la landing del producto
      backgroundType: "light"
    },
    {
      id: 2,
      name: "Pedilo Wapido",
      logo: logoPediloWapido,
      description: "Plataforma para administrar pedidos por whatsapp.",
      features: ["Tienda online", "Administración de pedidos", "Cupones de descuento", "Gestión de productos", "Panel de control", "Cambios agiles de precio a través de excel", "Chatbot para WhatsApp", "Toma de pedidos automaticos"],
      url: "https://landing.pedilo-wapido.online", // URL de la landing del producto
      backgroundType: "light"
    }
  ];

  return (
    <section id="products" className="products">
      <div className="products-content">
        <h2>Nuestros Productos</h2>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--gray-800)', 
          marginBottom: '3rem', 
          maxWidth: '800px', 
          marginLeft: 'auto', 
          marginRight: 'auto' 
        }}>
          Desarrollamos soluciones tecnológicas propias que resuelven necesidades específicas del mercado. 
          Conoce nuestros productos estrella que ya están transformando industrias.
        </p>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <a 
                href={product.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="product-link"
              >
                <div className={`product-logo ${product.backgroundType === 'dark' ? 'product-logo-dark' : 'product-logo-light'}`}>
                  <img 
                    src={product.logo} 
                    alt={`Logo de ${product.name}`}
                    title={`Visitar ${product.name}`}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {product.features && (
                    <ul className="specialty-features" style={{ marginTop: '1rem' }}>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  <div className="visit-product-badge">
                    Visitar sitio web →
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
