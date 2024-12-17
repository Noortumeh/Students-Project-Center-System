import { Card, CardContent, Typography } from '@mui/material';
/* eslint-disable react/prop-types */

const ProjectItem = ({ project }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{project.projectName}</Typography>
        <Typography color="textSecondary">{project.description}</Typography>
        <Typography color="textSecondary">Client ID: {project.clientId}</Typography>
        <Typography color="textSecondary">Supervisor ID: {project.supervisorId}</Typography>
      </CardContent>
    </Card>
  );
};


export default ProjectItem;
