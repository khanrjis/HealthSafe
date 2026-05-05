import { Link, useLocation } from 'react-router-dom';
import services from '../data/servicesData';
import '../styles/Services.css';

export default function Services() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = (searchParams.get('q') || '').trim();
  const normalizedQuery = query.toLowerCase();

  const filteredServices = query
    ? services.filter((service) => {
        const text = `${service.title} ${service.description}`.toLowerCase();
        return text.includes(normalizedQuery);
      })
    : services;

  return (
    <div className="services-page">
      <h1>Our Services</h1>
      {query && filteredServices.length > 0 && (
        <p className="subtitle">Showing services for "<span>{query}</span>"</p>
      )}
      {query && filteredServices.length === 0 && (
        <p className="subtitle">No services matched "<span>{query}</span>"</p>
      )}

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <section className="services-cta">
        <h2>Ready to Get Started?</h2>
        <p>Book an appointment with one of our expert doctors today.</p>
        <div className="cta-buttons">
          <Link to="/doctors" className="btn btn-primary">Find a Doctor</Link>
          <Link to="/appointments" className="btn btn-secondary">Book Now</Link>
        </div>
      </section>
    </div>
  );
}
