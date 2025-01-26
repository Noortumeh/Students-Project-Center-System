import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";

export default function FooterSection() {
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
                <Grid2 xs={12} sm={6} md={3}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#FF5733" }}>
                        About Us
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                        We are dedicated to providing top-notch solutions <br/> in web and mobile development, AI, and design.
                    </Typography>
                </Grid2>

                {/* Quick Links */}
                <Grid2 xs={12} sm={6} md={3}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#FF5733" }}>
                        Quick Links
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, cursor: "pointer", "&:hover": { color: "#FF5733" } }}>
                        Home
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, cursor: "pointer", "&:hover": { color: "#FF5733" } }}>
                        About
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, cursor: "pointer", "&:hover": { color: "#FF5733" } }}>
                        Contact
                    </Typography>
                </Grid2>

                {/* Additional Section */}
                <Grid2 xs={12} sm={6} md={3}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#FF5733" }}>
                        Services
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Web Development</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Mobile App Development</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>AI Solutions</Typography>
                </Grid2>

                {/* Contact Information */}
                <Grid2 xs={12} sm={6} md={3}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#FF5733" }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Email: info@example.com</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Phone: +123 456 789</Typography>
                    <Typography variant="body2">Location: City, Country</Typography>
                </Grid2>
            </Grid2>

            {/* حقوق النشر */}
            <Box sx={{ textAlign: "center", mt: 4, borderTop: "1px solid #555"}}>
            </Box>
        </Box>
    );
};