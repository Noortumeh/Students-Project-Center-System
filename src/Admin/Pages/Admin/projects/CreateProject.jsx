// CreateProject.jsx
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProject({ onAddProject }) {
  const [projectName, setProjectName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [customer, setCustomer] = useState('');
  const [team, setTeam] = useState('');
  const [workgroup, setWorkgroup] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // إنشاء المشروع الجديد
    const newProject = {
      id: Date.now(), // معرّف فريد للمشروع
      projectName,
      supervisor,
      customer,
      team,
      workgroup
    };
    
    // استدعاء الدالة من المكون الرئيسي لإضافة المشروع
    onAddProject(newProject);
    
    // عرض رسالة النجاح باستخدام toast
    toast.success('Project created successfully!');
    
    // إعادة التوجيه إلى صفحة المشاريع
    navigate('/projects/Projects');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Project
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* حقل اسم المشروع */}
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* حقل اسم المشرف */}
          <TextField
            label="Supervisor"
            variant="outlined"
            fullWidth
            required
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* حقل اسم العميل */}
          <TextField
            label="Customer"
            variant="outlined"
            fullWidth
            required
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* قائمة الفرق */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="team-label">Team</InputLabel>
            <Select
              labelId="team-label"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              label="Team"
            >
              <MenuItem value="Team A">Team A</MenuItem>
              <MenuItem value="Team B">Team B</MenuItem>
              <MenuItem value="Team C">Team C</MenuItem>
            </Select>
          </FormControl>

          {/* قائمة مجموعة العمل */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="workgroup-label">Workgroup</InputLabel>
            <Select
              labelId="workgroup-label"
              value={workgroup}
              onChange={(e) => setWorkgroup(e.target.value)}
              label="Workgroup"
            >
              <MenuItem value="Group 1">Group 1</MenuItem>
              <MenuItem value="Group 2">Group 2</MenuItem>
              <MenuItem value="Group 3">Group 3</MenuItem>
            </Select>
          </FormControl>

          {/* زر الإرسال */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
          >
            Create Project
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
