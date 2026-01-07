import { useState } from 'react';
import '../styles/Components.css';

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
    <div className="service-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <button 
        className="service-toggle-btn"
        onClick={handleToggleDetails}
      >
        {showDetails ? 'Ver menos' : 'Saber más'}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`service-toggle-icon ${showDetails ? 'rotated' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className={`service-details-content ${showDetails ? 'show' : ''}`}>
        <p>{details}</p>
      </div>
    </div>
  );
}

export default ServiceItem;
