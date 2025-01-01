import React, { useState, useEffect } from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Edit from '../../../Components/generalcomponent/Edit.jsx';

export default function EditSupervisor() {
  const location = useLocation(); // استخدام useLocation للحصول على بيانات المشرف من الصفحة السابقة
  const navigate = useNavigate();
  const supervisor = location.state?.supervisor;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: supervisor?.firstName || '',
    middleName: supervisor?.middleName || '',
    lastName: supervisor?.lastName || '',
    email: supervisor?.email || '',
  });

  useEffect(() => {
    if (!supervisor) {
      navigate('/'); 
    }
  }, [supervisor, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://spcs.somee.com/api/users/supervisors/${supervisor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update supervisor');
      }

      // بعد التحديث بنجاح، العودة إلى الصفحة الرئيسية أو صفحة أخرى
      navigate('/');
    } catch (error) {
      console.error('Error saving supervisor data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Dashboard>
      <Box p={3}>
        <TextField
          label="First Name"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Middle Name"
          fullWidth
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Last Name"
          fullWidth
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <Button onClick={handleSave} variant="contained" color="primary" sx={{ marginTop: '16px' }}>
          Save Changes
        </Button>
      </Box>
    </Dashboard>
  );
}
