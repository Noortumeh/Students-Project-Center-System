import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import {
  CircularProgress,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const fetchSupervisors = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/users/supervisors');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message);
    }
    return data.result || [];
  } catch (error) {
    console.error('Error fetching supervisors:', error);
    return [];
  }
};

export default function IndexSupervisor() {
  const { data: supervisors = [], isLoading, error } = useQuery({
    queryKey: ['supervisors'],
    queryFn: fetchSupervisors,
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

  const handleEdit = (supervisor) => {
    navigate(`/users/supervisor/edit/${supervisor.id}`);
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

  return (
    <Dashboard>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Supervisors List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Projects</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supervisors.map((supervisor) => (
                <TableRow key={supervisor.id}>
                  <TableCell>{supervisor.id}</TableCell>
                  <TableCell>
                    {`${supervisor.firstName} ${supervisor.middleName} ${supervisor.lastName}`.trim()}
                  </TableCell>
                  <TableCell>{supervisor.email}</TableCell>
                  <TableCell>
                    {supervisor.projectsName.length > 3 ? (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(supervisor)}
                      >
                        project
                      </Button>
                    ) : (
                      <Typography variant="body2">
                        {supervisor.projectsName.join(', ')}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(supervisor)} 
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Projects of {selectedSupervisor?.firstName} {selectedSupervisor?.lastName}</DialogTitle>
        <DialogContent>
          <Box>
            {selectedSupervisor?.projectsName.map((project, index) => (
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
