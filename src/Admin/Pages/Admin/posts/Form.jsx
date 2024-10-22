import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
} from '@mui/material';
import { Person, AttachMoney, CalendarToday, Description, People, Assignment } from '@mui/icons-material';

export default function ProjectForm() {
  const [loading, setLoading] = useState(false); // حالة التحميل

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // بدء التحميل

    // محاكاة عملية إرسال البيانات
    setTimeout(() => {
      // هنا يمكنك وضع الكود الفعلي لإرسال البيانات
      setLoading(false); // إنهاء التحميل
      alert('Project submitted successfully!'); // رسالة تأكيد
    }, 2000); // محاكاة تأخير 2 ثانية
  };

  return (
    <Box mt={5} sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
      <Grid container justifyContent="center">
        <Grid item lg={8}>
          <Card sx={{ p: 3, boxShadow: 5, backgroundColor: '#edf2f4' }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1d3557' }}>
                Create New Project
              </Typography>
              <Divider sx={{ mb: 4 }} />

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Project Title */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Project Title"
                      placeholder="Enter project title"
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Person sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Supervisor */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Supervisor"
                      placeholder="Enter supervisor name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Person sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Customer */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Customer"
                      placeholder="Enter customer name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Person sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Budget */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Budget"
                      placeholder="Enter project budget"
                      variant="outlined"
                      InputProps={{
                        startAdornment: <AttachMoney sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Start Date */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: <CalendarToday sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Deadline */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Deadline"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: <CalendarToday sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Progress */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Progress</InputLabel>
                      <Select
                        variant="outlined"
                        defaultValue=""
                        label="Progress"
                      >
                        <MenuItem value={0}>0%</MenuItem>
                        <MenuItem value={25}>25%</MenuItem>
                        <MenuItem value={50}>50%</MenuItem>
                        <MenuItem value={75}>75%</MenuItem>
                        <MenuItem value={100}>100%</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Team Members */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Team Members"
                      placeholder="Enter team members (comma separated)"
                      variant="outlined"
                      InputProps={{
                        startAdornment: <People sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Objectives */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Objectives"
                      placeholder="Enter project objectives"
                      multiline
                      rows={4}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Description sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Challenges */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Challenges"
                      placeholder="Describe the challenges"
                      multiline
                      rows={4}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Assignment sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  {/* Recommendations */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Recommendations"
                      placeholder="Enter recommendations"
                      multiline
                      rows={4}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Assignment sx={{ color: '#e63946', mr: 1 }} />,
                      }}
                    />
                  </Grid>
                </Grid>

                <Box mt={4} display="flex" justifyContent="center">
                  <Button variant="contained" color="primary" sx={{ backgroundColor: '#e63946' }} type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Submit Project'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
