import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQs = () => {
    const faqData = [
        {
            question: "What services do you offer?",
            answer: "We provide mobile and web app development, AI solutions, design, and more.",
        },
        {
            question: "How can I submit my project?",
            answer: "You can submit your project through our online portal or contact us directly for assistance.",
        },
        {
            question: "What technologies do you specialize in?",
            answer:
                "We specialize in frontend and backend development, AI applications, mobile development, and more.",
        },
    ];

    return (
        <Box
            sx={{
                py: 5,
                px: 2,
                backgroundColor: "#f9f9f9",
                textAlign:'center'
            }}
        >
            {/* العنوان */}
            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
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
                Frequently Asked Questions
            </Typography>

            {/* الأسئلة الشائعة */}
            <Box sx={{ maxWidth: "800px", mx: "auto" }}>
                {faqData.map((faq, index) => (
                    <Accordion key={index} sx={{ mb: 2, border: "1px solid #ddd", boxShadow: 1 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: "#FF5733" }} />}
                            sx={{
                                backgroundColor: "#fff",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#f0f0f0" },
                            }}
                        >
                            <Typography sx={{ fontWeight: "bold", color: "#333" }}>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: "#fff5f0", color: "#555" }}>
                            <Typography>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};

export default FAQs;
