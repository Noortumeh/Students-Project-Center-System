import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const MessageInput = ({ sendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", gap: 2, marginTop: 2 }}
        >
            <TextField
                label="Enter message"
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Send
            </Button>
        </Box>
    );
};

export default MessageInput;
