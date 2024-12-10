import React, { useState, useMemo } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Toolbar } from '@mui/material';
import { Home as HomeIcon, Work as WorkIcon, BusinessCenter as BusinessCenterIcon, Rule as RuleIcon, BarChart as BarChartIcon, Group as GroupIcon } from '@mui/icons-material';
import UsersMenu from './UsersMenu';
import PostsMenu from './PostsMenu';
import { useLocation, Link } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar() {
  const location = useLocation();
  const activePath = useMemo(() => {
    // تحديد المسار النشط
    return location.pathname;
  }, [location]);

  return (
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
        <ListItem button component={Link} to="/admin" selected={activePath === '/admin'}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/workgroup/WorkGroup" selected={activePath === '/workgroup/WorkGroup'}>
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="WorkGroup" />
        </ListItem>
        <ListItem button component={Link} to="/projects/Projects" selected={activePath === '/projects/Projects'}>
          <ListItemIcon><BusinessCenterIcon /></ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
        <UsersMenu activePath={activePath} />
        <PostsMenu activePath={activePath} />
        <ListItem button component={Link} to="/termofservices/TermOfServices" selected={activePath === '/termofservices/TermOfServices'}>
          <ListItemIcon><RuleIcon /></ListItemIcon>
          <ListItemText primary="Term of Services" />
        </ListItem>
        <ListItem button component={Link} to="/report/Reports" selected={activePath === '/report/Reports'}>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
