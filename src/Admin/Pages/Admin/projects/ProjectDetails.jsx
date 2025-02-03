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
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { fetchProjectDetails, fetchArchivedUsers } from '../../../../util/http for admin/http.js';
import Swal from 'sweetalert2';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
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

  const handleRowClick = (id) => {
    console.log('Row clicked:', id);
  };

  const columns = [
    { field: 'username', headerName: 'Username', width: 250 },
    { field: 'roleInProject', headerName: 'Role in Project', width: 200 },
    { field: 'joinAt', headerName: 'Join Date', width: 200, 
      renderCell: (params) => new Date(params.value).toLocaleString() 
    },
    { field: 'deletedNotes', headerName: 'Deleted Notes', width: 250 },
    { field: 'deletededAt', headerName: 'Deleted At', width: 200, 
      renderCell: (params) => new Date(params.value).toLocaleString() 
    },
  ];

  if (isLoading || isLoadingArchived) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Loading Details: {error?.message}</div>;
  }

  if (archivedError) {
    return <div>Error Loading Archived: {archivedError?.message}</div>;
  }

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
    supervisorJoinAt,
  } = projectDetails || {};

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 4, mt: 5, width: '100%' }}>
        <Typography variant="h3" sx={{ mb: 4, color: theme.palette.primary.main }}>
          {name}
        </Typography>
  
        {/* Project Overview */}
        <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid #2196f3', mb: 4 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
              Project Overview
            </Typography>
            <Typography variant="body1" color="text.primary">{overview || 'No overview available.'}</Typography>
          </CardContent>
        </Card>
  
        {/* Project Dates and Status */}
        <Card sx={{ backgroundColor: '#e8f5e9', borderLeft: `5px solid ${theme.palette.primary.main}`, mb: 4 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
              Project Dates and Status
            </Typography>
            <Typography variant="h6" color="primary">Start Date</Typography>
            <Typography variant="body1" color="text.primary">
              {startDate ? new Date(startDate).toLocaleDateString() : 'Not Available'}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>End Date</Typography>
            <Typography variant="body1" color="text.primary">
              {endDate ? new Date(endDate).toLocaleDateString() : 'Not Available'}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Status</Typography>
            <Typography variant="body1" color="text.primary">{status || 'Not Available'}</Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Status Change Notes</Typography>
            <Typography variant="body1" color="text.primary">{changeStatusNotes || 'No change notes.'}</Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Last Status Change At</Typography>
            <Typography variant="body1" color="text.primary">
              {changeStatusAt ? new Date(changeStatusAt).toLocaleString() : 'Not Available'}
            </Typography>
          </CardContent>
        </Card>
  
        {/* Company and Customer Details */}
        <Card sx={{ backgroundColor: '#f5f5f5', borderLeft: '5px solid #9e9e9e', mb: 4 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
              Company and Customer Details
            </Typography>
            <Typography variant="h6" color="primary">Company</Typography>
            <Typography variant="body1" color="text.primary">{company || 'Not Available'}</Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Customer Name</Typography>
            <Typography variant="body1" color="text.primary">{customerName || 'Not Available'}</Typography>
          </CardContent>
        </Card>
  
        {/* Supervisor and Co-Supervisors */}
        {supervisorName && supervisorJoinAt && (
          <Card sx={{ backgroundColor: '#ffebee', borderLeft: '5px solid #e57373', mb: 4 }}>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Supervisor Details
              </Typography>
              <Typography variant="h6" color="primary">Supervisor Name</Typography>
              <Typography variant="body1" color="text.primary">{supervisorName}</Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Joined At</Typography>
              <Typography variant="body1" color="text.primary">
                {new Date(supervisorJoinAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        )}
  
        {coSupervisors && coSupervisors.length > 0 && (
          <Card sx={{ backgroundColor: '#f3e5f5', borderLeft: '5px solid #9c27b0', mb: 4 }}>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Co-Supervisors
              </Typography>
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
  
        {/* Favorite Status */}
        <Card sx={{ backgroundColor: favorite ? '#e8f5e9' : '#ffebee', borderLeft: '5px solid #81c784', mb: 4 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
              Favorite Status
            </Typography>
            <Typography variant="body1" color="text.primary">
              {favorite ? 'This project is marked as favorite.' : 'This project is not marked as favorite.'}
            </Typography>
          </CardContent>
        </Card>
  
        {/* Team Members */}
        {team && team.length > 0 && (
          <Card sx={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800', mb: 4 }}>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Team Members
              </Typography>
              <List>
                {team.map((member, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Joined At: {new Date(member.joinAt).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
  
        {/* Project Details Sections */}
        {sections && sections.length > 0 && (
          <Card sx={{ backgroundColor: '#e0f7fa', borderLeft: '5px solid #00bcd4', mb: 4 }}>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Project Details
              </Typography>
              <List>
                {sections.map((section) => (
                  <Box key={section.sectionId} sx={{ mb: 3 }}>
                    <Card sx={{ width: '100%' }}>
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
                          <Typography variant="body1">{section.sectionDescription}</Typography>
                          {section.details && section.details.length > 0 && (
                            <List>
                              {section.details.map((detail, index) => (
                                <Box key={index} sx={{ mt: 2 }}>
                                  <Typography variant="h6">{detail.title}</Typography>
                                  <Typography variant="body1">{detail.description}</Typography>
                                  {detail.imagePath && (
                                    <img src={detail.imagePath} alt={detail.title} style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
                                  )}
                                </Box>
                              ))}
                            </List>
                          )}
                        </Collapse>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
  
        {/* Archived Users */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
            Archived Users
          </Typography>
          {archivedUsers?.result && Array.isArray(archivedUsers.result) && archivedUsers.result.length > 0 ? (
            <DataGrid
              rows={archivedUsers.result.map((user, index) => ({
                id: user.id || index,
                username: user.name || 'N/A',
                roleInProject: user.role || 'N/A',
                joinAt: user.joinAt ? new Date(user.joinAt).toLocaleString() : 'N/A',
                deletedNotes: user.deletedNotes || 'No notes',
                deletededAt: user.deletededAt ? new Date(user.deletededAt).toLocaleString() : 'N/A',
              }))}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={({ id }) => handleRowClick(id)}
              sx={{ width: '100%' }}
            />
          ) : (
            <Typography variant="body1">No archived users found.</Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default ProjectDetails;