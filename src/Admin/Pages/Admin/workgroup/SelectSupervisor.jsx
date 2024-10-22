import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Grid, CircularProgress } from '@mui/material';

function SelectSupervisor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false); // حالة اللودر

  const handleSelect = async (supervisor) => {
    setLoading(true); // بدء التحميل

    // محاكاة تحميل البيانات (يمكن استبدالها بإجراء حقيقي إذا لزم الأمر)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate('/workgroup/CreateWorkGroup', {
      state: { ...location.state, selectedSupervisor: supervisor }
    });

    setLoading(false); // إنهاء التحميل
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={3} maxWidth="sm">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center">
            Select Supervisor
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleSelect('Supervisor 1')}
            sx={{ padding: '10px', fontSize: '1rem' }}
            disabled={loading} // تعطيل الزر أثناء التحميل
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Supervisor 1'}
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleSelect('Supervisor 2')}
            sx={{ padding: '10px', fontSize: '1rem' }}
            disabled={loading} // تعطيل الزر أثناء التحميل
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Supervisor 2'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectSupervisor;
