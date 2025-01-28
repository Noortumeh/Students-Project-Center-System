import React from 'react';
import { Card, CardContent, Box, Avatar, Typography } from '@mui/material';
/* eslint-disable react/prop-types */

function SummaryCard({ bgcolor = '#E0E0E0', icon, label, value }) {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor, marginRight: 2 }}>{icon}</Avatar>
          <Typography variant="h6" color="textSecondary">
            {label}
          </Typography>
        </Box>
        <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}




export default SummaryCard;
