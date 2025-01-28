import { useState, useEffect } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchWorkgroups } from '../../../../util/http for admin/http.js';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import PaginationComponent from '../../../../Users/components/PaginationComponent.jsx';

const WorkgroupPage = () => {
  const [workgroups, setWorkgroups] = useState([]);
  const [filters, setFilters] = useState({
    filterType: 'all',
    filterValue: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [pageSize, setPageSize] = useState(6);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadWorkgroups = async () => {
      try {
        const data = await fetchWorkgroups(pageSize, currentPage, filters.filterValue);
        if (!data || !data.result || !data.result.workgroups) {
          console.error('Invalid data structure:', data);
          throw new Error('Failed to fetch workgroups. Invalid data structure.');
        }
        setWorkgroups(data.result.workgroups);
        setTotalCount(data.result.total);
      } catch (error) {
        console.error('Error fetching workgroups:', error);
      }
    };
    loadWorkgroups();
  }, [currentPage, pageSize, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
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
              {filteredWorkgroups.map((workgroup) => (
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
          <PaginationComponent
            totalCount={totalCount}
            pageNumber={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
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