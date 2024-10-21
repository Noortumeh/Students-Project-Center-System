import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Announcements = ({ project }) => {
  // تحقق من وجود المشروع
  if (!project) {
    return null; // إذا لم يكن المشروع موجودًا، عد فارغًا
  }

  return (
    <Card sx={{ marginBottom: 2 }}> {/* أضف مسافة بين البطاقات */}
      <CardContent>
        <Typography variant="h5" component="h2">
          {project.title}
        </Typography>
        <Typography variant="body1">
          {project.description}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Date: {project.date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Announcements;
