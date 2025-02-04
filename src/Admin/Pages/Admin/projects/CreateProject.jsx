import { useState } from 'react';
import { Container, Paper, Typography, TextField, Grid, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';
import ProjectNameField from '../../../Components/generalcomponent/ProjectNameField.jsx';
import { fetchUsers, createProject, fetchSupervisors } from '../../../../util/http for admin/http.js';
import projectImage from '../../../../assets/images/createproject.jpeg';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: supervisorsData } = useQuery({
    queryKey: ['supervisors'],
    queryFn: fetchSupervisors,
  });

  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const supervisors = supervisorsData?.map((supervisor) => ({
    value: supervisor.id,
    label: `${supervisor.firstName} ${supervisor.lastName}`,
  })) || [];

  const customers = usersData?.map((user) => ({
    value: user.id,
    label: `${user.fullName}`,
  })).filter(Boolean) || [];

  const handleAddProject = async () => {
    if (!projectName || !selectedSupervisor || !selectedCustomer || !companyName) {
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to add this project?');
    if (!isConfirmed) return;

    setLoading(true);
    try {
      const projectData = {
        name: projectName,
        supervisorId: selectedSupervisor.value,
        customerId: selectedCustomer.value,
        companyName,
      };

      const newProject = await createProject(projectData);

      if (newProject?.isSuccess) {
        toast.success('Project added successfully!');
        await queryClient.invalidateQueries(['projects']);
        setTimeout(() => {
          navigate('/admin/projects');
        }, 1500);
      } else {
        toast.error('Failed to add project.');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <ToastContainer />
      <Grid container spacing={6} alignItems="center">
        {/* نصف الصفحة للـ Paper */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              borderRadius: 6,
              overflow: "hidden",
              background: "#f5f5f5",
              p: 5,
              height: "100%",
              mt: { xs: 2, md: 5 }, // تقليل الهامش في الشاشات الصغيرة
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                textAlign: "center",
                color: "#1976d2",
                fontWeight: "bold",
                mb: 4,
                fontSize: { xs: "2rem", md: "3rem" }, // تصغير العنوان في الشاشات الصغيرة
              }}
            >
              Create New Project
            </Typography>
            <form>
              <ProjectNameField
                projectName={projectName}
                setProjectName={setProjectName}
                sx={{ width: "100%" }}
              />
              <TextField
                label="Company Name"
                variant="outlined"
                fullWidth
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                sx={{ mt: 3, fontSize: "1.2rem" }}
                InputProps={{ sx: { height: "60px", fontSize: "1.2rem" } }}
              />
              <Select
                options={supervisors}
                onChange={setSelectedSupervisor}
                placeholder="Select a Supervisor"
                isClearable
                styles={{
                  container: (base) => ({ ...base, marginTop: "24px", width: "100%" }),
                  control: (base) => ({ ...base, height: "60px" }),
                }}
              />
              <Select
                options={customers}
                onChange={setSelectedCustomer}
                placeholder="Select a Customer"
                isClearable
                styles={{
                  container: (base) => ({ ...base, marginTop: "24px", width: "100%" }),
                  control: (base) => ({ ...base, height: "60px" }),
                }}
              />
              <LoadingButton
                loading={loading}
                label="Create Project"
                onClick={handleAddProject}
                sx={{
                  mt: 5,
                  width: "100%",
                  height: "60px",
                  fontSize: "1.2rem",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              />
            </form>
          </Paper>
        </Grid>
  
        {/* نصف الصفحة للصورة */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "30rem", md: "45rem" }, // تصغير الصورة على الشاشات الصغيرة
              height: { xs: "300px", sm: "400px", md: "600px" }, // ضبط الطول
              backgroundImage: `url(${projectImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              mt: { xs: 3, md: 7 }, // تقليل الهامش في الهواتف
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}  

export default CreateProject;