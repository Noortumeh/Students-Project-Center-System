import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../pages/Authantication/CustomHook/useUser';
import Logout from '../pages/Authantication/Logout';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';

const drawerWidth = 240;
const navItems = ['Home', 'About Us', 'Clients', 'Services', 'Projects', 'Contact'];

export default function Navbar() {
    const { isFetching, user, isAuth } = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [navBackground, setNavBackground] = useState('rgba(248, 250, 251, 0.4)');
    const location = useLocation();
    const isHome = location.pathname === '/';
    // Handle Scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setNavBackground('rgba(248, 250, 251, 1)'); // اللون عند التمرير للأسفل
        } else {
            setNavBackground('rgba(248, 250, 251, 0.4)'); // اللون الافتراضي عند العودة للأعلى
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileClick = () => {
        navigate('/user-profile');
        handleMenuClose();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // handle Drawer Toggle
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                SPCS
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <Box>
            <CssBaseline />
            <AppBar component="nav" sx={{ bgcolor: navBackground, color: 'black', transition: 'background-color 0.3s ease' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Box>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
                        >
                            SPCS
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <NavLink to={'workgroups'}>
                            <Button variant="contained" size='small' color={isHome ? "primary" : "secondary"} sx={{ marginRight: '3px' }}>Workgroups</Button>
                        </NavLink>
                        <NavLink to={'/admin'}>
                            <Button variant="contained" size='small' color="primary" sx={{ marginRight: '3px' }}>Admin Dashboard</Button>
                        </NavLink>
                        {navItems.map((item) => (
                            <NavLink to={'/'} key={item}>
                                <Button sx={{color: isHome && '#FF5733'}}>
                                    {item}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    {isAuth ?
                        <Box>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar
                                    src={user.userInfo.user.profileImageUrl}
                                    alt="Profile"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                sx={{ mt: 1 }}
                            >
                                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                                <Logout />
                            </Menu>
                        </Box>
                        :
                        <Box>
                            <NavLink to={"login"} style={{ textDecoration: 'none', color: 'white' }}>
                                <Button variant="contained" color="primary" sx={{ marginRight: '3px' }}>
                                    Log In
                                </Button>
                            </NavLink>

                            <NavLink to={"signup"} style={{ textDecoration: 'none', color: 'white' }}>
                                <Button variant="contained" color="primary">
                                    Sign Up
                                </Button>
                            </NavLink>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}