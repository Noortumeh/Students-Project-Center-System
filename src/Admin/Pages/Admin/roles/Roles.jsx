import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography, Button, Select, MenuItem, CircularProgress, TextField, Paper } from '@mui/material';
import { fetchRoles, updateRole, createRole, deleteRole } from '../../../../util/http for admin/http.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roles = () => {
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const queryClient = useQueryClient();

  // Fetch roles
  const { data: roles = [], isLoading, isError } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    onError: () => toast.error('Failed to load roles. Please try again.'),
  });

  // Mutations
  const mutationUpdate = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      toast.success('Role updated successfully');
      queryClient.invalidateQueries(['roles']);
    },
    onError: () => toast.error('Failed to update role. Please try again.'),
  });

  const mutationCreate = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      toast.success('Role created successfully');
      queryClient.invalidateQueries(['roles']);
      setNewRoleName(''); // Clear input
    },
    onError: () => toast.error('Failed to create role. Please try again.'),
  });

  const mutationDelete = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      toast.success('Role deleted successfully');
      queryClient.invalidateQueries(['roles']);
      setSelectedRole(''); // Clear selected role
    },
    onError: () => toast.error('Failed to delete role. Please try again.'),
  });

  // Handlers
  const handleUpdateRole = () => {
    if (!selectedRole || !newRoleName) {
      toast.error('Please select a role and enter a new name.');
      return;
    }
    mutationUpdate.mutate({ id: selectedRole, newRoleName });
  };

  const handleCreateRole = () => {
    if (!newRoleName) {
      toast.error('Please enter a role name.');
      return;
    }
    mutationCreate.mutate(newRoleName);
  };

  const handleDeleteRole = () => {
    if (!selectedRole) {
      toast.error('Please select a role to delete.');
      return;
    }
    mutationDelete.mutate(selectedRole);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">Failed to load roles. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '400px', textAlign: 'center', borderRadius: '8px', boxShadow: 2 }}>
        <Typography variant="h4" gutterBottom>Manage Roles</Typography>

        {/* Select Role */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Select Role</Typography>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mb: 2, borderRadius: 2 }}
          >
            <MenuItem value="" disabled>Select a role</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>{role.roleName}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* Update Role */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Update Role</Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="New Role Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleUpdateRole} disabled={!selectedRole || !newRoleName}>
            Update Role
          </Button>
        </Box>

        {/* Create Role */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Create Role</Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Role Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" color="success" onClick={handleCreateRole} disabled={!newRoleName}>
            Create Role
          </Button>
        </Box>

        {/* Delete Role */}
        <Box>
          <Typography variant="h6">Delete Role</Typography>
          <Button fullWidth variant="contained" color="error" onClick={handleDeleteRole} disabled={!selectedRole}>
            Delete Role
          </Button>
        </Box>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default Roles;
