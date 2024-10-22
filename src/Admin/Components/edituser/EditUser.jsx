import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, CircularProgress, Box } from '@mui/material';
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
        toast.error('فشل في جلب تفاصيل المستخدم.');
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

    const confirmUpdate = window.confirm('هل أنت متأكد أنك تريد تحديث المستخدم؟');
    if (!confirmUpdate) return;

    try {
      await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, user);
      toast.success('تم تحديث المستخدم بنجاح');

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
      toast.error('فشل في تحديث المستخدم.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4">تعديل المستخدم</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="الاسم"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="البريد الإلكتروني"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* حقل نوع المستخدم للعرض فقط */}
        <TextField
          label="نوع المستخدم"
          name="type"
          value={user.type}
          fullWidth
          margin="normal"
          disabled
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          تحديث المستخدم
        </Button>
      </form>
    </Container>
  );
};

export default EditUserPage;
