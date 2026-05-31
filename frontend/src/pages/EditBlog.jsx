import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '', image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`https://mern-project-backend-jm72.onrender.com/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://mern-project-backend-jm72.onrender.com/api/blogs/${id}`, blog);
      navigate('/u'); // MyBlogs page-ലേക്ക്
    } catch (err) {
      console.log(err);
      alert('Update Failed. Check Console');
    }
    setLoading(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1a120b', // Dark Brown BG
      padding: '40px 20px',
      fontFamily: 'system-ui',
    },
    card: {
      maxWidth: '700px',
      margin: '0 auto',
      backgroundColor: '#3c2a21', // Medium Brown Card
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      border: '1px solid #5c3d2e',
    },
    heading: {
      color: '#e5e5cb',
      fontSize: '28px',
      marginBottom: '30px',
      textAlign: 'center',
      fontWeight: '600',
    },
    label: {
      color: '#d5cea3',
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#1a120b',
      border: '1px solid #5c3d2e',
      borderRadius: '8px',
      color: '#e5e5cb',
      fontSize: '16px',
      marginBottom: '20px',
      outline: 'none',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#1a120b',
      border: '1px solid #5c3d2e',
      borderRadius: '8px',
      color: '#e5e5cb',
      fontSize: '16px',
      marginBottom: '20px',
      minHeight: '200px',
      resize: 'vertical',
      outline: 'none',
      fontFamily: 'system-ui',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#b85c38', // Burnt Orange/Brown
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: '0.3s',
    },
    preview: {
      width: '100%',
      maxHeight: '250px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #5c3d2e',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Edit Your Blog</h2>
        <form onSubmit={handleSubmit}>
          
          <label style={styles.label}>Blog Title</label>
          <input 
            style={styles.input}
            value={blog.title} 
            onChange={e => setBlog({...blog, title: e.target.value})} 
            placeholder="Enter your amazing title"
            required
          />

          <label style={styles.label}>Blog Content</label>
          <textarea 
            style={styles.textarea}
            value={blog.content} 
            onChange={e => setBlog({...blog, content: e.target.value})} 
            placeholder="Write your story..."
            required
          />

          <label style={styles.label}>Featured Image URL</label>
          <input 
            style={styles.input}
            value={blog.image} 
            onChange={e => setBlog({...blog, image: e.target.value})} 
            placeholder="Paste image URL here"
          />

          {blog.image && <img src={blog.image} alt="preview" style={styles.preview} />}

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
            onMouseOver={e => e.target.style.backgroundColor = '#a14e2f'}
            onMouseOut={e => e.target.style.backgroundColor = '#b85c38'}
          >
            {loading ? 'Updating...' : 'Update Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
