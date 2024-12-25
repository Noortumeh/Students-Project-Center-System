import { useState, useCallback, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Select, MenuItem, Box
} from '@mui/material';
import { Delete, Star, StarBorder, Edit } from '@mui/icons-material';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { fetchWorkgroups } from '../../../../util/http for admin/http.js';

const WorkgroupPage = () => { 
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [workgroups, setWorkgroups] = useState([]);
  const [favorite, setFavorite] = useState({});
  const entryOptions = [10, 20, 30, 50, 100];

  useEffect(() => {
    const loadWorkgroups = async () => {
      try {
        const data = await fetchWorkgroups();
        if (data) {
          setWorkgroups(data.result || data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch workgroups:', error);
      }
    };

    loadWorkgroups();
  }, []);

  const toggleFavorite = (id) => {
    setFavorite((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDetailsClick = useCallback((workgroupId) => {
    console.log(`Details requested for workgroup: ${workgroupId}`);
  }, []);

  const handleDelete = useCallback((workgroupId) => {
    setWorkgroups((prevWorkgroups) => prevWorkgroups.filter((workgroup) => workgroup.id !== workgroupId));
    console.log(`Deleted workgroup: ${workgroupId}`);
  }, []);

  return (
    <Dashboard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              Workgroup Management
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Select value={entriesToShow} onChange={(e) => setEntriesToShow(e.target.value)} sx={{ width: 100 }}>
                {entryOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Workgroup Name</TableCell>
                    <TableCell>Supervisor Name</TableCell>
                    <TableCell>Co-Supervisor Name</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workgroups.map((workgroup, index) => (
                    <TableRow key={index}>
                      <TableCell>{workgroup.name}</TableCell>
                      <TableCell>{workgroup.supervisorName}</TableCell>
                      <TableCell>{workgroup.coSupervisorName}</TableCell>
                      <TableCell>{workgroup.customerName}</TableCell>
                      <TableCell>{workgroup.company}</TableCell>
                      <TableCell>{workgroup.team.join(', ')}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => toggleFavorite(workgroup.id)}>
                          {favorite[workgroup.id] ? <Star /> : <StarBorder />}
                        </IconButton>
                        <IconButton onClick={() => handleDetailsClick(workgroup.id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(workgroup.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default WorkgroupPage;