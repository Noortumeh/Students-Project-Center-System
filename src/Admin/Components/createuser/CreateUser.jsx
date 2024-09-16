import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RegeisterSchema from "../../shared/validation/UserValidation.js";
import { Button, Container, TextField, Typography, Paper } from '@mui/material';

export default function UserForm({ formTitle, redirectPath }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      avatar: '',
      workgroup: '',
    },
    validationSchema: RegeisterSchema,
    onSubmit: async (values) => {
      try {
        // إنشاء الاسم الكامل من الحقول الثلاثة
        const name = `${values.firstName} ${values.middleName} ${values.lastName}`.trim();

        // البيانات التي سيتم إرسالها إلى الـ API
        const requestData = {
          ...values,
          name,  // إضافة الاسم الكامل
        };

        console.log("Submitting values:", requestData);

        const existingUsers = await axios.get("https://api.escuelajs.co/api/v1/users");
        const isNameExists = existingUsers.data.some(existingUser => existingUser.name === name);

        if (isNameExists) {
          formik.setFieldError('firstName', 'First Name already exists. Please choose a different name.');
        } else {
          // إرسال البيانات إلى الـ API
          await axios.post("https://api.escuelajs.co/api/v1/users", requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          toast.success("User added successfully");
          navigate(redirectPath);
        }
      } catch (error) {
        // عرض الخطأ في حال وجوده
        console.error("Error response:", error.response?.data || error.message);
        toast.error("An error occurred: " + (error.response?.data?.message || 'Unknown error'));
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" gutterBottom align="center">
          {formTitle}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* First Name Field */}
          <TextField
            fullWidth
            id="firstName"
            label="First Name"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{ mb: 3 }}
          />

          {/* Middle Name Field */}
          <TextField
            fullWidth
            id="middleName"
            label="Middle Name"
            variant="outlined"
            value={formik.values.middleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.middleName && Boolean(formik.errors.middleName)}
            helperText={formik.touched.middleName && formik.errors.middleName}
            sx={{ mb: 3 }}
          />

          {/* Last Name Field */}
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={{ mb: 3 }}
          />

          {/* Email Field */}
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 3 }}
          />

          {/* Workgroup Field */}
          <TextField
            fullWidth
            id="workgroup"
            label="Workgroup"
            variant="outlined"
            value={formik.values.workgroup}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.workgroup && Boolean(formik.errors.workgroup)}
            helperText={formik.touched.workgroup && formik.errors.workgroup}
            sx={{ mb: 3 }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 3 }}
          />

          {/* Avatar Field */}
          <TextField
            fullWidth
            id="avatar"
            label="Avatar URL"
            variant="outlined"
            value={formik.values.avatar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            helperText={formik.touched.avatar && formik.errors.avatar}
            sx={{ mb: 3 }}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
          >
            Add User
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
