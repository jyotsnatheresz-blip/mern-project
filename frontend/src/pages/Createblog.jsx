import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const Createblog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Tech');
  const [image, setImage] = useState(null); 
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  // Image select  - Change 1
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); 

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit - Change 2
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title ||!content) {
      alert('Give a title and a content');
      return;
    }

    try {
      const token = localStorage.getItem('token');

     
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (image) {
        formData.append('image', image); 
      }

      await axios.post(`https://mern-project-backend-jm72.onrender.com/api/blogs`,
        formData, 
        {
          headers: {

            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert('Blog Created');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Failed to create blog');
    }
  };

  // Brown Color Palette
  const brownMain = '#8B5A2B';
  const brownDark = '#5D4037';
  const brownLight = '#A1887F';

 
  return (
    <Box sx={{
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
      py: 4
    }}>
      <Paper elevation={10} sx={{
        p: 4,
        width: '90%',
        maxWidth: 700,
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${brownLight}`
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 700,
          mb: 3,
          textAlign: 'center',
          color: brownDark,
          fontFamily: 'Poppins, sans-serif'
        }}>
          Create New Blog ✍️
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Blog Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 3,
              '&.MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: brownMain },
              },
              '&.MuiInputLabel-root.Mui-focused': { color: brownMain }
            }}
          />

          <TextField
            fullWidth
            label="Write your blog content..."
            multiline
            rows={6}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              mb: 3,
              '&.MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: brownMain },
              },
              '&.MuiInputLabel-root.Mui-focused': { color: brownMain }
            }}
          />

          <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, color: brownDark }}>
            Upload Blog Image:
          </Typography>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{
              mb: 2,
              borderColor: brownMain,
              color: brownMain,
              '&:hover': {
                borderColor: brownDark,
                backgroundColor: 'rgba(139, 90, 43, 0.1)'
              }
            }}
          >
            Choose Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {preview && (
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  borderRadius: '8px',
                  border: `2px solid ${brownLight}`
                }}
              />
            </Box>
          )}

          <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, color: brownDark }}>
            Select Category:
          </Typography>
          <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Tech', 'Travel', 'Food', 'Lifestyle'].map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setCategory(cat)}
                variant={category === cat? 'filled' : 'outlined'}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: category === cat? brownMain : 'transparent',
                  color: category === cat? 'white' : brownDark,
                  borderColor: brownMain,
                  '&:hover': {
                    backgroundColor: category === cat? brownDark : 'rgba(139, 90, 43, 0.1)'
                  }
                }}
              />
            ))}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 700,
              background: `linear-gradient(45deg, ${brownMain}, ${brownDark})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${brownDark}, ${brownMain})`,
              }
            }}
          >
            PUBLISH BLOG 🚀
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Createblog;
