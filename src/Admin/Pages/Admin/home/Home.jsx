import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Divider, CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { Business, CheckCircle, HourglassEmpty, Group } from '@mui/icons-material';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import SummaryCard from '../../../Components/generalcomponent/SummaryCard .jsx';
import ProjectTeam from '../../../Components/reportdetails/ProjectTeam.jsx';
import { Chart } from 'chart.js';

export default function ProjectCenterDashboard() {
  const [data, setData] = useState({
    totalProjects: 0,
    completedProjects: 0,
    favoriteCustomers: 0,
    totalClients: 0,
  });
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboardData');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData({
          totalProjects: result.totalProjects || 0,
          completedProjects: result.completedProjects || 0,
          favoriteCustomers: result.favoriteCustomers || 0,
          totalClients: result.totalClients || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Initialize and update the chart
  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(chartRef.current);
    if (existingChart) {
      existingChart.destroy();
    }

    // Create a new chart if data is valid
    if (data.totalProjects > 0) {
      new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Active'],
          datasets: [
            {
              label: 'Projects',
              data: [data.completedProjects, data.totalProjects - data.completedProjects],
              backgroundColor: ['#4caf50', '#ff9800'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [data]);

  return (
    <Dashboard>
      <Box sx={{ padding: 3, backgroundColor: '#f0f2f5' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#4caf50"
              icon={<Business />}
              label="Total Projects"
              value={data.totalProjects}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#4caf50"
              icon={<CheckCircle />}
              label="Completed Projects"
              value={data.completedProjects}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#ff9800"
              icon={<HourglassEmpty />}
              label="Favorite Customer"
              value={data.favoriteCustomers}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#2196f3"
              icon={<Group />}
              label="Total Clients"
              value={data.totalClients}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProjectTeam />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Projects Status</Typography>
                {loading ? (
                  <Grid container justifyContent="center">
                    <CircularProgress />
                  </Grid>
                ) : (
                  <canvas ref={chartRef} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
      </Box>
    </Dashboard>
  );
}
