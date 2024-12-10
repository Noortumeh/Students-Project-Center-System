import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CreateProjectButton = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      <Button
        component={Link}
        to="/projects/CreateProject"
        variant="contained"
        color="primary"
        sx={{ py: 1, px: 3, fontSize: '1rem', fontWeight: 'bold', borderRadius: 2 }}
      >
        Create Project
      </Button>
    </Box>
  );
};

export default CreateProjectButton;
