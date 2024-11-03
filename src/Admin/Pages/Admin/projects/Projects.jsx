import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import {
  Button, Table, Typography, TextField, IconButton, Box,
  FormControl, Select, MenuItem, Paper, TableContainer,
  TableHead, TableRow, TableCell, TableBody, CircularProgress
} from '@mui/material';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Edit } from '@mui/icons-material'; // Material-UI Icons
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Projects() {
  // State variables
  const [entriesToShow, setEntriesToShow] = useState(20);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorite, setFavorite] = useState({});
  const [projects, setProjects] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7206/api/projects?PageSize=6&PageNumber=1");
        console.log(response)
        if (response != null) {
          setProjects(response.data.result);
        } else {
          toast.error('Failed to fetch projects. Data is not in expected format.');
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error('Failed to fetch projects. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorite((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered and displayed projects
  // const filteredProjects = projects.filter((project) =>
  //   project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const displayedProjects = filtereadProjects.slice(0, entriesToShow);

  const displayedProjects = projects;

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
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.supervisorName}</TableCell>
                    <TableCell>{project.customerName}</TableCell>
                    <TableCell>{project.workgroupName}</TableCell>
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
