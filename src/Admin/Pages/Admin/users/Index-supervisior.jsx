import React from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import UserManagement from '../../../Components/user/User.jsx';
import { CircularProgress, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchSupervisors } from '../../../../util/http for admin/http.js'; // استيراد الدالة الجديدة

export default function IndexSupervisor() {
  const { data: supervisors = [], isLoading, error } = useQuery({
    queryKey: ['supervisors'],
    queryFn: fetchSupervisors // استدعاء الدالة الجديدة
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading supervisors: {error.message}</div>;
  }

  return (
    <Dashboard>
      <UserManagement 
        title="Supervisor" 
        users={supervisors} // تمرير البيانات المسترجعة
        role="supervisor"  // تعديل الدور هنا إلى "supervisor"
        createPath="/users/create-supervisor"  
        editPath="/users/edit"                  
      />
    </Dashboard>
  );  
}