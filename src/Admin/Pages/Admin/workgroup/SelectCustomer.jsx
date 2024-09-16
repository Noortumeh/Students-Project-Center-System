import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Box, Typography, Grid } from '@mui/material';

function SelectCustomer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (customer) => {
    navigate('/workgroup/CreateWorkGroup', {
      state: { ...location.state, selectedCustomer: customer },
    });
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={3} maxWidth="sm">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center">
            Select Customer
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => handleSelect('Customer 1')}
            sx={{ padding: '10px', fontSize: '1.1rem' }}
          >
            Customer 1
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => handleSelect('Customer 2')}
            sx={{ padding: '10px', fontSize: '1.1rem' }}
          >
            Customer 2
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectCustomer;
