import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    axios.get(`https://mern-project-backend-jm72.onrender.com/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://mern-project-backend-jm72.onrender.com/api/blogs/${id}`, blog);
    navigate('/u'); 
  };

  return (
    <div style={{padding: '20px'}}>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input 
          value={blog.title} 
          onChange={e => setBlog({...blog, title: e.target.value})} 
          placeholder="Title"
        /><br/><br/>
        <textarea 
          value={blog.content} 
          onChange={e => setBlog({...blog, content: e.target.value})} 
          placeholder="Content"
        /><br/><br/>
        <input 
          value={blog.image} 
          onChange={e => setBlog({...blog, image: e.target.value})} 
          placeholder="Image URL"
        /><br/><br/>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
