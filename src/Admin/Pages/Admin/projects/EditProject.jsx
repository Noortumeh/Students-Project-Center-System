import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams(); // الحصول على معرف المشروع من عنوان URL
  const [loading, setLoading] = useState(false); // حالة التحميل

  const formik = useFormik({
    initialValues: {
      projectName: '',
      supervisor: '',
      customer: '',
      team: '',
      workGroup: '',
    },
    enableReinitialize: true, // إعادة التهيئة عند تحديث البيانات
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
        setLoading(true); // بدء التحميل

        try {
          // تحديث بيانات المشروع
          const updatedProject = {
            projectName: values.projectName,
            supervisor: values.supervisor,
            customer: values.customer,
            team: values.team,
            workGroup: values.workGroup,
          };

          // إرسال التحديث إلى الـ API
          await axios.patch(`https://api.example.com/projects/${id}`, updatedProject);

          Swal.fire({
            title: 'Updated!',
            text: `Project data has been updated successfully.`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/projects'); // إعادة التوجيه إلى صفحة المشاريع
          });
        } catch (error) {
          toast.error(error.response?.data?.message || 'An unknown error occurred.');
        } finally {
          setLoading(false); // إنهاء التحميل
        }
      }
    },
  });

  // جلب بيانات المشروع عند تحميل الصفحة
  useEffect(() => {
    const getProjectData = async () => {
      try {
        setLoading(true); // بدء التحميل
        const response = await axios.get(`https://api.example.com/projects/${id}`);
        const project = response.data;

        // تعبئة الحقول بالبيانات المستردة
        formik.setValues({
          projectName: project.projectName || '',
          supervisor: project.supervisor || '',
          customer: project.customer || '',
          team: project.team || '',
          workGroup: project.workGroup || '',
        });
      } catch (error) {
        toast.error('Failed to fetch project data.');
      } finally {
        setLoading(false); // إنهاء التحميل
      }
    };

    getProjectData(); // استدعاء الدالة لجلب البيانات
  }, [id, formik]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Project Data
        </Typography>
        {loading ? ( // عرض دائرة التحميل إذا كانت في حالة تحميل
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                id="projectName"
                label="Project Name"
                variant="outlined"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                fullWidth
                required
              />
              <TextField
                id="supervisor"
                label="Supervisor"
                variant="outlined"
                value={formik.values.supervisor}
                onChange={formik.handleChange}
                fullWidth
                required
              />
              <TextField
                id="customer"
                label="Customer"
                variant="outlined"
                value={formik.values.customer}
                onChange={formik.handleChange}
                fullWidth
                required
              />
              <TextField
                id="team"
                label="Team"
                variant="outlined"
                value={formik.values.team}
                onChange={formik.handleChange}
                fullWidth
                required
              />
              <TextField
                id="workGroup"
                label="Work Group"
                variant="outlined"
                value={formik.values.workGroup}
                onChange={formik.handleChange}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
                disabled={loading} // تعطيل الزر أثناء التحميل
              >
                Update Project
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
}
