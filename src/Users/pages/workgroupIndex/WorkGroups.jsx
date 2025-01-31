import { Box, List, useMediaQuery } from "@mui/material";
import Sidebar from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ButtonLink from '../../components/ButtonLink';
// Icons:
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import TaskIcon from '@mui/icons-material/Task';
import { useHideSidebar } from "../../useHideSidebar";
import { useTheme } from "@mui/material/styles";

export default function WorkGroupsPage() {
    const [open, setOpen] = useState(true);
    const [hide] = useHideSidebar();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isSupervisor = JSON.parse(localStorage.getItem('userInfo')).role.includes('supervisor');
    
    const checkIsOpen = () => {
        setOpen(!open);
    };
    
    return (
        <Box>
            {!hide && (
                <Sidebar open={open} checkIsOpen={checkIsOpen}>
                    <List>
                        <ButtonLink name="Workgroups" link="" icon={<DashboardIcon />} open={isMobile ? false : open} />
                        <ButtonLink name="Projects" link="projects" icon={<InventoryIcon />} open={isMobile ? false : open} />
                        {isSupervisor && <ButtonLink name="AllTasks" link="alltasks" icon={<TaskIcon />} open={isMobile ? false : open} />}
                    </List>
                </Sidebar>
            )}
            <Box sx={{ pt: '50px', pl: `${!isMobile && open && !hide ? '250px' : '70px'}`, zIndex: 0, transition: '0.3s' }}>
                <Outlet />
            </Box>
        </Box>
    );
}