import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
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
  const [openDialog, setOpenDialog] = useState(false);
  const [newDetail, setNewDetail] = useState({ title: '', description: '' });

  const { data, error, isLoading } = useQuery(['projectDetails', projectId], () => fetchProjectDetails(projectId), {
    onError: (error) => {
      console.error('Error fetching project details:', error);
    },
  });

  const createSectionMutation = useMutation((sectionData) => createProjectSection(projectId, sectionData), {
    onSuccess: () => {
      console.log('Section created successfully');
    },
    onError: (error) => {
      console.error('Error creating section:', error);
    },
  });

  const updateSectionMutation = useMutation((sectionData) => updateProjectSection(sectionData.id, sectionData), {
    onSuccess: () => {
      console.log('Section updated successfully');
    },
    onError: (error) => {
      console.error('Error updating section:', error);
    },
  });

  const deleteSectionMutation = useMutation((sectionId) => deleteProjectSection(sectionId), {
    onSuccess: () => {
      console.log('Section deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting section:', error);
    },
  });

  const createDetailsMutation = useMutation((detailsData) => createProjectDetails(projectId, detailsData), {
    onSuccess: () => {
      console.log('Project details created successfully');
    },
    onError: (error) => {
      console.error('Error creating project details:', error);
    },
  });

  const updateDetailsMutation = useMutation((detailsData) => updateProjectDetails(detailsData.id, detailsData), {
    onSuccess: () => {
      console.log('Project details updated successfully');
    },
    onError: (error) => {
      console.error('Error updating project details:', error);
    },
  });

  const deleteDetailsMutation = useMutation((detailId) => deleteProjectDetails(detailId), {
    onSuccess: () => {
      console.log('Project details deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting project details:', error);
    },
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
    createDetailsMutation.mutate(newDetail);
    setNewDetail({ title: '', description: '' }); 
  };

  const handleUpdateProjectDetails = (detailId, updatedDetails) => {
    updateDetailsMutation.mutate({ id: detailId, ...updatedDetails });
  };

  const handleDeleteProjectDetails = (detailId) => {
    deleteDetailsMutation.mutate(detailId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
      <input
        type="text"
        placeholder="Detail Title"
        value={newDetail.title}
        onChange={(e) => setNewDetail({ ...newDetail, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Detail Description"
        value={newDetail.description}
        onChange={(e) => setNewDetail({ ...newDetail, description: e.target.value })}
      />
      <Button variant="contained" color="secondary" onClick={handleAddProjectDetails}>
        Add Project Detail
      </Button>

      <h2>Existing Project Details</h2>
      <ul>
        {data.result.map(detail => (
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