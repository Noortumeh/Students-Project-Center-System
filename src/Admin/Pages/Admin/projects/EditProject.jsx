import { useEffect, useState } from 'react';
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
  const [isDataFetched, setIsDataFetched] = useState(false); // حالة التحقق من تحميل البيانات
  const [status, setStatus] = useState(''); // حالة المشروع

  const formik = useFormik({
    initialValues: {
      projectName: '',
      supervisor: '',
      customer: '',
      team: '',
      workGroup: '',
      status: '', // إضافة الحقل للحالة
    },
    enableReinitialize: true, // إعادة التهيئة عند تحديث البيانات
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'هل ترغب في حفظ التعديلات؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم، احفظ التعديلات!',
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

          // تحديث حالة المشروع مع التحقق من القيم المسموحة
          const allowedStatuses = ['Active', 'Completed', 'Pending'];
          if (allowedStatuses.includes(values.status)) {
            const response = await axios.put(`https://localhost:7206/api/projects/${id}/status`, { status: values.status });

            // إضافة جملة طباعة للتحقق من استجابة API الخاصة بتحديث الحالة
            console.log('Status update response:', response.data);  // طباعة استجابة الـ API

          } else {
            toast.error('الحالة التي تم إدخالها غير مسموح بها. يجب أن تكون: Active, Completed, أو Pending.');
            return;
          }

          Swal.fire({
            title: 'تم التحديث!',
            text: `تم تحديث بيانات المشروع بنجاح.`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'موافق',
          }).then(() => {
            navigate('/projects'); // إعادة التوجيه إلى صفحة المشاريع
          });
        } catch (error) {
          toast.error(error.response?.data?.message || 'حدث خطأ غير معروف.');
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
          status: project.status || '', // تعيين حالة المشروع من البيانات المسترجعة
        });

        setStatus(project.status); // تعيين حالة المشروع
        setIsDataFetched(true); // تم تحميل البيانات بنجاح
      } catch (error) {
        toast.error('فشل في تحميل بيانات المشروع.');
      } finally {
        setLoading(false); // إنهاء التحميل
      }
    };

    getProjectData(); // استدعاء الدالة لجلب البيانات
  }, [id, formik]);

  // إذا كانت البيانات لم تُحمل بعد، عرض دائرة التحميل
  if (!isDataFetched) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          تعديل بيانات المشروع
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              id="projectName"
              label="اسم المشروع"
              variant="outlined"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              fullWidth
              required
            />
            <TextField
              id="supervisor"
              label="المشرف"
              variant="outlined"
              value={formik.values.supervisor}
              onChange={formik.handleChange}
              fullWidth
              required
            />
            <TextField
              id="customer"
              label="العميل"
              variant="outlined"
              value={formik.values.customer}
              onChange={formik.handleChange}
              fullWidth
              required
            />
            <TextField
              id="team"
              label="الفريق"
              variant="outlined"
              value={formik.values.team}
              onChange={formik.handleChange}
              fullWidth
              required
            />
            <TextField
              id="workGroup"
              label="مجموعة العمل"
              variant="outlined"
              value={formik.values.workGroup}
              onChange={formik.handleChange}
              fullWidth
              required
            />
            <TextField
              id="status"
              label="الحالة"
              variant="outlined"
              value={formik.values.status}
              onChange={formik.handleChange}
              fullWidth
              required
              helperText="القيم المسموحة: Active, Completed, أو Pending"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
              disabled={loading} // تعطيل الزر أثناء التحميل
            >
              تحديث المشروع
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}


/*import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Box, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SelectUser from './SelectUser'; // استيراد المكون
import ProjectForm from './ProjectForm'; // استيراد المكون

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const formik = useFormik({
    initialValues: {
      projectName: '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'هل ترغب في حفظ التغييرات؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم، احفظ التغييرات!',
      });

      if (result.isConfirmed) {
        setLoading(true);

        try {
          const updatedProject = {
            projectName: values.projectName,
            supervisorId: selectedSupervisor.value,
            customerId: selectedCustomer.value,
          };

          await axios.patch(`https://api.example.com/projects/${id}`, updatedProject);

          Swal.fire({
            title: 'تم التحديث!',
            text: 'تم تحديث بيانات المشروع بنجاح.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'حسناً',
          }).then(() => {
            navigate('/projects');
          });
        } catch (error) {
          toast.error(error.response?.data?.message || 'حدث خطأ غير معروف.');
        } finally {
          setLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('https://localhost:7206/api/users/get-users?PageSize=6&PageNumber=1');
        const supervisorData = response.data.result.map((supervisor) => ({
          value: supervisor.id,
          label: supervisor.userName.toLowerCase(),
        }));
        setSupervisors(supervisorData);
      } catch (error) {
        toast.error('فشل في جلب المشرفين');
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://localhost:7206/api/users/get-users?PageSize=6&PageNumber=1');
        const customerData = response.data.result.map((customer) => ({
          value: customer.id,
          label: customer.userName.toLowerCase(),
        }));
        setCustomers(customerData);
      } catch (error) {
        toast.error('فشل في جلب العملاء');
      }
    };

    fetchSupervisors();
    fetchCustomers();
    
    const getProjectData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.example.com/projects/${id}`);
        const project = response.data;

        // تعبئة الحقول بالبيانات المستردة
        formik.setValues({
          projectName: project.projectName || '',
        });

        // تعيين المشرف والعميل بناءً على البيانات المستردة
        setSelectedSupervisor({ value: project.supervisorId, label: project.supervisor });
        setSelectedCustomer({ value: project.customerId, label: project.customer });
      } catch (error) {
        toast.error('فشل في جلب بيانات المشروع.');
      } finally {
        setLoading(false);
      }
    };

    getProjectData();
  }, [id, formik]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          تعديل بيانات المشروع
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ProjectForm formik={formik} loading={loading} />
            <SelectUser options={supervisors} selectedUser={selectedSupervisor} setSelectedUser={setSelectedSupervisor} placeholder="اختر مشرف" />
            <SelectUser options={customers} selectedUser={selectedCustomer} setSelectedUser={setSelectedCustomer} placeholder="اختر عميل" />
          </>
        )}
      </Paper>
    </Container>
  );
}
*/
