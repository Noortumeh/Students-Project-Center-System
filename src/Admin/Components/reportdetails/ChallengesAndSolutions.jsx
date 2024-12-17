/* eslint-disable react/prop-types */
import { Box, Typography, Card } from '@mui/material';

function ChallengesAndSolutions({ challenges }) {
  return (
    <Box mt={4}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#e63946' }}>
        Challenges and Solutions
      </Typography>
      <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#f1faee' }}>
        <ul>
          {challenges.map((challenge, index) => (
            <li key={index}>
              <Typography variant="body1"><strong>Challenge:</strong> {challenge.problem}</Typography>
              <Typography variant="body1"><strong>Solution:</strong> {challenge.solution}</Typography>
            </li>
          ))}
        </ul>
      </Card>
    </Box>
  );
}

export default ChallengesAndSolutions;
