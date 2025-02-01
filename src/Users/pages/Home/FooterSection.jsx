import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

export default function FooterSection() {

    const scrollWithOffset = (el) => {
        const yOffset = -50; // قيمة الإزاحة بالسالب لضمان أن العنوان يظهر أسفل النافبار
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <Box
            sx={{
                backgroundColor: "#333",
                color: "#fff",
                py: 5,
            }}
        >
            <Grid2 container spacing={20} justifyContent="center">
                {/* About Us */}
                <Grid2>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#FF5733" }}>
                        About Us
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                        We are dedicated to providing top-notch solutions <br /> in web and mobile development, AI, and design.
                    </Typography>
                </Grid2>

                {/* Quick Links */}
                <Grid2>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#FF5733" }}>
                        Quick Links
                    </Typography>
                    <HashLink scroll={scrollWithOffset} to={`/#Home`} style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="body2" sx={{ mb: 1, cursor: "pointer", "&:hover": { color: "#FF5733" }, width: '50%' }}>
                            Home
                        </Typography>
                    </HashLink>
                    <HashLink scroll={scrollWithOffset} to={`/#About Us`} style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="body2" sx={{ mb: 1, cursor: "pointer", "&:hover": { color: "#FF5733" }, width: '50px' }}>
                            About
                        </Typography>
                    </HashLink>
                    <NavLink to={`/contact`} style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="body2" sx={{ mb: 1, cursor: "pointer", "&:hover": { color: "#FF5733" }, width: '50px' }}>
                            Contact
                        </Typography>
                    </NavLink>
                </Grid2>

                {/* Additional Section */}
                <Grid2>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#FF5733" }}>
                        Services
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Web Development</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Mobile App Development</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>AI Solutions</Typography>
                </Grid2>

                {/* Contact Information */}
                <Grid2>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#FF5733" }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Email: info@example.com</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Phone: +123 456 789</Typography>
                    <Typography variant="body2">Location: City, Country</Typography>
                </Grid2>
            </Grid2>

            {/* حقوق النشر */}
            <Box sx={{ textAlign: "center", mt: 4, borderTop: "1px solid #555" }}>
            </Box>
        </Box >
    );
};