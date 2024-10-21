import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import {
  Button, Table, Typography, TextField, IconButton, Box,
  FormControl, Select, MenuItem, Paper, TableContainer,
  TableHead, TableRow, TableCell, TableBody, CircularProgress
} from '@mui/material';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Edit, Delete } from '@mui/icons-material'; // Material-UI Icons
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function Projects() {
  // State variables
  const [entriesToShow, setEntriesToShow] = useState(20);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorite, setFavorite] = useState({});
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: 'Innovative Agriculture Project',
      supervisor: 'Dr. Emma Brown',
      customer: 'Mr. David Green',
      team: 'Team Alpha',
      workGroup: 'Group A',
    },
    {
      id: 2,
      projectName: 'Smart Irrigation System',
      supervisor: 'Dr. Alice Morgan',
      customer: 'GreenTech',
      team: 'Team Beta',
      workGroup: 'Group B',
    },
    {
      id: 3,
      projectName: 'Urban Farming Initiative',
      supervisor: 'Dr. William Johnson',
      customer: 'UrbanFarms Ltd',
      team: 'Team Gamma',
      workGroup: 'Group C',
    },
    {
      id: 4,
      projectName: 'Vertical Farming Solutions',
      supervisor: 'Dr. Sarah Thompson',
      customer: 'VerticalAgri',
      team: 'Team Delta',
      workGroup: 'Group D',
    },
    {
      id: 5,
      projectName: 'Precision Agriculture Tools',
      supervisor: 'Dr. Michael Smith',
      customer: 'AgriTech',
      team: 'Team Epsilon',
      workGroup: 'Group E',
    },
    {
      id: 6,
      projectName: 'Sustainable Soil Management',
      supervisor: 'Dr. Linda Davis',
      customer: 'EcoSoil Ltd',
      team: 'Team Zeta',
      workGroup: 'Group F',
    },
    {
      id: 7,
      projectName: 'Hydroponic Farming System',
      supervisor: 'Dr. John Lee',
      customer: 'HydroAgro',
      team: 'Team Eta',
      workGroup: 'Group G',
    },
    {
      id: 8,
      projectName: 'Organic Farming Initiative',
      supervisor: 'Dr. Grace Nelson',
      customer: 'GreenOrganics',
      team: 'Team Theta',
      workGroup: 'Group H',
    },
    {
      id: 9,
      projectName: 'Aquaponics Farming',
      supervisor: 'Dr. Lucas Wilson',
      customer: 'AquaFarm Solutions',
      team: 'Team Iota',
      workGroup: 'Group I',
    },
    {
      id: 10,
      projectName: 'Digital Farming Platform',
      supervisor: 'Mr. Henry King',
      customer: 'AgriConnect',
      team: 'Team Kappa',
      workGroup: 'Group J',
    }
  ]);

  // Make the fetch call
fetch("https://localhost:7206/api/Projects/GetAll?PageSize=6&PageNumber=1")
.then(response => {
  // Check if the response is OK (status 200-299)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // Parse the JSON response
  return response.json();
})
.then(data => {
  // Log the fetched data
  console.log("Fetched Data:", data);

  // You can access specific parts of the response like this:
  const { statusCode, isSuccess, message, result } = data;
  
  // Check the status of the response
  if (isSuccess) {
    console.log("Data fetched successfully:", result);
  } else {
    console.log("Error in fetching data:", message);
  }
})
.catch(error => {
  // Log any error that occurs during the fetch process
  console.error("Error:", error);
});

  // Fetch data from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch("https://localhost:7206/api/Projects/GetAll?PageSize=6&PageNumber=1");
  //       const data = await response.json();

  //       if (Array.isArray(data)) {
  //         setProjects(data);
  //       } else {
  //         toast.error('Failed to fetch projects. Data is not in expected format.');
  //       }

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //       toast.error('Failed to fetch projects. Please try again.');
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorite((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Delete project
  const deleteProject = async (id) => {
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
        setProjects(projects.filter((project) => project.id !== id));
        toast.success('Project deleted successfully');
        Swal.fire('Deleted!', 'The project has been deleted.', 'success');
      } catch (error) {
        toast.error('Failed to delete the project. Please try again.');
      }
    }
  };

  // Filtered and displayed projects
  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedProjects = filteredProjects.slice(0, entriesToShow);

  return (
    <Dashboard>
      <Box sx={{ mt: 2, p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#3f51b5' }}>
          Projects
        </Typography>

        {/* Create Project Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            component={Link}
            to="/projects/CreateProject"
            variant="contained"
            color="primary"
            sx={{ py: 1, px: 3, fontSize: '1rem', fontWeight: 'bold', borderRadius: 2 }}
          >
            Create Project
          </Button>
        </Box>

        {/* Entries Control and Search */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <FormControl sx={{ width: 120 }}>
            <Select
              value={entriesToShow}
              onChange={(e) => setEntriesToShow(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Typography variant="caption" sx={{ ml: 1 }}>
              entries
            </Typography>
          </FormControl>

          <TextField
            label="Search Projects"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 250 }}
          />
        </Box>

        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress aria-label="Loading projects..." />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project ID</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Supervisor</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Team</TableCell>
                  <TableCell>Workgroup</TableCell>
                  <TableCell align="center">Details</TableCell>
                  <TableCell align="center">Actions</TableCell>
                  <TableCell align="center">Favorite</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.projectName}</TableCell>
                    <TableCell>{project.supervisor}</TableCell>
                    <TableCell>{project.customer}</TableCell>
                    <TableCell>{project.team}</TableCell>
                    <TableCell>{project.workGroup}</TableCell>
                    <TableCell align="center">
                      <Button
                        component={Link}
                        to={`/projects/ProjectDetails/${project.id}`}
                        variant="outlined"
                        color="info"
                        sx={{ px: 2, borderRadius: 2 }}
                      >
                        Details
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          component={Link}
                          to={`/projects/EditProject/${project.id}`}
                          sx={{ backgroundColor: '#2196f3', color: '#fff' }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteProject(project.id)}
                          sx={{ backgroundColor: '#f44336', color: '#fff' }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => toggleFavorite(project.id)}>
                        {favorite[project.id] ? <AiFillStar color="#ff9800" /> : <AiOutlineStar />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Dashboard>
  );
}
