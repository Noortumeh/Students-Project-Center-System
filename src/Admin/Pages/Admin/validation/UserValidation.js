import * as yup from 'yup';

const RegeisterSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters"),
  
  middleName: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .nullable(), // Allowing middle name to be optional
  
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters"),
  
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  workgroup: yup
    .string()
    .required("Workgroup is required"),
  
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only letters and numbers')
    .required('Password is required'),
  
  avatar: yup
    .string()
    .url('Avatar must be a valid URL')
    .required('Avatar is required'),
});

export default RegeisterSchema;
