import React from 'react';
import GeneralTable from '../generalcomponent/GeneralTable.jsx'; 
import ActionButtons from './../generalcomponent/ActionButtons'; 
import { Box, Typography, Grid, Container } from '@mui/material';

const UserManagement = ({ title, users, role, createPath, editPath }) => {
  const headers = [
    { id: 'name', label: 'Name' },
    { id: 'workgroup', label: 'Workgroup' },
    { id: 'role', label: 'Role' },
    { id: 'status', label: 'Status' },
  ];

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
  };

  
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {title} Management
        </Typography>
        
       
        <GeneralTable
          columns={headers}
          data={users.map(user => ({
            ...user,
            actions: <ActionButtons
                        onEdit={() => handleEdit(user.id)}
                        type={role}
                      />
          }))}
        />
      </Box>
    </Container>
  );
};

export default UserManagement;
