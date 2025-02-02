import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function HelpPage() {
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                System User Guide
            </Typography>
            <Typography variant="body1" paragraph>
                This page provides guidance on how to use the Student Project Management System and its features.
            </Typography>

            {/* 1. Accessing Workgroups */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">📂 Accessing Workgroups</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Navigate to the <strong>Workgroups</strong> section from the sidebar.
                        <br />Use the available buttons:
                        <ul>
                            <li><strong>My Workgroups:</strong> View and access your assigned workgroups.</li>
                            <li><strong>My Projects:</strong> See project details and updates.</li>
                            <li><strong>All Tasks (Supervisors only):</strong> Track all tasks assigned within workgroups.</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* 2. Inside a Workgroup */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">🔍 Inside a Workgroup</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Click <strong>"Enter"</strong> on a workgroup to access its details.
                        <ul>
                            <li>Track project progress and see all assigned tasks.</li>
                            <li>Respond to tasks and provide updates.</li>
                            <li>Schedule meetings using the built-in meeting tool.</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* 3. Supervisor Features */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">👨‍🏫 Supervisor Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        As a supervisor, you can:
                        <ul>
                            <li><strong>Manage Tasks:</strong> Create new tasks, assign them to students, and track progress.</li>
                            <li><strong>Add Members:</strong> Invite new students or assistant supervisors to the workgroup.</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* 4. Project Management */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">📌 Project Management</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        In the <strong>Projects</strong> section, users can:
                        <ul>
                            <li>View detailed project information.</li>
                            <li><strong>Supervisors:</strong> Can add a main title.</li>
                            <li><strong>Students:</strong> Can add subheadings and descriptions.</li>
                            <li>Include a <strong>brief project summary</strong> for easy reference.</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* 5. General Features */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">⚙️ General Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        The system provides various features to help you manage your work:
                        <ul>
                            <li><strong>Monitor Project Progress:</strong> See real-time updates on milestones and team activity.</li>
                            <li><strong>View Team Members:</strong> Check who is part of the project.</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* 6. Terms & Policies */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">📜 Terms & Policies</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Access the <strong>Terms of Service</strong> to understand system rules and usage guidelines.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}