import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx'; 

export default function OurCustomer() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://api.escuelajs.co/api/v1/users");
      const customers = data.filter((user) => user.role === 'customer');

      const customersWithStatus = customers.map((user) => ({
        ...user,
        status: Math.random() > 0.5 ? 'Current' : 'Former',
        location: user.address || 'Unknown Location', // إضافة الموقع
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // وصف عشوائي
      }));

      const topCustomers = customersWithStatus.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
      setUsers(topCustomers);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setError("Failed to fetch users.");
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
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
    <Dashboard>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Our Top Customers
        </Typography>

        <Grid container justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/user/create"
            sx={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '8px' }}
          >
            Create User
          </Button>
        </Grid>

        <Grid container spacing={3}>
          {filteredUsers.slice(0, entriesToShow).map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card>
                <CardMedia>
                  <Avatar alt={user.name} src={user.avatar} sx={{ width: 100, height: 100, mx: 'auto', mt: 2 }} />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                    {user.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {user.description}
                  </Typography>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        backgroundColor: user.status === 'Current' ? 'green' : 'gray',
                        color: 'white',
                      }}
                    >
                      {user.status}
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <IconButton color="primary" component={Link} to={`/user/edit/${user.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => deleteUser(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Dashboard>
  );
}
