import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CardComponent = ({ title, value, backgroundColor, borderColor }) => {
  return (
    <Card style={{ backgroundColor, borderLeft: `5px solid ${borderColor}` }}>
      <CardContent>
        <Typography variant="h5" color="primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {value || 'Not available'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
