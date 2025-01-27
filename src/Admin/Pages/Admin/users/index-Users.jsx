import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import {
  CircularProgress,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, fetchRoles, assignRoleToUser, removeRoleFromUser } from '../../../../util/http for admin/http.js';
import { Edit, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function IndexUsers() {
  const queryClient = useQueryClient();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { data: allRoles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });

  const assignRoleMutation = useMutation({
    mutationFn: ({ roleId, userId }) => assignRoleToUser({ roleId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Role assigned successfully');
      setOpenEditDialog(false);
    },
    onError: () => {
      toast.error('Error assigning role');
    },
  });

  const removeRoleMutation = useMutation({
    mutationFn: ({ roleId, userId }) => removeRoleFromUser({ roleId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Role removed successfully');
      setOpenDeleteDialog(false);
    },
    onError: () => {
      toast.error('Error removing role');
    },
  });

  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setSelectedRole('');
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
    setSelectedRole('');
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleAssignRole = () => {
    if (selectedUser && selectedRole) {
      assignRoleMutation.mutate({ roleId: selectedRole, userId: selectedUser.id });
    }
  };

  const handleRemoveRole = (roleId) => {
    if (selectedUser && roleId) {
      removeRoleMutation.mutate({ roleId, userId: selectedUser.id });
    }
  };

  // فلتر البيانات حسب الاسم والرول
  const filteredUsers = users.filter((user) => {
    const matchesName = user.firstName?.toLowerCase().includes(nameFilter.toLowerCase()) ||
                        user.lastName?.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesRole = roleFilter ? user.roles?.includes(roleFilter) : true;
    return matchesName && matchesRole;
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
        <Typography color="error">Error loading users: {error.message}</Typography>
      </Box>
    );
  }

  const columns = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <Box display="flex" justifyContent="space-around">
          <IconButton color="primary" onClick={() => handleOpenEditDialog(row)}>
            <Edit />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleOpenDeleteDialog(row)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Dashboard>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>

        {/* حقول الفلتر */}
        <Box mb={3} display="flex" gap={2}>
          <TextField
            label="Search by Name"
            variant="outlined"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="Filter by Role"
            >
              <MenuItem value="">All Roles</MenuItem>
              {allRoles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center">
                      {column.render ? column.render(user) : user[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog لتعديل الرول */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Role for {selectedUser?.firstName} {selectedUser?.lastName}</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel>Select Role</InputLabel>
              <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                label="Select Role"
              >
                {allRoles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAssignRole} color="primary">
            Assign Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog لحذف الرول */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Remove Role from {selectedUser?.firstName} {selectedUser?.lastName}</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            {selectedUser?.roles
              ?.filter((role) => !role.isPrimary)
              .map((role) => (
                <Box key={role.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography>{role.name}</Typography>
                  <Button
                    color="secondary"
                    onClick={() => handleRemoveRole(role.id)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Dashboard>
  );
}