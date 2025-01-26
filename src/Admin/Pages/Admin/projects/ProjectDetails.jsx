import { useState } from 'react';
import {
  Container,
  Button,
  TextField,
  List,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  Box,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  fetchProjectSections,
  updateProjectSection,
  deleteProjectSection,
  createProjectSection,
  createProjectDetails,
  fetchProjectDetails,
  updateProjectDetails,
  deleteProjectDetails,
} from '../../../../util/http for admin/http.js';
import { Edit, Delete, Add, CheckCircle, Cancel } from '@mui/icons-material';
import Swal from 'sweetalert2'; // استيراد SweetAlert2

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
  const queryClient = useQueryClient();
  const [newDetail, setNewDetail] = useState({ title: '', description: '' });
  const [newSection, setNewSection] = useState({ name: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sectionDetails, setSectionDetails] = useState({});
  const [editingDetail, setEditingDetail] = useState(null);

  // Fetch project sections and details
  const { data, isLoading, error } = useQuery({
    queryKey: ['projectSections', projectId],
    queryFn: () => fetchProjectSections({ projectId }),
    enabled: Boolean(projectId),
    onError: (error) => {
      console.error('Error fetching project sections:', error.message);
      Swal.fire('Error', 'Failed to fetch project sections', 'error');
    },
  });

  const { data: projectDetails, isLoading: detailsLoading, error: detailsError } = useQuery({
    queryKey: ['projectDetails', projectId],
    queryFn: () => fetchProjectDetails(projectId),
    enabled: Boolean(projectId),
    onError: (error) => {
      console.error('Error fetching project details:', error.message);
      Swal.fire('Error', 'Failed to fetch project details', 'error');
    },
  });

  // Mutations for creating, updating, and deleting project sections and details
  const updateSectionMutation = useMutation({
    mutationFn: (sectionData) => updateProjectSection(sectionData.id, sectionData),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      Swal.fire('Success', 'Section updated successfully!', 'success');
    },
    onError: (error) => {
      console.error('Error updating section:', error);
      Swal.fire('Error', 'Failed to update section', 'error');
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (sectionId) => deleteProjectSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      Swal.fire('Success', 'Section deleted successfully!', 'success');
    },
    onError: (error) => {
      console.error('Error deleting section:', error);
      Swal.fire('Error', 'Failed to delete section', 'error');
    },
  });

  const createDetailsMutation = useMutation({
    mutationFn: ({ sectionId, detailsData }) => createProjectDetails(sectionId, detailsData),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      Swal.fire('Success', 'Details added successfully!', 'success');
    },
    onError: (error) => {
      console.error('Error creating project details:', error);
      Swal.fire('Error', 'Failed to add details', 'error');
    },
  });

  const createSectionMutation = useMutation({
    mutationFn: (sectionData) => createProjectSection(projectId, sectionData),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      Swal.fire('Success', 'Section added successfully!', 'success');
    },
    onError: (error) => {
      console.error('Error creating project section:', error);
      Swal.fire('Error', 'Failed to add section', 'error');
    },
  });

  const updateDetailMutation = useMutation({
    mutationFn: (detailData) => updateProjectDetails(detailData.id, detailData),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      Swal.fire('Success', 'Detail updated successfully!', 'success');
    },
    onError: (error) => {
      console.error('Error updating detail:', error);
      Swal.fire('Error', 'Failed to update detail', 'error');
    },
  });

  const deleteDetailMutation = useMutation({
    mutationFn: (detailId) => deleteProjectDetails(detailId),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      Swal.fire('Success', 'Detail deleted successfully!', 'success');
    },
    onError: (error) => {
      console.error('Error deleting detail:', error);
      Swal.fire('Error', 'Failed to delete detail', 'error');
    },
  });

  const handleAddProjectDetails = () => {
    if (!newDetail.title || !newDetail.description || !selectedItem) {
      Swal.fire('Error', 'Please fill in all required fields: title, description, and section.', 'error');
      return;
    }

    const sectionId = selectedItem.id;

    const detailsData = [{
      title: newDetail.title,
      description: newDetail.description,
      iconData: "defaultIcon",
    }];

    createDetailsMutation.mutate({ sectionId, detailsData }, {
      onSuccess: () => {
        setNewDetail({ title: '', description: '' });
        setSectionDetails({
          ...sectionDetails,
          [sectionId]: {
            ...sectionDetails[sectionId],
            details: [...(sectionDetails[sectionId]?.details || []), ...detailsData],
            addingDetail: false,
          },
        });
      },
    });
  };

    const handleUpdateDetail = (detail) => {
      if (!detail.id || !detail.title || !detail.description) {
        Swal.fire('Error', 'Detail ID, title, and description are required', 'error');
        return;
      }
  
      console.log('Updating detail with:', detail); // تحقق من البيانات
      updateDetailMutation.mutate(detail);
    };
  
    const handleDeleteDetail = (detailId) => {
      if (!detailId) {
        Swal.fire('Error', 'Detail ID is required', 'error');
        return;
      }
  
      console.log('Deleting detail with ID:', detailId); // تحقق من ID
      deleteDetailMutation.mutate(detailId);
    };
  
  const handleAddProjectSection = () => {
    if (!newSection.name) {
      Swal.fire('Error', 'Section name is required', 'error');
      return;
    }
    createSectionMutation.mutate(newSection);
    setNewSection({ name: '' });
  };

  const handleDialogClose = (action) => {
    if (action === 'confirm' && currentAction && selectedItem) {
      if (currentAction === deleteSectionMutation.mutate && selectedItem.id) {
        currentAction(selectedItem.id);
      } else if (currentAction === updateSectionMutation.mutate && selectedItem.id) {
        currentAction(selectedItem);
      }
    }
    setOpenDialog(false);
    setCurrentAction(null);
    setSelectedItem(null);
  };

  if (isLoading || detailsLoading) {
    return <div>Loading...</div>;
  }

  if (error || detailsError) {
    return <div>Error: {error?.message || detailsError?.message}</div>;
  }

  // استخراج البيانات من projectDetails
  const { name, customerName, supervisorName, startDate, status, overview, team } = projectDetails || {};

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, color: theme.palette.primary.main }}>
          Project Details
        </Typography>

        <Grid container spacing={4}>
          {/* Display general project info */}
          <Grid container spacing={4}>
            {/* Project Name Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#f5f5f5', borderLeft: `5px solid ${theme.palette.primary.main}` }}>
                <CardContent>
                  <Typography variant="h5" color="primary">Project Name</Typography>
                  <Typography variant="body1" color="text.primary">{name || 'Not available'}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Customer Name Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: `5px solid ${theme.palette.secondary.main}` }}>
                <CardContent>
                  <Typography variant="h5" color="primary">Customer</Typography>
                  <Typography variant="body1" color="text.primary">{customerName || 'Not available'}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Supervisor Name Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #43a047' }}>
                <CardContent>
                  <Typography variant="h5" color="primary">Supervisor</Typography>
                  <Typography variant="body1" color="text.primary">{supervisorName || 'Not available'}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Start Date Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#fff8e1', borderLeft: '5px solid #ffb300' }}>
                <CardContent>
                  <Typography variant="h5" color="primary">Start Date</Typography>
                  <Typography variant="body1" color="text.primary">
                    {startDate ? new Date(startDate).toLocaleDateString() : 'Not available'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Status Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#fbe9e7', borderLeft: '5px solid #d84315' }}>
                <CardContent>
                  <Typography variant="h5" color="primary">Status</Typography>
                  <Typography variant="body1" color="text.primary">{status || 'Not available'}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Overview Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#ede7f6', borderLeft: '5px solid #6a1b9a' }}>
                <CardContent>
                  <Typography variant="h5" color="primary">Overview</Typography>
                  <Typography variant="body1" color="text.primary">{overview || 'No overview available'}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Team Members Card */}
            <Grid item xs={12}>
              <Card sx={{ backgroundColor: '#f3e5f5', borderLeft: '5px solid #8e24aa' }}>
                <CardContent>
                  <Typography variant="h5" color="primary">Team Members</Typography>
                  <Typography variant="body1" color="text.primary">
                    {team?.length > 0 ? team.map(member => member.name).join(', ') : 'No team members available'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Display existing project sections */}
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: 3 }}>Existing Project Sections</Typography>
            {data?.result?.length > 0 ? (
              <List>
                {data.result.map((section) => (
                  <Box key={section.id} sx={{ mb: 3 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{section.name}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <IconButton color="primary" onClick={() => { setCurrentAction(updateSectionMutation.mutate); setSelectedItem(section); setOpenDialog(true); }}>
                            <Edit />
                          </IconButton>
                          <IconButton color="error" onClick={() => { setCurrentAction(deleteSectionMutation.mutate); setSelectedItem(section.id); setOpenDialog(true); }}>
                            <Delete />
                          </IconButton>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setSelectedItem(section);
                              setSectionDetails({ ...sectionDetails, [section.id]: { addingDetail: true } });
                            }}
                          >
                            Add Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                    <Divider sx={{ my: 2 }} />

                    {/* Display Add Detail Form under each section */}
                    {sectionDetails[section.id]?.addingDetail && (
                      <Box sx={{ pl: 4, mt: 2 }}>
                        <TextField
                          label="Detail Title"
                          variant="outlined"
                          fullWidth
                          value={newDetail.title}
                          onChange={(e) => setNewDetail({ ...newDetail, title: e.target.value })}
                          sx={{ mb: 2 }}
                          error={!newDetail.title}
                          helperText={!newDetail.title ? 'This field is required' : ''}
                        />
                        <TextField
                          label="Detail Description"
                          variant="outlined"
                          fullWidth
                          value={newDetail.description}
                          onChange={(e) => setNewDetail({ ...newDetail, description: e.target.value })}
                          sx={{ mb: 2 }}
                          error={!newDetail.description}
                          helperText={!newDetail.description ? 'This field is required' : ''}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddProjectDetails} startIcon={<Add />}>
                          Add Detail
                        </Button>
                      </Box>
                    )}

                    {/* Display existing details for each section */}
                    {sectionDetails[section.id]?.details?.map((detail, index) => (
                      <Box key={index} sx={{ pl: 4, mt: 2 }}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{detail.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{detail.description}</Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                              <IconButton color="primary" onClick={() => setEditingDetail(detail)}>
                                <Edit />
                              </IconButton>
                              <IconButton color="error" onClick={() => handleDeleteDetail(detail.id)}>
                                <Delete />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No sections found.</Typography>
            )}
          </Grid>
        </Grid>

        {/* Add Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Add Project Section</Typography>
          <TextField
            label="Section Name"
            variant="outlined"
            fullWidth
            value={newSection.name}
            onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddProjectSection} startIcon={<Add />}>
            Add Section
          </Button>
        </Box>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to perform this action?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose('cancel')} color="secondary" startIcon={<Cancel />}>
              Cancel
            </Button>
            <Button onClick={() => handleDialogClose('confirm')} color="primary" startIcon={<CheckCircle />}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Detail Dialog */}
        {editingDetail && (
          <Dialog open={Boolean(editingDetail)} onClose={() => setEditingDetail(null)}>
            <DialogTitle>Edit Detail</DialogTitle>
            <DialogContent>
              <TextField
                label="Detail Title"
                variant="outlined"
                fullWidth
                value={editingDetail.title}
                onChange={(e) => setEditingDetail({ ...editingDetail, title: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Detail Description"
                variant="outlined"
                fullWidth
                value={editingDetail.description}
                onChange={(e) => setEditingDetail({ ...editingDetail, description: e.target.value })}
                sx={{ mb: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditingDetail(null)} color="secondary" startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateDetail(editingDetail)} color="primary" startIcon={<CheckCircle />}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ProjectDetails;