import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Avatar } from '@mui/material';
import { Business, CheckCircle, HourglassEmpty, Group } from '@mui/icons-material';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import { styled } from '@mui/system';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// تخصيص نمط المدخلات للبحث
const SearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '5px 10px',
  borderRadius: '20px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  width: '300px',
  marginBottom: '20px',
});

export default function ProjectCenterDashboard() {
  // حالة البيانات
  const [data, setData] = useState({
    totalProjects: 0,
    completedProjects: 0,
    favoriteCustomers: 0,
    totalClients: 0,
  });

  // مرجع للرسم البياني
  const chartRef = useRef(null);

  // جلب البيانات من API
  useEffect(() => {
    async function fetchData() {
      try {
        // استخدم API لجلب البيانات
        const response = await fetch('/api/dashboardData'); // تأكد من أن هذا هو الـ API الصحيح
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        setData({
          totalProjects: result.totalProjects,
          completedProjects: result.completedProjects,
          favoriteCustomers: result.favoriteCustomers,
          totalClients: result.totalClients,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchData();
  }, []);

  // بيانات الرسم البياني بناءً على البيانات المستلمة
  const completedVsActiveData = {
    labels: ['Completed', 'Active'],
    datasets: [
      {
        label: 'Projects',
        data: [data.completedProjects, data.totalProjects - data.completedProjects],
        backgroundColor: ['#4caf50', '#ff9800'],
      },
    ],
  };

  // التأكد من التخلص من الرسم البياني عند التدمير
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, [data]);

  return (
    <Dashboard>
      <Box sx={{ padding: 3, backgroundColor: '#f0f2f5' }}>
        {/* بطاقات الملخص */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#4caf50', marginRight: 2 }}>
                    <Business />
                  </Avatar>
                  <Typography variant="h6" color="textSecondary">Total Projects</Typography>
                </Box>
                <Typography variant="h3" color="primary" sx={{ mt: 2 }}>{data.totalProjects}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#4caf50', marginRight: 2 }}>
                    <CheckCircle />
                  </Avatar>
                  <Typography variant="h6" color="textSecondary">Completed Projects</Typography>
                </Box>
                <Typography variant="h3" color="primary" sx={{ mt: 2 }}>{data.completedProjects}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#ff9800', marginRight: 2 }}>
                    <HourglassEmpty />
                  </Avatar>
                  <Typography variant="h6" color="textSecondary">Favorite Customer</Typography>
                </Box>
                <Typography variant="h3" color="primary" sx={{ mt: 2 }}>{data.favoriteCustomers}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#2196f3', marginRight: 2 }}>
                    <Group />
                  </Avatar>
                  <Typography variant="h6" color="textSecondary">Total Clients</Typography>
                </Box>
                <Typography variant="h3" color="primary" sx={{ mt: 2 }}>{data.totalClients}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* قسم الفرق والرسم البياني */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Active Teams</Typography>
                <Typography>Team A, Team B, Team C</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* الرسم البياني */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Projects Status</Typography>
                <Doughnut data={completedVsActiveData} ref={chartRef} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

      </Box>
    </Dashboard>
  );
}
