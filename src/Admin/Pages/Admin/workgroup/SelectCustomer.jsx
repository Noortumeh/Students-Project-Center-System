import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Box, Typography, Grid, CircularProgress } from '@mui/material';

function SelectCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleSelect = async (customer) => {
    setLoading(true);
    
    // محاكاة تحميل البيانات (يمكن استبدالها بإجراء حقيقي إذا لزم الأمر)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate('/workgroup/CreateWorkGroup', {
      state: { ...location.state, selectedCustomer: customer },
    });

    setLoading(false);
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
            disabled={loading} // تعطيل الزر أثناء التحميل
          >
            {loading ? <CircularProgress size={24} /> : 'Customer 1'}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => handleSelect('Customer 2')}
            sx={{ padding: '10px', fontSize: '1.1rem' }}
            disabled={loading} // تعطيل الزر أثناء التحميل
          >
            {loading ? <CircularProgress size={24} /> : 'Customer 2'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectCustomer;
