import { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Box, Container, Paper, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Select from 'react-select';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';
import ProjectNameField from '../../../Components/generalcomponent/ProjectNameField.jsx';
import { updateProject, fetchUsers, fetchProjectDetails } from '../../../../util/http for admin/http.js';

export default function EditProject() {
  const { projectid } = useParams();
  const navigate = useNavigate();

  // Fetch users (supervisors and customers)
  const { data: users, error: usersError, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Fetch project details for editing
  const { data: project, isLoading: isFetchingProject, error: projectError, refetch } = useQuery({
    queryKey: ['project', projectid],
    queryFn: () => fetchProjectDetails(projectid),
    enabled: !!projectid,
  });

  // Mutation to update project
  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      Swal.fire({
        title: 'Updated!',
        text: 'Project data has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        refetch().then(() => navigate(`/projects`));
      });
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred while updating the project.');
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      projectName: '',
      supervisor: {},
      customer: {},
      status: '',
      changeOldSupervisorNotes: '',
      changeOldCustomerNotes: '',
      changeStatusNotes: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!projectid) {
        toast.error('Cannot update project: ID is undefined!');
        return;
      }

      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to save the changes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save changes!',
      }).then((result) => {
        if (result.isConfirmed) {
          mutation.mutate({
            projectid,
            updatedProject: {
              name: values.projectName,
              supervisorId: values.supervisor?.value || null,
              customerId: values.customer?.value || null,
              status: values.status.value,
              changeOldSupervisorNotes: values.changeOldSupervisorNotes,
              changeOldCustomerNotes: values.changeOldCustomerNotes,
              changeStatusNotes: values.changeStatusNotes,
            },
          });
        }
      });
    },
  });

  useEffect(() => {
    if (!projectid) {
      toast.error('Project ID is missing or invalid!');
      navigate('/projects');
    }
  }, [projectid, navigate]);

  useEffect(() => {
    if (project) {
      const supervisor = {
        value: project.supervisorId,
        label: project.supervisorName,
      };
      const customer = {
        value: project.customerId,
        label: project.customerName,
      };
      const status = {
        value: project.status,
        label: project.status,
      };

      formik.setValues({
        projectName: project.name || '',
        supervisor,
        customer,
        status,
        changeOldSupervisorNotes: project.changeOldSupervisorNotes || '',
        changeOldCustomerNotes: project.changeOldCustomerNotes || '',
        changeStatusNotes: project.changeStatusNotes || '',
      });
    }
  }, [project]);

  if (projectError) {
    return <Typography color="error">Failed to load project data. Please try again later.</Typography>;
  }

  if (usersError) {
    toast.error('Failed to fetch users.');
    return <Typography color="error">Failed to fetch users. Please try again later.</Typography>;
  }

  if (isFetchingProject || isUsersLoading) {
    return <Typography>Loading data...</Typography>;
  }

  // تصفية المستخدمين بناءً على الأدوار
  const supervisorOptions = users?.filter((user) => user.role.includes('supervisor')).map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const customerOptions = users?.filter((user) => !user.role.includes('supervisor')).map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const statusOptions = [
    { value: 'active', label: 'active' },
    { value: 'pending', label: 'pending' },
    { value: 'completed', label: 'completed' },
    { value: 'canceled', label: 'canceled' },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
        Edit Project
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Project Name Field */}
        <ProjectNameField
          projectName={formik.values.projectName}
          setProjectName={(value) => formik.setFieldValue('projectName', value)}
        />
        
        {/* Supervisor, Customer, and Status Fields */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Select
              options={supervisorOptions}
              value={formik.values.supervisor}
              onChange={(value) => formik.setFieldValue('supervisor', value)}
              placeholder="Select a Supervisor"
              isClearable
            />
          </Grid>

          <Grid item xs={12}>
            <Select
              options={customerOptions}
              value={formik.values.customer}
              onChange={(value) => formik.setFieldValue('customer', value)}
              placeholder="Select a Customer"
              isClearable
            />
          </Grid>

          <Grid item xs={12}>
            <Select
              options={statusOptions}
              value={formik.values.status}
              onChange={(value) => formik.setFieldValue('status', value)}
              placeholder="Select Status"
              isClearable
            />
          </Grid>
        </Grid>

        {/* Notes Fields */}
        <Box sx={{ mt: 2 }}>
          <textarea
            name="changeOldSupervisorNotes"
            value={formik.values.changeOldSupervisorNotes}
            onChange={(e) => formik.setFieldValue('changeOldSupervisorNotes', e.target.value)}
            placeholder="Enter notes for supervisor change"
            rows="3"
            style={{ width: '100%', marginBottom: '16px' }}
          />
          <textarea
            name="changeOldCustomerNotes"
            value={formik.values.changeOldCustomerNotes}
            onChange={(e) => formik.setFieldValue('changeOldCustomerNotes', e.target.value)}
            placeholder="Enter notes for customer change"
            rows="3"
            style={{ width: '100%', marginBottom: '16px' }}
          />
          <textarea
            name="changeStatusNotes"
            value={formik.values.changeStatusNotes}
            onChange={(e) => formik.setFieldValue('changeStatusNotes', e.target.value)}
            placeholder="Enter notes for status change"
            rows="3"
            style={{ width: '100%' }}
          />
        </Box>

        {/* Save Button */}
        <LoadingButton type="submit" loading={mutation.isLoading} fullWidth sx={{ mt: 3 }}>
          Save Changes
        </LoadingButton>
      </form>
    </Paper>
  </Container>
  );
}
