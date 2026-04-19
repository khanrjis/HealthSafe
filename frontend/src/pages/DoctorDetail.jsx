import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../api';
import '../styles/DoctorDetail.css';

// All images from the folder
const allImages = [
  '/images/amirrr.jpg',
  '/images/appointment.jpg',
  '/images/Big_morninghabits.jpg',
  '/images/doctorappoint.jpg',
  '/images/girldoc.jpg',
  '/images/heelo.jpg',
  '/images/homeimage.jpg',
  '/images/photo.jpg'
];

const localDoctorImages = {
  'Dr. Ayesha Khan': '/images/girldoc.jpg',
  'Dr. Amir Ali': '/images/amirrr.jpg',
  'Dr. Fatima Noor': '/images/photo.jpg'
};

const fallbackDoctors = {
  'd1': {
    _id: 'd1',
    name: 'Dr. Ayesha Khan',
    speciality: 'Cardiology',
    image: '/images/girldoc.jpg',
    experience: '12 years',
    education: 'MBBS, MD Cardiology - Karachi Medical University',
    bio: 'A respected heart specialist with years of experience helping patients live healthier lives.',
    description: 'Dr. Ayesha Khan is a leading cardiologist with extensive experience in diagnosing and treating heart conditions. She specializes in preventive cardiology and patient education.',
    rating: 4.8,
    reviews: 150,
    social: { facebook: '#', twitter: '#' }
  },
  'd2': {
    _id: 'd2',
    name: 'Dr. Amir Ali',
    speciality: 'General Practitioner',
    image: '/images/amirrr.jpg',
    experience: '8 years',
    education: 'MBBS - Punjab Medical College',
    bio: 'Focused on preventive care and personalized treatment plans for each patient.',
    description: 'Dr. Amir Ali provides comprehensive primary healthcare services with a focus on patient wellness and preventive medicine.',
    rating: 4.6,
    reviews: 89,
    social: { facebook: '#', twitter: '#' }
  },
  'd3': {
    _id: 'd3',
    name: 'Dr. Fatima Noor',
    speciality: 'Dermatology',
    image: '/images/photo.jpg',
    experience: '10 years',
    education: 'MBBS, MD Dermatology - Lahore Medical University',
    bio: 'Offering compassionate skin care and reliable guidance to improve wellness.',
    description: 'Dr. Fatima Noor is an expert dermatologist offering treatments for various skin conditions with modern techniques.',
    rating: 4.7,
    reviews: 120,
    social: { facebook: '#', twitter: '#' }
  }
};

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    setDoctor(fallbackDoctors[id] || fallbackDoctors['d1']);
  }, [id]);

  if (!doctor) return <div className="loading">Loading...</div>;

  return (
    <div className="doctor-detail-page">
      <Link to="/doctors" className="back-link">← Back to Doctors</Link>

      <div className="doctor-header">
        <img src={localDoctorImages[doctor.name] || doctor.image || '/images/photo.jpg'} alt={doctor.name} className="doctor-image" />
        <div className="doctor-header-info">
          <h1>{doctor.name}</h1>
          <p className="speciality-badge">{doctor.speciality}</p>
          <div className="doctor-meta">
            <span>Rating: {doctor.rating} ({doctor.reviews} reviews)</span>
            <span>Experience: {doctor.experience}</span>
          </div>
        </div>
      </div>

      <div className="doctor-content">
        <section className="section">
          <h2>About</h2>
          <p>{doctor.description}</p>
        </section>

        <section className="section">
          <h2>Education & Qualifications</h2>
          <p>{doctor.education}</p>
        </section>

        <section className="section">
          <h2>Experience</h2>
          <p>{doctor.experience} in {doctor.speciality}</p>
        </section>

        <section className="section">
          <h2>Image Gallery</h2>
          <div className="image-gallery">
            {allImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Patient Reviews</h2>
          <div className="reviews-sample">
            <div className="review-item">
              <p className="review-text">"Dr. {doctor.name.split(' ')[1]} is very professional and caring. Highly recommended!"</p>
              <p className="review-author">- Patient 1</p>
            </div>
            <div className="review-item">
              <p className="review-text">"Best experience at the clinic. Very knowledgeable doctor."</p>
              <p className="review-author">- Patient 2</p>
            </div>
          </div>
        </section>

        <section className="section cta-section">
          <Link to="/appointments" className="btn btn-primary">Book Appointment</Link>
          <Link to="/reviews" className="btn btn-secondary">Add a Review</Link>
        </section>
      </div>
    </div>
  );
}
