import { useState } from 'react';
import { Box, Grid, Divider, CircularProgress, Typography } from '@mui/material';
import { Business, CheckCircle, HourglassEmpty, Group } from '@mui/icons-material';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import SummaryCard from '../../../Components/generalcomponent/SummaryCard .jsx';
import ProjectTeam from '../../../Components/reportdetails/ProjectTeam.jsx';
import ProjectList from '../../../Components/projectdeatils/ProjectList.jsx';
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
    <Dashboard>
      <Box sx={{ padding: 3, backgroundColor: '#f0f2f5' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#4caf50"
              icon={<Business />}
              label="Total Projects"
              value={result.projectsActiveCount || 0} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#4caf50"
              icon={<CheckCircle />}
              label="Completed Projects"
              value={result.projectsCompletedCount || 0} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#ff9800"
              icon={<HourglassEmpty />}
              label="Favorite Customer"
              value={result.customersCount || 0} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#2196f3"
              icon={<Group />}
              label="Total Clients"
              value={result.usersCount || 0} 
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProjectTeam />
          </Grid>

          <Grid item xs={12} md={6}>
            <ProjectStatusChart data={{
              labels: ['Completed', 'Active'],
              datasets: [
                {
                  label: 'Projects',
                  data: [
                    result.projectsCompletedCount || 0, 
                    result.projectsActiveCount || 0
                  ],
                  backgroundColor: ['#4caf50', '#ff9800'],
                },
              ],
            }} loading={statisticsLoading} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
       
      </Box>
    </Dashboard>
  );
}