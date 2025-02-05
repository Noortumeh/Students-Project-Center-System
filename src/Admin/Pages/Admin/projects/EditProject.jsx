import { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Box, Container, Paper, Typography, Grid, TextField } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Select from 'react-select';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';
import { updateProject, fetchUsers, fetchProjectDetails } from '../../../../util/http for admin/http.js';
import projectImage from '../../../../assets/images/EditProject.png';

export default function EditProject() {
  const { projectid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialCompanyName = location.state?.companyName || '';


  // Fetch users
  const { data: users, error: usersError, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Fetch project details
  const { data: project, isLoading: isFetchingProject, error: projectError, refetch } = useQuery({
    queryKey: ['project', projectid],
    queryFn: () => fetchProjectDetails(projectid),
    enabled: !!projectid,
  });

  // Mutation to update project
  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      Swal.fire({
        title: 'Updated!',
        text: 'Project data has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        refetch().then(() => navigate('/admin/projects'));
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
      supervisor: null,
      customer: null,
      company: initialCompanyName, 
      status: null,
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
              CustomerId: values.customer?.value || null,
              companyName: values.company, // Ensure it's a string
              status: values.status?.value || null,
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
      formik.setValues({
        projectName: project.name || '',
        supervisor: project.supervisorId
          ? { value: project.supervisorId, label: project.supervisorName }
          : null,
        customer: project.customerId
          ? { value: project.customerId, label: project.customerName }
          : null,
        company: project.companyName || '',
        status: project.status ? { value: project.status, label: project.status } : null,
        changeOldSupervisorNotes: project.changeOldSupervisorNotes || '',
        changeOldCustomerNotes: project.changeOldCustomerNotes || '',
        changeStatusNotes: project.changeStatusNotes || '',
      });
    }
  }, [project]); // إضافة project كتبعية

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

  // Filtering users based on roles
  const supervisorOptions = users?.filter((user) => user.role.includes('supervisor')).map((user) => ({
    value: user.id,
    label: user.fullName || `${user.firstName} ${user.lastName}`,
  }));

  const customerOptions = users?.filter((user) => !user.role.includes('supervisor')).map((user) => ({
    value: user.id,
    label: user.fullName || `${user.firstName} ${user.lastName}`,
  }));

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'canceled', label: 'Canceled' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 5 }}>
      <Grid container spacing={3} alignItems="center">
        {/* Left Side - Form */}
        <Grid item xs={12} sm={12} md={6}>
          <Paper 
            elevation={6} 
            sx={{ 
              borderRadius: 6, 
              overflow: "hidden", 
              background: "#f5f5f5", 
              p: { xs: 3, sm: 4, md: 5 }, 
              height: "100%", 
              mt: { xs: 2, md: 4 }
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                textAlign: "center", 
                color: "#1976d2", 
                fontSize: { xs: "1.8rem", md: "2.5rem" } 
              }}
            >
              Edit Project
            </Typography>
  
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Project Name"
                variant="outlined"
                fullWidth
                value={formik.values.projectName}
                onChange={(e) => formik.setFieldValue("projectName", e.target.value)}
                sx={{ mb: 3 }}
              />
  
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    options={supervisorOptions}
                    value={formik.values.supervisor}
                    onChange={(value) => {
                      if (formik.values.supervisor !== value) {
                        formik.setFieldValue("supervisor", value);
                      }
                    }}
                    placeholder="Select a Supervisor"
                    isClearable
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <Select
                    options={customerOptions}
                    value={formik.values.customer}
                    onChange={(value) => {
                      if (formik.values.customer !== value) {
                        formik.setFieldValue("customer", value);
                      }
                    }}
                    placeholder="Select a Customer"
                    isClearable
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <Select
                    options={statusOptions}
                    value={formik.values.status}
                    onChange={(value) => {
                      if (formik.values.status !== value) {
                        formik.setFieldValue("status", value);
                      }
                    }}
                    placeholder="Select Status"
                    isClearable
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    label="Company Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formik.values.company}
                    onChange={(e) => formik.setFieldValue("company", e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    label="Change Supervisor Notes"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={formik.values.changeOldSupervisorNotes}
                    onChange={(e) => formik.setFieldValue("changeOldSupervisorNotes", e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    label="Change Customer Notes"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={formik.values.changeOldCustomerNotes}
                    onChange={(e) => formik.setFieldValue("changeOldCustomerNotes", e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    label="Change Status Notes"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={formik.values.changeStatusNotes}
                    onChange={(e) => formik.setFieldValue("changeStatusNotes", e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
  
              <LoadingButton 
                type="submit" 
                loading={mutation.isLoading} 
                fullWidth 
                sx={{ mt: 3 }}
              >
                Save Changes
              </LoadingButton>
            </form>
          </Paper>
        </Grid>
  
        {/* Right Side - Image */}
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "25rem", lg: "35rem" },
              height: { xs: "300px", sm: "400px", md: "600px" },
              backgroundImage: `url(${projectImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              ml: { xs: 0, sm: 3, md: 10 }
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}  