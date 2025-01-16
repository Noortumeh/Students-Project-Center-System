import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { Add, Delete, Update } from '@mui/icons-material';
import {
  fetchRoles,
  updateRole,
  createRole,
  deleteRole,
} from '../../../../util/http for admin/http.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roles = () => {
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const queryClient = useQueryClient();

  const { data: roles = [], isLoading, isError } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    onError: (error) => {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles. Please try again.');
    },
    onSuccess: () => {
      console.log('Roles fetched successfully:', roles);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      console.log('Role updated successfully');
      toast.success('Role updated successfully');
      queryClient.invalidateQueries(['roles']);
    },
    onError: (error) => {
      console.error('Error updating role:', error);
      toast.error('Failed to update role. Please try again.');
    },
  });

  const mutationCreate = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      console.log('Role created successfully');
      toast.success('Role created successfully');
      queryClient.invalidateQueries(['roles']);
      setNewRoleName('');
    },
    onError: (error) => {
      console.error('Error creating role:', error);
      toast.error('Failed to create role. Please try again.');
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      console.log('Role deleted successfully');
      toast.success('Role deleted successfully');
      queryClient.invalidateQueries(['roles']);
      setSelectedRole('');
    },
    onError: (error) => {
      console.error('Error deleting role:', error);
      toast.error('Failed to delete role. Please try again.');
    },
  });

  const handleUpdateRole = () => {
    if (!selectedRole || !newRoleName) {
      console.log('Update failed: missing selected role or new role name');
      toast.error('Please select a role and enter a new name.');
      return;
    }
    console.log('Updating role with id:', selectedRole, 'to new name:', newRoleName);
    mutationUpdate.mutate({ id: selectedRole, newRoleName });
  };

  const handleCreateRole = () => {
    if (!newRoleName) {
      console.log('Create failed: missing new role name');
      toast.error('Please enter a role name.');
      return;
    }
    console.log('Creating new role with name:', newRoleName);
    mutationCreate.mutate(newRoleName);
  };

  const handleDeleteRole = () => {
    if (!selectedRole) {
      console.log('Delete failed: missing selected role');
      toast.error('Please select a role to delete.');
      return;
    }
    console.log('Deleting role with id:', selectedRole);
    mutationDelete.mutate(selectedRole);
  };

  if (isLoading) {
    console.log('Loading roles...');
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    console.error('Error occurred while loading roles');
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">Failed to load roles. Please try again later.</Typography>
      </Box>
    );
  }

  console.log('Rendering roles:', roles);

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>Manage Roles</Typography>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {/* Create Role Card */}
        <Card>
          <CardContent>
            <Typography variant="h6">Create Role</Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Role Name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              sx={{ mb: 2 }}
            />
          </CardContent>
          <CardActions>
            <Button
              startIcon={<Add />}
              fullWidth
              variant="contained"
              color="success"
              onClick={handleCreateRole}
              disabled={!newRoleName}
            >
              Create
            </Button>
          </CardActions>
        </Card>

        {/* Update Role Card */}
        <Card>
          <CardContent>
            <Typography variant="h6">Update Role</Typography>
            <Select
              fullWidth
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              displayEmpty
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>Select a role</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>{role.roleName}</MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              variant="outlined"
              label="New Role Name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              sx={{ mb: 2 }}
            />
          </CardContent>
          <CardActions>
            <Button
              startIcon={<Update />}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleUpdateRole}
              disabled={!selectedRole || !newRoleName}
            >
              Update
            </Button>
          </CardActions>
        </Card>

        {/* Delete Role Card */}
        <Card>
          <CardContent>
            <Typography variant="h6">Delete Role</Typography>
            <Select
              fullWidth
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              displayEmpty
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>Select a role to delete</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>{role.roleName}</MenuItem>
              ))}
            </Select>
          </CardContent>
          <CardActions>
            <Button
              startIcon={<Delete />}
              fullWidth
              variant="contained"
              color="error"
              onClick={handleDeleteRole}
              disabled={!selectedRole}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Roles;
