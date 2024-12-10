import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { NavLink } from "react-router-dom"

export default function ButtomLink({ name, link, icon, open, style={} }) {
    
    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink
                to={link}
                style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'inherit',  // Change color when active
                    textDecoration: 'none',
                })}
                end
            >
                <ListItemButton
                    sx={{ minHeight: style.hight, justifyContent: open ? 'initial' : 'center', px: 3.5, }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </NavLink>
        </ListItem>
    );
}