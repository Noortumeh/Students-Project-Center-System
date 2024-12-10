import PropTypes from 'prop-types'; 
import Box from '@mui/material/Box';

const UserStatus = ({ status }) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        padding: '5px 10px',
        borderRadius: '20px',
        backgroundColor: status === 'Current' ? 'green' : 'gray',
        color: 'white',
      }}
    >
      {status}
    </Box>
  );
};

UserStatus.propTypes = {
  status: PropTypes.oneOf(['Current', 'Inactive']).isRequired, 
};

export default UserStatus;
