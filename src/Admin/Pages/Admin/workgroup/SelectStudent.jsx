import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Box, Typography, Grid, Chip, CircularProgress } from '@mui/material';

function SelectStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false); // حالة اللودر

  const handleSelect = (student) => {
    if (!selectedStudents.includes(student)) {
      setSelectedStudents((prev) => [...prev, student]);
    }
  };

  const handleRemove = (student) => {
    setSelectedStudents(selectedStudents.filter(s => s !== student));
  };

  const handleSave = async () => {
    setLoading(true); // بدء التحميل

    // محاكاة تحميل البيانات (يمكن استبدالها بإجراء حقيقي إذا لزم الأمر)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate('/workgroup/CreateWorkGroup', {
      state: { ...location.state, selectedStudents }
    });

    setLoading(false); // إنهاء التحميل
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
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleSelect('Student 1')}
            sx={{ padding: '10px', fontSize: '1rem' }}
          >
            Student 1
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleSelect('Student 2')}
            sx={{ padding: '10px', fontSize: '1rem' }}
          >
            Student 2
          </Button>
        </Grid>

        {/* Selected Students Section */}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography variant="h6">Selected Students:</Typography>
          {selectedStudents.length > 0 ? (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedStudents.map((student, index) => (
                <Chip
                  key={index}
                  label={student}
                  color="primary"
                  onDelete={() => handleRemove(student)}
                  sx={{ fontSize: '1rem', padding: '5px 10px' }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No students selected yet.
            </Typography>
          )}
        </Grid>

        {/* Save Button */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSave}
            sx={{ padding: '10px', fontSize: '1.1rem' }}
            disabled={loading} // تعطيل الزر أثناء التحميل
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Students'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectStudent;
