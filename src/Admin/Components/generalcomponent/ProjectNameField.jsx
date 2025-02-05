// ProjectNameField.jsx
import React from 'react';
import { TextField } from '@mui/material';

const ProjectNameField = ({ projectName, setProjectName, sx }) => {
  return (
    <TextField
      label="Project Name"
      variant="outlined"
      fullWidth
      required
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
      sx={sx}
      InputProps={{ sx: { height: '60px', fontSize: '1.2rem' } }}
    />
  );
};

export default ProjectNameField;