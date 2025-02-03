import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
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
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../Components/generalcomponent/LoadingSpinner.jsx';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { fetchProjects, setFavoriteProject } from '../../../../util/http for admin/http.js';
import { DataGrid } from '@mui/x-data-grid';

const ProjectPage = () => {
  const navigate = useNavigate();
  const [favoriteProjects, setFavoriteProjects] = useState({});

  // استخدام useQuery لجلب البيانات
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects, // إرسال الفلاتر إلى API
    keepPreviousData: true,
    staleTime: 10000,
  });

  const toggleFavorite = async (id, projectName, isFavorite) => {
    const confirmationMessage = isFavorite
      ? `Are you sure you want to remove "${projectName}" from favorites?`
      : `Are you sure you want to add "${projectName}" to favorites?`;

    if (window.confirm(confirmationMessage)) {
      try {
        const result = await setFavoriteProject(id);
        if (result.isSuccess) {
          Swal.fire({
            title: 'Updated!',
            text: isFavorite
              ? `"${projectName}" has been removed from favorites.`
              : `"${projectName}" has been added to favorites.`,
            icon: 'success',
            confirmButtonText: 'OK',
          });

          setFavoriteProjects((prev) => ({
            ...prev,
            [id]: !isFavorite,
          }));
          refetch();
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message || 'An error occurred while updating the favorite status.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const statusColors = {
    active: 'success',
    pending: 'warning',
    completed: 'primary',
    canceled: 'default',
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Typography color="error">Error Loading projects: {error.message}</Typography>;

  if (!data || !data.isSuccess) {
    return <Typography color="error">Invalid data format received from API.</Typography>;
  }

  // البيانات التي يعيدها الخادم تكون مجزأة بالفعل
  const projects = data.result.projects || [];

  const columns = [
    { field: 'name', headerName: 'Project Name', width: 200 },
    { field: 'supervisorName', headerName: 'Supervisor Name', width: 200 },
    { field: 'customerName', headerName: 'Customer Name', width: 200 },
    { field: 'workgroupName', headerName: 'Workgroup Name', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColors[params.value] || 'default'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => navigate(`${params.row.id}`)}>
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => navigate(`EditProject/${params.row.id}`)}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton
            onClick={() =>
              toggleFavorite(
                params.row.id,
                params.row.name,
                favoriteProjects[params.row.id] || params.row.favorite
              )
            }
          >
            {favoriteProjects[params.row.id] || params.row.favorite ? (
              <StarIcon color="warning" />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container sx={{ marginTop: '5rem' }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: '10px' }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Projects
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/projects/CreateProject')}
        >
          Create Project
        </Button>
      </Box>

      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6, 20, 50]}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#2c3e50',
              color: '#ffffff',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              padding: '10px',
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-row': {
              '&:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9',
              },
              '&:hover': {
                backgroundColor: '#e0f7fa',
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default ProjectPage;