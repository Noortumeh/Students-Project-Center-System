import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';

function EditWorkGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  // Fetch customers and supervisors data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersData, supervisorsData] = await Promise.all([
          axios.get('http://localhost:3000/api/v1/customers'),
          axios.get('http://localhost:3000/api/v1/supervisors')
        ]);
        setCustomers(customersData.data);
        setSupervisors(supervisorsData.data);
      } catch (error) {
        toast.error('Failed to fetch customers or supervisors.');
      }
    };
    fetchData();
  }, []);

  // Formik for handling form validation and submission
  const formik = useFormik({
    initialValues: {
      workgroupName: '',
      customer: '',
      supervisor: '',
      student1: '',
      student2: '',
      student3: '',
      student4: ''
    },
    validationSchema: Yup.object({
      workgroupName: Yup.string().required('Workgroup Name is required'),
      customer: Yup.string().required('Customer is required'),
      supervisor: Yup.string().required('Supervisor is required'),
      student1: Yup.string().required('At least one student is required'),
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
        setLoading(true);
        try {
          const response = await axios.put(`http://localhost:3000/api/v1/workgroups/${id}`, {
            workgroupName: values.workgroupName,
            customer: values.customer,
            supervisor: values.supervisor,
            team: [values.student1, values.student2, values.student3, values.student4]
          });

          if (response.status === 200) {
            Swal.fire({
              title: 'Updated!',
              text: 'The workgroup has been updated.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then(() => {
              navigate('/workgroup');  // Redirect after updating
            });
          } else {
            toast.error("Failed to update workgroup.");
          }
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      }
    },
  });

  // Handle errors
  const handleError = (error) => {
    if (error.response) {
      toast.error(`Error: ${error.response.data.message || "Failed to update workgroup."}`);
    } else if (error.request) {
      toast.error("No response received from server.");
    } else {
      toast.error(`Request error: ${error.message}`);
    }
  };

  // Fetch workgroup data for editing
  useEffect(() => {
    const getWorkGroup = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/workgroups/${id}`);
        formik.setValues({
          workgroupName: data.workgroupName || '',
          customer: data.customer || '',
          supervisor: data.supervisor || '',
          student1: data.team && data.team[0] ? data.team[0] : '',
          student2: data.team && data.team[1] ? data.team[1] : '',
          student3: data.team && data.team[2] ? data.team[2] : '',
          student4: data.team && data.team[3] ? data.team[3] : ''
        });
      } catch (error) {
        toast.error("Failed to fetch workgroup data.");
      } finally {
        setLoading(false);
      }
    };

    getWorkGroup();
  }, [id]);

  return (
    <Dashboard>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card sx={{ width: 600, p: 3 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              Edit Workgroup Data
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Workgroup Name"
                  id="workgroupName"
                  name="workgroupName"
                  value={formik.values.workgroupName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.workgroupName && Boolean(formik.errors.workgroupName)}
                  helperText={formik.touched.workgroupName && formik.errors.workgroupName}
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Customer</InputLabel>
                  <Select
                    id="customer"
                    name="customer"
                    value={formik.values.customer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.customer && Boolean(formik.errors.customer)}
                  >
                    <MenuItem value="">Select Customer</MenuItem>
                    {customers.map((customer) => (
                      <MenuItem key={customer.id} value={customer.name}>{customer.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Supervisor</InputLabel>
                  <Select
                    id="supervisor"
                    name="supervisor"
                    value={formik.values.supervisor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.supervisor && Boolean(formik.errors.supervisor)}
                  >
                    <MenuItem value="">Select Supervisor</MenuItem>
                    {supervisors.map((supervisor) => (
                      <MenuItem key={supervisor.id} value={supervisor.name}>{supervisor.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography variant="subtitle1" gutterBottom>
                  Team
                </Typography>
                {['student1', 'student2', 'student3', 'student4'].map((student, index) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    key={index}
                    label={`Student ${index + 1}`}
                    name={student}
                    value={formik.values[student]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                ))}

                <Box display="flex" justifyContent="space-between" mt={3}>
                  <Button variant="outlined" color="error" onClick={() => navigate('/workgroup')}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Update WorkGroup'}
                  </Button>
                </Box>
              </form>
            )}
          </CardContent>
        </Card>
      </Box>
    </Dashboard>
  );
}

export default EditWorkGroup;
