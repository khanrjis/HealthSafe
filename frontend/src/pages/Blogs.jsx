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
    excerpt: 'Small daily habits can boost your energy and help you feel more balanced throughout the day.'
  },
  {
    _id: 'b2',
    title: 'How to Prepare for Your Doctor Visit',
    author: 'Dr. Amir Ali',
    date: 'April 14, 2026',
    image: '/images/appointment.jpg',
    excerpt: 'Bring the right information and ask the right questions to get the best care possible.'
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

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (newBlog.title && newBlog.author) {
      const blog = {
        _id: 'b' + Date.now(),
        title: newBlog.title,
        author: newBlog.author,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        image: '/images/homeimage.jpg',
        excerpt: newBlog.excerpt
      };
      setBlogs([blog, ...blogs]);
      setNewBlog({ title: '', author: '', excerpt: '', content: '' });
      setShowForm(false);
    }
  };

  const filtered = filter ? blogs.filter(b => b.title.toLowerCase().includes(filter.toLowerCase()) || b.author.toLowerCase().includes(filter.toLowerCase())) : blogs;

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <h1>Health & Wellness Blog</h1>
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
                onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label>Author *</label>
              <input 
                type="text" 
                value={newBlog.author} 
                onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label>Excerpt</label>
              <textarea 
                value={newBlog.excerpt} 
                onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                rows="2"
              />
            </div>
            <button type="submit" className="btn btn-primary">Publish Blog</button>
          </form>
        </div>
      )}

      <div className="blogs-filter">
        <input 
          type="text" 
          placeholder="Search blogs by title or author..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="blogs-grid">
        {filtered.length > 0 ? (
          filtered.map(blog => (
            <Link to={`/blogs/${blog._id}`} key={blog._id} className="blog-card-link">
              <article className="blog-card">
                <img src={blog.image} alt={blog.title} />
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
