import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

export default function CreateSupervisior() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.escuelajs.co/api/v1/users', {
        name,
        email,
        role: 'supervisor',
      });
      toast.success('Supervisor created successfully!');
      navigate('/users/supervisor');
    } catch (error) {
      toast.error('Failed to create supervisor.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Supervisor
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Supervisor
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
