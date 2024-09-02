type ServiceDetailsProps = {
  details: string;
};

function ServiceDetails({ details }: ServiceDetailsProps) {
  return (
    <div className="service-details">
      <p>{details}</p>
    </div>
  );
}

export default ServiceDetails;
