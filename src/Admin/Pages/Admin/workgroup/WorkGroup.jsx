import React, { useState, useEffect } from 'react';
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
  Paper,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchWorkgroups } from '../../../../util/http for admin/http.js';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';

const WorkgroupPage = () => {
  const [workgroups, setWorkgroups] = useState([]);
  const [filters, setFilters] = useState({
    filterType: 'all',
    filterValue: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const workgroupsPerPage = 6;

  useEffect(() => {
    const loadWorkgroups = async () => {
      try {
        const data = await fetchWorkgroups();
        setWorkgroups(data?.result || []);
      } catch (error) {
        console.error('Error fetching workgroups:', error);
      }
    };
    loadWorkgroups();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team); 
  };

  const handleCloseDialog = () => {
    setSelectedTeam(null); 
  };

  const filteredWorkgroups = workgroups.filter((workgroup) => {
    const matchesFilterType =
      filters.filterType === 'all' ||
      (filters.filterType === 'workgroupName' &&
        workgroup.name.toLowerCase().includes(filters.filterValue.toLowerCase())) ||
      (filters.filterType === 'supervisorName' &&
        workgroup.supervisorName.toLowerCase().includes(filters.filterValue.toLowerCase()));

    return matchesFilterType;
  });

  const startIndex = (currentPage - 1) * workgroupsPerPage;
  const endIndex = startIndex + workgroupsPerPage;
  const paginatedWorkgroups = filteredWorkgroups.slice(startIndex, endIndex);

  return (
    <Dashboard>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Workgroups
          </Typography>
          
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Select
            name="filterType"
            value={filters.filterType}
            onChange={handleFilterChange}
            sx={{ width: 200 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="workgroupName">Workgroup Name</MenuItem>
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
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Workgroup Name</TableCell>
                <TableCell>Supervisor Name</TableCell>
                <TableCell>Co-Supervisor Name</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Team</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWorkgroups.map((workgroup) => (
                <TableRow key={workgroup.id}>
                  <TableCell>{workgroup.name}</TableCell>
                  <TableCell>{workgroup.supervisorName}</TableCell>
                  <TableCell>{workgroup.coSupervisorName || ''}</TableCell>
                  <TableCell>{workgroup.customerName || ''}</TableCell>
                  <TableCell>{workgroup.company || ''}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleTeamClick(workgroup.team)}>
                      View Team
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredWorkgroups.length / workgroupsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>

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
