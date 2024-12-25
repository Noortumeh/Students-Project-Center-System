import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProgressCircle from './ProgressCircle';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';

export default function TaskProgressCard({ title, buttonName, link, percentage, status, ...props }) {
  const navigate = useNavigate();
  return (
    <Card sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: {sm: '300px', md: '400px'},
      backgroundColor: "#543DE4",
      boxShadow: "10",
      borderRadius: 4,
      ...props.sx
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', color: 'white' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <CustomButton onClick={() => navigate(`${link}`)}>{buttonName}</CustomButton>
        </CardContent>
      </Box>
      <Box>
        <CardContent sx={{ flex: '1 0 auto' }}>
          {percentage!== undefined && <ProgressCircle percentage={percentage} style={{
            pathColor: `#4caf50`,
            textColor: '#FFF',
            trailColor: '#d6d6d6',
          }} />}
          {status ? <Typography component="div" variant="h5" sx={{ color: '#543DE4' }}>
            {status}
          </Typography> : null}
        </CardContent>
      </Box>
    </Card>
  );
}
