import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import TeamMemberCard from '../../../Components/generalcomponent/UserCard.jsx'; // تأكد من وجود هذا الكومبوننت
import ProgressBar from '../../../Components/workgroupdetails/ProgressBar.jsx'; // تأكد من وجود هذا الكومبوننت

const WorkgroupDetails = () => {
  const { id } = useParams(); // للحصول على ID مجموعة العمل من المسار
  const navigate = useNavigate();
  
  const [workgroup, setWorkgroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkgroupDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/workgroups/${id}`);
        setWorkgroup(response.data);
      } catch (error) {
        Swal.fire('Error!', 'Failed to fetch workgroup details.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkgroupDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate('/workgroup');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!workgroup) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6">No workgroup found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Button variant="contained" color="primary" onClick={handleBackClick} sx={{ mb: 3 }}>
        Back to Workgroups
      </Button>

      <Paper sx={{ padding: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Workgroup Details
        </Typography>
        <Typography variant="h6">Workgroup Name: {workgroup.workgroupName}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Supervisor:</strong> {workgroup.supervisorName}
        </Typography>
        <Typography variant="body1">
          <strong>Customer:</strong> {workgroup.customerName}
        </Typography>
        <Typography variant="body1">
          <strong>Project:</strong> {workgroup.projectName}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Description:</strong> {workgroup.description}
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5">Supervisor Information</Typography>
            <TeamMemberCard
              name={workgroup.supervisorName}
              title="Supervisor"
              avatar={workgroup.supervisorAvatar}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5">Customer Information</Typography>
            <TeamMemberCard
              name={workgroup.customerName}
              title="Customer"
              avatar={workgroup.customerAvatar}
            />
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Progress
        </Typography>
        <ProgressBar value={workgroup.progress} />
      </Paper>
    </Box>
  );
};

export default WorkgroupDetails;
