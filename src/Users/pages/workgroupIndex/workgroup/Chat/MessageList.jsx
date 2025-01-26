import { Box, Typography } from "@mui/material";

const MessageList = ({ messages = [] }) => {
  return (
    <Box
      sx={{
        height: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        marginTop: 2,
      }}
    >
      {messages.map((msg, index) => (
        <Box key={index} sx={{ marginBottom: 1 }}>
          <Typography variant="body1">
            <strong>{msg.user}:</strong><br></br>
            {msg.content}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
