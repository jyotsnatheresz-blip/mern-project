import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();


  const brownMain = '#8B5A2B';
  const brownDark = '#5D4037';
  const brownLight = '#A1887F';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert('fill the all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password doesnot matching 🥲');
      return;
    }

    if (password.length < 6) {
      alert('Enter minimum 6 letters');
      return;
    }
       console.log("API URL:",process.env.REACT_APP_API_URL);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        name,
        email,
        password
      });
      
      alert('Signup successfully completed! now do Login');
      navigate('/login'); 
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Signup failed. Try again!');
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
          Create Account ☕
        </Typography>
        
        <Typography variant="body2" sx={{
          textAlign: 'center',
          color: brownLight,
          mb: 3
        }}>
          Join our blog community today!
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: brownMain }} />
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
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: brownMain },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: brownMain }
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: brownMain }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            SIGN UP 🚀
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: brownLight }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: brownMain, fontWeight: 700, textDecoration: 'none' }}>
            Login Here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
