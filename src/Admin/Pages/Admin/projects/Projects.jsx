import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../../shared/dashbord/Dashbord';
import { Button, Table, Typography, TextField, IconButton, Box, FormControl, Select, MenuItem } from '@mui/material';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function Projects() {
  const [entriesToShow, setEntriesToShow] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
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
      supervisor: 'Dr. Samantha Gray',
      customer: 'City Agriculture Board',
      team: 'Team Gamma',
      workGroup: 'Group C',
    },
    {
      id: 4,
      projectName: 'Solar-Powered Greenhouse',
      supervisor: 'Prof. Olivia Williams',
      customer: 'EcoGreen Farms',
      team: 'Team Delta',
      workGroup: 'Group D',
    },
    {
      id: 5,
      projectName: 'Precision Agriculture',
      supervisor: 'Dr. Isabella Thomas',
      customer: 'FarmTech Solutions',
      team: 'Team Epsilon',
      workGroup: 'Group E',
    },
    {
      id: 6,
      projectName: 'Vertical Farming Project',
      supervisor: 'Dr. William Moore',
      customer: 'Urban Farms Inc.',
      team: 'Team Zeta',
      workGroup: 'Group F',
    },
    {
      id: 7,
      projectName: 'Drought-Resistant Crops',
      supervisor: 'Dr. Amelia Edwards',
      customer: 'AgriBioTech',
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

  const [favorite, setFavorite] = useState({});

  const toggleFavorite = (id) => {
    setFavorite((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedProjects = filteredProjects.slice(0, entriesToShow);

  return (
    <Dashboard>
      <Box sx={{ mt: 5, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Projects
        </Typography>

        {/* زر إنشاء مشروع جديد */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Button
            component={Link}
            to="/projects/CreateProject"
            variant="contained"
            color="primary"
            sx={{ py: 1.5, px: 4, fontSize: '1rem', fontWeight: 'bold' }}
          >
            Create Project
          </Button>
        </Box>

        {/* التحكم في عدد الإدخالات والبحث */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <FormControl sx={{ width: 100 }}>
            <Select
              value={entriesToShow}
              onChange={(e) => setEntriesToShow(e.target.value)}
              displayEmpty
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
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 250 }}
          />
        </Box>

        {/* جدول المشاريع */}
        <Box sx={{ mt: 4 }}>
          <Table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Supervisor</th>
                <th>Customer</th>
                <th>Team</th>
                <th>Workgroup</th>
                <th>Details</th>
                <th>Actions</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.projectName}</td>
                  <td>{project.supervisor}</td>
                  <td>{project.customer}</td>
                  <td>{project.team}</td>
                  <td>{project.workGroup}</td>
                  <td>
                    <Button
                      component={Link}
                      to={`/projects/ProjectDetails/${project.id}`} // تمرير معرّف المشروع بشكل صحيح
                      variant="outlined"
                      color="info"
                      sx={{ px: 2 }}
                    >
                      Details
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <IconButton
                      onClick={() => toggleFavorite(project.id)}
                    >
                      {favorite[project.id] ? <AiFillStar color="blue" /> : <AiOutlineStar />}
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Dashboard>
  );
}
