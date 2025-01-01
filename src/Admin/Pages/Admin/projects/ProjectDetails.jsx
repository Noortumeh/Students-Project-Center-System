import { useState } from 'react';
import { Container, Button, TextField } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { 
  fetchProjectDetails, 
  createProjectSection, 
  updateProjectSection, 
  deleteProjectSection, 
  createProjectDetails, 
  updateProjectDetails, 
  deleteProjectDetails 
} from '../../../../util/http for admin/http.js';
import ProjectList from '../../../Components/projectdeatils/ProjectList.jsx';
import AddProject from '../../../Components/projectdeatils/AddProjects.jsx';

const ProjectDetails = () => {
  const { projectId } = useParams(); 
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [newDetail, setNewDetail] = useState({ title: '', description: '' });

  // استدعاء البيانات مع التأكد من أن الـ projectId موجود مسبقًا
  const { data, error, isLoading } = useQuery({
    queryKey: projectId ? ['projectDetails', projectId] : [],
    queryFn: () => projectId && fetchProjectDetails(projectId),
    enabled: Boolean(projectId),
    onError: (error) => {
      console.error('Error fetching project details:', error.message);
    },
  });

  // تعريف الميوتيشنز المطلوبة
  const createSectionMutation = useMutation({
    mutationFn: (sectionData) => createProjectSection(projectId, sectionData),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      console.log('Section created successfully');
    },
    onError: (error) => {
      console.error('Error creating section:', error);
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: (sectionData) => updateProjectSection(sectionData.id, sectionData),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      console.log('Section updated successfully');
    },
    onError: (error) => {
      console.error('Error updating section:', error);
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (sectionId) => deleteProjectSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      console.log('Section deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting section:', error);
    },
  });

  const createDetailsMutation = useMutation({
    mutationFn: (detailsData) => createProjectDetails(projectId, detailsData),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      console.log('Project details created successfully');
    },
    onError: (error) => {
      console.error('Error creating project details:', error);
    },
  });

  const updateDetailsMutation = useMutation({
    mutationFn: (detailsData) => updateProjectDetails(detailsData.id, detailsData),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      console.log('Project details updated successfully');
    },
    onError: (error) => {
      console.error('Error updating project details:', error);
    },
  });

  const deleteDetailsMutation = useMutation({
    mutationFn: (detailId) => deleteProjectDetails(detailId),
    onSuccess: () => {
      queryClient.invalidateQueries(['projectDetails', projectId]);
      console.log('Project details deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting project details:', error);
    },
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddProjectSection = (newSection) => {
    createSectionMutation.mutate({ name: newSection.name });
  };

  const handleUpdateProjectSection = (sectionId, updatedName) => {
    updateSectionMutation.mutate({ id: sectionId, name: updatedName });
  };

  const handleDeleteProjectSection = (sectionId) => {
    deleteSectionMutation.mutate(sectionId);
  };

  const handleAddProjectDetails = () => {
    if (!newDetail.title || !newDetail.description) {
      console.error('Both title and description are required');
      return;
    }
    createDetailsMutation.mutate(newDetail);
    setNewDetail({ title: '', description: '' });
  };

  const handleUpdateProjectDetails = (detailId, updatedDetails) => {
    updateDetailsMutation.mutate({ id: detailId, ...updatedDetails });
  };

  const handleDeleteProjectDetails = (detailId) => {
    deleteDetailsMutation.mutate(detailId);
  };

  if (!projectId) return <div>Error: Project ID is missing from URL</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || !data.result || data.result.length === 0) {
    return <div>No project details available. Please verify the project ID.</div>;
  }

  return (
    <Container maxWidth="lg">
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Create New Project Section
      </Button>
      <ProjectList 
        projects={data.result} 
        onDeleteProject={handleDeleteProjectSection} 
        onUpdateProject={handleUpdateProjectSection} 
      />
      <AddProject 
        open={openDialog} 
        onClose={handleCloseDialog} 
        onAddProject={handleAddProjectSection} 
      />

      <h2>Add Project Details</h2>
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
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="secondary" onClick={handleAddProjectDetails}>
        Add Project Detail
      </Button>

      <h2>Existing Project Details</h2>
      <ul>
        {data.result.map((detail) => (
          <li key={detail.id}>
            <h3>{detail.title}</h3>
            <p>{detail.description}</p>
            <Button variant="outlined" onClick={() => handleUpdateProjectDetails(detail.id, { title: 'Updated Title', description: 'Updated Description' })}>
              Update
            </Button>
            <Button variant="outlined" onClick={() => handleDeleteProjectDetails(detail.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ProjectDetails;
