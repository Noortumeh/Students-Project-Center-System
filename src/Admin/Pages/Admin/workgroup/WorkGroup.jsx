import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Grid,
  Paper,
  Box,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import axios from 'axios';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';

export default function WorkGroups() {
  const [entriesToShow, setEntriesToShow] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [workgroups, setWorkgroups] = useState([
    {
      id: 1,
      workgroupName: 'Group Alpha',
      supervisorName: 'Dr. John Doe',
      customerName: 'Customer A',
      team: 'Team Alpha',
      projectName: 'Project Alpha',
    },
    {
      id: 2,
      workgroupName: 'Group Beta',
      supervisorName: 'Dr. Jane Smith',
      customerName: 'Customer B',
      team: 'Team Beta',
      projectName: 'Project Beta',
    },
    {
      id: 3,
      workgroupName: 'Group Gamma',
      supervisorName: 'Dr. Emily Davis',
      customerName: 'Customer C',
      team: 'Team Gamma',
      projectName: 'Project Gamma',
    },
    {
      id: 4,
      workgroupName: 'Group Delta',
      supervisorName: 'Dr. Michael Johnson',
      customerName: 'Customer D',
      team: 'Team Delta',
      projectName: 'Project Delta',
    },
    {
      id: 5,
      workgroupName: 'Group Epsilon',
      supervisorName: 'Dr. Sarah Brown',
      customerName: 'Customer E',
      team: 'Team Epsilon',
      projectName: 'Project Epsilon',
    },
    {
      id: 6,
      workgroupName: 'Group Zeta',
      supervisorName: 'Dr. William White',
      customerName: 'Customer F',
      team: 'Team Zeta',
      projectName: 'Project Zeta',
    },
    {
      id: 7,
      workgroupName: 'Group Eta',
      supervisorName: 'Dr. Olivia Harris',
      customerName: 'Customer G',
      team: 'Team Eta',
      projectName: 'Project Eta',
    },
    {
      id: 8,
      workgroupName: 'Group Theta',
      supervisorName: 'Dr. Alexander Martinez',
      customerName: 'Customer H',
      team: 'Team Theta',
      projectName: 'Project Theta',
    },
    {
      id: 9,
      workgroupName: 'Group Iota',
      supervisorName: 'Dr. Sophia Clark',
      customerName: 'Customer I',
      team: 'Team Iota',
      projectName: 'Project Iota',
    },
    {
      id: 10,
      workgroupName: 'Group Kappa',
      supervisorName: 'Dr. Benjamin Lee',
      customerName: 'Customer J',
      team: 'Team Kappa',
      projectName: 'Project Kappa',
    },
  ]);
  const [loading, setLoading] = useState(false); // Set to false since we have static data for now
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/workgroup/workgroupdetails/${id}`);
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/workgroups/${id}`);
        setWorkgroups(workgroups.filter(workgroup => workgroup.id !== id));
        Swal.fire('Deleted!', 'The workgroup has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while deleting the workgroup.', 'error');
      }
    }
  };

  const filteredWorkgroups = workgroups.filter((workgroup) =>
    workgroup.workgroupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedWorkgroups = filteredWorkgroups.slice(0, entriesToShow);

  return (
    <Dashboard>
      <Box sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" alignItems="center" mb={3}>
            <Grid item>
              <h1>Workgroups</h1>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                component={Link}
                to="/workgroup/CreateWorkGroup"
                sx={{ fontWeight: 'bold', borderRadius: '8px' }}
              >
                Create Workgroup
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between" alignItems="center" mb={3}>
            <Grid item>
              <TextField
                label="Show Entries"
                select
                SelectProps={{ native: true }}
                value={entriesToShow}
                onChange={(e) => setEntriesToShow(e.target.value)}
                sx={{ width: 120 }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 250 }}
              />
            </Grid>
          </Grid>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : displayedWorkgroups.length === 0 ? (
            <Box sx={{ textAlign: 'center', mt: 5 }}>No workgroups found.</Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Workgroup ID</TableCell>
                    <TableCell>Workgroup Name</TableCell>
                    <TableCell>Supervisor Name</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedWorkgroups.map((workgroup, index) => (
                    <TableRow key={index}>
                      <TableCell>{workgroup.id}</TableCell>
                      <TableCell>{workgroup.workgroupName}</TableCell>
                      <TableCell>{workgroup.supervisorName}</TableCell>
                      <TableCell>{workgroup.customerName}</TableCell>
                      <TableCell>{workgroup.team}</TableCell>
                      <TableCell>{workgroup.projectName}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleDetailsClick(workgroup.id)}
                        >
                          Details
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <IconButton
                            component={Link}
                            to={`/workgroup/edit/${workgroup.id}`}
                            sx={{ backgroundColor: '#2196f3', color: '#fff' }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(workgroup.id)}
                            sx={{ backgroundColor: '#f44336', color: '#fff' }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </Dashboard>
  );
}
