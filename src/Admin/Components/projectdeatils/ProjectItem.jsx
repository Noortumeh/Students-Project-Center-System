import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types'; 

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

ProjectItem.propTypes = {
  project: PropTypes.shape({
    projectName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    supervisorId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectItem;
