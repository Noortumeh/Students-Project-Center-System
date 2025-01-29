/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Grid, Divider, CircularProgress, Typography, Paper } from '@mui/material';
import { Business, CheckCircle, HourglassEmpty, Group, People, School, SupervisorAccount } from '@mui/icons-material';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import SummaryCard from '../../../Components/generalcomponent/SummaryCard .jsx'; 
import ProjectStatusChart from '../../../Components/home/ProjectStatusChart .jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchStatistics } from '../../../../util/http for admin/http.js';
export default function Home() {
  const { data: statistics, error: statisticsError, isLoading: statisticsLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
  });

  if (statisticsLoading) {
    return (
      <Dashboard>
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      </Dashboard>
    );
  }

  if (statisticsError) {
    return (
      <Dashboard>
        <Typography color="error">Error fetching statistics: {statisticsError.message}</Typography>
      </Dashboard>
    );
  }

  const result = statistics || {};

  return (
    <Box mt='5'>
    <Dashboard>
      
      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', borderRadius: 2, mt:5 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'center' }}>
          Dashboard Overview
        </Typography>

       
        <Grid container spacing={4}>
          {/* تم إعادة تنظيمها وتنظيم الألوان */}
          {[
            { label: 'Total Users', value: result.usersCount, icon: <Group />, color: '#4caf50' },
            { label: 'Active Users', value: result.usersActiveCount, icon: <People />, color: '#2196f3' },
            { label: 'Supervisors', value: result.supervisorsCount, icon: <SupervisorAccount />, color: '#ff9800' },
            { label: 'Active Supervisors', value: result.supervisorsActiveCount, icon: <SupervisorAccount />, color: '#673ab7' },
            { label: 'Co-Supervisors', value: result.co_supervisorsActiveCount, icon: <People />, color: '#00bcd4' },
            { label: 'Customers', value: result.customersCount, icon: <People />, color: '#8bc34a' },
            { label: 'Students', value: result.studentsCount, icon: <School />, color: '#f44336' },
            { label: 'Total Projects', value: result.projectTotalCount, icon: <Business />, color: '#9c27b0' },
            { label: 'Active Projects', value: result.projectsActiveCount, icon: <CheckCircle />, color: '#2196f3' },
            { label: 'Pending Projects', value: result.projectsPendingCount, icon: <HourglassEmpty />, color: '#ff9800' },
            { label: 'Complete Projects', value: result.projectsCompletedCount, icon: <CheckCircle />, color: '#4caf50' },
            { label: 'Canceled Projects', value: result.projectsCanceledCount, icon: <CheckCircle />, color: '#e91e63' },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <SummaryCard
                bgcolor={stat.color}
                icon={stat.icon}
                label={stat.label}
                value={stat.value || 0}
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5 }} />

        {/* الرسوم البيانية */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
           
              <ProjectStatusChart
                data={{
                  labels: ['Completed', 'Active', 'Pending'],
                  datasets: [
                    {
                      label: 'Projects',
                      data: [
                        result.projectsCompletedCount || 0,
                        result.projectsActiveCount || 0,
                        result.projectsPendingCount || 0,
                      ],
                      backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
                    },
                  ],
                }}
                loading={statisticsLoading}
                title="Project Status"
                chartType="doughnut"
              />
           
          </Grid>

          <Grid item xs={12} md={6}>
          
              <ProjectStatusChart
                data={{
                  labels: ['Co-Supervisors', 'Customers', 'Supervisors', 'Students'],
                  datasets: [
                    {
                      label: 'Users',
                      data: [
                        result.co_supervisorsActiveCount || 0,
                        result.customersCount || 0,
                        result.supervisorsCount || 0,
                        result.studentsCount || 0,
                      ],
                      backgroundColor: ['#4caf50', '#f44336', '#2196f3', '#ff9800'],
                    },
                  ],
                }}
                loading={statisticsLoading}
                title="User Distribution"
                chartType="bar"
              />
          </Grid>

          <Grid item xs={12} md={6}>
              <ProjectStatusChart
                data={{
                  labels: ['Total Projects', 'Canceled Projects'],
                  datasets: [
                    {
                      label: 'Projects',
                      data: [
                        result.projectTotalCount || 0,
                        result.projectsCanceledCount || 0,
                      ],
                      backgroundColor: ['#4caf50', '#e91e63'],
                    },
                  ],
                }}
                loading={statisticsLoading}
                title="Project Completion Status"
                chartType="pie"
              />
          </Grid>

          <Grid item xs={12} md={6}>
              <ProjectStatusChart
                data={{
                  labels: ['Active Users', 'Inactive Users'],
                  datasets: [
                    {
                      label: 'Users',
                      data: [
                        result.usersActiveCount || 0,
                        (result.usersCount || 0) - (result.usersActiveCount || 0),
                      ],
                      backgroundColor: ['#4caf50', '#f44336'],
                    },
                  ],
                }}
                loading={statisticsLoading}
                title="User Activity"
                chartType="bar"
              />
           
           </Grid>

        </Grid>
      </Box>
    </Dashboard>
    </Box>
  );
}
