import React, { useState } from 'react';
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { People as PeopleIcon, ExpandLess, ExpandMore, School as SchoolIcon, Group as GroupIcon, SupervisorAccount as SupervisorAccountIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function UsersMenu({ activePath }) {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const toggleUsersMenu = () => setIsUsersOpen((prev) => !prev);

  return (
    <>
      <ListItem button onClick={toggleUsersMenu}>
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Users" />
        {isUsersOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isUsersOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/users/student" selected={activePath === '/users/student'} sx={{ pl: 4 }}>
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem button component={Link} to="/users/customer" selected={activePath === '/users/customer'} sx={{ pl: 4 }}>
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button component={Link} to="/users/supervisor" selected={activePath === '/users/supervisor'} sx={{ pl: 4 }}>
            <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
            <ListItemText primary="Supervisors" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

export default UsersMenu;
