import { useEffect, useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Stack } from "react-bootstrap";
import { AttachFileOutlined, Delete, Download } from "@mui/icons-material";

const DateLabelStyle = {
    "& .MuiInputLabel-root": {
        transform: "translate(14px, -9px) scale(0.75)",
        background: "#fff",
        paddingX: 1
    }
};
export default function TaskForm({ onSubmit, onCancel, isPending, inputData }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    // عند استقبال البيانات، تخزين الملفات كاملة كما هي
    useEffect(() => {
        if (inputData?.questionFiles) {
            setSelectedFiles(inputData.questionFiles);
        }
    }, [inputData]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleDownload = (url) => {
        window.open(url, '_blank');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('QuestionFile', selectedFiles);
        // إرسال البيانات إلى الخادم
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField defaultValue={inputData?.title} label="Title" name="Title" required />
                <TextField defaultValue={inputData?.description} label="Description" name="Description" multiline rows={3} />
                <TextField defaultValue={inputData?.start} label="Start Date" name="Start" type="datetime-local" sx={DateLabelStyle} required />
                <TextField defaultValue={inputData?.end} label="End Date" color="primary" name="End" type="datetime-local" sx={DateLabelStyle} required />

                {/* File Upload Section */}
                <Stack spacing={2}>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AttachFileOutlined />}
                    >
                        Upload Files
                        <input
                            type="file"
                            hidden
                            multiple
                            onChange={handleFileChange}
                            name="QuestionFile"
                        />
                    </Button>
                    {/* عرض الملفات المحددة */}
                    {selectedFiles.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Attached Files ({selectedFiles.length}):
                            </Typography>
                            <Stack spacing={1}>
                                {selectedFiles.map((file, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            p: 1,
                                            bgcolor: 'background.default',
                                            borderRadius: 1,
                                            border: '1px solid',
                                            borderColor: 'divider'
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                            {file.name}
                                        </Typography>
                                        <Box>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDownload(file.path)}
                                            >
                                                <Download fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleRemoveFile(index)}
                                                color="error"
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Stack>
                {/* Buttons */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'flex-end',
                    mt: 1
                }}>
                    {isPending && 'Submitting...'}
                    {!isPending && <><Button
                        type="button"
                        variant="outlined"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {inputData ? "Update Task" : "Add Task"}
                        </Button></>}
                </Box>
            </Box>
        </form>
    );
}
