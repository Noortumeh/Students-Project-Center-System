// ReportDetails.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import ProjectInfo from '../../../Components/reportdetails/ProjectInfo.jsx';  // مكون مخصص
import ProjectObjectives from './../../../Components/reportdetails/ProjectObjectives';  // مكون مخصص
import ProjectTeam from '../../../Components/reportdetails/ProjectTeam.jsx';  // مكون مخصص
import ChallengesAndSolutions from '../../../Components/reportdetails/ChallengesAndSolutions.jsx';  // مكون مخصص

function ReportDetails({ report }) {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#e63946' }}>
        Report Details
      </Typography>
      
      {/* Project Info Section */}
      <ProjectInfo report={report} />
      
      {/* Project Objectives Section */}
      <ProjectObjectives objectives={report.objectives} />
      
      {/* Project Team Section */}
      <ProjectTeam team={report.team} />
      
      {/* Challenges and Solutions Section */}
      <ChallengesAndSolutions challenges={report.challenges} />
    </Container>
  );
}

export default ReportDetails;
