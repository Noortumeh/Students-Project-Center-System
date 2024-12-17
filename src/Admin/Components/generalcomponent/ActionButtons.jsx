import { Button, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
/* eslint-disable react/prop-types */

const ActionButtons = ({ onDelete, onEdit, onClick, label, type }) => {
  return (
    <div>
      {type === 'workgroup' ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={onEdit}
            startIcon={<EditIcon />}
            sx={{
              margin: 1,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293',
              },
              borderRadius: '8px',
              boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
            }}
          >
            Edit Workgroup
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onDelete}
            startIcon={<DeleteIcon />}
            sx={{
              margin: 1,
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#9a0007',
              },
              borderRadius: '8px',
              boxShadow: '0 3px 5px 2px rgba(211, 47, 47, .3)',
            }}
          >
            Delete Workgroup
          </Button>
        </>
      ) : type === 'user' ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={onEdit}
            startIcon={<EditIcon />}
            sx={{
              margin: 1,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293',
              },
              borderRadius: '8px',
              boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
            }}
          >
            Edit User
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onDelete}
            startIcon={<DeleteIcon />}
            sx={{
              margin: 1,
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#9a0007',
              },
              borderRadius: '8px',
              boxShadow: '0 3px 5px 2px rgba(211, 47, 47, .3)',
            }}
          >
            Delete User
          </Button>
        </>
      ) : onClick ? (
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          sx={{
            margin: 1,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            },
            borderRadius: '8px',
            boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
          }}
        >
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

export default ActionButtons;