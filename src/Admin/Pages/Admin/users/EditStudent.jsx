import React, { useState, useEffect } from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import EditUser from '../../../Components/edituser/EditUser.jsx';
import { CircularProgress, Box } from '@mui/material';

export default function EditStudent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة التحميل (يمكنك استخدام هذه المرحلة لتحميل بيانات المستخدم)
    const loadUserData = async () => {
      // ضع هنا كود لتحميل بيانات المستخدم إذا لزم الأمر
      // بعد الانتهاء من التحميل، اضبط حالة التحميل إلى false
      setLoading(false);
    };

    loadUserData();
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
      <EditUser
        userType="Student"
        apiPath="https://api.escuelajs.co/api/v1/users"
        redirectPath="/users/student"
      />
    </Dashboard>
  );
}
