import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Grid, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// مكون الداشبورد
function Dashboard() {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/users/student')) {
      setActiveLink('students');
    } else if (currentPath.startsWith('/users/customer')) {
      setActiveLink('customers');
    } else if (currentPath.startsWith('/users/supervisor')) {
      setActiveLink('supervisors');
    } else if (currentPath.startsWith('/posts/Announcements')) {
      setActiveLink('announcements');
    } else if (currentPath.startsWith('/posts/Publishing-projects')) {
      setActiveLink('publishing');
    } else if (currentPath.startsWith('/posts/Form')) {
      setActiveLink('form');
    } else if (currentPath.startsWith('/shared/TermOfServices')) {
      setActiveLink('termOfServices');
    } else if (currentPath.startsWith('/shared/Reports')) {
      setActiveLink('reports');
    } else {
      setActiveLink('home');
    }
  }, [location]);

  return (
    <Grid item md={3} xl={2} sx={{ bgcolor: 'primary.dark', height: '100vh', color: 'white', position: 'fixed' }}>
      <Grid container direction="column" alignItems="flex-start" sx={{ p: 2 }}>
        <Avatar alt="User" src="https://github.com/mdo.png" sx={{ mb: 2 }} />
        <Typography variant="h6">User</Typography>
        <Button color="inherit" component={Link} to="/" fullWidth sx={{ mt: 2, justifyContent: 'flex-start' }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/users/student" fullWidth sx={{ justifyContent: 'flex-start' }}>
          Students
        </Button>
        <Button color="inherit" component={Link} to="/users/customer" fullWidth sx={{ justifyContent: 'flex-start' }}>
          Customers
        </Button>
        <Button color="inherit" component={Link} to="/users/supervisor" fullWidth sx={{ justifyContent: 'flex-start' }}>
          Supervisors
        </Button>
        <Button color="inherit" component={Link} to="/shared/Reports" fullWidth sx={{ justifyContent: 'flex-start' }}>
          Reports
        </Button>
        {/* Add more buttons for navigation if needed */}
      </Grid>
    </Grid>
  );
}

// مكون UsersList مع الداشبورد
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  const getUsers = async () => {
    try {
      const { data } = await axios.get("https://api.escuelajs.co/api/v1/users");
      setUsers(data);
      setLoading(false); // إيقاف حالة التحميل عند جلب البيانات
    } catch (error) {
      console.error("Failed to fetch users", error);
      setError("Failed to fetch users.");
      setLoading(false); // إيقاف التحميل عند الخطأ
      toast.error("Failed to fetch users.");
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const userToDelete = users.find(user => user.id === id);
        if (!userToDelete) {
          toast.error("User not found.");
          return;
        }

        await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`);
        toast.success("User deleted successfully");
        setUsers(users.filter((user) => user.id !== id));

        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      } catch (error) {
        console.error("Failed to delete user", error);
        toast.error("Failed to delete user. Please check the data.");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // حالة التحميل
  }

  if (error) {
    return <div>{error}</div>; // حالة الخطأ
  }

  if (users.length === 0) {
    return <div>No users available</div>; // حالة عدم وجود مستخدمين
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Dashboard />
        <Grid item md={9} xl={10} sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Users List
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Middle Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Workgroup</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name.split(' ')[0]}</TableCell>
                    <TableCell>{user.name.split(' ')[1] || ''}</TableCell>
                    <TableCell>{user.name.split(' ')[2] || ''}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <IconButton color="primary" component={Link} to={`/user/edit/${user.id}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => deleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UsersList;
