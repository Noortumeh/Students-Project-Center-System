import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box, Button } from '@mui/material';
import UserManagement from '../../../Components/user/User.jsx';
import { fetchCustomers } from '../../../../util/http for admin/http.js'; 

export default function IndexCustomer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(20);

  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers, // استدعاء الدالة الجديدة
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <p>Error fetching customers: {error.message}</p>
      </Box>
    );
  }

  return (
    <Dashboard>
      <UserManagement 
        title="Customer" 
        users={customers} 
        role="customer"  
        createPath="/users/create-customer"   
        editPath="/Action/edit/:id"                
      />
    </Dashboard>
  );
}