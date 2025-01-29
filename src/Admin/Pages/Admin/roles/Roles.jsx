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
import Swal from 'sweetalert2';

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

const ProjectDetailsSupervisor = () => {
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
    onSuccess: (data) => {
      console.log('Project sections fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Error fetching project sections:', error.message);
      Swal.fire('Error', 'Failed to fetch project sections', 'error');
    },
  });

  const { data: projectDetails, isLoading: detailsLoading, error: detailsError } = useQuery({
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

  // Mutations for creating, updating, and deleting project sections and details
  const updateSectionMutation = useMutation({
    mutationFn: (sectionData) => updateProjectSection(sectionData.id, sectionData),
    onSuccess: (data) => {
      console.log('Section updated successfully:', data);
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
    onSuccess: (data) => {
      console.log('Section deleted successfully:', data);
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
    onSuccess: (data) => {
      console.log('Details added successfully:', data);
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
    onSuccess: (data) => {
      console.log('Section added successfully:', data);
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
    onSuccess: (data) => {
      console.log('Detail updated successfully:', data);
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
    onSuccess: (data) => {
      console.log('Detail deleted successfully:', data);
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

    console.log('Adding new detail with data:', detailsData);

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
    if (!detail.id || !detail.title || !detail.description || !detail.section) {
      Swal.fire('Error', 'Detail ID, title, description, and section are required', 'error');
      return;
    }

    const updatedData = {
      id: detail.id,
      title: detail.title,
      description: detail.description,
      section: detail.section,
      iconData: detail.iconData ? btoa(detail.iconData) : "defaultIcon",
    };

    console.log('Updated data being sent:', updatedData);

    updateDetailMutation.mutate(updatedData);
  };

  const handleDeleteDetail = (detailId) => {
    console.log("Detail ID received in handleDeleteDetail:", detailId); // تحقق من الـ ID هنا
  
    if (!detailId) {
      console.error("Detail ID is undefined or null in handleDeleteDetail"); // طباعة خطأ إذا كان الـ ID غير معرّف
      Swal.fire('Error', 'Detail ID is required', 'error');
      return;
    }
  
    // تأكيد الحذف باستخدام SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this detail!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("User confirmed deletion. Proceeding to delete detail with ID:", detailId); // تأكيد الحذف
        deleteDetailMutation.mutate(detailId);
      }
    });
  };
  
  const handleAddProjectSection = () => {
    if (!newSection.name) {
      Swal.fire('Error', 'Section name is required', 'error');
      return;
    }

    console.log('Adding new section with data:', newSection);

    createSectionMutation.mutate(newSection);
    setNewSection({ name: '' });
  };

  const handleDialogClose = (action) => {
    if (action === 'confirm' && currentAction && selectedItem) {
      if (currentAction === deleteSectionMutation.mutate && selectedItem.id) {
        console.log('Deleting section with ID:', selectedItem.id);
        currentAction(selectedItem.id);
      } else if (currentAction === updateSectionMutation.mutate && selectedItem.id) {
        console.log('Updating section with data:', selectedItem);
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, color: theme.palette.primary.main }}>
          Project Details (Supervisor View)
        </Typography>

        <Grid container spacing={4}>
       
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
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setCurrentAction(updateSectionMutation.mutate);
                              setSelectedItem(section);
                              setOpenDialog(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setCurrentAction(deleteSectionMutation.mutate);
                              setSelectedItem(section.id);
                              setOpenDialog(true);
                            }}
                          >
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
                    {sectionDetails[section.id]?.details?.map((detail, index) => {
  console.log("Rendering detail:", detail); // طباعة كائن detail كاملاً
  console.log("Detail ID in map function:", detail.id); // تحقق من الـ ID هنا

  return (
    <Box key={index} sx={{ pl: 4, mt: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h6">{detail.title}</Typography>
          <Typography variant="body2" color="text.secondary">{detail.description}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <IconButton
              color="primary"
              onClick={() => {
                console.log("Editing detail with ID:", detail.id); // تحقق من الـ ID عند التعديل
                setEditingDetail({
                  ...detail,
                  section: section.id,
                  id: detail.id,
                });
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                console.log("Detail ID before deletion:", detail.id); // تحقق من الـ ID قبل الحذف
                handleDeleteDetail(detail.id);
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
})}
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
              <Button
                onClick={() => {
                  if (!editingDetail.id || !editingDetail.title || !editingDetail.description || !editingDetail.section) {
                    Swal.fire('Error', 'Detail ID, title, description, and section are required', 'error');
                    return;
                  }
                  handleUpdateDetail(editingDetail);
                  setEditingDetail(null);
                }}
                color="primary"
                startIcon={<CheckCircle />}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ProjectDetailsSupervisor;