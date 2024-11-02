import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Spinner, TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Dashboard from '../../Components/dashbord/Dashbord.jsx';

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      workgroup: '',
      role: '',
      status: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      workgroup: Yup.string().required('Workgroup is required'),
      role: Yup.string().required('Role is required'),
      status: Yup.string().required('Status is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to save the changes?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!'
      });

      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, values);
          
          Swal.fire({
            title: 'Updated!',
            text: 'The user has been updated.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/user/index');
          });
        } catch (error) {
          toast.error("An unknown error occurred.");
        } finally {
          setLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
        formik.setValues({
          name: data.name || '',
          workgroup: data.workgroup || '',
          role: data.role || '',
          status: data.status || '',
          email: data.email || '',
        });
      } catch (error) {
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [id]);

  return (
    <Dashboard>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Edit User
          </Typography>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="workgroup"
                    name="workgroup"
                    label="Workgroup"
                    value={formik.values.workgroup}
                    onChange={formik.handleChange}
                    error={formik.touched.workgroup && Boolean(formik.errors.workgroup)}
                    helperText={formik.touched.workgroup && formik.errors.workgroup}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="role"
                    name="role"
                    label="Role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="status"
                    name="status"
                    label="Status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button color="primary" variant="contained" fullWidth type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update User'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </Container>
    </Dashboard>
  );
}

export default EditUser;
