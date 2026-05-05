import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../api';
import '../styles/Doctors.css';

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

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = (searchParams.get('q') || '').trim();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/doctors`);
        if (res.ok) {
          const data = await res.json();
          setDoctors(Array.isArray(data) ? data : []);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error('Search doctors failed:', error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [query]);

  const normalizedQuery = query.toLowerCase();

  const doctorResults = doctors.filter((doctor) => {
    const text = `${doctor.name} ${doctor.speciality} ${doctor.bio}`.toLowerCase();
    return text.includes(normalizedQuery);
  });

  const serviceResults = services.filter((service) => {
    const text = `${service.title} ${service.description}`.toLowerCase();
    return text.includes(normalizedQuery);
  });

  return (
    <div className="doctors-page">
      <h1>Search Results</h1>
      {!query ? (
        <p>Please type a search term in the search bar above to find doctors and services.</p>
      ) : (
        <>
          <p className="subtitle">Showing results for "{query}"</p>

          <section className="search-section">
            <h2>Doctors</h2>
            {loading ? (
              <p>Loading doctors...</p>
            ) : doctorResults.length > 0 ? (
              <div className="doctors-grid">
                {doctorResults.map((doctor) => (
                  <Link to={`/doctors/${doctor._id}`} key={doctor._id} className="doctor-card-link">
                    <article className="doctor-card">
                      <img src={doctor.image || '/images/photo.jpg'} alt={doctor.name} />
                      <div className="doctor-info">
                        <h3>{doctor.name}</h3>
                        <p className="speciality">{doctor.speciality}</p>
                        {doctor.experience && <p className="experience">Experience: {doctor.experience}</p>}
                        <p className="bio">{doctor.bio}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No doctors matched your search.</p>
            )}
          </section>

          <section className="search-section">
            <h2>Services</h2>
            {serviceResults.length > 0 ? (
              <div className="services-grid">
                {serviceResults.map((service) => (
                  <div key={service.id} className="service-card">
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No services matched your search.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
