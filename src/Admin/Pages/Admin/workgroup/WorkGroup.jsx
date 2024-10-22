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
  const [workgroups, setWorkgroups] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading state as true
  const navigate = useNavigate();

  // البيانات الافتراضية
  const defaultWorkgroups = [
    {
      id: 1,
      workgroupName: 'Development Team',
      supervisorName: 'Alice Smith',
      customerName: 'XYZ Corp',
      team: 'Frontend',
      projectName: 'Website Redesign'
    },
    {
      id: 2,
      workgroupName: 'Marketing Team',
      supervisorName: 'Bob Johnson',
      customerName: 'ABC Inc',
      team: 'SEO',
      projectName: 'Social Media Campaign'
    },
    {
      id: 3,
      workgroupName: 'Design Team',
      supervisorName: 'Charlie Brown',
      customerName: '123 LLC',
      team: 'Graphic Design',
      projectName: 'Branding Project'
    },
    // يمكنك إضافة المزيد من البيانات الافتراضية هنا
  ];

  // Fetch workgroups from API on component mount
  useEffect(() => {
    const fetchWorkgroups = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:3000/api/v1/workgroups');
        setWorkgroups(response.data.length ? response.data : defaultWorkgroups); // Use API data or default data
      } catch (error) {
        Swal.fire('Error!', 'Failed to fetch workgroups.', 'error');
        setWorkgroups(defaultWorkgroups); // Use default data on error
      } finally {
        setLoading(false); // End loading
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
      setLoading(true); // Start loading when deleting
      try {
        await axios.delete(`http://localhost:3000/api/v1/workgroups/${id}`);
        setWorkgroups(workgroups.filter(workgroup => workgroup.id !== id));
        Swal.fire('Deleted!', 'The workgroup has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while deleting the workgroup.', 'error');
      } finally {
        setLoading(false); // End loading after deleting
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
