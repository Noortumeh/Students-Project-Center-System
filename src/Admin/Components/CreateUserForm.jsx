import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
/* eslint-disable react/prop-types */

const CreateUserForm = ({ userData, setUserData, loading, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px' }}>
      <Typography variant="h4" gutterBottom align="center">Create User</Typography>
      <TextField label="Name" name="name" value={userData.name} onChange={handleChange} variant="outlined" fullWidth required />
      <TextField label="Email" name="email" value={userData.email} onChange={handleChange} variant="outlined" fullWidth required type="email" />
      <TextField label="Password" name="password" value={userData.password} onChange={handleChange} variant="outlined" fullWidth required type="password" />
      <TextField label="Avatar URL" name="avatar" value={userData.avatar} onChange={handleChange} variant="outlined" fullWidth required />
      <Button type="submit" variant="contained" sx={{ backgroundColor: '#1976d2', color: '#fff', fontWeight: 'bold', padding: '12px 20px', borderRadius: '8px', fontSize: '18px', '&:hover': { backgroundColor: '#115293' } }} disabled={loading}>
        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Create'}
      </Button>
    </Box>
  );
};

export default CreateUserForm;
