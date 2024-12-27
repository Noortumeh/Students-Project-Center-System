import { Container, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../../../components/TaskForm';
import { useMutation } from "@tanstack/react-query";
import { createTask, queryClient } from "../../../../util/httpsForUser/https";

export default function AddTask() {
    const navigate = useNavigate();
    const { workgroupId } = useParams();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (data) => createTask(data, workgroupId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks', workgroupId]});
            navigate('../tasks');
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        mutate(data);
    };
    if(isError){
        return <div>Error: {error.message}</div>;
    }
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Task
                </Typography>
                <TaskForm
                    onSubmit={handleSubmit}
                    onCancel={() => navigate(-1)}
                    isPending = {isPending}
                />
            </Paper>
        </Container>
    );
}