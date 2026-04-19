import { Link } from 'react-router-dom';
import '../styles/Services.css';

const services = [
  {
    id: 1,
    icon: 'Hospital',
    title: 'Free Checkups',
    description: 'Regular health checkups to catch any issues early and maintain your wellness.'
  },
  {
    id: 2,
    icon: 'Ambulance',
    title: '24/7 Ambulance Service',
    description: 'Emergency ambulance services available round the clock for urgent medical needs.'
  },
  {
    id: 3,
    icon: 'Consultation',
    title: 'Expert Consultations',
    description: 'Consult with experienced doctors across various medical specialties.'
  },
  {
    id: 4,
    icon: 'Pharmacy',
    title: 'Pharmacy Services',
    description: 'Access to quality medicines and pharmaceutical consultation services.'
  },
  {
    id: 5,
    icon: 'Beds',
    title: 'Hospital Beds',
    description: 'Comfortable and well-equipped hospital rooms for patient care.'
  },
  {
    id: 6,
    icon: 'Care',
    title: 'Complete Care',
    description: 'Comprehensive healthcare services to support your overall wellness journey.'
  }
];

export default function Services() {
  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <p className="subtitle">Comprehensive healthcare services tailored to your needs</p>

      <div className="services-grid">
        {services.map(service => (
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
