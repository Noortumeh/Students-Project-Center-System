import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Grid, Container, Card, CardContent } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      {/* شريط التنقل العلوي */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Student Project Center</Typography>
        </Toolbar>
      </AppBar>

      {/* القسم الرئيسي */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          padding: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Student Project Center
        </Typography>
        <Typography variant="h5" paragraph>
          A platform for managing student projects, facilitating collaboration, and tracking progress.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ marginBottom: 2 }}>
          Get Started
        </Button>
      </Box>

      {/* قسم المشاريع */}
      <Container sx={{ marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>Our Projects</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Project 1: AI for Student Success</Typography>
                <Typography variant="body2">
                  This project aims to implement AI-driven systems to monitor and assist student performance, 
                  making personalized recommendations for improvement.
                </Typography>
                <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: 1 }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Project 2: Student Collaboration Tool</Typography>
                <Typography variant="body2">
                  A platform to facilitate collaboration between students across different universities, 
                  making teamwork more efficient and effective.
                </Typography>
                <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: 1 }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* قسم الطلاب */}
      <Container sx={{ marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>Our Students</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Student: Ali Ahmad</Typography>
                <Typography variant="body2">
                  Ali is a senior computer science student with a passion for artificial intelligence 
                  and machine learning. He is working on AI-based project management solutions.
                </Typography>
                <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: 1 }}>
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Student: Sarah Khaled</Typography>
                <Typography variant="body2">
                  Sarah is a business management student focusing on creating efficient collaboration tools 
                  for students and professionals.
                </Typography>
                <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: 1 }}>
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* قسم التفاعل */}
      <Box sx={{ padding: 4, backgroundColor: '#eeeeee' }}>
        <Typography variant="h5" paragraph>
          Ready to join? Start collaborating and manage your projects efficiently.
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Join Now
        </Button>
      </Box>
    </div>
  );
};

export default HomePage;
