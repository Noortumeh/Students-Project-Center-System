import { useState } from 'react';
import { Box, Grid, Divider, Typography } from '@mui/material';
import { Business, CheckCircle, HourglassEmpty, Group } from '@mui/icons-material';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import SummaryCard from '../../../Components/generalcomponent/SummaryCard .jsx';
import ProjectTeam from '../../../Components/reportdetails/ProjectTeam.jsx';
import ProjectList from '../../../Components/projectdeatils/ProjectList.jsx';
import ProjectStatusChart from '../../../Components/home/ProjectStatusChart .jsx';
export default function Home() {
  const [projects, setProjects] = useState([]);

  return (
    <Dashboard>
      <Box sx={{ padding: 3, backgroundColor: '#f0f2f5' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#4caf50"
              icon={<Business />}
              label="Total Projects"
              value={0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#4caf50"
              icon={<CheckCircle />}
              label="Completed Projects"
              value={0} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#ff9800"
              icon={<HourglassEmpty />}
              label="Favorite Customer"
              value={0} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              bgcolor="#2196f3"
              icon={<Group />}
              label="Total Clients"
              value={0} 
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
                  data: [0, 0], // Placeholder values
                  backgroundColor: ['#4caf50', '#ff9800'],
                },
              ],
            }} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box>
          <Typography variant="h4" gutterBottom>Project Management</Typography>
          <ProjectList projects={projects} />
        </Box>
      </Box>
    </Dashboard>
  );
}