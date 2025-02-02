import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';

const fetchWorkgroups = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }
    const response = await fetch('http://spcs.somee.com/api/workgroups', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching new data:', error);
    throw error;
  }
};

const WorkgroupPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['workgroups'],
    queryFn: fetchWorkgroups,
    staleTime: 60000, // تحديث البيانات كل دقيقة
  });

  const workgroups = data?.result?.workgroups || [];

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const handleCloseDialog = () => {
    setSelectedTeam(null);
  };

  const columns = [
    { field: 'name', headerName: 'Workgroup Name', width: 180 },
    { field: 'supervisorName', headerName: 'Supervisor Name', width: 180 },
    { field: 'coSupervisorName', headerName: 'Co-Supervisor Name', width: 180 },
    { field: 'customerName', headerName: 'Customer Name', width: 180 },
    { field: 'company', headerName: 'Company', width: 180 },
    {
      field: 'team',
      headerName: 'Team',
      width: 120,
      renderCell: (params) => (
        <Button onClick={() => handleTeamClick(params.value)}>
          View Team
        </Button>
      ),
    },
  ];

  return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 10 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Workgroups
          </Typography>
        </Box>

        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isError ? (
          <Typography>Error Loading workgroups</Typography>
        ) : (
          <Paper elevation={3}>
            <DataGrid
              rows={workgroups}
              columns={columns}
              onRowSelectionModelChange={(ids) => setSelectedUsers(ids)}
              selectionModel={selectedUsers}
            />
          </Paper>
        )}

        <Dialog open={selectedTeam !== null} onClose={handleCloseDialog}>
          <DialogTitle>Team Members</DialogTitle>
          <DialogContent>
            {selectedTeam && selectedTeam.length > 0 ? (
              <ul>
                {selectedTeam.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            ) : (
              <Typography>No team members available</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
  );
};

export default WorkgroupPage;
