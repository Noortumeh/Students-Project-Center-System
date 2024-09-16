import React, { useState } from 'react';
import { Button, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { title: 'New Policy Update', date: '2023-09-10' },
    { title: 'System Maintenance', date: '2023-09-05' },
  ]);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Announcements</Typography>
      <List>
        {announcements.map((announcement, index) => (
          <ListItem key={index}>
            <ListItemText primary={announcement.title} secondary={`Date: ${announcement.date}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Add Announcement</Button>
    </Paper>
  );
}

export default Announcements;
