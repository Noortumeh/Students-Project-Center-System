import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import ActionButtons from '../../../Components/generalcomponent/ActionButtons.jsx'; 
import SelectItem from '../../../Components/generalcomponent/SelectItem.jsx'; 
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx'; 

function SelectSupervisor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSupervisors, setSelectedSupervisors] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const handleSelect = async (supervisor) => {
    if (!selectedSupervisors.includes(supervisor)) {
      setSelectedSupervisors((prev) => [...prev, supervisor]);
    }
  };

  const handleRemove = (supervisor) => {
    setSelectedSupervisors(selectedSupervisors.filter(s => s !== supervisor));
  };

  const handleSave = async () => {
    setLoading(true); 

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate('/workgroup/CreateWorkGroup', {
      state: { ...location.state, selectedSupervisors }
    });

    setLoading(false); 
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
          <ActionButtons 
            onClick={() => handleSelect("Supervisor 1")} 
            label="Select Supervisor 1" 
            type="user" 
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ActionButtons 
            onClick={() => handleSelect("Supervisor 2")} 
            label="Select Supervisor 2" 
            type="user" 
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography variant="h6">Selected Supervisors:</Typography>
          <SelectItem 
            selectedItems={selectedSupervisors} 
            onRemove={handleRemove} 
            itemType="supervisor" 
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <LoadingButton 
            onClick={handleSave} 
            loading={loading} 
            variant="contained"
            color="primary"
          >
            Save and Continue
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectSupervisor;
