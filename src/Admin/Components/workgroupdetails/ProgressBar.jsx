import PropTypes from 'prop-types';  
import { Box, LinearProgress, Typography } from '@mui/material';

const ProgressBar = ({ value }) => (
  <Box display="flex" justifyContent="center" alignItems="center" marginTop={4}>
    <Box position="relative" display="inline-flex">
      <Typography variant="h6">{value}%</Typography>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
    </Box>
  </Box>
);

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,  
};

export default ProgressBar;
