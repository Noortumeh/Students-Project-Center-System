/* eslint-disable react/prop-types */
import { Grid, Card, ListItemText } from '@mui/material';

function ProjectInfo({ report }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#ffe8d6' }}>
          <ListItemText primary="Project Title" secondary={report.title} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#ffe8d6' }}>
          <ListItemText primary="Supervisor" secondary={report.supervisor} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#ffe8d6' }}>
          <ListItemText primary="Customer" secondary={report.customer} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#ffe8d6' }}>
          <ListItemText primary="Project Start Date" secondary={report.startDate} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#ffe8d6' }}>
          <ListItemText primary="Project Completion Date" secondary={report.endDate} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#ffe8d6' }}>
          <ListItemText primary="Budget" secondary={report.budget} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#ffe8d6' }}>
          <ListItemText primary="Progress" secondary={report.progress} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#ffe8d6' }}>
          <ListItemText primary="Deadline" secondary={report.deadline} />
        </Card>
      </Grid>
    </Grid>
  );
}


export default ProjectInfo;
