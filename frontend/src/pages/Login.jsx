import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Brown Color Palette
  const brownMain = '#8B5A2B';
  const brownDark = '#5D4037';
  const brownLight = '#A1887F';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert(' Give a Email and Password ');
      return;
    }

    try {
      
      const res = await axios.post(`https://mern-project-backend-jm72.onrender.com/api/auth/login`, {
        email,
        password
      });
      
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert('Login Success!');
      navigate('/'); // Home page
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Login failed. Check credentials!');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
      py: 4
    }}>
      <Paper elevation={10} sx={{
        p: 4,
        width: '90%',
        maxWidth: 450,
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${brownLight}`
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 700,
          mb: 1,
          textAlign: 'center',
          color: brownDark,
          fontFamily: 'Poppins, sans-serif'
        }}>
          Welcome Back ☕
        </Typography>
        
        <Typography variant="body2" sx={{
          textAlign: 'center',
          color: brownLight,
          mb: 3
        }}>
          Login to continue your blog journey
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: brownMain }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: brownMain },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: brownMain }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: brownMain }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: brownMain },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: brownMain }
            }}
          />

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
                transform: 'scale(1.02)'
              }
            }}
          >
            LOGIN 🚀
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: brownLight }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: brownMain, fontWeight: 700, textDecoration: 'none' }}>
            Signup Here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
