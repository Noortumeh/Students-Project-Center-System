import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import ActionButtons from '../../../Components/generalcomponent/ActionButtons.jsx';
import SelectItem from '../../../Components/generalcomponent/SelectItem.jsx';
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';

function SelectStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (student) => {
    if (!selectedStudents.includes(student)) {
      setSelectedStudents((prev) => [...prev, student]);
    }
  };

  const handleRemove = (student) => {
    setSelectedStudents(selectedStudents.filter(s => s !== student));
  };

  const handleSave = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate('/workgroup/CreateWorkGroup', {
      state: { ...location.state, selectedStudents }
    });

    setLoading(false);
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={3} maxWidth="sm">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center">
            Select Students
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ActionButtons 
            onClick={() => handleSelect("Student 1")} 
            label="Select Student 1"
            type="user"
          />
        </Grid>
        <Grid item xs={6}>
          <ActionButtons 
            onClick={() => handleSelect("Student 2")} 
            label="Select Student 2"
            type="user"
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography variant="h6">Selected Students:</Typography>
          <SelectItem 
            selectedItems={selectedStudents} 
            onRemove={handleRemove} 
            itemType="student"
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <LoadingButton onClick={handleSave} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectStudent;
