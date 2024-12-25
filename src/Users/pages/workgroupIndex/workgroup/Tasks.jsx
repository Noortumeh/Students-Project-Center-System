import { Box, Grid2 as Grid, Container } from "@mui/material";
import ProgressCircle from "../../../components/ProgressCircle";
import CustomButton from "../../../components/CustomButton";
import { useState } from "react";
import TaskProgressCard from "../../../components/TaskProgressCard";

export default function TasksPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    // مصفوفة المهام - يمكن أن تأتي من props أو API
    const tasks = [
        { id: 1, title: 'Task1ssssssssssssss', status: 'done' },
        { id: 2, title: 'Task2ssssssssssssss', status: 'done' },
        { id: 3, title: 'Task3', status: 'done' },
        { id: 4, title: 'Task4', status: 'done' },
        // يمكنك إضافة المزيد من المهام هنا
    ];

    return (
        <Container maxWidth="lg"
        >
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
                        percentage={5}
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
                <Grid container spacing={3} columns={12}>
                    {tasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <TaskProgressCard
                                title={task.title}
                                buttonName='Go to task ->'
                                link={''}
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
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}