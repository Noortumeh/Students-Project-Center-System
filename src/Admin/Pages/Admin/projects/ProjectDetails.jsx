import {
  Container,
  Card,
  CardContent,
  Typography,
  ThemeProvider,
  createTheme,
  Box,
  Divider,
  IconButton,
  Collapse,
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { fetchProjectDetails } from '../../../../util/http for admin/http.js';
import { fetchArchivedUsers } from '../../../../util/http for admin/http.js'; // Import the function for archived users
import Swal from 'sweetalert2';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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

  const { data: archivedUsers, isLoading: isLoadingArchived, error: archivedError } = useQuery({
    queryKey: ['archivedUsers', projectId],
    queryFn: () => fetchArchivedUsers(projectId),
    enabled: Boolean(projectId),
    onSuccess: (data) => {
      console.log('Archived users fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Error fetching archived users:', error.message);
      Swal.fire('Error', 'Failed to fetch archived users', 'error');
    },
  });

  if (isLoading || isLoadingArchived) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  if (archivedError) {
    return <div>Error: {archivedError?.message}</div>;
  }

  // Extract data from projectDetails
  const {
    name,
    customerName,
    supervisorName,
    startDate,
    status,
    team,
    coSupervisors,
    changeStatusAt,
    changeStatusNotes,
    company,
    endDate,
    favorite,
    overview,
    projectDetails: sections,
    supervisorJoinAt, // supervisor join time
  } = projectDetails || {};

  return (
    <Dashboard>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ py: 4, mt: 5 }}>
          <Typography variant="h3" sx={{ mb: 4, color: theme.palette.primary.main }}>
            {name}
          </Typography>

          {/* Project Overview */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
              Project Overview
            </Typography>
            <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid #2196f3' }}>
              <CardContent>
                <Typography variant="body1" color="text.primary">{overview || 'No overview available.'}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Project Dates and Status */}
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
                <Typography variant="body1" color="text.primary">{changeStatusNotes || 'No change notes.'}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800', mt: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary">Last Status Change At</Typography>
                <Typography variant="body1" color="text.primary">
                  {changeStatusAt ? new Date(changeStatusAt).toLocaleString() : 'Not Available'}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Company and Customer Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
              Company and Customer Details
            </Typography>
            <Card sx={{ backgroundColor: '#f5f5f5', borderLeft: '5px solid #9e9e9e' }}>
              <CardContent>
                <Typography variant="h6" color="primary">Company</Typography>
                <Typography variant="body1" color="text.primary">{company || 'Not Available'}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ backgroundColor: '#e0f7fa', borderLeft: '5px solid #00bcd4', mt: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary">Customer Name</Typography>
                <Typography variant="body1" color="text.primary">{customerName || 'Not Available'}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Supervisor and Co-Supervisors */}
          {coSupervisors && coSupervisors.length > 0 && (
            <Card sx={{ backgroundColor: '#f3e5f5', borderLeft: '5px solid #9c27b0', mt: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary">Co-Supervisors</Typography>
                <List>
                  {coSupervisors.map((coSupervisor, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>{coSupervisor.coSupervisorName?.[0] || 'A'}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={coSupervisor.coSupervisorName}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              Joined At: {new Date(coSupervisor.coSupervisorJoinAt).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Supervisor Details */}
          {supervisorName && supervisorJoinAt && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Supervisor Details
              </Typography>
              <Card sx={{ backgroundColor: '#ffebee', borderLeft: '5px solid #e57373' }}>
                <CardContent>
                  <Typography variant="h6" color="primary">Supervisor Name</Typography>
                  <Typography variant="body1" color="text.primary">{supervisorName}</Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    Joined At
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {new Date(supervisorJoinAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Team Members */}
          {team && team.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Team Members
              </Typography>
              <Card sx={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #4caf50' }}>
                <CardContent>
                  <List>
                    {team.map((member, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar>{member.name?.[0] || 'A'}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={member.name}
                          secondary={
                            <>
                              
                              
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Project Details Sections */}
          {sections && sections.length > 0 ? (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Project Details
              </Typography>
              <List>
                {sections.map((section) => (
                  <Box key={section.sectionId} sx={{ mb: 3 }}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6">{section.sectionName}</Typography>
                          <IconButton onClick={() => {
                            setSectionDetails(prev => ({ ...prev, [section.sectionId]: !prev[section.sectionId] }));
                          }}>
                            {sectionDetails[section.sectionId] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Collapse in={sectionDetails[section.sectionId]}>
                          {section.details.map((detail) => (
                            <Box key={detail.id} sx={{ pl: 4, mt: 2 }}>
                              <Card>
                                <CardContent>
                                  {detail.imagePath && <img src={detail.imagePath} alt="icon" width={50} height={50} />}
                                  <Typography variant="h6">{detail.title}</Typography>
                                  <Typography variant="body2" color="text.secondary">{detail.description}</Typography>
                                </CardContent>
                              </Card>
                            </Box>
                          ))}
                        </Collapse>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </List>
            </Box>
          ) : (
            <Typography variant="body1">No sections found.</Typography>
          )}

          {/* Archived Users */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
              Archived Users
            </Typography>
            {archivedUsers?.result && archivedUsers.result.length > 0 ? (
              <Card sx={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800' }}>
                <CardContent>
                  <Typography variant="h6" color="primary">Archived Users List</Typography>
                  <Typography variant="body1" color="text.primary">
                    {archivedUsers.result.map((user, index) => (
                      <div key={index}>{user.name}</div>
                    ))}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Card sx={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800' }}>
                <CardContent>
                  <Typography variant="body1" color="text.primary">No archived users found.</Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </Dashboard>
  );
};

export default ProjectDetails;
