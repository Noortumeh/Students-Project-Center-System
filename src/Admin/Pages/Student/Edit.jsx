import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // للتحقق من الإدخالات
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Spinner } from 'react-bootstrap';
import Dashboard from '../../Components/dashbord/Dashbord.jsx'; // استدعاء الداشبورد

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams(); // الحصول على ID المستخدم من الرابط
  const [loading, setLoading] = useState(false); // حالة التحميل لجلب البيانات

  // تكوين الحقول والتحقق من صحة الإدخالات باستخدام Yup
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '', 
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
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
          setLoading(true); // تفعيل حالة التحميل أثناء التحديث
          await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, {
            firstName: values.firstName,
            middleName: values.middleName,
            lastName: values.lastName,
            email: values.email,
            password: values.password 
          });
          
          Swal.fire({
            title: 'Updated!',
            text: 'The user has been updated.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/user/index');  // توجيه المستخدم إلى صفحة عرض المستخدمين بعد التحديث
          });
        } catch (error) {
          toast.error("An unknown error occurred.");  
        } finally {
          setLoading(false); // إيقاف حالة التحميل بعد التحديث
        }
      }
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true); // تفعيل حالة التحميل عند جلب البيانات
        const { data } = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
        formik.setValues({
          firstName: data.firstName || '',
          middleName: data.middleName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          password: '',  // لن يتم عرض كلمة المرور القديمة لأسباب أمنية
        });
      } catch (error) {
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false); // إيقاف حالة التحميل بعد جلب البيانات
      }
    };

    getUser();
  }, [id]);

  return (
    <Dashboard> {/* استدعاء الداشبورد حول المحتوى الرئيسي */}
      <Container className="mt-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="form-group">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="invalid-feedback">{formik.errors.firstName}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="middleName" className="form-label">Middle Name</label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                className={`form-control ${formik.touched.middleName && formik.errors.middleName ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.middleName}
              />
              {formik.touched.middleName && formik.errors.middleName ? (
                <div className="invalid-feedback">{formik.errors.middleName}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label> 
              <input
                id="password"
                name="password"
                type="password" 
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update User'}
            </button>
          </form>
        )}
      </Container>
    </Dashboard>
  );
}

export default EditUser;
