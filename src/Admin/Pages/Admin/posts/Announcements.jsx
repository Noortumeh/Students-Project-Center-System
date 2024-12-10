import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types'; 

const Announcements = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.example.com/projects/${projectId}`);
        if (!response.ok) {
          throw new Error(`Error fetching project: ${response.status}`);
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch project data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }
  if (!project) {
    return null; 
  }

  return (
    <Card sx={{ marginBottom: 2 }}> 
      <CardContent>
        <Typography variant="h5" component="h2">
          {project.title}
        </Typography>
        <Typography variant="body1">
          {project.description}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Date: {project.date}
        </Typography>
      </CardContent>
    </Card>
  );
};

Announcements.propTypes = {
  projectId: PropTypes.string.isRequired, 
};

export default Announcements;
