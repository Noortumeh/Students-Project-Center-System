import { Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import TaskForm from "../../../../components/TaskForm";
import useTaskData from "../WorkgroupCustomHook/useTaskData";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteTask, queryClient, updateTask } from "../../../../../util/httpsForUser/https";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../../components/ConfirmDialog";

export default function EditTask() {
    const { taskid } = useParams();
    const navigate = useNavigate();
    //Get Task Data
    const { taskData, taskDataLoading, taskDataErr } = useTaskData(taskid);
    //Put update task data
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Updated successfully!')
            navigate('../tasks');
        }
    });
    // Mutation for deleting task
    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            navigate('../tasks');
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        }
    });

    const handleSubmit = (formData) => {
        mutate({ formData, taskid });
    };
    
    const handleDelete = () => {
        deleteMutate(taskid);
    };
    const { showConfirmDialog } = ConfirmDialog({
        title: "Are you sure you want to delete this task?",
        text: "This action cannot be undone!",
        onConfirm: handleDelete
    });

    if (taskDataLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    if (taskDataErr) {
        toast.error(`something wrong! ${taskDataErr.message}`);
    }
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Task Details
                </Typography>
                <TaskForm
                    inputData={taskData}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate(-1)}
                    isPending={isPending}
                />
                <Box sx={{ mt: 2 }}>
                    <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={showConfirmDialog}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Task"}
                    </Button>
                </Box>
                {isError && <Typography color="error">{error.message}</Typography>}
            </Paper>
        </Container>
    );
}