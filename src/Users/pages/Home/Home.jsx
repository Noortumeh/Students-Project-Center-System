// HomePage.jsx
import React from "react";
import HomeSection from "./HomeSection";
import AboutSection from "./AboutSection";
import OurClientsSection from "./ClientsSection";
import ServicesSection from "./ServicesSection";
import ProjectsSection from "./ProjectsSection";
import FAQSection from "./FAQSection";
import Footer from './FooterSection';
import { Container } from "@mui/material";

const HomePage = () => {
    return (
        <Container maxWidth="100%" disableGutters>
            {/* Home Section */}
            <HomeSection />

            {/* About Section */}
            <AboutSection />

            {/* Clients Section */}
            <OurClientsSection />

            {/* Services Section */}
            <ServicesSection />

            {/* Projects Section */}
            <ProjectsSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Footer Section */}
            <Footer />
        </Container>
    );
};

export default HomePage;
