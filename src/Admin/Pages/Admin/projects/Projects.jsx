import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Chip,
  Paper,
  Pagination,
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchProjects } from '../../../../util/http for admin/http.js';
import LoadingSpinner from '../../../Components/generalcomponent/LoadingSpinner.jsx';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { setFavoriteProject } from '../../../../util/http for admin/http.js';
import { useNavigate } from 'react-router-dom'; 

const ProjectPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const [filters, setFilters] = useState({
    filterType: 'all',
    filterValue: '',
    projectStatus: 'all',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteProjects, setFavoriteProjects] = useState({});
  const projectsPerPage = 6;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const toggleFavorite = async (id, projectName, isFavorite) => {
    const confirmationMessage = isFavorite
      ? `Are you sure you want to remove "${projectName}" from favorites?`
      : `Are you sure you want to add "${projectName}" to favorites?`;

    if (window.confirm(confirmationMessage)) {
      try {
        const result = await setFavoriteProject(id);
        if (result.isSuccess) {
          toast.success(
            isFavorite
              ? `"${projectName}" has been removed from favorites.`
              : `"${projectName}" has been added to favorites.`
          );
          setFavoriteProjects((prev) => ({
            ...prev,
            [id]: !isFavorite,
          }));
        }
      } catch (error) {
        toast.error(error.message || 'An error occurred while updating the favorite status.');
      }
    }
  };

  const statusColors = {
    active: 'success',
    pending: 'warning',
    'in progress': 'info',
    complete: 'primary',
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Typography color="error">Error fetching projects: {error.message}</Typography>;

  const filteredProjects = data?.result.filter((project) => {
    const matchesFilterType =
      filters.filterType === 'all' ||
      (filters.filterType === 'projectName' &&
        project.name.toLowerCase().includes(filters.filterValue.toLowerCase())) ||
      (filters.filterType === 'supervisorName' &&
        project.supervisorName.toLowerCase().includes(filters.filterValue.toLowerCase()));

    const matchesStatus =
      filters.projectStatus === 'all' || project.status === filters.projectStatus;

    return matchesFilterType && matchesStatus;
  });

  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedProjects = filteredProjects?.slice(startIndex, endIndex);

  return (
    <Dashboard>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Projects
          </Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => navigate('/projects/CreateProject')}
          >
            Create Project
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Select
            name="filterType"
            value={filters.filterType}
            onChange={handleFilterChange}
            sx={{ width: 200 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="projectName">Project Name</MenuItem>
            <MenuItem value="supervisorName">Supervisor Name</MenuItem>
          </Select>
          <TextField
            label="Search"
            name="filterValue"
            value={filters.filterValue}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ width: 200 }}
            disabled={filters.filterType === 'all'}
          />
          <Select
            name="projectStatus"
            value={filters.projectStatus}
            onChange={handleFilterChange}
            sx={{ width: 200 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Supervisor Name</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Workgroup Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProjects?.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.supervisorName}</TableCell>
                  <TableCell>{project.customerName || 'N/A'}</TableCell>
                  <TableCell>{project.workgroupName || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={project.status}
                      color={statusColors[project.status] || 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => navigate(`/projects/${project.id}`)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => navigate(`/projects/EditProject/${project.id}`)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        toggleFavorite(
                          project.id,
                          project.name,
                          favoriteProjects[project.id] || project.favorite
                        )
                      }
                    >
                      {favoriteProjects[project.id] || project.favorite ? (
                        <StarIcon color="warning" />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil((filteredProjects?.length || 0) / projectsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </Dashboard>
  );
};

export default ProjectPage;
