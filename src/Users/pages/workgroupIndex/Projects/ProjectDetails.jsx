import { Box, Button, CircularProgress, Container, Grid2, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createProjectSection, fetchProjectDetails, updateProjectOverview } from "./httpProjects";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectSections from "./ProjectSections";
import { Add } from "@mui/icons-material";
import { queryClient } from "../../../../util/httpsForUser/https";
import Swal from "sweetalert2";
import OverviewSectionImage from "../../../../assets/images/OverviewSection.png"

export default function ProjectDetailsWork() {
    const { projectId } = useParams();
    const [newSection, setNewSection] = useState({ name: '' });
    const [overviewText, setOverviewText] = useState('');
    const isSupervisor = JSON.parse(localStorage.getItem('userInfo')).role.includes('supervisor');
    const [isStudent, setIsStudent] = useState(false);
    // Project Details
    const { data: projectDetails, isLoading: detailsLoading, error: detailsError } = useQuery({
        queryKey: ['projectDetails', projectId],
        queryFn: () => fetchProjectDetails(projectId),
        enabled: Boolean(projectId),
        onSuccess: (data) => {
            setOverviewText(data.overview || '');
        },
        onError: () => {
            toast.error('Failed to fetch project details');
        },
    });

    useEffect(() => {
        if (projectDetails?.overview) {
            setOverviewText(projectDetails.overview);
        }
        setIsStudent(!(JSON.parse(localStorage.getItem('userInfo')).role.includes('supervisor')) && !(JSON.parse(localStorage.getItem('userInfo')).user.id === projectDetails?.customerId));
    }, [projectDetails]);

    const createSectionMutation = useMutation({
        mutationFn: (sectionData) => createProjectSection(projectId, sectionData),
        onSuccess: () => {
            queryClient.invalidateQueries(['projectDetails', projectId]);
            Swal.fire('Success', 'Section added successfully!', 'success');
        },
        onError: (error) => {
            console.error('Error creating project section:', error);
            Swal.fire('Error', 'Failed to add section', 'error');
        },
    });

    const updateOverviewMutation = useMutation({
        mutationFn: (newOverview) => updateProjectOverview(projectId, newOverview),
        onSuccess: () => {
            queryClient.invalidateQueries(['projectDetails', projectId]);
            Swal.fire('Success', 'Overview updated successfully!', 'success');
        },
        onError: (error) => {
            console.error('Error updating overview:', error);
            Swal.fire('Error', 'Failed to update overview', 'error');
        },
    });

    const handleAddProjectSection = () => {
        if (!newSection.name) {
            Swal.fire('Error', 'Section name is required', 'error');
            return;
        }
        createSectionMutation.mutate(newSection);
        setNewSection({ name: '' });
    };

    const handleSaveOverview = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Save it!"
        }).then((result) => {
            if (result.isConfirmed) {
                updateOverviewMutation.mutate(overviewText);
            }
        });
    };

    if (detailsLoading) {
        return <Box sx={{ textAlign: 'center', mt: 7 }}><CircularProgress /></Box>;
    }
    if (detailsError) {
        return (
            <Box sx={{ textAlign: "center", mt: 7 }}>
                <Typography color="error">{detailsError.message}</Typography>
            </Box>
        );
    }
    
    return (
        <Box>
            {/* Project Details Section */}
            <ProjectDetailsHeader projectDetails={projectDetails} />

            {/* Overview Section */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 2, color: '#3f51b5' }}>Overview</Typography>
                <Grid2 display={{lg: "flex"}} columns={12} alignItems={'center'} justifyContent={'center'} >
                    {/* sx={{ display: 'flex', alignItems: 'center', gap: 4 }} */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Box component="img" src={OverviewSectionImage} alt="Project Overview" sx={{ width: {xs: 200, sm:300, md:400}, height: {xs: 200, sm:300} }} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }} sx={{ flex: 1, width: {xs: "90%", md:"60%"} }}>
                        <TextField
                            label="Project Overview"
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={4}
                            value={overviewText}
                            onChange={(e) => setOverviewText(e.target.value)}
                            disabled={updateOverviewMutation.isLoading || !isStudent}
                            sx={{ mb: 2 }}
                        />
                        {isStudent &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveOverview}
                                disabled={updateOverviewMutation.isLoading}
                            >
                                {updateOverviewMutation.isLoading ? <CircularProgress size={24} /> : 'Save Overview'}
                            </Button>}
                    </Grid2>
                </Grid2>
            </Container>

            {/* Add Section */}
            {isSupervisor &&
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box sx={{ mt: 4, width: '60%' }}>
                        <Typography variant="h4" sx={{ mb: 2, color: '#3f51b5' }}>Add Project Section</Typography>
                        <TextField
                            label="Section Name"
                            variant="outlined"
                            fullWidth
                            value={newSection.name}
                            onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddProjectSection} startIcon={<Add />}>
                            Add Section
                        </Button>
                    </Box>
                </Container>
            }

            {/* Project Sections */}
            <ProjectSections projectId={projectId} data={projectDetails.projectDetails} isSupervisor={isSupervisor} isStudent={isStudent} />
        </Box>
    );
}
