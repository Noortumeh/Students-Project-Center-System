import { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';
import ProjectNameField from '../../../Components/generalcomponent/ProjectNameField.jsx';
import { fetchSupervisors, fetchCustomers, createProject } from '../../../../util/http for admin/http.js';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
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

  const handleAddProject = async () => {
    if (!projectName || !selectedSupervisor || !selectedCustomer) {
      toast.error('Please fill in all fields before submitting.');
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        name: projectName,
        supervisorId: selectedSupervisor.value,
        customerId: selectedCustomer.value,
      };
      await createProject(projectData);
      toast.success('Project added successfully!');
      navigate('/projects/Projects');
    } catch (error) {
      toast.error('Failed to add project.');
    } finally {
      setLoading(false);
    }
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
          <Select
            options={supervisors}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={setSelectedSupervisor}
            placeholder="Select a Supervisor"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
          />
          <Select
            options={customers}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={setSelectedCustomer}
            placeholder="Select a Customer"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
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