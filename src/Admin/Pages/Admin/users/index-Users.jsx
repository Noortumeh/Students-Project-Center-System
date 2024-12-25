// Admin/Pages/Admin/users/index-Users.jsx
import React from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import UserManagement from '../../../Components/user/User.jsx';
import { CircularProgress, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../../util/http for admin/http.js'; 

export default function IndexUsers() {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers 
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <Dashboard>
      <UserManagement 
        title="Users" 
        users={users} 
        role="user"  
        createPath="/users/create-user"  
        editPath="/users/edit"                  
      />
    </Dashboard>
  );  
}