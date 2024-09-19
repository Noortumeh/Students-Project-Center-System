import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      projectName: '',
      supervisor: '',
      customer: '',
      team: '',
      workGroup: '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to save the changes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save changes!',
      });

      if (result.isConfirmed) {
        try {
          const updatedProject = {
            projectName: values.projectName,
            supervisor: values.supervisor,
            customer: values.customer,
            team: values.team,
            workGroup: values.workGroup,
          };

          await axios.patch(`https://api.example.com/projects/${id}`, updatedProject);

          Swal.fire({
            title: 'Updated!',
            text: `Project data has been updated successfully.`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/projects');
          });
        } catch (error) {
          toast.error(error.response?.data?.message || 'An unknown error occurred.');
        }
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Project Data
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              id="projectName"
              label="Project Name"
              variant="outlined"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              fullWidth
            />
            <TextField
              id="supervisor"
              label="Supervisor"
              variant="outlined"
              value={formik.values.supervisor}
              onChange={formik.handleChange}
              fullWidth
            />
            <TextField
              id="customer"
              label="Customer"
              variant="outlined"
              value={formik.values.customer}
              onChange={formik.handleChange}
              fullWidth
            />
            <TextField
              id="team"
              label="Team"
              variant="outlined"
              value={formik.values.team}
              onChange={formik.handleChange}
              fullWidth
            />
            <TextField
              id="workGroup"
              label="Work Group"
              variant="outlined"
              value={formik.values.workGroup}
              onChange={formik.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Update Project
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
