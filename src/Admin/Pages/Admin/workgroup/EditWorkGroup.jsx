import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // للتحقق من الإدخالات
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Dashboard from '../../../shared/dashbord/Dashbord'; // استدعاء الداشبورد
import 'bootstrap-icons/font/bootstrap-icons.css';

function EditWorkGroup() {
  const navigate = useNavigate();
  const { id } = useParams(); // الحصول على ID المجموعة
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [customers, setCustomers] = useState([]); // قائمة العملاء
  const [supervisors, setSupervisors] = useState([]); // قائمة المشرفين

  // جلب العملاء والمشرفين من الـ API
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
        setLoading(true); // تعيين حالة التحميل
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
              navigate('/workgroup/WorkGroup');  // إعادة التوجيه بعد التحديث
            });
          } else {
            toast.error("Failed to update workgroup.");
          }
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false); // إيقاف حالة التحميل
        }
      }
    },
  });

  const handleError = (error) => {
    if (error.response) {
      toast.error(`Error: ${error.response.data.message || "Failed to update workgroup."}`);
    } else if (error.request) {
      toast.error("No response received from server.");
    } else {
      toast.error(`Request error: ${error.message}`);
    }
  };

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
      <div className="container mt-5">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="form-group">
            <h3>Edit Workgroup</h3>

            <div className="mb-3">
              <label htmlFor="workgroupName" className="form-label">Workgroup Name</label>
              <input
                id="workgroupName"
                name="workgroupName"
                type="text"
                className={`form-control ${formik.touched.workgroupName && formik.errors.workgroupName ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.workgroupName}
              />
              {formik.touched.workgroupName && formik.errors.workgroupName ? (
                <div className="invalid-feedback">{formik.errors.workgroupName}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="customer" className="form-label">Customer</label>
              <select
                id="customer"
                name="customer"
                className={`form-select ${formik.touched.customer && formik.errors.customer ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customer}
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.name}>{customer.name}</option>
                ))}
              </select>
              {formik.touched.customer && formik.errors.customer ? (
                <div className="invalid-feedback">{formik.errors.customer}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="supervisor" className="form-label">Supervisor</label>
              <select
                id="supervisor"
                name="supervisor"
                className={`form-select ${formik.touched.supervisor && formik.errors.supervisor ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.supervisor}
              >
                <option value="">Select Supervisor</option>
                {supervisors.map((supervisor) => (
                  <option key={supervisor.id} value={supervisor.name}>{supervisor.name}</option>
                ))}
              </select>
              {formik.touched.supervisor && formik.errors.supervisor ? (
                <div className="invalid-feedback">{formik.errors.supervisor}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label className="form-label">Team</label>
              <input
                id="student1"
                name="student1"
                type="text"
                placeholder="Student 1"
                className={`form-control mb-2 ${formik.touched.student1 && formik.errors.student1 ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.student1}
              />
              {formik.touched.student1 && formik.errors.student1 ? (
                <div className="invalid-feedback">{formik.errors.student1}</div>
              ) : null}
              <input
                id="student2"
                name="student2"
                type="text"
                placeholder="Student 2"
                className="form-control mb-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.student2}
              />
              <input
                id="student3"
                name="student3"
                type="text"
                placeholder="Student 3"
                className="form-control mb-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.student3}
              />
              <input
                id="student4"
                name="student4"
                type="text"
                placeholder="Student 4"
                className="form-control mb-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.student4}
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-danger" onClick={() => navigate('/workgroup/WorkGroup')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Save Edit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </Dashboard>
  );
}

export default EditWorkGroup;
