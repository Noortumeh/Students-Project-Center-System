import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function AppBarMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <Avatar src="https://github.com/mdo.png" />
        </IconButton>
        <Typography variant="h6" noWrap>Dashboard</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={handleMenuClick}>
          <Avatar src="https://github.com/mdo.png" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
          <MenuItem component={Link} to="/profile">Profile</MenuItem>
          <MenuItem component={Link} to="/settings">Settings</MenuItem>
          <Divider />
          <MenuItem component={Link} to="/signout"><LogoutIcon sx={{ mr: 1 }} /> Sign out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarMenu;
