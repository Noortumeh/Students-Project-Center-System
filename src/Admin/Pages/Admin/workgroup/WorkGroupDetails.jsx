import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, Avatar, LinearProgress, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const TeamMember = styled(Paper)({
  padding: '16px', // استخدم قيمة ثابتة بدلاً من theme.spacing
  textAlign: 'center',
  color: '#666', // استخدم لون ثابت بدلاً من theme.palette.text.secondary
});

function WorkGroupDetails() {
  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    // محاكاة تحميل البيانات
    const fetchData = async () => {
      setLoading(true);
      // محاكاة فترة التحميل
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 ثانية
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container>
      {loading ? ( // عرض اللودر إذا كانت البيانات في حالة تحميل
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* العنصر العلوي الذي يحتوي على شريط التقدم */}
          <Box display="flex" justifyContent="center" alignItems="center" marginTop={4}>
            <Box position="relative" display="inline-flex">
              <Typography variant="h6">30%</Typography>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <LinearProgress variant="determinate" value={30} />
              </Box>
            </Box>
          </Box>

          {/* قسم الفريق */}
          <Box textAlign="center" mt={4} mb={4}>
            <Typography variant="h4">Team</Typography>
            <Grid container spacing={3} justifyContent="center" mt={2}>
              <Grid item xs={12} sm={4} md={3}>
                <TeamMember elevation={3}>
                  <Avatar alt="John Doe" src="/path/to/avatar1.jpg" sx={{ width: 80, height: 80, margin: '0 auto' }} />
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2">Title</Typography>
                </TeamMember>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TeamMember elevation={3}>
                  <Avatar alt="John Doe" src="/path/to/avatar2.jpg" sx={{ width: 80, height: 80, margin: '0 auto' }} />
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2">Title</Typography>
                </TeamMember>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TeamMember elevation={3}>
                  <Avatar alt="Jane Doe" src="/path/to/avatar3.jpg" sx={{ width: 80, height: 80, margin: '0 auto' }} />
                  <Typography variant="h6">Jane Doe</Typography>
                  <Typography variant="body2">Title</Typography>
                </TeamMember>
              </Grid>
            </Grid>
          </Box>

          {/* قسم المشرف */}
          <Box mb={4}>
            <Typography variant="h4" textAlign="center" mb={2}>
              Supervisor
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ padding: 3 }}>
                  <Typography variant="h5">Dr. John Doe</Typography>
                  <Typography variant="body1">
                    Dr. John Doe is an accomplished project manager with a strong background in healthcare and education.
                  </Typography>
                  <Typography variant="body2">john.doe@email.com</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <TeamMember elevation={3}>
                  <Avatar alt="John Doe" src="/path/to/avatar4.jpg" sx={{ width: 80, height: 80, margin: '0 auto' }} />
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2">Title</Typography>
                </TeamMember>
              </Grid>
            </Grid>
          </Box>

          {/* قسم العميل */}
          <Box mb={4}>
            <Typography variant="h4" textAlign="center" mb={2}>
              Customer
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ padding: 3 }}>
                  <Typography variant="h5">Mr. John Doe</Typography>
                  <Typography variant="body1">
                    Mr. John Doe is a seasoned customer service professional with over a decade of experience.
                  </Typography>
                  <Typography variant="body2">john.doe@email.com</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <TeamMember elevation={3}>
                  <Avatar alt="John Doe" src="/path/to/avatar5.jpg" sx={{ width: 80, height: 80, margin: '0 auto' }} />
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2">Title</Typography>
                </TeamMember>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
}

export default WorkGroupDetails;
