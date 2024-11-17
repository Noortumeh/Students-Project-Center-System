import { Box, List } from "@mui/material";
import Sidebar from "../../../components/sidebar";
import { Outlet } from "react-router-dom";
import {useState } from "react";
import ButtonLink from '../../../components/ButtonLink.jsx';
// Icons:
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import TaskIcon from '@mui/icons-material/Task';

export default function WorkgroupRoot() {
    const [open, setOpen] = useState(true);

    const checkIsOpen = () => {
        setOpen(!open);
    };

    return (
        <Box>

            <Sidebar open={open} checkIsOpen={checkIsOpen}>
                <List>
                    <ButtonLink name="WorkGroup" link="" icon={<DashboardIcon />} open={open} />
                    <ButtonLink name="Tasks" link="projects" icon={<InventoryIcon />} open={open} />
                    <ButtonLink name="Scheduling Meeting" link="tasks" icon={<TaskIcon />} open={open} />
                    <ButtonLink name="Files" link="tasks" icon={<TaskIcon />} open={open} />
                    <ButtonLink name="Evaluation Report" link="tasks" icon={<TaskIcon />} open={open} />
                    <ButtonLink name="Chat" link="tasks" icon={<TaskIcon />} open={open} />
                </List>
            </Sidebar>
            <Box sx={{ pt: '50px', pl: `${open ? '250px' : '80px'}`, zIndex: 0, transition: '0.3s' }}>
                <Outlet />
            </Box>
        </Box>
    );
}