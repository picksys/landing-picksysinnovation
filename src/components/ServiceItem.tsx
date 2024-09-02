import React, { useState } from 'react';

// Estilos CSS en línea
const styles = {
  serviceItem: {
    border: '1px solid #ddd',
    padding: '16px',
    margin: '16px 0',
    borderRadius: '8px',
    backgroundColor: '#E5F5F2', // Fondo no transparente
    transition: 'box-shadow 0.3s ease',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra sutil por defecto
  },
  serviceItemHover: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  toggleDetailsButton: {
    backgroundColor: 'transparent', // Botón transparente
    color: '#007bff', // Color del texto del botón
    border: 'none', // Sin bordes
    padding: '4px 8px', // Botón más pequeño
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease', // Transiciones suaves
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    fontSize: '14px', // Tamaño de fuente más pequeño
  },
  toggleDetailsButtonHover: {
    backgroundColor: '#007bff', // Fondo al pasar el ratón
    color: '#fff',
  },
  details: {
    maxHeight: '0',
    overflow: 'hidden',
    opacity: '0',
    transition: 'max-height 0.5s ease, opacity 0.5s ease',
  },
  detailsShow: {
    maxHeight: '200px', // Ajusta según el contenido
    opacity: '1',
  },
};

type ServiceItemProps = {
  title: string;
  description: string;
  details: string;
};

function ServiceItem({ title, description, details }: ServiceItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      style={styles.serviceItem}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.serviceItemHover.boxShadow}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <button
        style={styles.toggleDetailsButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = styles.toggleDetailsButtonHover.backgroundColor;
          e.currentTarget.style.color = styles.toggleDetailsButtonHover.color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = styles.toggleDetailsButton.backgroundColor;
          e.currentTarget.style.color = styles.toggleDetailsButton.color;
        }}
        onClick={handleToggleDetails}
      >
        {showDetails ? 'Ver menos' : 'Saber más'}
      </button>
      <div style={{ ...styles.details, ...(showDetails ? styles.detailsShow : {}) }}>
        <p>{details}</p>
      </div>
    </div>
  );
}

export default ServiceItem;
