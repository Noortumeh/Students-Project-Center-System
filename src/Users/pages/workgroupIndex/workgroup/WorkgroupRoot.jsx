import { Box, List, useMediaQuery } from "@mui/material";
import Sidebar from "../../../components/sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ButtonLink from '../../../components/ButtonLink.jsx';
// Icons:
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import TaskIcon from '@mui/icons-material/Task';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ChatIcon from '@mui/icons-material/Chat';
import { useTheme } from "@mui/material/styles";
export default function WorkgroupRoot() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(true);
    
    const checkIsOpen = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <Sidebar open={open} checkIsOpen={checkIsOpen}>
                <List>
                    <ButtonLink name="WorkGroup" link="" icon={<DashboardIcon />} open={isMobile ? false : open} />
                    <ButtonLink name="Tasks" link="tasks" icon={<InventoryIcon />} open={isMobile ? false : open} />
                    <ButtonLink name="Scheduling Meeting" link="tasks" icon={<CalendarMonthIcon />} open={isMobile ? false : open} />
                    {/* <ButtonLink name="Files" link="tasks" icon={<TaskIcon />} open={isMobile ? false : open} /> */}
                    {/* <ButtonLink name="Evaluation Report" link="tasks" icon={<SummarizeIcon />} open={isMobile ? false : open} /> */}
                    <ButtonLink name="Chat" link="chat" icon={<ChatIcon />} open={isMobile ? false : open} />
                </List>
            </Sidebar>
            <Box sx={{ pt: '50px', pl: `${!isMobile && open ? '250px' : '50px'}`, zIndex: 0, transition: '0.3s' }}>
                <Outlet />
            </Box>
        </Box>
    );
}