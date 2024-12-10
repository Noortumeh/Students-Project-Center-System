import React, { useState, useEffect } from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import UserManagement from '../../../Components/user/User.jsx';
import { CircularProgress, Box } from '@mui/material';

export default function IndexCustomer() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const fetchData = async () => {
      try {
        // يمكنك استدعاء البيانات من الـ API هنا إذا لزم الأمر
        // على سبيل المثال:
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
        title="Customer" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
        role="customer"  // تعديل الدور هنا إلى "customer"
        createPath="/users/create-customer"   
        editPath="/Action/edit/:id"                
      />
    </Dashboard>
  );
}
