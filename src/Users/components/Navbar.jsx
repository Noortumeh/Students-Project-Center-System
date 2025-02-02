import { useEffect, useState } from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar,
    Typography, Button, Avatar, } from '@mui/material';
import Logout from '../pages/Authantication/Logout';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from '../pages/Authantication/CustomHook/useUser';

const drawerWidth = 240;
const navItems = ['Home', 'About Us', 'Clients', 'Services', 'Projects', 'Contact'];

export default function Navbar() {
    const { isFetching, user, isAuth } = useUser();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [navBackground, setNavBackground] = useState('rgba(248, 250, 251, 0.4)');
    const location = useLocation();
    const isHome = location.pathname === '/' || location.pathname === '/contact';
    
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

    const scrollWithOffset = (el) => {
        const yOffset = -50; // قيمة الإزاحة بالسالب لضمان أن العنوان يظهر أسفل النافبار
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

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
                        {item === 'Contact' ? (
                            <NavLink to="/contact" key={item} style={{ textDecoration: 'none' }}>
                                <ListItemButton sx={{ width: 240, textAlign: 'center', color: isHome && 'black', "&:hover": isHome && { color: "#FF5733" } }}>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </NavLink>
                        ) : (
                            <HashLink scroll={scrollWithOffset} to={`/#${item}`} key={item} style={{ textDecoration: 'none' }}>
                                <ListItemButton sx={{ width: 240, textAlign: 'center', color: isHome && 'black', "&:hover": isHome && { color: "#FF5733" } }}>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </HashLink>
                        )}

                    </ListItem>
                ))}
                {isAuth && <>
                    <NavLink to={'/workgroups'}>
                        <Button variant="contained" size='small' sx={{
                            mb: '5px', mt: '5px', backgroundColor: isHome && "#FF8A65",
                            "&:hover": isHome && { backgroundColor: "#FF7043" }
                        }}>
                            Workgroups</Button>
                    </NavLink>
                    {user.userInfo.role.includes('admin') &&
                        <NavLink to={'/admin'}>
                            <Button variant="contained" size='small' sx={{ mt: '5px', backgroundColor: isHome && '#FF8A65', "&:hover": isHome && { backgroundColor: "#FF7043" }, }}>
                                Admin Dashboard</Button>
                        </NavLink>
                    }
                </>}
            </List>
        </Box>
    );
    if(isFetching){
        return null;
    }
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
                        {isAuth && <>
                            <NavLink to={'/workgroups'}>
                                <Button variant="contained" size='small' sx={{
                                    marginRight: '3px', backgroundColor: isHome && "#FF8A65",
                                    "&:hover": isHome && { backgroundColor: "#FF7043" }
                                }}>
                                    Workgroups</Button>
                            </NavLink>
                            {user && user.userInfo.role.includes('admin') &&
                                <NavLink to={'/admin'}>
                                    <Button variant="contained" size='small' sx={{ marginRight: '3px', backgroundColor: isHome && '#FF8A65', "&:hover": isHome && { backgroundColor: "#FF7043" }, }}>
                                        Admin Dashboard</Button>
                                </NavLink>
                            }
                        </>
                        }
                        {navItems.map((item) => (
                            item === 'Contact' ? (
                                <NavLink to="/contact" key={item} style={{ textDecoration: 'none' }}>
                                    <Button
                                        sx={{
                                            color: isHome && 'black',
                                            "&:hover": isHome && { color: "#FF5733" },
                                        }}
                                    >
                                        {item}
                                    </Button>
                                </NavLink>
                            ) : (
                                <HashLink scroll={scrollWithOffset} to={`/#${item}`} key={item} style={{ textDecoration: 'none' }}>
                                    <Button
                                        sx={{
                                            color: isHome && 'black',
                                            "&:hover": isHome && { color: "#FF5733" },
                                        }}
                                    >
                                        {item}
                                    </Button>
                                </HashLink>
                            )
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
                                <Button variant="contained" sx={{
                                    marginRight: '3px', backgroundColor: isHome && "#FF8A65",
                                    "&:hover": isHome && { backgroundColor: "#FF7043" },
                                }}>
                                    Log In
                                </Button>
                            </NavLink>

                            <NavLink to={"signup"} style={{ textDecoration: 'none', color: 'white' }}>
                                <Button variant="contained" sx={{
                                    backgroundColor: isHome && "#FF8A65",
                                    "&:hover": isHome && { backgroundColor: "#FF7043" },
                                }}>
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