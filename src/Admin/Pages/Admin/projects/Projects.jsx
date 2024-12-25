import React, { useState } from 'react';
import {
  Container, Box, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Select, MenuItem
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../../../Components/generalcomponent/LoadingSpinner.jsx';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { fetchProjects, setFavoriteProject } from '../../../../util/http for admin/http.js'; 

const ProjectPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const [favorite, setFavorite] = useState({});

  const toggleFavorite = async (id) => {
    try {
      await setFavoriteProject(id);
      setFavorite((prev) => ({
        ...prev,
        [id]: !prev[id]
      }));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit project with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete project with ID: ${id}`);
  };

  const columns = [
    "Project ID",
    "Project Name",
    "Supervisor Name",
    "Customer Name",
    "Team",
    "Workgroup Name",
    "Action",
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Typography color="error">Error fetching projects: {error.message}</Typography>;
  }

  const projects = data?.result || [];

  return (
    <Dashboard>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Projects</Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => navigate('/projects/CreateProject')}
          >
            Create Project
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Select defaultValue={20} sx={{ width: 100 }}>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.supervisorName}</TableCell>
                  <TableCell>{project.customerName || 'Unknown'}</TableCell>
                  <TableCell>{project.teamName}</TableCell>
                  <TableCell>{project.workgroupName}</TableCell>
                  <TableCell>
                  <Link to={`/projects/${project.id}`}>
                  <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                    View Details
                  </Button>
                  </Link>
                    <IconButton onClick={() => toggleFavorite(project.id)}>
                      {favorite[project.id] ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleEdit(project.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(project.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Dashboard>
  );
};

export default ProjectPage;