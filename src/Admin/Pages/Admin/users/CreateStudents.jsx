import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

export default function CreateStudents() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // حالة التحميل
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // بدء التحميل
    try {
      await axios.post('https://api.escuelajs.co/api/v1/users', {
        name,
        email,
        role: 'student',
      });
      toast.success('Student created successfully!');
      navigate('/users/student');
    } catch (error) {
      toast.error('Failed to create student.');
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Student
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            disabled={loading} // تعطيل الحقول أثناء التحميل
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            disabled={loading} // تعطيل الحقول أثناء التحميل
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Student'} {/* عرض اللودر بدلاً من النص */}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
