import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <h1>PharmaMap</h1>
          <p className="subtitle">Your Trusted Healthcare Companion</p>
          <p className="description">
            PharmaMap connects you with top-rated doctors, provides easy appointment booking, and offers valuable health insights. 
            Experience personalized care designed to make managing your health simple and accessible.
          </p>
          <div className="hero-buttons">
            <Link to="/doctors" className="btn btn-primary">Find a Doctor</Link>
            <Link to="/appointments" className="btn btn-secondary">Book Appointment</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/homeimage.jpg" alt="Healthcare" />
        </div>
      </section>

      <section className="summary-cards">
        <div className="card">
          <h3>Expert Doctors</h3>
          <p>Connect with experienced healthcare professionals ready to help you.</p>
        </div>
        <div className="card">
          <h3>Easy Booking</h3>
          <p>Schedule appointments in minutes with our simple, user-friendly system.</p>
        </div>
        <div className="card">
          <h3>Patient Reviews</h3>
          <p>Read verified feedback and make informed decisions about your care.</p>
        </div>
      </section>

      <section className="services-preview">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-item">✓ Free Checkups</div>
          <div className="service-item">✓ 24/7 Ambulance</div>
          <div className="service-item">✓ Expert Consultations</div>
          <div className="service-item">✓ Medicines Available</div>
          <div className="service-item">✓ Hospital Beds</div>
          <div className="service-item">✓ Complete Care</div>
        </div>
        <Link to="/services" className="btn btn-outline">View All Services</Link>
      </section>
    </div>
  );
}
