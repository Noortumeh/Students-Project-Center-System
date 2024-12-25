// Admin/Pages/Admin/roles/Roles.jsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Box, Typography, Button, Select, MenuItem, CircularProgress, Grid, Paper } from '@mui/material';
import { fetchRoles, updateRole, createRole, deleteRole } from '../../../../util/http for admin/http.js'; 

const Roles = () => {
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const { data: roles = [], isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });

  const mutationUpdate = useMutation({
    mutationFn: updateRole,
  });

  const mutationCreate = useMutation({
    mutationFn: createRole,
  });

  const mutationDelete = useMutation({
    mutationFn: deleteRole,
  });

  const handleUpdateRole = () => {
    if (selectedRole) {
      mutationUpdate.mutate({ id: selectedRole, newRoleName });
    }
  };

  const handleCreateRole = () => {
    if (newRoleName) {
      mutationCreate.mutate(newRoleName);
    }
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      mutationDelete.mutate(selectedRole);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '400px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Manage Roles</Typography>
        
        <Select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>Select a role</MenuItem>
          {roles.length > 0 ? (
            roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>{role.roleName}</MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>No roles available</MenuItem>
          )}
        </Select>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleUpdateRole} 
          sx={{ mb: 1, width: '100%' }}
        >
          Update Role
        </Button>

        <Box mt={2}>
          <input
            type="text"
            placeholder="New Role Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          />
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleCreateRole} 
            sx={{ mb: 1, width: '100%' }}
          >
            Create Role
          </Button>
        </Box>

        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDeleteRole} 
          sx={{ width: '100%' }}
        >
          Delete Role
        </Button>
      </Paper>
    </Box>
  );
};

export default Roles;