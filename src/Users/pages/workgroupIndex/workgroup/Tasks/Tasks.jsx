import { Box, Grid2 as Grid, Container, CircularProgress, Typography, Alert } from "@mui/material";
import ProgressCircle from "../../../../components/ProgressCircle";
import CustomButton from "../../../../components/CustomButton";
import { useState } from "react";
import TaskProgressCard from "../../../../components/TaskProgressCard";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkgroup } from "../WorkgroupCustomHook/useWorkgroup";
import useTasks from "../WorkgroupCustomHook/useTasks";

export default function TasksPage() {
    const navigate = useNavigate();
    const { workgroupId } = useParams();
    const { data: WorkgroupData, isLoading, error } = useWorkgroup(workgroupId);
    const { tasks, tasksLoading, tasksErr } = useTasks(workgroupId);
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };
    const filteredTasks = tasks?.filter((task) => {
        if (activeFilter === 'all') return true;
        return task.status === activeFilter;
    });

    if (isLoading || tasksLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    if (error || tasksErr) {
        return <Alert severity="error" sx={{ mt: 1, width: { xs: '100%', md: '50%' } }}>
        {error.message || tasksErr.message}
    </Alert>;
    }
    if(!WorkgroupData){
        <Alert severity="error" sx={{ mt: 1, width: { xs: '100%', md: '50%' } }}>
            Failed to Load Workgroup Data. Please try again Later.
        </Alert>;
    }
    return (
        <Container maxWidth="lg"
        >
            {WorkgroupData && (WorkgroupData.role === "supervisor" || WorkgroupData.role === 'co-supervisor') && <CustomButton
                onClick={() => { navigate('addtask') }}
                sx={{ flex: 1 }}
            >Add Task</CustomButton>}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                py: 3
            }}>
                {/* دائرة التقدم */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <ProgressCircle
                        percentage={WorkgroupData ? WorkgroupData.progress : null}
                        style={{
                            pathColor: `#A259FF`,
                            textColor: '#A259FF',
                            trailColor: '#d6d6d6',
                            width: '150px',
                            height: '150px'
                        }}
                    />
                </Box>

                {/* أزرار التصفية */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    width: '100%',
                    maxWidth: 600,
                    mx: 'auto'
                }}>
                    <CustomButton
                        onClick={() => handleFilterClick('all')}
                        isActive={activeFilter === 'all'}
                        sx={{ flex: 1 }}
                    >All</CustomButton>
                    <CustomButton
                        onClick={() => handleFilterClick('Not Started')}
                        isActive={activeFilter === 'Not Started'}
                        sx={{ flex: 1 }}
                    >To Do</CustomButton>
                    <CustomButton
                        onClick={() => handleFilterClick('in progress')}
                        isActive={activeFilter === 'inProgress'}
                        sx={{ flex: 1 }}
                    >In Progress</CustomButton>
                </Box>

                {/* شبكة البطاقات */}
                {filteredTasks && filteredTasks.length > 0 ? (
                    <Grid container alignItems="center" spacing={3} columns={12}>
                        {filteredTasks.map((task) => (
                            <Grid key={task.id}>
                                <TaskProgressCard
                                    title={task.title}
                                    buttonName='Go to task ->'
                                    link={`viewtask/${task.id}`}
                                    status={task.status}
                                    sx={{
                                        backgroundColor: '#CAD1F7',
                                        height: '100%',
                                        width: { xs: '100%', sm: 'auto' },
                                        mx: 'auto', // توسيط البطاقة
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    {WorkgroupData && (WorkgroupData.role === 'supervisor' || WorkgroupData.role === 'co-supervisor') && <CustomButton onClick={() => navigate(`edittask/${task.id}`)}>edit</CustomButton>}
                                </TaskProgressCard>
                            </Grid>
                        ))
                        }
                    </Grid>) : <Typography component="div" variant="h4" sx={{ textAlign: 'center', mt: 3, color: '#543DE4' }}>
                    No Tasks
                </Typography>}
            </Box>
        </Container>
    );
}