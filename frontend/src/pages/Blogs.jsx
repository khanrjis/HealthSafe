import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api';
import '../styles/Blogs.css';

const fallbackBlogs = [
  {
    _id: 'b1',
    title: 'Tips for a Healthier Morning Routine',
    author: 'Dr. Ayesha Khan',
    date: 'April 16, 2026',
    image: '/images/Big_morninghabits.jpg',
    excerpt: 'Small daily habits can boost your energy and help you feel more balanced throughout the day.',
    content: 'Start your day with hydration, a quick stretch, and a healthy breakfast. These small actions can improve focus and mood all day.'
  },
  {
    _id: 'b2',
    title: 'How to Prepare for Your Doctor Visit',
    author: 'Dr. Amir Ali',
    date: 'April 14, 2026',
    image: '/images/appointment.jpg',
    excerpt: 'Bring the right information and ask the right questions to get the best care possible.',
    content: 'Write down your symptoms, medications, and worries ahead of time. This helps your doctor understand your needs quickly and accurately.'
  }
];

export default function Blogs() {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setBlogs(data);
        }
      } catch (error) {
        console.error('Failed to load blogs:', error);
      }
    };

    loadBlogs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.author || !newBlog.excerpt || !newBlog.content) {
      setStatusMessage('Please fill in all blog fields before publishing.');
      return;
    }

    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('author', newBlog.author);
    formData.append('excerpt', newBlog.excerpt);
    formData.append('content', newBlog.content);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Failed to save blog');
      }

      const createdBlog = await res.json();
      setBlogs([createdBlog, ...blogs]);
      setNewBlog({ title: '', author: '', excerpt: '', content: '' });
      setImageFile(null);
      setImagePreview('');
      setShowForm(false);
      setStatusMessage('Blog published successfully!');
    } catch (error) {
      console.error('Blog publish error:', error);
      setStatusMessage('Unable to publish the blog right now. Please try again later.');
    }
  };

  const filtered = filter
    ? blogs.filter((b) =>
        b.title.toLowerCase().includes(filter.toLowerCase()) ||
        b.author.toLowerCase().includes(filter.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(filter.toLowerCase())
      )
    : blogs;

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <div>
          <h1>Health & Wellness Blog</h1>
          <p className="subtitle">Read expert articles, upload your own blog image, and explore detailed wellness guides.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-secondary">
          {showForm ? 'Cancel' : '+ Write a Blog'}
        </button>
      </div>

      {showForm && (
        <div className="add-blog-form">
          <h2>Create a New Blog Post</h2>
          <form onSubmit={handleAddBlog}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Excerpt *</label>
              <textarea
                value={newBlog.excerpt}
                onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Blog Details *</label>
              <textarea
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Cover Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              )}
            </div>

            {statusMessage && <p className="status-message">{statusMessage}</p>}
            <button type="submit" className="btn btn-primary">Publish Blog</button>
          </form>
        </div>
      )}

      <div className="blogs-filter">
        <input
          type="text"
          placeholder="Search blogs by title, author or excerpt..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="blogs-grid">
        {filtered.length > 0 ? (
          filtered.map((blog) => (
            <Link to={`/blogs/${blog._id}`} key={blog._id} className="blog-card-link">
              <article className="blog-card">
                <img src={blog.image || '/images/homeimage.jpg'} alt={blog.title} />
                <div className="blog-content">
                  <h3>{blog.title}</h3>
                  <p className="meta">By {blog.author} • {blog.date}</p>
                  <p className="excerpt">{blog.excerpt}</p>
                  <button className="read-btn">Read More →</button>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </div>
  );
}
