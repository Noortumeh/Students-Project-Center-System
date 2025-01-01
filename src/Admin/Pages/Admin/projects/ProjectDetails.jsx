import { useState } from 'react';
import { Container, Button, TextField } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';  // إضافة useNavigate
import { 
  fetchProjectSections, 
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
  const navigate = useNavigate();  // إضافة useNavigate لتوجيه المستخدم
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [newDetail, setNewDetail] = useState({ title: '', description: '' });

  console.log('Project ID from URL:', projectId); // طباعة الـ projectId من الـ URL

  if (!projectId) {
    return <div>Error: Project ID is missing from URL</div>; // رسالة خطأ عند غياب الـ projectId
  }

  // استعلامات React Query لجلب وتعديل وحذف الأقسام
  const { data, error, isLoading } = useQuery({
    queryKey: projectId ? ['projectSections', projectId] : [],
    queryFn: () => fetchProjectSections(projectId),
    enabled: Boolean(projectId),
    onError: (error) => {
      console.error('Error fetching project sections:', error.message);
    },
  });

  // عمليات التعديل والإضافة
  const createSectionMutation = useMutation({
    mutationFn: (sectionData) => {
      console.log('Creating section with name:', sectionData.name);
      return createProjectSection(projectId, sectionData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      console.log('Section created successfully');
    },
    onError: (error) => {
      console.error('Error creating section:', error);
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: (sectionData) => {
      console.log('Updating section with ID:', sectionData.id);
      return updateProjectSection(sectionData.id, sectionData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      console.log('Section updated successfully');
    },
    onError: (error) => {
      console.error('Error updating section:', error);
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (sectionId) => {
      console.log('Deleting section with ID:', sectionId);
      return deleteProjectSection(sectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      console.log('Section deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting section:', error);
    },
  });

  // إضافة تفاصيل المشروع
  const createDetailsMutation = useMutation({
    mutationFn: (detailsData) => {
      console.log('Creating project details:', detailsData);
      return createProjectDetails(projectId, detailsData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      console.log('Project details created successfully');
    },
    onError: (error) => {
      console.error('Error creating project details:', error);
    },
  });

  const updateDetailsMutation = useMutation({
    mutationFn: (detailsData) => {
      console.log('Updating project details with ID:', detailsData.id);
      return updateProjectDetails(detailsData.id, detailsData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      console.log('Project details updated successfully');
    },
    onError: (error) => {
      console.error('Error updating project details:', error);
    },
  });

  const deleteDetailsMutation = useMutation({
    mutationFn: (detailId) => {
      console.log('Deleting project detail with ID:', detailId);
      return deleteProjectDetails(detailId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projectSections', projectId]);
      console.log('Project detail deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting project details:', error);
    },
  });

  const handleOpenDialog = () => {
    console.log('Opening dialog to add new section');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    console.log('Closing dialog');
    setOpenDialog(false);
  };

  const handleAddProjectSection = (newSection) => {
    console.log('Adding new section with name:', newSection.name);
    createSectionMutation.mutate({ name: newSection.name });
  };

  const handleUpdateProjectSection = (sectionId, updatedName) => {
    console.log('Updating section with ID:', sectionId, 'to new name:', updatedName);
    updateSectionMutation.mutate({ id: sectionId, name: updatedName });
  };

  const handleDeleteProjectSection = (sectionId) => {
    console.log('Deleting section with ID:', sectionId);
    deleteSectionMutation.mutate(sectionId);
  };

  const handleAddProjectDetails = () => {
    console.log('Adding project details with title:', newDetail.title, 'and description:', newDetail.description);
    if (!newDetail.title || !newDetail.description) {
      console.error('Both title and description are required');
      return;
    }
    createDetailsMutation.mutate(newDetail);
    setNewDetail({ title: '', description: '' });
  };

  const handleUpdateProjectDetails = (detailId, updatedDetails) => {
    console.log('Updating project detail with ID:', detailId, 'to new details:', updatedDetails);
    updateDetailsMutation.mutate({ id: detailId, ...updatedDetails });
  };

  const handleDeleteProjectDetails = (detailId) => {
    console.log('Deleting project detail with ID:', detailId);
    deleteDetailsMutation.mutate(detailId);
  };

  // التحقق من حالة البيانات
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || !data.result || data.result.length === 0) {
    return <div>No project sections available. Please verify the project ID.</div>;
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
        {data.result.map((section) => (
          <li key={section.id}>
            <h3>{section.name}</h3>
            <Button variant="outlined" onClick={() => handleUpdateProjectSection(section.id, 'Updated Section')}>
              Update Section
            </Button>
            <Button variant="outlined" onClick={() => handleDeleteProjectSection(section.id)}>
              Delete Section
            </Button>
            <Button variant="outlined" onClick={() => handleUpdateProjectDetails(section.id, { title: 'Updated Detail Title', description: 'Updated Detail Description' })}>
              Update Detail
            </Button>
            <Button variant="outlined" onClick={() => handleDeleteProjectDetails(section.id)}>
              Delete Detail
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ProjectDetails;
