import React from "react";
import { Box, Typography, Grid2, Avatar, CircularProgress } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useQuery } from "@tanstack/react-query";
import { getOurClients } from "./HttpHome";

export default function OurClientsSection() {
    const { data: clients, isLoading, error } = useQuery({
        queryKey: ['ourClients'],
        queryFn: getOurClients,
        keepPreviousData: true,
        staleTime: 5000,
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

    if (!clients || clients.length === 0) {
        content = (
            <Box sx={{ textAlign: "center", py:3 }}>
                <Typography variant="h6" color="error">
                    No Clients available at the moment.
                </Typography>
                <Typography variant="h5" sx={{fontWeight: "bold", color: "#333"}}>
                    We are excited to start a new journey.
                </Typography>
            </Box>
        );
    }

    console.log(clients);

    return (
        <Box
            sx={{
                py: 5,
                px: 3,
                background: "linear-gradient(135deg, #ffffff, #fff5f0)",
                textAlign: "center",
            }}
        >
            {/* عنوان القسم */}
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
                        backgroundColor: "#FF5733", // لون الخط
                    },
                }}
            >
                Our Clients
            </Typography>

            {/* النص التقديمي */}
            <Typography
                variant="body1"
                sx={{
                    mb: 5,
                    color: "#666",
                }}
            >
                Proud to partner with industry leaders across the globe.
            </Typography>

            {/* شبكة العملاء */}
            {content ? content :
                <Grid2 container spacing={3} justifyContent="center">
                    {clients.map((client, index) => (
                        <Grid2 size={{xs: 6, sm: 4, md: 3}} key={index}>
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    p: 2,
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    "&:hover": {
                                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                                    },
                                }}
                            >
                                {/* شعار أو أيقونة بديلة */}
                                {client.profileImageUrl ? (
                                    <img
                                        src={client.profileImageUrl}
                                        alt={client.firstName + " " + client.lastName}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            maxHeight: "80px",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : (
                                    <Avatar
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            margin: "0 auto",
                                            backgroundColor: "#FFEBEE",
                                            color: "#FF5722",
                                            transition: "transform 0.3s ease-in-out",
                                            "&:hover": {
                                                transform: "scale(1.2)",
                                            },
                                        }}
                                    >
                                        <AccountCircleIcon fontSize="large" />
                                    </Avatar>
                                )}
                                {/* اسم العميل */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        mt: 2,
                                        fontWeight: "bold",
                                        color: "#555",
                                    }}
                                >
                                    {client.firstName + " " + client.lastName}
                                </Typography>
                                {/* اسم الشركة */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        mt: 2,
                                        fontWeight: "bold",
                                        color: "#555",
                                    }}
                                >
                                    {client.companyName}
                                </Typography>
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>
            }
        </Box>
    );
};

