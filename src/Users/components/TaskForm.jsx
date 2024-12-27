import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "react-bootstrap";
import { AttachFileOutlined } from "@mui/icons-material";

const DateLabelStyle = {
    "& .MuiInputLabel-root": {
        transform: "translate(14px, -9px) scale(0.75)",
        background: "#fff",
        paddingX: 1
    }
};

export default function TaskForm({ onSubmit, onCancel, isPending }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    return (
        <form onSubmit={onSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Title" name="Title" required />
                <TextField label="Description" name="Description" multiline rows={3} />
                <TextField label="Start Date" name="Start" type="datetime-local" sx={DateLabelStyle} required />
                <TextField label="End Date" color="primary" name="End" type="datetime-local" sx={DateLabelStyle} required />
                {/* File Upload */}
                <Stack spacing={1}>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AttachFileOutlined />}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            name="taskFile"
                        />
                    </Button>
                    {selectedFile && (
                        <Typography variant="body2" color="text.secondary">
                            Selected file: {selectedFile.name}
                        </Typography>
                    )}
                </Stack>
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
                            Add Task
                        </Button></>}
                </Box>
            </Box>
        </form>
    );
}
