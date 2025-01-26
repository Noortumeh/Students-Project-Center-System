import React from "react";
import { Box, Grid2, Typography, Card, CardContent, Button } from "@mui/material";
import { AccountTree } from "@mui/icons-material"; // أيقونات Material UI

const projects = [
    { name: "TraffiSense", description: "A smart traffic management system.", number: 1 },
    { name: "Smart City App", description: "A mobile app for smart city services.", number: 2 },
    { name: "AI-based Dashboard", description: "An AI-powered analytics dashboard.", number: 3 },
];

const FeaturedProjectsSection = () => {
    return (
        <Box sx={{ py: 5, background: "linear-gradient(135deg, #ffffff, #fff5f0)", textAlign: "center" }}>
            {/* العنوان */}
            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: "bold",
                    color: "#333",
                    position: "relative",
                    display: "inline-block",
                    mx: "auto",
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
                Featured Projects
            </Typography>

            {/* البطاقات */}
            <Grid2 container spacing={4} justifyContent="center">
                {projects.map((project, index) => (
                    <Grid2 xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                textAlign: "center",
                                height: "100%",
                                p: 3,
                                "&:hover": {
                                    boxShadow: 6,
                                    transform: "scale(1.05)",
                                    transition: "transform 0.3s ease-in-out",
                                },
                            }}
                        >
                            {/* أيقونة المشروع */}
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2,
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    backgroundColor: "#FF5733",
                                    color: "#fff",
                                    mx: "auto",
                                }}
                            >
                                <AccountTree sx={{ fontSize: 40 }} /> {/* الأيقونة المشتركة */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: -5,
                                        right: -5,
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        backgroundColor: "#fff",
                                        color: "#FF5733",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        border: "2px solid #FF5733",
                                    }}
                                >
                                    {project.number} {/* رقم المشروع */}
                                </Box>
                            </Box>

                            {/* تفاصيل المشروع */}
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
                                    {project.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                                    {project.description}
                                </Typography>

                                {/* زر المزيد */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#FF8A65",
                                        "&:hover": { backgroundColor: "#FF7043" },
                                    }}

                                    onClick={() => alert(`View details for ${project.name}`)}
                                >
                                    More Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default FeaturedProjectsSection;
