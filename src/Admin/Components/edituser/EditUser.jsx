import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUserForm({ userType = "User", apiPath = "https://api.example.com/users", redirectPath = "/users" }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
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
          // إعداد البيانات قبل الإرسال
          const updatedUser = {
            name: `${values.firstName} ${values.middleName} ${values.lastName}`,
            email: values.email,
            workGroup: values.workGroup,
          };

          console.log(`API Path: ${apiPath}`);
          console.log(`User ID: ${id}`);
          console.log(`Sending updated ${userType} data:`, updatedUser);

          // إرسال البيانات إلى الـ API
          await axios.patch(`${apiPath}/${id}`, updatedUser);

          Swal.fire({
            title: 'Updated!',
            text: `${userType} data has been updated successfully.`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate(redirectPath);
          });
        } catch (error) {
          console.error("Error response:", error.response?.data || error.message);
          toast.error(error.response?.data?.message || 'An unknown error occurred.');
        }
      }
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        // عرض معرف المستخدم والتحقق من عنوان الـ API
        console.log(`Fetching data for user ID: ${id}`);
        console.log(`Full API Path: ${apiPath}/${id}`);

        // محاولة جلب البيانات من الـ API
        const response = await axios.get(`${apiPath}/${id}`);
        
        // تحقق من نوع المحتوى في الاستجابة
        if (response.status === 200 && response.headers['content-type'].includes('application/json')) {
          const data = response.data;
          console.log("Fetched user data:", data);

          if (data) {
            const names = data.name ? data.name.split(' ') : ['', '', ''];

            // استخدم setFieldValue لكل حقل على حدة لضمان تحديثها
            formik.setFieldValue('firstName', names[0] || '');
            formik.setFieldValue('middleName', names[1] || '');
            formik.setFieldValue('lastName', names[2] || '');
            formik.setFieldValue('email', data.email || '');
            formik.setFieldValue('workGroup', data.workGroup || '');
          } else {
            console.error("No data returned from the API.");
            toast.error('Failed to fetch user data. No data returned.');
          }
        } else {
          console.error("Unexpected response format:", response);
          toast.error('Failed to fetch user data. Unexpected response format.');
        }
      } catch (error) {
        console.error("Failed to fetch data:", error.response?.data || error.message);
        toast.error(`Failed to fetch ${userType} data.`);
      }
    };

    getUser();
  }, [id, apiPath, userType]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit {userType} Data
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              fullWidth
            />

            <TextField
              id="middleName"
              label="Middle Name"
              variant="outlined"
              value={formik.values.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.middleName && Boolean(formik.errors.middleName)}
              helperText={formik.touched.middleName && formik.errors.middleName}
              fullWidth
            />

            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              fullWidth
            />

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />

            <TextField
              id="workGroup"
              label="Work Group"
              variant="outlined"
              value={formik.values.workGroup}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.workGroup && Boolean(formik.errors.workGroup)}
              helperText={formik.touched.workGroup && formik.errors.workGroup}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Update {userType}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
