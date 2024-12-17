import { Box, Grid, Paper, Typography } from '@mui/material';
/* eslint-disable react/prop-types */
import UserCard from './UserCard'; 

const Section = ({ type, details, member, onDelete }) => (
  <Box mb={4}>
    <Typography variant="h4" textAlign="center" mb={2}>
      {type}
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5">{details.name}</Typography>
          <Typography variant="body1">{details.description}</Typography>
          <Typography variant="body2">{details.email}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <UserCard user={member} onDelete={onDelete} />
      </Grid>
    </Grid>
  </Box>
);

export default Section;
