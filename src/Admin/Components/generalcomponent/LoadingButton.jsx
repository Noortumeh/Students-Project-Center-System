/* eslint-disable react/prop-types */
import { Button, CircularProgress } from '@mui/material';

const LoadingButton = ({ loading, onClick, children, variant, color }) => {
  return (
    <Button
      variant={variant} 
      color={color} 
      type="submit"
      fullWidth
      sx={{ py: 1.5, fontWeight: 'bold', fontSize: '1rem', mb: 2 }}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children || 'Submit'}
    </Button>
  );
};
export default LoadingButton;
