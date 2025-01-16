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
  Grid 
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
  deleteProjectDetails 
} from '../../../../util/http for admin/http.js';  
import { Edit, Delete, Add, CheckCircle, Cancel } from '@mui/icons-material';
import CardComponent from '../../../Components/projectdeatils/CardComponent.jsx';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const [newDetail, setNewDetail] = useState({ title: '', description: '' });
  const [newSection, setNewSection] = useState({ name: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sectionDetails, setSectionDetails] = useState({}); 

  // Fetch project sections and details
  const { data, isLoading, error } = useQuery({
    queryKey: ['projectSections', projectId],
    queryFn: () => fetchProjectSections({ projectId }),
    enabled: Boolean(projectId),
    onError: (error) => console.error('Error fetching project sections:', error.message),
  });

  const { data: projectDetails, isLoading: detailsLoading, error: detailsError } = useQuery({
    queryKey: ['projectDetails', projectId],
    queryFn: () => fetchProjectDetails(projectId),
    enabled: Boolean(projectId),
    onError: (error) => console.error('Error fetching project details:', error.message),
  });

  // Mutations for creating, updating, and deleting project sections and details
  const updateSectionMutation = useMutation({
    mutationFn: (sectionData) => updateProjectSection(sectionData.id, sectionData),
    onSuccess: () => queryClient.invalidateQueries(['projectSections', projectId]),
    onError: (error) => console.error('Error updating section:', error),
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (sectionId) => deleteProjectSection(sectionId),
    onSuccess: () => queryClient.invalidateQueries(['projectSections', projectId]),
    onError: (error) => console.error('Error deleting section:', error),
  });

  const createDetailsMutation = useMutation({
    mutationFn: ({ sectionId, detailsData }) => createProjectDetails(sectionId, detailsData),
    onSuccess: () => queryClient.invalidateQueries(['projectDetails', projectId]),
    onError: (error) => console.error('Error creating project details:', error),
  });

  const createSectionMutation = useMutation({
    mutationFn: (sectionData) => createProjectSection(projectId, sectionData),
    onSuccess: () => queryClient.invalidateQueries(['projectSections', projectId]),
    onError: (error) => console.error('Error creating project section:', error),
  });

  const updateDetailMutation = useMutation({
    mutationFn: (detailData) => updateProjectDetails(detailData.id, detailData),
    onSuccess: () => queryClient.invalidateQueries(['projectDetails', projectId]),
    onError: (error) => console.error('Error updating detail:', error),
  });

  const deleteDetailMutation = useMutation({
    mutationFn: (detailId) => deleteProjectDetails(detailId),
    onSuccess: () => queryClient.invalidateQueries(['projectDetails', projectId]),
    onError: (error) => console.error('Error deleting detail:', error),
  });

  const handleAddProjectDetails = () => {
    if (!newDetail.title || !newDetail.description || !selectedItem) {
      console.error('Both title, description, and section are required');
      return;
    }
  
    const sectionId = selectedItem.id;
  
    // افترض أن التفاصيل يتم تخزينها كـ Array لكل قسم
    const detailsArray = sectionDetails[sectionId]?.details || [];
  
    const newDetailsArray = [
      ...detailsArray,
      {
        title: newDetail.title,
        description: newDetail.description,
        iconData: "defaultIcon", // أضف هنا أي بيانات أيقونة افتراضية إذا كانت مطلوبة
      },
    ];
  
    // أرسل جميع التفاصيل في طلب واحد
    createDetailsMutation.mutate({ sectionId, detailsData: newDetailsArray });
  
    // إعادة تعيين الحقول بعد الإضافة الناجحة
    setNewDetail({ title: '', description: '' });
    setSectionDetails({
      ...sectionDetails,
      [sectionId]: {
        ...sectionDetails[sectionId],
        details: newDetailsArray, // تحديث التفاصيل المخزنة محليًا
        addingDetail: false,
      },
    });
  };
  

  const handleAddProjectSection = () => {
    if (!newSection.name) {
      console.error('Section name is required');
      return;
    }
    createSectionMutation.mutate(newSection);
    setNewSection({ name: '' });
  };

  const handleDialogClose = (action) => {
    if (action === 'confirm' && currentAction && selectedItem) {
      currentAction(selectedItem);
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

  const { result } = projectDetails || {};

  return (
    <Container maxWidth="lg">
      <h1 style={{ marginBottom: '20px' }}>Project Details</h1>

      <Grid container spacing={4}>
        {/* Display general project info */}
        <Grid container spacing={4}>
          {/* Project Name Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: '#f5f5f5', borderLeft: '5px solid #3f51b5' }}>
              <CardContent>
                <Typography variant="h5" color="primary">Project Name</Typography>
                <Typography variant="body1" color="text.primary">{result?.name || 'Not available'}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Customer Name Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid #1e88e5' }}>
              <CardContent>
                <Typography variant="h5" color="primary">Customer</Typography>
                <Typography variant="body1" color="text.primary">{result?.customerName || 'Not available'}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Supervisor Name Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #43a047' }}>
              <CardContent>
                <Typography variant="h5" color="primary">Supervisor</Typography>
                <Typography variant="body1" color="text.primary">{result?.supervisorName || 'Not available'}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Start Date Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: '#fff8e1', borderLeft: '5px solid #ffb300' }}>
              <CardContent>
                <Typography variant="h5" color="primary">Start Date</Typography>
                <Typography variant="body1" color="text.primary">
                  {result?.startDate ? new Date(result.startDate).toLocaleDateString() : 'Not available'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Status Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: '#fbe9e7', borderLeft: '5px solid #d84315' }}>
              <CardContent>
                <Typography variant="h5" color="primary">Status</Typography>
                <Typography variant="body1" color="text.primary">{result?.status || 'Not available'}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Overview Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: '#ede7f6', borderLeft: '5px solid #6a1b9a' }}>
              <CardContent>
                <Typography variant="h5" color="primary">Overview</Typography>
                <Typography variant="body1" color="text.primary">{result?.overview || 'No overview available'}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Members Card */}
          <Grid item xs={12}>
            <Card style={{ backgroundColor: '#f3e5f5', borderLeft: '5px solid #8e24aa' }}>
              <CardContent>
                <Typography variant="h5" color="primary">Team Members</Typography>
                <Typography variant="body1" color="text.primary">
                  {result?.team?.length > 0 ? result.team.map(member => member.name).join(', ') : 'No team members available'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Display existing project sections */}
        <Grid item xs={12}>
          <h2>Existing Project Sections</h2>
          {data?.result?.length > 0 ? (
            <List>
              {data.result.map((section) => (
                <div key={section.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{section.name}</Typography>
                      <Typography variant="body2" color="text.secondary">ID: {section.id}</Typography>
                      <IconButton color="primary" onClick={() => { setCurrentAction(updateSectionMutation.mutate); setSelectedItem(section); setOpenDialog(true); }}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => { setCurrentAction(deleteSectionMutation.mutate); setSelectedItem(section.id); setOpenDialog(true); }}>
                        <Delete />
                      </IconButton>
                      <Button variant="outlined" color="primary" onClick={() => setSectionDetails({ ...sectionDetails, [section.id]: { addingDetail: true } })}>
                        Add Details
                      </Button>
                    </CardContent>
                  </Card>
                  <Divider />

                  {/* Display Add Detail Form under each section */}
                  {sectionDetails[section.id]?.addingDetail && (
                    <div style={{ paddingLeft: '20px' }}>
                      <TextField
                        label="Detail Title"
                        variant="outlined"
                        fullWidth
                        value={newDetail.title}
                        onChange={(e) => setNewDetail({ ...newDetail, title: e.target.value })}
                        style={{ marginBottom: '10px' }}
                      />
                      <TextField
                        label="Detail Description"
                        variant="outlined"
                        fullWidth
                        value={newDetail.description}
                        onChange={(e) => setNewDetail({ ...newDetail, description: e.target.value })}
                        style={{ marginBottom: '10px' }}
                      />
                      <Button variant="contained" color="primary" onClick={handleAddProjectDetails} startIcon={<Add />}>
                        Add Detail
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </List>
          ) : (
            <p>No sections found.</p>
          )}
        </Grid>
      </Grid>

      {/* Add Section */}
      <h2>Add Project Section</h2>
      <TextField
        label="Section Name"
        variant="outlined"
        fullWidth
        value={newSection.name}
        onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddProjectSection} startIcon={<Add />}>
        Add Section
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to perform this action?</p>
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
    </Container>
  );
};

export default ProjectDetails;
