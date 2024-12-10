import { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import axios from 'axios';
import ProjectList from '../../../Components/projectdeatils/ProjectList.jsx';
import AddProject from '../../../Components/projectdeatils/AddProjects.jsx';

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // استدعاء البيانات باستخدام axios
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`/projects/${projectId}`);
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Create New Project
      </Button>
      <ProjectList projects={projects} onDeleteProject={handleDeleteProject} />
      <AddProject open={openDialog} onClose={handleCloseDialog} onAddProject={handleAddProject} />
    </Container>
  );
};

export default ProjectDetails;
