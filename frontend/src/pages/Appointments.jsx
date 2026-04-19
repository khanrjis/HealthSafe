import { useState, useEffect } from 'react';
import { API_URL } from '../api';
import '../styles/Appointments.css';

const diseases = [
  'Heart Disease', 'Skin Issues', 'General Checkup', 'Fever', 'Cough', 'Headache', 'Diabetes', 'Hypertension'
];

const fallbackDoctors = [
  { _id: 'd1', name: 'Dr. Ayesha Khan', speciality: 'Cardiology' },
  { _id: 'd2', name: 'Dr. Amir Ali', speciality: 'General Practitioner' },
  { _id: 'd3', name: 'Dr. Fatima Noor', speciality: 'Dermatology' }
];

export default function Appointments() {
  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: 'd1',
    disease: '',
    date: '',
    time: '',
    message: ''
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

    const saved = localStorage.getItem('appointments');
    if (saved) setAppointments(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Booking appointment...');

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const newAppointment = { ...form, _id: Date.now(), bookedAt: new Date().toLocaleString() };
        const updated = [...appointments, newAppointment];
        setAppointments(updated);
        localStorage.setItem('appointments', JSON.stringify(updated));
        
        setStatus('✅ Appointment booked successfully!');
        setForm({ name: '', email: '', phone: '', doctor: 'd1', disease: '', date: '', time: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Failed to book appointment');
      }
    } catch (error) {
      console.error(error);
      setStatus('Network error');
    }
  };

  return (
    <div className="appointments-page">
      <h1>Book an Appointment</h1>

      <div className="appointments-container">
        <div className="booking-form-section">
          <h2>Schedule Your Visit</h2>
          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="doctor">Select Doctor *</label>
              <select id="doctor" name="doctor" value={form.doctor} onChange={handleChange} required>
                {doctors.map(doc => (
                  <option key={doc._id} value={doc._id}>{doc.name} - {doc.speciality}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="disease">Reason for Visit *</label>
              <select id="disease" name="disease" value={form.disease} onChange={handleChange} required>
                <option value="">Select a reason</option>
                {diseases.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Time *</label>
                <input id="time" name="time" type="time" value={form.time} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Notes</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} rows="3" />
            </div>

            <button type="submit" className="btn btn-primary">Book Appointment</button>
            {status && <p className={`status-message ${status.includes('✅') ? 'success' : 'error'}`}>{status}</p>}
          </form>
        </div>

        <div className="booked-appointments">
          <h2>Your Appointments</h2>
          {appointments.length > 0 ? (
            <div className="appointments-list">
              {appointments.map(apt => (
                <div key={apt._id} className="appointment-card">
                  <div className="apt-header">
                    <h4>{doctors.find(d => d._id === apt.doctor)?.name || 'Doctor'}</h4>
                    <span className="apt-status">Booked</span>
                  </div>
                  <p><strong>Name:</strong> {apt.name}</p>
                  <p><strong>Reason:</strong> {apt.disease}</p>
                  <p><strong>Date:</strong> {apt.date} at {apt.time}</p>
                  <p className="apt-time">Booked: {apt.bookedAt}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-appointments">No appointments booked yet. Book one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}
