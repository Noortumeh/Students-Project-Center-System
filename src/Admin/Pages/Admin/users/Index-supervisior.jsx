import React, { useState } from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { fetchSupervisors } from '../../../../util/http for admin/http.js';

export default function IndexSupervisor() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const { data: supervisors = [], isLoading, error } = useQuery({
    queryKey: ['supervisors', page, pageSize],
    queryFn: () => fetchSupervisors(pageSize, page + 1),
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const navigate = useNavigate();

  const handleOpenDialog = (supervisor) => {
    setSelectedSupervisor(supervisor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedSupervisor(null);
    setOpenDialog(false);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error loading supervisors: {error.message}</Typography>
      </Box>
    );
  }

  const columns = [
    { field: 'fullName', headerName: 'Name', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'projectsName', headerName: 'Projects', width: 300, renderCell: (params) => {
        const projects = params.value || [];
        return projects.length > 3 ? (
          <Button size="small" color="primary" onClick={() => handleOpenDialog(params.row)}>
            View Projects
          </Button>
        ) : (
          <Typography variant="body2">{projects.join(', ')}</Typography>
        );
      }
    },
  ];
  
  const supervisorsWithFullName = supervisors.map((supervisor) => ({
    ...supervisor,
    id: supervisor.id,
    fullName: `${supervisor.firstName} ${supervisor.middleName} ${supervisor.lastName}`.trim(),
  }));

  return (
    <Dashboard>
      <Box p={3} sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Supervisors List
        </Typography>

        <Box sx={{ height: 600 }}>
          <DataGrid
            rows={supervisorsWithFullName || []}
            columns={columns}
            checkboxSelection={false}
            pageSize={pageSize}
            rowsPerPageOptions={[6, 20, 50]}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
          />
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Projects of {selectedSupervisor?.firstName} {selectedSupervisor?.lastName}</DialogTitle>
        <DialogContent>
          <Box>
            {selectedSupervisor?.projectsName?.map((project, index) => (
              <Box key={index}>
                <Typography variant="body1" sx={{ paddingBottom: '8px' }}>
                  {project}
                </Typography>
                {index < selectedSupervisor.projectsName.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Dashboard>
  );
}
