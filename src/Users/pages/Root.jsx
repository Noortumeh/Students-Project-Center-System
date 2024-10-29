import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

export default function RootLayout() {
    return (
        <Box>
            <Navbar />
            <Box sx={{minHeight:'92vh'}}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}