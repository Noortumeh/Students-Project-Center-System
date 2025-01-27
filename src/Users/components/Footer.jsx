import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {

  const scrollWithOffset = (el) => {
    const yOffset = -50; // قيمة الإزاحة بالسالب لضمان أن العنوان يظهر أسفل النافبار
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333', // لون خلفية داكن
        color: 'white',
        py: 1.5,
        px: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        bottom: 0,
        width: "100%",
        zIndex: 1200,
      }}
    >
      {/* Icons */}
      <Box>
        <IconButton component="a" href="https://facebook.com" sx={{ color: 'white', "&:hover": { color: "#1877F2" } }}>
          <Facebook />
        </IconButton>
        <IconButton component="a" href="https://twitter.com" sx={{ color: 'white', "&:hover": { color: "#1DA1F2" } }}>
          <Twitter />
        </IconButton>
        <IconButton component="a" href="https://instagram.com" sx={{ color: 'white', "&:hover": { color: "#E4405F" } }}>
          <Instagram />
        </IconButton>
        <IconButton component="a" href="https://linkedin.com" sx={{ color: 'white', "&:hover": { color: "#0077B5" } }}>
          <LinkedIn />
        </IconButton>
      </Box>
      {/* Text */}
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        © 2024 Kadoorie. All rights reserved.
      </Typography>

      {/* Links */}
      <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
        <HashLink scroll={scrollWithOffset} to={`/contact`} style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="body2" sx={{ mr: 1, cursor: "pointer", "&:hover": { color: "#FF5733" } }}>
            Contact
          </Typography>
        </HashLink>
        <HashLink scroll={scrollWithOffset} to={`/`} style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="body2" sx={{ mr: 1, cursor: "pointer", "&:hover": { color: "#FF5733" } }}>
            Terms of Service
          </Typography>
        </HashLink>
        <HashLink scroll={scrollWithOffset} to={`/#About Us`} style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#FF5733" } }}>
            About
          </Typography>
        </HashLink>
      </Box>
    </Box>
  );
};

export default Footer;
