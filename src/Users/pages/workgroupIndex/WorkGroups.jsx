import { Box, List } from "@mui/material";
import Sidebar from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonLink from '../../components/ButtonLink';
// Icons:
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import TaskIcon from '@mui/icons-material/Task';
import { useHideSidebar } from "../../useHideSidebar";

export default function WorkGroupsPage() {
    const [open, setOpen] = useState(true);
    const [hide, setHide] = useHideSidebar();

    const checkIsOpen = () => {
        setOpen(!open);
    };

    return (
        <Box>
            {!hide && (
                <Sidebar open={open} checkIsOpen={checkIsOpen}>
                    <List>
                        <ButtonLink name="Workgroups" link="" icon={<DashboardIcon />} open={open} />
                        <ButtonLink name="Projects" link="projects" icon={<InventoryIcon />} open={open} />
                        <ButtonLink name="Tasks" link="tasks" icon={<TaskIcon />} open={open} />
                    </List>
                </Sidebar>
            )}
            <Box sx={{ pt: '50px', pl: `${open ? '250px' : '80px'}`, zIndex: 0, transition: '0.3s' }}>
                <Outlet />
            </Box>
        </Box>
    );
}