import React from "react";
import { Box, Grid2, Typography, Card, CardContent, Button, CircularProgress } from "@mui/material";
import { AccountTree } from "@mui/icons-material"; // أيقونات Material UI
import { useQuery } from "@tanstack/react-query";
import { getFavoritesProjects } from "./HttpHome";

const FeaturedProjectsSection = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['favoriteProjects'],
        queryFn: getFavoritesProjects,
        keepPreviousData: true,
        staleTime: 10000,
    })
    let content = null;
    if (isLoading) {
        content = (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: "linear-gradient(135deg, #ffffff, #fff5f0)" }}>
                <CircularProgress />
            </Box>
        );
    }
    
    if (error) {
        content = (
            <Box sx={{ textAlign: "center", py: 5, background: "linear-gradient(135deg, #ffffff, #fff5f0)" }}>
                <Typography variant="h5" color="error">
                    Oops! Something went wrong. Please try again later.
                </Typography>
            </Box>
        );
    }

    if (!data || data.length === 0) {
        content = (
            <Box sx={{ textAlign: "center", py: 5, background: "linear-gradient(135deg, #ffffff, #fff5f0)" }}>
                <Typography variant="h5" color="error">
                    No projects available at the moment.
                </Typography>
            </Box>
        );
    }

    console.log(data)
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
            {content !== null ? content : 
            <Grid2 container spacing={4} justifyContent="center">
                {data.map((project, index) => (
                    <Grid2 xs={12} sm={6} md={4} key={project.id}>
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
                                    {index + 1} {/* رقم المشروع */}
                                </Box>
                            </Box>

                            {/* تفاصيل المشروع */}
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
                                    {project.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                                    {project.overview}
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
            </Grid2>}
        </Box >
    );
};

export default FeaturedProjectsSection;
