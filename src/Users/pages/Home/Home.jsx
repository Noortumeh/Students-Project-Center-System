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
            <section id='Home'>
                <HomeSection />
            </section>

            {/* About Section */}
            <section id='About Us'>
                <AboutSection />
            </section>

            {/* Clients Section */}
            <section id="Clients">
                <OurClientsSection />
            </section>

            {/* Services Section */}
            <section id="Services">
                <ServicesSection />
            </section>

            {/* Projects Section */}
            <section id="Projects">
                <ProjectsSection />
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* Footer Section */}
            <Footer />
        </Container>
    );
};

export default HomePage;
