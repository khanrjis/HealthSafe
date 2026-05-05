import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Appointments from './pages/Appointments';
import Reviews from './pages/Reviews';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Services from './pages/Services';
import services from './data/servicesData';
import SearchResults from './pages/SearchResults';
import { API_URL } from './api';
import './App.css';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const normalizedQuery = trimmed.toLowerCase();

    const routeKeywords = [
      { keywords: ['appointment', 'appointments', 'book'], path: '/appointments' },
      { keywords: ['review', 'reviews', 'feedback'], path: '/reviews' },
      { keywords: ['blog', 'blogs', 'article'], path: '/blogs' }
    ];

    for (const item of routeKeywords) {
      if (item.keywords.some((keyword) => normalizedQuery.includes(keyword))) {
        navigate(item.path);
        return;
      }
    }

    const serviceMatches = services.filter((service) => {
      const text = `${service.title} ${service.description}`.toLowerCase();
      return text.includes(normalizedQuery);
    });

    if (serviceMatches.length > 0) {
      navigate(`/services?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/doctors`);
      if (res.ok) {
        const data = await res.json();
        const doctorMatches = data.filter((doctor) => {
          const text = `${doctor.name} ${doctor.speciality} ${doctor.bio}`.toLowerCase();
          return text.includes(normalizedQuery);
        });

        if (doctorMatches.length === 1) {
          navigate(`/doctors/${doctorMatches[0]._id}`);
          return;
        }

        if (doctorMatches.length > 1) {
          navigate(`/doctors?q=${encodeURIComponent(trimmed)}`);
          return;
        }
      }
    } catch (error) {
      console.error('Search doctor lookup failed:', error);
    }

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-container">
          <Link to="/" className="brand">PharmaMap</Link>
          
          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search doctors, services, blogs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <nav className="site-nav">
            <Link to="/">Home</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/services">Services</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/blogs">Blogs</Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>PharmaMap</h4>
            <p>Your gateway to quality healthcare services. Connect with expert doctors, book appointments effortlessly, and stay informed with our health resources.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/doctors">Doctors</Link></li>
              <li><Link to="/appointments">Appointments</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@pharmamap.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Health Street, Wellness City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 PharmaMap. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
