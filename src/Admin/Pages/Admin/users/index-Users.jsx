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
  CircularProgress,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Height } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import {
  fetchUsers,
  fetchRoles,
  assignRoleToUser,
  removeRoleFromUser,
} from '../../../../util/http for admin/http.js';
import { Container } from 'react-bootstrap';

export default function IndexUsers() {
  const queryClient = useQueryClient();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // استعلام للحصول على المستخدمين
  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await fetchUsers();
    },
  });

  // استعلام للحصول على الأدوار
  const { data: allRoles = [], isLoading, error, refetch: refetchRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const roles = await fetchRoles();
      console.log('Fetched roles:', roles);
      return roles;
    },
  });

  // الميتود لتعيين الأدوار للمستخدم
  const assignRoleMutation = useMutation({
    mutationFn: async ({ roleId, userId }) => {
      console.log('Assigning role:', roleId, 'to user:', userId);
      return await assignRoleToUser({ roleId, userId });
    },
    onSuccess: (data) => {
      console.log('Role assigned successfully. Invalidating users query...');
      queryClient.invalidateQueries(['users']); // إعادة جلب البيانات
      refetchUsers(); // إعادة جلب البيانات بشكل فوري
      toast.success(data.message || 'Role assigned successfully');
      setOpenEditDialog(false); // إغلاق الـ Dialog
      setSelectedUser(null); // إعادة تعيين المستخدم المحدد
      setSelectedRole([]); // إعادة تعيين الأدوار المحددة
    },
    onError: (error) => {
      console.error('Error assigning role:', error);
      toast.error(error.message || 'Error assigning role');
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
      queryClient.invalidateQueries(['users']); // إعادة جلب البيانات
      refetchUsers(); // إعادة جلب البيانات بشكل فوري
      toast.success('Role removed successfully');
      setOpenDeleteDialog(false); // إغلاق الـ Dialog
      setSelectedUser(null); // إعادة تعيين المستخدم المحدد
    },
    onError: (error) => {
      console.error('Error removing role:', error);
      toast.error(error.message || 'Error removing role');
    },
  });

  // فتح نافذة التعديل للأدوار
  const handleOpenEditDialog = (user) => {
    console.log('User object:', user);
    setSelectedUser(user);

    let currentRoles = [];

    currentRoles = [user.role.id || user.role];

    console.log('Extracted Roles:', currentRoles);
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
    console.log('selectedRole:', selectedRole);
    console.log('selectedUser:', selectedUser);

    if (!selectedUser) {
      toast.error('No user selected.');
      return;
    }

    if (selectedRole.length === 0) {
      toast.error('Please select at least one role before assigning.');
      return;
    }

    // تحقق من أن المستخدم لا يملك الدور بالفعل
    const userRoles = selectedUser.role.split(',').map(role => role.trim());
    const roleToAssign = allRoles.find(role => role.id === selectedRole[0]);

    if (userRoles.includes(roleToAssign.name)) {
      toast.error('User already has this role.');
      return;
    }

    // إرسال roleId كقيمة واحدة
    assignRoleMutation.mutate({
      roleId: selectedRole[0], // إرسال أول عنصر في المصفوفة
      userId: selectedUser.id,
    });
  };

  const handleRemoveRole = () => {
    if (!selectedUser || !selectedUser.role) {
      toast.error('No user or role selected.');
      return;
    }

    // تحليل السلسلة النصية لفصل الأدوار
    const roles = selectedUser.role.split(',').map(role => role.trim());

    // تحديد الأدوار التي يمكن حذفها (ما عدا الأساسية)
    const rolesToRemove = roles.filter(role => !['Supervisor', 'Admin', 'user'].includes(role));

    if (rolesToRemove.length === 0) {
      toast.error('No removable roles found.');
      return;
    }

    if (!selectedRole || selectedRole.length === 0) {
      toast.error('Please select a role to remove.');
      return;
    }

    const roleToRemove = rolesToRemove.find(role => role === allRoles.find(r => r.id === selectedRole[0]).name);

    if (roleToRemove) {
      // حذف الدور المحدد فقط
      const roleToRemoveObj = allRoles.find(r => r.name === roleToRemove);
      if (roleToRemoveObj) {
        removeRoleMutation.mutate({
          roleId: roleToRemoveObj.id,
          userId: selectedUser.id,
        });
      }
    } else {
      toast.error('Invalid role selected for removal.');
    }
  };

  // تحضير البيانات لعرضها في الجدول
  const formattedUsers = users.map((user, index) => {
    console.log("User data:", user);  // إضافة هذا السطر للتأكد من وجود رقم الهاتف
    const names = user.fullName.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ');
  
    const roleNames = Array.isArray(user.role)
      ? user.role.map((r) => (typeof r === 'string' ? r : r.name)).join(', ')
      : user.role.name || '';
  
    return {
      id: user.id || index,
      fullName: `${firstName} ${lastName}`,
      email: user.email,
      address: user.address || 'No address', 
      phone: user.phoneNumber || 'No phone number', // تأكد من أن رقم الهاتف هنا
      role: roleNames,
    };
  });
  
  

  // دالة لتصفية الأدوار المعروضة في نافذة إزالة الدور
  const getFilteredRolesForRemoval = () => {
    if (!selectedUser || !allRoles.length) return [];

    // الأدوار التي يمتلكها المستخدم
    const userRoles = selectedUser.role || [];
    const userRoleNames = typeof userRoles === 'string'
      ? userRoles.split(',').map(role => role.trim())
      : Array.isArray(userRoles)
        ? userRoles.map((r) => (typeof r === 'string' ? r : r.name))
        : [userRoles.name || userRoles];

    // تصفية الأدوار التي يمكن حذفها (ما عدا الأدوار الأساسية مثل Supervisor, Admin, user)
    return allRoles.filter((role) =>
      userRoleNames.includes(role.name) && !['Supervisor', 'Admin', 'user'].includes(role.name)
    );
  };

  // دالة لتصفية الأدوار المعروضة في نافذة تعيين الدور
  const getFilteredRolesForAssignment = () => {
    if (!selectedUser || !allRoles.length) return allRoles;

    // الأدوار التي يمتلكها المستخدم
    const userRoles = selectedUser.role || [];
    const userRoleNames = typeof userRoles === 'string'
      ? userRoles.split(',').map(role => role.trim())
      : Array.isArray(userRoles)
        ? userRoles.map((r) => (typeof r === 'string' ? r : r.name))
        : [userRoles.name || userRoles];

    // تصفية الأدوار التي يمكن تعيينها (ما عدا الأدوار التي يمتلكها المستخدم بالفعل)
    return allRoles.filter((role) =>
      !userRoleNames.includes(role.name)
    );
  };

  
  const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 240, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Email', width: 245, headerAlign: 'center', align: 'center' },
    { field: 'address', headerName: 'Address', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'phone', headerName: 'Phone', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'role', headerName: 'Role', width: 180, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <IconButton color="primary" onClick={() => console.log('Edit', params.row)}>
            <Edit />
          </IconButton>
          <IconButton color="secondary" onClick={() => console.log('Delete', params.row)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];
  // تحقق من حالة التحميل أو الخطأ
  if (isLoading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">Error loading roles</Typography>
      </Box>
    );
  }

  if (allRoles.length === 0) {
    return <Typography>No roles available.</Typography>;
  }

  return (
      <Container>
        <Box p={3} sx={{ mt: 6, width: "100%", Height: "100vh",ml:10 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold', textAlign: 'center',mt:3 }}>
          Users
        </Typography>

          <Paper sx={{ width: { xs: '11rem', sm: '25rem', md: '45rem', lg: '75rem' }, Height: "100vh" }}>
            <DataGrid
              autoHeight
              rows={formattedUsers}
              columns={columns}

              getRowId={(row) => row.id}

            />
          </Paper>
        </Box>

        {/* Dialog لتعديل الرول */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle sx={{ backgroundColor: '#2c3e50', color: '#fff' }}>
            Edit Role for {selectedUser?.fullName}
          </DialogTitle>
          <DialogContent>
            <Box mt={2}>
              <FormControl fullWidth>
                <InputLabel>Select Role</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={(e) => {
                    console.log('Selected roles:', e.target.value);
                    setSelectedRole(e.target.value);
                  }}

                >
                  {getFilteredRolesForAssignment().length > 0 ? (
                    getFilteredRolesForAssignment().map((role) => (
                      <MenuItem
                        key={role.id}
                        value={role.id}
                        disabled={selectedUser?.role?.split(',').map((role) => role.trim()).includes(role.name)}
                      >
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

        {/* Dialog لحذف الدور */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle >
            Remove Role from {selectedUser?.fullName}
          </DialogTitle>
          <DialogContent>
            <Box mt={2}>
              <FormControl fullWidth>
                <InputLabel>Select Role</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {getFilteredRolesForRemoval().length > 0 ? (
                    getFilteredRolesForRemoval().map((role) => (
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
            <Button onClick={handleCloseDeleteDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleRemoveRole} color="primary">
              Remove Role
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
  );
}
