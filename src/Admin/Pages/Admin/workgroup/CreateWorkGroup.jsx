import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import axios from 'axios';
import { MultiSelect } from 'react-multi-select-component';

function CreateWorkGroup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [workgroupName, setWorkgroupName] = useState('');
  const [customers, setCustomers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersData, supervisorsData, studentsData] = await Promise.all([
          axios.get('https://api.escuelajs.co/api/v1/users'), // رابط وهمي لجلب العملاء
          axios.get('https://api.escuelajs.co/api/v1/users'), // رابط وهمي لجلب المشرفين
          axios.get('https://api.escuelajs.co/api/v1/users'), // رابط وهمي لجلب الطلاب
        ]);

        // تصفية البيانات لتحديد الأدوار المناسبة
        setCustomers(customersData.data.filter((user) => user.role === 'customer'));
        setSupervisors(supervisorsData.data.filter((user) => user.role === 'admin'));
        setStudents(studentsData.data.map((student) => ({ label: student.name, value: student.id }))); // students بصيغة يدعمها react-select
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // استرجاع البيانات من location.state إذا تم التحديد مسبقاً من الصفحات الفرعية
  useEffect(() => {
    if (location.state) {
      if (location.state.selectedCustomer) {
        setSelectedCustomer(location.state.selectedCustomer);
      }
      if (location.state.selectedSupervisor) {
        setSelectedSupervisor(location.state.selectedSupervisor);
      }
      if (location.state.selectedStudents) {
        setSelectedStudents(location.state.selectedStudents);
      }
    }
  }, [location.state]);

  // حفظ مجموعة العمل
  const handleSave = async () => {
    if (!workgroupName || !selectedCustomer || !selectedSupervisor || selectedStudents.length < 1) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    // البيانات التي سيتم إرسالها
    const newWorkGroup = {
      id: Date.now(), // معرّف فريد
      workgroupName,
      customer: selectedCustomer,
      supervisor: selectedSupervisor,
      team: selectedStudents.map((student) => student.label),
    };

    try {
      // إرسال البيانات إلى الـ API أو إضافتها للـ state المحلي في حال عدم وجود API
      await axios.post('https://api.escuelajs.co/api/v1/workgroups', newWorkGroup);

      // عرض رسالة نجاح باستخدام toast
      toast.success('Workgroup created successfully!');

      // إعادة التوجيه إلى صفحة مجموعات العمل
      navigate('/workgroup', { state: { newWorkGroup } });
    } catch (error) {
      toast.error('Failed to create workgroup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: 500, p: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create New Workgroup
          </Typography>

          <Box component="form">
            {/* Workgroup Name */}
            <TextField
              label="Workgroup Name *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={workgroupName}
              onChange={(e) => setWorkgroupName(e.target.value)}
            />

            {/* Customer Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="customer-label">Select Customer</InputLabel>
              <Select
                labelId="customer-label"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                label="Select Customer"
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.name}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Supervisor Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="supervisor-label">Select Supervisor</InputLabel>
              <Select
                labelId="supervisor-label"
                value={selectedSupervisor}
                onChange={(e) => setSelectedSupervisor(e.target.value)}
                label="Select Supervisor"
              >
                {supervisors.map((supervisor) => (
                  <MenuItem key={supervisor.id} value={supervisor.name}>
                    {supervisor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Student Selection */}
            <Box sx={{ mb: 2 }}>
              <MultiSelect
                options={students}
                value={selectedStudents}
                onChange={setSelectedStudents}
                labelledBy="Select Students"
                overrideStrings={{
                  selectSomeItems: 'Select Students...',
                  allItemsAreSelected: 'All students are selected',
                  selectAll: 'Select All',
                  search: 'Search Students',
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="error" onClick={() => navigate('/workgroup')}>
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={handleSave} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Create Workgroup'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateWorkGroup;
