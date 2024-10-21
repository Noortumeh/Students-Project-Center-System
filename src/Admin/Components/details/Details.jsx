import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Paper, Container } from '@mui/material';
import { toast } from 'react-toastify';

const Details = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error(error); // تسجيل الخطأ في وحدة التحكم
        toast.error('فشل في جلب تفاصيل المستخدم.'); // رسالة خطأ للمستخدم
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          لم يتم العثور على مستخدم بهذا المعرف.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">البريد الإلكتروني: {user.email}</Typography>
        <Typography variant="body1">الدور: {user.role}</Typography>
      </Paper>
    </Container>
  );
};

export default Details;
