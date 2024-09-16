import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Grid, Typography, Button, TextField, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, CircularProgress, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dashboard from '../../../shared/dashbord/Dashbord.jsx'; // استدعاء مكون الـ Dashboard

export default function OurCustomer() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // لتخزين النص المدخل في البحث
  const [entriesToShow, setEntriesToShow] = useState(10); // عدد الإدخالات التي سيتم عرضها
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  // جلب المستخدمين من API
  const getUsers = async () => {
    setLoading(true); // بدء حالة التحميل
    try {
      const { data } = await axios.get("https://api.escuelajs.co/api/v1/users");
      const customers = data.filter((user) => user.role === 'customer');

      // افتراضًا، نضيف حالة "Current" أو "Former" لكل عميل بشكل عشوائي (للمثال)
      const customersWithStatus = customers.map((user) => ({
        ...user,
        status: Math.random() > 0.5 ? 'Current' : 'Former',
        popularity: Math.floor(Math.random() * 100) + 1 // إضافة عشوائية لتحديد الشهرة
      }));

      // تصفية العملاء الأكثر شهرة فقط
      const topCustomers = customersWithStatus.sort((a, b) => b.popularity - a.popularity).slice(0, 5);

      setUsers(topCustomers);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setError("Failed to fetch users.");
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false); // إنهاء حالة التحميل
    }
  };

  // حذف المستخدم
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

  // تصفية المستخدمين بناءً على البحث
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Dashboard>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <CircularProgress />
        </Grid>
      </Dashboard>
    );
  }

  if (error) {
    return (
      <Dashboard>
        <Typography color="error">{error}</Typography>
      </Dashboard>
    );
  }

  return (
    <Dashboard> {/* تم استدعاء الـ Dashboard كمكون هنا */}
      <Container>
        <Typography variant="h4" gutterBottom>
          Top Customers List
        </Typography>

        {/* إضافة زر Create User بتصميم Material-UI */}
        <Grid container justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/user/create"
            startIcon={<i className="bi bi-plus"></i>}
            sx={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '8px' }}
          >
            Create User
          </Button>
        </Grid>

        {/* عناصر التحكم في الإدخالات والبحث */}
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <TextField
              select
              label="Show"
              value={entriesToShow}
              onChange={(e) => setEntriesToShow(e.target.value)}
              size="small"
              variant="outlined"
              sx={{ width: '100px' }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </TextField>
          </Grid>

          <Grid item>
            <TextField
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              variant="outlined"
              sx={{ width: '250px' }}
            />
          </Grid>
        </Grid>

        {/* حالة عدم وجود مستخدمين */}
        {filteredUsers.length === 0 ? (
          <Typography>No customers found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Middle Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(0, entriesToShow).map((user) => {
                  const names = user.name.split(' ');
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{names[0]}</TableCell>
                      <TableCell>{names[1] || ''}</TableCell>
                      <TableCell>{names[2] || ''}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" component={Link} to={`/user/edit/${user.id}`}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => deleteUser(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Dashboard>
  );
}
