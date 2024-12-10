import PropTypes from 'prop-types'; 
import Typography from '@mui/material/Typography';

const ErrorMessage = ({ message, color = "error" }) => {
  return <Typography color={color}>{message}</Typography>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired, 
  color: PropTypes.string,              
};

export default ErrorMessage;
