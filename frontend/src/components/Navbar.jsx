import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    window.location.reload();
  };

  return (
   <AppBar 
  position="static" 
  sx={{
    backgroundImage: 'url("https://template.canva.com/EAFw8hKewR4/1/0/1600w-iBVqHSKhve8.jpg")', // നിന്റെ image link ഇവിടെ
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: 'none',
    backdropFilter: 'blur(8px)', // വേണേൽ വെച്ചോ, glass effect-ന്
  }}
>
  <Toolbar>
    <Typography variant="h6" sx={{
      flexGrow: 1,
      color: "white",
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)' // Image-ന്റെ മേൽ text clear ആവാൻ
    }}>
      SIMPLE BLOG APP
    </Typography>
          
           {isLoggedIn ? (
            <Button  
              variant="contained" 
              sx={{ 
                backgroundColor: 'rgba(145, 88, 62, 0.91)', 
                backdropFilter: 'blur(20px)',px:0.5,py:0.5,
                mx: 0.3,
                '&:hover': { backgroundColor: 'rgba(112, 55, 55, 0.8)' }
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          ) : (
            <>
              <Button variant="contained" component={Link} to="/a" sx={{ 
                backgroundColor: 'rgba(112, 55, 55, 0.8)', 
                backdropFilter: 'blur(10px)',px:0.5,py:0.5,
                mx: 0.5,
                '&:hover': { backgroundColor: 'rgba(112,55,55,0.8)' }
              }}>
                LOGIN
              </Button>
              <Button variant="contained" component={Link} to="/s" sx={{ 
                backgroundColor: 'rgba(112,55,55,0.8)', 
                backdropFilter: 'blur(10px)',px:0.5,py:0.5,
                mx: 0.5,
                '&:hover': { backgroundColor: 'rgba(112,55,55,0.8)' }
              }}>
                SIGN UP
              </Button>
            </>
          )}
          <Button variant="contained" component={Link} to="/" sx={{ 
            backgroundColor: 'rgba(112,55,55,0.8)', 
            backdropFilter: 'blur(10px)',px:0.5,py:0.5,
            mx: 0.5,
            '&:hover': { backgroundColor: 'rgba(112,55,55,0.8)' }
          }}>
            HOME
          </Button>
          <Button variant="contained" component={Link} to="/c" sx={{ 
            backgroundColor: 'rgba(112,55,55,0.8)', 
            backdropFilter: 'blur(10px)',px:0.5,py:0.5,
            mx: 0.5,
            '&:hover': { backgroundColor: 'rgba(112,55,55,0.8)' }
          }}>
            CREATE BLOG
          </Button>
          <Button variant="contained" component={Link} to="/b" sx={{ 
            backgroundColor: 'rgba(112,55,55,0.8)', 
            backdropFilter: 'blur(10px)',px:0.5,py:0.5,
            mx: 0.5,
            '&:hover': { backgroundColor: 'rgba(112,55,55,0.8)' }
          }}>
            ALL BLOGS
          </Button>
          <Button variant="contained" component={Link} to="/u" sx={{ 
            backgroundColor: 'rgba(112,55,55,0.8)', 
            backdropFilter: 'blur(10px)',px:0.5,py:0.5,
            mx: 0.5,
            '&:hover': { backgroundColor: 'rgba(112,55,55,0.8)' }
          }}>
            My blogs
          </Button>
          <Button variant="contained" component={Link} to="/d" sx={{ 
            backgroundColor: 'rgba(112,55,55,0.8)', 
            backdropFilter: 'blur(10px)',px:0.5,py:0.5,
            mx: 0.5,
            '&:hover': { backgroundColor: 'rgba(112,55,55,0.8)' }
          }}>
            ADMIN PANEL
          </Button>

         
        </Toolbar>
      
    </AppBar>
  );
};

export default Navbar;