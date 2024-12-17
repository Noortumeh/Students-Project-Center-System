import { TextField } from '@mui/material';
/* eslint-disable react/prop-types */
const ProjectNameField = ({ projectName, setProjectName }) => {
  return (
    <TextField
      label="Project Name"
      variant="outlined"
      fullWidth
      required
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
      sx={{ mb: 3 }}
    />
  );
};
export default ProjectNameField;
