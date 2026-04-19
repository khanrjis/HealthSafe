import { useState, useEffect } from 'react';
import { API_URL } from '../api';
import '../styles/Reviews.css';

const fallbackDoctors = [
  { _id: 'd1', name: 'Dr. Ayesha Khan' },
  { _id: 'd2', name: 'Dr. Amir Ali' },
  { _id: 'd3', name: 'Dr. Fatima Noor' }
];

const fallbackReviews = [
  {
    _id: 'r1',
    name: 'Sana Tariq',
    doctor: 'd1',
    rating: 5,
    comment: 'The appointment process was smooth and the doctor explained everything clearly.',
    avatar: '/images/photo.jpg'
  },
  {
    _id: 'r2',
    name: 'Bilal Hussain',
    doctor: 'd2',
    rating: 4,
    comment: 'Friendly staff and helpful medical advice. The booking experience was easy.',
    avatar: '/images/photo.jpg'
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [form, setForm] = useState({
    name: '',
    email: '',
    doctor: 'd1',
    rating: 5,
    comment: ''
  });
  const [status, setStatus] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting review...');

    try {
      const reviewData = {
        name: form.name,
        rating: parseInt(form.rating),
        comment: form.comment,
        avatar: '/images/photo.jpg'
      };

      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        const newReview = { ...reviewData, _id: Date.now(), doctor: form.doctor };
        setReviews([newReview, ...reviews]);
        setStatus('✅ Review submitted successfully!');
        setForm({ name: '', email: '', doctor: 'd1', rating: 5, comment: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Failed to submit review');
      }
    } catch (error) {
      console.error(error);
      setStatus('Network error');
    }
  };

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <div className="reviews-page">
      <h1>Patient Reviews</h1>

      <div className="reviews-container">
        <div className="add-review-section">
          <h2>Share Your Experience</h2>
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="doctor">Doctor Reviewed *</label>
              <select id="doctor" name="doctor" value={form.doctor} onChange={handleChange} required>
                {doctors.map(doc => (
                  <option key={doc._id} value={doc._id}>{doc.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating *</label>
              <select id="rating" name="rating" value={form.rating} onChange={handleChange} required>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review *</label>
              <textarea id="comment" name="comment" value={form.comment} onChange={handleChange} rows="5" required />
            </div>

            <button type="submit" className="btn btn-primary">Submit Review</button>
            {status && <p className={`status-message ${status.includes('✅') ? 'success' : 'error'}`}>{status}</p>}
          </form>
        </div>

        <div className="reviews-list-section">
          <h2>All Reviews</h2>
          <div className="reviews-list">
            {displayReviews.map(review => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <img src={review.avatar || '/images/photo.jpg'} alt={review.name} className="avatar" />
                    <div>
                      <h4>{review.name}</h4>
                      <p className="doctor-name">
                        {doctors.find(d => d._id === review.doctor)?.name || 'Doctor'}
                      </p>
                    </div>
                  </div>
                  <div className="rating">
                    Rating: {review.rating}/5
                  </div>
                </div>
                <p className="review-text">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
