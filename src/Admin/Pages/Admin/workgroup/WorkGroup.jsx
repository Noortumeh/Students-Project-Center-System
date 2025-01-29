import { useState, useEffect } from 'react';
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
import { fetchWorkgroups } from '../../../../util/http for admin/http.js';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { DataGrid } from '@mui/x-data-grid'; // استيراد DataGrid

const WorkgroupPage = () => {
  const [workgroups, setWorkgroups] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // عدد الصفوف في الصفحة
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadWorkgroups = async () => {
      try {
        const data = await fetchWorkgroups();
        if (!data || !data.result || !data.result.workgroups) {
          console.error('Invalid data structure:', data);
          throw new Error('Failed to fetch workgroups. Invalid data structure.');
        }
        setWorkgroups(data.result.workgroups);
        setTotalCount(data.result.total); // اجلب العدد الكلي للصفوف
      } catch (error) {
        console.error('Error fetching workgroups:', error);
      }
    };
    loadWorkgroups();
  }, []);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // إعادة تعيين الصفحة إلى الأولى عند تغيير حجم الصفحة
  };

  return (
    <Dashboard>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 6 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Workgroups
          </Typography>
        </Box>

        <Paper elevation={3}>
          <DataGrid
            rows={workgroups || []}
            columns={columns}
            onRowClick={(params) => console.log('Row clicked:', params.row.id)} 
            onRowSelectionModelChange={(ids) => {
              setSelectedUsers(ids);
            }} 
            selectionModel={selectedUsers} 
            pageSize={pageSize} 
            page={currentPage - 1} 
            rowCount={totalCount} 
            onPageChange={(newPage) => handlePageChange(newPage + 1)} 
            paginationMode="server" 
            onPageSizeChange={handlePageSizeChange} 
            rowsPerPageOptions={[5, 10, 20]} 
          />
        </Paper>

        {/* Dialog to display the team */}
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
    </Dashboard>
  );
};

export default WorkgroupPage;
