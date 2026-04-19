const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointments');
const doctorRoutes = require('./routes/doctors');
const reviewRoutes = require('./routes/reviews');
const blogRoutes = require('./routes/blogs');
const Appointment = require('./models/Appointment');
const Doctor = require('./models/Doctor');
const Review = require('./models/Review');
const Blog = require('./models/Blog');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'PharmaMap backend running' });
});

app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/api/seed', async (req, res) => {
  try {
    const existingDoctors = await Doctor.countDocuments();
    const existingReviews = await Review.countDocuments();
    const existingBlogs = await Blog.countDocuments();

    const doctorData = [
      {
        name: 'Dr. Ayesha Khan',
        speciality: 'Cardiology',
        image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80',
        bio: 'Specialist in cardiac care and preventive heart health.',
        social: {
          facebook: 'https://facebook.com/doctor-ayesha',
          twitter: 'https://twitter.com/doctor-ayesha',
          instagram: 'https://instagram.com/doctor.ayesha'
        }
      },
      {
        name: 'Dr. Amir Ali',
        speciality: 'General Medicine',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
        bio: 'Experienced general physician delivering compassionate primary care.',
        social: {
          facebook: 'https://facebook.com/doctor-amir',
          twitter: 'https://twitter.com/doctor-amir',
          instagram: 'https://instagram.com/doctor.amir'
        }
      }
    ];

    const reviewData = [
      {
        name: 'Sana Tariq',
        rating: 5,
        comment: 'Excellent service and fast response. The staff was very professional.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        name: 'Bilal Hussain',
        rating: 4,
        comment: 'Great experience with the doctor and booking process was smooth.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    ];

    const blogData = [
      {
        title: 'Healthy Heart Habits',
        author: 'Dr. Ayesha Khan',
        date: 'April 16, 2026',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Simple lifestyle changes that help keep your heart strong and healthy.',
        content: 'Keeping a balanced diet, exercising regularly, and visiting your doctor every year are key steps to maintaining heart health.'
      },
      {
        title: 'Preparing for Your Appointment',
        author: 'Dr. Amir Ali',
        date: 'April 14, 2026',
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
        excerpt: 'What to bring and how to plan before seeing your doctor.',
        content: 'Write down your symptoms, medications, and questions before your visit to get the most from your appointment.'
      }
    ];

    const insertedDoctors = existingDoctors === 0 ? await Doctor.insertMany(doctorData) : [];
    const insertedReviews = existingReviews === 0 ? await Review.insertMany(reviewData) : [];
    const insertedBlogs = existingBlogs === 0 ? await Blog.insertMany(blogData) : [];

    res.json({
      seeded: true,
      doctors: insertedDoctors.length || existingDoctors,
      reviews: insertedReviews.length || existingReviews,
      blogs: insertedBlogs.length || existingBlogs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
