// Admin/Pages/Admin/Chat.jsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchChatMessages, sendChatMessage, joinChat, leaveChat } from '../../../util/http for admin/http.js';
import { Button, TextField, Typography, List, ListItem, Paper, CircularProgress, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

const MessageList = styled(List)(({ theme }) => ({
  height: '400px',
  overflowY: 'auto',
  border: '1px solid #ccc',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
}));

const Chat = () => {
  const workgroupName = 'a'; 
  const [newMessage, setNewMessage] = useState('');
  const [joined, setJoined] = useState(false); 

  const joinChatMutation = useMutation({
    mutationFn: joinChat,
    onSuccess: () => {
      setJoined(true); 
    },
    onError: (error) => {
      console.error('Error joining chat:', error);
    },
  });

  const leaveChatMutation = useMutation({
    mutationFn: leaveChat,
    onSuccess: () => {
      setJoined(false); 
    },
    onError: (error) => {
      console.error('Error leaving chat:', error);
    },
  });

  const { data: messages, error, isLoading } = useQuery({
    queryKey: ['chatMessages', workgroupName],
    queryFn: () => fetchChatMessages(workgroupName),
    enabled: joined, 
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: () => {
      setNewMessage(''); 
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessageMutation.mutate({ workgroupName, message: newMessage });
  };

  const handleJoinChat = () => {
    joinChatMutation.mutate(workgroupName); 
  };

  const handleLeaveChat = () => {
    leaveChatMutation.mutate(workgroupName);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    ); 
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>; 
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Chat Page
      </Typography>

      {!joined && (
        <Box display="flex" justifyContent="center" mb={2}>
          <Button variant="contained" color="primary" onClick={handleJoinChat}>
            Join Chat
          </Button>
        </Box>
      )}

      {joined && (
        <>
          <MessageList>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ padding: '8px 16px', marginBottom: 1, backgroundColor: '#e0f7fa', borderRadius: 1 }}>
                {message.content}
              </ListItem>
            ))}
          </MessageList>

          <form onSubmit={handleSendMessage}>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                fullWidth
                label="Type your message"
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
                size="small"
                InputProps={{
                  style: {
                    borderRadius: 25,
                  },
                }}
              />
              <Button type="submit" variant="contained" color="secondary" sx={{ height: '100%' }} disabled={sendMessageMutation.isLoading}>
                <SendIcon />
              </Button>
            </Box>
          </form>

          <Box display="flex" justifyContent="center">
            <Button variant="outlined" color="error" onClick={handleLeaveChat}>
              Leave Chat
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Chat;
