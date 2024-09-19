import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar, Box, Grid, Typography, Paper, List,
  ListItem, ListItemIcon, ListItemText, Divider,
} from '@mui/material';
import { AccountCircle, Work, Group, PostAdd, BarChart, Logout } from '@mui/icons-material';

export default function Details() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const getUser = async () => {
    try {
      const { data } = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Paper sx={{ width: 280, padding: 2, backgroundColor: '#3f51b5', color: 'white' }} elevation={3}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar alt="User Avatar" src="https://github.com/mdo.png" sx={{ width: 56, height: 56 }} />
          <Typography variant="h6" mt={2}>User</Typography>
        </Box>
        <Divider sx={{ backgroundColor: 'white' }} />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <AccountCircle sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/users/student">
            <ListItemIcon>
              <Group sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem button component={Link} to="/users/customer">
            <ListItemIcon>
              <Group sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button component={Link} to="/users/supervisor">
            <ListItemIcon>
              <Group sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Supervisors" />
          </ListItem>
          <ListItem button component={Link} to="#">
            <ListItemIcon>
              <Work sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="WorkGroups" />
          </ListItem>
          <ListItem button component={Link} to="#">
            <ListItemIcon>
              <PostAdd sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
          <ListItem button component={Link} to="#">
            <ListItemIcon>
              <BarChart sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button component={Link} to="#">
            <ListItemIcon>
              <Logout sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Paper>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Divider />
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={6}>
            {user ? (
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6"><strong>Name:</strong> {user.name}</Typography>
                <Typography variant="h6"><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="h6"><strong>Role:</strong> {user.role}</Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="h6"><strong>Avatar:</strong></Typography>
                  <Avatar src={user.avatar} alt="avatar" sx={{ ml: 2, width: 56, height: 56 }} />
                </Box>
              </Paper>
            ) : (
              <Typography variant="h6" color="error">No user details available.</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
