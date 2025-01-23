import React from "react";
import { Box, Typography, Grid2, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import client1 from "../../../assets/images/client1.png"; // شعار عميل إذا كان موجودًا
// import client2 from "../../../assets/images/client2.png";

const clients = [
    { name: "Palestine Technical uneversity Kadoori", logo: null },
    { name: "Company Name Client", logo: null },
    { name: "Company Name Client", logo: null }, // بدون شعار
    { name: "Company Name Client", logo: null }, // بدون شعار
    { name: "Company Name Client", logo: null }, // بدون شعار
    { name: "Company Name Client", logo: null }, // بدون شعار
];

export default function OurClientsSection(){
    return (
        <Box
            sx={{
                py: 5,
                px: 3,
                backgroundColor: "#f5f5f5",
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
            <Grid2 container spacing={3} justifyContent="center">
                {clients.map((client, index) => (
                    <Grid2 xs={6} sm={4} md={3} key={index}>
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
                            {client.logo ? (
                                <img
                                    src={client.logo}
                                    alt={client.name}
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
                                {client.name}
                            </Typography>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

