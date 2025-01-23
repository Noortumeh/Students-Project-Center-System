import { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';
import ProjectNameField from '../../../Components/generalcomponent/ProjectNameField.jsx';
import { fetchUsers, createProject } from '../../../../util/http for admin/http.js';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: users, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (usersError) {
    toast.error('Failed to fetch users');
  }

  const supervisors = users?.filter((user) => user.isSupervisor) || [];
  const customers = users?.filter((user) => !user.isSupervisor) || [];

  const handleAddProject = async () => {
    if (!projectName || !selectedSupervisor || !selectedCustomer) {
      toast.error('Please fill in all fields before submitting.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to add this project?');
    if (!isConfirmed) {
      return; // الخروج إذا لم يتم التأكيد
    }

    setLoading(true);
    try {
      const projectData = {
        name: projectName,
        supervisorId: selectedSupervisor.value,
        customerId: selectedCustomer.value,
      };

      console.log('Sending Project Data:', projectData);

      const newProject = await createProject(projectData);

      console.log('New Project Response:', newProject);

      if (newProject.isSuccess) {
        queryClient.setQueryData(['projects'], (oldData) => {
          console.log('Old Data:', oldData);
          const updatedData = oldData
            ? {
                ...oldData,
                result: oldData.result
                  ? [...oldData.result, newProject.result]
                  : [newProject.result],
              }
            : { result: [newProject.result] };

          console.log('Updated Data:', updatedData);
          return updatedData;
        });

        toast.success('Project added successfully!');
        setTimeout(() => {
          navigate('/projects'); // التوجيه بعد النجاح
        }, 1500); // تأخير بسيط للتأكد من عرض الرسالة
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
