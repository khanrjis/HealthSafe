import { useParams, Link } from 'react-router-dom';
import '../styles/BlogDetail.css';

const blogContent = {
  'b1': {
    title: 'Tips for a Healthier Morning Routine',
    author: 'Dr. Ayesha Khan',
    date: 'April 16, 2026',
    image: '/images/Big_morninghabits.jpg',
    excerpt: 'Small daily habits can boost your energy and help you feel more balanced throughout the day.',
    content: `
      Starting your day on the right foot can have lasting effects on your health and well-being. Here are some evidence-based tips to improve your morning routine:

      1. Wake Up at a Consistent Time
      Your body thrives on routine. Try to wake up at the same time every day, even on weekends. This helps regulate your circadian rhythm and improves sleep quality over time.

      2. Hydrate First Thing
      After 6-8 hours of sleep, your body needs water. Drink a glass of water immediately after waking to rehydrate and kickstart your metabolism.

      3. Practice Mindfulness or Meditation
      Spending 5-10 minutes in meditation or mindfulness can reduce stress and improve focus throughout the day. Apps like Headspace or Calm can help beginners get started.

      4. Light Exercise
      A 20-30 minute workout in the morning boosts energy, improves mood, and helps maintain a healthy weight. Even a brisk walk or yoga session counts.

      5. Eat a Balanced Breakfast
      Never skip breakfast. Include proteins, healthy fats, and complex carbohydrates to maintain stable blood sugar levels and energy.

      6. Limit Screen Time
      Avoid checking your phone or email immediately after waking. Give your mind time to wake naturally before diving into digital stimulation.

      7. Get Sunlight Exposure
      Morning sunlight helps regulate your sleep-wake cycle. Try to spend at least 15-20 minutes outdoors in the morning.

      By implementing these habits gradually, you can transform your morning routine and improve your overall health and happiness.
    `
  },
  'b2': {
    title: 'How to Prepare for Your Doctor Visit',
    author: 'Dr. Amir Ali',
    date: 'April 14, 2026',
    image: '/images/appointment.jpg',
    excerpt: 'Bring the right information and ask the right questions to get the best care possible.',
    content: `
      Preparing for a doctor's appointment doesn't take much time, but it can significantly improve the quality of care you receive. Here's how to make the most of your visit:

      1. Write Down Your Symptoms
      Before your appointment, list all the symptoms you've experienced, when they started, and what makes them better or worse. This helps your doctor understand your condition more clearly.

      2. Bring Medical Records
      If you're visiting a new doctor, bring copies of your medical history, previous test results, and vaccination records. This gives your doctor important context.

      3. List Your Medications
      Bring a list of all medications, supplements, and vitamins you're taking, including dosages. This helps your doctor identify potential drug interactions.

      4. Note Allergies
      Make sure to clearly communicate any medication allergies or food allergies you have. Wear a medical alert bracelet if you have severe allergies.

      5. Prepare Questions
      Write down questions you want to ask your doctor. Prioritize the most important ones in case time is limited.

      6. Bring Insurance Information
      Have your health insurance card and ID ready. This speeds up the check-in process.

      7. Arrive Early
      Come 10-15 minutes early to complete any necessary paperwork and settle in before your appointment.

      8. Bring a Support Person
      If it's a serious appointment, consider bringing a family member or friend to help you remember information.

      By following these tips, you'll be better prepared to discuss your health concerns and receive personalized, effective care from your healthcare provider.
    `
  }
};

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogContent[id] || blogContent['b1'];

  return (
    <div className="blog-detail-page">
      <Link to="/blogs" className="back-link">← Back to Blogs</Link>

      <article className="blog-detail">
        <div className="blog-header">
          <img src={blog.image} alt={blog.title} className="featured-image" />
          <div className="blog-title-section">
            <h1>{blog.title}</h1>
            <div className="blog-meta">
              <span>By {blog.author}</span>
              <span>•</span>
              <span>{blog.date}</span>
            </div>
          </div>
        </div>

        <div className="blog-body">
          {blog.content.split('\n').map((paragraph, i) => (
            paragraph.trim() && <p key={i}>{paragraph.trim()}</p>
          ))}
        </div>

        <div className="blog-footer">
          <div className="author-info">
            <img src="/images/photo.jpg" alt={blog.author} className="author-avatar" />
            <div>
              <h4>About {blog.author.split(' ')[1]}</h4>
              <p>Expert healthcare professional with years of experience providing quality patient care and health education.</p>
            </div>
          </div>

          <div className="blog-actions">
            <Link to="/appointments" className="btn btn-primary">Book an Appointment</Link>
            <Link to="/reviews" className="btn btn-secondary">Share Your Experience</Link>
          </div>
        </div>
      </article>
    </div>
  );
}
