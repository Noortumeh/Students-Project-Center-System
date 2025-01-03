import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    IconButton,
    CircularProgress
} from '@mui/material';
import { Download, CloudUpload, Delete } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import useTaskData from '../WorkgroupCustomHook/useTaskData';
import { useMutation } from '@tanstack/react-query';
import { queryClient, submitAnswer } from '../../../../../util/httpsForUser/https';
import { toast } from 'react-toastify';

export default function ViewTaskDetails() {
    const navigate = useNavigate();
    const { taskid } = useParams();
    const { taskData: task, taskDataLoading: isLoading, taskDataErr: error } = useTaskData(taskid);
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
    const [submitFiles, setSubmitFiles] = useState([]);
    // submit Task
    const { mutate, isLoading: submitting } = useMutation({
        mutationFn: submitAnswer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task', taskid] });
            toast.success('Submit successfully!')
        }
    })

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) return <div>Error: {error.message}</div>;

    console.log(task);

    const handleFileDownload = (fileUrl, fileName) => {
        window.open(fileUrl, '_blank');
    };

    const handleFileSubmit = (event) => {
        const newFiles = Array.from(event.target.files);
        setSubmitFiles(prev => [...prev, ...newFiles]);
    };
    const handleRemoveFile = (indexToRemove) => {
        setSubmitFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };
    const handleSubmit = () => {
        const formData = new FormData();
        submitFiles.forEach((file, index) => {
            formData.append(`File`, file); // استخدام نفس الاسم للمفتاح يجعل الملفات في مصفوفة
        });
        mutate({ formData, taskid });
        setOpenSubmitDialog(false);
        setSubmitFiles([]);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                {/* عنوان المهمة */}
                <Typography variant="h4" gutterBottom>
                    {task.title}
                </Typography>

                {/* التواريخ */}
                <Box sx={{ my: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                        Start Date: {task.start}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        End Date: {task.end}
                    </Typography>
                </Box>

                {/* الحالة */}
                <Typography
                    variant="h6"
                    sx={{
                        color: task.status === 'completed' ? 'success.main' : 'info.main',
                        mb: 2
                    }}
                >
                    Status: {task.status}
                </Typography>

                {/* الوصف */}
                <Typography variant="body1" sx={{ my: 3 }}>
                    {task.description}
                </Typography>

                {/* ملفات المهمة */}
                {task.questionFiles && task.questionFiles.length > 0 && (
                    <Stack spacing={1} sx={{ mb: 3 }}>
                        <Typography variant="subtitle1">Task Files:</Typography>
                        {task.questionFiles.map((file, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                startIcon={<Download />}
                                onClick={() => handleFileDownload(file.path, file.name)}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                {file.name}
                            </Button>
                        ))}
                    </Stack>
                )}

                {/* زر التسليم */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'flex-end',
                    mt: 4
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenSubmitDialog(true)}
                    >
                        Submit Task
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </Box>
            </Paper>
            {/* ملفات التسليم */}
            {task.answerFiles && task.answerFiles.length > 0 && (
                <Stack spacing={1} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1">Submitted Files:</Typography>
                    {task.answerFiles.map((file, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            startIcon={<Download />}
                            onClick={() => handleFileDownload(file.path, file.name)}
                            sx={{ justifyContent: 'flex-start' }}
                        >
                            {file.name}
                        </Button>
                    ))}
                </Stack>
            )}
            {/* نافذة تسليم المهمة */}
            <Dialog
                open={openSubmitDialog}
                onClose={() => setOpenSubmitDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Submit Task</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<CloudUpload />}
                            fullWidth
                        >
                            Upload Files
                            <input
                                type="file"
                                hidden
                                multiple // إضافة خاصية multiple
                                onChange={handleFileSubmit}
                            />
                        </Button>

                        {/* عرض الملفات المحددة */}
                        {submitFiles.length > 0 && (
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Selected Files ({submitFiles.length}):
                                </Typography>
                                <Stack spacing={1}>
                                    {submitFiles.map((file, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                bgcolor: 'background.default',
                                                p: 1,
                                                borderRadius: 1
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                                {file.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ mx: 2 }}>
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleRemoveFile(index)}
                                                color="error"
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        )}
                    </Stack>
                </DialogContent>
                {submitting ? 'Submitting...' :
                    <DialogActions>
                        <Button onClick={() => {
                            setOpenSubmitDialog(false);
                            setSubmitFiles([]); // مسح الملفات عند الإغلاق
                        }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            disabled={submitFiles.length === 0}
                        >
                            Submit {submitFiles.length > 0 && `(${submitFiles.length} files)`}
                        </Button>
                    </DialogActions>
                }
            </Dialog>
        </Container>
    );
}