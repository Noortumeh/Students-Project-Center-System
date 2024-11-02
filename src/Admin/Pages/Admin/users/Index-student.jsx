import React, { useState, useEffect } from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import UserManagement from '../../../Components/user/User.jsx';
import { CircularProgress, Box } from '@mui/material';

export default function IndexStudent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const fetchData = async () => {
      try {
        // يمكنك استدعاء البيانات من الـ API هنا إذا لزم الأمر
        await fetch('https://api.escuelajs.co/api/v1/users'); // استدعاء البيانات
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Dashboard>
      <UserManagement 
        title="Student" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
<<<<<<< HEAD
        createPath="/users/create-student"   
        editPath="/users/edit"                
=======
        role="student"  // تعديل الدور هنا إلى "student"               
>>>>>>> main
      />
    </Dashboard>
  );
}
