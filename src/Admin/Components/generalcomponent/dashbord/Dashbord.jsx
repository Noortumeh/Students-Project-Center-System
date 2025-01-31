import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  BusinessCenter as BusinessCenterIcon,
  ExpandLess,
  ExpandMore,
  Rule as RuleIcon,
  School as SchoolIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Group as GroupIcon,
} from "@mui/icons-material";

import Navbar from "../../../../Users/components/Navbar.jsx"; // تأكد من صحة الاستيراد

const drawerWidth = 240;

function Dashboard({ children }) {
  const [activeLink, setActiveLink] = useState("");
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const location = useLocation();

  const activePath = useMemo(() => {
    const currentPath = location.pathname.toLowerCase();
    if (currentPath.includes("/users/student")) return "students";
    if (currentPath.includes("/users/customer")) return "customers";
    if (currentPath.includes("/users/supervisor")) return "supervisors";
    if (currentPath.includes("/users/users")) return "users";
    if (currentPath.includes("/termofservices")) return "termOfServices";
    return "home";
  }, [location]);

  useEffect(() => {
    setActiveLink(activePath);
  }, [activePath]);

  const toggleUsersMenu = () => setIsUsersOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* Navbar */}
      <Box sx={{ position: "fixed", width: "100%", zIndex: 1201 }}>
        <Navbar />
      </Box>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: "64px", // هذا الارتفاع يطابق ارتفاع الـ Navbar
          },
        }}
      >
        <List>
          <ListItem
            component={Link}
            to="/admin"
            selected={activeLink === "home"}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            component={Link}
            to="/workgroup"
            selected={activeLink === "workgroup"}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="WorkGroup" />
          </ListItem>
          <ListItem
            component={Link}
            to="/projects"
            selected={activeLink === "projects"}
          >
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
              <ListItem
                component={Link}
                to="/users/student"
                selected={activeLink === "students"}
              >
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItem>
              <ListItem
                component={Link}
                to="/users/customer"
                selected={activeLink === "customers"}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
              <ListItem
                component={Link}
                to="/users/supervisor"
                selected={activeLink === "supervisors"}
              >
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Supervisors" />
              </ListItem>
              <ListItem
                component={Link}
                to="/users/users"
                selected={activeLink === "users"}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            component={Link}
            to="/termofservices"
            selected={activeLink === "termOfServices"}
          >
            <ListItemIcon>
              <RuleIcon />
            </ListItemIcon>
            <ListItemText primary="Term of Services" />
          </ListItem>

     
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Dashboard;
