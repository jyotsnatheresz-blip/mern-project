import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, CircularProgress, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Brown Color Palette
  const brownMain = '#8B5A2B';
  const brownDark = '#5D4037';
  const brownLight = '#A1887F';
  const brownBg = '#EFEBE9';

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user')); 
      setUsername(user?.name || 'User');
      
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/myblogs`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setMyBlogs(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response?.status === 401) {
        alert('Do Login');
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Blog Deleted🗑️');
        fetchMyBlogs(); // List refresh ചെയ്യുക
      } catch (error) {
        alert('Cannot Delete');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: brownMain }} />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '90vh',
      background: `linear-gradient(135deg, ${brownBg} 0%, #D7CCC8 100%)`,
      py: 5,
      px: { xs: 2, md: 6 }
    }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" sx={{
          fontWeight: 800,
          color: brownDark,
          fontFamily: 'Poppins, sans-serif',
          mb: 1
        }}>
          Hey, {username}! 👋
        </Typography>
        <Typography variant="h6" sx={{ color: brownMain, fontWeight: 500 }}>
          Here are all your amazing blogs ☕
        </Typography>
      </Box>

      {myBlogs.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" sx={{ color: brownLight, mb: 2 }}>
            If you haven't created blog yet,do it right now!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/create')}
            sx={{
              mt: 2,
              py: 1.5,
              px: 4,
              background: `linear-gradient(45deg, ${brownMain}, ${brownDark})`,
              fontWeight: 700,
              fontSize: '1.1rem',
              '&:hover': {
                background: `linear-gradient(45deg, ${brownDark}, ${brownMain})`,
              }
            }}
          >
            CREATE YOUR FIRST BLOG 🚀
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {myBlogs.map((blog) => (
            <Grid item xs={12} md={4} key={blog._id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(93, 64, 55, 0.2)',
                border: `1px solid ${brownLight}`,
                transition: '0.3s',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 20px rgba(93, 64, 55, 0.3)',
                }
              }}>
                {/* Delete & Edit Buttons */}
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => navigate(`/edit/${blog._id}`)}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: brownMain,
                      '&:hover': { backgroundColor: 'white' }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(blog._id)}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: '#d32f2f',
                      '&:hover': { backgroundColor: 'white' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Blog Image */}
                {blog.image ? (
              
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${process.env.REACT_APP_API_URL}/uploads/${blog.image}`}
                    alt={blog.title}
                    sx={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Box sx={{
                    height: 100,
                    background: `linear-gradient(45deg, ${brownMain}, ${brownDark})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography sx={{ color: 'white', fontSize: '3rem' }}>📝</Typography>
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{
                      alignSelf: 'flex-start',
                      mb: 1.5,
                      backgroundColor: brownMain,
                      color: 'white',
                      fontWeight: 600
                    }}
                  />

                  <Typography variant="h6" sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: brownDark,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {blog.title}
                  </Typography>

                  <Typography variant="body2" sx={{
                    color: '#6D4C41',
                    mb: 2,
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {blog.content}
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    sx={{
                      alignSelf: 'flex-start',
                      borderColor: brownMain,
                      color: brownMain,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: brownDark,
                        backgroundColor: 'rgba(139, 90, 43, 0.1)'
                      }
                    }}
                  >
                    View Blog
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyBlogs;
