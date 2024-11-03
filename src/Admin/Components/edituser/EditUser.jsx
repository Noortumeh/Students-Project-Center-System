import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    workgroup: '',
    status: '',
    role: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`); // استبدل بالـ API المناسب
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${id}`, user); // استبدل بالـ API المناسب
      navigate('/user-management');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <form>
      <TextField
        label=" Name"
        name="Name"
        value={user.Name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Work Group</InputLabel>
        <Select
          name="workgroup"
          value={user.workgroup}
          onChange={handleChange}
        >
          <MenuItem value="Group A">Group A</MenuItem>
          <MenuItem value="Group B">Group B</MenuItem>
          <MenuItem value="Group C">Group C</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={user.status}
          onChange={handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        fullWidth
        sx={{ mt: 2 }}
      >
        Save
      </Button>
    </form>
  );
};

export default UserEdit;
