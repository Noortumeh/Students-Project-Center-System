import { useState } from 'react';
import { Container, Paper, Typography, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';
import ProjectNameField from '../../../Components/generalcomponent/ProjectNameField.jsx';
import { fetchUsers, createProject, fetchSupervisors } from '../../../../util/http for admin/http.js';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch supervisors
  const { data: supervisorsData, error: supervisorsError } = useQuery({
    queryKey: ['supervisors'],
    queryFn: fetchSupervisors,
  });

  // Fetch users (customers)
  const { data: usersData, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (supervisorsError) {
    toast.error('Failed to fetch supervisors');
    console.error('Supervisors Error:', supervisorsError);
  }

  if (usersError) {
    toast.error('Failed to fetch users');
    console.error('Users Error:', usersError);
  }

  const supervisors = supervisorsData?.map((supervisor) => ({
    value: supervisor.id,
    label: `${supervisor.firstName} ${supervisor.lastName}`,
  })) || [];

  const customers = usersData?.map((user) => {
  
    return {
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    };
  }).filter(Boolean) || [];

  console.log('Fetched Users Data:', usersData);
  console.log('Processed Customers Data:', customers);

  const handleAddProject = async () => {
    if (!projectName || !selectedSupervisor || !selectedCustomer || !companyName) {
      toast.error('Please fill in all fields before submitting.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to add this project?');
    if (!isConfirmed) {
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        name: projectName,
        supervisorId: selectedSupervisor.value,
        customerId: selectedCustomer.value,
        companyName,
      };

      console.log('Project Data to be sent:', projectData);

      const newProject = await createProject(projectData);

      if (newProject.isSuccess) {
        queryClient.setQueryData(['projects'], (oldData) => {
          const updatedData = oldData
            ? {
                ...oldData,
                result: oldData.result
                  ? [...oldData.result, newProject.result]
                  : [newProject.result],
              }
            : { result: [newProject.result] };

          console.log('Updated Projects Data:', updatedData);
          return updatedData;
        });

        toast.success('Project added successfully!');
        setTimeout(() => {
          navigate('/projects');
        }, 1500);
      } else {
        toast.error('Failed to add project.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(error.message || 'Failed to add project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <ToastContainer />
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
          Create New Project
        </Typography>
        <form>
          <ProjectNameField projectName={projectName} setProjectName={setProjectName} />
          <Select
            options={supervisors}
            onChange={(selectedOption) => setSelectedSupervisor(selectedOption)}
            placeholder="Select a Supervisor"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
          />
          <Select
            options={customers}
            onChange={(selectedOption) => setSelectedCustomer(selectedOption)}
            placeholder="Select a Customer"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
          />
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            sx={{ mt: 3 }}
          />
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