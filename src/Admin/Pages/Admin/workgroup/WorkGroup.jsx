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
  Box
} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import Dashboard from '../../../shared/dashbord/Dashbord';

export default function WorkGroups() {
  const [entriesToShow, setEntriesToShow] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [workgroups, setWorkgroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkgroups = async () => {
      try {
        // تأكد من صحة عنوان URL للـ API
        const { data } = await axios.get('http://localhost:3000/api/v1/workgroups');
        setWorkgroups(data);
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while fetching workgroups.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkgroups();
  }, []);

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
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={`/workgroup/edit/${workgroup.id}`}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteClick(workgroup.id)}
                        >
                          Delete
                        </Button>
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
