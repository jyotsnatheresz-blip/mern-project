import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Brown Color Palette - Same as CreateBlog
  const brownMain = '#8B5A2B';
  const brownDark = '#5D4037';
  const brownLight = '#A1887F';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs'); // നിന്റെ backend route
      setBlogs(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      background: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)', // Light brown BG
      py: 5,
      px: { xs: 2, md: 6 }
    }}>
      <Container maxWidth="sm">
      <Typography variant="h3" sx={{
        fontWeight: 700,
        mb: 4,
        textAlign: 'center',
        color: brownDark,
        fontFamily: 'Poppins, sans-serif'
      }}>
        All Blogs ☕
      </Typography>

      {blogs.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: brownLight }}>
          No blogs yet. Create one! ✍️
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={blog._id}>
              <Card sx={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(93, 64, 55, 0.2)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 20px rgba(93, 64, 55, 0.3)',
                }
              }}>
                {/* Blog Image */}
                {blog.image ? (
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:5000/uploads/${blog.image}`}
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
                  {/* Category Chip */}
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

                  {/* Title */}
                  <Typography variant="h6" sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: brownDark,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {blog.title}
                  </Typography>

                  {/* Content Preview */}
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

                  {/* Read More Button */}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/blog/${blog._id}`)} // Single blog page-ലേക്ക്
                    sx={{
                      alignSelf: 'flex-start',
                      background: `linear-gradient(45deg, ${brownMain}, ${brownDark})`,
                      fontWeight: 600,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${brownDark}, ${brownMain})`,
                      }
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      </Container>
    </Box>
  );
};

export default ViewBlogs;