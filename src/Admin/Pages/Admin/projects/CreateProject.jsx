import { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
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

  // Handle errors
  if (supervisorsError) {
    toast.error('Failed to fetch supervisors');
    console.error('Supervisors Error:', supervisorsError);
  }

  if (usersError) {
    toast.error('Failed to fetch users');
    console.error('Users Error:', usersError);
  }

  // Format supervisors data
  const supervisors = supervisorsData?.map((supervisor) => ({
    value: supervisor.id,
    label: `${supervisor.firstName} ${supervisor.lastName}`,
  })) || [];

  // Format customers data with additional checks
  const customers = usersData?.map((user) => {
    if (!user.id || !user.firstName || !user.lastName) {
      console.error('Invalid user data:', user);
      return null;
    }
    return {
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    };
  }).filter(Boolean) || []; // Remove null values

  console.log('Fetched Users Data:', usersData); // طباعة بيانات المستخدمين التي تم جلبها من الـ API
  console.log('Processed Customers Data:', customers); // طباعة بيانات العملاء بعد المعالجة

  const handleAddProject = async () => {
    if (!projectName || !selectedSupervisor || !selectedCustomer) {
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
      };

      console.log('Project Data to be sent:', projectData); // طباعة بيانات المشروع قبل الإرسال

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

          console.log('Updated Projects Data:', updatedData); // طباعة البيانات المحدثة بعد إضافة المشروع الجديد
          return updatedData;
        });

        toast.success('Project added successfully!');
        setTimeout(() => {
          navigate('/admin/projects');
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
    <Container maxWidth="md" sx={{ mt: { xs: 5, sm: 15, md: 12, lg: 20 }, width: { xs: '90%', sm: '90%', md: '100%' }, ml:{ xs: 1, sm: 5, md: 14, lg: 25 } }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
          Create New Project
        </Typography>
        <form>
          <ProjectNameField projectName={projectName} setProjectName={setProjectName} />
          <Select
            options={supervisors}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={(selectedOption) => {
              setSelectedSupervisor(selectedOption);
              console.log('Selected Supervisor:', selectedOption); // طباعة المشرف المحدد
            }}
            placeholder="Select a Supervisor"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
          />
          <Select
            options={customers}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={(selectedOption) => {
              setSelectedCustomer(selectedOption);
              console.log('Selected Customer:', selectedOption); // طباعة العميل المحدد
            }}
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