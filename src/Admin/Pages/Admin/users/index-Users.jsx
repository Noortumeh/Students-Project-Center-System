import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import {
  fetchUsers,
  fetchRoles,
  assignRoleToUser,
  removeRoleFromUser,
} from '../../../../util/http for admin/http.js';

export default function IndexUsers() {
  const queryClient = useQueryClient();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // استعلام للحصول على المستخدمين
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log('Fetching users...');
      return await fetchUsers();
    },
  });

  // استعلام للحصول على الأدوار
  const { data: allRoles = [], isLoading, error, refetch } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      console.log('Fetching roles...');
      const roles = await fetchRoles();
      console.log('Fetched roles:', roles); // تحقق من البيانات هنا
      return roles;
    },
  });

  // الميتود لتعيين الأدوار للمستخدم
  const assignRoleMutation = useMutation({
    mutationFn: async ({ roleIds, userId }) => {
      console.log('Assigning roles:', roleIds, 'to user:', userId);
      return await assignRoleToUser({ roleIds, userId });
    },
    onSuccess: () => {
      console.log('Roles assigned successfully. Invalidating users query...');
      queryClient.invalidateQueries(['users']);
      toast.success('Roles assigned successfully');
      setOpenEditDialog(false);
    },
    onError: (error) => {
      console.error('Error assigning roles:', error);
      toast.error('Error assigning roles');
    },
  });

  // الميتود لإزالة دور من المستخدم
  const removeRoleMutation = useMutation({
    mutationFn: async ({ roleId, userId }) => {
      console.log('Removing role:', roleId, 'from user:', userId);
      return await removeRoleFromUser({ roleId, userId });
    },
    onSuccess: () => {
      console.log('Role removed successfully. Invalidating users query...');
      queryClient.invalidateQueries(['users']);
      toast.success('Role removed successfully');
      setOpenDeleteDialog(false);
    },
    onError: (error) => {
      console.error('Error removing role:', error);
      toast.error('Error removing role');
    },
  });

  // فتح نافذة التعديل للأدوار
  const handleOpenEditDialog = (user) => {
    console.log('User object:', user); // طباعة بيانات المستخدم للتأكد
    setSelectedUser(user);

    let currentRoles = [];

    // التحقق مما إذا كان user.role مصفوفة قبل استخدام map
    if (Array.isArray(user.role)) {
      currentRoles = user.role.map((r) => (typeof r === 'string' ? r : r.id));
    } else if (typeof user.role === 'string') {
      currentRoles = [user.role]; // إذا كان نصًا واحدًا، نحوله إلى مصفوفة
    } else if (user.role && typeof user.role === 'object' && user.role.id) {
      currentRoles = [user.role.id]; // إذا كان كائنًا واحدًا، نحوله إلى مصفوفة
    }

    console.log('Extracted Roles:', currentRoles); // طباعة القيم للتحقق
    setSelectedRole(currentRoles);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
    setSelectedRole([]);
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
    console.log('selectedRole:', selectedRole); // طباعة الأدوار المحددة
    console.log('selectedUser:', selectedUser); // طباعة المستخدم المحدد

    if (!selectedUser) {
      toast.error('No user selected.');
      return;
    }

    if (selectedRole.length === 0) {
      toast.error('Please select at least one role before assigning.');
      return;
    }

    assignRoleMutation.mutate({ roleIds: selectedRole, userId: selectedUser.id });
  };

  const handleRemoveRole = (roleId) => {
    if (selectedUser && roleId) {
      removeRoleMutation.mutate({ roleId, userId: selectedUser.id });
    } else {
      toast.error('No user or role selected.');
    }
  };

  // تحضير البيانات لعرضها في الجدول
  const formattedUsers = users.map((user, index) => {
    const names = user.fullName.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ');

    // طباعة الأدوار المرتبطة بالمستخدم
    const roleNames = Array.isArray(user.role)
      ? user.role.map((r) => (typeof r === 'string' ? r : r.name)).join(', ')
      : '';

    console.log('User roles:', roleNames); // طباعة الأدوار المجمعة للمستخدم

    return {
      id: user.id || index,
      fullName: `${firstName} ${lastName}`,
      email: user.email,
      role: roleNames,
    };
  });

  console.log('Formatted Users:', formattedUsers); // طباعة المستخدمين الذين تم تنسيقهم

  const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <IconButton color="primary" onClick={() => handleOpenEditDialog(params.row)}>
            <Edit />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleOpenDeleteDialog(params.row)}>
            <Delete />
          </IconButton>
        </Box>
      ),
      width: 150,
    },
  ];

  console.log('Roles available:', allRoles); // طباعة الأدوار المتاحة

  // التحقق من حالة التحميل أو الخطأ
  if (isLoading) {
    return <Typography>Loading roles...</Typography>;
  }

  if (error) {
    return (
      <Box>
        <Typography>Error loading roles</Typography>
        <Button onClick={() => refetch()}>Retry</Button>
      </Box>
    );
  }

  // إذا لم تكن هناك أدوار متاحة، طباعة رسالة مناسبة
  if (allRoles.length === 0) {
    console.log('No roles available.');
    return <Typography>No roles available.</Typography>;
  }

  return (
    <Dashboard>
      <Box p={3} sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>

        <Paper>
          <DataGrid
            autoHeight
            rows={formattedUsers}
            columns={columns}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            pagination
            getRowId={(row) => row.id}
            onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
          />
        </Paper>
      </Box>

      {/* Dialog لتعديل الرول */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Role for {selectedUser?.fullName}</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel>Select Role</InputLabel>
              <Select
                multiple
                value={selectedRole}
                onChange={(e) => {
                  console.log('Selected roles:', e.target.value); // طباعة الأدوار المحددة
                  setSelectedRole(e.target.value);
                }}
              >
                {allRoles.length > 0 ? (
                  allRoles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No roles available</MenuItem>
                )}
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
        <DialogTitle>Remove Role from {selectedUser?.fullName}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this role?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveRole(selectedUser.role[0]?.id || selectedUser.role)}
            color="primary"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Dashboard>
  );
}