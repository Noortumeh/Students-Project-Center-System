import  { useState } from 'react';
import { CircularProgress, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
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
    { field: 'fullName', headerName: 'Name', width: 250, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Email', width: 250, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    {
      field: 'projectsName',
      headerName: 'Projects',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const projects = params.value || [];
        return projects.length >1 ? (
          <Button size="small" color="primary" onClick={() => handleOpenDialog(params.row)}>
            View Projects
          </Button>
        ) : (
          <Typography variant="body2" sx={{ color: '#000000' }}>{projects.join(', ')}</Typography>
        );
      }
    },
    { field: 'countActive', headerName: 'countActive', width: 250, headerClassName: 'header', headerAlign: 'center', align: 'center' }, 

    { field: 'countCompleted', headerName: 'countCompleted', width: 250, headerClassName: 'header', headerAlign: 'center', align: 'center' }, 
  ];
  
  const supervisorsWithFullName = supervisors.map((supervisor) => ({
    ...supervisor,
    id: supervisor.id,
    fullName: `${supervisor.firstName} ${supervisor.middleName} ${supervisor.lastName}`.trim(),
  }));

  return (
    <Box p={3} sx={{ mt: 6,ml:10 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold', textAlign: 'center',mt:3 }}>
        Supervisors
      </Typography>

      <Box sx={{ height: 600, width: { xs: '11rem', sm: '25rem', md: '45rem', lg: '72rem' } }}>
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


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Projects of {selectedSupervisor?.firstName} {selectedSupervisor?.lastName}</DialogTitle>
        <DialogContent>
          <Box>
            {selectedSupervisor?.projectsName?.map((project, index) => (
              <Box key={index}>
                <Typography variant="body1" sx={{ paddingBottom: '8px', color: '#000000' }}>
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
    </Box>
  );
}