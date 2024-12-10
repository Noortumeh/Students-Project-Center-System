import PropTypes from 'prop-types';  
import { Button, Typography } from '@mui/material';

const ActionButtons = ({ onDelete, onEdit, onClick, label, type }) => {
  return (
    <div>
      {type === 'workgroup' ? (
        <>
          <Button variant="contained" color="primary" onClick={onEdit}>
            Edit Workgroup
          </Button>
          <Button variant="contained" color="secondary" onClick={onDelete}>
            Delete Workgroup
          </Button>
        </>
      ) : type === 'user' ? (
        <>
          <Button variant="contained" color="primary" onClick={onEdit}>
            Edit User
          </Button>
          <Button variant="contained" color="secondary" onClick={onDelete}>
            Delete User
          </Button>
        </>
      ) : onClick ? (
        <Button variant="contained" color="primary" onClick={onClick}>
          {label || 'Action'}
        </Button>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No actions available
        </Typography>
      )}
    </div>
  );
};

ActionButtons.propTypes = {
  onDelete: PropTypes.func.isRequired, 
  onEdit: PropTypes.func.isRequired,    
  onClick: PropTypes.func,              
  label: PropTypes.string,              
  type: PropTypes.string.isRequired     
};

export default ActionButtons;
