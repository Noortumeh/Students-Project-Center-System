import { TextField } from '@mui/material';
/* eslint-disable react/prop-types */
const ProjectNameField = ({ label = "Project Name", value, setValue }) => {
  return (
    <TextField
      label={label} // التأكد من أن `label` موجود
      variant="outlined"
      fullWidth
      required
      value={value || ""} // التأكد من أن القيمة ليست undefined
      onChange={(e) => setValue(e.target.value)}
      sx={{ mb: 3 }}
    />
  );
};
export default ProjectNameField;
