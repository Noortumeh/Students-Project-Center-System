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

  console.log('Project ID:', projectid); 

  const { data: users, error: usersError, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { data: project, isLoading: isFetchingProject, error: projectError } = useQuery({
    queryKey: ['project', projectid],
    queryFn: () => fetchProjectData(projectid),
    enabled: !!projectid, // تأكد من تفعيل الاستعلام فقط إذا كانت قيمة id موجودة
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
      toast.error(error.message || 'An error occurred while updating the project.');
    },
  });

  const formik = useFormik({
    initialValues: {
      projectName: '',
      supervisor: null,
      customer: null,
      status: '',
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
              status: values.status,
            },
          });
        }
      });
    },
  });

  useEffect(() => {
    if (project && projectid) {
      const oldSupervisor = users?.find((user) => user.id === project.supervisorId);
      if (!oldSupervisor) {
        toast.error('The old supervisor for this project does not exist.');
      }
  
      formik.setValues({
        projectName: project.name || '',
        supervisor: oldSupervisor || null,
        customer: users?.find((user) => user.id === project.customerId) || null,
        status: project.status || '',
      });
    }
  }, [project, users, projectid]);
  
  if (usersError) {
    toast.error('Failed to fetch users.');
  }

  if (isFetchingProject || isUsersLoading) {
    return <Typography>Loading data...</Typography>;
  }

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Complete', label: 'Complete' },
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
            options={users?.filter((user) => user.isSupervisor) || []}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            value={formik.values.supervisor}
            onChange={(value) => formik.setFieldValue('supervisor', value)}
            placeholder="Select a Supervisor"
            isClearable
            styles={{ container: (base) => ({ ...base, marginTop: '16px' }) }}
          />
          <Select
            options={users?.filter((user) => !user.isSupervisor) || []}
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
          <LoadingButton
            loading={mutation.isLoading}
            label="Save Changes"
            type="submit"
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
}
