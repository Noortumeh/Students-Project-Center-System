import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Box, Typography, Button, Select, MenuItem, CircularProgress, Grid, Paper, TextField } from '@mui/material';
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
    if (selectedRole && newRoleName) {
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '400px', textAlign: 'center', borderRadius: '8px', boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>Manage Roles</Typography>

        <Typography variant="body1" sx={{ color: '#777', mb: 2 }}>Select an existing role to update or delete, or create a new role.</Typography>

        {/* Select Role for Update/Delete */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#3f51b5' }}>Select Role</Typography>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mb: 2, borderRadius: '4px', backgroundColor: '#fff', boxShadow: 1 }}
            disabled={roles.length === 0}
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
        </Box>

        {/* Update Role Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#4caf50' }}>Update Role</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleUpdateRole} 
            sx={{ mb: 1, width: '100%', borderRadius: '4px' }}
            disabled={!selectedRole || !newRoleName}
          >
            Update Role
          </Button>
        </Box>

        {/* Create Role Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#ff9800' }}>Create New Role</Typography>
          <TextField
            variant="outlined"
            fullWidth
            label="New Role Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleCreateRole} 
            sx={{ mb: 1, width: '100%', borderRadius: '4px' }}
            disabled={!newRoleName}
          >
            Create Role
          </Button>
        </Box>

        {/* Delete Role Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#f44336' }}>Delete Role</Typography>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleDeleteRole} 
            sx={{ width: '100%', borderRadius: '4px' }}
            disabled={!selectedRole}
          >
            Delete Role
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Roles;
