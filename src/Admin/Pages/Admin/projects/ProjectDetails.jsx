import { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  Box,
  Divider,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchProjectDetails } from '../../../../util/http for admin/http.js';
import Swal from 'sweetalert2';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Primary color
    },
    secondary: {
      main: '#f50057', // Secondary color
    },
  },
});

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [sectionDetails, setSectionDetails] = useState({});

  // Fetch project details
  const { data: projectDetails, isLoading, error } = useQuery({
    queryKey: ['projectDetails', projectId],
    queryFn: () => fetchProjectDetails(projectId),
    enabled: Boolean(projectId),
    onSuccess: (data) => {
      console.log('Project details fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Error fetching project details:', error.message);
      Swal.fire('Error', 'Failed to fetch project details', 'error');
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  // Extract data from projectDetails
  const { name, customerName, supervisorName, startDate, status, overview, team, coSupervisors, changeCustomerNote, changeStatusNotes, changeSupervisorNote, endDate } = projectDetails || {};

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Display project name as the page title */}
        <Typography variant="h3" sx={{ mb: 4, color: theme.palette.primary.main }}>
          {name} {/* This will display the project name */}
        </Typography>

        {/* Section 1: Project Dates and Status */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
            Project Dates and Status
          </Typography>
          <Card sx={{ backgroundColor: '#e8f5e9', borderLeft: `5px solid ${theme.palette.primary.main}` }}>
            <CardContent>
              <Typography variant="h6" color="primary">Start Date</Typography>
              <Typography variant="body1" color="text.primary">
                {startDate ? new Date(startDate).toLocaleDateString() : 'Not Available'}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#f0f4c3', borderLeft: '5px solid #cddc39', mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary">End Date</Typography>
              <Typography variant="body1" color="text.primary">
                {endDate ? new Date(endDate).toLocaleDateString() : 'Not Available'}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#ffebee', borderLeft: '5px solid #e57373', mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary">Status</Typography>
              <Typography variant="body1" color="text.primary">{status || 'Not Available'}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#f3e5f5', borderLeft: '5px solid #9c27b0', mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary">Status Change Notes</Typography>
              <Typography variant="body1" color="text.primary">{changeStatusNotes || 'Not Available'}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Section 2: Project Overview */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
            Project Overview
          </Typography>
          <Card sx={{ backgroundColor: '#ede7f6', borderLeft: '5px solid #6a1b9a' }}>
            <CardContent>
              <Typography variant="h6" color="primary">Overview</Typography>
              <Typography variant="body1" color="text.primary">{overview || 'No Overview Available'}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Section 3: Project Parties */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
            Project Parties
          </Typography>
          <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: `5px solid ${theme.palette.secondary.main}` }}>
            <CardContent>
              <Typography variant="h6" color="primary">Supervisor</Typography>
              <Typography variant="body1" color="text.primary">{supervisorName || 'Not Available'}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #43a047', mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary">Customer</Typography>
              <Typography variant="body1" color="text.primary">{customerName || 'Not Available'}</Typography>
            </CardContent>
          </Card>

          {/* Co-Supervisors */}
          {coSupervisors?.map((coSupervisor, index) => (
            <Card key={index} sx={{ backgroundColor: '#c8e6c9', borderLeft: '5px solid #4caf50', mt: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary">Co-Supervisor {index + 1}</Typography>
                <Typography variant="body1" color="text.primary"><strong>Name:</strong> {coSupervisor.coSupervisorName || 'Not Available'}</Typography>
                <Typography variant="body1" color="text.primary"><strong>Joined on:</strong> {coSupervisor.coSupervisorJoinAt ? new Date(coSupervisor.coSupervisorJoinAt).toLocaleDateString() : 'Not Available'}</Typography>
              </CardContent>
            </Card>
          ))}

          {/* Team Members */}
          <Card sx={{ backgroundColor: '#f3e5f5', borderLeft: '5px solid #8e24aa', mt: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary">Team Members</Typography>
              <Typography variant="body1" color="text.primary">
                {team?.length > 0 ? team.map(member => member.name).join(', ') : 'No Team Members Available'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProjectDetails;
