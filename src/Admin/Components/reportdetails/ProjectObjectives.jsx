import PropTypes from 'prop-types'; 
import { Box, Typography, Card } from '@mui/material';

function ProjectObjectives({ objectives }) {
  return (
    <Box mt={4}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#e63946' }}>
        Objectives
      </Typography>
      <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#f1faee' }}>
        <ul>
          {objectives.map((objective, index) => (
            <li key={index}><Typography variant="body1">{objective}</Typography></li>
          ))}
        </ul>
      </Card>
    </Box>
  );
}
ProjectObjectives.propTypes = {
  objectives: PropTypes.arrayOf(PropTypes.string).isRequired, 
};

export default ProjectObjectives;
