import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
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
        width : "100%",
        zIndex: 1200,
      }}
    >
      {/* Icons */}
      <Box>
        <IconButton component="a" href="https://facebook.com" sx={{ color: 'white' }}>
          <Facebook />
        </IconButton>
        <IconButton component="a" href="https://twitter.com" sx={{ color: 'white' }}>
          <Twitter />
        </IconButton>
        <IconButton component="a" href="https://instagram.com" sx={{ color: 'white' }}>
          <Instagram />
        </IconButton>
        <IconButton component="a" href="https://linkedin.com" sx={{ color: 'white' }}>
          <LinkedIn />
        </IconButton>
      </Box>
      {/* Text */}
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        © 2024 Kadoorie. All rights reserved.
      </Typography>

      {/* Links */}
      <Box>
        <Link href="/contact" sx={{ color: 'white', marginRight: 2, textDecoration: 'none' }}>
          Contact
        </Link>
        <Link href="/terms-of-service" sx={{ color: 'white', marginRight: 2, textDecoration: 'none' }}>
          Terms of Service
        </Link>
        <Link href="/about-us" sx={{ color: 'white', textDecoration: 'none' }}>
          About Us
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
