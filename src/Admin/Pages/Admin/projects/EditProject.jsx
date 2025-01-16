import { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Select from 'react-select';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';
import ProjectNameField from '../../../Components/generalcomponent/ProjectNameField.jsx';
import { updateProject, fetchUsers } from '../../../../util/http for admin/http.js';

export default function EditProject() {
  const { projectid } = useParams();
  const navigate = useNavigate();

  const { data: users, error: usersError, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { data: project, isLoading: isFetchingProject, error: projectError } = useQuery({
    queryKey: ['project', projectid],
    queryFn: async () => {
      console.log('Fetching project data for project ID:', projectid);
      const response = await fetch(`/api/projects/${projectid}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response (text):', errorText);
        throw new Error('Failed to fetch project data, received non-JSON response');
      }

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Expected JSON response but got:', contentType);
        throw new Error('Expected JSON response but received non-JSON data');
      }

      const data = await response.json();
      console.log('Project data fetched:', data);
      return data;
    },
    enabled: !!projectid,
  });

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      Swal.fire({
        title: 'Updated!',
        text: 'Project data has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/projects');
      });
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      toast.error(error.message || 'An error occurred while updating the project.');
    },
  });

  const formik = useFormik({
    initialValues: {
      projectName: '',
      supervisor: null,
      customer: null,
      status: '',
      changeOldSupervisorNotes: '',
      changeOldCustomerNotes: '',
      changeStatusNotes: '',
    },
    enableReinitialize: true, 
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
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
          console.log('Updating project with ID:', projectid);
          mutation.mutate({
            projectid,
            updatedProject: {
              name: values.projectName,
              supervisorId: values.supervisor?.value || null,
              customerId: values.customer?.value || null,
              status: values.status,
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
    if (project && projectid) {
      console.log('Setting form values based on project data:', project);
      const supervisorOption = users?.find((user) => user.id === project.supervisorId);
      const customerOption = users?.find((user) => user.id === project.customerId);

      formik.setValues({
        projectName: project.name || '',
        supervisor: supervisorOption
          ? { value: supervisorOption.id, label: supervisorOption.name }
          : null,
        customer: customerOption
          ? { value: customerOption.id, label: customerOption.name }
          : null,
        status: project.status || '',
        changeOldSupervisorNotes: project.changeOldSupervisorNotes || '',
        changeOldCustomerNotes: project.changeOldCustomerNotes || '',
        changeStatusNotes: project.changeStatusNotes || '',
      });
    }
  }, [project, users, projectid]);

  // Commenting this part, as it might be the cause of a crash if projectError occurs
  // if (projectError) {
  //   console.error('Error loading project data:', projectError.message);
  //   return (
  //     <Typography color="error">
  //       Failed to load project data. Please try again later.
  //     </Typography>
  //   );
  // }

  // Commenting this part for error handling to prevent page crash
  if (usersError) {
    console.error('Error fetching users:', usersError);
    toast.error('Failed to fetch users.');
    return <Typography color="error">Failed to fetch users. Please try again later.</Typography>;
  }

  if (isFetchingProject || isUsersLoading) {
    console.log('Loading project or users...');
    return <Typography>Loading data...</Typography>;
  }

  const supervisorOptions = users
    ?.filter((user) => user.isSupervisor)
    .map((user) => ({ value: user.id, label: user.name }));

  const customerOptions = users
    ?.filter((user) => !user.isSupervisor)
    .map((user) => ({ value: user.id, label: user.name }));

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Complete', label: 'Complete' },
    { value: 'Archived', label: 'Archived' },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
          Edit Project
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <ProjectNameField
            projectName={formik.values.projectName}
            setProjectName={(value) => formik.setFieldValue('projectName', value)}
          />
          <Select
            options={supervisorOptions || []}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            value={formik.values.supervisor}
            onChange={(value) => formik.setFieldValue('supervisor', value)}
            placeholder="Select a Supervisor"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
          />
          <Select
            options={customerOptions || []}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            value={formik.values.customer}
            onChange={(value) => formik.setFieldValue('customer', value)}
            placeholder="Select a Customer"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
          />
          <Select
            options={statusOptions}
            value={statusOptions.find((option) => option.value === formik.values.status)}
            onChange={(value) => formik.setFieldValue('status', value.value)}
            placeholder="Select Status"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
          />
          <textarea
            name="changeOldSupervisorNotes"
            value={formik.values.changeOldSupervisorNotes}
            onChange={(e) => formik.setFieldValue('changeOldSupervisorNotes', e.target.value)}
            placeholder="Enter notes for supervisor change"
            rows="3"
            style={{ width: '100%', marginTop: '16px' }}
          />
          <textarea
            name="changeOldCustomerNotes"
            value={formik.values.changeOldCustomerNotes}
            onChange={(e) => formik.setFieldValue('changeOldCustomerNotes', e.target.value)}
            placeholder="Enter notes for customer change"
            rows="3"
            style={{ width: '100%', marginTop: '16px' }}
          />
          <textarea
            name="changeStatusNotes"
            value={formik.values.changeStatusNotes}
            onChange={(e) => formik.setFieldValue('changeStatusNotes', e.target.value)}
            placeholder="Enter notes for status change"
            rows="3"
            style={{ width: '100%', marginTop: '16px' }}
          />
          <LoadingButton
            type="submit"
            loading={mutation.isLoading}
            fullWidth
            sx={{ marginTop: '24px' }}
          >
            Save Changes
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
}
