import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useLoaderData } from 'react-router-dom'; // استخدام useLoaderData لجلب البيانات من الـ loader
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '30px',
  },
  button: {
    backgroundColor: '#1976d2',
    color: '#fff',
    fontWeight: 'bold',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: '#115293',
    },
  },
};

export default function CreateUser({ title = 'User', redirectPath }) {
  const loadedUserData = useLoaderData();  // جلب البيانات من الـ loader
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '', 
    avatar: '',   
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to add this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await axios.post('https://api.escuelajs.co/api/v1/users', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        toast.success(`${title} created successfully 👌`);

        if (redirectPath) {
          window.location.href = redirectPath;
        }
      } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
        toast.error(`Failed to create ${title} 🤯`);
      } finally {
        setLoading(false);
      }
    } else {
      toast.info('Creation cancelled');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <ToastContainer />
      <Paper elevation={3}>
        <Box component="form" sx={styles.formContainer} onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom align="center">
            Create {title}
          </Typography>
          {/* استخدام البيانات المحملة في النموذج */}
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            type="password"
          />
          <TextField
            label="Avatar URL"
            name="avatar"
            value={userData.avatar}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={styles.button}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Create'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
