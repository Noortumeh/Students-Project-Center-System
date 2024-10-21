import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return; // تأكد من عدم السماح بالتعديل أثناء التحميل
    }

    const confirmUpdate = window.confirm('Are you sure you want to update the user?');
    if (!confirmUpdate) return;

    try {
      await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, user);
      toast.success('User updated successfully');

      // توجيه المستخدم بناءً على نوعه مع الروابط الصحيحة
      if (user.type === 'student') {
        navigate('/users/student'); // توجيه إلى صفحة الطلاب
      } else if (user.type === 'customer') {
        navigate('/users/customer'); // توجيه إلى صفحة العملاء
      } else if (user.type === 'supervisor') {
        navigate('/users/supervisor'); // توجيه إلى صفحة المشرفين
      } else {
        navigate('/Action/UsersList'); // توجيه إلى قائمة المستخدمين
      }

    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4">Edit User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* حقل نوع المستخدم للعرض فقط */}
        <TextField
          label="User Type"
          name="type"
          value={user.type}
          fullWidth
          margin="normal"
          disabled
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Update User
        </Button>
      </form>
    </Container>
  );
};

export default EditUserPage;
