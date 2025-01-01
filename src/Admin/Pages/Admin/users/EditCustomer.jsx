import React, { useState, useEffect } from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import Edit from '../../../Components/generalcomponent/Edit.jsx';
import { CircularProgress, Box } from '@mui/material';

export default function EditCustomer() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUserData = async () => {
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
        userType="Customer"
        apiPath="https://api.escuelajs.co/api/v1/users"
        redirectPath="/users/customer/edit/:id"  // تعديل المسار هنا
      />
    </Dashboard>
  );
}
