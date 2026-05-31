import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://mern-project-backend-jm72.onrender.com/api/blogs/${id}`)
     .then(res => setBlog(res.data))
     .catch(err => console.log("Blog kittiyilla:", err));
  }, [id]);

  if (!blog) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Loading...</h2>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>{blog.title}</h1>
      <h3>Category: {blog.category}</h3>
      {blog.image && <img 
        src={`https://mern-project-backend-jm72.onrender.com/uploads/${blog.image}`} 
        alt={blog.title} 
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} 
      />}
      <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{blog.content}</p>
    </div>
  );
}

export default ViewBlog;
