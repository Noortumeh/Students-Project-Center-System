import PropTypes from "prop-types";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Button,
} from "@mui/material";

const FormComponent = ({ formik, customers, supervisors, onCancel }) => {
  return (
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
            <MenuItem key={customer.id} value={customer.name}>
              {customer.name}
            </MenuItem>
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
            <MenuItem key={supervisor.id} value={supervisor.name}>
              {supervisor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="subtitle1" gutterBottom>
        Team
      </Typography>
      {["student1", "student2", "student3", "student4"].map((student, index) => (
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
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Update WorkGroup
        </Button>
      </Box>
    </form>
  );
};

FormComponent.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    touched: PropTypes.object,
    errors: PropTypes.object,
  }).isRequired,
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  supervisors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FormComponent;
