import React from "react";
import { Box, Grid2, Typography, Card, CardContent } from "@mui/material";
import { Computer, PhoneAndroid, Memory, DesignServices, Group } from "@mui/icons-material";

const services = [
    {
        title: "Front End Development",
        description: "Building responsive and interactive user interfaces.",
        icon: <Computer sx={{ fontSize: 40, color: "#FF5733" }} />,
    },
    {
        title: "Back End Development",
        description: "Developing robust back-end systems and APIs.",
        icon: <Memory sx={{ fontSize: 40, color: "#FF5733" }} />,
    },
    {
        title: "Mobile Development",
        description: "Creating intuitive mobile apps for Android and iOS.",
        icon: <PhoneAndroid sx={{ fontSize: 40, color: "#FF5733" }} />,
    },
    {
        title: "AI Application",
        description: "Developing intelligent systems using AI technologies.",
        icon: <DesignServices sx={{ fontSize: 40, color: "#FF5733" }} />,
    },
    {
        title: "Design & Branding",
        description: "Creating modern and user-centric designs.",
        icon: <DesignServices sx={{ fontSize: 40, color: "#FF5733" }} />,
    },
    {
        title: "Training & Consultancy",
        description: "Providing training and consulting for tech solutions.",
        icon: <Group sx={{ fontSize: 40, color: "#FF5733" }} />,
    },
];

const ServicesSection = () => {
    return (
        <Box  sx={{
            py: 5,
            px: 3,
            backgroundColor: "#f5f5f5",
            textAlign: "center",
        }}>
            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: "bold",
                    color: "#333",
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -5,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "50%",
                        height: "3px",
                        backgroundColor: "#FF5733", // اللون البرتقالي
                    },
                }}
            >
                Our Services
            </Typography>
            <Grid2 container spacing={4} justifyContent="center">
                {services.map((service, index) => (
                    <Grid2 size={{xs: 12, sm: 6, md: 4}} key={index}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                p: 3,
                                textAlign: "center",
                                height: "100%",
                                "&:hover": {
                                    boxShadow: 6,
                                    transform: "scale(1.05)",
                                    transition: "transform 0.3s ease-in-out",
                                },
                            }}
                        >
                            <Box sx={{ mb: 2 }}>{service.icon}</Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                                {service.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                                {service.description}
                            </Typography>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default ServicesSection;
