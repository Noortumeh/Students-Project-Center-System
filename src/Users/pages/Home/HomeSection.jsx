import React from "react";
import { Box, Typography, Button } from "@mui/material";
import HomeVideo from "../../../assets/video/homeSectionVideo.mp4";
const HomeSection = () => {
    return (
        <Box
            sx={{
                position: "relative",
                height: "100vh",
                marginLeft:0,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right:0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                }}
            >
                <source src={HomeVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                }}
            ></Box>

            {/* Content */}
            <Box
                sx={{
                    maxWidth:'lg',
                    zIndex: 2,
                    color: "#fff",
                    p: 3,
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
                    Welcome to the Student Projects Management Center
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                    We are here to help you build your project successfully.
                </Typography>
                <Button
                    variant="outlined"
                    sx={{
                        color: "#FF5733",
                        borderColor: "#FFFFFF",
                        backgroundColor: "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                    }}
                    href="/contact"
                >
                    Contact Us
                </Button>
            </Box>
        </Box>
    );
};

export default HomeSection;