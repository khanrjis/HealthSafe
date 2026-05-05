import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api';
import '../styles/Doctors.css';

const fallbackDoctors = [
  {
    _id: 'd1',
    name: 'Dr. Ayesha Khan',
    speciality: 'Cardiology',
    image: '/images/girldoc.jpg',
    experience: '12 years',
    bio: 'A respected heart specialist with years of experience helping patients live healthier lives.'
  },
  {
    _id: 'd2',
    name: 'Dr. Amir Ali',
    speciality: 'General Practitioner',
    image: '/images/amirrr.jpg',
    experience: '8 years',
    bio: 'Focused on preventive care and personalized treatment plans for each patient.'
  },
  {
    _id: 'd3',
    name: 'Dr. Fatima Noor',
    speciality: 'Dermatology',
    image: '/images/photo.jpg',
    experience: '10 years',
    bio: 'Offering compassionate skin care and reliable guidance to improve wellness.'
  }
];

const localDoctorImages = {
  'Dr. Ayesha Khan': '/images/girldoc.jpg',
  'Dr. Amir Ali': '/images/amirrr.jpg',
  'Dr. Fatima Noor': '/images/photo.jpg'
};

export default function Doctors() {
  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetch(`${API_URL}/doctors`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setDoctors(data);
        }
      } catch (error) {
        console.error('Failed to load doctors:', error);
      }
    };
    loadDoctors();
  }, []);

  const normalizedFilter = filter.toLowerCase();
  const filtered = filter
    ? doctors.filter((doctor) => {
        const text = `${doctor.name} ${doctor.speciality}`.toLowerCase();
        return text.includes(normalizedFilter);
      })
    : doctors;

  return (
    <div className="doctors-page">
      <h1>Our Expert Doctors</h1>
      
      <div className="filter-section">
        <input 
          type="text" 
          placeholder="Filter by speciality..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="doctors-grid">
        {filtered.length > 0 ? (
          filtered.map((doctor) => {
            const imageSrc = localDoctorImages[doctor.name] || doctor.image || '/images/photo.jpg';
            return (
              <Link to={`/doctors/${doctor._id}`} key={doctor._id} className="doctor-card-link">
                <article className="doctor-card">
                  <img src={imageSrc} alt={doctor.name} />
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <p className="speciality">{doctor.speciality}</p>
                    {doctor.experience && <p className="experience">Experience: {doctor.experience}</p>}
                    <p className="bio">{doctor.bio}</p>
                    <button className="view-btn">View Profile</button>
                  </div>
                </article>
              </Link>
            );
          })
        ) : (
          <p>No doctors found</p>
        )}
      </div>
    </div>
  );
}
