import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import image1 from "../../../assets/images/AboutSection-slide1.jpeg";
import image2 from "../../../assets/images/AboutSection-slide2.jpeg";
import image3 from "../../../assets/images/AboutSection-slide3.jpeg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const aboutSlides = [
    {
        label: "Who We Are",
        description: `
            • We help students manage their projects efficiently. <br />
            • Our platform provides intuitive tools to simplify project workflows. <br />
            • We ensure supervisors and clients have clear updates on progress and milestones.
        `,
        image: image1,
    },
    {
        label: "Our Mission",
        description: `
            • To foster an environment of collaboration and productivity. <br />
            • Empower students to reach their full potential through structured project management. <br />
            • Bridge the gap between students, supervisors, and clients for seamless communication.
        `,
        image: image2,
    },
    {
        label: "What We Do",
        description: `
            • Offer tools for scheduling and managing meetings effectively. <br />
            • Enable real-time tracking of project tasks and deadlines. <br />
            • Provide insights and analytics to monitor progress and identify areas for improvement.
        `,
        image: image3,
    },
];

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
        }}
    >
        <ArrowForwardIosIcon />
    </IconButton>
);

const PrevArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
        }}
    >
        <ArrowBackIosIcon />
    </IconButton>
);

const AboutSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Box
            sx={{
                width: "100%",
                py: 5,
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                height:'100vh'
            }}
        >
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
                About Us
            </Typography>
            <Slider {...settings}>
                {aboutSlides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            height: "70vh",
                            borderRadius: "8px",
                            overflow: "hidden",
                            mx: 2,
                        }}
                    >
                        {/* Background Image */}
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "brightness(70%)",
                            }}
                        />
                        {/* Overlay Content */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "10%",
                                transform: "translateY(-50%)",
                                zIndex: 2,
                                color: "white",
                                textAlign: "left",
                                width: "60%",
                                fontFamily: "'Poppins', sans-serif",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                padding: "10px 15px",
                                borderRadius: "8px",
                            }}
                        >
                            <Typography variant="h4" sx={{
                                fontWeight: "bold", mb: 2, fontFamily: "'Poppins', sans-serif", fontWeight: "bold",
                                color: "white",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                            }}>
                                {slide.label}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: "bold",
                                    color: "white",
                                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                                    lineHeight: 1.8,
                                }}
                                dangerouslySetInnerHTML={{ __html: slide.description }}
                            />
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default AboutSection;