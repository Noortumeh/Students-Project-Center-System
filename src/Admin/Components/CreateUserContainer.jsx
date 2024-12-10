import { useState } from 'react';  
import { Container, Paper } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateUserForm from './CreateUserForm';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';  

const CreateUserContainer = ({ title = 'User', redirectPath }) => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', avatar: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to add this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await axios.post('https://api.escuelajs.co/api/v1/users', userData, { headers: { 'Content-Type': 'application/json' } });
        toast.success(`${title} created successfully 👌`);
        if (redirectPath) {
          window.location.href = redirectPath;
        }
      } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
        toast.error(`Failed to create ${title} 🤯`);
      } finally {
        setLoading(false);
      }
    } else {
      toast.info('Creation cancelled');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <ToastContainer />
      <Paper elevation={3}>
        <CreateUserForm userData={userData} setUserData={setUserData} loading={loading} handleSubmit={handleSubmit} />
      </Paper>
    </Container>
  );
};

CreateUserContainer.propTypes = {
  title: PropTypes.string,        
  redirectPath: PropTypes.string,   
};

export default CreateUserContainer;
