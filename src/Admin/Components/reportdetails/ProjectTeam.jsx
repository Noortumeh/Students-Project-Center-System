import PropTypes from 'prop-types'; 
import { Box, Grid, Card, Typography, Avatar } from '@mui/material';

function ProjectTeam({ team }) {
  // فحص إذا كانت البيانات غير موجودة أو فارغة
  if (!team || team.length === 0) {
    return (
      <Box mt={4}>
        <Typography variant="h6" sx={{ color: '#e63946' }}>
          No team members available
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#e63946' }}>
        Project Team
      </Typography>
      <Grid container spacing={2}>
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', boxShadow: 3, backgroundColor: '#edf2f4' }}>
              <Avatar sx={{ mr: 2, backgroundColor: '#e63946' }}>{member.charAt(0)}</Avatar>
              <Typography variant="body1">{member}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

ProjectTeam.propTypes = {
  team: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProjectTeam;
