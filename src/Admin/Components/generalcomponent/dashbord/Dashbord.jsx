import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  BusinessCenter as BusinessCenterIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
  Rule as RuleIcon,
  BarChart as BarChartIcon,
  School as SchoolIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Group as GroupIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

function Dashboard({ children }) {
  const [activeLink, setActiveLink] = useState('');
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const location = useLocation();

  const activePath = useMemo(() => {
    const currentPath = location.pathname.toLowerCase();
    if (currentPath.includes('/users/student')) return 'students';
    if (currentPath.includes('/users/customer')) return 'customers';
    if (currentPath.includes('/users/supervisor')) return 'supervisors';
    if (currentPath.includes('/users/users')) return 'users';
    if (currentPath.includes('/termofservices')) return 'termOfServices';
    if (currentPath.includes('/roles')) return 'roles';
    return 'home';
  }, [location]);

  useEffect(() => {
    setActiveLink(activePath);
  }, [activePath]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleUsersMenu = () => setIsUsersOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Avatar src="https://github.com/mdo.png" />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar src="https://github.com/mdo.png" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
            <MenuItem component={Link} to="/profile">Profile</MenuItem>
            <MenuItem component={Link} to="/settings">Settings</MenuItem>
            <Divider />
            <MenuItem component={Link} to="/signout">
              <LogoutIcon sx={{ mr: 1 }} /> Sign out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem component={Link} to="/admin" selected={activeLink === 'home'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/workgroup" selected={activeLink === 'workgroup'}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="WorkGroup" />
          </ListItem>
          <ListItem component={Link} to="/projects" selected={activeLink === 'projects'}>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>

          <ListItem onClick={toggleUsersMenu}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {isUsersOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isUsersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} to="/users/student" selected={activeLink === 'students'}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItem>
              <ListItem component={Link} to="/users/customer" selected={activeLink === 'customers'}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
              <ListItem component={Link} to="/users/supervisor" selected={activeLink === 'supervisors'}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Supervisors" />
              </ListItem>
              <ListItem component={Link} to="/users/users" selected={activeLink === 'users'}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem component={Link} to="/termofservices" selected={activeLink === 'termOfServices'}>
            <ListItemIcon>
              <RuleIcon />
            </ListItemIcon>
            <ListItemText primary="Term of Services" />
          </ListItem>
          
          <ListItem component={Link} to="/roles" selected={activeLink === 'roles'}>
            <ListItemIcon>
              <RuleIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Suspense fallback={<CircularProgress />}>
          {children}
        </Suspense>
      </Box>
    </Box>
  );
}

export default Dashboard;