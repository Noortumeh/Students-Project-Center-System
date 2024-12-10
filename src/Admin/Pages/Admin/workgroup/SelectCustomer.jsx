import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import ActionButtons from '../../../Components/generalcomponent/ActionButtons.jsx';
import SelectItem from '../../../Components/generalcomponent/SelectItem.jsx';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';

function SelectCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleSelect = (customer) => {
    if (!selectedCustomers.includes(customer)) {
      setSelectedCustomers((prev) => [...prev, customer]);
    }
  };

  const handleRemove = (customer) => {
    setSelectedCustomers((prev) => prev.filter((item) => item !== customer));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate('/workgroup/CreateWorkGroup', {
      state: { ...location.state, selectedCustomers },
    });
    setLoading(false);
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={3} maxWidth="sm">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center">
            Select Customers
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ActionButtons 
            onEdit={() => handleSelect('Customer 1')} 
            onDelete={() => handleRemove('Customer 1')} 
            type="customer" 
          />
        </Grid>
        <Grid item xs={6}>
          <ActionButtons 
            onEdit={() => handleSelect('Customer 2')} 
            onDelete={() => handleRemove('Customer 2')} 
            type="customer" 
          />
        </Grid>
        <Grid item xs={12}>
          <SelectItem 
            selectedItems={selectedCustomers} 
            onRemove={handleRemove} 
            itemType="Customer" 
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton onClick={handleSave} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectCustomer;
