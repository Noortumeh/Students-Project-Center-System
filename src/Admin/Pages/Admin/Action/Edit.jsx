import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { TextField, Button, Box, Paper, Typography, Grid } from '@mui/material';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      workGroup: '',
      id: ''
    },
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
          // إرسال القيم التي تم تعديلها إلى السيرفر
          await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, values);

          Swal.fire({
            title: 'Updated!',
            text: 'The user has been updated.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/user/index');  // إعادة التوجيه بعد التحديث
          });
        } catch (error) {
          toast.error("An unknown error occurred.");  // عرض رسالة خطأ في حال الفشل
        }
      }
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
        // تعيين القيم التي تم جلبها للنموذج
        formik.setValues({
          firstName: data.firstName || '',
          middleName: data.middleName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          workGroup: data.workGroup || '',
          id: data.id || ''
        });
      } catch (error) {
        toast.error("Failed to fetch user data.");
      }
    };

    getUser();
  }, [id]);

  return (
    <Dashboard>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit User
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="id"
                name="id"
                label="User ID"
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="middleName"
                name="middleName"
                label="Middle Name"
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                helperText={formik.touched.middleName && formik.errors.middleName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="workGroup"
                name="workGroup"
                label="Work Group"
                value={formik.values.workGroup}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.workGroup && Boolean(formik.errors.workGroup)}
                helperText={formik.touched.workGroup && formik.errors.workGroup}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update User
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Dashboard>
  );
}

export default Edit;
