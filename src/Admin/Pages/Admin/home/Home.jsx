import { useState, useEffect } from 'react';
import { Box, Grid, Divider, Typography } from '@mui/material';
import { Business, CheckCircle, HourglassEmpty, Group } from '@mui/icons-material';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import SummaryCard from '../../../Components/generalcomponent/SummaryCard .jsx';
import ProjectTeam from '../../../Components/reportdetails/ProjectTeam.jsx';
import ProjectList from '../../../Components/projectdeatils/ProjectList.jsx';
import ProjectStatusChart from '../../../Components/home/ProjectStatusChart .jsx';
import { fetchStatistics } from '../../../../util/http for admin/http.js';

export default function Home() {
  const [stats, setStats] = useState({
    usersCount: 0,
    usersActiveCount: 0,
    supervisorsCount: 0,
    supervisorsActiveCount: 0,
    co_supervisorsActiveCount: 0,
    customersCount: 0,
    studentsCount: 0,
    projectsActiveCount: 0,
    projectsCompletedCount: 0,
    projectsPendingCount: 0,
  });

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const data = await fetchStatistics();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    };

    loadStatistics();
  }, []);

  return (
    <Dashboard>
      <Box sx={{ padding: 3, backgroundColor: '#f0f2f5' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#4caf50"
              icon={<Business />}
              label="Total Projects"
              value={stats.projectsActiveCount + stats.projectsCompletedCount + stats.projectsPendingCount}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#4caf50"
              icon={<CheckCircle />}
              label="Completed Projects"
              value={stats.projectsCompletedCount}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#ff9800"
              icon={<HourglassEmpty />}
              label="Favorite Customer"
              value={stats.customersCount}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#2196f3"
              icon={<Group />}
              label="Total Clients"
              value={stats.usersCount}
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
              labels: ['Completed', 'Active', 'Pending'],
              datasets: [
                {
                  label: 'Projects',
                  data: [stats.projectsCompletedCount, stats.projectsActiveCount, stats.projectsPendingCount],
                  backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
                },
              ],
            }} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box>
          <ProjectList projects={[]} />
        </Box>
      </Box>
    </Dashboard>
  );
}