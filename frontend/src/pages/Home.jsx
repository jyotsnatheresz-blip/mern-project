import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, CardActions, Chip, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => {
        setBlogs(res.data);
        console.log("Blogs:", res.data);
      })
      .catch(err => {
        console.log("error:", err.message);
      });
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          color: '#502909',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        Here are your blogs!
      </Typography>

      <Grid container spacing={4}>
        {blogs.map(blog => (
          // ✅ FIX 1: Grid size മാറ്റി - md={2} → md={4} ആക്കി
          <Grid item xs={9} sm={6} md={4} key={blog._id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: 5,
                transition: '0.3s',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: 10 
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                {blog.image ? (
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:5000/uploads/${blog.image}`}
                    alt={blog.title}
                    sx={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Chip 
                    label="Tech" 
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      left: 12, 
                      bgcolor: '#571f11da',
                      color: 'white',
                      fontWeight: 'bold'
                    }} 
                  />
                )}
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {blog.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, color: 'text.secondary' }}>
                  <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption">
                    5 min read · {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {blog.content?.substring(0, 100)}...
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1 }} src={blog?.userId?.name?.charAt(0)|| 'U'} />
                  {/* ✅ FIX 2: userid → userId ആക്കി */}
                  <Typography variant="subtitle2">
                    {blog.userId?.name || 'Deleted User'}
                  </Typography>
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  variant="contained" 
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  fullWidth
                  sx={{
                    background: 'linear-gradient(45deg, #886b59 30%, #442308f1 90%)',
                    borderRadius: 2,
                    fontWeight: 'bold'
                  }}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;