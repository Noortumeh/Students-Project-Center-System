import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ProgressCircle from './ProgressCircle';

export default function TaskCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', justifyContent:'center', alignItems:'center', width:'400px'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Task Name
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Task Description
          </Typography>
        </CardContent>
      </Box>
      <Box>
        <CardContent sx={{ flex: '1 0 auto' }}>
            <ProgressCircle totalTasks={5} />
        </CardContent>
      </Box>
    </Card>
  );
}
