import { toast } from "react-toastify";
import { fetchProjectDetails } from "./httpProjects";
import { Box, Card, CardContent, CircularProgress, Container, createTheme, Grid2 as Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
// إنشاء ثيم مخصص
const theme = createTheme({
    palette: {
        primary: { main: '#3f51b5' },
        secondary: { main: '#f50057' },
    },
});

export default function ProjectDetailsHeader({ projectDetails }) {
    const { name, customerName, supervisorName, startDate, status, endDate, team } = projectDetails || {};

    const projectData = [
        { title: "Project Name", value: name, bgColor: "#f5f5f5", borderColor: theme.palette.primary.main },
        { title: "Customer", value: customerName, bgColor: "#e3f2fd", borderColor: theme.palette.secondary.main },
        { title: "Supervisor", value: supervisorName, bgColor: "#e8f5e9", borderColor: "#43a047" },
        { title: "Start Date", value: startDate ? new Date(startDate).toLocaleDateString() : 'Not available', bgColor: "#fff8e1", borderColor: "#ffb300" },
        { title: "Status", value: status, bgColor: "#fbe9e7", borderColor: "#d84315" },
        { title: "End Date", value: startDate ? new Date(startDate).toLocaleDateString() : 'Still Active', bgColor: "#ede7f6", borderColor: "#6a1b9a" },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" sx={{ mb: 4, color: theme.palette.primary.main }}>
                Project Details
            </Typography>

            {/* شبكة التوزيع لضبط 3 بطاقات في كل صف */}
            <Grid container spacing={3}>
                {projectData.map((item, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6, md: 4}}>
                        <Card sx={{
                            backgroundColor: item.bgColor,
                            borderLeft: `5px solid ${item.borderColor}`,
                            flexGrow: 1,
                        }}>
                            <CardContent>
                                <Typography variant="h5" color="primary">{item.title}</Typography>
                                <Typography variant="body1" color="text.primary">{item.value || 'Not available'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* قسم فريق العمل */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ backgroundColor: '#f3e5f5', borderLeft: '5px solid #8e24aa' }}>
                        <CardContent>
                            <Typography variant="h5" color="primary">Team Members</Typography>
                            <Typography variant="body1" color="text.primary">
                                {team?.length > 0 ? team.map(member => member.name).join(', ') : 'No team members available'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}