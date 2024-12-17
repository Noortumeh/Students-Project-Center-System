import { useState } from 'react';
import { Container, Paper, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';
import ProjectNameField from '../../../Components/generalcomponent/ProjectNameField.jsx';
import { fetchSupervisors, fetchCustomers } from '../../../../util/http for admin/http.js';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { data: supervisors, error: supervisorsError } = useQuery({
    queryKey: ['supervisors'],
    queryFn: fetchSupervisors,
  });

  const { data: customers, error: customersError } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  if (supervisorsError) {
    toast.error('Failed to fetch supervisors');
  }

  if (customersError) {
    toast.error('Failed to fetch customers');
  }

  const handleAddProject = () => {
    toast.success('Project added successfully!');
    navigate('/projects/Projects');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
          Create New Project
        </Typography>
        <form>
          <ProjectNameField
            projectName={projectName}
            setProjectName={setProjectName}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Supervisor</InputLabel>
            <Select
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
            >
              {supervisors?.map((supervisor) => (
                <MenuItem key={supervisor.value} value={supervisor.value}>
                  {supervisor.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Customer</InputLabel>
            <Select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              {customers?.map((customer) => (
                <MenuItem key={customer.value} value={customer.value}>
                  {customer.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LoadingButton
            loading={loading}
            label="Create Project"
            onClick={handleAddProject}
            sx={{
              mt: 2,
              width: '100%',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          />
        </form>
      </Paper>
    </Container>
  );
};

export default CreateProject;