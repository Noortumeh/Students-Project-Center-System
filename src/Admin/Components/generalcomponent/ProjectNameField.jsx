import { TextField } from '@mui/material';
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
