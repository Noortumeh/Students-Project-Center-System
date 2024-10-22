import React, { useState } from 'react';
import { Button, Typography, List, ListItem, ListItemText, Paper, IconButton, CircularProgress } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const PublishingProjects = () => {
  const [projects, setProjects] = useState([
    { title: 'Project A', status: 'Published' },
    { title: 'Project B', status: 'Draft' },
  ]);
  const [loading, setLoading] = useState(false); // حالة التحميل

  const deleteProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const addProject = () => {
    setLoading(true); // بدء التحميل

    // محاكاة عملية إضافة المشروع
    setTimeout(() => {
      const newProject = { title: `Project ${String.fromCharCode(67 + projects.length)}`, status: 'Draft' };
      setProjects([...projects, newProject]);
      setLoading(false); // إنهاء التحميل
    }, 2000); // محاكاة تأخير 2 ثانية
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Publishing Projects
      </Typography>
      <List>
        {projects.map((project, index) => (
          <ListItem key={index}>
            <ListItemText primary={project.title} secondary={`Status: ${project.status}`} />
            <IconButton edge="end" aria-label="edit">
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteProject(index)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addProject} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Project'}
      </Button>
    </Paper>
  );
};

export default PublishingProjects;
