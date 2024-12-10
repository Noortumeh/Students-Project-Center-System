import PropTypes from 'prop-types'; 
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const AddUserButton = ({ title }) => {
  return (
    <Grid item>
      <Button variant="contained" color="primary" component={Link} to="/createuser/CreateUser">
        Add {title}
      </Button>
    </Grid>
  );
};

AddUserButton.propTypes = {
  title: PropTypes.string.isRequired,  
};

export default AddUserButton;
