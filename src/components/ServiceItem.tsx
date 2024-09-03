import { useState, CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  serviceItem: {
    color: 'black',
    border: '1px solid #ddd',
    padding: '16px',
    margin: '16px 0',
    borderRadius: '8px',
    backgroundColor: '#E5F5F2',
    transition: 'box-shadow 0.3s ease',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  serviceItemHover: {
    color: 'black',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  toggleDetailsButton: {
    backgroundColor: 'transparent',
    color: 'black',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    fontSize: '14px',
  },
  toggleDetailsButtonHover: {
    backgroundColor: '#007bff',
    color: 'black',
  },
  details: {
    color: 'black',
    maxHeight: '0',
    overflow: 'hidden',
    opacity: '0',
    transition: 'max-height 0.5s ease, opacity 0.5s ease',
  },
  detailsShow: {
    color: 'black',
    maxHeight: '500px', // Incrementado para acomodar más contenido
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
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.serviceItemHover.boxShadow ?? ''}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = styles.serviceItem.boxShadow ?? ''}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <button
        style={styles.toggleDetailsButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = styles.toggleDetailsButtonHover.backgroundColor ?? '';
          e.currentTarget.style.color = styles.toggleDetailsButtonHover.color ?? '';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = styles.toggleDetailsButton.backgroundColor ?? '';
          e.currentTarget.style.color = styles.toggleDetailsButton.color ?? '';
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
