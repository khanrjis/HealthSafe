# PharmaMap MERN Project - Full Stack Healthcare Platform

A complete healthcare management system with doctor discovery, appointment booking, patient reviews, and health blogs.

## 🎯 Features

### Multi-Page Application
- **Home**: Landing page with services overview
- **Doctors**: Browse and filter doctors, view detailed profiles with education & experience
- **Doctor Profile**: Full doctor details with reviews and bio
- **Appointments**: Book appointments with doctor selection and disease/reason selection
- **My Appointments**: View all booked appointments with dates and times
- **Reviews**: Submit and read patient reviews for specific doctors
- **Blogs**: Read and create health blogs by different doctors
- **Services**: View all healthcare services offered

### Interactive Features
- Search functionality across doctors, blogs, and services
- Filter doctors by speciality
- Doctor selection when booking appointments
- Disease/reason selection for appointments
- Add patient reviews with star ratings
- Create and publish blog posts
- Local storage for appointment persistence

## 📁 Project Structure

```
health care 2/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Doctor.js
│   │   ├── Review.js
│   │   └── Blog.js
│   ├── routes/
│   │   ├── appointments.js
│   │   ├── doctors.js
│   │   ├── reviews.js
│   │   └── blogs.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── DoctorDetail.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── Blogs.jsx
│   │   │   ├── BlogDetail.jsx
│   │   │   └── Services.jsx
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Doctors.css
│   │   │   ├── DoctorDetail.css
│   │   │   ├── Appointments.css
│   │   │   ├── Reviews.css
│   │   │   ├── Blogs.css
│   │   │   ├── BlogDetail.css
│   │   │   └── Services.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   └── main.jsx
│   ├── public/
│   │   ├── images/
│   │   │   ├── photo.jpg
│   │   │   ├── homeimage.jpg
│   │   │   ├── appointment.jpg
│   │   │   ├── doctorappoint.jpg
│   │   │   └── heelo.jpg
│   │   └── legacy/
│   └── package.json
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account with cluster

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   npm install
   ```

2. Create `.env` file (copy from `.env.example`):
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/pharmamap?retryWrites=true&w=majority
   PORT=5000
   ```

3. Start backend server:
   ```bash
   npm run dev
   ```

4. Seed sample data (open in browser):
   ```
   http://localhost:5000/api/seed
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open in browser:
   ```
   http://localhost:3000
   ```

## 📝 API Endpoints

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment

### Doctors
- `GET /api/doctors` - Get all doctors

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review

### Blogs
- `GET /api/blogs` - Get all blogs

### Seeding
- `GET /api/seed` - Populate database with sample data

## 🎨 Technology Stack

**Frontend:**
- React 18
- React Router DOM
- Vite
- CSS3

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose

## 💾 Data Storage

- **Appointments**: Stored in MongoDB and browser localStorage
- **Reviews**: Submitted to MongoDB
- **Blogs**: Stored in MongoDB
- **Local Images**: Stored in `frontend/public/images/`

## 🔄 Workflow

1. **Browse Doctors**: Go to Doctors page, filter by speciality
2. **View Doctor Profile**: Click on doctor card to see detailed profile
3. **Book Appointment**: Select doctor, disease, date, and time
4. **View Bookings**: Check your appointments section to see booked slots
5. **Write Reviews**: Submit review for doctors you've visited
6. **Read Blogs**: Browse health blogs by doctors
7. **Create Blog**: Contribute your own blog post

## 🚨 Troubleshooting

### Backend won't start
- Verify MongoDB URI in `.env` is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure port 5000 is available

### Frontend won't load data
- Check that backend server is running on port 5000
- Verify browser console for API errors
- Check that MongoDB connection is established

### Images not loading
- Ensure images are in `frontend/public/images/`
- Check image file names in the code match actual files

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1400px and above)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🔐 Security Notes

- Replace fake MongoDB credentials before production
- Never commit `.env` files with real credentials
- Implement user authentication before production
- Add input validation on backend

## 📞 Support

For issues or questions, check the console logs and error messages. The backend validates MongoDB connection and provides clear error messages for configuration issues.

