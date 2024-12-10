import React, { useState } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import GeneralTable from '../generalcomponent/GeneralTable.jsx'; 
import ActionButtons from './../generalcomponent/ActionButtons'; 
import AddUserButton from '../generalcomponent/AddUserButton.jsx';

const UserPage = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const users = [
    { id: 1, name: 'John Doe', workgroup: 'Engineering', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Jane Smith', workgroup: 'Marketing', role: 'Manager', status: 'Inactive' },
    { id: 3, name: 'Alice Johnson', workgroup: 'Finance', role: 'Analyst', status: 'Active' },
    { id: 4, name: 'Bob Lee', workgroup: 'Engineering', role: 'Developer', status: 'Inactive' },
  ];

  const headers = [
    { id: 'name', label: 'Name' },
    { id: 'workgroup', label: 'Workgroup' },
    { id: 'role', label: 'Role' },
    { id: 'status', label: 'Status' },
  ];

  const onRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete user with ID:', id);
  };

  const handleDetailsClick = (id) => {
    console.log('View details of user with ID:', id);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        
        <Grid container spacing={2} justifyContent="flex-end">
          <AddUserButton title="User" />
        </Grid>

        <GeneralTable
          columns={headers}
          data={users.map(user => ({
            ...user,
            actions: <ActionButtons
                        onEdit={() => handleEdit(user.id)}
                        onDelete={() => handleDelete(user.id)}
                        onClick={() => handleDetailsClick(user.id)}
                        type="user"
                      />
          }))}
          orderBy={orderBy}
          order={order}
          onRequestSort={onRequestSort}
        />
      </Box>
    </Container>
  );
};

export default UserPage;
