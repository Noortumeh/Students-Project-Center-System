import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Grid, Typography, Button, CircularProgress } from '@mui/material'; // إضافة CircularProgress هنا
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import Filters from '../../../Components/generalcomponent/Filters.jsx'; 
import UserCard from '../../../Components/generalcomponent/UserCard.jsx'; 
import ActionButtons from '../../../Components/generalcomponent/ActionButtons.jsx'; 

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
        location: user.address || 'Unknown Location',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
      confirmButtonText: 'Yes, delete it!',
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
          {/* استخدام CircularProgress في حالة التحميل */}
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
            to={"/users/CreateStudents"}
            sx={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '8px' }}
          >
            Create User
          </Button>
        </Grid>

        <Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} entriesToShow={entriesToShow} setEntriesToShow={setEntriesToShow} />

        <Grid container spacing={3}>
          {filteredUsers.slice(0, entriesToShow).map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <UserCard user={user} />
              <ActionButtons type="user" onDelete={() => deleteUser(user.id)} onEdit={() => {}} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Dashboard>
  );
}
