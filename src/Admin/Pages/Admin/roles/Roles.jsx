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
import { Add, Delete, Update, PersonAdd, PersonRemove } from '@mui/icons-material';
import {
  fetchRoles,
  updateRole,
  createRole,
  deleteRole,
  assignRoleToUser,
  removeRoleFromUser,
} from '../../../../util/http for admin/http.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roles = () => {
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [userId, setUserId] = useState('');
  const queryClient = useQueryClient();

  const { data: roles = [], isLoading, isError } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    onError: (error) => {
      console.error('Error fetching roles:', error); // طباعة الخطأ هنا
      toast.error('Failed to load roles. Please try again.');
    },
    onSuccess: () => {
      console.log('Roles fetched successfully:', roles); // طباعة البيانات المحملة بنجاح
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      console.log('Role updated successfully'); // طباعة نجاح التحديث
      toast.success('Role updated successfully');
      queryClient.invalidateQueries(['roles']);
    },
    onError: (error) => {
      console.error('Error updating role:', error); // طباعة الخطأ عند فشل التحديث
      toast.error('Failed to update role. Please try again.');
    },
  });

  const mutationCreate = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      console.log('Role created successfully'); // طباعة نجاح الإنشاء
      toast.success('Role created successfully');
      queryClient.invalidateQueries(['roles']);
      setNewRoleName('');
    },
    onError: (error) => {
      console.error('Error creating role:', error); // طباعة الخطأ عند فشل الإنشاء
      toast.error('Failed to create role. Please try again.');
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      console.log('Role deleted successfully'); // طباعة نجاح الحذف
      toast.success('Role deleted successfully');
      queryClient.invalidateQueries(['roles']);
      setSelectedRole('');
    },
    onError: (error) => {
      console.error('Error deleting role:', error); // طباعة الخطأ عند فشل الحذف
      toast.error('Failed to delete role. Please try again.');
    },
  });

  const mutationAssignRole = useMutation({
    mutationFn: assignRoleToUser,
    onSuccess: () => {
      console.log('Role assigned to user successfully'); // طباعة نجاح التعيين
      toast.success('Role assigned to user successfully');
    },
    onError: (error) => {
      console.error('Error assigning role to user:', error); // طباعة الخطأ عند فشل التعيين
      toast.error('Failed to assign role to user. Please try again.');
    },
  });

  const mutationRemoveRole = useMutation({
    mutationFn: removeRoleFromUser,
    onSuccess: () => {
      console.log('Role removed from user successfully'); // طباعة نجاح الإزالة
      toast.success('Role removed from user successfully');
    },
    onError: (error) => {
      console.error('Error removing role from user:', error); // طباعة الخطأ عند فشل الإزالة
      toast.error('Failed to remove role from user. Please try again.');
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

  const handleAssignRole = () => {
    if (!selectedRole || !userId) {
      console.log('Assign failed: missing selected role or user ID');
      toast.error('Please select a role and enter a user ID.');
      return;
    }
    console.log('Assigning role with id:', selectedRole, 'to user with id:', userId);
    mutationAssignRole.mutate({ roleId: selectedRole, userId });
  };

  const handleRemoveRole = () => {
    if (!selectedRole || !userId) {
      console.log('Remove failed: missing selected role or user ID');
      toast.error('Please select a role and enter a user ID.');
      return;
    }
    console.log('Removing role with id:', selectedRole, 'from user with id:', userId);
    mutationRemoveRole.mutate({ roleId: selectedRole, userId });
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

        {/* Assign Role Card */}
        <Card>
          <CardContent>
            <Typography variant="h6">Assign Role</Typography>
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
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              sx={{ mb: 2 }}
            />
          </CardContent>
          <CardActions>
            <Button
              startIcon={<PersonAdd />}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleAssignRole}
              disabled={!selectedRole || !userId}
            >
              Assign
            </Button>
          </CardActions>
        </Card>

        {/* Remove Role Card */}
        <Card>
          <CardContent>
            <Typography variant="h6">Remove Role</Typography>
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
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              sx={{ mb: 2 }}
            />
          </CardContent>
          <CardActions>
            <Button
              startIcon={<PersonRemove />}
              fullWidth
              variant="contained"
              color="error"
              onClick={handleRemoveRole}
              disabled={!selectedRole || !userId}
            >
              Remove
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
