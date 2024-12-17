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
  PostAdd as PostAddIcon,
  Rule as RuleIcon,
  BarChart as BarChartIcon,
  School as SchoolIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Announcement as AnnouncementIcon,
  Publish as PublishIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

function Dashboard({ children }) {
  const [activeLink, setActiveLink] = useState('');
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const location = useLocation();

  const activePath = useMemo(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/users/student')) return 'students';
    if (currentPath.startsWith('/users/customer')) return 'customers';
    if (currentPath.startsWith('/users/supervisor')) return 'supervisors';
    if (currentPath.startsWith('/posts/Announcements')) return 'announcements';
    if (currentPath.startsWith('/posts/Publishing-projects')) return 'publishing';
    if (currentPath.startsWith('/posts/Form')) return 'form';
    if (currentPath.startsWith('/termofservices/TermOfServices')) return 'TermOfServices';
    if (currentPath.startsWith('/report/Reports')) return 'reports';
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
  const togglePostsMenu = () => setIsPostsOpen((prev) => !prev);

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
          <ListItem button component={Link} to="/admin" selected={activeLink === 'home'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/workgroup/WorkGroup" selected={activeLink === 'workgroup'}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="WorkGroup" />
          </ListItem>

          <ListItem button component={Link} to="/projects/Projects" selected={activeLink === 'projects'}>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button onClick={toggleUsersMenu}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {isUsersOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isUsersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/users/student" selected={activeLink === 'students'}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/users/customer" selected={activeLink === 'customers'}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/users/supervisor" selected={activeLink === 'supervisors'}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Supervisors" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/ourpartner/OurPartner" selected={activeLink === 'ourpartner'}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Our Partner" />
          </ListItem>

          <ListItem button onClick={togglePostsMenu}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
            {isPostsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isPostsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/posts/Announcements" selected={activeLink === 'announcements'}>
                <ListItemIcon>
                  <AnnouncementIcon />
                </ListItemIcon>
                <ListItemText primary="Announcements" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/posts/Publishing-projects" selected={activeLink === 'publishing'}>
                <ListItemIcon>
                  <PublishIcon />
                </ListItemIcon>
                <ListItemText primary="Publishing Projects" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/posts/Form" selected={activeLink === 'form'}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Form" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/termofservices/TermOfServices" selected={activeLink === 'termOfServices'}>
            <ListItemIcon>
              <RuleIcon />
            </ListItemIcon>
            <ListItemText primary="Term of Services" />
          </ListItem>

          <ListItem button component={Link} to="/report/Reports" selected={activeLink === 'reports'}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Suspense fallback={<CircularProgress />}>
          {children}
        </Suspense>
      </Box>
    </Box>
  );
}

export default Dashboard;