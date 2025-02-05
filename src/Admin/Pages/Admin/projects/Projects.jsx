import { useState } from 'react';
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
import {  ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../Components/generalcomponent/LoadingSpinner.jsx';
import { fetchProjects, setFavoriteProject } from '../../../../util/http for admin/http.js';
import { DataGrid } from '@mui/x-data-grid';

// إعادة استخدام ألوان الحالات
const statusColors = {
  active: 'success',
  pending: 'warning',
  completed: 'primary',
  canceled: 'error',
};

const ProjectPage = () => {
  const navigate = useNavigate();
  const [favoriteProjects, setFavoriteProjects] = useState({});

  // جلب البيانات
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    keepPreviousData: true,
    staleTime: 10000,
  });

  const toggleFavorite = async (id, projectName, isFavorite) => {
    const confirmationMessage = isFavorite
      ? `"${projectName}" will be removed from favorites. Do you want to continue?`
      : `"${projectName}" will be added to favorites. Do you want to continue?`;
  
    Swal.fire({
      title: "Are you sure?",
      text: confirmationMessage,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await setFavoriteProject(id);
          if (response.isSuccess) {
            Swal.fire({
              title: "Updated!",
              text: isFavorite
                ? `"${projectName}" has been removed from favorites.`
                : `"${projectName}" has been added to favorites.`,
              icon: "success",
              confirmButtonText: "OK",
            });
  
            setFavoriteProjects((prev) => ({
              ...prev,
              [id]: !isFavorite,
            }));
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message || "An error occurred while updating the favorite status.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };
  

  
  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <LoadingSpinner />
      </Box>
    );
  
  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" textAlign="center">
          Error Loading projects: {error.message}
        </Typography>
      </Box>
    );
  
  if (!data || !data.isSuccess) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Invalid data format received from API.</Typography>
      </Box>
    );
  }
  

  const projects = data.result.projects || [];

  // تعريف الأعمدة
  const columns = [
    { field: 'name', headerName: 'Project Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'supervisorName', headerName: 'Supervisor Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'customerName', headerName: 'Customer Name', width: 250, headerAlign: 'center', align: 'center' },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColors[params.value] || 'default'}
          sx={{ 
            minWidth: '90px', 
            minHeight: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            textTransform: 'capitalize'
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => navigate(`${params.row.id}`)}
            sx={{ padding: '4px', margin: '4px' }}
          >
            <VisibilityIcon sx={{ fontSize: '1.5rem' }} color="primary" />
          </IconButton>
          <IconButton 
            onClick={() => navigate(`EditProject/${params.row.id}`, { state: { companyName: params.row.companyName } })}
            sx={{ padding: '4px', margin: '4px' }}
          >
            <EditIcon sx={{ fontSize: '1.5rem' }} color="secondary" />
          </IconButton>
          <IconButton
            onClick={() =>
              toggleFavorite(
                params.row.id,
                params.row.name,
                favoriteProjects[params.row.id] || params.row.favorite
              )
            }
            sx={{ padding: '4px', margin: '4px' }}
          >
            {favoriteProjects[params.row.id] || params.row.favorite ? (
              <StarIcon sx={{ fontSize: '1.5rem' }} color="warning" />
            ) : (
              <StarBorderIcon sx={{ fontSize: '1.5rem' }} />
            )}
          </IconButton>
        </Box>
      ),
    }
  ];

  return (
    <Container sx={{ marginTop: "5rem", px: { xs: 2, sm: 3, md: 4 } }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          mt: "10px",
          gap: 2,
        }}
      >
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          color="primary" 
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          Projects
        </Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/projects/CreateProject")}
          sx={{ width: { xs: "100%", sm: "auto" }, ml: 4 }}
        >
          Create Project
        </Button>
      </Box>

      {/* DataGrid Section */}
      <Box sx={{ height: { xs: 450, sm: 500, md: 600 } }}>
        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6, 20, 50]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#2c3e50",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              textAlign: 'center'
            },
            "& .MuiDataGrid-cell": {
              padding: "10px",
              fontSize: { xs: "0.8rem", sm: "0.95rem" },
              borderBottom: "1px solid #e0e0e0",
              textAlign: 'center'
            },
            "& .MuiDataGrid-row": {
              "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
              "&:hover": { backgroundColor: "#e0f7fa" },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default ProjectPage;
