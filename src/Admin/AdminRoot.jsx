import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../Users/components/Navbar";
import Dashboard from "./Components/generalcomponent/dashbord/Dashbord";

export default function AdminRoot() {
    return (
        <Box>
            <Navbar />
            <Dashboard>
                <Box sx={{ minHeight: '92vh', mt: '30px' }}>
                    <Outlet />
                </Box>
            </Dashboard>
        </Box>
    )
}