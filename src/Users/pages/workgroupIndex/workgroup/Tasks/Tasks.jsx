import { Box, Grid2 as Grid, Container, CircularProgress } from "@mui/material";
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
    if (isLoading || tasksLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    if (error || tasksErr) {
        return <div>Error: {error.message || tasksErr.message}</div>;
    }
    return (
        <Container maxWidth="lg"
        >
            {WorkgroupData.role === 'supervisor' && <CustomButton
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
                        percentage={WorkgroupData.progress}
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
                        onClick={() => handleFilterClick('todo')}
                        isActive={activeFilter === 'todo'}
                        sx={{ flex: 1 }}
                    >To Do</CustomButton>
                    <CustomButton
                        onClick={() => handleFilterClick('inProgress')}
                        isActive={activeFilter === 'inProgress'}
                        sx={{ flex: 1 }}
                    >In Progress</CustomButton>
                </Box>

                {/* شبكة البطاقات */}
                {tasks ? <Grid container justifyContent="center"  alignItems="center"  style={{ minHeight: '100vh' }} spacing={3} columns={12}>
                    {tasks.map((task) => (
                        <Grid xs={12} sm={6} md={4} key={task.id}>
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
                                {WorkgroupData.role === 'supervisor' && <CustomButton onClick={() => navigate(`edittask/${task.id}`)}>edit</CustomButton>}
                            </TaskProgressCard>
                        </Grid>
                    ))
                    }
                </Grid> : <h1>No Tasks</h1>}
            </Box>
        </Container>
    );
}