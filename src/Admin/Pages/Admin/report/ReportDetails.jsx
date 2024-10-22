import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const reportDetails = {
  '17-0163-722': {
    title: 'Graduation Project',
    supervisor: 'Dr. John Smith',
    customer: 'CANTIC, RALPH G.',
    team: ['Jane Doe (Team Leader)', 'Michael Johnson', 'Emily Davis', 'Robert Brown'],
    startDate: 'January 15, 2025',
    endDate: 'May 26, 2025',
    budget: '$10,000',
    progress: '80%',
    deadline: 'June 2025',
    objectives: [
      'Project Tracking: Monitor progress, set milestones, and manage deadlines.',
      'Task Assignment: Divide and assign tasks among team members.',
      'Communication: Enable direct communication via messaging.',
      'File Sharing: Share relevant files and documents.',
      'Report Generation: Facilitate progress and final reports submission.',
    ],
    challenges: [
      {
        problem: 'Coordinating development work between team members working remotely.',
        solution: 'Used project management system to assign tasks and integrate regular video meetings.',
      },
      {
        problem: 'Ensuring data security and privacy for student projects.',
        solution: 'Implemented data encryption and role-based access control.',
      },
      {
        problem: 'Managing different user experiences for students, supervisors, and administrators.',
        solution: 'Created customizable dashboards tailored to each user role.',
      },
    ],
  },
  '18-0123-456': {
    title: 'Research on AI',
    supervisor: 'Dr. Emily Davis',
    customer: 'SMITH, ALEX T.',
    team: ['John Doe (Team Leader)', 'Anna Scott', 'Tom White', 'Lisa Green'],
    startDate: 'March 20, 2026',
    endDate: 'August 12, 2026',
    budget: '$15,000',
    progress: '75%',
    deadline: 'August 2026',
    objectives: [
      'AI Research: Investigate new AI techniques and applications.',
      'Data Collection: Gather relevant datasets for the study.',
      'Model Training: Train and evaluate various AI models.',
      'Result Analysis: Analyze the outcomes and compare models.',
    ],
    challenges: [
      {
        problem: 'Difficulty in sourcing high-quality datasets.',
        solution: 'Collaborated with external sources to access premium datasets.',
      },
      {
        problem: 'High computational costs for model training.',
        solution: 'Used cloud services to optimize costs and resources.',
      },
    ],
  },
  '19-0456-789': {
    title: 'Big Data Analytics',
    supervisor: 'Dr. Robert Brown',
    customer: 'JOHNSON, LUCY M.',
    team: ['Chris Green (Team Leader)', 'Sara White', 'David Black', 'Anna Blue'],
    startDate: 'June 1, 2027',
    endDate: 'October 20, 2028',
    budget: '$20,000',
    progress: '90%',
    deadline: 'November 2028',
    objectives: [
      'Data Collection: Gather large datasets for analysis.',
      'Data Processing: Clean and prepare data for analysis.',
      'Model Development: Develop predictive models using machine learning.',
      'Reporting: Generate reports based on findings.',
    ],
    challenges: [
      {
        problem: 'Data inconsistency across sources.',
        solution: 'Implemented data validation and cleaning processes.',
      },
      {
        problem: 'Scalability issues with data processing.',
        solution: 'Adopted distributed computing techniques.',
      },
    ],
  },
  '20-5678-123': {
    title: 'Cloud Computing Research',
    supervisor: 'Dr. Michael White',
    customer: 'DOE, JANE A.',
    team: ['Mark Taylor (Team Leader)', 'Ella Red', 'Charlie Blue'],
    startDate: 'September 15, 2028',
    endDate: 'May 3, 2029',
    budget: '$12,000',
    progress: '70%',
    deadline: 'June 2029',
    objectives: [
      'Cloud Infrastructure: Research various cloud services and infrastructures.',
      'Cost Analysis: Evaluate costs associated with cloud services.',
      'Security Analysis: Investigate security measures in cloud computing.',
    ],
    challenges: [
      {
        problem: 'Understanding diverse cloud service models.',
        solution: 'Conducted workshops and training sessions.',
      },
      {
        problem: 'Cost management in cloud utilization.',
        solution: 'Developed a cost tracking tool.',
      },
    ],
  },
  '21-0987-654': {
    title: 'IoT for Smart Homes',
    supervisor: 'Dr. Sarah Lee',
    customer: 'MILLER, JACK D.',
    team: ['Liam Smith (Team Leader)', 'Sophia Brown', 'Emma Green'],
    startDate: 'January 10, 2029',
    endDate: 'February 17, 2030',
    budget: '$18,000',
    progress: '85%',
    deadline: 'March 2030',
    objectives: [
      'Device Integration: Research on how to integrate various IoT devices.',
      'User Experience: Improve the user interface for easier access.',
      'Security: Ensure security measures for IoT devices.',
    ],
    challenges: [
      {
        problem: 'User privacy concerns with IoT devices.',
        solution: 'Implemented end-to-end encryption for data transmission.',
      },
      {
        problem: 'Interoperability between different devices.',
        solution: 'Developed a standardized protocol for communication.',
      },
    ],
  },
};

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

function ProjectTeam({ team }) {
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

function ProjectObjectives({ objectives }) {
  return (
    <Box mt={4}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#e63946' }}>
        Objectives
      </Typography>
      <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#f1faee' }}>
        <ul>
          {objectives.map((objective, index) => (
            <li key={index}><Typography variant="body1">{objective}</Typography></li>
          ))}
        </ul>
      </Card>
    </Box>
  );
}

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

export default function ReportDetails() {
  const { reportId } = useParams(); 
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = () => {
      setLoading(true);
      const reportData = reportDetails[reportId]; 
      setReport(reportData);
      setLoading(false);
    };

    fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!report) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <Typography variant="h6">No report found with this ID.</Typography>
      </Box>
    );
  }

  return (
    <Box mt={5} sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
      <Grid container justifyContent="center">
        <Grid item lg={10}>
          <Card sx={{ p: 3, boxShadow: 5 }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1d3557' }}>
                Project Report: {report.title}
              </Typography>
              <Divider sx={{ mb: 4 }} />

              <ProjectInfo report={report} />
              <ProjectTeam team={report.team} />
              <ProjectObjectives objectives={report.objectives} />
              <ChallengesAndSolutions challenges={report.challenges} />

              <Box mt={4}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#e63946' }}>
                  Conclusion and Recommendations
                </Typography>
                <Card sx={{ p: 2, boxShadow: 3, backgroundColor: '#f1faee' }}>
                  <Typography>
                    The system successfully provided a robust platform for managing student projects, improving communication and tracking progress.
                  </Typography>
                  <Typography mt={2}>
                    Moving forward, we recommend the following improvements:
                  </Typography>
                  <ul>
                    <li><strong>Mobile Application:</strong> Develop a mobile app for easier accessibility.</li>
                    <li><strong>Integration with LMS:</strong> Integrate with systems like Moodle for enhanced experience.</li>
                    <li><strong>Advanced Analytics:</strong> Add analytics features to provide insights into project performance.</li>
                  </ul>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
