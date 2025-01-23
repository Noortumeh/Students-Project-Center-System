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
  Button,
  Paper,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRoleData } from '../../../../util/http for admin/http.js';
import { Edit, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { assignRoleToUser, removeRoleFromUser } from '../../../../util/http for admin/http.js'; // تأكد من استيراد هذه الدوال بشكل صحيح

export default function IndexUsers() {
  const queryClient = useQueryClient();
  
  // استعلام لجلب المستخدمين بناءً على الدور
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchRoleData('customer'), // استبدال fetchUsers بـ fetchRoleData
  });

  // Mutation لتعيين الدور
  const assignRoleMutation = useMutation({
    mutationFn: ({ roleId, userId }) => assignRoleToUser(roleId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Role assigned successfully');
    },
    onError: () => {
      toast.error('Error assigning role');
    }
  });

  // Mutation لإزالة الدور
  const removeRoleMutation = useMutation({
    mutationFn: ({ roleId, userId }) => removeRoleFromUser(roleId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Role removed successfully');
    },
    onError: () => {
      toast.error('Error removing role');
    }
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

  // الدالة لتعيين الدور
  const handleAssignRole = (roleId, userId) => {
    assignRoleMutation.mutate({ roleId, userId });
  };

  // الدالة لإزالة الدور
  const handleRemoveRole = (roleId, userId) => {
    removeRoleMutation.mutate({ roleId, userId });
  };

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <Box display="flex" justifyContent="space-around">
          <IconButton
            color="primary"
            onClick={() => handleAssignRole(1, row.id)} // استبدال 1 بالقيم الصحيحة للدور
          >
            <Edit />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleRemoveRole(1, row.id)} // استبدال 1 بالقيم الصحيحة للدور
          >
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center">{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
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
    </Dashboard>
  );
}
